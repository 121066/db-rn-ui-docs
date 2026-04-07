'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

export default function RadioPage() {
  const [radioValue, setRadioValue] = useState('option1');
  const [radioValue2, setRadioValue2] = useState('a');

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Radio 单选框</h1>
        <p className="text-lg text-gray-600">
          用于从多个选项中选择一个的组件，支持多种布局和自定义样式。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="左侧选择框"
          description="选择框在左侧，标签在右侧"
          language="tsx"
          code={`import { useState } from 'react';
import {DbRaido} from 'db-rn-ui'
export default function BasicRadio() {
  const [value, setValue] = useState('option1');

  const options = [
    { value: 'option1', label: '选项一' },
    { value: 'option2', label: '选项二' },
    { value: 'option3', label: '选项三', disabled: true },
  ];

  return (
    <div className="space-y-3">
      {options.map(option => (
        <label key={option.value} className="flex items-center gap-3 cursor-pointer">
          <DbRadio
            type="radio"
            name="options"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => setValue((e.target as any).value)}
            disabled={option.disabled}
            className="w-5 h-5"
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
                { value: 'option1', label: '选项一' },
                { value: 'option2', label: '选项二' },
                { value: 'option3', label: '选项三', disabled: true },
              ].map(option => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="options"
                    value={option.value}
                    checked={radioValue === option.value}
                    onChange={(e) => setRadioValue((e.target as any).value)}
                    disabled={option.disabled}
                    className="w-5 h-5"
                  />
                  <span className={option.disabled ? 'text-gray-400' : 'text-gray-700'}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 右侧布局 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">右侧布局</h2>
        <CodeExample
          title="右侧选择框"
          description="选择框在右侧，标签和描述在左侧"
          language="tsx"
          code={`import { useState } from 'react';

export default function RightLayoutRadio() {
  const [value, setValue] = useState('a');

  const options = [
    { value: 'a', label: '微信支付', description: '推荐使用' },
    { value: 'b', label: '支付宝支付' },
    { value: 'c', label: '银行卡支付', description: '需要验证身份' },
  ];

  return (
    <div className="space-y-4">
      {options.map(option => (
        <label key={option.value} className="flex justify-between items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
          <div className="flex-1">
            <div className="text-gray-700 font-medium">{option.label}</div>
            {option.description && (
              <div className="text-sm text-gray-500">{option.description}</div>
            )}
          </div>
          <DbRadio
            type="radio"
            name="payment"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => setValue((e.target as any).value)}
            className="w-5 h-5"
          />
        </label>
      ))}
    </div>
  );
}`}
          preview={
            <div className="space-y-4">
              {[
                { value: 'a', label: '微信支付', description: '推荐使用' },
                { value: 'b', label: '支付宝支付' },
                { value: 'c', label: '银行卡支付', description: '需要验证身份' },
              ].map(option => (
                <label key={option.value} className="flex justify-between items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="text-gray-700 font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-gray-500">{option.description}</div>
                    )}
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    value={option.value}
                    checked={radioValue2 === option.value}
                    onChange={(e) => setRadioValue2((e.target as any).value)}
                    className="w-5 h-5"
                  />
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
                { prop: 'value', desc: '当前选中的值', type: 'string | number', def: '-' },
                { prop: 'onChange', desc: '值变化回调', type: '(value: string | number) => void', def: '-' },
                { prop: 'options', desc: '单选框选项数组', type: 'RadioOption[]', def: '-' },
                { prop: 'layout', desc: '布局方式', type: "'left' | 'right'", def: "'left'" },
                { prop: 'size', desc: '单选框尺寸', type: "'small' | 'medium' | 'large'", def: "'medium'" },
                { prop: 'disabled', desc: '是否禁用', type: 'boolean', def: 'false' },
                { prop: 'activeColor', desc: '选中时的颜色', type: 'string', def: '#007AFF' },
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
