import type { Rule } from 'antd/lib/form';
import type { SchemaFormItemType } from '../data';
// 生成必填规则
export function createRules(item: SchemaFormItemType) {
  let rules: Rule[] = [];
  if (item.rules) {
    rules = [...item.rules];
  }
  if (item.required && item.required === true) {
    const required = {
      required: true,
      message: `请输入${item.labelName}`,
    };
    rules.push(required);
  }
  return rules;
}
