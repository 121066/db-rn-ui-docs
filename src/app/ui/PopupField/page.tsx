'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

// ==================== 模拟 Preview 组件 ====================

/** 模拟触发行 */
const MockTriggerRow: React.FC<{
  title: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
}> = ({ title, value, placeholder = '请选择', required, showArrow = true, onClick }) => (
  <div
    className="flex items-center justify-between px-4 py-3.5 bg-white cursor-pointer hover:bg-gray-50 transition-colors rounded-lg border border-gray-200"
    onClick={onClick}
  >
    <span className="text-[15px] font-medium text-gray-900">
      {required && <span className="text-red-500 mr-0.5">*</span>}
      {title}
    </span>
    <div className="flex items-center gap-1">
      <span className={`text-[15px] ${value ? 'text-gray-900' : 'text-gray-400'}`}>
        {value || placeholder}
      </span>
      {showArrow && (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  </div>
);

/** 模拟底部弹窗 - 输入模式 */
const MockInputPopup: React.FC<{
  visible: boolean;
  title: string;
  value: string;
  onClose: () => void;
  onChange: (v: string) => void;
  onConfirm: () => void;
  maxLength?: number;
  placeholder?: string;
}> = ({ visible, title, value, onClose, onChange, onConfirm, maxLength = 200, placeholder = '请输入' }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl animate-[slideUp_0.3s_ease-out] shadow-2xl">
        {/* 头部 */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
          <button className="text-sm text-gray-500 min-w-[44px]" onClick={onClose}>取消</button>
          <span className="text-base font-semibold text-gray-900">{title}</span>
          <button className="text-sm text-red-500 font-medium min-w-[44px] text-right" onClick={onConfirm}>确定</button>
        </div>
        {/* 输入区 */}
        <div className="p-4">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
            <textarea
              className="w-full h-24 bg-transparent text-[15px] text-gray-900 resize-none outline-none placeholder-gray-400"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
            />
            <div className="text-right mt-2">
              <span className="text-xs text-gray-400">
                <span className={value.length > 0 ? 'text-gray-700' : ''}>{value.length}</span>/{maxLength}
              </span>
            </div>
          </div>
        </div>
        {/* 底部安全区 */}
        <div className="h-6" />
      </div>
    </div>
  );
};

/** 模拟底部弹窗 - 单选模式 */
const MockRadioPopup: React.FC<{
  visible: boolean;
  title: string;
  options: { value: string; label: string; description?: string }[];
  value?: string;
  onClose: () => void;
  onChange: (v: string) => void;
}> = ({ visible, title, options, value, onClose, onChange }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl animate-[slideUp_0.3s_ease-out] shadow-2xl">
        {/* 头部 */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
          <button className="text-sm text-gray-500 min-w-[44px]" onClick={onClose}>取消</button>
          <span className="text-base font-semibold text-gray-900">{title}</span>
          <div className="min-w-[44px]" />
        </div>
        {/* 选项列表 */}
        <div className="p-4 space-y-1">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`flex items-center justify-between px-4 py-3.5 rounded-lg cursor-pointer transition-colors ${
                value === opt.value ? 'bg-red-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => onChange(opt.value)}
            >
              <div>
                <div className={`text-[15px] ${value === opt.value ? 'text-red-500 font-medium' : 'text-gray-900'}`}>
                  {opt.label}
                </div>
                {opt.description && (
                  <div className="text-xs text-gray-400 mt-0.5">{opt.description}</div>
                )}
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                value === opt.value ? 'border-red-500' : 'border-gray-300'
              }`}>
                {value === opt.value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="h-6" />
      </div>
    </div>
  );
};

// ==================== 页面主体 ====================

export default function PopupFieldPage() {
  // 交互式演示状态
  const [inputPopupVisible, setInputPopupVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputDraft, setInputDraft] = useState('');

  const [radioPopupVisible, setRadioPopupVisible] = useState(false);
  const [radioValue, setRadioValue] = useState<string | undefined>();

  const returnReasonOptions = [
    { value: 'size', label: '尺码不合适', description: '可免费退换' },
    { value: 'quality', label: '质量问题', description: '支持上门取件' },
    { value: 'dislike', label: '不喜欢/不想要' },
    { value: 'wrong', label: '发错商品' },
    { value: 'other', label: '其他原因' },
  ];

  const radioDisplayText = radioValue
    ? returnReasonOptions.find((o) => o.value === radioValue)?.label
    : undefined;

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">PopupField 弹窗表单字段</h1>
        <p className="text-lg text-gray-600">
          基于 TitlePair + Popup + Radio + Input 组合而成的复合组件。点击触发行弹出弹窗，支持文本输入（如订单备注）和单选选项（如退货原因选择）两种交互模式。
        </p>
        <div className="flex gap-2 mt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            复合组件
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            TitlePair + Popup + Radio + Input
          </span>
        </div>
      </section>

      {/* ==================== 输入模式 - 交互演示 ==================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">输入模式（订单备注）</h2>
        <p className="text-sm text-gray-500">点击下方行打开弹窗输入内容，类似电商订单备注场景。</p>
        <div className="bg-gray-50 p-4 rounded-xl">
          <MockTriggerRow
            title="订单备注"
            value={inputValue || undefined}
            placeholder="选填，请输入备注信息"
            onClick={() => {
              setInputDraft(inputValue);
              setInputPopupVisible(true);
            }}
          />
        </div>
        <MockInputPopup
          visible={inputPopupVisible}
          title="订单备注"
          value={inputDraft}
          onClose={() => setInputPopupVisible(false)}
          onChange={setInputDraft}
          onConfirm={() => {
            setInputValue(inputDraft);
            setInputPopupVisible(false);
          }}
          maxLength={200}
          placeholder="请输入订单备注，如配送时间、包装要求等"
        />
        <CodeExample
          title="基本用法"
          description="mode='input' 模式下点击弹出输入弹窗，适用于订单备注、留言等场景"
          language="tsx"
          code={`import { DbPopupField } from 'db-rn-ui';
import { useState } from 'react';

export default function OrderRemark() {
  const [remark, setRemark] = useState('');

  return (
    <DbPopupField
      mode="input"
      title="订单备注"
      placeholder="选填，请输入备注信息"
      value={remark}
      onChange={setRemark}
      onConfirm={(val) => console.log('备注已保存:', val)}
      inputConfig={{
        type: 'textarea',
        placeholder: '请输入订单备注，如配送时间、包装要求等',
        maxLength: 200,
        rows: 4,
        showCount: true,
      }}
    />
  );
}`}
          preview={
            <div className="bg-gray-50 p-3 rounded-lg">
              <MockTriggerRow
                title="订单备注"
                value={inputValue || undefined}
                placeholder="选填，请输入备注信息"
              />
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* ==================== 单选模式 - 交互演示 ==================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">单选模式（退货原因）</h2>
        <p className="text-sm text-gray-500">点击下方行打开弹窗选择选项，类似选择退货/退款原因场景。</p>
        <div className="bg-gray-50 p-4 rounded-xl">
          <MockTriggerRow
            title="退货原因"
            value={radioDisplayText}
            placeholder="请选择退货原因"
            required
            onClick={() => setRadioPopupVisible(true)}
          />
        </div>
        <MockRadioPopup
          visible={radioPopupVisible}
          title="退货原因"
          options={returnReasonOptions}
          value={radioValue}
          onClose={() => setRadioPopupVisible(false)}
          onChange={(v) => {
            setRadioValue(v);
            setRadioPopupVisible(false);
          }}
        />
        <CodeExample
          title="基本用法"
          description="mode='radio' 模式下点击弹出单选弹窗，适用于退货原因、配送方式等选择场景"
          language="tsx"
          code={`import { DbPopupField } from 'db-rn-ui';
import { useState } from 'react';

export default function ReturnReason() {
  const [reason, setReason] = useState<string>();

  return (
    <DbPopupField
      mode="radio"
      title="退货原因"
      placeholder="请选择退货原因"
      required
      value={reason}
      onChange={setReason}
      onConfirm={(val) => console.log('选择了:', val)}
      radioConfig={{
        options: [
          { value: 'size',    label: '尺码不合适', description: '可免费退换' },
          { value: 'quality', label: '质量问题',   description: '支持上门取件' },
          { value: 'dislike', label: '不喜欢/不想要' },
          { value: 'wrong',   label: '发错商品' },
          { value: 'other',   label: '其他原因' },
        ],
        activeColor: '#FF2442',
        layout: 'right',
      }}
    />
  );
}`}
          preview={
            <div className="bg-gray-50 p-3 rounded-lg">
              <MockTriggerRow
                title="退货原因"
                value={radioDisplayText}
                placeholder="请选择退货原因"
                required
              />
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* ==================== 组合表单场景 ==================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">组合表单场景</h2>
        <CodeExample
          title="退货申请表单"
          description="将多个 DbPopupField 组合成完整的表单，实际业务中的常见用法"
          language="tsx"
          code={`import { DbPopupField } from 'db-rn-ui';
import { View } from 'react-native';
import { useState } from 'react';

export default function ReturnForm() {
  const [reason, setReason] = useState<string>();
  const [method, setMethod] = useState<string>();
  const [remark, setRemark] = useState('');

  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 12 }}>
      {/* 退货原因 - 单选 */}
      <DbPopupField
        mode="radio"
        title="退货原因"
        placeholder="请选择"
        required
        showDivider
        value={reason}
        onChange={setReason}
        radioConfig={{
          options: [
            { value: 'size',    label: '尺码不合适' },
            { value: 'quality', label: '质量问题' },
            { value: 'dislike', label: '不喜欢/不想要' },
            { value: 'other',   label: '其他原因' },
          ],
        }}
      />

      {/* 退货方式 - 单选 */}
      <DbPopupField
        mode="radio"
        title="退货方式"
        placeholder="请选择"
        required
        showDivider
        value={method}
        onChange={setMethod}
        radioConfig={{
          options: [
            { value: 'pickup',  label: '上门取件', description: '快递员上门收取' },
            { value: 'self',    label: '自行寄回', description: '自行联系快递寄回' },
            { value: 'store',   label: '门店退货', description: '到最近门店办理' },
          ],
        }}
      />

      {/* 退货说明 - 输入 */}
      <DbPopupField
        mode="input"
        title="退货说明"
        placeholder="选填"
        value={remark}
        onChange={setRemark}
        inputConfig={{
          type: 'textarea',
          placeholder: '请描述退货原因，方便我们更好为您处理',
          maxLength: 500,
          rows: 5,
        }}
      />
    </View>
  );
}`}
          preview={
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
                <span className="text-[15px] font-medium text-gray-900">
                  <span className="text-red-500 mr-0.5">*</span>退货原因
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[15px] text-gray-400">请选择</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
                <span className="text-[15px] font-medium text-gray-900">
                  <span className="text-red-500 mr-0.5">*</span>退货方式
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[15px] text-gray-400">请选择</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-[15px] font-medium text-gray-900">退货说明</span>
                <div className="flex items-center gap-1">
                  <span className="text-[15px] text-gray-400">选填</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* ==================== 自定义显示文本 ==================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义显示与样式</h2>
        <CodeExample
          title="自定义显示文本"
          description="通过 displayText 属性或函数自定义触发行的显示值"
          language="tsx"
          code={`import { DbPopupField } from 'db-rn-ui';

// 1. 静态文本
<DbPopupField
  mode="radio"
  title="配送方式"
  displayText="顺丰速运 · 预计3天内送达"
  value="sf"
  radioConfig={{
    options: [
      { value: 'sf', label: '顺丰速运' },
      { value: 'yd', label: '韵达快递' },
    ],
  }}
/>

// 2. 函数动态生成
<DbPopupField
  mode="radio"
  title="优惠券"
  displayText={(val) => val ? \`已选择 \${val} 张\` : '去选择'}
  value={couponCount}
  radioConfig={{ options: couponOptions }}
  valueColor="#FF2442"
/>`}
          preview={
            <div className="space-y-2">
              <div className="flex items-center justify-between px-4 py-3.5 bg-white rounded-lg border border-gray-200">
                <span className="text-[15px] font-medium text-gray-900">配送方式</span>
                <div className="flex items-center gap-1">
                  <span className="text-[15px] text-gray-900">顺丰速运 · 预计3天内送达</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3.5 bg-white rounded-lg border border-gray-200">
                <span className="text-[15px] font-medium text-gray-900">优惠券</span>
                <div className="flex items-center gap-1">
                  <span className="text-[15px] text-red-500">已选择 2 张</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* ==================== Ref 命令式 API ==================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Ref 命令式 API</h2>
        <CodeExample
          title="通过 ref 控制弹窗"
          description="使用 ref 可以从外部打开、关闭弹窗，获取和重置值"
          language="tsx"
          code={`import { DbPopupField } from 'db-rn-ui';
import type { DbPopupFieldRef } from 'db-rn-ui';
import { useRef } from 'react';

export default function RefExample() {
  const fieldRef = useRef<DbPopupFieldRef>(null);

  return (
    <>
      <DbPopupField
        ref={fieldRef}
        mode="input"
        title="备注"
        placeholder="请输入"
      />
      <Button title="打开" onPress={() => fieldRef.current?.open()} />
      <Button title="重置" onPress={() => fieldRef.current?.reset()} />
      <Button title="获取值" onPress={() => {
        const val = fieldRef.current?.getValue();
        Alert.alert('当前值', String(val));
      }} />
    </>
  );
}`}
          preview={
            <div className="space-y-3">
              <div className="flex items-center justify-between px-4 py-3.5 bg-white rounded-lg border border-gray-200">
                <span className="text-[15px] font-medium text-gray-900">备注</span>
                <div className="flex items-center gap-1">
                  <span className="text-[15px] text-gray-400">请输入</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium">打开</button>
                <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium">重置</button>
                <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium">获取值</button>
              </div>
            </div>
          }
        />
      </section>

      {/* ==================== API 说明表格 ==================== */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">API 参数</h2>

        {/* 核心 Props */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">DbPopupFieldProps</h3>
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
                  { prop: 'mode', desc: '交互模式', type: "'input' | 'radio'", def: '-（必填）' },
                  { prop: 'value', desc: '当前值（受控）', type: 'T', def: '-' },
                  { prop: 'defaultValue', desc: '默认值（非受控）', type: 'T', def: '-' },
                  { prop: 'onChange', desc: '值变化回调', type: '(value: T) => void', def: '-' },
                  { prop: 'onConfirm', desc: '确认回调', type: '(value: T) => void', def: '-' },
                  { prop: 'onCancel', desc: '取消回调', type: '() => void', def: '-' },
                  { prop: 'title', desc: '标题文本', type: 'string', def: '-（必填）' },
                  { prop: 'placeholder', desc: '占位文本', type: 'string', def: "'请输入'/'请选择'" },
                  { prop: 'displayText', desc: '自定义显示文本', type: 'string | (value) => string', def: '-' },
                  { prop: 'titleLayout', desc: '触发行布局', type: "'horizontal' | 'vertical' | 'space-between'", def: "'space-between'" },
                  { prop: 'required', desc: '是否必填', type: 'boolean', def: 'false' },
                  { prop: 'disabled', desc: '是否禁用', type: 'boolean', def: 'false' },
                  { prop: 'showArrow', desc: '是否显示右侧箭头', type: 'boolean', def: 'true' },
                  { prop: 'showDivider', desc: '是否显示底部分割线', type: 'boolean', def: 'false' },
                  { prop: 'inputConfig', desc: '输入框配置', type: 'PopupFieldInputConfig', def: '{}' },
                  { prop: 'radioConfig', desc: '单选配置', type: 'PopupFieldRadioConfig', def: '-' },
                  { prop: 'popupConfig', desc: '弹窗配置', type: 'PopupFieldPopupConfig', def: '{}' },
                ].map((item) => (
                  <tr key={item.prop}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{item.prop}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                    <td className="px-6 py-4 text-sm text-purple-600 font-mono">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* InputConfig */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">PopupFieldInputConfig</h3>
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
                  { prop: 'type', desc: '输入类型', type: "'text' | 'textarea'", def: "'textarea'" },
                  { prop: 'placeholder', desc: '输入框占位文本', type: 'string', def: "'请输入'" },
                  { prop: 'maxLength', desc: '最大字符数', type: 'number', def: '200' },
                  { prop: 'rows', desc: '多行输入行数', type: 'number', def: '4' },
                  { prop: 'autoGrow', desc: '是否自动增高', type: 'boolean', def: 'false' },
                  { prop: 'showCount', desc: '是否显示字数统计', type: 'boolean', def: 'true' },
                ].map((item) => (
                  <tr key={item.prop}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{item.prop}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                    <td className="px-6 py-4 text-sm text-purple-600 font-mono">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RadioConfig */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">PopupFieldRadioConfig</h3>
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
                  { prop: 'options', desc: '选项列表', type: 'RadioOption<T>[]', def: '-（必填）' },
                  { prop: 'layout', desc: '选择框位置', type: "'left' | 'right'", def: "'right'" },
                  { prop: 'size', desc: '尺寸', type: "'small' | 'medium' | 'large'", def: "'medium'" },
                  { prop: 'activeColor', desc: '选中颜色', type: 'string', def: "'#FF2442'" },
                  { prop: 'spacing', desc: '选项间距', type: 'number', def: '-' },
                ].map((item) => (
                  <tr key={item.prop}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{item.prop}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                    <td className="px-6 py-4 text-sm text-purple-600 font-mono">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ref 方法 */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">DbPopupFieldRef（命令式方法）</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">方法</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { method: 'open()', desc: '打开弹窗', type: '() => void' },
                  { method: 'close()', desc: '关闭弹窗', type: '() => void' },
                  { method: 'getValue()', desc: '获取当前值', type: '() => T' },
                  { method: 'reset()', desc: '重置为默认值', type: '() => void' },
                ].map((item) => (
                  <tr key={item.method}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{item.method}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                    <td className="px-6 py-4 text-sm text-purple-600 font-mono">{item.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==================== 设计说明 ==================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">设计说明</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
          <h3 className="font-semibold text-blue-900">交互逻辑</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>
              <strong>Input 模式</strong>：点击触发行 → 打开底部弹窗 → 用户输入文本 → 点击「确定」提交值 / 点击「取消」放弃修改。
              弹窗关闭前不会更新外部值，确保用户有明确的确认动作。
            </li>
            <li>
              <strong>Radio 模式</strong>：点击触发行 → 打开底部弹窗 → 用户选择选项 → 选中后自动关闭并提交值。
              如需先选择再确认，可设置 <code className="bg-blue-100 px-1 rounded">popupConfig.showActions = true</code>。
            </li>
            <li>
              <strong>受控 / 非受控</strong>：传 <code className="bg-blue-100 px-1 rounded">value</code> + <code className="bg-blue-100 px-1 rounded">onChange</code> 为受控模式；
              传 <code className="bg-blue-100 px-1 rounded">defaultValue</code> 为非受控模式，组件内部管理状态。
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
