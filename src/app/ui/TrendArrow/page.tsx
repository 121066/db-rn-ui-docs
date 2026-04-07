'use client';
import React from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 TrendArrow 组件
interface MockTrendArrowProps {
  value: string;
  upValue?: string;
  downValue?: string;
  trend?: 'up' | 'down' | 'auto';
  valueColor?: string;
  upColor?: string;
  downColor?: string;
  valueFontSize?: number;
  trendFontSize?: number;
  arrowSize?: number;
  showArrow?: boolean;
}

const MockTrendArrow: React.FC<MockTrendArrowProps> = ({
  value,
  upValue,
  downValue,
  trend = 'auto',
  valueColor = '#333333',
  upColor = '#F56C6C',
  downColor = '#67C23A',
  valueFontSize = 16,
  trendFontSize = 12,
  arrowSize = 10,
  showArrow = true,
}) => {
  // 自动判断趋势
  const autoTrend = trend === 'auto' 
    ? (upValue ? 'up' : downValue ? 'down' : null) 
    : trend;
  
  const trendValue = autoTrend === 'up' ? upValue : autoTrend === 'down' ? downValue : '';
  const trendColor = autoTrend === 'up' ? upColor : downColor;

  if (!trendValue) {
    return (
      <span style={{ fontSize: `${valueFontSize}px`, color: valueColor, fontWeight: 500 }}>
        {value}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      {/* 主要值 */}
      <span style={{ fontSize: `${valueFontSize}px`, color: valueColor, fontWeight: 500 }}>
        {value}
      </span>
      
      {/* 趋势值和箭头 */}
      <div className="inline-flex items-center gap-1" style={{ color: trendColor }}>
        {showArrow && autoTrend && (
          <svg
            width={arrowSize}
            height={arrowSize}
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ transform: autoTrend === 'down' ? 'rotate(180deg)' : 'none' }}
          >
            <path d="M7 14l5-5 5 5z" />
          </svg>
        )}
        <span style={{ fontSize: `${trendFontSize}px`, fontWeight: 500 }}>
          {trendValue}
        </span>
      </div>
    </div>
  );
};

export default function TrendArrowPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">TrendArrow 趋势箭头</h1>
        <p className="text-lg text-gray-600">
          用于显示数据趋势的组件，通过箭头和颜色直观展示涨跌情况，常用于股票、基金、数据分析等场景。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="自动判断趋势"
          description="根据 upValue 和 downValue 自动显示上涨或下跌趋势"
          language="tsx"
          code={`import { DbTrendArrow } from 'db-rn-ui';

export default function BasicTrendArrow() {
  return (
    <DbTrendArrow 
      value="1.00%" 
      upValue="0.25%" 
      downValue="0.25%" 
    />
  );
}`}
          preview={
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">上涨趋势</p>
                <MockTrendArrow value="1.00%" upValue="0.25%" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">下跌趋势</p>
                <MockTrendArrow value="1.00%" downValue="0.25%" />
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 指定趋势方向 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">指定趋势方向</h2>
        <CodeExample
          title="通过 trend 属性控制"
          description="使用 trend 属性明确指定上涨或下跌，不依赖自动判断"
          language="tsx"
          code={`import { DbTrendArrow } from 'db-rn-ui';

export default function TrendDirection() {
  return (
    <View>
      {/* 只显示上涨趋势 */}
      <DbTrendArrow 
        value="5.50%" 
        trend="up"
        upValue="2.3%" 
      />
      
      {/* 只显示下跌趋势 */}
      <DbTrendArrow 
        value="3.20%" 
        trend="down"
        downValue="1.5%" 
      />
    </View>
  );
}`}
          preview={
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MockTrendArrow value="5.50%" trend="up" upValue="2.3%" />
                <span className="text-sm text-gray-500">上涨趋势</span>
              </div>
              <div className="flex items-center gap-4">
                <MockTrendArrow value="3.20%" trend="down" downValue="1.5%" />
                <span className="text-sm text-gray-500">下跌趋势</span>
              </div>
            </div>
          }
        />
      </section>

      {/* 自定义颜色 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义颜色</h2>
        <CodeExample
          title="自定义上涨和下跌颜色"
          description="通过 upColor 和 downColor 设置不同市场习惯的颜色（如 A股、美股）"
          language="tsx"
          code={`import { DbTrendArrow } from 'db-rn-ui';

export default function CustomColors() {
  return (
    <View>
      {/* 默认配色（红涨绿跌） */}
      <DbTrendArrow 
        value="8.88%" 
        upValue="1.2%" 
        downValue="0.8%"
        upColor="#F56C6C"
        downColor="#67C23A"
      />
      
      {/* A股配色（红涨绿跌） */}
      <DbTrendArrow 
        value="8.88%" 
        upValue="1.2%"
        upColor="#E53935"
        downColor="#43A047"
      />
      
      {/* 美股配色（绿涨红跌） */}
      <DbTrendArrow 
        value="8.88%" 
        upValue="1.2%"
        upColor="#43A047"
        downColor="#E53935"
      />
    </View>
  );
}`}
          preview={
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MockTrendArrow 
                  value="8.88%" 
                  upValue="1.2%"
                  upColor="#F56C6C"
                  downColor="#67C23A"
                />
                <span className="text-sm text-gray-500">默认配色</span>
              </div>
              <div className="flex items-center gap-4">
                <MockTrendArrow 
                  value="8.88%" 
                  upValue="1.2%"
                  upColor="#E53935"
                  downColor="#43A047"
                />
                <span className="text-sm text-gray-500">A股配色（红涨绿跌）</span>
              </div>
              <div className="flex items-center gap-4">
                <MockTrendArrow 
                  value="8.88%" 
                  upValue="1.2%"
                  upColor="#43A047"
                  downColor="#E53935"
                />
                <span className="text-sm text-gray-500">美股配色（绿涨红跌）</span>
              </div>
            </div>
          }
        />
      </section>

      {/* 自定义样式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义样式</h2>
        <CodeExample
          title="调整字体大小和箭头尺寸"
          description="通过样式属性自定义组件外观"
          language="tsx"
          code={`import { DbTrendArrow } from 'db-rn-ui';

