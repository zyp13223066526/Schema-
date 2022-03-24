import { Card, Select, Form, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { SchemaFormItemType } from '../src/Component/SchemaForm/data';
import { createComponents } from '../src/Component/SchemaForm/utils';
import './index.less';
const { Option } = Select;

const ItemInfo: React.FC = () => {
  // 表单的实例化对象
  const form = useRef<any>();
  // 生成的编辑组件数组
  const [elementData, setElementData] = useState<any>([]);
  // 生成的只读组件数组
  const [readyElementData, setReadyElementData] = useState<any>([]);

  // type选择器变化的回调
  const onChange = (values: any) => {
    const item: any = itemsData.filter((i) => i.key === values.value)[0];
    form.current.setFieldsValue({
      [`${item.labelValue}`]: null,
    });
    item.readOnly = false;
    const readyItem: SchemaFormItemType = {
      ...item,
      readOnly: true,
      value: null,
      status: 2,
    };
    item.status = 1;
    // 编辑状态
    const data = [];
    // 只读状态
    const readyData: any = [];
    readyData.push(createComponents(readyItem));
    data.push(createComponents(item));
    setElementData(data);
    setReadyElementData(readyData);
  };

  /**
   * @param e
   * @type
   *       1  : 输入框变化的回调
   *       3  : 选择器变化回调
   *       4  : 单选框变化回调
   *       5  : 多选框变化回调
   *       6  : 时间选择框回调
   *       7  : 日期范围选择器
   *       8  : 开关
   *       9  : 数字输入框
   *       10 : 金额输入框
   *       11 ：百分比输入框
   */
  const valuesOnChange = (type: number, e: any, values: any) => {
    const data = [...itemsData];
    const readyData: any = [];
    switch (type) {
      case 1:
        data.map((i) => {
          if (i.type === 'Input') {
            (i.value = e.target.value), (i.readOnly = true);
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.type === 'Input')[0]));
        break;
      case 2:
        data.map((i) => {
          if (i.type === 'TextArea') {
            (i.value = e.target.value), (i.readOnly = true);
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.type === 'TextArea')[0]));
        break;
      case 3:
        data.map((i: any) => {
          if (i.type === 'Select') {
            i.value = i.valueEnum.filter((i: any) => i.value === e)[0].value;
            i.readOnly = true;
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.type === 'Select')[0]));
        break;
      case 4:
        data.map((i: any) => {
          if (i.type === 'Radio') {
            i.value = i.valueEnum.filter((i: any) => i.value === e.target.value)[0].value;
            i.readOnly = true;
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.type === 'Radio')[0]));
        break;
      case 5:
        data.map((i: any) => {
          if (i.type === 'Checkbox') {
            i.value = e;
            i.readOnly = true;
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.type === 'Checkbox')[0]));
        break;
      case 6:
        data.map((i: any) => {
          if (i.type === 'DatePicker') {
            i.value = values;
            i.readOnly = true;
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.type === 'DatePicker')[0]));
        break;
      case 7:
        data.map((i: any) => {
          if (i.type === 'RangePicker') {
            i.value = values;
            i.readOnly = true;
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.type === 'RangePicker')[0]));
        break;
      case 8:
        data.map((i: any) => {
          if (i.type === 'Switch') {
            i.value = e;
            i.readOnly = true;
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.type === 'Switch')[0]));
        break;
      case 9:
        data.map((i: any) => {
          if (i.key === 'InputNumber') {
            i.value = e;
            i.readOnly = true;
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.key === 'InputNumber')[0]));
        break;
      case 10:
        data.map((i: any) => {
          if (i.key === 'SumInputNumber') {
            i.value = e;
            i.readOnly = true;
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.key === 'SumInputNumber')[0]));
        break;
      case 11:
        data.map((i: any) => {
          if (i.key === 'PercentInputNumber') {
            i.value = e;
            i.readOnly = true;
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.key === 'PercentInputNumber')[0]));
        break;
      case 12:
        data.map((i: any) => {
          if (i.key === 'Rate') {
            i.value = e;
            i.readOnly = true;
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.key === 'Rate')[0]));
        break;
      case 13:
        data.map((i: any) => {
          if (i.key === 'Cascader') {
            i.value = e;
            i.readOnly = true;
          }
          return i;
        });
        readyData.push(createComponents(data.filter((i) => i.key === 'Cascader')[0]));
        break;
    }
    setReadyElementData(readyData);
  };

  // 基础的Json数据对象
  const [itemsData, setItemsData] = useState<SchemaFormItemType[]>([
    {
      key: 'Input',
      type: 'Input',
      labelName: '输入框',
      labelValue: 'input',
      labelProps: {
        onChange: valuesOnChange.bind(this, 1),
      },
    },
    {
      key: 'TextArea',
      type: 'TextArea',
      labelName: '文本域',
      labelValue: 'textAreaItem',
      labelProps: {
        onChange: valuesOnChange.bind(this, 2),
      },
    },
    {
      key: 'Select',
      type: 'Select',
      labelName: '选择器',
      labelValue: 'select',
      valueEnum: [
        {
          label: '赵',
          value: '1',
        },
        {
          label: '132****6526',
          value: '2',
        },
        {
          label: 'Fibel',
          value: '3',
        },
        {
          label: 'z1030354993',
          value: '4',
        },
      ],
      labelProps: {
        onChange: valuesOnChange.bind(this, 3),
      },
    },
    {
      key: 'Radio',
      type: 'Radio',
      labelName: '单选框',
      labelValue: 'input',
      valueEnum: [
        {
          label: '赵',
          value: '1',
        },
        {
          label: '132****6526',
          value: '2',
        },
        {
          label: 'Fibel',
          value: '3',
        },
        {
          label: 'z1030354993',
          value: '4',
        },
      ],
      labelProps: {
        onChange: valuesOnChange.bind(this, 4),
      },
    },
    {
      key: 'Checkbox',
      type: 'Checkbox',
      labelName: '多选框',
      labelValue: 'checkbox',
      valueEnum: [
        {
          label: '赵',
          value: '1',
        },
        {
          label: '132****6526',
          value: '2',
        },
        {
          label: 'Fibel',
          value: '3',
        },
        {
          label: 'z1030354993',
          value: '4',
        },
      ],
      labelProps: {
        onChange: valuesOnChange.bind(this, 5),
      },
    },
    {
      key: 'TimePicker',
      type: 'DatePicker',
      labelName: '时间选择框',
      labelValue: 'timePicker',
      pickerType: 'time',
      labelProps: {
        onChange: valuesOnChange.bind(this, 6),
      },
    },
    {
      key: 'DatePicker',
      type: 'DatePicker',
      labelName: '日期选择框',
      labelValue: 'datePicker',
      pickerType: 'date',
      labelProps: {
        onChange: valuesOnChange.bind(this, 6),
      },
    },
    {
      key: 'WeekPicker',
      type: 'DatePicker',
      labelName: '周选择框',
      labelValue: 'weekPicker',
      pickerType: 'week',
      labelProps: {
        onChange: valuesOnChange.bind(this, 6),
      },
    },
    {
      key: 'MonthPicker',
      type: 'DatePicker',
      labelName: '月份选择框',
      labelValue: 'monthPicker',
      pickerType: 'month',
      labelProps: {
        onChange: valuesOnChange.bind(this, 6),
      },
    },
    {
      key: 'QuarterPicker',
      type: 'DatePicker',
      labelName: '季度选择框',
      labelValue: 'quarterPicker',
      pickerType: 'quarter',
      labelProps: {
        onChange: valuesOnChange.bind(this, 6),
      },
    },
    {
      key: 'YearPicker',
      type: 'DatePicker',
      labelName: '年份选择框',
      labelValue: 'yearPicker',
      pickerType: 'year',
      labelProps: {
        onChange: valuesOnChange.bind(this, 6),
      },
    },
    {
      key: 'DataRangePicker',
      type: 'RangePicker',
      labelName: '日期范围选择器',
      labelValue: 'DataRangePicker',
      pickerType: 'date',
      labelProps: {
        onChange: valuesOnChange.bind(this, 7),
      },
    },
    {
      key: 'WeekRangePicker',
      type: 'RangePicker',
      labelName: '周范围选择器',
      labelValue: 'WeekRangePicker',
      pickerType: 'week',
      labelProps: {
        onChange: valuesOnChange.bind(this, 7),
      },
    },
    {
      key: 'MonthRangePicker',
      type: 'RangePicker',
      labelName: '月份范围选择器',
      labelValue: 'MonthRangePicker',
      pickerType: 'month',
      labelProps: {
        onChange: valuesOnChange.bind(this, 7),
      },
    },
    {
      key: 'YearRangePicker',
      type: 'RangePicker',
      labelName: '年份范围选择器',
      labelValue: 'YearRangePicker',
      pickerType: 'year',
      labelProps: {
        onChange: valuesOnChange.bind(this, 7),
      },
    },
    {
      key: 'Switch',
      type: 'Switch',
      labelName: '开关',
      labelValue: 'Switch',
      labelProps: {
        onChange: valuesOnChange.bind(this, 8),
      },
    },
    {
      key: 'InputNumber',
      type: 'InputNumber',
      labelName: '数字输入框',
      labelValue: 'InputNumber',
      labelProps: {
        onChange: valuesOnChange.bind(this, 9),
      },
    },
    {
      key: 'SumInputNumber',
      type: 'InputNumber',
      labelName: '金额输入框',
      labelValue: 'SumInputNumber',
      formatter: 1,
      labelProps: {
        formatter: (value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value: any) => value.replace(/\$\s?|(,*)/g, ''),
        onChange: valuesOnChange.bind(this, 10),
      },
    },
    {
      key: 'PercentInputNumber',
      type: 'InputNumber',
      labelName: '百分比输入框',
      labelValue: 'PercentInputNumber',
      formatter: 2,
      labelProps: {
        formatter: (value: any) => `${value}%`,
        parser: (value: any) => value.replace('%', ''),
        onChange: valuesOnChange.bind(this, 11),
      },
    },
    {
      key: 'Rate',
      type: 'Rate',
      labelName: '评价器',
      labelValue: 'Rate',
      labelProps: {
        allowHalf: true,
        onChange: valuesOnChange.bind(this, 12),
      },
    },
    {
      key: 'Cascader',
      type: 'Cascader',
      labelName: '级联选择器',
      labelValue: 'Cascader',
      labelProps: {
        onChange: valuesOnChange.bind(this, 13),
      },
      valueEnum: [
        {
          value: 'zhao',
          label: 'zhao',
          children: [
            {
              value: 'Y',
              label: 'Y',
              children: [
                {
                  value: 'P',
                  label: 'P',
                },
              ],
            },
          ],
        },
        {
          value: 'z1030354993',
          label: 'z1030354993',
          children: [
            {
              value: 'WX',
              label: 'WX',
            },
          ],
        },
        {
          value: 'Fibel',
          label: 'Fibel',
          children: [
            {
              value: 'name',
              label: 'name',
            },
          ],
        },
      ],
    },
  ]);

  return (
    <Card>
      {/* 上层选择区域 */}
      <div>
        <span>type选择：</span>
        <Select
          style={{
            width: '300px',
          }}
          onChange={onChange}
          labelInValue={true}
          placeholder="请选择组件类型"
        >
          {itemsData.map((i, index) => {
            return (
              <Option key={index} value={i.key}>
                {i.labelName}
              </Option>
            );
          })}
        </Select>
      </div>
      {/* 下层展示区域 */}
      <p className="pStyle">
        <strong>分组</strong>
      </p>
      <div className="main">
        {/* 编辑状态 */}
        <Card>
          <Form ref={form}>
            <Row>
              <p>
                <strong>编辑状态：</strong>
              </p>
              {elementData.map((i: any) => {
                return i;
              })}
              <p>
                <strong>只读状态：</strong>
              </p>
              {readyElementData.map((i: any) => {
                return i;
              })}
            </Row>
          </Form>
        </Card>
      </div>
    </Card>
  );
};

export default ItemInfo;
