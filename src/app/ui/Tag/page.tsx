'use client';
import React from 'react';
import CodeExample from '@/components/CodeExample';

export default function TagPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tag 标签</h1>
        <p className="text-lg text-gray-600">
          用于标记和分类的小型组件，支持多种预设样式、尺寸和变体，适用于商品标签、状态标记、分类展示等场景。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="预设类型"
          description="使用 preset 属性快速应用预设样式"
          language="tsx"
          code={`import { DbTag } from 'db-rn-ui';

export default function BasicTags() {
  return (
    <DbTag.Group gap={8}>
      <DbTag text="默认" preset="default" />
      <DbTag text="主要" preset="primary" />
      <DbTag text="成功" preset="success" />
      <DbTag text="警告" preset="warning" />
      <DbTag text="危险" preset="danger" />
    </DbTag.Group>
  );
}`}
          preview={
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">默认</span>
              <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm">主要</span>
              <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">成功</span>
              <span className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">警告</span>
              <span className="px-3 py-1 bg-red-500 text-white rounded text-sm">危险</span>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 电商预设 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">电商预设</h2>
        <CodeExample
          title="电商场景专用预设"
          description="专为电商场景设计的预设样式"
          language="tsx"
          code={`import { DbTag } from 'db-rn-ui';

export default function EcommerceTags() {
  return (
    <DbTag.Group gap={8}>
      <DbTag text="HOT" preset="hot" />
      <DbTag text="NEW" preset="new" />
      <DbTag text="促销" preset="sale" />
      <DbTag text="折扣" preset="discount" />
      <DbTag text="包邮" preset="free-shipping" />
      <DbTag text="七天无理由" preset="guarantee" />
      <DbTag text="VIP" preset="vip" />
      <DbTag text="推荐" preset="recommend" />
    </DbTag.Group>
  );
}`}
          preview={
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-red-500 text-white rounded text-sm font-medium">HOT</span>
              <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">NEW</span>
              <span className="px-3 py-1 bg-orange-500 text-white rounded text-sm">促销</span>
              <span className="px-3 py-1 bg-pink-500 text-white rounded text-sm">折扣</span>
              <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm">包邮</span>
              <span className="px-3 py-1 bg-teal-500 text-white rounded text-sm">七天无理由</span>
              <span className="px-3 py-1 bg-yellow-500 text-white rounded text-sm font-bold">VIP</span>
              <span className="px-3 py-1 bg-purple-500 text-white rounded text-sm">推荐</span>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 变体风格 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">变体风格</h2>
        <CodeExample
          title="三种变体样式"
          description="支持 solid（实体）、outline（虚体/描边）、light（浅色背景）三种风格"
          language="tsx"
          code={`import { DbTag } from 'db-rn-ui';

export default function TagVariants() {
  return (
    <>
      <DbTag.Group gap={8}>
        <DbTag text="热门" preset="hot" variant="solid" />
        <DbTag text="新品" preset="new" variant="solid" />
        <DbTag text="促销" preset="sale" variant="solid" />
      </DbTag.Group>
      
      <DbTag.Group gap={8} style={{ marginTop: 12 }}>
        <DbTag text="热门" preset="hot" variant="outline" />
        <DbTag text="新品" preset="new" variant="outline" />
        <DbTag text="促销" preset="sale" variant="outline" />
      </DbTag.Group>
      
      <DbTag.Group gap={8} style={{ marginTop: 12 }}>
        <DbTag text="热门" preset="hot" variant="light" />
        <DbTag text="新品" preset="new" variant="light" />
        <DbTag text="VIP专享" preset="vip" variant="light" />
      </DbTag.Group>
    </>
  );
}`}
          preview={
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-500 text-white rounded text-sm">热门</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">新品</span>
                <span className="px-3 py-1 bg-orange-500 text-white rounded text-sm">促销</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 border-2 border-red-500 text-red-500 rounded text-sm">热门</span>
                <span className="px-3 py-1 border-2 border-green-500 text-green-500 rounded text-sm">新品</span>
                <span className="px-3 py-1 border-2 border-orange-500 text-orange-500 rounded text-sm">促销</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm">热门</span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded text-sm">新品</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm font-bold">VIP专享</span>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 标签尺寸 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">标签尺寸</h2>
        <CodeExample
          title="四种尺寸"
          description="支持 mini、small、medium、large 四种尺寸"
          language="tsx"
          code={`import { DbTag } from 'db-rn-ui';

export default function TagSizes() {
  return (
    <DbTag.Group gap={8} style={{ alignItems: 'center' }}>
      <DbTag text="Mini" preset="primary" size="mini" />
      <DbTag text="Small" preset="primary" size="small" />
      <DbTag text="Medium" preset="primary" size="medium" />
      <DbTag text="Large" preset="primary" size="large" />
    </DbTag.Group>
  );
}`}
          preview={
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs">Mini</span>
              <span className="px-2.5 py-1 bg-blue-500 text-white rounded text-sm">Small</span>
              <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Medium</span>
              <span className="px-4 py-1.5 bg-blue-500 text-white rounded text-base">Large</span>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 标签形状 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">标签形状</h2>
        <CodeExample
          title="三种形状"
          description="支持 square（方形）、rounded（圆角）、round（胶囊）三种形状"
          language="tsx"
          code={`import { DbTag } from 'db-rn-ui';

export default function TagShapes() {
  return (
    <DbTag.Group gap={8}>
      <DbTag text="方形" preset="success" shape="square" />
      <DbTag text="圆角" preset="success" shape="rounded" />
      <DbTag text="胶囊" preset="success" shape="round" />
    </DbTag.Group>
  );
}`}
          preview={
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-500 text-white text-sm" style={{ borderRadius: '2px' }}>方形</span>
              <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">圆角</span>
              <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">胶囊</span>
            </div>
          }
        />
      </section>

      {/* 自定义颜色 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义颜色</h2>
        <CodeExample
          title="完全自定义样式"
          description="通过 color、backgroundColor、textColor、borderColor 实现完全自定义"
          language="tsx"
          code={`import { DbTag } from 'db-rn-ui';

export default function CustomTags() {
  return (
    <DbTag.Group gap={8}>
      {/* 使用 color 属性快速设置 */}
      <DbTag text="自定义实体" color="#8B5CF6" />
      <DbTag text="自定义虚体" color="#8B5CF6" variant="outline" />
      
      {/* 完全自定义颜色 */}
      <DbTag
        text="完全自定义"
        backgroundColor="#FEF3C7"
        textColor="#92400E"
        borderColor="#F59E0B"
        variant="outline"
      />
    </DbTag.Group>
  );
}`}
          preview={
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-500 text-white rounded text-sm">自定义实体</span>
              <span className="px-3 py-1 border-2 border-purple-500 text-purple-500 rounded text-sm">自定义虚体</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 border border-yellow-400 rounded text-sm">完全自定义</span>
            </div>
          }
        />
      </section>

      {/* 可关闭标签 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">可交互标签</h2>
        <CodeExample
          title="可关闭和可点击"
          description="启用 closable 显示关闭按钮，启用 pressable 添加点击效果"
          language="tsx"
          code={`import { DbTag } from 'db-rn-ui';
import { Alert } from 'react-native';

export default function InteractiveTags() {
  return (
    <DbTag.Group gap={8}>
      <DbTag
        text="点击关闭"
        preset="primary"
        closable
        onClose={() => Alert.alert('关闭', '标签已关闭')}
      />
      <DbTag
        text="可点击"
        preset="hot"
        pressable
        onPress={() => Alert.alert('点击', '标签被点击')}
      />
    </DbTag.Group>
  );
}`}
          preview={
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm flex items-center gap-1">
                点击关闭
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <span className="px-3 py-1 bg-red-500 text-white rounded text-sm cursor-pointer">可点击</span>
            </div>
          }
        />
      </section>

      {/* 标签组 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">标签组</h2>
        <CodeExample
          title="使用 DbTag.Group"
          description="使用 DbTag.Group 管理一组标签的间距和对齐方式"
          language="tsx"
          code={`import { DbTag } from 'db-rn-ui';

export default function TagGroups() {
  return (
    <>
      {/* 左对齐（默认） */}
      <DbTag.Group gap={8}>
        <DbTag text="标签1" preset="primary" />
        <DbTag text="标签2" preset="success" />
        <DbTag text="标签3" preset="warning" />
      </DbTag.Group>
      
      {/* 居中对齐 */}
      <DbTag.Group gap={8} align="center" style={{ marginTop: 12 }}>
        <DbTag text="居中1" preset="hot" />
        <DbTag text="居中2" preset="new" />
      </DbTag.Group>
      
      {/* 自动换行 */}
      <DbTag.Group gap={8} wrap style={{ marginTop: 12 }}>
        <DbTag text="标签1" preset="primary" />
        <DbTag text="标签2" preset="success" />
        <DbTag text="标签3" preset="warning" />
        <DbTag text="标签4" preset="danger" />
        <DbTag text="标签5" preset="hot" />
        <DbTag text="标签6" preset="new" />
      </DbTag.Group>
    </>
  );
}`}
          preview={
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm">标签1</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">标签2</span>
                <span className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">标签3</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-red-500 text-white rounded text-sm">居中1</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">居中2</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500 text-white rounded text-sm">标签1</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">标签2</span>
                <span className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">标签3</span>
                <span className="px-3 py-1 bg-red-500 text-white rounded text-sm">标签4</span>
                <span className="px-3 py-1 bg-red-500 text-white rounded text-sm">标签5</span>
                <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">标签6</span>
              </div>
            </div>
          }
        />
      </section>

      {/* API 说明表格 - DbTag */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">DbTag API 参数</h2>
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
                { prop: 'text', desc: '标签文本内容', type: 'string', def: '-' },
                { prop: 'children', desc: '子元素（优先于 text）', type: 'ReactNode', def: '-' },
                { prop: 'preset', desc: '预设类型', type: "TagPreset", def: "'default'" },
                { prop: 'variant', desc: '变体风格', type: "'solid' | 'outline' | 'light'", def: "'solid'" },
                { prop: 'size', desc: '尺寸', type: "'mini' | 'small' | 'medium' | 'large'", def: "'small'" },
                { prop: 'shape', desc: '形状', type: "'square' | 'rounded' | 'round'", def: "'rounded'" },
                { prop: 'color', desc: '自定义主色（覆盖预设颜色）', type: 'string', def: '-' },
                { prop: 'backgroundColor', desc: '自定义背景色', type: 'string', def: '-' },
                { prop: 'borderColor', desc: '自定义边框色', type: 'string', def: '-' },
                { prop: 'textColor', desc: '自定义文字颜色', type: 'string', def: '-' },
                { prop: 'icon', desc: '左侧图标', type: 'ReactNode', def: '-' },
                { prop: 'rightIcon', desc: '右侧图标', type: 'ReactNode', def: '-' },
                { prop: 'closable', desc: '是否显示关闭按钮', type: 'boolean', def: 'false' },
                { prop: 'onClose', desc: '关闭回调', type: '() => void', def: '-' },
                { prop: 'onPress', desc: '点击回调', type: '() => void', def: '-' },
                { prop: 'disabled', desc: '是否禁用', type: 'boolean', def: 'false' },
                { prop: 'pressable', desc: '是否可点击（有按压效果）', type: 'boolean', def: 'false' },
                { prop: 'borderWidth', desc: '边框宽度', type: 'number', def: '-' },
                { prop: 'borderRadius', desc: '边框圆角', type: 'number', def: '-' },
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

      {/* API 说明表格 - DbTag.Group */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">DbTag.Group API 参数</h2>
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
                { prop: 'children', desc: '子元素（DbTag）', type: 'ReactNode', def: '-' },
                { prop: 'gap', desc: '标签间距', type: 'number', def: '8' },
                { prop: 'wrap', desc: '是否换行', type: 'boolean', def: 'true' },
                { prop: 'align', desc: '对齐方式', type: "'left' | 'center' | 'right'", def: "'left'" },
                { prop: 'style', desc: '容器样式', type: 'StyleProp<ViewStyle>', def: '-' },
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

      {/* 预设类型说明 */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">预设类型说明</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">预设值</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">示例</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { preset: 'default', desc: '默认灰色', example: <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">默认</span> },
                { preset: 'primary', desc: '主要蓝色', example: <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs">主要</span> },
                { preset: 'success', desc: '成功绿色', example: <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">成功</span> },
                { preset: 'warning', desc: '警告黄色', example: <span className="px-2 py-1 bg-yellow-500 text-white rounded text-xs">警告</span> },
                { preset: 'danger', desc: '危险红色', example: <span className="px-2 py-1 bg-red-500 text-white rounded text-xs">危险</span> },
                { preset: 'info', desc: '信息青色', example: <span className="px-2 py-1 bg-cyan-500 text-white rounded text-xs">信息</span> },
                { preset: 'hot', desc: '热门红色', example: <span className="px-2 py-1 bg-red-500 text-white rounded text-xs font-bold">HOT</span> },
                { preset: 'new', desc: '新品绿色', example: <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">NEW</span> },
                { preset: 'sale', desc: '促销橙色', example: <span className="px-2 py-1 bg-orange-500 text-white rounded text-xs">促销</span> },
                { preset: 'discount', desc: '折扣粉色', example: <span className="px-2 py-1 bg-pink-500 text-white rounded text-xs">折扣</span> },
                { preset: 'free-shipping', desc: '包邮蓝色', example: <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs">包邮</span> },
                { preset: 'guarantee', desc: '保障青色', example: <span className="px-2 py-1 bg-teal-500 text-white rounded text-xs">保障</span> },
                { preset: 'vip', desc: 'VIP金色', example: <span className="px-2 py-1 bg-yellow-500 text-white rounded text-xs font-bold">VIP</span> },
                { preset: 'recommend', desc: '推荐紫色', example: <span className="px-2 py-1 bg-purple-500 text-white rounded text-xs">推荐</span> },
              ].map((item) => (
                <tr key={item.preset}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{item.preset}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                  <td className="px-6 py-4">{item.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
