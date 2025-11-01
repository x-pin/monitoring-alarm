/**
 * Lark 机器人消息类型模板
 */

module.exports = {
  // 简单卡片
  card1: function (title, content) {
    return {
      msg_type: "interactive",
      card: {
        elements: [
          {
            tag: "div",
            text: {
              content: content,
              tag: "lark_md",
            },
          },
        ],
        header: {
          title: {
            content: title,
            tag: "plain_text",
          },
        },
      },
    };
  }
};

