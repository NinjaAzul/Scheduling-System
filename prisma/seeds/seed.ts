/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';


import { insertUsers } from './users';
import { insertRoles } from './roles';

const client = new PrismaClient();

async function main() { }

main()
    .then(async () => {
        await client.$disconnect();

        console.warn('Start seeding ...');

        console.warn('-----------------------------');
        console.warn('Seeding roles 📦');
        await insertRoles(client);
        console.warn('Roles seeded  🎉');
        console.warn('-----------------------------');

        console.warn('-----------------------------');
        console.warn('Seeding users 📦');
        await insertUsers(client);
        console.warn('Users seeded  🎉');
        console.warn('-----------------------------');


        console.warn('Finish seeding ✅');
        process.exit(0);
    })
    .catch(async (err) => {
        await client.$disconnect();
        console.error(err);
        process.exit(1);
    });