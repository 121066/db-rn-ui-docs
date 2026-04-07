'use client';
import React, { useState, useEffect } from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 Swiper 组件
type IndicatorType = 'dot' | 'line' | 'number' | 'progress' | 'none';
type IndicatorPosition = 'bottom' | 'top' | 'left' | 'right' | 'bottom-left' | 'bottom-right';

interface SwiperItem {
  id: string | number;
  image: string;
  title?: string;
  subtitle?: string;
  link?: string;
}

interface MockSwiperProps {
  items: SwiperItem[];
  indicatorType?: IndicatorType;
  indicatorPosition?: IndicatorPosition;
  autoplay?: boolean;
  interval?: number;
  loop?: boolean;
  showArrows?: boolean;
  height?: number;
  borderRadius?: number;
  onChange?: (index: number) => void;
  onClick?: (item: SwiperItem) => void;
}

const MockSwiper: React.FC<MockSwiperProps> = ({
  items,
  indicatorType = 'dot',
  indicatorPosition = 'bottom',
  autoplay = true,
  interval = 3000,
  loop = true,
  showArrows = false,
  height = 200,
  borderRadius = 12,
  onChange,
  onClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 自动播放
  useEffect(() => {
    if (!autoplay || isPaused || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= items.length) {
          return loop ? 0 : prev;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, loop, items.length, isPaused]);

  // 通知外部变化
  useEffect(() => {
    onChange?.(currentIndex);
  }, [currentIndex, onChange]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => {
      if (prev === 0) return loop ? items.length - 1 : 0;
      return prev - 1;
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => {
      if (prev >= items.length - 1) return loop ? 0 : prev;
      return prev + 1;
    });
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const renderIndicator = () => {
    if (indicatorType === 'none') return null;

    const positionClasses = {
      'bottom': 'bottom-4 left-1/2 -translate-x-1/2',
      'top': 'top-4 left-1/2 -translate-x-1/2',
      'left': 'left-4 top-1/2 -translate-y-1/2 flex-col',
      'right': 'right-4 top-1/2 -translate-y-1/2 flex-col',
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4',
    };

    if (indicatorType === 'dot') {
      return (
        <div className={`absolute ${positionClasses[indicatorPosition]} flex gap-2 z-10`}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      );
    }

    if (indicatorType === 'line') {
      return (
        <div className={`absolute ${positionClasses[indicatorPosition]} flex gap-1 z-10`}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-white' : 'w-4 bg-white/50'
              }`}
            />
          ))}
        </div>
      );
    }

    if (indicatorType === 'number') {
      return (
        <div className={`absolute ${positionClasses[indicatorPosition]} z-10`}>
          <div className="px-3 py-1 bg-black/50 rounded-full text-white text-sm">
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      );
    }

    if (indicatorType === 'progress') {
      return (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-10">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className="relative overflow-hidden group"
      style={{ height, borderRadius }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 轮播项容器 */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-full h-full flex-shrink-0 relative cursor-pointer"
            onClick={() => onClick?.(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {/* 标题遮罩 */}
            {(item.title || item.subtitle) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                {item.title && (
                  <h4 className="text-white font-medium text-lg">{item.title}</h4>
                )}
                {item.subtitle && (
                  <p className="text-white/80 text-sm mt-1">{item.subtitle}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 指示器 */}
      {renderIndicator()}

      {/* 箭头按钮 */}
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

// 示例数据
const sampleItems = [
  {
    id: 1,
    image: 'https://picsum.photos/400/200?random=10',
    title: '春季新品发布',
    subtitle: '限时优惠，全场5折起',
  },
  {
    id: 2,
    image: 'https://picsum.photos/400/200?random=11',
    title: '夏日清凉季',
    subtitle: '精选好物，清凉一夏',
  },
  {
    id: 3,
    image: 'https://picsum.photos/400/200?random=12',
    title: '品质生活节',
    subtitle: '品质好物，精致生活',
  },
  {
    id: 4,
    image: 'https://picsum.photos/400/200?random=13',
    title: '会员专享',
    subtitle: '会员专属优惠等你来',
  },
];

export default function SwiperPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Swiper 轮播图</h1>
        <p className="text-lg text-gray-600">
          用于展示多张图片或内容的轮播组件，支持自动播放、多种指示器样式、手势切换，
          常用于首页Banner、商品详情图、活动推广等场景。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="基本轮播"
          description="最简单的轮播图，自动播放，底部圆点指示器"
          language="tsx"
          code={`import { DbSwiper } from 'db-rn-ui';

export default function BasicSwiper() {
  const items = [
    { id: 1, image: 'https://example.com/banner1.jpg' },
    { id: 2, image: 'https://example.com/banner2.jpg' },
    { id: 3, image: 'https://example.com/banner3.jpg' },
  ];

  return (
    <DbSwiper
      items={items}
      height={200}
      autoplay
      loop
    />
  );
}`}
          preview={
            <MockSwiper
              items={sampleItems}
              height={200}
              autoplay
              loop
            />
          }
          defaultExpanded={true}
        />
      </section>

      {/* 指示器类型 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">指示器类型</h2>
        <CodeExample
          title="5 种指示器样式"
          description="支持 dot、line、number、progress、none 多种指示器"
          language="tsx"
          code={`import { DbSwiper } from 'db-rn-ui';

// 圆点指示器（默认）
<DbSwiper items={items} indicatorType="dot" />

// 线条指示器
<DbSwiper items={items} indicatorType="line" />

// 数字指示器
<DbSwiper items={items} indicatorType="number" />

// 进度条指示器
<DbSwiper items={items} indicatorType="progress" />

// 无指示器
<DbSwiper items={items} indicatorType="none" />`}
          preview={
            <div className="space-y-4">
              {(['dot', 'line', 'number', 'progress'] as IndicatorType[]).map((type) => (
                <div key={type}>
                  <p className="text-sm text-gray-500 mb-2 capitalize">{type} 样式</p>
                  <MockSwiper
                    items={sampleItems.slice(0, 3)}
                    height={120}
                    indicatorType={type}
                    autoplay={false}
                  />
                </div>
              ))}
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 指示器位置 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">指示器位置</h2>
        <CodeExample
          title="多种位置选择"
          description="支持底部、顶部、左侧、右侧等多种位置"
          language="tsx"
          code={`import { DbSwiper } from 'db-rn-ui';

<DbSwiper
  items={items}
  indicatorPosition="bottom"      // 底部居中
  // indicatorPosition="bottom-left" // 左下角
  // indicatorPosition="bottom-right" // 右下角
/>`}
          preview={
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">底部居中 (bottom)</p>
                <MockSwiper
                  items={sampleItems.slice(0, 3)}
                  height={120}
                  indicatorPosition="bottom"
                  autoplay={false}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">左下角 (bottom-left)</p>
                <MockSwiper
                  items={sampleItems.slice(0, 3)}
                  height={120}
                  indicatorPosition="bottom-left"
                  autoplay={false}
                />
              </div>
            </div>
          }
        />
      </section>

      {/* 自动播放配置 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自动播放</h2>
        <CodeExample
          title="自动播放配置"
          description="可配置是否自动播放、播放间隔时间"
          language="tsx"
          code={`import { DbSwiper } from 'db-rn-ui';

export default function AutoplaySwiper() {
  return (
    <DbSwiper
      items={items}
      autoplay={true}        // 开启自动播放
      interval={5000}        // 5秒切换一次
      loop={true}            // 循环播放
    />
  );
}`}
          preview={
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">3秒切换（interval: 3000）</p>
                <MockSwiper
                  items={sampleItems.slice(0, 3)}
                  height={120}
                  interval={3000}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">5秒切换（interval: 5000）</p>
                <MockSwiper
                  items={sampleItems.slice(0, 3)}
                  height={120}
                  interval={5000}
                />
              </div>
            </div>
          }
        />
      </section>

      {/* 带标题的轮播 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">带标题信息</h2>
        <CodeExample
          title="带标题和副标题"
          description="在轮播图上显示标题和描述信息"
          language="tsx"
          code={`import { DbSwiper } from 'db-rn-ui';

const items = [
  {
    id: 1,
    image: 'https://example.com/banner1.jpg',
    title: '春季新品发布',
    subtitle: '限时优惠，全场5折起',
  },
  {
    id: 2,
    image: 'https://example.com/banner2.jpg',
    title: '夏日清凉季',
    subtitle: '精选好物，清凉一夏',
  },
];

<DbSwiper items={items} height={200} />`}
          preview={
            <MockSwiper
              items={sampleItems}
              height={200}
              autoplay={false}
            />
          }
        />
      </section>

      {/* 箭头导航 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">箭头导航</h2>
        <CodeExample
          title="显示左右箭头"
          description="hover 时显示左右切换箭头"
          language="tsx"
          code={`import { DbSwiper } from 'db-rn-ui';

<DbSwiper
  items={items}
  showArrows={true}
  autoplay={false}
/>`}
          preview={
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-2 text-center">鼠标悬停查看箭头</p>
              <MockSwiper
                items={sampleItems.slice(0, 3)}
                height={150}
                showArrows
                autoplay={false}
              />
            </div>
          }
        />
      </section>

      {/* 事件回调 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">事件处理</h2>
        <CodeExample
          title="切换和点击事件"
          description="监听轮播切换和点击事件"
          language="tsx"
          code={`import { DbSwiper } from 'db-rn-ui';

export default function SwiperWithEvents() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <DbSwiper
        items={items}
        onChange={(index) => setCurrentIndex(index)}
        onClick={(item) => console.log('点击了:', item.title)}
      />
      <Text>当前第 {currentIndex + 1} 页</Text>
    </>
  );
}`}
          preview={
            <div>
              <MockSwiper
                items={sampleItems.slice(0, 3)}
                height={150}
                autoplay={false}
                onChange={(index) => setCurrentSlide(index)}
              />
              <p className="text-center mt-4 text-gray-600">
                当前第 <span className="font-bold text-blue-600">{currentSlide + 1}</span> 页 / 共 3 页
              </p>
            </div>
          }
        />
      </section>

      {/* 不同尺寸 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义尺寸</h2>
        <CodeExample
          title="不同高度和圆角"
          description="可自定义轮播图的高度和圆角大小"
          language="tsx"
          code={`import { DbSwiper } from 'db-rn-ui';

// 小尺寸
<DbSwiper items={items} height={120} borderRadius={8} />

// 大尺寸
<DbSwiper items={items} height={300} borderRadius={20} />`}
          preview={
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">高度 120px，圆角 8px</p>
                <MockSwiper
                  items={sampleItems.slice(0, 2)}
                  height={120}
                  borderRadius={8}
                  autoplay={false}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">高度 180px，圆角 20px</p>
                <MockSwiper
                  items={sampleItems.slice(0, 2)}
                  height={180}
                  borderRadius={20}
                  autoplay={false}
                />
              </div>
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
                { prop: 'items', desc: '轮播项数据', type: 'SwiperItem[]', def: '[]' },
                { prop: 'height', desc: '轮播高度', type: 'number', def: '200' },
                { prop: 'autoplay', desc: '是否自动播放', type: 'boolean', def: 'true' },
                { prop: 'interval', desc: '自动播放间隔(ms)', type: 'number', def: '3000' },
                { prop: 'loop', desc: '是否循环播放', type: 'boolean', def: 'true' },
                { prop: 'indicatorType', desc: '指示器类型', type: "'dot' | 'line' | 'number' | 'progress' | 'none'", def: "'dot'" },
                { prop: 'indicatorPosition', desc: '指示器位置', type: 'IndicatorPosition', def: "'bottom'" },
                { prop: 'showArrows', desc: '显示箭头按钮', type: 'boolean', def: 'false' },
                { prop: 'borderRadius', desc: '圆角大小', type: 'number', def: '12' },
                { prop: 'onChange', desc: '切换回调', type: '(index: number) => void', def: '-' },
                { prop: 'onClick', desc: '点击回调', type: '(item: SwiperItem) => void', def: '-' },
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

      {/* 数据结构 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">数据结构</h2>
        <CodeExample
          title="SwiperItem 类型"
          description="轮播项的数据结构定义"
          language="tsx"
          code={`interface SwiperItem {
  id: string | number;        // 唯一标识
  image: string;              // 图片地址
  title?: string;             // 标题
  subtitle?: string;          // 副标题
  link?: string;              // 链接地址
  // 视频相关
  video?: string;             // 视频地址
  videoPoster?: string;       // 视频封面
  videoDuration?: number;     // 视频时长
}`}
          preview={
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">示例数据：</p>
              <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  id: 1,
  image: 'https://example.com/banner.jpg',
  title: '活动标题',
  subtitle: '活动描述',
  link: '/pages/detail'
}`}
              </pre>
            </div>
          }
        />
      </section>

      {/* 使用建议 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">使用建议</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-4">最佳实践</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>建议轮播项数量控制在 2-6 个，过多会影响用户体验</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>自动播放间隔建议 3-5 秒，给用户足够时间浏览</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>移动端建议开启 loop 循环，PC 端可配合箭头导航</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>图片建议保持统一尺寸，避免出现拉伸或空白</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
