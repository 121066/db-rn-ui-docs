'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 SelectionButton 组件
interface MockSelectionButtonProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string | string[];
  mode?: 'single' | 'multiple';
  disabled?: boolean;
  onChange?: (value: string | string[]) => void;
}

const MockSelectionButton: React.FC<MockSelectionButtonProps> = ({
  options,
  value,
  mode = 'single',
  disabled = false,
  onChange,
}) => {
  const [selected, setSelected] = useState<string | string[]>(value || (mode === 'multiple' ? [] : ''));

  const handleClick = (val: string) => {
    if (disabled) return;
    
    let newValue: string | string[];
    if (mode === 'multiple') {
      const current = selected as string[];
      newValue = current.includes(val)
        ? current.filter(v => v !== val)
        : [...current, val];
    } else {
      newValue = selected === val ? '' : val;
    }
    setSelected(newValue);
    onChange?.(newValue);
  };

  const isSelected = (val: string) => {
    if (mode === 'multiple') {
      return (selected as string[]).includes(val);
    }
    return selected === val;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleClick(opt.value)}
          disabled={disabled || opt.disabled}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${isSelected(opt.value)
              ? 'bg-blue-600 text-white border-2 border-blue-600'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400'
            }
            ${(disabled || opt.disabled) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

const options = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子' },
  { value: 'grape', label: '葡萄' },
  { value: 'watermelon', label: '西瓜' },
];

const sizeOptions = [
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
];

const colorOptions = [
  { value: 'red', label: '红色' },
  { value: 'blue', label: '蓝色' },
  { value: 'green', label: '绿色' },
  { value: 'black', label: '黑色', disabled: true },
];

export default function SelectionButtonPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">SelectionButton 选择按钮</h1>
        <p className="text-lg text-gray-600">
          用于在多个选项中进行单选或多选的按钮组组件，常用于商品规格选择、标签筛选等场景。
        </p>
      </section>

      {/* 基础用法 - 单选 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法 - 单选</h2>
        <CodeExample
          title="单选模式"
          description="默认单选模式，选中一项后其他选项自动取消"
          language="tsx"
          code={`import { SelectionButton } from 'db-rn-ui';

export default function SingleSelect() {
  const options = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' },
    { value: 'grape', label: '葡萄' },
  ];

  return (
    <SelectionButton
      options={options}
      onChange={(value) => console.log('选中:', value)}
    />
  );
}`}
          preview={
            <MockSelectionButton
              options={options}
              mode="single"
            />
          }
          defaultExpanded={true}
        />
      </section>

      {/* 多选模式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">多选模式</h2>
        <CodeExample
          title="多选模式"
          description='设置 mode="multiple" 开启多选，可同时选择多个选项'
          language="tsx"
          code={`import { SelectionButton } from 'db-rn-ui';

export default function MultipleSelect() {
  const options = [
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
  ];

  return (
    <SelectionButton
      mode="multiple"
      options={options}
      onChange={(values) => console.log('选中:', values)}
    />
  );
}`}
          preview={
            <MockSelectionButton
              options={sizeOptions}
              mode="multiple"
            />
          }
          defaultExpanded={true}
        />
      </section>

      {/* 受控组件 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">受控组件</h2>
        <CodeExample
          title="受控模式"
          description="通过 value 属性控制选中状态，适用于表单等需要精确控制的场景"
          language="tsx"
          code={`import { SelectionButton } from 'db-rn-ui';
import { useState } from 'react';

export default function ControlledSelect() {
  const [selected, setSelected] = useState('apple');
  
  const options = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' },
  ];

  return (
    <SelectionButton
      options={options}
      value={selected}
      onChange={(value) => setSelected(value as string)}
    />
  );
}`}
          preview={
            <MockSelectionButton
              options={options.slice(0, 3)}
              mode="single"
              value="apple"
            />
          }
        />
      </section>

      {/* 禁用选项 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">禁用选项</h2>
        <CodeExample
          title="单个禁用"
          description="通过设置 option.disabled 禁用特定选项"
          language="tsx"
          code={`import { SelectionButton } from 'db-rn-ui';

export default function DisabledOptions() {
  const options = [
    { value: 'red', label: '红色' },
    { value: 'blue', label: '蓝色' },
    { value: 'green', label: '绿色' },
    { value: 'black', label: '黑色', disabled: true },
  ];

  return (
    <SelectionButton
      options={options}
      onChange={(value) => console.log('选中:', value)}
    />
  );
}`}
          preview={
            <MockSelectionButton
              options={colorOptions}
              mode="single"
            />
          }
          defaultExpanded={true}
        />
      </section>

      {/* 全部禁用 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">禁用状态</h2>
        <CodeExample
          title="全部禁用"
          description="通过设置 disabled 属性禁用整个组件"
          language="tsx"
          code={`import { SelectionButton } from 'db-rn-ui';

export default function DisabledButton() {
  const options = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' },
  ];

  return (
    <SelectionButton
      disabled
      options={options}
      value="apple"
    />
  );
}`}
          preview={
            <MockSelectionButton
              options={options.slice(0, 3)}
              mode="single"
              value="apple"
              disabled
            />
          }
        />
      </section>

      {/* 多选限制 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">选择限制</h2>
        <CodeExample
          title="最小/最大选择数"
          description="设置 min 和 max 属性限制多选数量"
          language="tsx"
          code={`import { SelectionButton } from 'db-rn-ui';

export default function LimitedSelect() {
  const options = [
    { value: 'a', label: '选项A' },
    { value: 'b', label: '选项B' },
    { value: 'c', label: '选项C' },
    { value: 'd', label: '选项D' },
    { value: 'e', label: '选项E' },
  ];

  return (
    <SelectionButton
      mode="multiple"
      options={options}
      min={1}
      max={3}
      onChange={(values) => console.log('选中:', values)}
    />
  );
}`}
          preview={
            <div className="space-y-2">
              <p className="text-sm text-gray-500">最少选1个，最多选3个</p>
              <MockSelectionButton
                options={[
                  { value: 'a', label: '选项A' },
                  { value: 'b', label: '选项B' },
                  { value: 'c', label: '选项C' },
                  { value: 'd', label: '选项D' },
                  { value: 'e', label: '选项E' },
                ]}
                mode="multiple"
              />
            </div>
          }
        />
      </section>

      {/* 多行布局 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">多行布局</h2>
        <CodeExample
          title="固定列数"
          description="设置 columns 属性固定每行显示的选项数量"
          language="tsx"
          code={`import { SelectionButton } from 'db-rn-ui';

export default function ColumnsLayout() {
  const options = [
    { value: '1', label: '第一季度' },
    { value: '2', label: '第二季度' },
    { value: '3', label: '第三季度' },
    { value: '4', label: '第四季度' },
  ];

  return (
    <SelectionButton
      options={options}
      columns={2}
      onChange={(value) => console.log('选中:', value)}
    />
  );
}`}
          preview={
            <div className="grid grid-cols-2 gap-2 max-w-xs">
              {['第一季度', '第二季度', '第三季度', '第四季度'].map((label, i) => (
                <button
                  key={i}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 transition-all"
                >
                  {label}
                </button>
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
                { prop: 'mode', desc: '选择模式', type: "'single' | 'multiple'", def: "'single'" },
                { prop: 'options', desc: '选项列表', type: 'SelectionOption[]', def: 'required' },
                { prop: 'value', desc: '当前选中值（受控）', type: 'string | string[]', def: '-' },
                { prop: 'defaultValue', desc: '默认选中值（非受控）', type: 'string | string[]', def: '-' },
                { prop: 'onChange', desc: '选中值变化回调', type: '(value) => void', def: '-' },
                { prop: 'disabled', desc: '是否禁用全部', type: 'boolean', def: 'false' },
                { prop: 'max', desc: '多选最大数量', type: 'number', def: '-' },
                { prop: 'min', desc: '多选最小数量', type: 'number', def: '-' },
                { prop: 'deselectable', desc: '单选是否可取消', type: 'boolean', def: 'true' },
                { prop: 'columns', desc: '每行最大数量', type: 'number', def: '-' },
                { prop: 'activeColor', desc: '选中主色', type: 'string', def: "'#1890ff'" },
                { prop: 'gap', desc: '选项间距', type: 'number', def: '8' },
                { prop: 'borderRadius', desc: '圆角大小', type: 'number', def: '4' },
                { prop: 'style', desc: '容器样式', type: 'ViewStyle', def: '-' },
                { prop: 'itemStyle', desc: '选项样式', type: 'ViewStyle', def: '-' },
                { prop: 'textStyle', desc: '文字样式', type: 'TextStyle', def: '-' },
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

      {/* SelectionOption 类型 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">选项类型</h2>
        <CodeExample
          title="SelectionOption"
          description="选项配置对象的属性说明"
          language="tsx"
          code={`interface SelectionOption<T = string> {
  /** 选项值 */
  value: T;
  /** 显示文本 */
  label: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义渲染内容 */
  renderContent?: (selected: boolean) => React.ReactNode;
}`}
          preview={
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">通过 renderContent 可以自定义选项的渲染内容，实现更复杂的展示效果。</p>
            </div>
          }
        />
      </section>
    </div>
  );
}
