import { RedisKeyPrefix } from '../enums/redis-key-prefix.enum'
/**
 * 获取 模块前缀与唯一标识 整合后的 redis key
 * @param moduleKeyPrefix 模块前缀
 * @param id id 或 唯一标识
 */
export function getRedisKey(moduleKeyPrefix: RedisKeyPrefix, id: string | number): string {
  return `${moduleKeyPrefix}${id}`
}

/**
 * 下划线转驼峰
 * @param str
 * @returns
 */
export function toCamelCase(str: string): string {
  return str.replace(/_(\w)/g, (_, c) => c.toUpperCase())
}

/**
 * 驼峰命名转下划线
 * @param str
 * @returns
 */
export function toUnderline(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 * 对象 key 下划线转驼峰，驼峰转下划线
 * @param target 目标
 * @param targetType
 * @param cutStr 对象 key 裁剪字段
 * @returns
 */
export function objAttrToCamelOrUnderline(
  target: Record<string, any>,
  targetType: 'camelCase' | 'underline',
  cutStr?: string,
) {
  const _target = {}
  Object.keys(target).forEach((k) => {
    let _k = k
    if (!!cutStr) {
      _k = _k.replace(cutStr, '')
    }
    _k = targetType === 'camelCase' ? toCamelCase(_k) : toUnderline(_k)
    _target[_k] = target[k]
  })
  return _target
}



/**
 * 生成20位的随机数，输出类似：kf3x9z1m2y8p7q6r
 * 
 */
export function generateTimestampID(len:number = 20): string {
  const timestamp = Date.now().toString(36); // 将时间戳转换为36进制
  const randomPart = Math.random().toString(36).substring(2, 10); // 随机部分
  return (timestamp + randomPart).substring(0, len); // 组合并截取前20位
};

/**
 * 通过股票编码编码解析成适合【东方财富、同花顺顺序、迅投的格式】
 * 东方财富格式: 1.600259，沪市: 1, 深圳: 0
 * 迅投QMT格式: 000001.SZ，沪市: SH, 深圳: SZ
 * 同花顺格式: 600259.SH，沪市: SH, 深圳: SZ
 * @param code 股票编码
 * @param isNumber 是否为数字, true: 数字, false: 字符串
 * @returns 返回0.600259(东方财富格式)、600259.SH(迅投QMT格式、同花顺格式)
 */
export function stockCodeConvert(code:string, isNumber:boolean = false):string {
  let marketType = isNumber ? 1 : 'SH'
  if (code.startsWith('000') || code.startsWith('002') || code.startsWith('300') || code.startsWith('001') || code.startsWith('003') || code.startsWith('399') || code.startsWith('301')) {
    marketType = isNumber ? 0 : 'SZ'
  }
  return isNumber ? `${marketType}.${code}`: `${code}.${marketType}`
}


/**
* @description: 获取nid，用于指数对应etf的
*/
export function getNidCode(code: string): string {
 let start = code.substring(0, 1)
 let pre
 let nid

 if (['000861'].includes(code)) {
   start = 'H'
 }

 switch (start) {
   case '1':
     nid = '0'
     break
   case '3':
     nid = '0'
     break
   case '9':
     pre = code.substring(0, 2)
     nid = pre === '98' ? '0' : '2'
     break
   case 'H':
     nid = '2'
     break
   case '0':
     nid = '1'
     break
   default:
     nid = ''
     break
 }

 return `${nid}.${code}`
}


/**
 * Unicode 转 中文，用于 问财数据转码
 * @param unicodeStr
 */
export function unicodeToChinese(unicodeStr: string): string {
  return decodeURIComponent(unicodeStr.replace(/\\u/g, '%u'));
}


/**
 * 计算持仓百分比
 * @param marketValue 持仓市值
 * @param totalAsset 总资产
 * 
 * @returns 持仓百分比
 */
export function computePositionPercentage(marketValue: number, totalAsset:number): number {
  // TODO: 0/0 会等于 NaN，所以这里处理一下
  let zb = marketValue / totalAsset
  if (Number.isNaN(zb)) {
    zb = 0
  }
  const positionPercentage = +(zb * 100).toFixed(2)
  return positionPercentage;
}

/**
 * mongodb 过滤字段
 * @param fields 字段
 * @param type 1: 获取字段， 0: 过滤字段
 */
export function filterMongoodField(fields: string[], type = 1, idVal = 0):Record<string, any> {
  const projection = fields.reduce((acc, field) => {
    acc[field] = type;
    return acc;
  }, {});
  
  projection['_id'] = idVal;
  return projection
}

/**
 * 将列表的对象数据转换成对象属性列表
 * @param list 输入的对象数组
 * @returns 转换后的属性列表对象，或 null
 */
export function listObjectTsArr(list: object[]): Record<string, number[]> | null {
  if (!Array.isArray(list) || list.length === 0) {
    return null;
  }
  const result: Record<string, number[]> = {};
  list.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => {
      if (!acc[key]) {
        acc[key] = [];
      }
      // 确保 obj[key] 是数字类型
      if (typeof obj[key] === 'number') {
        acc[key].push(obj[key]);
      }
    });
    return acc;
  }, result);

  // 返回时确保类型匹配
  return Object.keys(result).length > 0 ? result : null;
}


/**
 * 将列表的对象数据转换成对象属性列表
 * Hello 😊 这是一条带表情的消息 🚀 ❤️ 😋 ❤ 🍳 ❌ ❎ 💚 💯 🌹💩🏃‍♂️🐦‍🔥🦚🌲🌿📈📉❓🈳🈵⚠
 * @param list 输入的对象数组
 * @returns 转换后的属性列表对象，或 null
 */
export function getUnicodeEmoji(index:number): any | null {
  const emojiList = [
    "🚀","❎","🌹", "❤️", "💚", "💯",  "💩", "🐦‍🔥", "🦚", "🌲", "🌿", "🈵", "🈳", "⚠"
  ];
  return emojiList[index] || '';
}


/**
 * 设定 Unicode 表情符号
  * @param num1 数字1
  *  @param num2 数字2
 * @returns 返回 Unicode 表情符号，如 num1 >= num2 返回 🌹，否则返回 ❎
 */
export function setUnicodeEmojiOne(num1, num2): any | null {
  return num1 >= num2 ? '🌹' : '❎';
}
