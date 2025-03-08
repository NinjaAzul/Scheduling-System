import { User, Role, Prisma } from '@prisma/client';


declare global {
  namespace Express {
    interface Request {
      user: Prisma.UserGetPayload<{
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          active: true,
          role: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }>;
      token: string;
    }
  }
}