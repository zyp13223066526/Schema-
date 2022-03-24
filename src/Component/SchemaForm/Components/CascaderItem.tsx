import { Cascader, Form, message, Spin } from 'antd';
import React from 'react';
import type { SchemaFormItemType } from '../data';
import { createRules } from './utils';
const FormItem = Form.Item;

interface CascaderItemType {
  item: SchemaFormItemType;
}

const CascaderItem: React.FC<CascaderItemType> = (props) => {
  const { item } = props;

  const CascaderProps = {
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
        <span>{item.value ? item.value.join('/') : null}</span>
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
      {item.valueEnum ? (
        <Cascader {...CascaderProps} options={item.valueEnum || []} />
      ) : (
        message.error('使用Cascader组件，请传递valueEnum数据源')
      )}
    </FormItem>
  );
};

export default CascaderItem;
