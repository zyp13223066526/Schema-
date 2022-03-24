import { Slider, Form, Row, Col, Spin } from 'antd';
import React from 'react';
import type { SchemaFormItemType } from '../data';
import { createRules } from './utils';
const FormItem = Form.Item;

interface SliderItemType {
  item: SchemaFormItemType;
}

const SliderItem: React.FC<SliderItemType> = (props) => {
  const { item } = props;

  const switchProps = {
    min: 0,
    max: 100,
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
      valuePropName="checked"
      initialValue={item?.status === 3 ? item?.value : undefined}
      {...item.formItemLayout}
    >
      <Slider {...switchProps} />
    </FormItem>
  );
};

export default SliderItem;
