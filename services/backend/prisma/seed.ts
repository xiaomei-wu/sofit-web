// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: {
      uuid: '3e6c3432-8673-4129-a142-1d640baf0b6e',
    },
    update: { nickName: 'Hello World' },
    create: {
      uuid: '3e6c3432-8673-4129-a142-1d640baf0b6e',
      nickName: 'Hello World',
      email: 'hello1@sofit.com',
      password: '$2a$10$C0Z3V84wIaNTaL/HqF2PSO7EWjlnhGzPFv4euz4QPtZkJ4pA9np8W', // Testing!
    },
  });

  const user2 = await prisma.user.upsert({
    where: { uuid: 'c80929d0-c8b6-4375-aa0c-46cf042296c8' },
    update: {},
    create: {
      uuid: 'c80929d0-c8b6-4375-aa0c-46cf042296c8',
      email: 'hello2@sofit.com',
      password: 'W$2a$10$ED.A.9n.WhDP3fLUh5Fheu8ZJ7n5gaM0St0pGbkjIgDoUP4KIA7/.', // Testing2
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
