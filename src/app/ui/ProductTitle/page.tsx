'use client';
import React from 'react';
import CodeExample from '@/components/CodeExample';

export default function ProductTitlePage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ProductTitle 商品标题</h1>
        <p className="text-lg text-gray-600">
          电商场景专用的商品标题组件，支持多行省略、前置/后置标签、关键词高亮等功能，适用于商品列表、商品详情等页面。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="多行省略"
          description="设置 numberOfLines 控制显示行数，超出部分自动显示省略号"
          language="tsx"
          code={`import { DbProductTitle } from 'db-rn-ui';

export default function BasicProductTitle() {
  return (
    <DbProductTitle
      title="2024新款春季连衣裙女装气质修身显瘦中长款韩版时尚百搭长袖打底裙"
      numberOfLines={2}
    />
  );
}`}
          preview={
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-800 line-clamp-2">
                2024新款春季连衣裙女装气质修身显瘦中长款韩版时尚百搭长袖打底裙
              </p>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 带前置标签 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">前置标签</h2>
        <CodeExample
          title="使用 prefixTags 添加标签"
          description="在标题前方添加标签，如自营、新品等标识"
          language="tsx"
          code={`import { DbProductTitle } from 'db-rn-ui';

export default function ProductTitleWithTags() {
  return (
    <DbProductTitle
      title="小米14 Pro 徕卡光学镜头 光影猎人900 澎湃OS 骁龙8Gen3"
      numberOfLines={2}
      prefixTags={[
        { text: '自营', color: '#FF2442' },
        { text: '新品', color: '#00C853', outline: true },
      ]}
    />
  );
}`}
          preview={
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-wrap items-start gap-1.5">
                <span className="px-1.5 py-0.5 text-xs rounded" style={{ backgroundColor: '#FF2442', color: '#fff' }}>
                  自营
                </span>
                <span className="px-1.5 py-0.5 text-xs rounded border" style={{ borderColor: '#00C853', color: '#00C853' }}>
                  新品
                </span>
                <span className="text-sm text-gray-800 line-clamp-2">
                  小米14 Pro 徕卡光学镜头 光影猎人900 澎湃OS 骁龙8Gen3
                </span>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 内联标签版本 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">内联标签</h2>
        <CodeExample
          title="使用 Inline 子组件"
          description="标签与标题在同一行显示，更适合紧凑的布局"
          language="tsx"
          code={`import { DbProductTitle } from 'db-rn-ui';

export default function InlineProductTitle() {
  return (
    <DbProductTitle.Inline
      title="Apple iPhone 15 Pro Max 256GB 原色钛金属 支持移动联通电信5G"
      numberOfLines={2}
      inlineTags={[
        { text: '官方', color: '#007AFF' },
        { text: '保价', color: '#FF9500', outline: true },
      ]}
      tagPosition="start"
    />
  );
}`}
          preview={
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="px-1.5 py-0.5 text-xs rounded flex-shrink-0" style={{ backgroundColor: '#007AFF', color: '#fff' }}>
                  官方
                </span>
                <span className="px-1.5 py-0.5 text-xs rounded border flex-shrink-0" style={{ borderColor: '#FF9500', color: '#FF9500' }}>
                  保价
                </span>
                <span className="text-sm text-gray-800 line-clamp-2">
                  Apple iPhone 15 Pro Max 256GB 原色钛金属 支持移动联通电信5G
                </span>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 自定义样式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义样式</h2>
        <CodeExample
          title="调整字体和颜色"
          description="支持自定义字号、颜色、字重等样式属性"
          language="tsx"
          code={`import { DbProductTitle } from 'db-rn-ui';

export default function CustomStyleProductTitle() {
  return (
    <DbProductTitle
      title="限时特惠｜会员专享折扣商品标题展示效果"
      numberOfLines={1}
      fontSize={16}
      fontWeight="700"
      color="#FF2442"
      prefixTags={[
        { text: 'VIP', backgroundColor: '#FFD700', color: '#333' },
      ]}
    />
  );
}`}
          preview={
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 text-xs rounded font-medium" style={{ backgroundColor: '#FFD700', color: '#333' }}>
                  VIP
                </span>
                <span className="text-base font-bold text-red-500 truncate">
                  限时特惠｜会员专享折扣商品标题展示效果
                </span>
              </div>
            </div>
          }
        />
      </section>

      {/* 关键词高亮 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">关键词高亮</h2>
        <CodeExample
          title="高亮特定关键词"
          description="使用 highlightKeywords 属性高亮标题中的特定词语"
          language="tsx"
          code={`import { DbProductTitle } from 'db-rn-ui';

export default function HighlightProductTitle() {
  return (
    <DbProductTitle
      title="Apple MacBook Pro 14英寸 M3 Pro芯片 银色 18GB统一内存"
      numberOfLines={2}
      highlightKeywords={['Apple', 'M3 Pro', '银色']}
      highlightColor="#FF2442"
    />
  );
}`}
          preview={
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-800 line-clamp-2">
                <span className="text-red-500">Apple</span> MacBook Pro 14英寸 <span className="text-red-500">M3 Pro</span>芯片 <span className="text-red-500">银色</span> 18GB统一内存
              </p>
            </div>
          }
        />
      </section>

      {/* 后置标签 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">后置标签</h2>
        <CodeExample
          title="使用 suffixTags 添加标签"
          description="在标题后方添加标签，适用于显示促销信息等"
          language="tsx"
          code={`import { DbProductTitle } from 'db-rn-ui';

export default function SuffixTagsExample() {
  return (
    <DbProductTitle
      title="精选好物推荐"
      numberOfLines={1}
      suffixTags={[
        { text: '热卖', color: '#FF6B6B' },
        { text: '包邮', color: '#4ECDC4', outline: true },
      ]}
    />
  );
}`}
          preview={
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-800 truncate">精选好物推荐</span>
                <span className="px-1.5 py-0.5 text-xs rounded flex-shrink-0" style={{ backgroundColor: '#FF6B6B', color: '#fff' }}>
                  热卖
                </span>
                <span className="px-1.5 py-0.5 text-xs rounded border flex-shrink-0" style={{ borderColor: '#4ECDC4', color: '#4ECDC4' }}>
                  包邮
                </span>
              </div>
            </div>
          }
        />
      </section>

      {/* API 说明表格 - DbProductTitle */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">DbProductTitle API 参数</h2>
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
                { prop: 'title', desc: '商品标题文本', type: 'string', def: '-' },
                { prop: 'numberOfLines', desc: '最大显示行数（超出显示省略号）', type: 'number', def: '2' },
                { prop: 'prefixTags', desc: '前置标签列表', type: 'TitleTagConfig[]', def: '-' },
                { prop: 'suffixTags', desc: '后置标签列表', type: 'TitleTagConfig[]', def: '-' },
                { prop: 'tagGap', desc: '标签与文字的间距', type: 'number', def: '6' },
                { prop: 'tagSpacing', desc: '标签之间的间距', type: 'number', def: '4' },
                { prop: 'fontSize', desc: '标题字号', type: 'number', def: '14' },
                { prop: 'color', desc: '标题颜色', type: 'string', def: "'#333'" },
                { prop: 'fontWeight', desc: '标题字重', type: "TextStyle['fontWeight']", def: "'400'" },
                { prop: 'lineHeight', desc: '行高', type: 'number', def: '20' },
                { prop: 'highlightKeywords', desc: '需要高亮的关键词列表', type: 'string[]', def: '-' },
                { prop: 'highlightColor', desc: '高亮颜色', type: 'string', def: "'#FF2442'" },
                { prop: 'onPress', desc: '点击回调', type: '() => void', def: '-' },
                { prop: 'onLongPress', desc: '长按回调', type: '() => void', def: '-' },
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

      {/* API 说明表格 - DbProductTitle.Inline */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">DbProductTitle.Inline API 参数</h2>
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
                { prop: 'title', desc: '商品标题文本', type: 'string', def: '-' },
                { prop: 'numberOfLines', desc: '最大显示行数', type: 'number', def: '2' },
                { prop: 'inlineTags', desc: '内联标签列表', type: 'TitleTagConfig[]', def: '-' },
                { prop: 'tagPosition', desc: '标签位置', type: "'start' | 'end'", def: "'start'" },
                { prop: 'tagGap', desc: '标签与文字的间距', type: 'number', def: '6' },
                { prop: 'tagSpacing', desc: '标签之间的间距', type: 'number', def: '4' },
                { prop: 'fontSize', desc: '标题字号', type: 'number', def: '14' },
                { prop: 'color', desc: '标题颜色', type: 'string', def: "'#333'" },
                { prop: 'fontWeight', desc: '标题字重', type: "TextStyle['fontWeight']", def: "'400'" },
                { prop: 'lineHeight', desc: '行高', type: 'number', def: '20' },
                { prop: 'onPress', desc: '点击回调', type: '() => void', def: '-' },
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

      {/* TitleTagConfig 类型说明 */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">TitleTagConfig 标签配置</h2>
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
                { prop: 'text', desc: '标签文本（必填）', type: 'string', def: '-' },
                { prop: 'color', desc: '标签颜色（用于边框和文字）', type: 'string', def: "'#999'" },
                { prop: 'backgroundColor', desc: '背景色', type: 'string', def: '-' },
                { prop: 'textColor', desc: '文字颜色（仅实体风格生效）', type: 'string', def: "'#fff'" },
                { prop: 'borderColor', desc: '边框色', type: 'string', def: '-' },
                { prop: 'outline', desc: '是否虚体风格（边框+透明背景）', type: 'boolean', def: 'false' },
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
