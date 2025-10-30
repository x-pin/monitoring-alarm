import { Controller, Post, Body, Get } from '@nestjs/common';
import { RabbmitRedisMqService } from './rabbimt-redis-mq.service';

@Controller('alarmMessage')
export class AlarmMessageController {
  constructor(
    private readonly rabbmitRedisMqService: RabbmitRedisMqService
  ) {}

  @Get()
  async send() {
    // return await this.rabbmitRedisMqService.dispatch(mqMessage);
    await this.rabbmitRedisMqService.dispatch('{"type":"larg","data":{"message":"xpin-余额消息","target":"balanceAlarm"}}');
    return true;
  }
}
