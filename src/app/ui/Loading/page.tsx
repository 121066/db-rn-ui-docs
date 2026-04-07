'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 Loading 组件类型
type LoadingType = 'spinner' | 'dots' | 'pulse' | 'wave' | 'bounce' | 'circular';
type LoadingSize = 'small' | 'medium' | 'large';

interface MockLoadingProps {
  type?: LoadingType;
  size?: LoadingSize | number;
  color?: string;
  secondaryColor?: string;
  text?: string;
  textPosition?: 'bottom' | 'right';
  fullscreen?: boolean;
  visible?: boolean;
  onClose?: () => void;
}

// Loading 动画组件
const MockLoading: React.FC<MockLoadingProps> = ({
  type = 'spinner',
  size = 'medium',
  color = '#3B82F6',
  secondaryColor = '#E5E7EB',
  text,
  textPosition = 'bottom',
  fullscreen,
  visible = true,
  onClose,
}) => {
  if (!visible) return null;

  const sizeMap = {
    small: 24,
    medium: 40,
    large: 64,
  };

  const pixelSize = typeof size === 'number' ? size : sizeMap[size];

  const renderLoading = () => {
    switch (type) {
      case 'spinner':
        return (
          <div
            className="animate-spin rounded-full border-4 border-t-transparent"
            style={{
              width: pixelSize,
              height: pixelSize,
              borderColor: secondaryColor,
              borderTopColor: color,
            }}
          />
        );
      case 'dots':
        return (
          <div className="flex gap-1" style={{ height: pixelSize }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="animate-bounce rounded-full"
                style={{
                  width: pixelSize / 3,
                  height: pixelSize / 3,
                  backgroundColor: color,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        );
      case 'pulse':
        return (
          <div
            className="animate-pulse rounded-full"
            style={{
              width: pixelSize,
              height: pixelSize,
              backgroundColor: color,
              opacity: 0.6,
            }}
          />
        );
      case 'wave':
        return (
          <div className="flex items-end gap-1" style={{ height: pixelSize }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-sm"
                style={{
                  width: pixelSize / 5,
                  height: pixelSize * 0.8,
                  backgroundColor: color,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s',
                }}
              />
            ))}
          </div>
        );
      case 'bounce':
        return (
          <div
            className="relative"
            style={{ width: pixelSize, height: pixelSize }}
          >
            <div
              className="absolute inset-0 rounded-full animate-bounce"
              style={{
                backgroundColor: color,
                opacity: 0.3,
              }}
            />
            <div
              className="absolute inset-2 rounded-full animate-pulse"
              style={{
                backgroundColor: color,
              }}
            />
          </div>
        );
      case 'circular':
        return (
          <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 50 50"
            className="animate-spin"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="4"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="80"
              strokeDashoffset="60"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const content = (
    <div
      className={`flex ${
        textPosition === 'right' ? 'flex-row items-center gap-3' : 'flex-col items-center gap-2'
      }`}
    >
      {renderLoading()}
      {text && <span className="text-gray-600 text-sm">{text}</span>}
    </div>
  );

  if (fullscreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="bg-white rounded-2xl p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default function LoadingPage() {
  const [fullscreenVisible, setFullscreenVisible] = useState(false);

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading 加载</h1>
        <p className="text-lg text-gray-600">
          用于页面和区块的加载中状态，提供多种动画类型和尺寸选择，支持全屏遮罩模式。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="默认加载动画"
          description="最简单的加载指示器，使用默认的 spinner 类型"
          language="tsx"
          code={`import { DbLoading } from 'db-rn-ui';

export default function BasicLoading() {
  return <DbLoading />;
}`}
          preview={
            <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
              <MockLoading />
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 多种动画类型 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">动画类型</h2>
        <CodeExample
          title="6 种加载动画"
          description="支持 spinner、dots、pulse、wave、bounce、circular 等多种动画效果"
          language="tsx"
          code={`import { DbLoading } from 'db-rn-ui';

export default function LoadingTypes() {
  return (
    <>
      <DbLoading type="spinner" text="Spinner" />
      <DbLoading type="dots" text="Dots" />
      <DbLoading type="pulse" text="Pulse" />
      <DbLoading type="wave" text="Wave" />
      <DbLoading type="bounce" text="Bounce" />
      <DbLoading type="circular" text="Circular" />
    </>
  );
}`}
          preview={
            <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg">
              {(['spinner', 'dots', 'pulse', 'wave', 'bounce', 'circular'] as LoadingType[]).map(
                (type) => (
                  <div key={type} className="flex flex-col items-center gap-2">
                    <MockLoading type={type} />
                    <span className="text-xs text-gray-500 capitalize">{type}</span>
                  </div>
                )
              )}
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 尺寸展示 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">尺寸规格</h2>
        <CodeExample
          title="三种预设尺寸"
          description="提供 small、medium、large 三种尺寸，也支持自定义数值"
          language="tsx"
          code={`import { DbLoading } from 'db-rn-ui';

export default function LoadingSizes() {
  return (
    <>
      <DbLoading size="small" text="Small" />
      <DbLoading size="medium" text="Medium" />
      <DbLoading size="large" text="Large" />
      {/* 自定义数值 */}
      <DbLoading size={80} text="Custom 80px" />
    </>
  );
}`}
          preview={
            <div className="flex items-center justify-center gap-8 p-6 bg-gray-50 rounded-lg">
              {(['small', 'medium', 'large'] as LoadingSize[]).map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <MockLoading size={size} />
                  <span className="text-xs text-gray-500 capitalize">{size}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2">
                <MockLoading size={80} />
                <span className="text-xs text-gray-500">Custom 80px</span>
              </div>
            </div>
          }
        />
      </section>

      {/* 自定义颜色 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义颜色</h2>
        <CodeExample
          title="主题色和辅助色"
          description="通过 color 和 secondaryColor 自定义加载动画的颜色"
          language="tsx"
          code={`import { DbLoading } from 'db-rn-ui';

export default function LoadingColors() {
  return (
    <>
      {/* 品牌色 */}
      <DbLoading color="#FF2442" text="Brand Color" />
      
      {/* 渐变色效果 */}
      <DbLoading 
        type="circular"
        color="#3B82F6" 
        secondaryColor="#E0E7FF"
        text="Custom Colors" 
      />
      
      {/* 暗色主题 */}
      <DbLoading 
        color="#1F2937" 
        text="Dark Theme" 
      />
    </>
  );
}`}
          preview={
            <div className="flex items-center justify-center gap-8 p-6 bg-gray-50 rounded-lg">
              <MockLoading color="#FF2442" text="Brand Color" />
              <MockLoading
                type="circular"
                color="#3B82F6"
                secondaryColor="#E0E7FF"
                text="Custom Colors"
              />
              <MockLoading color="#1F2937" text="Dark Theme" />
            </div>
          }
        />
      </section>

      {/* 文字位置 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">文字位置</h2>
        <CodeExample
          title="底部和右侧文字"
          description="通过 textPosition 属性控制提示文字的位置"
          language="tsx"
          code={`import { DbLoading } from 'db-rn-ui';

export default function LoadingTextPosition() {
  return (
    <>
      {/* 文字在底部（默认） */}
      <DbLoading text="加载中..." textPosition="bottom" />
      
      {/* 文字在右侧 */}
      <DbLoading text="正在保存" textPosition="right" />
    </>
  );
}`}
          preview={
            <div className="flex items-center justify-center gap-12 p-6 bg-gray-50 rounded-lg">
              <MockLoading text="加载中..." textPosition="bottom" />
              <MockLoading text="正在保存" textPosition="right" />
            </div>
          }
        />
      </section>

      {/* 全屏加载 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">全屏加载</h2>
        <CodeExample
          title="全屏遮罩模式"
          description="设置 fullscreen 属性显示全屏加载，支持点击遮罩关闭"
          language="tsx"
          code={`import { DbLoading } from 'db-rn-ui';
import { useState } from 'react';

export default function FullscreenLoading() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button 
        title="显示全屏加载" 
        onPress={() => setVisible(true)} 
      />
      
      <DbLoading
        visible={visible}
        fullscreen
        text="加载中..."
        maskClosable
        onClose={() => setVisible(false)}
      />
    </>
  );
}`}
          preview={
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
              <button
                onClick={() => setFullscreenVisible(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                显示全屏加载
              </button>
              <MockLoading
                visible={fullscreenVisible}
                fullscreen
                text="加载中..."
                onClose={() => setFullscreenVisible(false)}
              />
            </div>
          }
        />
      </section>

      {/* 应用场景 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">应用场景</h2>
        <CodeExample
          title="列表加载、按钮加载、页面加载"
          description="不同场景下的 Loading 使用示例"
          language="tsx"
          code={`import { DbLoading } from 'db-rn-ui';

// 列表加载状态
<ListLoading />

// 按钮加载状态
<Button loading title="提交中..." />

// 页面初始化加载
<PageLoading visible={isLoading} text="页面加载中..." />`}
          preview={
            <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
              {/* 列表加载 */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center py-8">
                  <MockLoading type="dots" text="加载更多..." />
                </div>
              </div>

              {/* 按钮加载 */}
              <div className="flex items-center justify-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg opacity-70">
                  <MockLoading size="small" color="white" />
                  <span>提交中...</span>
                </button>
              </div>

              {/* 页面加载 */}
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex flex-col items-center gap-4">
                  <MockLoading type="circular" size="large" />
                  <p className="text-gray-600">页面加载中...</p>
                </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  属性
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  说明
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  默认值
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { prop: 'visible', desc: '是否显示（用于全屏模式）', type: 'boolean', def: 'true' },
                { prop: 'type', desc: '加载动画类型', type: "'spinner' | 'dots' | 'pulse' | 'wave' | 'bounce' | 'circular' | 'custom'", def: "'spinner'" },
                { prop: 'size', desc: '尺寸大小', type: "'small' | 'medium' | 'large' | number", def: "'medium'" },
                { prop: 'color', desc: '主题色', type: 'string', def: "'#3B82F6'" },
                { prop: 'secondaryColor', desc: '辅助色（用于某些动画）', type: 'string', def: "'#E5E7EB'" },
                { prop: 'text', desc: '加载提示文字', type: 'string', def: '-' },
                { prop: 'textPosition', desc: '文字位置', type: "'bottom' | 'right'", def: "'bottom'" },
                { prop: 'textStyle', desc: '文字样式', type: 'TextStyle', def: '-' },
                { prop: 'textGap', desc: '文字与图标间距', type: 'number', def: '8' },
                { prop: 'fullscreen', desc: '是否全屏显示（带遮罩）', type: 'boolean', def: 'false' },
                { prop: 'maskColor', desc: '遮罩层颜色', type: 'string', def: "'rgba(0,0,0,0.5)'" },
                { prop: 'maskClosable', desc: '遮罩层是否可点击关闭', type: 'boolean', def: 'false' },
                { prop: 'onClose', desc: '关闭回调', type: '() => void', def: '-' },
                { prop: 'duration', desc: '动画速度（毫秒）', type: 'number', def: '1000' },
                { prop: 'vertical', desc: '是否垂直布局', type: 'boolean', def: 'true' },
              ].map((item) => (
                <tr key={item.prop}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">
                    {item.prop}
                  </td>
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
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-4">选择合适的加载类型</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start gap-2">
              <span className="font-medium">Spinner</span>
              <span>- 最通用的加载动画，适合大多数场景</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium">Dots</span>
              <span>- 适合轻量级操作，如按钮点击后的短暂加载</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium">Wave / Pulse</span>
              <span>- 适合内容加载、音乐播放等场景</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium">Circular</span>
              <span>- 适合表单提交、文件上传等需要明确进度的场景</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
