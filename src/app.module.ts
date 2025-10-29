import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { RedisClientOptions } from '@liaoliaots/nestjs-redis'
import configuration from './config/index'
import { RedisModule } from './common/libs/redis/redis.module'
import { RabbitMqModule } from './common/libs/rabbitMq/RabbitMq.module'
import { AlarmMessageModule } from './alarm-message/alarm-message.module';
import { ScheduleTaskModule } from './schedule-task/schedule-task.module'

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          autoLoadEntities: true,
          keepConnectionAlive: true,
          ...config.get('db.mysql'),
        } as TypeOrmModuleOptions
      },
    }),
    // libs redis
    RedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return {
            closeClient: true,
            readyLog: true,
            errorLog: true,
            config: [
              config.get<RedisClientOptions>('redis'),
              config.get<RedisClientOptions>('redisSubscriber'),
            ],
          }
        },
      },
      true,
    ),
    RabbitMqModule,
    AlarmMessageModule,
    ScheduleTaskModule
  ],
})
export class AppModule {}
