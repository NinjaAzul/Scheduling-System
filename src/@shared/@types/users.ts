import { Prisma } from "@prisma/client";

export type LoggedUser = Prisma.UserGetPayload<{
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
