import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

class MonitoringDto {
  readonly type: string
  content: string | Record<string, any>
  readonly isAt: boolean
}
/**
  * 告警消息
  * Unicode Emoji 官方网站: https://unicode.org/emoji/charts/，用于丰富表情
  * Hello 😊 这是一条带表情的消息 🚀 ❤️ 😋 ❤ 🍳 ❌ ❎ 💚 💯 🌹💩🏃‍♂️🐦‍🔥🦚🌲🌿📈📉
  */
@Injectable()
export class AlarmMessageService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  /**
   * 统一对外发送消息接口
   * @param info
   * @param type 接收消息平台
   */
  send(info: MonitoringDto, type: 'larg' | 'feiShu' = 'larg') {
    if (type === 'larg') {
      this.sendFeiShuMessage(info);
    } else if (type === 'feiShu') {
      this.sendFeiShuMessage(info);
    }
  }

  /**
   * 发送 larg 群消息
   * @param info
   * 飞书机器人接口: https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot#4996824a
   */
  async sendFeiShuMessage(info: MonitoringDto) {
    const {content, type, isAt } = info;
    let key = ''

    switch (type) {
      // 订单提醒
      case 'order':
        key = 'f0f5c0c5-c0c5-4c0c-5c0c-5c0c5c0c5c0c'
        break;
      default:
        break;
    }

    if (!key) return;

    const url = `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${key}`;
    const data = {
      msgtype: 'text',
      text: {
        content: content,
        "mentioned_list":[ isAt ? "@all" : '']
      }
    }
    // 发送消息
    this.httpService.post(url, data).subscribe(() => {})
  }
}
