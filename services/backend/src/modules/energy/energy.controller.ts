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
  findAll() {
    return this.energyService.findAll();
  }

  @Get(':energyId')
  findById(@Param('energyId') energyId: string) {
    return this.energyService.findById(energyId);
  }

  @Patch(':energyId')
  update(
    @Param('energyId') energyId: string,
    @Body() updateEnergyDto: UpdateEnergyDto,
  ) {
    return this.energyService.update(energyId, updateEnergyDto);
  }

  @Delete(':energyId')
  delete(@Param('energyId') energyId: string) {
    return this.energyService.delete(energyId);
  }
}
