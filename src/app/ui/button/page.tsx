'use client';
import React from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 Button 组件
interface MockButtonProps {
  title?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
}

const MockButton: React.FC<MockButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  iconOnly,
  disabled,
  loading,
  onPress,
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100',
    ghost: 'text-blue-600 hover:bg-blue-50 active:bg-blue-100',
  };

  const sizeStyles = {
    small: iconOnly ? 'w-8 h-8' : 'h-8 px-3 text-sm',
    medium: iconOnly ? 'w-10 h-10' : 'h-10 px-4 text-sm',
    large: iconOnly ? 'w-12 h-12' : 'h-12 px-6 text-base',
  };

  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles}`}
      onClick={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {title && <span>{title}</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className={iconOnly ? '' : 'mr-2'}>{leftIcon}</span>}
          {!iconOnly && title && <span>{title}</span>}
          {rightIcon && <span className={iconOnly ? '' : 'ml-2'}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

// 图标组件
const Icon = ({ name, size = 20, color = 'currentColor' }: { name: string; size?: number; color?: string }) => {
  const icons: Record<string, JSX.Element> = {
    search: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    download: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7,10 12,15 17,10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    heart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    plus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  };

  return icons[name] || null;
};

export default function ButtonPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Button 按钮</h1>
        <p className="text-lg text-gray-600">
          用于触发特定操作或交互的基础组件，支持多种视觉变体、尺寸和状态。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="四种按钮变体"
          description="展示 primary、secondary、outline、ghost 四种视觉样式"
          language="tsx"
          code={`import { Button } from 'db-rn-ui';

export default function BasicButtons() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button title="Primary Button" variant="primary" />
      <Button title="Secondary Button" variant="secondary" />
      <Button title="Outline Button" variant="outline" />
      <Button title="Ghost Button" variant="ghost" />
    </div>
  );
}`}
          preview={
            <div className="flex flex-wrap gap-4">
              <MockButton title="Primary Button" variant="primary" />
              <MockButton title="Secondary Button" variant="secondary" />
              <MockButton title="Outline Button" variant="outline" />
              <MockButton title="Ghost Button" variant="ghost" />
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 带图标的按钮 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">带图标的按钮</h2>
        <CodeExample
          title="左侧和右侧图标"
          description="使用 leftIcon 和 rightIcon 属性添加图标，支持多种图标库"
          language="tsx"
          code={`import { Button } from 'db-rn-ui';

export default function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* 左侧图标 */}
      <Button
        title="搜索"
        leftIcon={{ name: 'search', family: 'Ionicons' }}
        onPress={() => console.log('搜索')}
      />
      
      {/* 右侧图标 */}
      <Button
        title="下载"
        rightIcon={{ name: 'download-outline', family: 'Ionicons' }}
        variant="outline"
        onPress={() => console.log('下载')}
      />
      
      {/* 仅显示图标 */}
      <Button
        iconOnly
        icon={{ name: 'heart', family: 'Ionicons' }}
        variant="ghost"
        onPress={() => console.log('收藏')}
      />
    </div>
  );
}`}
          preview={
            <div className="flex flex-wrap gap-4">
              <MockButton
                title="搜索"
                leftIcon={<Icon name="search" />}
              />
              <MockButton
                title="下载"
                rightIcon={<Icon name="download" />}
                variant="outline"
              />
              <MockButton
                iconOnly
                leftIcon={<Icon name="heart" />}
                variant="ghost"
              />
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 按钮尺寸 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">按钮尺寸</h2>
        <CodeExample
          title="三种按钮尺寸"
          description="提供 large、medium、small 三种尺寸选择"
          language="tsx"
          code={`import { Button } from 'db-rn-ui';

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button title="Large Button" size="large" />
      <Button title="Medium Button" size="medium" />
      <Button title="Small Button" size="small" />
    </div>
  );
}`}
          preview={
            <div className="flex flex-wrap items-center gap-4">
              <MockButton title="Large Button" size="large" />
              <MockButton title="Medium Button" size="medium" />
              <MockButton title="Small Button" size="small" />
            </div>
          }
        />
      </section>

      {/* 状态展示 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">按钮状态</h2>
        <CodeExample
          title="禁用和加载状态"
          description="展示按钮的禁用状态和加载中状态"
          language="tsx"
          code={`import { Button } from 'db-rn-ui';

