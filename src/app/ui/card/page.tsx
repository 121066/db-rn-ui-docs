'use client';
import React from 'react';
import CodeExample from '@/components/CodeExample';

export default function CardPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Card 卡片</h1>
        <p className="text-lg text-gray-600">
          用于展示内容的容器组件，支持多种样式和布局方式。
        </p>
      </section>

      {/* 基础卡片 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础卡片</h2>
        <CodeExample
          title="简单卡片"
          description="基础的卡片容器，带有阴影和圆角"
          language="tsx"
          code={`export default function BasicCard() {
  return (
    <div className="space-y-4">
      <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">卡片标题</h3>
        <p className="text-gray-600">这是一个基础卡片组件，用于展示内容。</p>
      </div>
    </div>
  );
}`}
          preview={
            <div className="w-full space-y-4">
              <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">卡片标题</h3>
                <p className="text-gray-600">这是一个基础卡片组件，用于展示内容。</p>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 带图片的卡片 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">带图片的卡片</h2>
        <CodeExample
          title="图文卡片"
          description="包含图片、标题和描述的卡片"
          language="tsx"
          code={`export default function ImageCard() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 max-w-sm">
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">产品标题</h3>
        <p className="text-gray-600 text-sm mb-4">这是产品的简短描述，展示卡片的主要内容。</p>
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          了解更多
        </button>
      </div>
    </div>
  );
}`}
          preview={
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 max-w-sm">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">产品标题</h3>
                <p className="text-gray-600 text-sm mb-4">这是产品的简短描述，展示卡片的主要内容。</p>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  了解更多
                </button>
              </div>
            </div>
          }
        />
      </section>

      {/* 列表卡片 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">列表卡片</h2>
        <CodeExample
          title="卡片列表"
          description="多个卡片组成的列表"
          language="tsx"
          code={`export default function CardList() {
  const items = [
    { title: '项目一', description: '描述内容' },
    { title: '项目二', description: '描述内容' },
    { title: '项目三', description: '描述内容' },
  ];

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-gray-900">{item.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        </div>
      ))}
    </div>
  );
}`}
          preview={
            <div className="w-full space-y-3">
              {[
                { title: '项目一', description: '描述内容' },
                { title: '项目二', description: '描述内容' },
                { title: '项目三', description: '描述内容' },
              ].map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
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
                { prop: 'title', desc: '卡片标题', type: 'string', def: '-' },
                { prop: 'description', desc: '卡片描述', type: 'string', def: '-' },
                { prop: 'image', desc: '卡片图片URL', type: 'string', def: '-' },
                { prop: 'shadow', desc: '阴影大小', type: "'none' | 'sm' | 'md' | 'lg'", def: "'md'" },
                { prop: 'hoverable', desc: '是否支持悬停效果', type: 'boolean', def: 'false' },
                { prop: 'clickable', desc: '是否可点击', type: 'boolean', def: 'false' },
                { prop: 'onClick', desc: '点击回调', type: '() => void', def: '-' },
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
