import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { HistoriesService } from './histories.service';

@Controller('histories')
@ApiTags('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Get()
  findHistory(@User() userId: string) {
    return this.historiesService.findUserHistory(userId);
  }
}
