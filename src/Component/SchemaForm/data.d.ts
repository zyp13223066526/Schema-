import type { Rule } from 'antd/lib/form';
/**
 * @Components     Schema表单
 * @JsonData       Json表单的数据
 * @formItemLayout 表单的样式
 * @formFields     表单域
 * @readOnly       是否为只读状态
 * @dataOrigin     数据源
 * @labelProps     表单的其他属性
 * @type           表单的状态
 *                 1：新增
 *                 2：详情
 *                 3：编辑
 */

export interface SchemaFormType {
  JsonData: SchemaFormItemType[];
  formItemLayout: any;
  type: 1 | 2 | 3;
  // 选传
  formFields?: {
    labelValuesData: {
      title: string;
      labelValues: string[];
      labelValuesStyle: object;
    }[];
  };
  labelProps?: any;
  readOnly?: boolean;
  dataOrigin?: object;
}

/**
 * @key            只在单个组件展示页面做唯一值
 * @Components     Schema表单项
 * @labelName      表单项名称
 * @labelValue     表单项唯一值
 * @valueEnum      数据源
 * @required       是否必填
 * @col            行数
 * @labelProps     组件的props
 * @rules          规则
 * @formItemLayout 表单组件的样式
 * @value          表单的值
 * @title          盒子标题
 * @divStyle       盒子样式
 * @pStyle         标题样式
 * @components     自定义组件
 * @status         表单的状态
 *                 1：新增
 *                 2: 详情
 *                 3: 编辑
 * @type           组件类型
 *       @Input         输入框
 *       @TextAreaItem  文本域
 *       @Select        下拉菜单
 *       @Radio         单选框
 *       @Checkbox      多选框
 *       @DatePicker    日期选择框
 *       @RangePicker   日期范围选择器
 *       @Switch        开关
 *       @Slider        进度条
 *       @InputNumber   数字输入框
 *       @Rate          五星评分
 *       @Cascader      级联选择器
 *       @Custom        自定义组件
 */

export interface SchemaFormItemType {
  key?: any;
  type:
    | 'Input'
    | 'TextArea'
    | 'Select'
    | 'Radio'
    | 'Checkbox'
    | 'DatePicker'
    | 'RangePicker'
    | 'Switch'
    | 'Slider'
    | 'InputNumber'
    | 'Rate'
    | 'Cascader'
    | 'Custom';
  labelName: string;
  labelValue: string | number;
  valueEnum?: {
    label: string;
    value: string;
    disabled?: boolean;
    children?: any;
  }[];
  required?: boolean;
  labelProps?: any;
  /**
   * @direction 水平或垂直排列，
   *            目前支持Radio组件中生效。
   *
   **/
  direction?: 'horizontal' | 'vertical' | undefined;
  rules?: Rule[];
  readOnly?: boolean;
  formItemLayout?: any;
  value?: any;
  col?: number;
  status?: 1 | 2 | 3;
  title?: string;
  divStyle?: any;
  pStyle?: any;
  /**
   * @PickerType 仅在DatePicker 组件中生效
   *             日期选择框的形式
   *             'time'       时间选择框
   *             'date'       日期选择框
   *             'week'       周选择框
   *             'month'      月份选择框
   *             'quarter'    季度选择框
   *             'year'       年份选择框
   */
  pickerType?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  /**
   * @formatter  仅支持InputNumber组件，其他组件内不生效
   *             只读状态下显示状态，如果是编辑状态或者是新增状态
   *             请使用官方API进行配置
   *              1 : 千分符
   *              2 ：百分比
   */
  formatter?: number;
  /**
   * @components 自定义组件，受rules的保护
   */
  components?: any;
}
