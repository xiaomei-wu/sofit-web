import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { CreateEnergyDto } from './dto/create-energy.dto';
import { UpdateEnergyDto } from './dto/update-energy.dto';
import { EnergyService } from './energy.service';

@Controller('energy')
@ApiTags('energy')
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @Post()
  create(@Body() createEnergyDto: CreateEnergyDto, @User() userId: string) {
    return this.energyService.create(createEnergyDto, userId);
  }

  @Get()
  findAll(@User() userId: string) {
    return this.energyService.findAll(userId);
  }

  @Get(':energyId')
  findById(@Param('energyId') energyId: string, @User() userId: string) {
    return this.energyService.findById(energyId, userId);
  }

  @Patch(':energyId')
  update(
    @Param('energyId') energyId: string,
    @Body() updateEnergyDto: UpdateEnergyDto,
    @User() userId: string,
  ) {
    return this.energyService.update(energyId, updateEnergyDto, userId);
  }

  @Delete(':energyId')
  delete(@Param('energyId') energyId: string, @User() userId: string) {
    return this.energyService.delete(energyId, userId);
  }
}
