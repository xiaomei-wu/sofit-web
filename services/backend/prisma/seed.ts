import { PrismaClient } from '@prisma/client';
import { uuid } from 'uuidv4';
import { recipeSeeds } from './seedData';

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

  for (let index = 0; index < recipeSeeds.length; index++) {
    const recipeSeed = recipeSeeds[index];
    const recipe = await prisma.recipe.upsert({
      where: { uuid: uuid() },
      update: {},
      create: {
        uuid: uuid(),
        name: recipeSeed.recipe.label,
        imgUrl: recipeSeed.recipe.images.SMALL.url,
        source: recipeSeed.recipe.source,
        yield: recipeSeed.recipe.yield,
        calories: Math.round(recipeSeed.recipe.calories),
      },
    });

    const nutrients = await prisma.nutrient.upsert({
      where: { uuid: uuid() },
      update: {},
      create: {
        uuid: uuid(),
        enerc_Kcal: recipeSeed.recipe.totalNutrients.ENERC_KCAL.quantity,
        procnt_g: recipeSeed.recipe.totalNutrients.PROCNT.quantity,
        fat_g: recipeSeed.recipe.totalNutrients.FAT.quantity,
        chocdf_g: recipeSeed.recipe.totalNutrients.CHOCDF.quantity,
        sugar_g: recipeSeed.recipe.totalNutrients.SUGAR.quantity,
        fibt_g: recipeSeed.recipe.totalNutrients.FIBTG.quantity,
        recipeId: recipe.uuid,
      },
    });

    console.log(`Nutrients for Recipe ${index} seeded successfully`, nutrients);

    for (const recipeIngredient of recipeSeed.recipe.ingredients) {
      await prisma.recipeIngredient.upsert({
        where: { uuid: uuid() },
        update: {},
        create: {
          uuid: uuid(),
          text: recipeIngredient.text,
          food: recipeIngredient.food,
          weight: recipeIngredient.weight,
          measure: recipeIngredient.measure,
          quantity: recipeIngredient.quantity,
          recipeId: recipe.uuid,
        },
      });
    }

    for (const dietLabel of recipeSeed.recipe.dietLabels) {
      await prisma.dietLabel.upsert({
        where: { uuid: uuid() },
        update: {},
        create: {
          uuid: uuid(),
          label: dietLabel,
          recipeId: recipe.uuid,
        },
      });
    }

    for (const healthLabel of recipeSeed.recipe.healthLabels) {
      await prisma.healthLabel.upsert({
        where: { uuid: uuid() },
        update: {},
        create: {
          uuid: uuid(),
          label: healthLabel,
          recipeId: recipe.uuid,
        },
      });
    }

    for (const mealType of recipeSeed.recipe.mealType) {
      await prisma.mealType.upsert({
        where: { uuid: uuid() },
        update: {},
        create: {
          uuid: uuid(),
          label: mealType,
          recipeId: recipe.uuid,
        },
      });
    }

    for (const cuisineType of recipeSeed.recipe.cuisineType) {
      await prisma.cuisineType.upsert({
        where: { uuid: uuid() },
        update: {},
        create: {
          uuid: uuid(),
          label: cuisineType,
          recipeId: recipe.uuid,
        },
      });
    }

    for (const dishType of recipeSeed.recipe.dishType) {
      await prisma.dishType.upsert({
        where: { uuid: uuid() },
        update: {},
        create: {
          uuid: uuid(),
          label: dishType,
          recipeId: recipe.uuid,
        },
      });
    }

    for (const caution of recipeSeed.recipe.cautions) {
      await prisma.caution.upsert({
        where: { uuid: uuid() },
        update: {},
        create: {
          uuid: uuid(),
          label: caution,
          recipeId: recipe.uuid,
        },
      });
    }
  }

  console.log('Seeding completed.');
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
