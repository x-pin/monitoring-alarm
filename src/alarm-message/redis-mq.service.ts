import { Injectable } from '@nestjs/common';
import { RedisPubSubService} from '../common/libs/redis/redis-pubsub.service'

@Injectable()
export class RedisMqService {
  private channelName:string = 'monitoring_alarm_message';

  constructor(
    private readonly redisPubSubService: RedisPubSubService
  ) {
    // 订阅频道
    this.redisPubSubService.subscribe([this.channelName]);

    // 取消订阅频道
    // this.redisPubSubService.unsubscribe([this.channelName]);

    // 监听 Redis 消息
    this.redisPubSubService.message$.subscribe(({ channel, message }) => {
      this.alterMessage(message)
    });
  }

  alterMessage(message: string) {
    // 告警消息中转
    console.log('alterMessage', message);
  }
}
    