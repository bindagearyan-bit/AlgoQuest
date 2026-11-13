import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClientInstance: any;

try {
  prismaClientInstance =
    global.prisma ||
    new PrismaClient({
      log: ['warn'],
    });

  if (process.env.NODE_ENV !== 'production') {
    global.prisma = prismaClientInstance;
  }
} catch (error) {
  console.warn('[Prisma] Client initialization fallback:', error);
  prismaClientInstance = new Proxy({}, {
    get: () => {
      return new Proxy({}, {
        get: () => async () => {
          throw new Error('Database offline; in-memory fallback active');
        },
      });
    },
  });
}

export const prisma = prismaClientInstance;
export default prismaClientInstance;


