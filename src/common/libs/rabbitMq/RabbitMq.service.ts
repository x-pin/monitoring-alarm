import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMqService {
    constructor(private readonly amqpConnection: AmqpConnection) {}
    /**
     * 发送消息
     * @param 消息发送参数 TODO: publish('exchange', 'routingKey', bf, options: ??)
     */
    async sendMqMessage(msg: any, expiration:string = '30000') {
        const strMsg = JSON.stringify(msg);
        const bf = Buffer.from(strMsg);
        const options = {
            // 设置消息30秒内未消费则自从从队列中删除删除
            expiration,
        }
        /**
         * 发送消息到mq消息队列中 tactic 
         * this.amqpConnection.publish('amq.direct', 'daydayup', bf) 是发送给所有消费者 order 队列的
         */
        const restu = await this.amqpConnection.publish('tactic.direct', 'daydayup', bf, options)

        return restu
    }
}
