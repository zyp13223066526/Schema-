import { Form, Input, Spin } from 'antd';
import React from 'react';
import type { SchemaFormItemType } from '../data';
import { createRules } from './utils';
const FormItem = Form.Item;
const { TextArea } = Input;

interface TextAreaItemType {
  item: SchemaFormItemType;
}

const TextAreaItem: React.FC<TextAreaItemType> = (props) => {
  const { item } = props;
  const textAreaProps = {
    maxLength: 1000,
    rows: 4,
    showCount: true,
    placeholder: `请输入${item.labelName}`,
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
        initialValue={item?.value || undefined}
        {...item.formItemLayout}
      >
        <span>{item?.value || ''}</span>
      </FormItem>
    );
  }

  return (
    <FormItem
      key={item.labelValue}
      label={item.labelName}
      style={{
        position: 'relative',
      }}
      {...item.formItemLayout}
    >
      <FormItem
        name={item.labelValue}
        rules={createRules(item)}
        initialValue={item?.status === 3 ? item?.value : undefined}
      >
        <TextArea {...textAreaProps} />
      </FormItem>
    </FormItem>
  );
};

export default TextAreaItem;
