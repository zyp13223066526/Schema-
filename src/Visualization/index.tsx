import type { SchemaFormItemType } from '../Component/SchemaForm/data';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SchemaForm from '../Component/SchemaForm/index';
import PropsModal from './PropsModal';

// 支持的组件
const componentsList = [
  {
    id: 'Input',
    text: '输入框',
  },
  {
    id: 'TextArea',
    text: '文本域',
  },
  {
    id: 'Select',
    text: '下拉选择器',
  },
  {
    id: 'Radio',
    text: '单选器',
  },
  {
    id: 'Checkbox',
    text: '多选器',
  },
  {
    id: 'InputNumber',
    text: '数字输入框',
  },
  {
    id: 'DatePicker',
    text: '日期选择器',
  },
  {
    id: 'RangePicker',
    text: '日期范围选择器',
  },
  {
    id: 'Rate',
    text: '评价器',
  },
  {
    id: 'Switch',
    text: '开关',
  },
];

// 表单的样式
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const Visualization: React.FC = () => {
  // 生成展示的是组件数据
  const [itemsData, setItemsData] = useState<SchemaFormItemType[]>([
    {
      type: 'Input',
      labelName: '输入框',
      labelValue: 'input',
      col: 12,
      labelProps: {},
      rules: [{ required: true, message: '输入框必填哦' }],
    },
  ]);
  // 功能选择弹窗的显隐
  const [propsModalshow, setPropsModalshow] = useState<boolean>(false);
  // 拖拽的组件的类型
  const [comType, setComType] = useState<string>();
  // 拖拽开始
  const onDragStart = () => {
  };

  // 拖拽变化
  const onDragUpdate = () => {
  };

  // 拖拽结束
  const onDragEnd = (result: any) => {
    if (result.destination?.droppableId && result.destination.droppableId !== 'droppable-2') {
      return;
    }
    setComType(result.draggableId);
    setPropsModalshow(true);
  };
  return (
    <div>
      <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Droppable droppableId="droppable-1">
            {(q, snapshot) => (
              <div
                ref={q.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? '#fff' : '#fff',
                  width: 300,
                }}
                {...q.droppableProps}
              >
                {componentsList.map((i, index) => {
                  return (
                    <Draggable key={i.id} draggableId={i.id} index={index}>
                      {(l) => (
                        <div ref={l.innerRef} {...l.draggableProps} {...l.dragHandleProps}>
                          <div
                            style={{
                              padding: '20px 20px',
                              border: '1px solid #EDEDED',
                            }}
                          >
                            {i.text}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {q.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="droppable-2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? '#EDEDED' : '#fff',
                  width: 800,
                }}
                {...provided.droppableProps}
              >
                <SchemaForm JsonData={itemsData} formItemLayout={formItemLayout} type={1} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      {/* 属性选择弹窗 */}
      <Modal
        title="属性设置"
        visible={propsModalshow}
        onCancel={() => setPropsModalshow(false)}
        width={1000}
        footer={null}
        destroyOnClose={true}
      >
        <PropsModal
          itemsData={itemsData}
          setItemsData={setItemsData}
          type={comType}
          formItemLayout={formItemLayout}
          closeModel={setPropsModalshow}
        />
      </Modal>
    </div>
  );
};

export default Visualization;
