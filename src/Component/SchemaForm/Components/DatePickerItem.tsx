import { DatePicker, Form, Spin, TimePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import type { SchemaFormItemType } from '../data';
import { createDataformat } from '../utils';
import { createRules } from './utils';
const FormItem = Form.Item;

interface DatePickerItemType {
  item: SchemaFormItemType;
}

const DatePickerItem: React.FC<DatePickerItemType> = (props) => {
  const { item } = props;

  const datePickerProps = {
    placeholder: `请选择${item.labelName}`,
    picker: item?.pickerType || 'date',
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
      name={item.labelValue}
      rules={createRules(item)}
      initialValue={
        item?.status === 3 ? moment(item?.value, createDataformat(item?.pickerType)) : undefined
      }
      {...item.formItemLayout}
    >
      {item.pickerType && item.pickerType === 'time' ? (
        <TimePicker
          style={{
            width: 200,
          }}
          {...datePickerProps}
        />
      ) : (
        <DatePicker
          style={{
            width: 200,
          }}
          {...datePickerProps}
        />
      )}
    </FormItem>
  );
};

export default DatePickerItem;
