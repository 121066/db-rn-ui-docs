'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

export default function TabViewPage() {
  // 可交互的 Tab 状态
  const [activeTab1, setActiveTab1] = useState('all');
  const [activeTab2, setActiveTab2] = useState('all');
  const [activeTab3, setActiveTab3] = useState('info');
  const [activeTab4, setActiveTab4] = useState('tab1');
  const [activeTab5, setActiveTab5] = useState('tab1');
  const [activeTab6, setActiveTab6] = useState('home');

  // Tab 数据
  const tabData1 = [
    { key: 'all', title: '全部', content: [
      { name: '商品 1', price: '¥128' },
      { name: '商品 2', price: '¥256' },
      { name: '商品 3', price: '¥89' },
    ]},
    { key: 'hot', title: '热门', content: [
      { name: '热门商品 1', price: '¥199' },
      { name: '热门商品 2', price: '¥299' },
      { name: '热门商品 3', price: '¥159' },
    ]},
    { key: 'new', title: '新品', content: [
      { name: '新品 1', price: '¥388' },
      { name: '新品 2', price: '¥458' },
      { name: '新品 3', price: '¥268' },
    ]},
    { key: 'sale', title: '特惠', content: [
      { name: '特惠商品 1', price: '¥99' },
      { name: '特惠商品 2', price: '¥79' },
      { name: '特惠商品 3', price: '¥59' },
    ]},
  ];

  const tabData3 = [
    { key: 'info', title: '商品信息', content: (
      <div className="space-y-2">
        <div className="font-bold text-gray-800 text-lg mb-3">商品信息</div>
        <div className="text-sm text-gray-600">品牌: 示例品牌</div>
        <div className="text-sm text-gray-600">规格: 标准版</div>
        <div className="text-sm text-gray-600">产地: 中国</div>
      </div>
    )},
    { key: 'detail', title: '详情', content: (
      <div className="space-y-2">
        <div className="font-bold text-gray-800 text-lg mb-3">商品详情</div>
        <div className="text-sm text-gray-600">这是商品详情页面的内容...</div>
        <div className="text-sm text-gray-600">支持左右滑动切换标签</div>
      </div>
    )},
    { key: 'review', title: '评价', content: (
      <div className="space-y-2">
        <div className="font-bold text-gray-800 text-lg mb-3">用户评价</div>
        <div className="text-sm text-gray-600">⭐⭐⭐⭐⭐ 非常好!</div>
        <div className="text-sm text-gray-600">⭐⭐⭐⭐ 质量不错</div>
      </div>
    )},
  ];

  const tabData4 = [
    { key: 'tab1', title: '标签1', content: '标签1 的内容区域' },
    { key: 'tab2', title: '标签2', content: '标签2 的内容区域' },
    { key: 'tab3', title: '标签3', content: '标签3 的内容区域' },
  ];

  const tabData5 = [
    { key: 'tab1', title: '推荐' },
    { key: 'tab2', title: '手机' },
    { key: 'tab3', title: '数码' },
    { key: 'tab4', title: '电脑' },
    { key: 'tab5', title: '家电' },
    { key: 'tab6', title: '食品' },
    { key: 'tab7', title: '服饰' },
    { key: 'tab8', title: '美妆' },
  ];

  const tabData6 = [
    { key: 'home', title: '首页' },
    { key: 'category', title: '分类' },
    { key: 'cart', title: '购物车' },
    { key: 'profile', title: '我的' },
  ];
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">TabView 标签页</h1>
        <p className="text-lg text-gray-600">
          功能强大的标签页组件，支持左右滑动切换、数据缓存、懒加载、无限滚动加载等功能，适用于商品分类展示、内容切换等场景。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="带数据加载的标签页"
          description="配置 tabs 和 loadData 实现带数据加载的标签页"
          language="tsx"
          code={`import { DbTabView } from 'db-rn-ui';

export default function BasicTabView() {
  const loadData = async ({ key, page, isRefresh }) => {
    // 模拟网络请求
    await delay(800);
    const mockData = Array.from({ length: 10 }, (_, i) => ({
      id: \`\${key}-\${page}-\${i}\`,
      title: \`商品 \${(page - 1) * 10 + i + 1}\`,
      price: Math.floor(Math.random() * 500) + 50,
    }));
    
    return {
      data: mockData,
      hasMore: page < 3,
    };
  };

  return (
    <DbTabView
      tabs={[
        { key: 'all', title: '全部' },
        { key: 'hot', title: '热门' },
        { key: 'new', title: '新品' },
        { key: 'sale', title: '特惠' },
      ]}
      loadData={loadData}
      useBuiltInList
      renderItem={(item) => (
        <View style={styles.item}>
          <Text>{item.title}</Text>
          <Text>¥{item.price}</Text>
        </View>
      )}
    />
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                {/* Tab 栏 */}
                <div className="flex border-b border-gray-200">
                  {tabData1.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab1(tab.key)}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
                        activeTab1 === tab.key
                          ? 'text-red-500 border-b-2 border-red-500'
                          : 'text-gray-600'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
                {/* 内容区域 */}
                <div className="p-5 space-y-3">
                  {tabData1.find(t => t.key === activeTab1)?.content.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 transition-all hover:shadow-md hover:border-gray-200"
                    >
                      <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                      <span className="text-sm font-bold text-red-500">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 滑动切换和缓存 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">滑动和缓存</h2>
        <CodeExample
          title="启用滑动切换和数据缓存"
          description="配置 swipeable 启用左右滑动，cacheEnabled 启用数据缓存"
          language="tsx"
          code={`import { DbTabView } from 'db-rn-ui';

export default function SwipeableTabView() {
  return (
    <DbTabView
      tabs={[
        { key: 'all', title: '全部' },
        { key: 'hot', title: '热门' },
        { key: 'new', title: '新品' },
      ]}
      swipeable        // 启用左右滑动
      cacheEnabled     // 启用数据缓存
      lazy             // 惰性加载
      loadData={loadData}
      useBuiltInList
      renderItem={renderItem}
    />
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex border-b border-gray-200">
                  {['全部', '热门', '新品'].map((title, idx) => {
                    const key = ['all', 'hot', 'new'][idx];
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab2(key)}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
                          activeTab2 === key
                            ? 'text-red-500 border-b-2 border-red-500'
                            : 'text-gray-600'
                        }`}
                      >
                        {title}
                      </button>
                    );
                  })}
                </div>
                <div className="p-5">
                  <div className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <span className="text-blue-500">←</span>
                    点击标签切换内容
                  </div>
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="text-sm text-gray-700">
                      {activeTab2 === 'all' && '全部商品内容展示...'}
                      {activeTab2 === 'hot' && '热门商品推荐列表...'}
                      {activeTab2 === 'new' && '最新上架商品展示...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 自定义面板 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义面板</h2>
        <CodeExample
          title="使用 renderPanel 自定义内容"
          description="通过 renderPanel 完全自定义每个标签页的内容"
          language="tsx"
          code={`import { DbTabView } from 'db-rn-ui';
import { View, Text } from 'react-native';

export default function CustomPanelTabView() {
  return (
    <DbTabView
      tabs={[
        { key: 'info', title: '商品信息' },
        { key: 'detail', title: '详情' },
        { key: 'review', title: '评价' },
      ]}
      swipeable
      showIndicator
      indicatorColor="#FF2442"
      renderPanel={({ item }) => (
        <View style={{ padding: 16 }}>
          {item.key === 'info' && (
            <View>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                商品信息
              </Text>
              <Text>品牌: 示例品牌</Text>
              <Text>规格: 标准版</Text>
            </View>
          )}
          {item.key === 'detail' && (
            <View>
              <Text>商品详情内容...</Text>
            </View>
          )}
          {item.key === 'review' && (
            <View>
              <Text>用户评价内容...</Text>
            </View>
          )}
        </View>
      )}
    />
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex border-b border-gray-200">
                  {tabData3.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab3(tab.key)}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
                        activeTab3 === tab.key
                          ? 'text-red-500 border-b-2 border-red-500'
                          : 'text-gray-600'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
                <div className="p-5">
                  <div className="transition-all duration-300">
                    {tabData3.find(t => t.key === activeTab3)?.content}
                  </div>
                </div>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* Tab 栏样式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Tab 栏样式</h2>
        <CodeExample
          title="自定义 Tab 栏样式"
          description="通过 tabBarStyle、activeTabTextStyle 等属性自定义 Tab 栏外观"
          language="tsx"
          code={`import { DbTabView } from 'db-rn-ui';

export default function StyledTabView() {
  return (
    <DbTabView
      tabs={[
        { key: 'tab1', title: '标签1' },
        { key: 'tab2', title: '标签2' },
        { key: 'tab3', title: '标签3' },
      ]}
      tabBarStyle={{ 
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}
      tabTextStyle={{ 
        color: '#666',
        fontSize: 14,
      }}
      activeTabTextStyle={{ 
        color: '#FF2442',
        fontWeight: '600',
      }}
      showIndicator
      indicatorColor="#FF2442"
      indicatorWidth={30}
      loadData={loadData}
      useBuiltInList
      renderItem={renderItem}
    />
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex border-b border-gray-200 bg-white">
                  {tabData4.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab4(tab.key)}
                      className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
                        activeTab4 === tab.key
                          ? 'text-red-500 border-b-2 border-red-500'
                          : 'text-gray-600'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
                <div className="p-5">
                  <div className="text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100">
                    {tabData4.find(t => t.key === activeTab4)?.content}
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* 可滚动 Tab 栏 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">可滚动 Tab 栏</h2>
        <CodeExample
          title="标签数量较多时启用滚动"
          description="设置 tabScrollable 为 true，Tab 栏可以横向滚动"
          language="tsx"
          code={`import { DbTabView } from 'db-rn-ui';

export default function ScrollableTabView() {
  return (
    <DbTabView
      tabs={[
        { key: 'tab1', title: '推荐' },
        { key: 'tab2', title: '手机' },
        { key: 'tab3', title: '数码' },
        { key: 'tab4', title: '电脑' },
        { key: 'tab5', title: '家电' },
        { key: 'tab6', title: '食品' },
        { key: 'tab7', title: '服饰' },
        { key: 'tab8', title: '美妆' },
      ]}
      tabScrollable   // 启用 Tab 栏滚动
      swipeable
      cacheEnabled
      loadData={loadData}
      useBuiltInList
      renderItem={renderItem}
    />
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex border-b border-gray-200 overflow-x-auto">
                  {tabData5.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab5(tab.key)}
                      className={`px-5 py-3 text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-gray-50 whitespace-nowrap ${
                        activeTab5 === tab.key
                          ? 'text-red-500 border-b-2 border-red-500'
                          : 'text-gray-600'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
                <div className="p-5">
                  <div className="text-sm text-gray-500 bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100">
                    当前选中: <span className="font-semibold text-red-500">{tabData5.find(t => t.key === activeTab5)?.title}</span>
                    <br />
                    <span className="text-xs text-gray-400 mt-2 block">← 横向滚动查看更多标签</span>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* Tab 栏位置 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Tab 栏位置</h2>
        <CodeExample
          title="Tab 栏在底部"
          description="设置 tabPosition 为 bottom，Tab 栏显示在底部"
          language="tsx"
          code={`import { DbTabView } from 'db-rn-ui';

export default function BottomTabView() {
  return (
    <DbTabView
      tabs={[
        { key: 'home', title: '首页', icon: 'home' },
        { key: 'category', title: '分类', icon: 'grid' },
        { key: 'cart', title: '购物车', icon: 'cart' },
        { key: 'profile', title: '我的', icon: 'person' },
      ]}
      tabPosition="bottom"   // Tab 栏在底部
      swipeable
      renderPanel={({ item }) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm h-52 flex flex-col">
                <div className="flex-1 p-6 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {activeTab6 === 'home' && '🏠'}
                      {activeTab6 === 'category' && '📑'}
                      {activeTab6 === 'cart' && '🛒'}
                      {activeTab6 === 'profile' && '👤'}
                    </div>
                    <div className="text-lg font-medium text-gray-700">
                      {tabData6.find(t => t.key === activeTab6)?.title}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">内容区域</div>
                  </div>
                </div>
                <div className="flex border-t border-gray-200 bg-white">
                  {tabData6.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab6(tab.key)}
                      className={`flex-1 py-3 text-center transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
                        activeTab6 === tab.key
                          ? 'text-red-500 font-medium'
                          : 'text-gray-600'
                      }`}
                    >
                      <div className="text-lg mb-0.5">
                        {tab.key === 'home' && '🏠'}
                        {tab.key === 'category' && '📑'}
                        {tab.key === 'cart' && '🛒'}
                        {tab.key === 'profile' && '👤'}
                      </div>
                      <div className="text-xs">{tab.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* API 说明表格 - DbTabView */}
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
                { prop: 'tabs', desc: 'Tab 项列表（必填）', type: 'TabViewItem[]', def: '-' },
                { prop: 'activeKey', desc: '当前激活的 Tab key（受控）', type: 'string', def: '-' },
                { prop: 'defaultActiveKey', desc: '默认激活的 Tab key', type: 'string', def: '-' },
                { prop: 'onChange', desc: 'Tab 切换回调', type: '(key: string, index: number) => void', def: '-' },
                { prop: 'tabPosition', desc: 'Tab 栏位置', type: "'top' | 'bottom'", def: "'top'" },
                { prop: 'tabScrollable', desc: 'Tab 栏是否可滚动', type: 'boolean', def: 'false' },
                { prop: 'showIndicator', desc: '是否显示下划线指示器', type: 'boolean', def: 'true' },
                { prop: 'indicatorColor', desc: '指示器颜色', type: 'string', def: "'#FF2442'" },
                { prop: 'indicatorWidth', desc: '指示器宽度', type: 'number', def: '-' },
                { prop: 'swipeable', desc: '是否启用滑动切换', type: 'boolean', def: 'true' },
                { prop: 'lazy', desc: '是否启用惰性加载', type: 'boolean', def: 'true' },
                { prop: 'preloadOffset', desc: '预加载相邻面板数量', type: 'number', def: '1' },
                { prop: 'cacheEnabled', desc: '是否启用缓存', type: 'boolean', def: 'true' },
                { prop: 'cacheExpiry', desc: '缓存过期时间（毫秒）', type: 'number', def: '0' },
                { prop: 'maxCachedPanels', desc: '最大缓存面板数量', type: 'number', def: '5' },
                { prop: 'loadData', desc: '加载数据函数', type: '(params: LoadDataParams) => Promise<LoadDataResult>', def: '-' },
                { prop: 'pageSize', desc: '每页数量', type: 'number', def: '10' },
                { prop: 'autoLoad', desc: '是否自动加载首屏数据', type: 'boolean', def: 'true' },
                { prop: 'useBuiltInList', desc: '是否使用内置列表', type: 'boolean', def: 'false' },
                { prop: 'renderItem', desc: '渲染列表项（使用内置列表时）', type: '(item: T, index: number, tabKey: string) => ReactNode', def: '-' },
                { prop: 'renderPanel', desc: '渲染面板内容', type: '(props: PanelRenderProps) => ReactNode', def: '-' },
                { prop: 'refreshable', desc: '列表是否可下拉刷新', type: 'boolean', def: 'true' },
                { prop: 'showSeparator', desc: '列表是否显示分隔线', type: 'boolean', def: 'false' },
                { prop: 'renderEmpty', desc: '空状态渲染', type: '(tabKey: string) => ReactNode', def: '-' },
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

      {/* 类型定义说明 */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">类型定义</h2>
        
        <h3 className="text-lg font-medium text-gray-700">TabViewItem</h3>
        <div className="overflow-x-auto mb-6">
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
                { prop: 'key', desc: '唯一标识', type: 'string', req: '是' },
                { prop: 'title', desc: 'Tab 标题', type: 'string', req: '否' },
                { prop: 'badge', desc: '角标数量', type: 'number', req: '否' },
                { prop: 'icon', desc: 'Tab 图标', type: 'string', req: '否' },
                { prop: 'disabled', desc: '是否禁用', type: 'boolean', req: '否' },
                { prop: 'extra', desc: '额外数据', type: 'Record<string, any>', req: '否' },
              ].map((item) => (
                <tr key={item.prop}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{item.prop}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                  <td className="px-6 py-4 text-sm text-purple-600">{item.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-700">LoadDataParams</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">属性</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { prop: 'key', desc: '当前 Tab 的 key', type: 'string' },
                { prop: 'page', desc: '当前页码', type: 'number' },
                { prop: 'pageSize', desc: '每页数量', type: 'number' },
                { prop: 'isRefresh', desc: '是否为刷新操作', type: 'boolean' },
              ].map((item) => (
                <tr key={item.prop}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{item.prop}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                  <td className="px-6 py-4 text-sm text-purple-600">{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-700">DbTabViewRef 方法</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">方法</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">参数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { prop: 'switchTo', desc: '切换到指定 Tab', type: '(key: string) => void' },
                { prop: 'switchToIndex', desc: '切换到指定索引', type: '(index: number) => void' },
                { prop: 'refreshCurrent', desc: '刷新当前 Tab 数据', type: '() => void' },
                { prop: 'refresh', desc: '刷新指定 Tab 数据', type: '(key: string) => void' },
                { prop: 'refreshAll', desc: '刷新所有 Tab 数据', type: '() => void' },
                { prop: 'clearCache', desc: '清除缓存', type: '(key?: string) => void' },
                { prop: 'getActiveKey', desc: '获取当前激活的 Tab key', type: '() => string' },
              ].map((item) => (
                <tr key={item.prop}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{item.prop}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                  <td className="px-6 py-4 text-sm text-purple-600">{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
