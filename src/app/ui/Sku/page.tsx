'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 SKU 组件
interface MockSkuProps {
  visible?: boolean;
  goods?: {
    imageUrl: string;
    title?: string;
    price: number;
    originalPrice?: number;
  };
  attributes?: Array<{
    id: string;
    name: string;
    values: Array<{ id: string; name: string; disabled?: boolean }>;
    multiple?: boolean;
  }>;
  showQuantity?: boolean;
  confirmText?: string;
  addCartText?: string;
  showAddCart?: boolean;
}

const MockSku: React.FC<MockSkuProps> = ({
  visible = true,
  goods = {
    imageUrl: '',
    title: '商品名称',
    price: 199,
    originalPrice: 299,
  },
  attributes = [],
  showQuantity = true,
  confirmText = '确定',
  addCartText = '加入购物车',
  showAddCart = true,
}) => {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const handleSelect = (attrId: string, valueId: string) => {
    setSelected(prev => ({
      ...prev,
      [attrId]: prev[attrId] === valueId ? '' : valueId
    }));
  };

  if (!visible) return null;

  return (
    <div className="w-full max-w-md bg-white rounded-t-xl border border-gray-200 overflow-hidden">
      {/* 商品信息 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex gap-3">
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
            商品图
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-red-600">¥{goods.price}</p>
            {goods.originalPrice && (
              <p className="text-sm text-gray-400 line-through">¥{goods.originalPrice}</p>
            )}
            <p className="text-sm text-gray-600 mt-1">{goods.title}</p>
            <p className="text-xs text-gray-400 mt-1">
              已选: {Object.values(selected).filter(Boolean).join(', ') || '请选择规格'}
            </p>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* 属性选择 */}
      <div className="p-4 max-h-64 overflow-y-auto">
        {attributes.map((attr) => (
          <div key={attr.id} className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">{attr.name}</h4>
            <div className="flex flex-wrap gap-2">
              {attr.values.map((val) => (
                <button
                  key={val.id}
                  onClick={() => !val.disabled && handleSelect(attr.id, val.id)}
                  disabled={val.disabled}
                  className={`
                    px-4 py-2 rounded-lg text-sm transition-all
                    ${selected[attr.id] === val.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                    ${val.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {val.name}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* 数量选择 */}
        {showQuantity && (
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-800">购买数量</span>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 底部按钮 */}
      <div className="p-4 border-t border-gray-100 flex gap-3">
        {showAddCart && (
          <button className="flex-1 py-3 bg-yellow-500 text-white rounded-full font-medium text-sm">
            {addCartText}
          </button>
        )}
        <button className="flex-1 py-3 bg-red-600 text-white rounded-full font-medium text-sm">
          {confirmText}
        </button>
      </div>
    </div>
  );
};

const goodsInfo = {
  imageUrl: 'https://example.com/phone.jpg',
  title: 'iPhone 15 Pro Max 256GB',
  price: 9999,
  originalPrice: 10999,
};

const colorAttr = {
  id: 'color',
  name: '颜色',
  values: [
    { id: 'black', name: '深空黑' },
    { id: 'white', name: '白色' },
    { id: 'blue', name: '蓝色' },
    { id: 'gold', name: '金色' },
  ],
};

const storageAttr = {
  id: 'storage',
  name: '存储容量',
  values: [
    { id: '128', name: '128GB' },
    { id: '256', name: '256GB' },
    { id: '512', name: '512GB', disabled: true },
    { id: '1t', name: '1TB' },
  ],
};

const versionAttr = {
  id: 'version',
  name: '版本',
  values: [
    { id: 'cn', name: '国行' },
    { id: 'hk', name: '港版' },
    { id: 'jp', name: '日版' },
  ],
};

export default function SkuPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Sku 商品规格选择</h1>
        <p className="text-lg text-gray-600">
          电商应用中的商品规格选择组件，支持多属性规格组合、库存联动、数量选择等功能。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="标准 SKU 选择器"
          description="展示商品信息、规格属性和数量选择的完整 SKU 弹窗"
          language="tsx"
          code={`import { Sku } from 'db-rn-ui';
import { useState } from 'react';

export default function ProductDetail() {
  const [visible, setVisible] = useState(false);

  const goods = {
    imageUrl: 'https://example.com/phone.jpg',
    title: 'iPhone 15 Pro Max 256GB',
    price: 9999,
    originalPrice: 10999,
  };

  const attributes = [
    {
      id: 'color',
      name: '颜色',
      values: [
        { id: 'black', name: '深空黑' },
        { id: 'white', name: '白色' },
        { id: 'blue', name: '蓝色' },
      ],
    },
    {
      id: 'storage',
      name: '存储容量',
      values: [
        { id: '128', name: '128GB' },
        { id: '256', name: '256GB' },
        { id: '512', name: '512GB', disabled: true },
      ],
    },
  ];

  return (
    <>
      <Button title="选择规格" onPress={() => setVisible(true)} />
      
      <Sku
        visible={visible}
        goods={goods}
        attributes={attributes}
        onClose={() => setVisible(false)}
        onConfirm={(result) => {
          console.log('选择结果:', result);
          setVisible(false);
        }}
      />
    </>
  );
}`}
          preview={
            <MockSku
              visible={true}
              goods={goodsInfo}
              attributes={[colorAttr, storageAttr]}
            />
          }
          defaultExpanded={true}
        />
      </section>

      {/* 加入购物车 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">双按钮模式</h2>
        <CodeExample
          title="显示加入购物车"
          description="设置 showAddCart={true} 显示加入购物车按钮"
          language="tsx"
          code={`import { Sku } from 'db-rn-ui';

export default function ProductWithCart() {
  return (
    <Sku
      visible={visible}
      goods={goods}
      attributes={attributes}
      showAddCart={true}
      addCartText="加入购物车"
      confirmText="立即购买"
      onAddCart={(result) => {
        console.log('加入购物车:', result);
      }}
      onConfirm={(result) => {
        console.log('立即购买:', result);
      }}
    />
  );
}`}
          preview={
            <MockSku
              visible={true}
              goods={goodsInfo}
              attributes={[colorAttr]}
              showAddCart={true}
            />
          }
        />
      </section>

      {/* 隐藏数量选择 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">数量选择</h2>
        <CodeExample
          title="隐藏数量选择"
          description="设置 showQuantity={false} 隐藏购买数量选择器"
          language="tsx"
          code={`import { Sku } from 'db-rn-ui';

export default function SkuWithoutQuantity() {
  return (
    <Sku
      visible={visible}
      goods={goods}
      attributes={attributes}
      showQuantity={false}
      onConfirm={(result) => {
        console.log('选择结果:', result);
      }}
    />
  );
}`}
          preview={
            <MockSku
              visible={true}
              goods={goodsInfo}
              attributes={[colorAttr, storageAttr]}
              showQuantity={false}
              showAddCart={false}
            />
          }
        />
      </section>

      {/* 多属性规格 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">多属性规格</h2>
        <CodeExample
          title="三个属性组合"
          description="支持配置多个属性组，如颜色+容量+版本"
          language="tsx"
          code={`import { Sku } from 'db-rn-ui';

export default function MultiAttributeSku() {
  const attributes = [
    {
      id: 'color',
      name: '颜色',
      values: [
        { id: 'black', name: '深空黑' },
        { id: 'white', name: '白色' },
        { id: 'blue', name: '蓝色' },
        { id: 'gold', name: '金色' },
      ],
    },
    {
      id: 'storage',
      name: '存储容量',
      values: [
        { id: '128', name: '128GB' },
        { id: '256', name: '256GB' },
        { id: '512', name: '512GB' },
        { id: '1t', name: '1TB' },
      ],
    },
    {
      id: 'version',
      name: '版本',
      values: [
        { id: 'cn', name: '国行' },
        { id: 'hk', name: '港版' },
        { id: 'jp', name: '日版' },
      ],
    },
  ];

  return (
    <Sku
      visible={visible}
      goods={goods}
      attributes={attributes}
      onConfirm={(result) => console.log(result)}
    />
  );
}`}
          preview={
            <MockSku
              visible={true}
              goods={goodsInfo}
              attributes={[colorAttr, storageAttr, versionAttr]}
              showAddCart={false}
            />
          }
        />
      </section>

      {/* 库存联动 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">库存联动</h2>
        <CodeExample
          title="SKU 组合配置"
          description="通过 combinations 配置实现价格、库存联动"
          language="tsx"
          code={`import { Sku } from 'db-rn-ui';

export default function SkuWithStock() {
  const combinations = [
    {
      id: 'sku1',
      price: 9999,
      originalPrice: 10999,
      stock: 100,
      attributes: { color: 'black', storage: '256' },
    },
    {
      id: 'sku2',
      price: 8999,
      originalPrice: 9999,
      stock: 0, // 库存为0，自动禁用
      attributes: { color: 'white', storage: '128' },
    },
    {
      id: 'sku3',
      price: 11999,
      stock: 50,
      attributes: { color: 'blue', storage: '512' },
    },
  ];

  return (
    <Sku
      visible={visible}
      goods={goods}
      attributes={attributes}
      combinations={combinations}
      onAttributeChange={(attrId, valueId, allSelected) => {
        console.log('属性变化:', attrId, valueId, allSelected);
      }}
      onConfirm={(result) => console.log('选择结果:', result)}
    />
  );
}`}
          preview={
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">库存联动特性：</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>根据 combinations 自动匹配价格和库存</li>
                <li>库存为 0 的规格自动禁用</li>
                <li>选中规格后显示对应 SKU 信息</li>
              </ul>
            </div>
          }
        />
      </section>

      {/* 数量限制 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">数量限制</h2>
        <CodeExample
          title="设置购买数量范围"
          description="通过 minQuantity 和 maxQuantity 限制购买数量"
          language="tsx"
          code={`import { Sku } from 'db-rn-ui';

export default function SkuWithLimit() {
  return (
    <Sku
      visible={visible}
      goods={goods}
      attributes={attributes}
      defaultQuantity={1}
      minQuantity={1}
      maxQuantity={10}
      quantityTitle="购买数量"
      onQuantityChange={(quantity) => console.log('数量:', quantity)}
      onConfirm={(result) => console.log('确认:', result)}
    />
  );
}`}
          preview={
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">支持设置默认数量、最小数量和最大数量限制</p>
            </div>
          }
        />
      </section>

      {/* 自定义渲染 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义渲染</h2>
        <CodeExample
          title="自定义商品信息"
          description="通过 renderGoodsInfo 自定义商品信息区域"
          language="tsx"
          code={`import { Sku } from 'db-rn-ui';

export default function CustomSku() {
  return (
    <Sku
      visible={visible}
      goods={goods}
      attributes={attributes}
      renderGoodsInfo={(goods) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: goods.imageUrl }} style={{ width: 80, height: 80 }} />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ color: '#ff4d4f', fontSize: 18, fontWeight: 'bold' }}>
              ¥{goods.price}
            </Text>
            <Text style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
              库存: {goods.stock}件
            </Text>
            <Text style={{ color: '#666', fontSize: 14, marginTop: 4 }}>
              {goods.title}
            </Text>
          </View>
        </View>
      )}
      renderFooter={(result) => (
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button title="收藏" variant="secondary" />
          <Button title="立即购买" style={{ flex: 1 }} />
        </View>
      )}
    />
  );
}`}
          preview={
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">支持自定义商品信息区域、底部按钮区域，以及属性列表中的额外内容</p>
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
                { prop: 'visible', desc: '是否显示', type: 'boolean', def: 'required' },
                { prop: 'goods', desc: '商品信息', type: 'SkuGoodsInfo', def: 'required' },
                { prop: 'attributes', desc: 'SKU属性组列表', type: 'SkuAttribute[]', def: 'required' },
                { prop: 'combinations', desc: 'SKU组合列表', type: 'SkuCombination[]', def: '-' },
                { prop: 'defaultSelected', desc: '默认选中属性', type: 'Record<string, string>', def: '-' },
                { prop: 'showQuantity', desc: '显示数量选择', type: 'boolean', def: 'true' },
                { prop: 'quantityTitle', desc: '数量标题', type: 'string', def: "'购买数量'" },
                { prop: 'defaultQuantity', desc: '默认数量', type: 'number', def: '1' },
                { prop: 'minQuantity', desc: '最小数量', type: 'number', def: '1' },
                { prop: 'maxQuantity', desc: '最大数量', type: 'number', def: '99' },
                { prop: 'confirmText', desc: '确认按钮文案', type: 'string', def: "'确定'" },
                { prop: 'addCartText', desc: '加购按钮文案', type: 'string', def: "'加入购物车'" },
                { prop: 'showAddCart', desc: '显示加购按钮', type: 'boolean', def: 'false' },
                { prop: 'onClose', desc: '关闭回调', type: '() => void', def: '-' },
                { prop: 'onConfirm', desc: '确认回调', type: '(result) => void', def: '-' },
                { prop: 'onAddCart', desc: '加购回调', type: '(result) => void', def: '-' },
                { prop: 'onAttributeChange', desc: '属性变化回调', type: '(attrId, valueId, allSelected) => void', def: '-' },
                { prop: 'onQuantityChange', desc: '数量变化回调', type: '(quantity) => void', def: '-' },
                { prop: 'renderGoodsInfo', desc: '自定义商品信息', type: '(goods) => ReactNode', def: '-' },
                { prop: 'renderFooter', desc: '自定义底部', type: '(result) => ReactNode', def: '-' },
                { prop: 'renderExtra', desc: '自定义额外内容', type: '() => ReactNode', def: '-' },
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
          title="SkuAttribute & SkuCombination"
          description="SKU 属性和组合的完整类型定义"
          language="tsx"
          code={`// SKU 属性组
interface SkuAttribute {
  id: string;
  name: string;
  values: SkuAttributeValue[];
  multiple?: boolean; // 是否支持多选
}

// 属性值
interface SkuAttributeValue {
  id: string;
  name: string;
  disabled?: boolean;
  imageUrl?: string; // 关联图片
}

// SKU 组合
interface SkuCombination {
  id: string;
  price: number;
  originalPrice?: number;
  stock: number;
  imageUrl?: string;
  skuCode?: string;
  attributes: Record<string, string>; // { 属性ID: 属性值ID }
}

// 商品信息
interface SkuGoodsInfo {
  imageUrl: string;
  imageSource?: ImageSourcePropType;
  title?: string;
  goodsCode?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
}

// 选择结果
interface SkuSelectedResult {
  selectedAttributes: Record<string, string>;
  quantity: number;
  selectedSku?: SkuCombination;
}`}
          preview={
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">通过 combinations 配置可以实现复杂的库存、价格联动逻辑。未匹配的规格组合会自动禁用。</p>
            </div>
          }
        />
      </section>
    </div>
  );
}
