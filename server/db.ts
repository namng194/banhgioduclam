import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 60000, // 60 seconds - Neon databases can take time to wake up from suspend
  idleTimeoutMillis: 30000,
  max: 10, // Maximum 10 connections in pool
  // Add retry logic for connection errors
  ...(
    process.env.DATABASE_URL.includes('neon.tech') ? {
      // Neon-specific settings
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    } : {}
  )
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database pool error:', err);
});

pool.on('connect', () => {
  console.log('✅ Database pool connection established');
});

export const db = drizzle(pool, { schema });

// Helper function to test database connection
export async function testConnection(retries = 3): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      await client.query('SELECT 1');
      client.release();
      console.log('✅ Database connection test successful');
      return true;
    } catch (err) {
      console.error(`⚠️  Database connection attempt ${i + 1}/${retries} failed:`, err instanceof Error ? err.message : err);
      if (i < retries - 1) {
        const delay = Math.min(1000 * Math.pow(2, i), 10000); // Exponential backoff, max 10s
        console.log(`   Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  return false;
}

// Helper to safely execute database queries with retry
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 2,
  operationName = 'Database operation'
): Promise<T> {
  let lastError: Error | unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const isTimeoutError = error instanceof Error &&
        (error.message.includes('ETIMEDOUT') ||
         error.message.includes('ENETUNREACH') ||
         error.message.includes('timeout'));

      if (isTimeoutError && attempt < maxRetries) {
        const delay = Math.min(2000 * Math.pow(2, attempt), 10000);
        console.warn(`⚠️  ${operationName} timeout (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else if (!isTimeoutError || attempt >= maxRetries) {
        throw error;
      }
    }
  }

  throw lastError;
}
