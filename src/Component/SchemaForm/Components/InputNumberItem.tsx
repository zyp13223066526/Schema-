import { InputNumber, Form, Spin } from 'antd';
import React from 'react';
import type { SchemaFormItemType } from '../data';
import { createRules } from './utils';
const FormItem = Form.Item;

interface InputNumberItemType {
  item: SchemaFormItemType;
}

const InputNumberItem: React.FC<InputNumberItemType> = (props) => {
  const { item } = props;

  const InputNumberProps = {
    placeholder: `请输入${item.labelName}`,
    ...item.labelProps,
  };

  if (item.status !== 1 && !item.value) {
    return <Spin spinning={true} />;
  }

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

  // 格式化只读状态下的值
  /**
   *
   * @param type
   *              1 : 千分符
   *              2 : 百分比
   */
  const getReadyValue = (type?: number) => {
    if (!item.value) {
      return '';
    }
    switch (type) {
      case 1:
        return `${item.value?.toLocaleString()}（元）`;
      case 2:
        return `${item.value}%`;
    }
    return item.value || '';
  };

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
        <span>{getReadyValue(item?.formatter)}</span>
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
      <InputNumber
        style={{
          width: '100%',
        }}
        {...InputNumberProps}
      />
    </FormItem>
  );
};

export default InputNumberItem;
