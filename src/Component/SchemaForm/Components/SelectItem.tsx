import { Form, message, Select, Spin } from 'antd';
import React from 'react';
import type { SchemaFormItemType } from '../data';
import { createRules } from './utils';
const FormItem = Form.Item;

interface SelectItemType {
  item: SchemaFormItemType;
}

const SelectItem: React.FC<SelectItemType> = (props) => {
  const { item } = props;

  const selectProps = {
    placeholder: `请选择${item.labelName}`,
    ...item.labelProps,
  };

  if (item.col === 24) {
    item.formItemLayout = {
      labelCol: {
        span: item.formItemLayout?.labelCol?.span / 2,
      },
      wrapperCol: {
        span: 24 - item.formItemLayout?.labelCol?.span / 2,
      },
    };
  }
  if (item.status !== 1 && !item.value) {
    return <Spin spinning={true} />;
  }

  // 只读
  if (item.readOnly && item.readOnly === true) {
    return (
      <FormItem
        key={item.labelValue}
        label={item.labelName}
        name={item.labelValue}
        rules={createRules(item)}
        {...item.formItemLayout}
      >
        {item.valueEnum ? (
          <span>{item.valueEnum.filter((i: any) => i.value === item.value)[0]?.label}</span>
        ) : (
          message.error('使用Select组件，请传递数据源valueEnum')
        )}
      </FormItem>
    );
  }

  return (
    <FormItem
      key={item.labelValue}
      label={item.labelName}
      name={item.labelValue}
      rules={createRules(item)}
      initialValue={
        item.valueEnum && item?.status === 3 ? item?.valueEnum[item?.value]?.value : undefined
      }
      {...item.formItemLayout}
    >
      <Select {...selectProps}>
        {item.valueEnum
          ? item?.valueEnum.map((i) => {
              return (
                <Select.Option key={i.value} value={i.value}>
                  {i.label}
                </Select.Option>
              );
            })
          : message.error('使用Select组件，请传递数据源valueEnum')}
      </Select>
    </FormItem>
  );
};

export default SelectItem;
