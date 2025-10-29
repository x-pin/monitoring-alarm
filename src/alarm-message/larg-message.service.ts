import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

class MonitoringDto {
  readonly target: string
  content: string | Record<string, any>
  readonly at: string
}
/**
  * larg 告警消息
  * Unicode Emoji 官方网站: https://unicode.org/emoji/charts/，用于丰富表情
  * Hello 😊 这是一条带表情的消息 🚀 ❤️ 😋 ❤ 🍳 ❌ ❎ 💚 💯 🌹💩🏃‍♂️🐦‍🔥🦚🌲🌿📈📉
  */
@Injectable()
export class LargMessageService {
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
      this.sendLargMessage(info);
    } else if (type === 'feiShu') {
      this.sendFeiShuMessage(info);
    }
  }

  /**
   * 发送 larg 群消息
   * @param info
   * 飞书机器人接口: https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot#4996824a
   */
  async sendLargMessage(info: MonitoringDto) {
    const {content, target, at } = info;
    let key = ''

    switch (target) {
      // 老板机器人id
      case 'boss':
        key = 'f0f5c0c5-c0c5-4c0c-5c0c-5c0c5c0c5c0c'
        break;
      // 开发机器人id
      case 'development':
        key = 'f0f5c0c5-c0c5-4c0c-5c0c-5c0c5c0c5c0e'
        break;
      // 运营机器人id
      case 'operation':
        key = 'f0f5c0c5-c0c5-4c0c-5c0c-5c0c5c0c5c0f'
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
        "mentioned_list":[ at ? "@all" : '']
      }
    }
    // 发送消息
    this.httpService.post(url, data).subscribe(() => {})
  }

  /**
   * 发送飞书群消息
   * @param info
   * 飞书机器人接口: https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL5ZmN24iN5-zN5qjL5ZmM
   */
  sendFeiShuMessage(info: MonitoringDto) {
    const {content, target, at } = info;
    console.log(content)
  }
}
