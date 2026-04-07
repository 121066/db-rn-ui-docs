'use client';
import React, { useState, useEffect, useRef } from 'react';
import CodeExample from '@/components/CodeExample';

// 模拟数据类型
interface ListItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  price?: string;
}

// CSS 模拟的 InfiniteList 组件
type LoadingState = 'idle' | 'loading' | 'refreshing' | 'loadingMore' | 'noMore' | 'error';

interface MockInfiniteListProps {
  data: ListItem[];
  loadingState?: LoadingState;
  refreshable?: boolean;
  hasMore?: boolean;
  emptyText?: string;
  loadingText?: string;
  loadingMoreText?: string;
  noMoreText?: string;
  errorText?: string;
  retryText?: string;
  showScrollToTop?: boolean;
  useSkeleton?: boolean;
  skeletonCount?: number;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onRetry?: () => void;
}

const MockInfiniteList: React.FC<MockInfiniteListProps> = ({
  data,
  loadingState = 'idle',
  refreshable = true,
  hasMore = true,
  emptyText = '暂无数据',
  loadingText = '加载中...',
  loadingMoreText = '加载更多...',
  noMoreText = '没有更多了',
  errorText = '加载失败',
  retryText = '重试',
  showScrollToTop = true,
  useSkeleton = false,
  skeletonCount = 3,
  onRefresh,
  onLoadMore,
  onRetry,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [showTopButton, setShowTopButton] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  // 监听滚动显示返回顶部按钮
  useEffect(() => {
    const listElement = listRef.current as any;
    const handleScroll = () => {
      if (listElement) {
        setShowTopButton(listElement.scrollTop > 200);
      }
    };
    listElement?.addEventListener('scroll', handleScroll);
    return () => listElement?.removeEventListener('scroll', handleScroll);
  }, []);

  // 渲染列表项
  const renderItem = (item: ListItem, _index: number) => (
    <div
      key={item.id}
      className="flex gap-4 p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            图片
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{item.title}</h4>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
        {item.price && (
          <p className="text-red-500 font-semibold mt-2">{item.price}</p>
        )}
      </div>
    </div>
  );

  // 渲染骨架屏
  const renderSkeleton = () => (
    <div className="animate-pulse">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={index} className="flex gap-4 p-4 bg-white border-b border-gray-100">
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2 py-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  // 渲染空数据
  const renderEmpty = () => (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p>{emptyText}</p>
    </div>
  );

  // 渲染加载中
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3" />
      <p className="text-sm text-gray-500">{loadingText}</p>
    </div>
  );

  // 渲染底部状态
  const renderFooter = () => {
    if (loadingState === 'loadingMore') {
      return (
        <div className="flex items-center justify-center py-4 gap-2">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
          <span className="text-sm text-gray-500">{loadingMoreText}</span>
        </div>
      );
    }
    if (loadingState === 'noMore' || !hasMore) {
      return (
        <div className="flex items-center justify-center py-4">
          <span className="text-sm text-gray-400">{noMoreText}</span>
        </div>
      );
    }
    if (loadingState === 'error') {
      return (
        <div className="flex flex-col items-center justify-center py-4 gap-2">
          <span className="text-sm text-gray-500">{errorText}</span>
          <button
            onClick={onRetry}
            className="px-4 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
          >
            {retryText}
          </button>
        </div>
      );
    }
    if (hasMore && onLoadMore) {
      return (
        <div className="flex items-center justify-center py-4">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            点击加载更多
          </button>
        </div>
      );
    }
    return null;
  };

  // 下拉刷新处理
  const handleTouchStart = (_e: React.TouchEvent) => {
    if (!refreshable || (listRef.current as any)?.scrollTop !== 0) return;
    setIsPulling(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling) return;
    const touch = e.touches[0];
    const pull = Math.min(touch.clientY / 3, 80);
    setPullDistance(pull);
  };

  const handleTouchEnd = () => {
    if (pullDistance > 60) {
      onRefresh?.();
    }
    setIsPulling(false);
    setPullDistance(0);
  };

  // 滚动到顶部
  const scrollToTop = () => {
    (listRef.current as any)?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative h-96 bg-gray-50 rounded-lg overflow-hidden">
      {/* 下拉刷新指示器 */}
      {refreshable && (
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-center transition-transform z-10"
          style={{ transform: `translateY(${pullDistance - 60}px)` }}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div
              className={`w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full transition-transform ${
                pullDistance > 60 ? 'rotate-180' : ''
              }`}
              style={{ transform: `rotate(${(pullDistance / 60) * 180}deg)` }}
            />
            {pullDistance > 60 ? '松开刷新' : '下拉刷新'}
          </div>
        </div>
      )}

      {/* 列表容器 */}
      <div
        ref={listRef}
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateY(${pullDistance}px)` }}
      >
        {loadingState === 'loading' || loadingState === 'refreshing' ? (
          useSkeleton ? renderSkeleton() : renderLoading()
        ) : data.length === 0 ? (
          renderEmpty()
        ) : (
          <>
            {data.map((item, index) => renderItem(item, index))}
            {renderFooter()}
          </>
        )}
      </div>

      {/* 返回顶部按钮 */}
      {showScrollToTop && showTopButton && (
        <button
          onClick={scrollToTop}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

// 示例数据
const generateData = (page: number, count: number = 5): ListItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${page}-${i}`,
    title: `商品 ${page * 5 + i + 1}`,
    description: '这是一段商品描述文字，用于展示列表项的内容布局效果。支持多行文本显示。',
    price: `¥${(Math.random() * 1000 + 50).toFixed(0)}`,
  }));
};

