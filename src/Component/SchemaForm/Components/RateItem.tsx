import { Rate, Form, Spin } from 'antd';
import React from 'react';
import type { SchemaFormItemType } from '../data';
import { createRules } from './utils';
const FormItem = Form.Item;

interface RateItemType {
  item: SchemaFormItemType;
}

const RateItem: React.FC<RateItemType> = (props) => {
  const { item } = props;

  const rateProps = {
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
        initialValue={item?.value || 0}
        // initialValue={4}
        {...item.formItemLayout}
      >
        <Rate {...rateProps} disabled />
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
      <Rate {...rateProps} />
    </FormItem>
  );
};

export default RateItem;
