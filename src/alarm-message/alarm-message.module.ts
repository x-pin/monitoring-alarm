import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { RabbmitRedisMqService } from './rabbimt-redis-mq.service';
import { LargMessageService } from './larg-message.service';


/**
 * 告警消息推送
 */
@Module({
  imports: [HttpModule],
  providers: [
    RabbmitRedisMqService,
    LargMessageService
  ],
  exports: [RabbmitRedisMqService],
})
export class AlarmMessageModule {
  
}
