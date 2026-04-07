'use client';
import React from 'react';
import CodeExample from '@/components/CodeExample';

export default function TitlePairPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">TitlePair 主副标题</h1>
        <p className="text-lg text-gray-600">
          用于展示成对的主标题和副标题，支持多种布局方式（上下、左右、两端对齐），适用于订单详情、列表项、表单等场景。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="默认上下布局"
          description="最常用的上下排列方式，主标题在上，副标题在下"
          language="tsx"
          code={`import { DbTitlePair } from 'db-rn-ui';

export default function BasicTitlePair() {
  return (
    <DbTitlePair
      title="订单详情"
      subtitle="订单号：2024012500001"
      gap={8}
      subtitleFontSize={14}
    />
  );
}`}
          preview={
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="space-y-2">
                <div className="text-base font-medium text-gray-900">订单详情</div>
                <div className="text-sm text-gray-500">订单号：2024012500001</div>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 布局方式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">布局方式</h2>
        <CodeExample
          title="三种布局模式"
          description="支持 vertical（上下）、horizontal（左右并排）、space-between（两端对齐）三种布局"
          language="tsx"
          code={`import { DbTitlePair } from 'db-rn-ui';

export default function LayoutExamples() {
  return (
    <>
      {/* 两端对齐 - 常用于列表项 */}
      <DbTitlePair
        title="数量"
        subtitle="×1"
        layout="space-between"
        fontSize={14}
        color="#333"
      />
      
      <DbTitlePair
        title="商品小计"
        subtitle="¥99.00"
        layout="space-between"
        fontSize={14}
        color="#333"
      />
      
      {/* 左右并排 */}
      <DbTitlePair
        title="商品总价"
        subtitle="¥ 299.00"
        layout="horizontal"
        subtitleFontSize={18}
        subtitleColor="#FF2442"
        subtitleFontWeight="600"
      />
    </>
  );
}`}
          preview={
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                <span className="text-sm text-gray-800">数量</span>
                <span className="text-sm text-gray-800">×1</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                <span className="text-sm text-gray-800">商品小计</span>
                <span className="text-sm text-gray-800">¥99.00</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-2">
                <span className="text-sm text-gray-800">商品总价</span>
                <span className="text-lg font-semibold text-red-500">¥ 299.00</span>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 对齐方式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">对齐方式</h2>
        <CodeExample
          title="居中对齐"
          description="支持 left、center、right 三种对齐方式"
          language="tsx"
          code={`import { DbTitlePair } from 'db-rn-ui';

export default function AlignExample() {
  return (
    <DbTitlePair
      title="支付成功"
      subtitle="感谢您的购买"
      align="center"
      gap={8}
    />
  );
}`}
          preview={
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-center space-y-2">
                <div className="text-base font-medium text-gray-900">支付成功</div>
                <div className="text-sm text-gray-500">感谢您的购买</div>
              </div>
            </div>
          }
        />
      </section>

      {/* 带必填标记 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">必填标记</h2>
        <CodeExample
          title="显示必填星号"
          description="在表单场景中标记必填字段，支持在标题前后显示"
          language="tsx"
          code={`import { DbTitlePair } from 'db-rn-ui';

export default function RequiredExample() {
  return (
    <DbTitlePair
      title="收货地址"
      subtitle="请填写详细地址"
      required
      requiredPosition="start"
    />
  );
}`}
          preview={
            <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
              <div className="flex items-center gap-1">
                <span className="text-red-500">*</span>
                <span className="text-base font-medium text-gray-900">收货地址</span>
              </div>
              <div className="text-sm text-gray-500">请填写详细地址</div>
            </div>
          }
        />
      </section>

      {/* 带额外元素 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">带图标和交互</h2>
        <CodeExample
          title="左右额外元素"
          description="使用 leftExtra 和 rightExtra 添加图标或其他元素，支持点击事件"
          language="tsx"
          code={`import { DbTitlePair, DbIcon } from 'db-rn-ui';
import { Alert } from 'react-native';

export default function ExtraElementsExample() {
  return (
    <DbTitlePair
      title="配送方式"
      subtitle="预计3天内送达"
      leftExtra={<DbIcon name="cube-outline" family="Ionicons" size={20} color="#007AFF" />}
      rightExtra={<DbIcon name="chevron-forward" family="Ionicons" size={20} color="#999" />}
      onPress={() => Alert.alert('点击', '选择配送方式')}
      layout="space-between"
    />
  );
}`}
          preview={
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-base text-gray-800">配送方式</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-500">预计3天内送达</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* 翻转顺序 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">翻转顺序</h2>
        <CodeExample
          title="副标题在前"
          description="使用 reverse 属性翻转主副标题的显示顺序"
          language="tsx"
          code={`import { DbTitlePair } from 'db-rn-ui';

export default function ReverseExample() {
  return (
    <DbTitlePair
      title="主标题"
      subtitle="副标题在上方"
      reverse
      gap={4}
      subtitleFontSize={12}
      subtitleColor="#999"
    />
  );
}`}
          preview={
            <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-1">
              <div className="text-xs text-gray-400">副标题在上方</div>
              <div className="text-base font-medium text-gray-900">主标题</div>
            </div>
          }
        />
      </section>

      {/* 带分割线 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">分割线</h2>
        <CodeExample
          title="显示分割线"
          description="在 horizontal 布局时显示主副标题之间的分割线"
          language="tsx"
          code={`import { DbTitlePair } from 'db-rn-ui';

export default function DividerExample() {
  return (
    <DbTitlePair
      title="商品信息"
      subtitle="查看更多"
      layout="horizontal"
      showDivider
      subtitleColor="#007AFF"
    />
  );
}`}
          preview={
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-base text-gray-800">商品信息</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-blue-500">查看更多</span>
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
                { prop: 'title', desc: '主标题文本或配置对象', type: 'string | MainTitleConfig', def: '-' },
                { prop: 'subtitle', desc: '副标题文本或配置对象', type: 'string | SubTitleConfig', def: '-' },
                { prop: 'layout', desc: '布局方向', type: "'vertical' | 'horizontal' | 'space-between'", def: "'vertical'" },
                { prop: 'align', desc: '对齐方式', type: "'left' | 'center' | 'right'", def: "'left'" },
                { prop: 'verticalAlign', desc: '垂直对齐（horizontal/space-between 时有效）', type: "'top' | 'center' | 'bottom'", def: "'center'" },
                { prop: 'gap', desc: '主副标题间距', type: 'number', def: '4' },
                { prop: 'reverse', desc: '是否翻转顺序（副标题在前）', type: 'boolean', def: 'false' },
                { prop: 'fontSize', desc: '统一样式：字号（同时应用于主副标题）', type: 'number', def: '-' },
                { prop: 'color', desc: '统一样式：颜色（同时应用于主副标题）', type: 'string', def: '-' },
                { prop: 'fontWeight', desc: '统一样式：字重', type: "TextStyle['fontWeight']", def: '-' },
                { prop: 'titleFontSize', desc: '主标题字号', type: 'number', def: '16' },
                { prop: 'titleColor', desc: '主标题颜色', type: 'string', def: "'#333'" },
                { prop: 'titleFontWeight', desc: '主标题字重', type: "TextStyle['fontWeight']", def: "'500'" },
                { prop: 'subtitleFontSize', desc: '副标题字号', type: 'number', def: '14' },
                { prop: 'subtitleColor', desc: '副标题颜色', type: 'string', def: "'#999'" },
                { prop: 'leftExtra', desc: '左侧额外元素', type: 'ReactNode', def: '-' },
                { prop: 'rightExtra', desc: '右侧额外元素', type: 'ReactNode', def: '-' },
                { prop: 'leftExtraGap', desc: '左侧元素与内容间距', type: 'number', def: '8' },
                { prop: 'rightExtraGap', desc: '右侧元素与内容间距', type: 'number', def: '8' },
                { prop: 'onPress', desc: '点击回调', type: '() => void', def: '-' },
                { prop: 'showDivider', desc: '是否显示分割线', type: 'boolean', def: 'false' },
                { prop: 'required', desc: '是否显示必填星号', type: 'boolean', def: 'false' },
                { prop: 'requiredPosition', desc: '必填星号位置', type: "'start' | 'end'", def: "'start'" },
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
