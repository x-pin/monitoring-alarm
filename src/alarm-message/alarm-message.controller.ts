import { Controller, Post, Body } from '@nestjs/common';
import { AlarmMessageService } from './alarm-message.service';

@Controller('alarmMessage')
export class ElarmMessageController {
  constructor(
    private readonly alarmMessageService: AlarmMessageService
  ) {}

  @Post()
  async send(@Body() createEtfCountDto: any) {
    return await this.alarmMessageService.send(createEtfCountDto);
  }
}
