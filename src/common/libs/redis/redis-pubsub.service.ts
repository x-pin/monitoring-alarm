import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { Subject } from 'rxjs';

@Injectable()
export class RedisPubSubService implements OnModuleInit, OnModuleDestroy {
  // 用于将接收到的消息以Observable形式暴露
  private messageSubject = new Subject<{ channel: string; message: string }>();
  public message$ = this.messageSubject.asObservable();

  constructor(
    // 注入名为 'subscriber' 的 Redis 客户端实例
    @InjectRedis('subscriber') 
    private readonly redis: Redis
  ) {}

  // 模块初始化时订阅频道
  async onModuleInit() {
    // 可以订阅单个或多个频道
    // await this.subscribe(['real_time_stock_price']);
    
    // 监听消息事件
    this.redis.on('message', (channel, message) => {
      this.messageSubject.next({ channel, message });
    });
  }

  // 订阅指定频道
  async subscribe(channels: string[]) {
    try {
      await this.redis.subscribe(...channels);
    } catch (error) {
      console.error('Failed to subscribe to channels:', error);
    }
  }

  // 取消订阅指定频道
  async unsubscribe(channels: string[]) {
    try {
      await this.redis.unsubscribe(...channels);
    } catch (error) {
      console.error('Failed to unsubscribe from channels:', error);
    }
  }

  // 发布消息到指定频道
  async publish(channel: string, message: string) {
    try {
      await this.redis.publish(channel, message);
      return true;
    } catch (error) {
      console.error(`Failed to publish to channel ${channel}:`, error);
      return false;
    }
  }

  // 模块销毁时清理订阅
  async onModuleDestroy() {
    // 取消所有订阅
    await this.redis.unsubscribe();
    this.messageSubject.complete();
    console.log('Redis subscriber cleaned up');
  }
}
    