export default function ButtonStates() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button title="Disabled Button" disabled />
      <Button title="Loading..." loading />
      <Button title="Submitting" loading loadingText="请稍候" />
    </div>
  );
}`}
          preview={
            <div className="flex flex-wrap gap-4">
              <MockButton title="Disabled Button" disabled />
              <MockButton title="Loading..." loading />
              <MockButton title="Submitting" loading />
            </div>
          }
        />
      </section>

      {/* 点击事件处理 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">事件处理</h2>
        <CodeExample
          title="处理点击事件"
          description="使用 onPress 属性处理按钮点击事件"
          language="tsx"
          code={`import { Button } from 'db-rn-ui';
import { useState } from 'react';

export default function ButtonWithClick() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <Button 
        title={\`点击次数: \${count}\`}
        onPress={() => setCount(count + 1)}
      />
      <Button 
        title="重置"
        variant="secondary"
        onPress={() => setCount(0)}
      />
    </div>
  );
}`}
          preview={
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-600">在浏览器中查看完整示例</p>
            </div>
          }
        />
      </section>

      {/* 防抖和节流 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">防抖和节流</h2>
        <CodeExample
          title="使用防抖和节流"
          description="防止频繁点击导致的多次触发"
          language="tsx"
          code={`import { Button } from 'db-rn-ui';

export default function ButtonWithDebounce() {
  const handleSubmit = () => {
    console.log('提交表单');
  };

  return (
    <div className="flex flex-wrap gap-4">
      {/* 防抖：延迟 500ms 后执行 */}
      <Button 
        title="防抖提交"
        debounce={500}
        onPress={handleSubmit}
      />
      
      {/* 节流：每 1000ms 最多执行一次 */}
      <Button 
        title="节流提交"
        throttle={1000}
        onPress={handleSubmit}
      />
    </div>
  );
}`}
          preview={
            <div className="flex flex-wrap gap-4">
              <MockButton title="防抖提交" />
              <MockButton title="节流提交" />
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
                { prop: 'title', desc: '按钮显示的文字内容', type: 'string', def: '-' },
                { prop: 'variant', desc: '按钮视觉样式变体', type: "'primary' | 'secondary' | 'outline' | 'ghost'", def: "'primary'" },
                { prop: 'size', desc: '按钮尺寸', type: "'small' | 'medium' | 'large'", def: "'medium'" },
                { prop: 'loading', desc: '是否进入加载状态', type: 'boolean', def: 'false' },
                { prop: 'loadingText', desc: '加载状态下的占位文字', type: 'string', def: '-' },
                { prop: 'disabled', desc: '是否禁用按钮', type: 'boolean', def: 'false' },
                { prop: 'onPress', desc: '点击按钮的回调函数', type: '() => void', def: '-' },
                { prop: 'debounce', desc: '防抖延迟时间（毫秒）', type: 'number', def: '-' },
                { prop: 'throttle', desc: '节流延迟时间（毫秒）', type: 'number', def: '-' },
                { prop: 'icon', desc: '图标配置或节点', type: 'ButtonIconConfig | ReactNode', def: '-' },
                { prop: 'leftIcon', desc: '左侧图标', type: 'ButtonIconConfig | ReactNode', def: '-' },
                { prop: 'rightIcon', desc: '右侧图标', type: 'ButtonIconConfig | ReactNode', def: '-' },
                { prop: 'iconOnly', desc: '是否只显示图标', type: 'boolean', def: 'false' },
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

      {/* 图标配置说明 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">图标配置</h2>
        <CodeExample
          title="ButtonIconConfig 类型"
          description="图标配置对象支持的属性"
          language="tsx"
          code={`interface ButtonIconConfig {
  name: string;           // 图标名称
  family?: string;        // 图标库名称
  size?: number;          // 图标大小
  color?: string;         // 图标颜色
  position?: 'left' | 'right';  // 图标位置
  spacing?: number;       // 图标与文字的间距
}`}
          preview={
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">支持的图标库：</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li><strong>Ionicons</strong> - 默认图标库</li>
                <li><strong>FontAwesome</strong> - Font Awesome 图标</li>
                <li><strong>MaterialIcons</strong> - Material Design 图标</li>
                <li><strong>Entypo</strong> - Entypo 图标</li>
                <li><strong>AntDesign</strong> - Ant Design 图标</li>
              </ul>
            </div>
          }
        />
      </section>
    </div>
  );
}
