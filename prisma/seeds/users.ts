import { Prisma, PrismaClient } from '@prisma/client';

import { hash } from 'bcrypt';

const getUsers = async (): Promise<Omit<Prisma.UserCreateManyInput, 'createdAt' | 'updatedAt'>[]> => {
    return [
        {
            name: process.env.DEFAULT_USER || 'Administrador',
            email: process.env.DEFAULT_EMAIL || 'admin@exemplo.com',
            password: await hash(process.env.DEFAULT_PASSWORD || 'admin', 10),
            roleId: 1, //ADMINISTRATOR,
        },
    ];
};

export const insertUsers = async (client: PrismaClient) => {
    const users = await getUsers();

    try {
        const batch = [];

        for (const user of users) {
            batch.push(
                client.user.upsert({
                    create: user,
                    update: user,
                    where: { email: user.email },
                }),
            );
        }

        await client.$transaction(batch);

        console.warn('Users created: %d\n', users.length);
    } catch (error) {
        console.error('Error creating users', error);
    }
};