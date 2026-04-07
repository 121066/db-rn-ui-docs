'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的商品卡片组件
type ProductCardVariant = 'vertical' | 'horizontal' | 'grid' | 'list';

interface ProductTag {
  text: string;
  color?: string;
  backgroundColor?: string;
}

interface MockProductCardProps {
  image: string;
  title: string;
  subtitle?: string;
  price: number | string;
  originalPrice?: number | string;
  tags?: ProductTag[];
  variant?: ProductCardVariant;
  salesText?: string;
  rating?: number;
  shopName?: string;
  isFavorite?: boolean;
  outOfStock?: boolean;
  badge?: string;
  showBuyButton?: boolean;
  showFavoriteButton?: boolean;
  onPress?: () => void;
  onBuyPress?: () => void;
  onFavoritePress?: () => void;
}

const MockProductCard: React.FC<MockProductCardProps> = ({
  image,
  title,
  subtitle,
  price,
  originalPrice,
  tags = [],
  variant = 'vertical',
  salesText,
  rating,
  shopName,
  isFavorite = false,
  outOfStock = false,
  badge,
  showBuyButton,
  showFavoriteButton,
  onPress,
  onBuyPress,
  onFavoritePress,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
    onFavoritePress?.();
  };

  const formatPrice = (p: number | string) => {
    return typeof p === 'number' ? `¥${p.toFixed(2)}` : p;
  };

  const renderStars = () => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3 h-3 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-gray-500 ml-1">{rating}分</span>
      </div>
    );
  };

  const cardContent = (
    <>
      {/* 图片区域 */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* 角标 */}
        {badge && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
            {badge}
          </div>
        )}
        
        {/* 缺货遮罩 */}
        {outOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium">已售罄</span>
          </div>
        )}
        
        {/* 收藏按钮 */}
        {showFavoriteButton && (
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <svg
              className={`w-5 h-5 ${favorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* 内容区域 */}
      <div className="flex-1 p-3 flex flex-col">
        {/* 标题 */}
        <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
          {title}
        </h4>
        
        {/* 副标题 */}
        {subtitle && (
          <p className="text-xs text-gray-500 line-clamp-1 mb-2">{subtitle}</p>
        )}
        
        {/* 店铺名 */}
        {shopName && (
          <p className="text-xs text-gray-400 mb-2">{shopName}</p>
        )}
        
        {/* 标签 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-1.5 py-0.5 text-xs rounded"
                style={{
                  color: tag.color || '#FF2442',
                  backgroundColor: tag.backgroundColor || '#FEE2E2',
                }}
              >
                {tag.text}
              </span>
            ))}
          </div>
        )}
        
        {/* 评分 */}
        {rating && <div className="mb-2">{renderStars()}</div>}
        
        {/* 价格和操作 */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-red-500 font-bold text-lg">{formatPrice(price)}</span>
              {originalPrice && (
                <span className="text-gray-400 text-xs line-through">{formatPrice(originalPrice)}</span>
              )}
            </div>
            {salesText && <p className="text-xs text-gray-400 mt-1">{salesText}</p>}
          </div>
          
          {showBuyButton && !outOfStock && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBuyPress?.();
              }}
              className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-full hover:bg-red-600 transition-colors"
            >
              购买
            </button>
          )}
        </div>
      </div>
    </>
  );

  if (variant === 'horizontal') {
    return (
      <div
        onClick={onPress}
        className="group flex gap-3 bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
      >
        <div className="w-32 h-32 flex-shrink-0">{cardContent.props.children[0]}</div>
        <div className="flex-1 py-3 pr-3">{cardContent.props.children[1]}</div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div
        onClick={onPress}
        className="group flex gap-4 bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all cursor-pointer p-3"
      >
        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-medium text-gray-900 line-clamp-1">{title}</h4>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-red-500 font-bold">{formatPrice(price)}</span>
            {showBuyButton && (
              <button className="px-3 py-1 bg-red-500 text-white text-xs rounded-full">购买</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // vertical / grid
  return (
    <div
      onClick={onPress}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="aspect-square">{cardContent.props.children[0]}</div>
      <div className="p-3">{cardContent.props.children[1]}</div>
    </div>
  );
};

// 示例数据
const sampleProducts = [
  {
    image: 'https://picsum.photos/300/300?random=1',
    title: '2024新款时尚连衣裙女夏季显瘦气质长裙',
    subtitle: '法式优雅 · 舒适面料',
    price: 199,
    originalPrice: 399,
    tags: [{ text: '新品' }, { text: '包邮' }],
    salesText: '已售 1.2万+',
    rating: 4.8,
  },
  {
    image: 'https://picsum.photos/300/300?random=2',
    title: '无线蓝牙耳机高音质降噪运动入耳式',
    subtitle: '超长续航 · 降噪黑科技',
    price: 299,
    originalPrice: 599,
    tags: [{ text: '热卖' }],
    badge: '限时特惠',
    salesText: '已售 5.6万+',
    rating: 4.9,
  },
  {
    image: 'https://picsum.photos/300/300?random=3',
    title: '便携式充电宝20000毫安大容量',
    subtitle: '轻薄便携 · 快充技术',
    price: 89,
    tags: [{ text: '爆款' }, { text: '次日达' }],
    salesText: '已售 8.9万+',
    outOfStock: true,
  },
];

export default function ProductCardPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ProductCard 商品卡片</h1>
        <p className="text-lg text-gray-600">
          用于展示商品信息的卡片组件，支持多种布局样式（垂直、水平、网格、列表），
          包含图片、标题、价格、标签、评分等丰富信息展示。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="垂直卡片"
          description="最常用的商品卡片样式，图片在上，信息在下"
          language="tsx"
          code={`import { DbProductCard } from 'db-rn-ui';

export default function BasicProductCard() {
  return (
    <DbProductCard
      image="https://example.com/image.jpg"
      title="商品标题"
      subtitle="商品副标题描述"
      price={199}
      originalPrice={399}
      salesText="已售 1.2万+"
      onPress={() => console.log('点击商品')}
    />
  );
}`}
          preview={
            <div className="max-w-xs mx-auto">
              <MockProductCard
                image={sampleProducts[0].image}
                title={sampleProducts[0].title}
                subtitle={sampleProducts[0].subtitle}
                price={sampleProducts[0].price}
                originalPrice={sampleProducts[0].originalPrice}
                salesText={sampleProducts[0].salesText}
              />
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 多种布局 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">多种布局</h2>
        <CodeExample
          title="4 种卡片变体"
          description="支持 vertical、horizontal、grid、list 四种布局方式"
          language="tsx"
          code={`import { DbProductCard } from 'db-rn-ui';

// 垂直卡片
<DbProductCard variant="vertical" {...props} />

// 水平卡片（适用于购物车）
<DbProductCard variant="horizontal" {...props} />

// 列表模式（适用于订单列表）
<DbProductCard variant="list" {...props} />`}
          preview={
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <MockProductCard
                  variant="vertical"
                  image={sampleProducts[0].image}
                  title={sampleProducts[0].title}
                  price={sampleProducts[0].price}
                  showBuyButton
                />
                <MockProductCard
                  variant="vertical"
                  image={sampleProducts[1].image}
                  title={sampleProducts[1].title}
                  price={sampleProducts[1].price}
                  showBuyButton
                />
              </div>
              <MockProductCard
                variant="horizontal"
                image={sampleProducts[0].image}
                title={sampleProducts[0].title}
                subtitle={sampleProducts[0].subtitle}
                price={sampleProducts[0].price}
                showBuyButton
              />
              <MockProductCard
                variant="list"
                image={sampleProducts[1].image}
                title={sampleProducts[1].title}
                subtitle={sampleProducts[1].subtitle}
                price={sampleProducts[1].price}
                showBuyButton
              />
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 标签和角标 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">标签和角标</h2>
        <CodeExample
          title="商品标签和促销角标"
          description="使用 tags 添加商品标签，badge 添加促销角标"
          language="tsx"
          code={`import { DbProductCard } from 'db-rn-ui';

export default function ProductCardWithTags() {
  return (
    <DbProductCard
      image="https://example.com/image.jpg"
      title="商品标题"
      price={299}
      tags={[
        { text: '新品', color: '#fff', backgroundColor: '#FF2442' },
        { text: '包邮', color: '#FF2442', backgroundColor: '#FEE2E2' },
      ]}
      badge="限时特惠"
    />
  );
}`}
          preview={
            <div className="max-w-xs mx-auto">
              <MockProductCard
                image={sampleProducts[1].image}
                title={sampleProducts[1].title}
                price={sampleProducts[1].price}
                originalPrice={sampleProducts[1].originalPrice}
                tags={sampleProducts[1].tags}
                badge={sampleProducts[1].badge}
              />
            </div>
          }
        />
      </section>

      {/* 评分和收藏 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">评分和收藏</h2>
        <CodeExample
          title="商品评分和收藏功能"
          description="展示商品评分，支持收藏按钮交互"
          language="tsx"
          code={`import { DbProductCard } from 'db-rn-ui';

export default function ProductCardWithRating() {
  return (
    <DbProductCard
      image="https://example.com/image.jpg"
      title="商品标题"
      price={199}
      rating={4.8}
      showFavoriteButton
      isFavorite={false}
      onFavoritePress={() => console.log('收藏')}
    />
  );
}`}
          preview={
            <div className="grid grid-cols-2 gap-4">
              <MockProductCard
                image={sampleProducts[0].image}
                title={sampleProducts[0].title}
                price={sampleProducts[0].price}
                rating={sampleProducts[0].rating}
                showFavoriteButton
              />
              <MockProductCard
                image={sampleProducts[1].image}
                title={sampleProducts[1].title}
                price={sampleProducts[1].price}
                rating={sampleProducts[1].rating}
                showFavoriteButton
                isFavorite
              />
            </div>
          }
        />
      </section>

      {/* 缺货状态 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">缺货状态</h2>
        <CodeExample
          title="已售罄商品展示"
          description="设置 outOfStock 显示缺货状态"
          language="tsx"
          code={`import { DbProductCard } from 'db-rn-ui';

export default function OutOfStockCard() {
  return (
    <DbProductCard
      image="https://example.com/image.jpg"
      title="商品标题"
      price={89}
      outOfStock={true}
      outOfStockText="已售罄"
    />
  );
}`}
          preview={
            <div className="max-w-xs mx-auto">
              <MockProductCard
                image={sampleProducts[2].image}
                title={sampleProducts[2].title}
                subtitle={sampleProducts[2].subtitle}
                price={sampleProducts[2].price}
                outOfStock
                tags={sampleProducts[2].tags}
              />
            </div>
          }
        />
      </section>

      {/* 购买按钮 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">购买按钮</h2>
        <CodeExample
          title="显示购买按钮"
          description="设置 showBuyButton 显示购买按钮"
          language="tsx"
          code={`import { DbProductCard } from 'db-rn-ui';

export default function ProductCardWithBuyButton() {
  return (
    <DbProductCard
      image="https://example.com/image.jpg"
      title="商品标题"
      price={199}
      showBuyButton
      buyButtonText="立即购买"
      onBuyPress={() => console.log('购买')}
    />
  );
}`}
          preview={
            <div className="grid grid-cols-2 gap-4">
              {sampleProducts.slice(0, 2).map((product, index) => (
                <MockProductCard
                  key={index}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  showBuyButton
                />
              ))}
            </div>
          }
        />
      </section>

      {/* 网格布局 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">网格布局</h2>
        <CodeExample
          title="双列网格展示"
          description="常用于商品列表页面"
          language="tsx"
          code={`import { DbProductCard } from 'db-rn-ui';

export default function ProductGrid() {
  const products = [...]; // 商品数据
  
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {products.map(product => (
        <DbProductCard
          key={product.id}
          variant="grid"
          imageWidth={(screenWidth - 32) / 2}
          {...product}
        />
      ))}
    </View>
  );
}`}
          preview={
            <div className="grid grid-cols-2 gap-3">
              {sampleProducts.map((product, index) => (
                <MockProductCard
                  key={index}
                  variant="vertical"
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  tags={product.tags}
                  salesText={product.salesText}
                />
              ))}
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
                { prop: 'image', desc: '商品图片', type: 'string', def: '-' },
                { prop: 'title', desc: '商品标题', type: 'string', def: '-' },
                { prop: 'subtitle', desc: '商品副标题', type: 'string', def: '-' },
                { prop: 'price', desc: '当前价格', type: 'number | string | ProductPrice', def: '-' },
                { prop: 'tags', desc: '标签列表', type: 'ProductTag[]', def: '[]' },
                { prop: 'variant', desc: '卡片变体', type: "'vertical' | 'horizontal' | 'grid' | 'list'", def: "'vertical'" },
                { prop: 'salesText', desc: '销量文字', type: 'string', def: '-' },
                { prop: 'rating', desc: '评分(0-5)', type: 'number', def: '-' },
                { prop: 'shopName', desc: '店铺名称', type: 'string', def: '-' },
                { prop: 'isFavorite', desc: '是否收藏', type: 'boolean', def: 'false' },
                { prop: 'outOfStock', desc: '是否缺货', type: 'boolean', def: 'false' },
                { prop: 'badge', desc: '角标内容', type: 'string | ReactNode', def: '-' },
                { prop: 'showBuyButton', desc: '显示购买按钮', type: 'boolean', def: 'false' },
                { prop: 'showFavoriteButton', desc: '显示收藏按钮', type: 'boolean', def: 'false' },
                { prop: 'onPress', desc: '点击卡片', type: '() => void', def: '-' },
                { prop: 'onBuyPress', desc: '点击购买', type: '() => void', def: '-' },
                { prop: 'onFavoritePress', desc: '点击收藏', type: '() => void', def: '-' },
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
          title="ProductTag 和 ProductPrice"
          description="标签和价格的类型定义"
          language="tsx"
          code={`interface ProductTag {
  text: string;           // 标签文字
  color?: string;         // 文字颜色
  backgroundColor?: string; // 背景色
  outline?: boolean;      // 是否描边样式
}

interface ProductPrice {
  current: number | string;   // 当前价格
  original?: number | string; // 原价
  prefix?: string;            // 前缀
  suffix?: string;            // 后缀
  unit?: string;              // 单位
}`}
          preview={
            <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
              <p className="mb-2">价格支持多种格式：</p>
              <ul className="list-disc list-inside space-y-1">
                <li>简单数字: <code className="bg-gray-200 px-1 rounded">price=199</code></li>
                <li>字符串: <code className="bg-gray-200 px-1 rounded">price="¥199"</code></li>
                <li>对象: <code className="bg-gray-200 px-1 rounded">price={'{'}current: 199, original: 399{'}'}</code></li>
              </ul>
            </div>
          }
        />
      </section>
    </div>
  );
}
