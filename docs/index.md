
## 暂支持组件示例
<code src="./index.tsx" />

## Scheam参数说明(更详细找data.d文件查看)

|    属性              |                     说明             |           类型                | 默认值 |
| :-----------------: | :----------------------------------: | :---------------------------: | :----: |
|   JsonData          | SchemaItem的JSon对象                 |  SchemaFormItemType           | 必传  |
|   formItemLayout    | Form表单的formLayout                 | 同antd Form组件formLayout类型  | 选传  |
|   formFields        | 表单自定义样式                        | formFieldsType                | 选传  |
|   type              | 表单类型 1：新增 2：只读 3：编辑       |  Number(1 2 3)                | 必传  |
|   dataOrigin        | 回填的数据源                          |  -                            | 选传  |
|   labelProps        | 支持antd From其他属性                 |  -                            | 选传  |


## SchemaFormItem(更详细找data.d文件查看)

|    属性              |                 说明                 |           类型           | 默认值 |
| :-----------------: | :----------------------------------: | :----------------------: | :----: |
|   type              | 支持组件的唯一标识                     |    string                |   必传    |
|   labelName         | 表单项的名称                          |     string                |   必传    |
|   labelValue        | 表单项对应的回填表示                   |     -                    |   必传   |
|   valueEnum         | 数据源                                |     -                    | 选传  |
|   required          | 是否必填                              |     boolean              | 选传  |
|   rules             | 表单项的验证规则                       |     Rule[]               |   选传 |
|   formItemLayout    | 表单项的formItemLayout                |      -                   |   选传 |
|   value             | 单个表单项回填的值                     |      -                   |   选传 |
|   status            | 单个表单的状态1:新增,2:只读,3:编辑      |      number(1,2,3)       |   选传 |
|   Components        | 自定义组件                             |      -                   |   选传 |
|   labelProps        | 表单组件的props                        |      -                   |   选传 |
