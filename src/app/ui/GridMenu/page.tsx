'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 GridMenu 组件
interface MockGridMenuItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  badge?: number | string;
  tag?: string;
  tagColor?: string;
}

interface MockGridMenuProps {
  data: MockGridMenuItem[];
  columns?: number;
  title?: string;
  rightText?: string;
  gap?: number;
  onItemPress?: (item: MockGridMenuItem) => void;
  onRightPress?: () => void;
}

const MockGridMenu: React.FC<MockGridMenuProps> = ({
  data,
  columns = 4,
  title,
  rightText,
  gap = 12,
  onItemPress,
  onRightPress,
}) => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden">
      {/* 标题栏 */}
      {title && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {rightText && (
            <button
              onClick={onRightPress}
              className="flex items-center text-sm text-gray-500 hover:text-blue-600"
            >
              <span>{rightText}</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
      
      {/* 菜单网格 */}
      <div
        className="grid p-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }}
      >
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemPress?.(item)}
            className="flex flex-col items-center py-3 rounded-lg hover:bg-gray-50 transition-colors relative"
          >
            {/* 图标 */}
            <div className="relative">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full text-2xl">
                {item.icon || '📦'}
              </div>
              {/* Badge */}
              {item.badge && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
                  {item.badge}
                </span>
              )}
              {/* Tag */}
              {item.tag && (
                <span
                  className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs text-white rounded"
                  style={{ backgroundColor: item.tagColor || '#FF3B30' }}
                >
                  {item.tag}
                </span>
              )}
            </div>
            {/* 标题 */}
            <span className="mt-2 text-xs text-gray-700 text-center leading-tight">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function GridMenuPage() {
  const [clickedItem, setClickedItem] = useState<string>('');

  const basicMenuData: MockGridMenuItem[] = [
    { id: '1', title: '我的订单', icon: '📋' },
    { id: '2', title: '收藏夹', icon: '❤️' },
    { id: '3', title: '优惠券', icon: '🎫' },
    { id: '4', title: '地址管理', icon: '📍' },
  ];

  const badgeMenuData: MockGridMenuItem[] = [
    { id: '1', title: '消息中心', icon: '💬', badge: 12 },
    { id: '2', title: '待付款', icon: '💰', badge: 3 },
    { id: '3', title: '待发货', icon: '📦', badge: '99+' },
    { id: '4', title: '待评价', icon: '⭐' },
    { id: '5', title: '售后服务', icon: '🔧', badge: 1 },
  ];

  const tagMenuData: MockGridMenuItem[] = [
    { id: '1', title: '限时秒杀', icon: '⏰', tag: '热', tagColor: '#FF3B30' },
    { id: '2', title: '每日特价', icon: '🎁', tag: '惠', tagColor: '#FF9500' },
    { id: '3', title: '品牌闪购', icon: '💎', tag: '新', tagColor: '#AF52DE' },
    { id: '4', title: '拼团活动', icon: '👥' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">GridMenu 宫格菜单</h1>
        <p className="text-lg text-gray-600">
          用于展示多个入口的宫格布局菜单，常用于个人中心、服务中心等场景。支持固定列数布局和水平滚动布局。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="4列宫格布局"
          description="最常见的 4 列布局，适合展示主要功能入口"
          language="tsx"
          code={`import { DbGridMenu } from 'db-rn-ui';

const basicMenuData = [
  {
    id: '1',
    title: '我的订单',
    iconName: 'receipt-outline',
    iconFamily: 'Ionicons',
    iconColor: '#FF6B6B',
  },
  {
    id: '2',
    title: '收藏夹',
    iconName: 'heart-outline',
    iconFamily: 'Ionicons',
    iconColor: '#4ECDC4',
  },
  {
    id: '3',
    title: '优惠券',
    iconName: 'pricetag-outline',
    iconFamily: 'Ionicons',
    iconColor: '#FFE66D',
  },
  {
    id: '4',
    title: '地址管理',
    iconName: 'location-outline',
    iconFamily: 'Ionicons',
    iconColor: '#95E1D3',
  },
];

export default function BasicGridMenu() {
  const handleItemPress = (item) => {
    console.log('点击了:', item.title);
  };

  return (
    <DbGridMenu
      data={basicMenuData}
      columns={4}
      onItemPress={handleItemPress}
    />
  );
}`}
          preview={
            <MockGridMenu
              data={basicMenuData}
              columns={4}
              onItemPress={(item) => setClickedItem(item.title)}
            />
          }
          defaultExpanded={true}
        />
        {clickedItem && (
          <p className="text-sm text-gray-500 mt-2">最后点击: {clickedItem}</p>
        )}
      </section>

      {/* 带标题和右侧操作 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">带标题和右侧操作</h2>
        <CodeExample
          title="完整的标题栏"
          description="添加标题和右侧操作按钮，提供更完整的交互"
          language="tsx"
          code={`import { DbGridMenu } from 'db-rn-ui';

export default function GridMenuWithHeader() {
  return (
    <DbGridMenu
      data={badgeMenuData}
      columns={5}
      title="我的服务"
      rightText="更多"
      rightIconName="chevron-forward"
      onRightPress={() => console.log('查看更多')}
      onItemPress={(item) => console.log(item.title)}
    />
  );
}`}
          preview={
            <MockGridMenu
              data={badgeMenuData}
              columns={5}
              title="我的服务"
              rightText="更多"
              onItemPress={(item) => setClickedItem(item.title)}
            />
          }
        />
      </section>

      {/* 带 Badge 提示 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">带 Badge 提示</h2>
        <CodeExample
          title="数字徽章提示"
          description="在菜单项上显示未读数量、待处理任务等信息"
          language="tsx"
          code={`import { DbGridMenu } from 'db-rn-ui';

const badgeMenuData = [
  {
    id: '1',
    title: '消息中心',
    iconName: 'chatbubble-outline',
    iconFamily: 'Ionicons',
    iconColor: '#007AFF',
    badge: 12, // 数字徽章
  },
  {
    id: '2',
    title: '待付款',
    iconName: 'wallet-outline',
    iconFamily: 'Ionicons',
    iconColor: '#FF9500',
    badge: 3,
  },
  {
    id: '3',
    title: '待发货',
    iconName: 'cube-outline',
    iconFamily: 'Ionicons',
    iconColor: '#34C759',
    badge: '99+', // 文字徽章
  },
];

export default function GridMenuWithBadge() {
  return (
    <DbGridMenu
      data={badgeMenuData}
      columns={3}
      onItemPress={(item) => console.log(item.title)}
    />
  );
}`}
          preview={
            <MockGridMenu
              data={badgeMenuData.slice(0, 3)}
              columns={3}
              onItemPress={(item) => setClickedItem(item.title)}
            />
          }
        />
      </section>

      {/* 带标签 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">带标签</h2>
        <CodeExample
          title="角标提示"
          description="使用标签突出显示热门、新品等特殊状态"
          language="tsx"
          code={`import { DbGridMenu } from 'db-rn-ui';

const tagMenuData = [
  {
    id: '1',
    title: '限时秒杀',
    iconName: 'timer-outline',
    iconFamily: 'Ionicons',
    iconColor: '#FF3B30',
    tag: '热', // 角标文字
    tagColor: '#FF3B30', // 角标颜色
  },
  {
    id: '2',
    title: '每日特价',
    iconName: 'gift-outline',
    iconFamily: 'Ionicons',
    iconColor: '#FF9500',
    tag: '惠',
    tagColor: '#FF9500',
  },
  {
    id: '3',
    title: '品牌闪购',
    iconName: 'diamond-outline',
    iconFamily: 'Ionicons',
    iconColor: '#AF52DE',
    tag: '新',
    tagColor: '#AF52DE',
  },
];

export default function GridMenuWithTag() {
  return (
    <DbGridMenu
      data={tagMenuData}
      columns={3}
      onItemPress={(item) => console.log(item.title)}
    />
  );
}`}
          preview={
            <MockGridMenu
              data={tagMenuData.slice(0, 3)}
              columns={3}
              onItemPress={(item) => setClickedItem(item.title)}
            />
          }
        />
      </section>

      {/* 不同列数布局 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">不同列数布局</h2>
        <CodeExample
          title="灵活的列数配置"
          description="通过 columns 属性控制每行显示的列数"
          language="tsx"
          code={`import { DbGridMenu } from 'db-rn-ui';

export default function GridMenuColumns() {
  return (
    <>
      {/* 3列布局 */}
      <DbGridMenu data={menuData} columns={3} />
      
      {/* 5列布局 */}
      <DbGridMenu data={menuData} columns={5} />
    </>
  );
}`}
          preview={
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">3列布局</p>
                <MockGridMenu data={basicMenuData.slice(0, 3)} columns={3} />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">5列布局</p>
                <MockGridMenu data={badgeMenuData} columns={5} />
              </div>
            </div>
          }
        />
      </section>

      {/* API 说明表格 */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">API 参数</h2>
        
        <div>
          <h3 className="text-base font-semibold text-gray-700 mb-3">DbGridMenuProps</h3>
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
                  { prop: 'data', desc: '菜单数据数组', type: 'GridMenuItem[]', def: '-' },
                  { prop: 'columns', desc: '每行显示的列数', type: 'number', def: '4' },
                  { prop: 'layout', desc: '布局模式', type: "'grid' | 'scroll'", def: "'grid'" },
                  { prop: 'title', desc: '标题文字', type: 'string', def: '-' },
                  { prop: 'rightText', desc: '右侧文字', type: 'string', def: '-' },
                  { prop: 'rightIconName', desc: '右侧图标名称', type: 'string', def: '-' },
                  { prop: 'showTitle', desc: '是否显示标题栏', type: 'boolean', def: 'true' },
                  { prop: 'gap', desc: '菜单项之间的间距', type: 'number', def: '12' },
                  { prop: 'iconSize', desc: '图标大小', type: 'number', def: '24' },
                  { prop: 'itemRadius', desc: '菜单项圆角', type: 'number', def: '8' },
                  { prop: 'itemBackgroundColor', desc: '菜单项背景色', type: 'string', def: '-' },
                  { prop: 'backgroundColor', desc: '容器背景色', type: 'string', def: "'#FFFFFF'" },
                  { prop: 'horizontalPadding', desc: '水平内边距', type: 'number', def: '16' },
                  { prop: 'verticalPadding', desc: '垂直内边距', type: 'number', def: '12' },
                  { prop: 'onItemPress', desc: '菜单项点击回调', type: '(item: GridMenuItem) => void', def: '-' },
                  { prop: 'onRightPress', desc: '右侧按钮点击回调', type: '() => void', def: '-' },
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
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-700 mb-3">GridMenuItem</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">属性</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">必填</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { prop: 'id', desc: '唯一标识符', type: 'string', required: '是' },
                  { prop: 'title', desc: '菜单项标题', type: 'string', required: '是' },
                  { prop: 'iconName', desc: '图标名称', type: 'string', required: '否' },
                  { prop: 'iconFamily', desc: '图标库名称', type: 'string', required: '否' },
                  { prop: 'iconColor', desc: '图标颜色', type: 'string', required: '否' },
                  { prop: 'badge', desc: '徽章数字或文字', type: 'number | string', required: '否' },
                  { prop: 'tag', desc: '角标文字', type: 'string', required: '否' },
                  { prop: 'tagColor', desc: '角标背景色', type: 'string', required: '否' },
                ].map((item) => (
                  <tr key={item.prop}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{item.prop}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                    <td className="px-6 py-4 text-sm text-purple-600">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.required}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 使用建议 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">使用建议</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-blue-900">💡 最佳实践</h3>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li><strong>列数选择：</strong>移动端建议 4-5 列，平板建议 5-6 列</li>
            <li><strong>图标选择：</strong>优先使用 Ionicons，保持风格统一</li>
            <li><strong>Badge 使用：</strong>数字大于 99 建议显示 "99+"</li>
            <li><strong>标题长度：</strong>菜单项标题不超过 4 个字，避免换行</li>
            <li><strong>响应速度：</strong>点击事件应有及时反馈（视觉或触觉）</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
