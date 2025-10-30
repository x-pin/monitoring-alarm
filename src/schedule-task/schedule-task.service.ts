import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RabbmitRedisMqService } from '../alarm-message/rabbimt-redis-mq.service';
@Injectable()
export class ScheduleTaskService {
  constructor(
    private readonly rabbmitRedisMqService: RabbmitRedisMqService,
  ) {}
  /**
   * 执行条件:每15分钟执行一次
   */
  @Cron('*/1 * * * *', { name: 'everyFifteenMinutes', timeZone: 'Asia/Shanghai' })
  async handleCron() {
    console.log('每15分钟执行一次');
    // 发送告警消息
    await this.rabbmitRedisMqService.dispatch('{"type":"larg","data":{"message":"xpin-余额消息","target":"balanceAlarm"}}');
  }
}
