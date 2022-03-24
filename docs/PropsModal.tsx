import { SchemaFormItemType } from '../src/Component/SchemaForm/data';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
const FormItem = Form.Item;

const formLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

interface PropsModalType {
  itemsData: SchemaFormItemType[];
  setItemsData: any;
  type: any;
  formItemLayout: any;
  closeModel: any;
}

const PropsModal: React.FC<PropsModalType> = (props) => {
  const { itemsData, setItemsData, type, formItemLayout, closeModel } = props;

  // 选项的个数
  const [optionNums, setOptionNums] = useState<number>(1);
  // 初始选项组件
  const [editOptionForm, setEditOptionForm] = useState<any>([
    <FormItem label="选项1" name="option1" rules={[{ required: true, message: '请输入选项1' }]}>
      <Input placeholder="请输入选项1" />
    </FormItem>,
  ]);
  // 选项唯一值数组
  const [valueOption, setValueOption] = useState<string[]>([]);
  // 表单提交的回调
  const onFinish = (values: any) => {
    const valueEnum: any[] = [];
    const optionItems = [...valueOption];
    optionItems.map((i) => {
      for (const j in values) {
        if (j === i) {
          valueEnum.push({
            label: `${values[i]}`,
            value: `${values[i]}`,
          });
        }
      }
    });
    const data = [...itemsData];
    const item = {
      type,
      labelName: values.labelName,
      labelValue: values.labelValue,
      required: values.required,
      col: values.col,
      formItemLayout,
      pickerType: values.pickerType,
      valueEnum,
    };
    data.push(item);
    setItemsData(data);
    closeModel(false);
  };

  // 日期选择器选择框
  const DatePickerForm = [
    <FormItem label="日期选择器类型" name="pickerType" wrapperCol={{ span: 6 }}>
      <Select placeholder="请选择日期类型">
        <Select.Option value={'time'}>时间选择器</Select.Option>
        <Select.Option value={'date'}>日期选择器</Select.Option>
        <Select.Option value={'week'}>周选择器</Select.Option>
        <Select.Option value={'month'}>月份选择器</Select.Option>
        <Select.Option value={'quarter'}>季度选择器</Select.Option>
        <Select.Option value={'year'}>年份选择器</Select.Option>
      </Select>
    </FormItem>,
  ];

  // 日期范围选择器
  const RangePickerForm = [
    <FormItem label="日期范围选择器类型" name="pickerType" wrapperCol={{ span: 6 }}>
      <Select placeholder="请选择日期类型">
        <Select.Option value={'time'}>时间范围选择器</Select.Option>
        <Select.Option value={'date'}>日期范围选择器</Select.Option>
        <Select.Option value={'week'}>周范围选择器</Select.Option>
        <Select.Option value={'month'}>月份范围选择器</Select.Option>
        <Select.Option value={'quarter'}>季度范围选择器</Select.Option>
        <Select.Option value={'year'}>年份范围选择器</Select.Option>
      </Select>
    </FormItem>,
  ];

  // 根据Type 展示对应的弹窗表单
  const createMain = () => {
    console.log(type === 'Radio', 'type');
    switch (type) {
      case 'DatePicker':
        return DatePickerForm;
      case 'RangePicker':
        return RangePickerForm;
      case 'Select':
        return editOptionForm;
      case 'Radio':
        return editOptionForm;
      case 'Checkbox':
        return editOptionForm;
      default:
        return [];
    }
  };

  // 增加一个选项的回调
  const addOption = () => {
    console.log(optionNums, 'optionNums');
    const nums = optionNums + 1;
    const optionData = [...editOptionForm];
    const item = (
      <FormItem
        label={`选项${nums}`}
        name={`option${nums}`}
        rules={[{ required: true, message: `请输入选项${nums}` }]}
      >
        <Input placeholder={`请输入选项${nums}`} />
      </FormItem>
    );
    optionData.push(item);
    const values = optionData.map((j) => {
      return j.props.name;
    });
    setValueOption(values);
    setEditOptionForm(optionData);
    setOptionNums(nums);
  };

  return (
    <div>
      <Form onFinish={onFinish} {...formLayout}>
        <FormItem
          label="字段名称"
          name="labelName"
          rules={[{ required: true, message: '请输入字段名称' }]}
        >
          <Input placeholder="请输入字段名称" />
        </FormItem>
        <FormItem
          label="字段值"
          tooltip="字段值唯一，用于回填"
          name="labelValue"
          rules={[{ required: true, message: '请输入字段值' }]}
        >
          <Input placeholder="请输入字段值" />
        </FormItem>
        <FormItem wrapperCol={{ span: 6 }} label="是否整行" name="col">
          <Select placeholder="请选择是否整行">
            <Select.Option value={24}>是</Select.Option>
            <Select.Option value={12}>否</Select.Option>
          </Select>
        </FormItem>
        <FormItem wrapperCol={{ span: 6 }} label="是否必填" name="required">
          <Select placeholder="请选择是否必填">
            <Select.Option value={true}>是</Select.Option>
            <Select.Option value={false}>否</Select.Option>
          </Select>
        </FormItem>
        {createMain()?.map((item: any, index: any) => {
          return <div key={index}>{item}</div>;
        })}
        <div style={{ textAlign: 'center' }}>
          {type === 'Select' || type === 'Radio' || type === 'Checkbox' ? (
            <Button onClick={addOption} style={{ marginRight: 10 }}>
              增加选项
            </Button>
          ) : null}
          <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
            确定
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PropsModal;
