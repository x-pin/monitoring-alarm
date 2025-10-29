import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { plainToClass } from 'class-transformer';
import { RmqContext, Ctx } from '@nestjs/microservices';
import { RedisService } from '../common/libs/redis/redis.service';
import { AlarmMessageService } from '../alarm-message/alarm-message.service';

class MqMessage {
  readonly type: string
  readonly data: any
}

@Injectable()
export class RabbitMqService {
    constructor(
      private readonly redisService: RedisService,
      private readonly alarmMessageService: AlarmMessageService,
    ) {}
    /**
     * 接收 nest 队列消息
     */
    @RabbitSubscribe({queue: 'nest', queueOptions: {durable: true}})
    async consumeMessageNest( @Ctx() context: RmqContext): Promise<void> {
      let messageType:string = ''
      try {
        const mqMessage = plainToClass(MqMessage, context);
        messageType = mqMessage.type
        switch (mqMessage.type) {
          case 'miteyou':
            // 更新策略信息
            await this.updateTactics(mqMessage.data)
            break;
          default:
            break;
        }
      } catch (error) {
        // 处理异常发送微信消息
        this.alarmMessageService.send({ type: 'error', content: `MQ接收处理消息:${messageType}类型数据处理错误`, isAt: true })
      }
    }
    async updateTactics(data: any) {
      console.log('接收到策略更新消息:', data)
    }
 }
