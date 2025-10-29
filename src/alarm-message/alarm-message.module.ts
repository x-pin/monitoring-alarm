import { Module } from '@nestjs/common';
import { AlarmMessageService } from './alarm-message.service';
import { HttpModule } from '@nestjs/axios'
import { RabbitMqService } from './rabbit-mq.service'
import { RedisMqService } from './redis-mq.service';

/**
 * 告警消息推送
 */
@Module({
  imports: [HttpModule],
  providers: [
    RabbitMqService,
    RedisMqService,
    AlarmMessageService
  ],
  exports: [AlarmMessageService],
})
export class AlarmMessageModule {
  
}
