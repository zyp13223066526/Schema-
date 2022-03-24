import { Empty, Form, Row } from 'antd';
import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import type { SchemaFormType } from './data';
import { createDiv, createFormItemComponents, estimateSchemaStatus } from './utils';
import 'antd/dist/antd.less'

const SchemaForm = forwardRef((props: SchemaFormType, ref) => {
  const { type, JsonData, formItemLayout, readOnly, dataOrigin, formFields, labelProps } = props;
  // 表单是否加载中
  const [loading, setLoading] = useState<boolean>(false);
  // 页面组件
  const [elementData, setElementData] = useState<any>([]);
  // 表单的实例化对象
  const formFn = useRef<any>();

  // 组件内的自定义属性
  useImperativeHandle(ref, () => ({
    formFn,
  }));

  // 生成页面组件
  const createComponents = () => {
    // 将状态分发给子组件
    const newJsonData = estimateSchemaStatus(
      type,
      JsonData,
      formItemLayout,
      dataOrigin,
      readOnly,
      formFields,
    );
    let data = createFormItemComponents(newJsonData, formFn);
    if (formFields) {
      data = createDiv(formFields, data);
    }
    setElementData(data);
  };
  
  useEffect(() => {
    if(JsonData){
      createComponents()
    }

  },[JsonData])

  // 根据Schema 生成对应的表单结构
  useEffect(() => {
    if (type !== 1 && dataOrigin) {
      createComponents();
    }
    createComponents();
  }, [dataOrigin]);

  if (!elementData || elementData.length === 0) {
    return <Empty description={false} />;
  }

  return (
    <div>
      <Form ref={formFn} {...labelProps} {...formItemLayout}>
        {formFields ? (
          elementData.map((i: any, index: any) => {
            return (
              <div key={i[0].props.children.props.item.labelValue}>
                <p style={i[0].props.children.props.item?.pStyle}>
                  {i[0].props.children.props.item?.title}
                </p>
                <div style={i[0].props.children.props.item?.divStyle}>
                  <Row>{i}</Row>
                </div>
              </div>
            );
          })
        ) : (
          <Row>
            {elementData.map((i: any) => {
              return i;
            })}
          </Row>
        )}
      </Form>
    </div>
  );
});

export default SchemaForm;
