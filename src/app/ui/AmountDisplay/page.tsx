'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 AmountDisplay 组件
interface MockAmountDisplayProps {
  amount: number;
  currency?: string;
  mainFontSize?: number;
  subFontSize?: number;
  mainColor?: string;
  subColor?: string;
  mainFontWeight?: string;
  editable?: boolean;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  decimalPlaces?: number;
  disabled?: boolean;
  showStepper?: boolean;
  step?: number;
  stepperSize?: 'small' | 'medium' | 'large';
  stepperColor?: string;
}

const MockAmountDisplay: React.FC<MockAmountDisplayProps> = ({
  amount,
  currency = '¥',
  mainFontSize = 24,
  subFontSize,
  mainColor = '#1F2937',
  subColor,
  mainFontWeight = 'bold',
  editable = false,
  onChange,
  min = 0,
  max = Infinity,
  decimalPlaces = 2,
  disabled = false,
  showStepper = false,
  step = 1,
  stepperSize = 'medium',
  stepperColor = '#3B82F6',
}) => {
  const [value, setValue] = useState(amount);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(amount.toFixed(decimalPlaces));

  const actualSubFontSize = subFontSize || mainFontSize * 0.6;
  const actualSubColor = subColor || mainColor;

  const formatAmount = (val: number) => {
    const parts = val.toFixed(decimalPlaces).split('.');
    return {
      integer: parts[0],
      decimal: parts[1] ? `.${parts[1]}` : '',
    };
  };

  const { integer, decimal } = formatAmount(value);

  const handleStep = (direction: 'increase' | 'decrease') => {
    if (disabled) return;
    const newValue = direction === 'increase' ? value + step : value - step;
    if (newValue >= min && newValue <= max) {
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as any).value);
  };

  const handleInputBlur = () => {
    let newValue = parseFloat(inputValue);
    if (isNaN(newValue)) newValue = min;
    newValue = Math.max(min, Math.min(max, newValue));
    setValue(newValue);
    setInputValue(newValue.toFixed(decimalPlaces));
    setIsEditing(false);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const getStepperButtonSize = () => {
    switch (stepperSize) {
      case 'small':
        return 'w-6 h-6';
      case 'large':
        return 'w-10 h-10';
      case 'medium':
      default:
        return 'w-8 h-8';
    }
  };

  const amountContent = (
    <div className="flex items-baseline">
      <span
        style={{
          fontSize: actualSubFontSize,
          color: actualSubColor,
          fontWeight: mainFontWeight,
        }}
      >
        {currency}
      </span>
      {isEditing && editable ? (
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="border-b-2 border-blue-500 outline-none bg-transparent"
          style={{
            fontSize: mainFontSize,
            color: mainColor,
            fontWeight: mainFontWeight,
            width: `${inputValue.length + 2}ch`,
          }}
          autoFocus
        />
      ) : (
        <>
          <span
            style={{
              fontSize: mainFontSize,
              color: mainColor,
              fontWeight: mainFontWeight,
            }}
            className={editable && !disabled ? 'cursor-pointer hover:opacity-70' : ''}
            onClick={() => editable && !disabled && setIsEditing(true)}
          >
            {integer}
          </span>
          <span
            style={{
              fontSize: actualSubFontSize,
              color: actualSubColor,
              fontWeight: mainFontWeight,
            }}
            className={editable && !disabled ? 'cursor-pointer hover:opacity-70' : ''}
            onClick={() => editable && !disabled && setIsEditing(true)}
          >
            {decimal}
          </span>
        </>
      )}
    </div>
  );

  if (showStepper) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleStep('decrease')}
          disabled={disabled || value <= min}
          className={`${getStepperButtonSize()} rounded-full flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors`}
          style={{ backgroundColor: stepperColor }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <div className={disabled ? 'opacity-50' : ''}>{amountContent}</div>
        <button
          onClick={() => handleStep('increase')}
          disabled={disabled || value >= max}
          className={`${getStepperButtonSize()} rounded-full flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors`}
          style={{ backgroundColor: stepperColor }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className={disabled ? 'opacity-50' : ''}>
      {amountContent}
      {editable && !disabled && !isEditing && (
        <p className="text-xs text-gray-400 mt-1">点击金额可编辑</p>
      )}
    </div>
  );
};

