import { Col } from 'antd';
import React from 'react';
import CascaderItem from './Components/CascaderItem';
import CheckboxItem from './Components/CheckboxItem';
import CustomItem from './Components/CustomItem';
import DatePickerItem from './Components/DatePickerItem';
import InputItem from './Components/InputItem';
import InputNumberItem from './Components/InputNumberItem';
import RadioItem from './Components/RadioItem';
import RangePickerItem from './Components/RangePickerItem';
import RateItem from './Components/RateItem';
import SelectItem from './Components/SelectItem';
import SliderItem from './Components/SliderItem';
import SwitchItem from './Components/SwitchItem';
import TextAreaItem from './Components/TextAreaItem';
import type { SchemaFormItemType } from './data';

// 根据Json对象 生成对应的表单组件
export const createFormItemComponents = (data: SchemaFormItemType[], formFn?: any) => {
  let dataItems: JSX.Element[] = [];
  // 是否存在
  if (!data || (data && data.length === 0)) {
    return (dataItems = []);
  }
  data.map((item: SchemaFormItemType) => dataItems.push(createComponents(item, formFn)));
  return dataItems;
};

// 根据type 生成组件
export const createComponents = (item: SchemaFormItemType, formFn?: any) => {
  const { col, type } = item;
  const schemaComponents = () => {
    switch (type) {
      case 'Input': // 输入框
        return <InputItem item={item} />;
      case 'TextArea': // 文本域 内置字数
        return <TextAreaItem item={item} />;
      case 'Select': // 选择器
        return <SelectItem item={item} />;
      case 'Radio': // 单选框
        return <RadioItem item={item} />;
      case 'Checkbox': // 多选框
        return <CheckboxItem item={item} />;
      case 'DatePicker': // 日期选择器
        return <DatePickerItem item={item} />;
      case 'RangePicker': // 范围选择器
        return <RangePickerItem item={item} />;
      case 'Switch': // 开关
        return <SwitchItem item={item} />;
      case 'Slider': // 进度条
        return <SliderItem item={item} />;
      case 'InputNumber': // 数字输入框
        return <InputNumberItem item={item} />;
      case 'Rate': // 评价器
        return <RateItem item={item} />;
      case 'Cascader': // 级联选择器
        return <CascaderItem item={item} />;
      case 'Custom': // 自定义
        return <CustomItem item={item} />;
    }
  };
  return (
    <Col span={col ?? 24} key={item.labelValue}>
      {schemaComponents()}
    </Col>
  );
};

// 判断Schema表单的状态
export function estimateSchemaStatus(
  type: 1 | 2 | 3,
  JsonData: SchemaFormItemType[],
  formItemLayout: any,
  dataOrigin?: any,
  readOnly?: boolean,
  formFields?: any,
  formFn?: any,
) {
  const newJsonData = [...JsonData];
  newJsonData.map((i: SchemaFormItemType) => {
    if (type !== 1 && dataOrigin) {
      for (const j in dataOrigin) {
        if (i.labelValue === j) {
          i.value = dataOrigin[j];
        }
      }
    }

    if (formFields) {
      formFields.labelValuesData.forEach((j: any) => {
        j.labelValues.forEach((t: any) => {
          if (t === i.labelValue) {
            i.title = j.title;
            i.divStyle = j.labelValuesStyle;
            i.pStyle = j.pStyle;
          }
        });
      });
    }

    if (readOnly) {
      i.readOnly = readOnly;
    }
    if (formItemLayout) {
      i.formItemLayout = formItemLayout;
    }
    if (!i.col) {
      i.col = 24;
    }
    i.status = type;
    switch (type) {
      case 1:
        break;
      case 2:
        i.readOnly = true;
        break;
      case 3:
        break;
      default:
        break;
    }
    return i;
  });
  return newJsonData;
}

// 生成盒子，将样式和标题载入
export function createDiv(formFields: any, data: any) {
  // 将标题形成数组
  const titleData: string[] = [];
  if (formFields) {
    formFields.labelValuesData?.forEach((i: any) => {
      titleData.push(i.title);
    });
  }
  const newData = [...data];
  const itemData: any[] = [];
  for (let i = 0; i <= newData.length; i++) {
    itemData[i] = newData?.filter((item) => {
      if (item.props.children.props.item.title === titleData[i]) {
        return item;
      }
    });
  }
  // 过滤空数组
  const newItemData = itemData.filter((i) => i.length !== 0);
  return newItemData;
}

// 根据日期选择框的种类转化moment
export function createDataformat(type?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year') {
  switch (type) {
    case 'time':
      return 'HH/mm/ss';
    case 'date':
      return 'YYYY/MM/DD';
    case 'week':
      return 'MM/DD';
    case 'month':
      return 'YYYY/MM';
    case 'quarter':
      return 'Q';
    case 'year':
      return 'YY';
    default:
      return undefined;
  }
}