export default function CustomStyles() {
  return (
    <View>
      {/* 小尺寸 */}
      <DbTrendArrow 
        value="5.50%" 
        upValue="0.5%"
        valueFontSize={12}
        trendFontSize={10}
        arrowSize={8}
      />
      
      {/* 默认尺寸 */}
      <DbTrendArrow 
        value="8.88%" 
        upValue="1.2%"
        valueFontSize={16}
        trendFontSize={12}
        arrowSize={10}
      />
      
      {/* 大尺寸 */}
      <DbTrendArrow 
        value="15.50%" 
        upValue="3.5%"
        valueFontSize={20}
        trendFontSize={16}
        arrowSize={14}
      />
    </View>
  );
}`}
          preview={
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MockTrendArrow 
                  value="5.50%" 
                  upValue="0.5%"
                  valueFontSize={12}
                  trendFontSize={10}
                  arrowSize={8}
                />
                <span className="text-sm text-gray-500">小尺寸</span>
              </div>
              <div className="flex items-center gap-4">
                <MockTrendArrow 
                  value="8.88%" 
                  upValue="1.2%"
                  valueFontSize={16}
                  trendFontSize={12}
                  arrowSize={10}
                />
                <span className="text-sm text-gray-500">默认尺寸</span>
              </div>
              <div className="flex items-center gap-4">
                <MockTrendArrow 
                  value="15.50%" 
                  upValue="3.5%"
                  valueFontSize={20}
                  trendFontSize={16}
                  arrowSize={14}
                />
                <span className="text-sm text-gray-500">大尺寸</span>
              </div>
            </div>
          }
        />
      </section>

      {/* 不显示箭头 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">不显示箭头</h2>
        <CodeExample
          title="纯文字形式"
          description="通过 showArrow={false} 隐藏箭头，只保留颜色区分"
          language="tsx"
          code={`import { DbTrendArrow } from 'db-rn-ui';