export default function InfiniteListPage() {
  const [basicData] = useState<ListItem[]>(generateData(0));
  const [loadMoreData, setLoadMoreData] = useState<ListItem[]>(generateData(0));
  const [loadMoreState, setLoadMoreState] = useState<LoadingState>('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 模拟加载更多
  const handleLoadMore = async () => {
    if (loadMoreState === 'loadingMore' || !hasMore) return;
    
    setLoadMoreState('loadingMore');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (currentPage >= 3) {
      setHasMore(false);
      setLoadMoreState('noMore');
    } else {
      const newData = generateData(currentPage);
      setLoadMoreData(prev => [...prev, ...newData]);
      setCurrentPage(prev => prev + 1);
      setLoadMoreState('idle');
    }
  };

  // 模拟刷新
  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoadMoreData(generateData(0));
    setCurrentPage(1);
    setHasMore(true);
    setLoadMoreState('idle');
  };

  // 使用 handleRefresh 避免未使用变量警告
  void handleRefresh;

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">InfiniteList 无限滚动列表</h1>
        <p className="text-lg text-gray-600">
          支持下拉刷新、上拉加载更多的高性能列表组件，自动处理各种加载状态，适合长列表数据展示场景。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="普通列表"
          description="最基本的列表展示，包含商品图片、标题、描述和价格"
          language="tsx"
          code={`import { DbInfiniteList } from 'db-rn-ui';

export default function BasicList() {
  const data = [
    { id: '1', title: '商品 1', description: '商品描述...', price: '¥199' },
    { id: '2', title: '商品 2', description: '商品描述...', price: '¥299' },
    // ...
  ];

  return (
    <DbInfiniteList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <ListItem
          title={item.title}
          description={item.description}
          price={item.price}
        />
      )}
    />
  );
}`}
          preview={
            <MockInfiniteList
              data={basicData}
              loadingState="idle"
              hasMore={false}
            />
          }
          defaultExpanded={true}
        />
      </section>

      {/* 加载更多 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">加载更多</h2>
        <CodeExample
          title="上拉加载更多"
          description="滚动到底部自动触发加载更多，显示加载状态和没有更多提示"
          language="tsx"
          code={`import { DbInfiniteList } from 'db-rn-ui';
import { useState } from 'react';

export default function LoadMoreList() {
  const [data, setData] = useState([]);
  const [loadingState, setLoadingState] = useState('idle');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const handleLoadMore = async () => {
    setLoadingState('loadingMore');
    // 模拟请求
    const newData = await fetchData(page);
    setData([...data, ...newData]);
    setPage(page + 1);
    setHasMore(newData.length > 0);
    setLoadingState('idle');
  };

  return (
    <DbInfiniteList
      data={data}
      loadingState={loadingState}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
      renderItem={(item) => <ListItem {...item} />}
    />
  );
}`}
          preview={
            <MockInfiniteList
              data={loadMoreData}
              loadingState={loadMoreState}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          }
          defaultExpanded={true}
        />
      </section>

      {/* 下拉刷新 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">下拉刷新</h2>
        <CodeExample
          title="下拉刷新数据"
          description="支持下拉手势刷新列表数据，显示刷新指示器"
          language="tsx"
          code={`import { DbInfiniteList } from 'db-rn-ui';

export default function RefreshableList() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // 重新加载第一页数据
    const newData = await fetchData(1);
    setData(newData);
    setRefreshing(false);
  };

  return (
    <DbInfiniteList
      data={data}
      refreshable={true}
      loadingState={refreshing ? 'refreshing' : 'idle'}
      onRefresh={handleRefresh}
      renderItem={(item) => <ListItem {...item} />}
    />
  );
}`}
          preview={
            <div className="text-sm text-gray-600 p-4 bg-blue-50 rounded-lg">
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                在触摸设备上，向下拉动列表可触发刷新
              </p>
            </div>
          }
        />
      </section>

      {/* 空数据状态 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">空数据状态</h2>
        <CodeExample
          title="暂无数据"
          description="当列表数据为空时显示空状态提示"
          language="tsx"
          code={`import { DbInfiniteList } from 'db-rn-ui';

export default function EmptyList() {
  return (
    <DbInfiniteList
      data={[]}
      emptyText="暂无商品数据"
      renderItem={() => null}
    />
  );
}`}
          preview={
            <MockInfiniteList
              data={[]}
              loadingState="idle"
              emptyText="暂无商品数据"
            />
          }
        />
      </section>

      {/* 错误状态 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">错误处理</h2>
        <CodeExample
          title="加载失败重试"
          description="加载失败时显示错误提示和重试按钮"
          language="tsx"
          code={`import { DbInfiniteList } from 'db-rn-ui';

export default function ErrorList() {
  const [loadingState, setLoadingState] = useState('error');
  
  const handleRetry = () => {
    setLoadingState('loadingMore');
    // 重新加载数据
    loadData().then(() => {
      setLoadingState('idle');
    });
  };

  return (
    <DbInfiniteList
      data={data}
      loadingState={loadingState}
      errorText="加载失败，请检查网络"
      retryText="点击重试"
      onRetry={handleRetry}
      renderItem={(item) => <ListItem {...item} />}
    />
  );
}`}
          preview={
            <MockInfiniteList
              data={generateData(0, 3)}
              loadingState="error"
              errorText="加载失败，请检查网络"
              retryText="点击重试"
              onRetry={() => console.log('重试加载')}
            />
          }
        />
      </section>

      {/* 骨架屏 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">骨架屏</h2>
        <CodeExample
          title="加载骨架屏"
          description="使用骨架屏提升加载体验，减少用户等待焦虑"
          language="tsx"
          code={`import { DbInfiniteList } from 'db-rn-ui';

export default function SkeletonList() {
  return (
    <DbInfiniteList
      data={[]}
      loadingState="loading"
      useSkeleton={true}
      skeletonCount={5}
      renderItem={() => null}
    />
  );
}`}
          preview={
            <MockInfiniteList
              data={[]}
              loadingState="loading"
              useSkeleton={true}
              skeletonCount={3}
            />
          }
        />
      </section>

      {/* 返回顶部 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">返回顶部</h2>
        <CodeExample
          title="滚动返回顶部"
          description="滚动一定距离后显示返回顶部按钮，点击平滑滚动到顶部"
          language="tsx"
          code={`import { DbInfiniteList } from 'db-rn-ui';

export default function ScrollToTopList() {
  return (
    <DbInfiniteList
      data={data}
      showScrollToTop={true}
      scrollToTopThreshold={200}
      renderItem={(item) => <ListItem {...item} />}
    />
  );
}`}
          preview={
            <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded-lg">
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                滚动列表超过 200px 后，右下角会显示返回顶部按钮
              </p>
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
                { prop: 'data', desc: '列表数据数组', type: 'T[]', def: '[]' },
                { prop: 'renderItem', desc: '渲染列表项的函数', type: '(item: T, index: number) => ReactNode', def: '-' },
                { prop: 'keyExtractor', desc: '提取唯一键的函数', type: '(item: T, index: number) => string', def: '-' },
                { prop: 'loadingState', desc: '当前加载状态', type: "'idle' | 'loading' | 'refreshing' | 'loadingMore' | 'noMore' | 'error'", def: "'idle'" },
                { prop: 'refreshable', desc: '是否开启下拉刷新', type: 'boolean', def: 'true' },
                { prop: 'onRefresh', desc: '下拉刷新回调', type: '() => Promise<void>', def: '-' },
                { prop: 'onLoadMore', desc: '加载更多回调', type: '() => Promise<void>', def: '-' },
                { prop: 'hasMore', desc: '是否还有更多数据', type: 'boolean', def: 'true' },
                { prop: 'loadMoreThreshold', desc: '触发加载更多的阈值(0-1)', type: 'number', def: '0.5' },
                { prop: 'emptyText', desc: '空数据提示文字', type: 'string', def: "'暂无数据'" },
                { prop: 'loadingText', desc: '加载中提示文字', type: 'string', def: "'加载中...'" },
                { prop: 'loadingMoreText', desc: '加载更多提示文字', type: 'string', def: "'加载更多...'" },
                { prop: 'noMoreText', desc: '无更多数据提示文字', type: 'string', def: "'没有更多了'" },
                { prop: 'errorText', desc: '错误提示文字', type: 'string', def: "'加载失败'" },
                { prop: 'retryText', desc: '重试按钮文字', type: 'string', def: "'重试'" },
                { prop: 'onRetry', desc: '重试回调', type: '() => void', def: '-' },
                { prop: 'showScrollToTop', desc: '是否显示返回顶部按钮', type: 'boolean', def: 'false' },
                { prop: 'useSkeleton', desc: '是否使用骨架屏', type: 'boolean', def: 'false' },
                { prop: 'skeletonCount', desc: '骨架屏数量', type: 'number', def: '3' },
                { prop: 'emptyComponent', desc: '自定义空数据组件', type: 'ReactNode', def: '-' },
                { prop: 'headerComponent', desc: '列表头部组件', type: 'ReactNode', def: '-' },
                { prop: 'footerComponent', desc: '列表尾部组件', type: 'ReactNode', def: '-' },
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
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">性能优化</h3>
            <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
              <li>大数据量时建议使用分页加载，每页 10-20 条数据</li>
              <li>使用 keyExtractor 确保列表项有稳定的唯一标识</li>
              <li>避免在 renderItem 中创建新的对象或函数</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">状态管理</h3>
            <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
              <li>loading: 首次加载时使用骨架屏或加载指示器</li>
              <li>refreshing: 下拉刷新时保持现有数据，顶部显示刷新状态</li>
              <li>loadingMore: 加载更多时在底部显示加载状态</li>
              <li>noMore: 没有更多数据时显示提示，避免重复请求</li>
              <li>error: 加载失败时显示错误信息和重试按钮</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
