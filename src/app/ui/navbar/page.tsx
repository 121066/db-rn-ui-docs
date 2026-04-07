'use client';
import React from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 NavBar 组件用于 Web 预览
interface MockNavBarProps {
  title?: string;
  titleStyle?: React.CSSProperties;
  backgroundColor?: string;
  useLinearGradient?: boolean;
  gradientColors?: string[];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const MockNavBar: React.FC<MockNavBarProps> = ({
  title,
  titleStyle,
  backgroundColor = '#fff',
  useLinearGradient,
  gradientColors = ['#FF6B6B', '#FF8E8E'],
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}) => {
  const background = useLinearGradient && gradientColors
    ? `linear-gradient(90deg, ${gradientColors.join(', ')})`
    : backgroundColor;

  return (
    <div
      className="flex items-center justify-between px-4 h-12 rounded-lg transition-all duration-200"
      style={{
        background,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* 左侧图标 */}
      <div
        className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all hover:bg-black/5 active:scale-95"
        onClick={onLeftPress}
      >
        {leftIcon || <div className="w-6 h-6" />}
      </div>

      {/* 标题 */}
      <div
        className="flex-1 text-center font-medium text-base"
        style={titleStyle}
      >
        {title}
      </div>

      {/* 右侧图标 */}
      <div
        className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all hover:bg-black/5 active:scale-95"
        onClick={onRightPress}
      >
        {rightIcon || <div className="w-6 h-6" />}
      </div>
    </div>
  );
};

// 图标组件
const Icon = ({ name, color = '#333' }: { name: string; color?: string }) => {
  const icons: Record<string, JSX.Element> = {
    arrowBack: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    ),
    close: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    ),
    more: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" fill={color} />
        <circle cx="19" cy="12" r="1" fill={color} />
        <circle cx="5" cy="12" r="1" fill={color} />
      </svg>
    ),
    share: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
        <polyline points="16,6 12,2 8,6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
    ),
    search: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  };

  return icons[name] || null;
};

