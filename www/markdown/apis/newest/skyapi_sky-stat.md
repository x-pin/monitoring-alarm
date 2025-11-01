相关统计接口 


### 获取所有统计

获取所有接口调用总数，每个接口1h的count执行最长max时长 执行min时长 avg时长

**地址**： `/skyapi/sky-stat/getAll`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| type | 否 | string | 默认："api"<br> | **输出类型 [api-输出输出 mix-html输出]**<br>直接输出html界面 |





---



### 获取某几个统计

获取指定列表中 api1h同getAll一样的数据

**地址**： `/skyapi/sky-stat/getSome`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| apiList | 是 | string | 默认：null<br> | **输出api列表名称 jsonStr**<br>输出api列表名称 jsonStr 例：["_test", "_test1_test2"] |
| type | 否 | string | 默认："api"<br> | **输出类型 [api-输出输出 mix-html输出]**<br>直接输出html界面 |





---



### 获取单个统计

获取指定api 5m 24个点，1h 24个点,1d 30个点

**地址**： `/skyapi/sky-stat/getOne`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| api | 是 | string | 默认：null<br> | **api名称**<br>指定api名称  例： _test |
| type | 否 | string | 默认："api"<br> | **输出类型 [api-输出输出 mix-html输出 chart-html只有图表]**<br>直接输出html界面 |





---



### 获取指定几个key相应数据

获取指定几个key相应数据 5m 24个点，1h 24个点,1d 30个点

**地址**： `/skyapi/sky-stat/getSpecialKeys`

**方法**： `GET`



**query参数**：

| 参数名 | 必须 | 类型 | 默认值 | 说明 |
| ---: | :---: | :---: | :--- | :--- |
| keyList | 是 | string | 默认：null<br> | **输出key列表名称 jsonStr**<br>输出key列表名称 jsonStr 例：["_test", "_test1_test2"] |
| count5m | 否 | number | 默认：24<br> | **相应5m展示个数**<br>相应5m展示个数 |
| count1h | 否 | number | 默认：24<br> | **相应1h展示个数**<br>相应1h展示个数 |
| count1d | 否 | number | 默认：30<br> | **相应1d展示个数**<br>相应1d展示个数 |





---



### 获取Mysql一些性能指标

获取Mysql一些性能指标

**地址**： `/skyapi/sky-stat/getMysql`

**方法**： `GET`





---



### 获取Redis一些性能指标

获取Redis一些性能指标

**地址**： `/skyapi/sky-stat/getRedis`

**方法**： `GET`





---
