import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnalysisController } from './modules/analysis/analysis.controller';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { AnalysisService } from './modules/analysis/analysis.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { DrinksController } from './modules/drinks/drinks.controller';
import { DrinksModule } from './modules/drinks/drinks.module';
import { DrinksService } from './modules/drinks/drinks.service';
import { EnergyController } from './modules/energy/energy.controller';
import { EnergyModule } from './modules/energy/energy.module';
import { EnergyService } from './modules/energy/energy.service';
import { ExerciseController } from './modules/exercise/exercise.controller';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { ExerciseService } from './modules/exercise/exercise.service';
import { FoodController } from './modules/food/food.controller';
import { FoodModule } from './modules/food/food.module';
import { FoodService } from './modules/food/food.service';
import { HistoriesController } from './modules/histories/histories.controller';
import { HistoriesModule } from './modules/histories/histories.module';
import { HistoriesService } from './modules/histories/histories.service';
import { SleepController } from './modules/sleep/sleep.controller';
import { SleepModule } from './modules/sleep/sleep.module';
import { SleepService } from './modules/sleep/sleep.service';
import { SymptomsController } from './modules/symptoms/symptoms.controller';
import { SymptomsModule } from './modules/symptoms/symptoms.module';
import { SymptomsService } from './modules/symptoms/symptoms.service';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { LocalStrategy } from './modules/auth/local.strategy';
import { RecipeModule } from './modules/recipe/recipe.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend/.next'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    AnalysisModule,
    EnergyModule,
    ExerciseModule,
    FoodModule,
    HistoriesModule,
    SleepModule,
    SymptomsModule,
    DrinksModule,
    PrismaModule,
    RecipeModule,
  ],
  controllers: [
    AnalysisController,
    AuthController,
    EnergyController,
    ExerciseController,
    FoodController,
    HistoriesController,
    SleepController,
    SymptomsController,
    UserController,
    DrinksController,
  ],
  providers: [
    AnalysisService,
    AuthService,
    EnergyService,
    ExerciseService,
    FoodService,
    HistoriesService,
    SleepService,
    SymptomsService,
    UserService,
    DrinksService,
    LocalStrategy,
    JwtStrategy,
    JwtService,
    PrismaService,
  ],
})
export class AppModule {}
