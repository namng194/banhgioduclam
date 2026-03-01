import { z } from 'zod';
import { insertFaqSchema, faqs } from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  faqs: {
    list: {
      method: 'GET' as const,
      path: '/api/faqs' as const,
      responses: {
        200: z.array(z.custom<typeof faqs.$inferSelect>()),
      },
    },
  },
  chat: {
    send: {
      method: 'POST' as const,
      path: '/api/chat' as const,
      input: z.object({ message: z.string() }),
      responses: {
        200: z.object({ answer: z.string() }),
        400: errorSchemas.validation,
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
