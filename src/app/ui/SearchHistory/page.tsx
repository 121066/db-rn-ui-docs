'use client';
import React from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的搜索历史组件
interface MockSearchHistoryProps {
  historyList?: Array<{ id: string; text: string }>;
  hotList?: Array<{ id: string; text: string; isHot?: boolean }>;
  historyTitle?: string;
  hotTitle?: string;
  showBack?: boolean;
  showClearButton?: boolean;
  showRefreshButton?: boolean;
  showMoreButton?: boolean;
}

const MockSearchHistory: React.FC<MockSearchHistoryProps> = ({
  historyList = [],
  hotList = [],
  historyTitle = '搜索历史',
  hotTitle = '热门搜索',
  showBack = true,
  showClearButton = true,
  showRefreshButton = true,
  showMoreButton = true,
}) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* 搜索栏 */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-100">
        {showBack && (
          <button className="p-1 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-1.5">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth={2} />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35" />
          </svg>
          <input 
            type="text" 
            placeholder="搜索商品" 
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <button className="text-blue-600 text-sm font-medium">搜索</button>
      </div>

      {/* 搜索历史 */}
      {historyList.length > 0 && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-800">{historyTitle}</h3>
            {showClearButton && (
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {historyList.map((item) => (
              <span
                key={item.id}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full cursor-pointer hover:bg-gray-200"
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 热门搜索 */}
      {hotList.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-800">{hotTitle}</h3>
            <div className="flex gap-2">
              {showRefreshButton && (
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
              {showMoreButton && (
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {hotList.map((item, index) => (
              <span
                key={item.id}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-full cursor-pointer hover:bg-gray-100"
              >
                <span className={`w-4 h-4 flex items-center justify-center text-xs rounded ${index < 3 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {index + 1}
                </span>
                {item.text}
                {item.isHot && (
                  <span className="text-xs text-red-500">Hot</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mockHistory = [
  { id: '1', text: 'iPhone 15' },
  { id: '2', text: '运动鞋' },
  { id: '3', text: '蓝牙耳机' },
  { id: '4', text: '护肤品' },
  { id: '5', text: '零食大礼包' },
];

const mockHotList = [
  { id: '1', text: '华为手机', isHot: true },
  { id: '2', text: '笔记本电脑', isHot: true },
  { id: '3', text: '智能手表' },
  { id: '4', text: '机械键盘' },
  { id: '5', text: '咖啡机' },
  { id: '6', text: '瑜伽垫' },
];

export default function SearchHistoryPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">SearchHistory 搜索历史</h1>
        <p className="text-lg text-gray-600">
          集成搜索栏、搜索历史管理和热门搜索推荐的综合搜索组件，常用于电商应用的搜索页面。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="完整功能展示"
          description="展示搜索栏、历史记录和热门搜索的完整组合"
          language="tsx"
          code={`import { SearchHistory } from 'db-rn-ui';

export default function SearchPage() {
  const historyList = [
    { id: '1', text: 'iPhone 15' },
    { id: '2', text: '运动鞋' },
    { id: '3', text: '蓝牙耳机' },
  ];

  const hotList = [
    { id: '1', text: '华为手机', isHot: true },
    { id: '2', text: '笔记本电脑' },
    { id: '3', text: '智能手表' },
  ];

  return (
    <SearchHistory
      historyList={historyList}
      hotList={hotList}
      onSearch={(keyword) => console.log('搜索:', keyword)}
      onHistoryPress={(item) => console.log('历史:', item)}
      onHotPress={(item) => console.log('热门:', item)}
    />
  );
}`}
          preview={
            <MockSearchHistory
              historyList={mockHistory}
              hotList={mockHotList}
            />
          }
          defaultExpanded={true}
        />
      </section>

      {/* 仅历史记录 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">仅历史记录</h2>
        <CodeExample
          title="历史记录模式"
          description="只显示搜索历史，不显示热门搜索"
          language="tsx"
          code={`import { SearchHistory } from 'db-rn-ui';

export default function HistoryOnly() {
  const historyList = [
    { id: '1', text: '口红' },
    { id: '2', text: '面膜' },
    { id: '3', text: '精华液' },
  ];

  return (
    <SearchHistory
      historyList={historyList}
      hotList={[]} // 不显示热门搜索
      onSearch={(keyword) => console.log('搜索:', keyword)}
      onHistoryClear={() => console.log('清空历史')}
    />
  );
}`}
          preview={
            <MockSearchHistory
              historyList={mockHistory.slice(0, 3)}
              hotList={[]}
            />
          }
        />
      </section>

      {/* 仅热门搜索 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">仅热门搜索</h2>
        <CodeExample
          title="热门搜索模式"
          description="只显示热门搜索，不显示历史记录"
          language="tsx"
          code={`import { SearchHistory } from 'db-rn-ui';

export default function HotOnly() {
  const hotList = [
    { id: '1', text: '热销榜', isHot: true },
    { id: '2', text: '新品上市' },
    { id: '3', text: '限时特惠' },
  ];

  return (
    <SearchHistory
      historyList={[]} // 不显示历史
      hotList={hotList}
      hotTitle="搜索发现"
      onHotPress={(item) => console.log('点击:', item)}
    />
  );
}`}
          preview={
            <MockSearchHistory
              historyList={[]}
              hotList={mockHotList.slice(0, 4)}
            />
          }
        />
      </section>

      {/* 隐藏返回按钮 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义头部</h2>
        <CodeExample
          title="隐藏返回按钮"
          description="设置 showBack={false} 隐藏左侧返回按钮"
          language="tsx"
          code={`import { SearchHistory } from 'db-rn-ui';

export default function NoBackButton() {
  return (
    <SearchHistory
      showBack={false}
      historyList={[
        { id: '1', text: '连衣裙' },
        { id: '2', text: 'T恤' },
      ]}
      onSearch={(keyword) => console.log('搜索:', keyword)}
    />
  );
}`}
          preview={
            <MockSearchHistory
              showBack={false}
              historyList={mockHistory.slice(0, 3)}
              hotList={[]}
            />
          }
        />
      </section>

      {/* 操作按钮控制 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">操作按钮</h2>
        <CodeExample
          title="隐藏操作按钮"
          description="通过 showClearButton、showRefreshButton、showMoreButton 控制操作按钮显示"
          language="tsx"
          code={`import { SearchHistory } from 'db-rn-ui';

export default function CustomButtons() {
  return (
    <SearchHistory
      showClearButton={false}    // 隐藏清空按钮
      showRefreshButton={false}  // 隐藏刷新按钮
      showMoreButton={false}     // 隐藏更多按钮
      historyList={[
        { id: '1', text: '耳机' },
        { id: '2', text: '充电器' },
      ]}
      hotList={[
        { id: '1', text: '充电宝' },
        { id: '2', text: '数据线' },
      ]}
    />
  );
}`}
          preview={
            <MockSearchHistory
              showClearButton={false}
              showRefreshButton={false}
              showMoreButton={false}
              historyList={mockHistory.slice(0, 3)}
              hotList={mockHotList.slice(0, 3)}
            />
          }
        />
      </section>

      {/* 自定义标题 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义文案</h2>
        <CodeExample
          title="自定义标题"
          description="通过 historyTitle 和 hotTitle 自定义区域标题"
          language="tsx"
          code={`import { SearchHistory } from 'db-rn-ui';

export default function CustomTitles() {
  return (
    <SearchHistory
      historyTitle="最近搜索"
      hotTitle="大家都在搜"
      historyList={[
        { id: '1', text: 'JavaScript' },
        { id: '2', text: 'React' },
      ]}
      hotList={[
        { id: '1', text: 'TypeScript' },
        { id: '2', text: 'Vue' },
      ]}
    />
  );
}`}
          preview={
            <MockSearchHistory
              historyTitle="最近搜索"
              hotTitle="大家都在搜"
              historyList={[
                { id: '1', text: 'JavaScript' },
                { id: '2', text: 'React' },
              ]}
              hotList={[
                { id: '1', text: 'TypeScript' },
                { id: '2', text: 'Vue' },
              ]}
            />
          }
        />
      </section>

      {/* 事件处理 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">事件处理</h2>
        <CodeExample
          title="完整事件回调"
          description="处理搜索、点击、删除、清空等各种事件"
          language="tsx"
          code={`import { SearchHistory } from 'db-rn-ui';
import { useState } from 'react';

export default function SearchWithEvents() {
  const [history, setHistory] = useState([
    { id: '1', text: '商品A' },
    { id: '2', text: '商品B' },
  ]);

  return (
    <SearchHistory
      historyList={history}
      hotList={[{ id: '1', text: '推荐商品' }]}
      onSearch={(keyword) => {
        console.log('执行搜索:', keyword);
        // 添加到历史记录
      }}
      onHistoryPress={(item) => {
        console.log('点击历史:', item.text);
      }}
      onHistoryDelete={(item) => {
        console.log('删除历史:', item.text);
        setHistory(history.filter(h => h.id !== item.id));
      }}
      onHistoryClear={() => {
        console.log('清空全部历史');
        setHistory([]);
      }}
      onHotPress={(item) => {
        console.log('点击热门:', item.text);
      }}
      onRefresh={() => {
        console.log('刷新热门搜索');
      }}
      onMore={() => {
        console.log('查看更多热门');
      }}
      onBack={() => {
        console.log('返回上一页');
      }}
    />
  );
}`}
          preview={
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">查看代码了解完整的事件处理示例</p>
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
                { prop: 'searchBarProps', desc: '搜索栏属性透传', type: 'Partial<DbSearchBarProps>', def: '-' },
                { prop: 'historyList', desc: '搜索历史列表', type: 'SearchHistoryItem[]', def: '[]' },
                { prop: 'maxHistory', desc: '历史记录最大数量', type: 'number', def: '20' },
                { prop: 'historyTitle', desc: '历史标题文案', type: 'string', def: "'搜索历史'" },
                { prop: 'hotList', desc: '热门搜索列表', type: 'HotSearchItem[]', def: '[]' },
                { prop: 'hotTitle', desc: '热门搜索标题', type: 'string', def: "'搜索发现'" },
                { prop: 'showBack', desc: '显示返回按钮', type: 'boolean', def: 'true' },
                { prop: 'showClearButton', desc: '显示清空按钮', type: 'boolean', def: 'true' },
                { prop: 'showDeleteIcon', desc: '显示单个删除图标', type: 'boolean', def: 'false' },
                { prop: 'showRefreshButton', desc: '显示刷新按钮', type: 'boolean', def: 'false' },
                { prop: 'showMoreButton', desc: '显示更多按钮', type: 'boolean', def: 'false' },
                { prop: 'onSearch', desc: '搜索回调', type: '(keyword: string) => void', def: '-' },
                { prop: 'onHistoryPress', desc: '点击历史项', type: '(item) => void', def: '-' },
                { prop: 'onHistoryDelete', desc: '删除历史项', type: '(item) => void', def: '-' },
                { prop: 'onHistoryClear', desc: '清空历史', type: '() => void', def: '-' },
                { prop: 'onHotPress', desc: '点击热门项', type: '(item) => void', def: '-' },
                { prop: 'onRefresh', desc: '刷新热门', type: '() => void', def: '-' },
                { prop: 'onMore', desc: '查看更多', type: '() => void', def: '-' },
                { prop: 'onBack', desc: '返回回调', type: '() => void', def: '-' },
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

      {/* 类型定义 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">类型定义</h2>
        <CodeExample
          title="SearchHistoryItem & HotSearchItem"
          description="搜索历史和热门搜索的数据结构"
          language="tsx"
          code={`interface SearchHistoryItem {
  /** 唯一标识 */
  id: string;
  /** 搜索关键词 */
  text: string;
  /** 搜索时间戳 */
  timestamp?: number;
  /** 额外数据 */
  extra?: Record<string, any>;
}

interface HotSearchItem {
  /** 唯一标识 */
  id: string;
  /** 显示文本 */
  text: string;
  /** 是否标记为热门 */
  isHot?: boolean;
  /** 额外数据 */
  extra?: Record<string, any>;
}`}
          preview={
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">通过 extra 字段可以存储额外的业务数据，如搜索次数、关联商品ID等。</p>
            </div>
          }
        />
      </section>
    </div>
  );
}
