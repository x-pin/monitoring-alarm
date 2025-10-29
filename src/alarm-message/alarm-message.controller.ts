import { Controller, Post, Body } from '@nestjs/common';
import { RabbmitRedisMqService } from './rabbimt-redis-mq.service';

@Controller('alarmMessage')
export class ElarmMessageController {
  constructor(
    private readonly rabbmitRedisMqService: RabbmitRedisMqService
  ) {}

  @Post()
  async send(@Body() mqMessage: string) {
    return await this.rabbmitRedisMqService.dispatch(mqMessage);
  }
}
