测试用例接口 


### mysql探针数据

mysql探针数据

**地址**： `/skyapi/probe/mysql`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| outputType | 否 | string | 默认："html"<br> | **输出类型**<br>接口输出html或者json |





---



### mysql探针数据

mysql探针数据

**地址**： `/skyapi/probe/mysqlTree`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| outputType | 否 | string | 默认："html"<br> | **输出类型**<br>接口输出html或者json |





---



### mysql探针数据

mysql探针数据

**地址**： `/skyapi/probe/mysqlGrid`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| outputType | 否 | string | 默认："html"<br> | **输出类型**<br>接口输出html或者json |





---



### 获取mysql数据

获取mysql数据

**地址**： `/skyapi/probe/getMysqlData`

**方法**： `POST`



**formData 或 raw-JSON参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| instanceName | 是 | string | 默认："db"<br> | **默认实例名**<br>默认全局实例变量名 |
| queryStr | 是 | string | 默认：无<br> | **查询字符串**<br>查询字符串 |
| accessToken | 是 | string | 默认：无<br> | **指定密码**<br>指定密码 |





---
