'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

export default function InputPage() {
  const [textValue, setTextValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [numberValue, setNumberValue] = useState('');

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Input 输入框</h1>
        <p className="text-lg text-gray-600">
          用于接收用户输入的基础组件，支持多种输入类型、验证状态和自定义样式。
        </p>
      </section>

      {/* 基础文本输入 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础文本输入</h2>
        <CodeExample
          title="文本输入框"
          description="基础的文本输入框，支持标签、占位符和提示文字"
          language="tsx"
          code={`import { useState } from 'react';

export default function BasicInput() {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          用户名
        </label>
        <input
          type="text"
          placeholder="请输入用户名"
          value={value}
          onChange={(e) => setValue((e.target as any).value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">用户名长度 4-20 个字符</p>
      </div>
    </div>
  );
}`}
          preview={
            <div className="w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  用户名
                </label>
                <input
                  type="text"
                  placeholder="请输入用户名"
                  value={textValue}
                  onChange={(e) => setTextValue((e.target as any).value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">用户名长度 4-20 个字符</p>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 密码输入 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">密码输入</h2>
        <CodeExample
          title="密码输入框"
          description="用于输入密码，支持显示/隐藏密码"
          language="tsx"
          code={`import { useState } from 'react';

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          密码 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword((e.target as any).value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? '隐藏' : '显示'}
          </button>
        </div>
      </div>
    </div>
  );
}`}
          preview={
            <div className="w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  密码 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={passwordValue ? 'text' : 'password'}
                    placeholder="请输入密码"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue((e.target as any).value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* 数字输入 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">数字输入</h2>
        <CodeExample
          title="数字输入框"
          description="用于输入数字，支持最小值、最大值和步进"
          language="tsx"
          code={`import { useState } from 'react';

export default function NumberInput() {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat((e.target as any).value) || 0;
    const clamped = Math.max(0, Math.min(999, val));
    setQuantity(clamped);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          商品数量
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(0, quantity - 1))}
            className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleChange}
            min="0"
            max="999"
            className="w-20 px-4 py-2 border border-gray-300 rounded text-center"
          />
          <button
            onClick={() => setQuantity(Math.min(999, quantity + 1))}
            className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}`}
          preview={
            <div className="w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  商品数量
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNumberValue(Math.max(0, parseFloat(numberValue || '0') - 1).toString())}
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={numberValue}
                    onChange={(e) => setNumberValue((e.target as any).value)}
                    min="0"
                    max="999"
                    className="w-20 px-4 py-2 border border-gray-300 rounded text-center"
                  />
                  <button
                    onClick={() => setNumberValue(Math.min(999, parseFloat(numberValue || '0') + 1).toString())}
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* 多行文本 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">多行文本</h2>
        <CodeExample
          title="文本域"
          description="用于输入多行文本，支持字数限制和自动扩展"
          language="tsx"
          code={`import { useState } from 'react';

export default function Textarea() {
  const [description, setDescription] = useState('');
  const maxLength = 200;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          商品描述
        </label>
        <textarea
          placeholder="请输入商品描述..."
          value={description}
          onChange={(e) => setDescription((e.target as any).value.slice(0, maxLength))}
          rows={4}
          maxLength={maxLength}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">请输入商品描述</p>
          <p className="text-xs text-gray-500">{description.length}/{maxLength}</p>
        </div>
      </div>
    </div>
  );
}`}
          preview={
            <div className="w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  商品描述
                </label>
                <textarea
                  placeholder="请输入商品描述..."
                  rows={4}
                  maxLength={200}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">请输入商品描述</p>
                  <p className="text-xs text-gray-500">0/200</p>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* 输入框状态 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">输入框状态</h2>
        <CodeExample
          title="不同的输入框状态"
          description="展示成功、错误和禁用状态"
          language="tsx"
          code={`export default function InputStates() {
  return (
    <div className="space-y-4">
      {/* 成功状态 */}
      <div>
        <input
          type="text"
          defaultValue="验证通过"
          className="w-full px-4 py-2 border-2 border-green-500 rounded-lg bg-green-50"
        />
      </div>

      {/* 错误状态 */}
      <div>
        <input
          type="text"
          defaultValue="admin"
          className="w-full px-4 py-2 border-2 border-red-500 rounded-lg bg-red-50"
        />
        <p className="text-xs text-red-500 mt-1">用户名已存在</p>
      </div>

      {/* 禁用状态 */}
      <div>
        <input
          type="text"
          defaultValue="不可编辑"
          disabled
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
        />
      </div>
    </div>
  );
}`}
          preview={
            <div className="w-full space-y-4">
              <div>
                <input
                  type="text"
                  defaultValue="验证通过"
                  className="w-full px-4 py-2 border-2 border-green-500 rounded-lg bg-green-50"
                />
              </div>
              <div>
                <input
                  type="text"
                  defaultValue="admin"
                  className="w-full px-4 py-2 border-2 border-red-500 rounded-lg bg-red-50"
                />
                <p className="text-xs text-red-500 mt-1">用户名已存在</p>
              </div>
              <div>
                <input
                  type="text"
                  defaultValue="不可编辑"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
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
                { prop: 'type', desc: '输入框类型', type: "'text' | 'password' | 'number' | 'email' | 'phone' | 'textarea'", def: "'text'" },
                { prop: 'label', desc: '输入框标签', type: 'string', def: '-' },
                { prop: 'placeholder', desc: '占位符文字', type: 'string', def: '-' },
                { prop: 'value', desc: '输入框值', type: 'string | number', def: '-' },
                { prop: 'onChange', desc: '值变化回调', type: '(value: string) => void', def: '-' },
                { prop: 'disabled', desc: '是否禁用', type: 'boolean', def: 'false' },
                { prop: 'required', desc: '是否必填', type: 'boolean', def: 'false' },
                { prop: 'maxLength', desc: '最大字符数', type: 'number', def: '-' },
                { prop: 'min', desc: '最小值（数字类型）', type: 'number', def: '-' },
                { prop: 'max', desc: '最大值（数字类型）', type: 'number', def: '-' },
                { prop: 'status', desc: '输入框状态', type: "'success' | 'error' | 'warning'", def: '-' },
                { prop: 'error', desc: '错误提示文字', type: 'string', def: '-' },
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
