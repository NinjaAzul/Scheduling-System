import { Prisma, PrismaClient } from '@prisma/client';

enum Role {
    ADMIN = 'ADMINISTRATOR',
    USER = 'USER',
}



const getRoles = async (): Promise<Omit<Prisma.RoleCreateInput, 'createdAt' | 'updatedAt'>[]> => {
    return [
        {
            name: Role.ADMIN,

        },
        {
            name: Role.USER,
        },
    ];
};

export const insertRoles = async (client: PrismaClient) => {
    const roles = await getRoles();

    try {
        const batch = [];

        for (const role of roles) {
            batch.push(
                client.role.upsert({
                    create: role,
                    update: role,
                    where: { name: role.name },
                }),
            );
        }

        await client.$transaction(batch);

        console.warn('Roles created: %d\n', roles.length);
    } catch (error) {
        console.error('Error creating roles', error);
    }
};