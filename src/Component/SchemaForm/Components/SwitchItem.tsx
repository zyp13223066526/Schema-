import { Switch, Form, Spin } from 'antd';
import React from 'react';
import type { SchemaFormItemType } from '../data';
import { createRules } from './utils';
const FormItem = Form.Item;

interface InputItemType {
  item: SchemaFormItemType;
}

const SwitchItem: React.FC<InputItemType> = (props) => {
  const { item } = props;

  const switchProps = {
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
  if (item?.readOnly && item.readOnly === true) {
    return (
      <FormItem
        key={item.labelValue}
        label={item.labelName}
        name={item.labelValue}
        rules={createRules(item)}
        {...item.formItemLayout}
      >
        <span>{typeof item.value === 'boolean' ? (item.value ? '启用' : '关闭') : ''}</span>
      </FormItem>
    );
  }
  return (
    <FormItem
      key={item.labelValue}
      label={item.labelName}
      name={item.labelValue}
      rules={createRules(item)}
      valuePropName="checked"
      initialValue={item?.status === 3 ? item?.value : undefined}
      {...item.formItemLayout}
    >
      <Switch {...switchProps} />
    </FormItem>
  );
};

export default SwitchItem;
