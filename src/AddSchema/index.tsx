import { Button, Card, message } from 'antd';
import React, { useRef, useState } from 'react';
import SchemaForm from '../Component/SchemaForm/index';
import type { SchemaFormItemType } from '../Component/SchemaForm/data';

// 表单的样式
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const AddSchema: React.FC = () => {
  // 表单实例
  const form = useRef<any>();
  // 基础的Json数据对象
  const [itemsData, setItemsData] = useState<SchemaFormItemType[]>([
    {
      type: 'Input',
      labelName: '输入框',
      labelValue: 'input',
      labelProps: {},
      rules: [{ required: true, message: '输入框必填哦' }],
    },
    {
      type: 'TextArea',
      labelName: '文本域',
      labelValue: 'textAreaItem',
    },
    {
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
      labelProps: {},
    },
    {
      type: 'Radio',
      labelName: '单选框',
      labelValue: 'Radio',
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
      labelProps: {},
    },
    {
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
      labelProps: {},
    },
    {
      type: 'DatePicker',
      labelName: '时间选择框',
      labelValue: 'timePicker',
      col: 12,
      pickerType: 'time',
      labelProps: {},
    },
    {
      type: 'DatePicker',
      labelName: '日期选择框',
      labelValue: 'datePicker',
      col: 12,
      pickerType: 'date',
      labelProps: {},
    },
    {
      type: 'DatePicker',
      labelName: '周选择框',
      labelValue: 'weekPicker',
      col: 12,
      pickerType: 'week',
      labelProps: {},
    },
    {
      type: 'DatePicker',
      labelName: '月份选择框',
      labelValue: 'monthPicker',
      col: 12,
      pickerType: 'month',
      labelProps: {},
    },
    {
      type: 'DatePicker',
      labelName: '季度选择框',
      labelValue: 'quarterPicker',
      col: 12,
      pickerType: 'quarter',
      labelProps: {},
    },
    {
      type: 'DatePicker',
      labelName: '年份选择框',
      labelValue: 'yearPicker',
      col: 12,
      pickerType: 'year',
      labelProps: {},
    },
    {
      type: 'RangePicker',
      labelName: '日期范围选择器',
      labelValue: 'DataRangePicker',
      col: 12,
      pickerType: 'date',
      labelProps: {},
    },
    {
      type: 'RangePicker',
      labelName: '周范围选择器',
      labelValue: 'WeekRangePicker',
      col: 12,
      pickerType: 'week',
      labelProps: {},
    },
    {
      type: 'RangePicker',
      labelName: '月份范围选择器',
      labelValue: 'MonthRangePicker',
      col: 12,
      pickerType: 'month',
      labelProps: {},
    },
    {
      type: 'RangePicker',
      labelName: '年份范围选择器',
      labelValue: 'YearRangePicker',
      col: 12,
      pickerType: 'year',
      labelProps: {},
    },
    {
      type: 'Switch',
      labelName: '开关',
      labelValue: 'Switch',
      labelProps: {},
    },
    {
      type: 'InputNumber',
      labelName: '数字输入框',
      labelValue: 'InputNumber',
      col: 12,
      labelProps: {},
    },
    {
      type: 'InputNumber',
      labelName: '金额输入框',
      labelValue: 'SumInputNumber',
      col: 12,
      formatter: 1,
      labelProps: {
        formatter: (value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value: any) => value.replace(/\$\s?|(,*)/g, ''),
      },
    },
    {
      type: 'InputNumber',
      labelName: '百分比输入框',
      labelValue: 'PercentInputNumber',
      col: 12,
      formatter: 2,
      labelProps: {
        formatter: (value: any) => `${value}%`,
        parser: (value: any) => value.replace('%', ''),
      },
    },
    {
      type: 'Rate',
      labelName: '评价器',
      labelValue: 'Rate',
      labelProps: {
        allowHalf: true,
      },
    },
    {
      type: 'Cascader',
      labelName: '级联选择器',
      labelValue: 'Cascader',
      labelProps: {},
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
  // 获取数据
  const getFormData = () => {
    const { validateFields } = form.current.formFn.current;
    // values 可以和服务端约定返回的数据类型，防止因为服务端返回数据类型的问题，导致报错
    validateFields()
      .then((values: any) => {
      })
      .catch(() => {
        message.error('请检查表单是否输入完整');
      });
  };

  // 重置数据
  const resetFormData = () => {
    const { resetFields } = form.current.formFn.current;
    resetFields();
  };

  return (
    <Card>
      {/* 按钮区域 */}
      <div
      style={{margin:'20px 0',textAlign:'end'}}
      >
        <Button type="primary" onClick={getFormData}>
          获取数据
        </Button>
        <Button
          danger
          style={{
            marginLeft: 10,
          }}
          onClick={resetFormData}
        >
          重置
        </Button>
      </div>
      <SchemaForm
        ref={form}
        JsonData={itemsData}
        formItemLayout={formItemLayout}
        type={1}
        // dataOrigin={data}
      />
    </Card>
  );
};

export default AddSchema;
