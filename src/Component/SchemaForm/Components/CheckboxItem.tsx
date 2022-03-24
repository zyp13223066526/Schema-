import { Checkbox, Col, Form, message, Row, Spin } from 'antd';
import React from 'react';
import type { SchemaFormItemType } from '../data';
import { createRules } from './utils';
const FormItem = Form.Item;

interface RadioItemType {
  item: SchemaFormItemType;
}

const CheckboxItem: React.FC<RadioItemType> = (props) => {
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

  if (item.status !== 1 && !item.value) {
    return <Spin spinning={true} />;
  }

  const getReadOnlyValue = () => {
    const textData: string[] = [];
    if (item.valueEnum && item.value) {
      item.valueEnum.forEach((i) => {
        item.value.forEach((j: any) => {
          if (i.value === j) {
            textData.push(i.label);
          }
        });
      });
    }
    return <span>{textData.join(',')}</span>;
  };

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
        {item.valueEnum ? (
          // <span>{item.valueEnum[item.value]?.label}</span>
          <span>{getReadOnlyValue()}</span>
        ) : (
          message.error('使用Select组件，请传递数据源valueEnum')
        )}
      </FormItem>
    );
  }

  return (
    <Form.Item
      key={item.labelValue}
      name={item.labelValue}
      label={item.labelName}
      {...item.formItemLayout}
      initialValue={item.value}
    >
      <Checkbox.Group {...item.labelProps}>
        <Row>
          {item.valueEnum
            ? item.valueEnum.map((i) => {
                return (
                  <Col key={i.value} span={12}>
                    <Checkbox value={i.value} disabled={i.disabled}>
                      {i.label}
                    </Checkbox>
                  </Col>
                );
              })
            : message.error('使用Checkbox组件，请传递数据源valueEnum')}
        </Row>
      </Checkbox.Group>
    </Form.Item>
  );
};

export default CheckboxItem;