export default function AmountDisplayPage() {
  const [editableValue, setEditableValue] = useState(99.99);
  const [stepperValue, setStepperValue] = useState(5);

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AmountDisplay 金额展示</h1>
        <p className="text-lg text-gray-600">
          用于展示和编辑金额的组件，支持币种符号、自定义字体大小和颜色、步进器加减、直接输入编辑等功能。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="简单金额展示"
          description="最基本的金额展示，默认显示人民币符号"
          language="tsx"
          code={`import { DbAmountDisplay } from 'db-rn-ui';

export default function BasicAmountDisplay() {
  return <DbAmountDisplay amount={199.99} />;
}`}
          preview={
            <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
              <MockAmountDisplay amount={199.99} />
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 字体大小 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">字体大小</h2>
        <CodeExample
          title="自定义字体大小"
          description="可设置主字体大小和辅助字体大小（币种和小数部分）"
          language="tsx"
          code={`import { DbAmountDisplay } from 'db-rn-ui';

// 小尺寸
<DbAmountDisplay amount={99.99} mainFontSize={16} />

// 中等尺寸（默认）
<DbAmountDisplay amount={99.99} mainFontSize={24} />

// 大尺寸
<DbAmountDisplay amount={99.99} mainFontSize={36} />`}
          preview={
            <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 rounded-lg">
              <MockAmountDisplay amount={99.99} mainFontSize={16} />
              <MockAmountDisplay amount={99.99} mainFontSize={24} />
              <MockAmountDisplay amount={99.99} mainFontSize={36} />
            </div>
          }
        />
      </section>

      {/* 颜色设置 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">颜色设置</h2>
        <CodeExample
          title="自定义颜色"
          description="可设置主字体颜色和辅助字体颜色"
          language="tsx"
          code={`import { DbAmountDisplay } from 'db-rn-ui';

// 红色价格（促销）
<DbAmountDisplay amount={199.99} mainColor="#EF4444" subColor="#EF4444" />

// 绿色价格
<DbAmountDisplay amount={199.99} mainColor="#10B981" subColor="#10B981" />

// 主副颜色不同
<DbAmountDisplay 
  amount={199.99} 
  mainColor="#1F2937" 
  subColor="#9CA3AF" 
/>`}
          preview={
            <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 rounded-lg">
              <MockAmountDisplay amount={199.99} mainColor="#EF4444" subColor="#EF4444" />
              <MockAmountDisplay amount={199.99} mainColor="#10B981" subColor="#10B981" />
              <MockAmountDisplay amount={199.99} mainColor="#1F2937" subColor="#9CA3AF" />
            </div>
          }
        />
      </section>

      {/* 币种符号 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">币种符号</h2>
        <CodeExample
          title="自定义币种"
          description="支持自定义币种符号"
          language="tsx"
          code={`import { DbAmountDisplay } from 'db-rn-ui';

// 人民币（默认）
<DbAmountDisplay amount={199.99} currency="¥" />

// 美元
<DbAmountDisplay amount={199.99} currency="$" />

// 欧元
<DbAmountDisplay amount={199.99} currency="€" />

// 英镑
<DbAmountDisplay amount={199.99} currency="£" />`}
          preview={
            <div className="flex flex-wrap items-center justify-center gap-8 p-6 bg-gray-50 rounded-lg">
              <MockAmountDisplay amount={199.99} currency="¥" />
              <MockAmountDisplay amount={199.99} currency="$" />
              <MockAmountDisplay amount={199.99} currency="€" />
              <MockAmountDisplay amount={199.99} currency="£" />
            </div>
          }
        />
      </section>

      {/* 字体粗细 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">字体粗细</h2>
        <CodeExample
          title="自定义字体粗细"
          description="可设置主字体的粗细程度"
          language="tsx"
          code={`import { DbAmountDisplay } from 'db-rn-ui';

<DbAmountDisplay amount={199.99} mainFontWeight="normal" />
<DbAmountDisplay amount={199.99} mainFontWeight="600" />
<DbAmountDisplay amount={199.99} mainFontWeight="bold" />`}
          preview={
            <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 rounded-lg">
              <MockAmountDisplay amount={199.99} mainFontWeight="normal" />
              <MockAmountDisplay amount={199.99} mainFontWeight="600" />
              <MockAmountDisplay amount={199.99} mainFontWeight="bold" />
            </div>
          }
        />
      </section>

      {/* 步进器 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">步进器</h2>
        <CodeExample
          title="带加减按钮"
          description="显示步进器按钮，支持点击增减金额"
          language="tsx"
          code={`import { DbAmountDisplay } from 'db-rn-ui';
import { useState } from 'react';

export default function StepperExample() {
  const [amount, setAmount] = useState(5);

  return (
    <DbAmountDisplay
      amount={amount}
      showStepper
      step={1}
      min={0}
      max={10}
      onChange={setAmount}
    />
  );
}`}
          preview={
            <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">默认尺寸</p>
                <MockAmountDisplay
                  amount={stepperValue}
                  showStepper
                  step={1}
                  min={0}
                  max={10}
                  onChange={setStepperValue}
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">小尺寸 (step=0.5)</p>
                <MockAmountDisplay
                  amount={9.5}
                  showStepper
                  step={0.5}
                  stepperSize="small"
                  stepperColor="#10B981"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">大尺寸</p>
                <MockAmountDisplay
                  amount={100}
                  showStepper
                  step={10}
                  stepperSize="large"
                  stepperColor="#F59E0B"
                />
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 可编辑 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">可编辑</h2>
        <CodeExample
          title="直接输入编辑"
          description="支持点击金额直接输入编辑"
          language="tsx"
          code={`import { DbAmountDisplay } from 'db-rn-ui';
import { useState } from 'react';

export default function EditableExample() {
  const [amount, setAmount] = useState(99.99);

  return (
    <DbAmountDisplay
      amount={amount}
      editable
      min={0}
      max={9999}
      decimalPlaces={2}
      onChange={setAmount}
    />
  );
}`}
          preview={
            <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">点击金额可编辑</p>
                <MockAmountDisplay
                  amount={editableValue}
                  editable
                  min={0}
                  max={9999}
                  decimalPlaces={2}
                  onChange={setEditableValue}
                />
              </div>
            </div>
          }
        />
      </section>

      {/* 禁用状态 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">禁用状态</h2>
        <CodeExample
          title="禁用状态"
          description="设置 disabled 禁用编辑和步进器"
          language="tsx"
          code={`import { DbAmountDisplay } from 'db-rn-ui';

<DbAmountDisplay amount={199.99} disabled />`}
          preview={
            <div className="flex items-center justify-center gap-8 p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">正常状态</p>
                <MockAmountDisplay amount={199.99} showStepper />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">禁用状态</p>
                <MockAmountDisplay amount={199.99} showStepper disabled />
              </div>
            </div>
          }
        />
      </section>

      {/* 小数位数 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">小数位数</h2>
        <CodeExample
          title="自定义小数位数"
          description="可设置显示的小数位数"
          language="tsx"
          code={`import { DbAmountDisplay } from 'db-rn-ui';

// 整数
<DbAmountDisplay amount={199} decimalPlaces={0} />

// 一位小数
<DbAmountDisplay amount={199.5} decimalPlaces={1} />

// 两位小数（默认）
<DbAmountDisplay amount={199.99} decimalPlaces={2} />`}
          preview={
            <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 rounded-lg">
              <MockAmountDisplay amount={199} decimalPlaces={0} />
              <MockAmountDisplay amount={199.5} decimalPlaces={1} />
              <MockAmountDisplay amount={199.99} decimalPlaces={2} />
            </div>
          }
        />
      </section>

      {/* 综合示例 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">综合示例</h2>
        <CodeExample
          title="电商场景应用"
          description="商品详情页价格展示、购物车数量编辑等场景"
          language="tsx"
          code={`import { DbAmountDisplay } from 'db-rn-ui';

// 商品原价（划线价）
<View style={{ opacity: 0.5 }}>
  <DbAmountDisplay 
    amount={299.99} 
    mainColor="#9CA3AF"
    mainFontSize={14}
  />
</View>

// 商品现价（促销价）
<DbAmountDisplay 
  amount={199.99} 
  mainColor="#EF4444"
  mainFontSize={28}
  mainFontWeight="bold"
/>

// 购物车数量编辑
<DbAmountDisplay 
  amount={quantity}
  showStepper
  step={1}
  min={1}
  max={99}
  mainFontSize={16}
  onChange={setQuantity}
/>`}
          preview={
            <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
              {/* 商品卡片价格展示 */}
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">商品详情页价格</p>
                <div className="flex items-baseline gap-3">
                  <div className="opacity-50 line-through">
                    <MockAmountDisplay amount={299.99} mainColor="#9CA3AF" mainFontSize={14} />
                  </div>
                  <MockAmountDisplay 
                    amount={199.99} 
                    mainColor="#EF4444"
                    mainFontSize={28}
                    mainFontWeight="bold"
                  />
                </div>
              </div>

              {/* 购物车数量 */}
              <div className="bg-white p-4 rounded-lg flex items-center justify-between">
                <span className="text-gray-700">购买数量</span>
                <MockAmountDisplay 
                  amount={2}
                  showStepper
                  step={1}
                  min={1}
                  max={99}
                  mainFontSize={16}
                />
              </div>

              {/* 充值金额选择 */}
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-3">充值金额</p>
                <div className="flex items-center gap-4">
                  <MockAmountDisplay 
                    amount={100}
                    showStepper
                    step={50}
                    min={50}
                    max={1000}
                    mainFontSize={20}
                    mainColor="#3B82F6"
                    stepperColor="#3B82F6"
                  />
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* API 参数 */}
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
                { prop: 'amount', desc: '金额值', type: 'number', def: '-' },
                { prop: 'currency', desc: '币种符号', type: 'string', def: '"¥"' },
                { prop: 'mainFontSize', desc: '主字体大小', type: 'number', def: '24' },
                { prop: 'subFontSize', desc: '辅助字体大小', type: 'number', def: '主字体的一半' },
                { prop: 'mainColor', desc: '主字体颜色', type: 'string', def: '"#1F2937"' },
                { prop: 'subColor', desc: '辅助字体颜色', type: 'string', def: '主颜色' },
                { prop: 'mainFontWeight', desc: '主字体粗细', type: 'string', def: '"bold"' },
                { prop: 'decimalPlaces', desc: '小数位数', type: 'number', def: '2' },
                { prop: 'editable', desc: '是否可编辑', type: 'boolean', def: 'false' },
                { prop: 'onChange', desc: '金额变化回调', type: '(value: number) => void', def: '-' },
                { prop: 'min', desc: '最小值', type: 'number', def: '0' },
                { prop: 'max', desc: '最大值', type: 'number', def: 'Infinity' },
                { prop: 'disabled', desc: '是否禁用', type: 'boolean', def: 'false' },
                { prop: 'showStepper', desc: '是否显示步进器', type: 'boolean', def: 'false' },
                { prop: 'step', desc: '步进值', type: 'number', def: '1' },
                { prop: 'stepperSize', desc: '步进器按钮大小', type: "'small' | 'medium' | 'large'", def: "'medium'" },
                { prop: 'stepperColor', desc: '步进器按钮颜色', type: 'string', def: '"#3B82F6"' },
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

      {/* 使用建议 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">使用建议</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-4">场景推荐</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>商品列表/详情页价格展示：使用默认配置，主色红色突出促销价格</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>购物车数量编辑：开启 showStepper，设置合理的 min/max 范围</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>金额输入场景：开启 editable，配合 onChange 实现受控组件</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>订单金额展示：使用大字体 mainFontSize={28}，突出显示</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>积分/金币展示：自定义 currency 为"积分"、"金币"等</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
