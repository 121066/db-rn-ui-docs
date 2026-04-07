'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 OrderBar 组件
interface MockOrderBarItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  badge?: number | string;
}

interface MockOrderBarProps {
  data: MockOrderBarItem[];
  title?: string;
  rightText?: string;
  showTitle?: boolean;
  backgroundColor?: string;
  onItemPress?: (item: MockOrderBarItem) => void;
  onRightPress?: () => void;
}

const MockOrderBar: React.FC<MockOrderBarProps> = ({
  data,
  title,
  rightText,
  showTitle = true,
  backgroundColor = '#FFFFFF',
  onItemPress,
  onRightPress,
}) => {
  return (
    <div className="w-full rounded-lg overflow-hidden" style={{ backgroundColor }}>
      {/* 标题栏 */}
      {showTitle && title && (
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
      
      {/* 订单栏 */}
      <div className="flex items-center justify-around px-4 py-4">
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemPress?.(item)}
            className="flex flex-col items-center min-w-[60px] hover:opacity-70 transition-opacity relative"
          >
            {/* 图标 */}
            <div className="relative">
              <div className="w-10 h-10 flex items-center justify-center text-2xl">
                {item.icon || '📦'}
              </div>
              {/* Badge */}
              {item.badge && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            {/* 标题 */}
            <span className="mt-1 text-xs text-gray-700 text-center leading-tight">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function OrderBarPage() {
  const [clickedItem, setClickedItem] = useState<string>('');

  const orderData: MockOrderBarItem[] = [
    { id: '1', title: '待付款', icon: '💰', badge: 2 },
    { id: '2', title: '待发货', icon: '📦', badge: 5 },
    { id: '3', title: '待收货', icon: '🚚', badge: 3 },
    { id: '4', title: '待评价', icon: '💬' },
    { id: '5', title: '退款/售后', icon: '🔄', badge: 1 },
  ];

  const simpleOrderData: MockOrderBarItem[] = [
    { id: '1', title: '全部订单', icon: '📋' },
    { id: '2', title: '待付款', icon: '💰' },
    { id: '3', title: '待发货', icon: '📦' },
    { id: '4', title: '待收货', icon: '🚚' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">OrderBar 订单栏</h1>
        <p className="text-lg text-gray-600">
          专为订单管理场景设计的横向入口栏，支持徽章提示和图标展示，常用于电商应用的个人中心。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="带标题和右侧操作"
          description="完整的订单栏，包含标题、右侧操作和徽章提示"
          language="tsx"
          code={`import { DbOrderBar } from 'db-rn-ui';

const orderData = [
  {
    id: '1',
    title: '待付款',
    iconName: 'wallet-outline',
    iconFamily: 'Ionicons',
    iconColor: '#FF9500',
    badge: 2,
  },
  {
    id: '2',
    title: '待发货',
    iconName: 'cube-outline',
    iconFamily: 'Ionicons',
    iconColor: '#007AFF',
    badge: 5,
  },
  {
    id: '3',
    title: '待收货',
    iconName: 'car-outline',
    iconFamily: 'Ionicons',
    iconColor: '#34C759',
    badge: 3,
  },
  {
    id: '4',
    title: '待评价',
    iconName: 'chatbox-outline',
    iconFamily: 'Ionicons',
    iconColor: '#AF52DE',
  },
  {
    id: '5',
    title: '退款/售后',
    iconName: 'refresh-outline',
    iconFamily: 'Ionicons',
    iconColor: '#FF3B30',
    badge: 1,
  },
];

export default function BasicOrderBar() {
  const handleItemPress = (item) => {
    console.log('点击了:', item.title);
  };

  return (
    <DbOrderBar
      data={orderData}
      title="我的订单"
      rightText="全部订单"
      rightIconName="chevron-forward"
      onRightPress={() => console.log('查看全部订单')}
      onItemPress={handleItemPress}
    />
  );
}`}
          preview={
            <MockOrderBar
              data={orderData}
              title="我的订单"
              rightText="全部订单"
              onItemPress={(item) => setClickedItem(item.title)}
              onRightPress={() => setClickedItem('全部订单')}
            />
          }
          defaultExpanded={true}
        />
        {clickedItem && (
          <p className="text-sm text-gray-500 mt-2">最后点击: {clickedItem}</p>
        )}
      </section>

      {/* 简洁样式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">简洁样式</h2>
        <CodeExample
          title="无标题栏"
          description="隐藏标题栏，仅显示订单入口"
          language="tsx"
          code={`import { DbOrderBar } from 'db-rn-ui';

const simpleOrderData = [
  {
    id: '1',
    title: '全部订单',
    iconName: 'list-outline',
    iconFamily: 'Ionicons',
    iconColor: '#333333',
  },
  {
    id: '2',
    title: '待付款',
    iconName: 'wallet-outline',
    iconFamily: 'Ionicons',
    iconColor: '#333333',
  },
  {
    id: '3',
    title: '待发货',
    iconName: 'cube-outline',
    iconFamily: 'Ionicons',
    iconColor: '#333333',
  },
  {
    id: '4',
    title: '待收货',
    iconName: 'car-outline',
    iconFamily: 'Ionicons',
    iconColor: '#333333',
  },
];

export default function SimpleOrderBar() {
  return (
    <DbOrderBar
      data={simpleOrderData}
      showTitle={false}
      onItemPress={(item) => console.log(item.title)}
    />
  );
}`}
          preview={
            <MockOrderBar
              data={simpleOrderData}
              showTitle={false}
              onItemPress={(item) => setClickedItem(item.title)}
            />
          }
        />
      </section>

      {/* 自定义样式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义样式</h2>
        <CodeExample
          title="自定义背景色和内边距"
          description="通过样式属性自定义订单栏的外观"
          language="tsx"
          code={`import { DbOrderBar } from 'db-rn-ui';

export default function CustomOrderBar() {
  return (
    <DbOrderBar
      data={orderData.slice(0, 4)}
      title="订单中心"
      backgroundColor="#F5F5F7"
      horizontalPadding={20}
      verticalPadding={16}
      onItemPress={(item) => console.log(item.title)}
    />
  );
}`}
          preview={
            <MockOrderBar
              data={orderData.slice(0, 4)}
              title="订单中心"
              backgroundColor="#F5F5F7"
              onItemPress={(item) => setClickedItem(item.title)}
            />
          }
        />
      </section>

      {/* 不同数量的订单项 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">不同数量的订单项</h2>
        <CodeExample
          title="灵活的订单项数量"
          description="支持 3-6 个订单项的展示"
          language="tsx"
          code={`import { DbOrderBar } from 'db-rn-ui';

export default function FlexibleOrderBar() {
  // 3个订单项
  const threeItems = orderData.slice(0, 3);
  
  // 6个订单项
  const sixItems = [...orderData, { id: '6', title: '已完成', iconName: 'checkmark-circle-outline' }];

  return (
    <>
      <DbOrderBar data={threeItems} title="简化版订单" />
      <DbOrderBar data={sixItems} title="完整版订单" />
    </>
  );
}`}
          preview={
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">3个订单项</p>
                <MockOrderBar
                  data={orderData.slice(0, 3)}
                  title="简化版订单"
                  onItemPress={(item) => setClickedItem(item.title)}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">5个订单项</p>
                <MockOrderBar
                  data={orderData}
                  title="完整版订单"
                  onItemPress={(item) => setClickedItem(item.title)}
                />
              </div>
            </div>
          }
        />
      </section>

      {/* API 说明表格 */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">API 参数</h2>
        
        <div>
          <h3 className="text-base font-semibold text-gray-700 mb-3">DbOrderBarProps</h3>
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
                  { prop: 'data', desc: '订单项数据数组', type: 'OrderBarItem[]', def: '-' },
                  { prop: 'title', desc: '标题文字', type: 'string', def: '-' },
                  { prop: 'rightText', desc: '右侧文字', type: 'string', def: '-' },
                  { prop: 'rightIconName', desc: '右侧图标名称', type: 'string', def: '-' },
                  { prop: 'showTitle', desc: '是否显示标题栏', type: 'boolean', def: 'true' },
                  { prop: 'layout', desc: '布局模式', type: "'fixed' | 'scroll'", def: "'fixed'" },
                  { prop: 'backgroundColor', desc: '背景颜色', type: 'string', def: "'#FFFFFF'" },
                  { prop: 'iconSize', desc: '图标大小', type: 'number', def: '24' },
                  { prop: 'horizontalPadding', desc: '水平内边距', type: 'number', def: '16' },
                  { prop: 'verticalPadding', desc: '垂直内边距', type: 'number', def: '12' },
                  { prop: 'onItemPress', desc: '订单项点击回调', type: '(item: OrderBarItem) => void', def: '-' },
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
          <h3 className="text-base font-semibold text-gray-700 mb-3">OrderBarItem</h3>
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
                  { prop: 'title', desc: '订单项标题', type: 'string', required: '是' },
                  { prop: 'iconName', desc: '图标名称', type: 'string', required: '否' },
                  { prop: 'iconFamily', desc: '图标库名称', type: 'string', required: '否' },
                  { prop: 'iconColor', desc: '图标颜色', type: 'string', required: '否' },
                  { prop: 'badge', desc: '徽章数字或文字', type: 'number | string', required: '否' },
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
            <li><strong>订单项数量：</strong>建议 4-5 个，最多不超过 6 个</li>
            <li><strong>图标选择：</strong>使用与订单状态相关的图标，保持风格一致</li>
            <li><strong>徽章提示：</strong>仅在有待处理订单时显示，数量大于 99 显示 "99+"</li>
            <li><strong>标题长度：</strong>订单项标题控制在 2-4 个字，避免折行</li>
            <li><strong>布局选择：</strong>订单项数量固定时用 fixed 布局，动态数量用 scroll 布局</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
