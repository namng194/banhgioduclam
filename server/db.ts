import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Allow server to run without DATABASE_URL (fallback mode)
if (!process.env.DATABASE_URL) {
  console.warn('⚠️  DATABASE_URL not set. Server will run in FALLBACK MODE.');
  console.warn('   Chatbot and FAQs will use predefined data.');
}

// Create pool only if DATABASE_URL exists
export const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  // Optimized for Vercel serverless
  connectionTimeoutMillis: 3000, // 3 seconds for serverless
  idleTimeoutMillis: 0, // Close idle connections immediately
  max: 1, // Single connection for serverless (no pooling needed)
  // Add retry logic for connection errors
  ...(
    process.env.DATABASE_URL.includes('neon.tech') ? {
      // Neon-specific settings
      keepAlive: false, // Disable for serverless
    } : {}
  )
}) : null as any;

// Only set up event handlers if pool exists
if (pool) {
  pool.on('error', (err) => {
    console.error('❌ Unexpected database pool error:', err);
  });

  pool.on('connect', () => {
    console.log('✅ Database pool connection established');
  });
}

export const db = pool ? drizzle(pool, { schema }) : null as any;

// Helper function to test database connection
export async function testConnection(retries = 3): Promise<boolean> {
  if (!pool) {
    console.warn('⚠️  No database pool available (DATABASE_URL not set)');
    return false;
  }

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
