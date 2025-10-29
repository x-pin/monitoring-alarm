import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RmqContext, Ctx } from '@nestjs/microservices';
import { RedisPubSubService} from '../common/libs/redis/redis-pubsub.service'
import { plainToClass } from 'class-transformer';
import { MqMessage } from './dto/common.dto';
import { RedisService } from '../common/libs/redis/redis.service';
import { LargMessageService } from './larg-message.service';

@Injectable()
export class RabbmitRedisMqService {
  // 频道名称
  private channelName:string = 'xpin.monitoring.alarm';
  constructor(
    private readonly redisService: RedisService,
    private readonly redisPubSubService: RedisPubSubService,
    private readonly largMessageService: LargMessageService,
  ) {
    // 订阅频道
    this.redisPubSubService.subscribe([this.channelName]);
    // 取消订阅频道
    // this.redisPubSubService.unsubscribe([this.channelName]);

    // 监听 Redis 消息
    this.redisPubSubService.message$.subscribe(({ channel, message }) => {
      try {
        this.dispatch(message);
      } catch (error) {
        console.log('error', error);
      }
    });
  }

  /**
   * 接收 mq 队列消息
   */
  @RabbitSubscribe({queue: 'xpin.monitoring.alarm', queueOptions: {durable: true}})
  async consumeMessageNest( @Ctx() context: RmqContext): Promise<void> {
    try {
      if (context) {
        this.dispatch(JSON.stringify(context));
      }
    } catch (error) {
    }
  }

  /**
   * 消息派遣中心
   */
  async dispatch(context: string) {
    let messageType:string = ''
    try {
      const mqMessage = plainToClass(MqMessage, context);
      messageType = mqMessage.type
      switch (mqMessage.type) {
        case 'larg':
          await this.largMessage(mqMessage.data)
          break;
        default:
          break;
      }
    } catch (error) {
    }
  }

  async largMessage(message: string) {
    await this.largMessageService.send({
      target: 'error',
      content: 'dddd',
      at: '',
    });
  }
}
    