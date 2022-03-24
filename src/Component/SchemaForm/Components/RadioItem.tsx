import { Form, message, Radio, Space, Spin } from 'antd';
import React from 'react';
import type { SchemaFormItemType } from '../data';
import { createRules } from './utils';
const FormItem = Form.Item;

interface RadioItemType {
  item: SchemaFormItemType;
}

const RadioItem: React.FC<RadioItemType> = (props) => {
  const { item } = props;

  const radioProps = {
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
        item.valueEnum && item?.status === 3 ? item?.valueEnum[item.value]?.value : undefined
      }
      {...item.formItemLayout}
    >
      <Radio.Group {...radioProps}>
        <Space direction={item?.direction}>
          {item.valueEnum
            ? item.valueEnum.map((i) => {
                return (
                  <Radio key={i.value} value={i.value} disabled={i.disabled}>
                    {i.label}
                  </Radio>
                );
              })
            : message.error('使用Radio组件，请传递数据源valueEnum')}
        </Space>
      </Radio.Group>
    </FormItem>
  );
};

export default RadioItem;
