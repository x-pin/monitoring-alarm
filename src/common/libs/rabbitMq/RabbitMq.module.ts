import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqService } from './RabbitMq.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * 详细文章: https://blog.csdn.net/qq_36264795/article/details/139987358
 */
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const rabbitmqConfig = config.get('rabbmitMq');
        return {
          // TODO: 配置rabbitmq地址, vhost 添加到 / 后面
          uri: `amqp://${rabbitmqConfig.username}:${rabbitmqConfig.password}@${rabbitmqConfig.host}:${rabbitmqConfig.port}/${rabbitmqConfig.vhost}`,
          // TODO: 交换机列表，没有的话会自动创建
          exchanges: [
            {
              name: 'amq.direct',
              type: 'direct',
            },
          ],
      }}
    })
  ],
  controllers: [],
  providers: [RabbitMqService],
  exports: [RabbitMqService]
})
export class RabbitMqModule {}