export default function NoArrow() {
  return (
    <DbTrendArrow 
      value="6.66%" 
      upValue="+2.1%" 
      downValue="-0.9%"
      showArrow={false}
    />
  );
}`}
          preview={
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MockTrendArrow 
                  value="6.66%" 
                  upValue="+2.1%"
                  showArrow={false}
                />
                <span className="text-sm text-gray-500">上涨（无箭头）</span>
              </div>
              <div className="flex items-center gap-4">
                <MockTrendArrow 
                  value="3.33%" 
                  downValue="-0.9%"
                  showArrow={false}
                />
                <span className="text-sm text-gray-500">下跌（无箭头）</span>
              </div>
            </div>
          }
        />
      </section>

      {/* 实际应用场景 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">实际应用场景</h2>
        <CodeExample
          title="数据卡片中的应用"
          description="在数据展示卡片中使用趋势箭头"
          language="tsx"
          code={`import { DbTrendArrow } from 'db-rn-ui';

export default function DataCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>今日涨跌</Text>
        <DbTrendArrow 
          value="2.50%" 
          trend="up"
          upValue="0.15%" 
        />
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>累计收益</Text>
        <DbTrendArrow 
          value="12.88%" 
          trend="down"
          downValue="0.32%" 
        />
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>持仓盈亏</Text>
        <DbTrendArrow 
          value="+1,250.00" 
          trend="up"
          upValue="8.5%"
          valueColor="#E53935"
        />
      </View>
    </View>
  );
}`}
          preview={
            <div className="bg-white rounded-lg p-4 space-y-3 border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">今日涨跌</span>
                <MockTrendArrow 
                  value="2.50%" 
                  trend="up"
                  upValue="0.15%" 
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">累计收益</span>
                <MockTrendArrow 
                  value="12.88%" 
                  trend="down"
                  downValue="0.32%" 
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">持仓盈亏</span>
                <MockTrendArrow 
                  value="+¥1,250.00" 
                  trend="up"
                  upValue="8.5%"
                  valueColor="#E53935"
                />
              </div>
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
                { prop: 'value', desc: '主要显示的值', type: 'string', def: '-' },
                { prop: 'upValue', desc: '上涨时显示的值', type: 'string', def: '-' },
                { prop: 'downValue', desc: '下跌时显示的值', type: 'string', def: '-' },
                { prop: 'trend', desc: '趋势方向', type: "'up' | 'down' | 'auto'", def: "'auto'" },
                { prop: 'valueColor', desc: '主要值的颜色', type: 'string', def: "'#333333'" },
                { prop: 'upColor', desc: '上涨的颜色', type: 'string', def: "'#F56C6C'" },
                { prop: 'downColor', desc: '下跌的颜色', type: 'string', def: "'#67C23A'" },
                { prop: 'valueFontSize', desc: '主要值的字体大小', type: 'number', def: '16' },
                { prop: 'trendFontSize', desc: '趋势值的字体大小', type: 'number', def: '12' },
                { prop: 'arrowSize', desc: '箭头的大小', type: 'number', def: '10' },
                { prop: 'showArrow', desc: '是否显示箭头', type: 'boolean', def: 'true' },
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
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-blue-900">💡 最佳实践</h3>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li><strong>颜色选择：</strong>根据目标市场选择合适的涨跌色（A股红涨绿跌，美股绿涨红跌）</li>
            <li><strong>数值格式：</strong>建议统一使用百分比格式，保持小数点位数一致</li>
            <li><strong>趋势判断：</strong>优先使用 trend 明确指定，避免依赖自动判断造成误解</li>
            <li><strong>字体大小：</strong>主要值应突出显示，趋势值适当缩小以示区别</li>
            <li><strong>上下文提示：</strong>配合标签说明使用，如"今日涨跌"、"较昨日"等</li>
            <li><strong>精度控制：</strong>避免显示过多小数位，一般保留 2 位即可</li>
          </ul>
        </div>
      </section>

      {/* 注意事项 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">注意事项</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ 重要提示</h3>
          <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
            <li>不同地区对涨跌颜色的认知不同，应根据用户群体调整颜色方案</li>
            <li>趋势箭头应与数值含义一致，避免误导用户（如负值但显示上涨箭头）</li>
            <li>在无障碍场景下，不要仅依赖颜色传达信息，需配合文字或图标</li>
            <li>动态数据应实时更新，避免出现过期的趋势信息</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