export default function NavBarPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">NavBar 导航栏</h1>
        <p className="text-lg text-gray-600">
          页面顶部导航栏组件，支持自定义标题、左右图标、背景色和渐变效果，适用于页面导航场景。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="普通导航栏"
          description="最常用的导航栏样式，包含标题和返回按钮"
          language="tsx"
          code={`import { DbNavBar, DbIcon } from 'db-rn-ui';

export default function BasicNavBar() {
  return (
    <DbNavBar
      title="页面标题"
      backgroundColor="#fff"
      leftIcon={<DbIcon name="arrow-back" family="Ionicons" size={20} color="#333" />}
      onLeftPress={() => navigation.goBack()}
    />
  );
}`}
          preview={
            <div className="w-full max-w-md mx-auto">
              <MockNavBar
                title="页面标题"
                backgroundColor="#fff"
                leftIcon={<Icon name="arrowBack" />}
              />
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 带右侧按钮 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">带右侧按钮</h2>
        <CodeExample
          title="左右都有操作按钮"
          description="左侧返回，右侧分享或其他操作"
          language="tsx"
          code={`import { DbNavBar, DbIcon } from 'db-rn-ui';

export default function NavBarWithRightIcon() {
  return (
    <DbNavBar
      title="商品详情"
      backgroundColor="#fff"
      leftIcon={<DbIcon name="arrow-back" family="Ionicons" size={20} color="#333" />}
      rightIcon={<DbIcon name="share-outline" family="Ionicons" size={20} color="#333" />}
      onLeftPress={() => navigation.goBack()}
      onRightPress={() => handleShare()}
    />
  );
}`}
          preview={
            <div className="w-full max-w-md mx-auto">
              <MockNavBar
                title="商品详情"
                backgroundColor="#fff"
                leftIcon={<Icon name="arrowBack" />}
                rightIcon={<Icon name="share" />}
              />
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 渐变背景 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">渐变背景</h2>
        <CodeExample
          title="渐变色导航栏"
          description="使用 useLinearGradient 启用渐变背景"
          language="tsx"
          code={`import { DbNavBar, DbIcon } from 'db-rn-ui';

export default function GradientNavBar() {
  return (
    <DbNavBar
      title="渐变导航栏"
      titleStyle={{ color: '#fff' }}
      useLinearGradient={true}
      gradientColors={['#FF6B6B', '#FF8E8E']}
      leftIcon={<DbIcon name="arrow-back" family="Ionicons" size={20} color="#fff" />}
    />
  );
}`}
          preview={
            <div className="w-full max-w-md mx-auto">
              <MockNavBar
                title="渐变导航栏"
                titleStyle={{ color: '#fff' }}
                useLinearGradient={true}
                gradientColors={['#FF6B6B', '#FF8E8E']}
                leftIcon={<Icon name="arrowBack" color="#fff" />}
              />
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 自定义颜色 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义样式</h2>
        <CodeExample
          title="自定义背景色和标题样式"
          description="通过 backgroundColor 和 titleStyle 自定义外观"
          language="tsx"
          code={`import { DbNavBar, DbIcon } from 'db-rn-ui';

export default function CustomNavBar() {
  return (
    <>
      {/* 深色背景 */}
      <DbNavBar
        title="深色导航栏"
        backgroundColor="#333"
        titleStyle={{ color: '#fff', fontSize: 18 }}
        leftIcon={<DbIcon name="arrow-back" family="Ionicons" size={20} color="#fff" />}
      />
      
      {/* 品牌色背景 */}
      <DbNavBar
        title="品牌色导航栏"
        backgroundColor="#FF2442"
        titleStyle={{ color: '#fff' }}
        leftIcon={<DbIcon name="arrow-back" family="Ionicons" size={20} color="#fff" />}
        rightIcon={<DbIcon name="search" family="Ionicons" size={20} color="#fff" />}
      />
    </>
  );
}`}
          preview={
            <div className="w-full max-w-md mx-auto space-y-3">
              <MockNavBar
                title="深色导航栏"
                backgroundColor="#333"
                titleStyle={{ color: '#fff', fontSize: 18 }}
                leftIcon={<Icon name="arrowBack" color="#fff" />}
              />
              <MockNavBar
                title="品牌色导航栏"
                backgroundColor="#FF2442"
                titleStyle={{ color: '#fff' }}
                leftIcon={<Icon name="arrowBack" color="#fff" />}
                rightIcon={<Icon name="search" color="#fff" />}
              />
            </div>
          }
        />
      </section>

      {/* 多种渐变 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">多种渐变效果</h2>
        <CodeExample
          title="不同方向的渐变色"
          description="gradientColors 数组支持多种颜色配置"
          language="tsx"
          code={`import { DbNavBar, DbIcon } from 'db-rn-ui';

export default function MultiGradientNavBar() {
  return (
    <>
      {/* 橙色渐变 */}
      <DbNavBar
        title="橙色渐变"
        useLinearGradient={true}
        gradientColors={['#FF9500', '#FFBB33']}
        titleStyle={{ color: '#fff' }}
        leftIcon={<DbIcon name="arrow-back" family="Ionicons" size={20} color="#fff" />}
      />
      
      {/* 紫色渐变 */}
      <DbNavBar
        title="紫色渐变"
        useLinearGradient={true}
        gradientColors={['#5856D6', '#AF52DE']}
        titleStyle={{ color: '#fff' }}
        leftIcon={<DbIcon name="arrow-back" family="Ionicons" size={20} color="#fff" />}
      />
      
      {/* 蓝色渐变 */}
      <DbNavBar
        title="蓝色渐变"
        useLinearGradient={true}
        gradientColors={['#007AFF', '#5AC8FA']}
        titleStyle={{ color: '#fff' }}
        leftIcon={<DbIcon name="arrow-back" family="Ionicons" size={20} color="#fff" />}
      />
    </>
  );
}`}
          preview={
            <div className="w-full max-w-md mx-auto space-y-3">
              <MockNavBar
                title="橙色渐变"
                useLinearGradient={true}
                gradientColors={['#FF9500', '#FFBB33']}
                titleStyle={{ color: '#fff' }}
                leftIcon={<Icon name="arrowBack" color="#fff" />}
              />
              <MockNavBar
                title="紫色渐变"
                useLinearGradient={true}
                gradientColors={['#5856D6', '#AF52DE']}
                titleStyle={{ color: '#fff' }}
                leftIcon={<Icon name="arrowBack" color="#fff" />}
              />
              <MockNavBar
                title="蓝色渐变"
                useLinearGradient={true}
                gradientColors={['#007AFF', '#5AC8FA']}
                titleStyle={{ color: '#fff' }}
                leftIcon={<Icon name="arrowBack" color="#fff" />}
              />
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
                { prop: 'title', desc: '导航栏标题', type: 'string', def: '-' },
                { prop: 'titleStyle', desc: '标题样式', type: 'TextStyle', def: '-' },
                { prop: 'leftIcon', desc: '左侧图标/内容', type: 'ReactNode', def: '-' },
                { prop: 'rightIcon', desc: '右侧图标/内容', type: 'ReactNode', def: '-' },
                { prop: 'onLeftPress', desc: '左侧点击事件', type: '() => void', def: '-' },
                { prop: 'onRightPress', desc: '右侧点击事件', type: '() => void', def: '-' },
                { prop: 'backgroundColor', desc: '背景颜色（非渐变时有效）', type: 'string', def: "'#fff'" },
                { prop: 'useLinearGradient', desc: '是否使用渐变背景', type: 'boolean', def: 'false' },
                { prop: 'gradientColors', desc: '渐变颜色数组', type: 'string[]', def: '-' },
                { prop: 'gradientProps', desc: '渐变组件额外属性', type: 'object', def: '-' },
                { prop: 'style', desc: '自定义样式', type: 'ViewStyle', def: '-' },
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

      {/* 注意事项 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">注意事项</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <h3 className="font-semibold text-yellow-800 mb-2">关于渐变背景</h3>
          <p className="text-sm text-yellow-700 mb-3">
            使用渐变背景需要确保项目已安装 react-native-linear-gradient 依赖：
          </p>
          <pre className="bg-yellow-100 rounded-lg p-3 text-sm text-yellow-800 overflow-x-auto">
            npm install react-native-linear-gradient
          </pre>
          <p className="text-sm text-yellow-700 mt-3">
            对于 iOS 项目，还需要运行 pod install 来链接原生模块。
          </p>
        </div>
      </section>
    </div>
  );
}
