import { Input, Form } from 'antd';
import React from 'react';
import type { SchemaFormItemType } from '../data';
import { createRules } from './utils';
const FormItem = Form.Item;

interface CustomItemType {
  item: SchemaFormItemType;
}

const CustomItem: React.FC<CustomItemType> = (props) => {
  const { item } = props;

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

  // 只读
  if (item?.readOnly && item.readOnly === true) {
    return (
      <FormItem
        key={item.labelValue}
        label={item.labelName}
        name={item.labelValue}
        rules={createRules(item)}
        initialValue={item?.value || undefined}
        {...item.formItemLayout}
      >
        <span>{item?.value || '使用不规范，请阅读使用文档'}</span>
      </FormItem>
    );
  }
  return (
    <FormItem
      key={item.labelValue}
      label={item.labelName}
      name={item.labelValue}
      rules={createRules(item)}
      initialValue={item?.status === 3 ? item?.value : undefined}
      {...item.formItemLayout}
    >
      {item.components}
    </FormItem>
  );
};

export default CustomItem;
