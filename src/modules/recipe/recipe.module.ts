import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
  imports: [PrismaModule],
})
export class RecipeModule {}
