import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisService } from '../common/libs/redis/redis.service';
import { AlarmMessageService } from '../alarm-message/alarm-message.service';

@Injectable()
export class ScheduleTaskService {
  constructor(
    private readonly redisService: RedisService,
    private readonly alarmMessageService: AlarmMessageService,
  ) {}
  async pythonRunStatusHandle() {
    try {
      const pythonRunStatus = await this.redisService.get('pythonRunStatus');
      let content = '❎🌲miniQmt 程序交易期间未正常运行，请及时处理！';

      if (pythonRunStatus === '1') {
        await this.redisService.set('pythonRunStatus', '0', 60 * 60 * 24);
        return
      }

      // 发送告警消息
      await this.alarmMessageService.send({
        type: 'error',
        content: content,
        isAt: true,
      });
    } catch (error) {
        console.log(error);
    }
  }
  /**
   * 执行条件:每15分钟执行一次
   */
  @Cron('0 */6 9-12,13-15 * * 1-5', { name: 'workHoursTask', timeZone: 'Asia/Shanghai' })
  handleCron() {
    this.pythonRunStatusHandle()
  }
}
