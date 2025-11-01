mock数据接口 - 在mock基础上扩展了若干模拟函数 


### 模拟函数返回测试

模拟函数返回测试支持get/post

**地址**： `/test/mock/first`

**方法**： `ALL`



**200返回说明**：



```json
{
  "data": {},
  "code": 0,
  "msg": "ok",
  "t": 1559204889719
}
```
| 参数名 | 必须 | 类型 | 说明 |
| :--- | :---: | :---: | :--- |
| data | true | Object\|Array | 对象或数组,建议统一返回对象 |
| code | true | Number | 200-500 或者 业务自定义代码 |
| msg | true | String | 非国际化消息说明 |
| t | true | Number | 时间戳 |

---



### 验证码返回

验证码返回

**地址**： `/test/mock/captcha`

**方法**： `GET`





---



### 模拟函数widthxheight图片

模拟函数图片

**地址**： `/test/mock/img`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| size | 否 | string | 默认："100x100"<br> | **widthxheight**<br>图片长宽 |





---



### getEmpty

getEmpty

**地址**： `/test/mock/getEmpty`

**方法**： `GET`





---



### getSign

getSign

**地址**： `/test/mock/getSign`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| t | 否 | int | 默认：无<br> | **t**<br>时间戳 |
| sign | 否 | string | 默认：无<br> | **sign**<br>sign算法得到的hash值 |





---



### getHtml

getHtml

**地址**： `/test/mock/getHtml`

**方法**： `GET`





---



### getEchartHtml

getEchartHtml

**地址**： `/test/mock/getEchartHtml`

**方法**： `GET`





---



### getUrl

getUrl

**地址**： `/test/mock/getUrl`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| url | 否 | string | 默认："http://www.baidu.com"<br> | **url**<br>获取url内容 |





---



### getBing

getBing

**地址**： `/test/mock/getBing`

**方法**： `GET`





---



### echo

echo

**地址**： `/test/mock/echo`

**方法**： `ALL`





---



### qrcode

二维码生成

**地址**： `/test/mock/qrcode`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| str | 否 | string | 默认：无<br> | **str**<br>qrcode的字符串 |





---



### 上传

上传图片

**地址**： `/test/mock/upload`

**方法**： `POST`



**formData 或 raw-JSON参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| jsonstr | 是 | string | 默认：无<br> | **jsonstr**<br>file同时提交的jsonstr |
| file | 是 | file | 默认：无<br>最小：0 <br>最大：524288 | **file**<br>上传的file对象 |





---



### google验证二维码添加

google验证二维码添加

**地址**： `/test/mock/googleQR`

**方法**： `GET`





---



### google验证

google验证

**地址**： `/test/mock/googleVerify`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| userToken | 否 | string | 默认：无<br> | **userToken**<br>userToken字符串 |





---
