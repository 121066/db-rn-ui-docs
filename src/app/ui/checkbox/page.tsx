'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

export default function CheckboxPage() {
  const [singleChecked, setSingleChecked] = useState(false);
  const [groupValues, setGroupValues] = useState<string[]>(['apple']);

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkbox 复选框</h1>
        <p className="text-lg text-gray-600">
          用于选择一个或多个选项的组件，支持单个复选框和复选框组两种使用方式。
        </p>
      </section>

      {/* 单个复选框 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">单个复选框</h2>
        <CodeExample
          title="基础单选框"
          description="单个复选框，支持标签和描述文字"
          language="tsx"
          code={`import { DbCheckbox } from 'db-rn-ui';
import { useState } from 'react';

export default function SingleCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <DbCheckbox
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked((e.target as any).checked)}
          className="w-5 h-5"
        />
        <span className="text-gray-700">我已阅读并同意用户协议</span>
      </label>
      <p className="text-sm text-gray-500">请仔细阅读后勾选</p>
    </div>
  );
}`}
          preview={
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={singleChecked}
                  onChange={(e) => setSingleChecked((e.target as any).checked)}
                  className="w-5 h-5 rounded"
                />
                <span className="text-gray-700">我已阅读并同意用户协议</span>
              </label>
              <p className="text-sm text-gray-500">请仔细阅读后勾选</p>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 复选框组 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">复选框组</h2>
        <CodeExample
          title="基础复选框组"
          description="多个选项的复选框组，支持多选"
          language="tsx"
          code={`import { useState } from 'react';

export default function CheckboxGroup() {
  const [values, setValues] = useState<string[]>(['apple']);

  const options = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' },
    { value: 'grape', label: '葡萄', disabled: true },
  ];

  const handleChange = (value: string) => {
    setValues(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="space-y-3">
      {options.map(option => (
        <label key={option.value} className="flex items-center gap-3 cursor-pointer">
          <DbCheckbox
            checked="checkbox"
            checked={values.includes(option.value)}
            onChange={() => handleChange(option.value)}
            disabled={option.disabled}
            className="w-5 h-5 rounded"
          />
          <span className={option.disabled ? 'text-gray-400' : 'text-gray-700'}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}`}
          preview={
            <div className="space-y-3">
              {[
                { value: 'apple', label: '苹果' },
                { value: 'banana', label: '香蕉' },
                { value: 'orange', label: '橙子' },
                { value: 'grape', label: '葡萄', disabled: true },
              ].map(option => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={groupValues.includes(option.value)}
                    onChange={(e) => {
                      if ((e.target as any).checked) {
                        setGroupValues([...groupValues, option.value]);
                      } else {
                        setGroupValues(groupValues.filter(v => v !== option.value));
                      }
                    }}
                    disabled={option.disabled}
                    className="w-5 h-5 rounded"
                  />
                  <span className={option.disabled ? 'text-gray-400' : 'text-gray-700'}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          }
        />
      </section>

      {/* 带描述的复选框组 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">带描述的复选框</h2>
        <CodeExample
          title="复选框组带描述"
          description="每个选项可以包含描述文字"
          language="tsx"
          code={`import { useState } from 'react';

export default function CheckboxWithDescription() {
  const [values, setValues] = useState<string[]>(['apple']);

  const options = [
    { value: 'apple', label: '苹果', description: '红富士' },
    { value: 'banana', label: '香蕉', description: '进口香蕉' },
    { value: 'orange', label: '橙子', description: '脐橙' },
  ];

  const handleChange = (value: string) => {
    setValues(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="space-y-4">
      {options.map(option => (
        <label key={option.value} className="flex gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
          <DbCheckbox
            type="checkbox"
            checked={values.includes(option.value)}
            onChange={() => handleChange(option.value)}
            className="w-5 h-5 rounded mt-0.5"
          />
          <div className="flex-1">
            <div className="text-gray-700 font-medium">{option.label}</div>
            <div className="text-sm text-gray-500">{option.description}</div>
          </div>
        </label>
      ))}
    </div>
  );
}`}
          preview={
            <div className="space-y-4">
              {[
                { value: 'apple', label: '苹果', description: '红富士' },
                { value: 'banana', label: '香蕉', description: '进口香蕉' },
                { value: 'orange', label: '橙子', description: '脐橙' },
              ].map(option => (
                <label key={option.value} className="flex gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={groupValues.includes(option.value)}
                    onChange={(e) => {
                      if ((e.target as any).checked) {
                        setGroupValues([...groupValues, option.value]);
                      } else {
                        setGroupValues(groupValues.filter(v => v !== option.value));
                      }
                    }}
                    className="w-5 h-5 rounded mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="text-gray-700 font-medium">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          }
        />
      </section>

      {/* API 说明表格 */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">API 参数</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">属性</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">默认值</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { prop: 'checked', desc: '是否选中', type: 'boolean', def: 'false' },
                { prop: 'onChange', desc: '选中状态变化回调', type: '(checked: boolean) => void', def: '-' },
                { prop: 'label', desc: '复选框标签文字', type: 'string', def: '-' },
                { prop: 'description', desc: '复选框描述文字', type: 'string', def: '-' },
                { prop: 'disabled', desc: '是否禁用', type: 'boolean', def: 'false' },
                { prop: 'indeterminate', desc: '不确定状态（部分选中）', type: 'boolean', def: 'false' },
                { prop: 'value', desc: '复选框值', type: 'string | number', def: '-' },
              ].map((item) => (
                <tr key={item.prop}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{item.prop}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                  <td className="px-6 py-4 text-sm text-purple-600">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
