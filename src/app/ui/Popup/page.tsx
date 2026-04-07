'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 Popup 组件
type PopupPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';
type CloseIconPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface MockPopupProps {
  visible: boolean;
  onClose: () => void;
  position?: PopupPosition;
  overlay?: boolean;
  overlayColor?: string;
  closeOnClickOverlay?: boolean;
  closable?: boolean;
  closeIconPosition?: CloseIconPosition;
  round?: boolean;
  borderRadius?: number;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  title?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const MockPopup: React.FC<MockPopupProps> = ({
  visible,
  onClose,
  position = 'center',
  overlay = true,
  overlayColor = 'rgba(0, 0, 0, 0.6)',
  closeOnClickOverlay = true,
  closable = true,
  closeIconPosition = 'top-right',
  round = true,
  borderRadius = 16,
  width,
  backgroundColor = '#fff',
  title,
  header,
  footer,
  children,
}) => {
  if (!visible) return null;

  const getPositionStyles = () => {
    switch (position) {
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-[90%]';
      case 'top':
        return 'top-0 left-0 right-0';
      case 'bottom':
        return 'bottom-0 left-0 right-0';
      case 'left':
        return 'top-0 left-0 bottom-0 h-full';
      case 'right':
        return 'top-0 right-0 bottom-0 h-full';
      default:
        return '';
    }
  };

  const getAnimationClass = () => {
    switch (position) {
      case 'center':
        return 'animate-[fadeIn_0.3s_ease-out,scaleIn_0.3s_ease-out]';
      case 'top':
        return 'animate-[slideDown_0.3s_ease-out]';
      case 'bottom':
        return 'animate-[slideUp_0.3s_ease-out]';
      case 'left':
        return 'animate-[slideRight_0.3s_ease-out]';
      case 'right':
        return 'animate-[slideLeft_0.3s_ease-out]';
      default:
        return '';
    }
  };

  const getCloseButtonPosition = () => {
    switch (closeIconPosition) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getBorderRadius = () => {
    if (!round) return 0;
    switch (position) {
      case 'center':
        return borderRadius;
      case 'top':
        return `0 0 ${borderRadius}px ${borderRadius}px`;
      case 'bottom':
        return `${borderRadius}px ${borderRadius}px 0 0`;
      case 'left':
        return `0 ${borderRadius}px ${borderRadius}px 0`;
      case 'right':
        return `${borderRadius}px 0 0 ${borderRadius}px`;
      default:
        return borderRadius;
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* 遮罩层 */}
      {overlay && (
        <div
          className="absolute inset-0 animate-[fadeIn_0.3s_ease-out]"
          style={{ backgroundColor: overlayColor }}
          onClick={closeOnClickOverlay ? onClose : undefined}
        />
      )}

      {/* 弹出层内容 */}
      <div
        className={`absolute ${getPositionStyles()} ${getAnimationClass()} shadow-2xl`}
        style={{
          backgroundColor,
          borderRadius: getBorderRadius(),
          width: width || (position === 'left' || position === 'right' ? '80%' : undefined),
          maxHeight: position === 'center' ? '80vh' : undefined,
        }}
      >
        {/* 关闭按钮 */}
        {closable && (
          <button
            className={`absolute ${getCloseButtonPosition()} w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10`}
            onClick={onClose}
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* 自定义头部 */}
        {header}

        {/* 标题 */}
        {title && !header && (
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 text-center">{title}</h3>
          </div>
        )}

        {/* 内容区域 */}
        <div className={`p-6 ${position === 'bottom' ? 'pb-8' : ''} ${position === 'top' ? 'pt-8' : ''}`}>
          {children}
        </div>

        {/* 自定义底部 */}
        {footer}
      </div>
    </div>
  );
};

export default function PopupPage() {
  const [centerVisible, setCenterVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);
  const [topVisible, setTopVisible] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const [roundVisible, setRoundVisible] = useState(false);
  const [noOverlayVisible, setNoOverlayVisible] = useState(false);
  const [customStyleVisible, setCustomStyleVisible] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Popup 弹出层</h1>
        <p className="text-lg text-gray-600">
          用于展示弹窗、浮层、抽屉等内容的容器组件，支持多种弹出位置、动画效果和自定义样式。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="中间弹出"
          description="最简单的弹出层，从屏幕中间弹出显示"
          language="tsx"
          code={`import { DbPopup } from 'db-rn-ui';
import { useState } from 'react';

export default function BasicPopup() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button title="显示弹出层" onPress={() => setVisible(true)} />
      
      <DbPopup
        visible={visible}
        onClose={() => setVisible(false)}
        title="标题"
      >
        <Text>弹出层内容</Text>
      </DbPopup>
    </>
  );
}`}
          preview={
            <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
              <button
                onClick={() => setCenterVisible(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                显示弹出层
              </button>
              <MockPopup
                visible={centerVisible}
                onClose={() => setCenterVisible(false)}
                title="标题"
              >
                <p className="text-gray-600">这是弹出层的内容区域，可以放置任意内容。</p>
              </MockPopup>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 弹出位置 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">弹出位置</h2>
        <CodeExample
          title="5 种弹出位置"
          description="支持 center、top、bottom、left、right 五种弹出位置"
          language="tsx"
          code={`import { DbPopup } from 'db-rn-ui';

// 底部弹出（常用于 ActionSheet）
<DbPopup
  visible={visible}
  position="bottom"
  onClose={() => setVisible(false)}
>
  <Text>底部弹出内容</Text>
</DbPopup>

// 左侧弹出（抽屉效果）
<DbPopup
  visible={visible}
  position="left"
  width="80%"
  onClose={() => setVisible(false)}
>
  <Text>左侧抽屉内容</Text>
</DbPopup>`}
          preview={
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg">
              <button
                onClick={() => setCenterVisible(true)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-sm"
              >
                中间弹出
              </button>
              <button
                onClick={() => setTopVisible(true)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-sm"
              >
                顶部弹出
              </button>
              <button
                onClick={() => setBottomVisible(true)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-sm"
              >
                底部弹出
              </button>
              <button
                onClick={() => setLeftVisible(true)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-sm"
              >
                左侧弹出
              </button>
              <button
                onClick={() => setRightVisible(true)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-sm"
              >
                右侧弹出
              </button>

              {/* 各个位置的 Popup */}
              <MockPopup
                visible={centerVisible}
                onClose={() => setCenterVisible(false)}
                position="center"
                title="中间弹出"
              >
                <p className="text-gray-600">从屏幕中心弹出的对话框样式</p>
              </MockPopup>

              <MockPopup
                visible={topVisible}
                onClose={() => setTopVisible(false)}
                position="top"
              >
                <div className="pt-4">
                  <p className="text-gray-600">从顶部弹出的通知栏样式</p>
                </div>
              </MockPopup>

              <MockPopup
                visible={bottomVisible}
                onClose={() => setBottomVisible(false)}
                position="bottom"
              >
                <div className="pb-4">
                  <p className="text-gray-600 mb-4">从底部弹出的 ActionSheet 样式</p>
                  <div className="space-y-2">
                    <button className="w-full py-3 text-blue-600 bg-blue-50 rounded-lg">选项一</button>
                    <button className="w-full py-3 text-blue-600 bg-blue-50 rounded-lg">选项二</button>
                  </div>
                </div>
              </MockPopup>

              <MockPopup
                visible={leftVisible}
                onClose={() => setLeftVisible(false)}
                position="left"
                width={300}
              >
                <div className="pt-8">
                  <h4 className="font-semibold mb-4">左侧导航</h4>
                  <nav className="space-y-2">
                    <a className="block py-2 text-gray-600 hover:text-blue-600">首页</a>
                    <a className="block py-2 text-gray-600 hover:text-blue-600">分类</a>
                    <a className="block py-2 text-gray-600 hover:text-blue-600">购物车</a>
                    <a className="block py-2 text-gray-600 hover:text-blue-600">我的</a>
                  </nav>
                </div>
              </MockPopup>

              <MockPopup
                visible={rightVisible}
                onClose={() => setRightVisible(false)}
                position="right"
                width={300}
              >
                <div className="pt-8">
                  <h4 className="font-semibold mb-4">右侧设置</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">消息通知</span>
                      <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">夜间模式</span>
                      <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </MockPopup>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 圆角设置 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">圆角设置</h2>
        <CodeExample
          title="圆角弹出层"
          description="通过 round 和 borderRadius 属性设置圆角效果"
          language="tsx"
          code={`import { DbPopup } from 'db-rn-ui';

<DbPopup
  visible={visible}
  position="bottom"
  round={true}
  borderRadius={20}
  onClose={() => setVisible(false)}
>
  <Text>圆角底部弹出层</Text>
</DbPopup>`}
          preview={
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
              <button
                onClick={() => setRoundVisible(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                显示圆角弹出层
              </button>
              <MockPopup
                visible={roundVisible}
                onClose={() => setRoundVisible(false)}
                position="bottom"
                round={true}
                borderRadius={24}
              >
                <div className="pb-4">
                  <h4 className="font-semibold text-lg mb-3">圆角样式</h4>
                  <p className="text-gray-600">设置了更大的圆角值，视觉效果更加柔和</p>
                </div>
              </MockPopup>
            </div>
          }
        />
      </section>

      {/* 遮罩层配置 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">遮罩层配置</h2>
        <CodeExample
          title="自定义遮罩层"
          description="可设置遮罩层颜色、透明度，或完全隐藏遮罩层"
          language="tsx"
          code={`import { DbPopup } from 'db-rn-ui';

// 自定义遮罩层颜色
<DbPopup
  visible={visible}
  overlayColor="rgba(0, 0, 0, 0.8)"
  onClose={() => setVisible(false)}
>
  <Text>深色遮罩</Text>
</DbPopup>

// 不显示遮罩层
<DbPopup
  visible={visible}
  overlay={false}
  onClose={() => setVisible(false)}
>
  <Text>无遮罩层</Text>
</DbPopup>

// 点击遮罩不关闭
<DbPopup
  visible={visible}
  closeOnClickOverlay={false}
  onClose={() => setVisible(false)}
>
  <Text>点击遮罩不关闭</Text>
</DbPopup>`}
          preview={
            <div className="flex flex-wrap items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg">
              <button
                onClick={() => setNoOverlayVisible(true)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                无遮罩层
              </button>
              <MockPopup
                visible={noOverlayVisible}
                onClose={() => setNoOverlayVisible(false)}
                overlay={false}
                position="center"
              >
                <div className="shadow-2xl border border-gray-200">
                  <p className="text-gray-600 mb-4">这个弹出层没有遮罩层</p>
                  <button
                    onClick={() => setNoOverlayVisible(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                  >
                    关闭
                  </button>
                </div>
              </MockPopup>
            </div>
          }
        />
      </section>

      {/* ActionSheet 示例 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">ActionSheet 动作面板</h2>
        <CodeExample
          title="底部动作面板"
          description="常用于展示操作选项的底部弹出面板"
          language="tsx"
          code={`import { DbPopup } from 'db-rn-ui';

export default function ActionSheet() {
  const [visible, setVisible] = useState(false);
  const options = ['拍照', '从相册选择', '文件'];

  return (
    <>
      <Button title="显示 ActionSheet" onPress={() => setVisible(true)} />
      
      <DbPopup
        visible={visible}
        position="bottom"
        round
        onClose={() => setVisible(false)}
      >
        <View style={{ padding: 16 }}>
          <Text style={{ textAlign: 'center', marginBottom: 16 }}>
            选择操作
          </Text>
          {options.map((option, index) => (
            <Button
              key={index}
              title={option}
              variant="ghost"
              onPress={() => {
                console.log(option);
                setVisible(false);
              }}
            />
          ))}
          <Button
            title="取消"
            variant="secondary"
            onPress={() => setVisible(false)}
          />
        </View>
      </DbPopup>
    </>
  );
}`}
          preview={
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
              <button
                onClick={() => setActionSheetVisible(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                显示 ActionSheet
              </button>
              <MockPopup
                visible={actionSheetVisible}
                onClose={() => setActionSheetVisible(false)}
                position="bottom"
                round
                closable={false}
              >
                <div className="pb-4">
                  <p className="text-center text-gray-500 text-sm mb-4">选择操作</p>
                  <div className="space-y-2">
                    {['拍照', '从相册选择', '文件'].map((option, index) => (
                      <button
                        key={index}
                        className="w-full py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        onClick={() => setActionSheetVisible(false)}
                      >
                        {option}
                      </button>
                    ))}
                    <div className="h-px bg-gray-200 my-3" />
                    <button
                      className="w-full py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      onClick={() => setActionSheetVisible(false)}
                    >
                      取消
                    </button>
                  </div>
                </div>
              </MockPopup>
            </div>
          }
        />
      </section>

      {/* 自定义样式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义样式</h2>
        <CodeExample
          title="自定义背景和尺寸"
          description="可自定义背景色、宽度、高度等样式属性"
          language="tsx"
          code={`import { DbPopup } from 'db-rn-ui';

<DbPopup
  visible={visible}
  position="center"
  backgroundColor="#1F2937"
  width={320}
  borderRadius={24}
  onClose={() => setVisible(false)}
>
  <View>
    <Text style={{ color: '#fff' }}>深色主题弹出层</Text>
  </View>
</DbPopup>`}
          preview={
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
              <button
                onClick={() => setCustomStyleVisible(true)}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                自定义样式
              </button>
              <MockPopup
                visible={customStyleVisible}
                onClose={() => setCustomStyleVisible(false)}
                position="center"
                backgroundColor="#1F2937"
                width={320}
                borderRadius={24}
              >
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">支付成功</h4>
                  <p className="text-gray-400 text-sm">您的订单已支付成功</p>
                </div>
              </MockPopup>
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
                { prop: 'visible', desc: '是否显示弹出层', type: 'boolean', def: 'false' },
                { prop: 'onClose', desc: '关闭回调', type: '() => void', def: '-' },
                { prop: 'position', desc: '弹出位置', type: "'center' | 'top' | 'bottom' | 'left' | 'right'", def: "'center'" },
                { prop: 'overlay', desc: '是否显示遮罩层', type: 'boolean', def: 'true' },
                { prop: 'overlayColor', desc: '遮罩层颜色', type: 'string', def: "'rgba(0,0,0,0.6)'" },
                { prop: 'closeOnClickOverlay', desc: '点击遮罩是否关闭', type: 'boolean', def: 'true' },
                { prop: 'closable', desc: '是否显示关闭按钮', type: 'boolean', def: 'true' },
                { prop: 'closeIconPosition', desc: '关闭按钮位置', type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'", def: "'top-right'" },
                { prop: 'round', desc: '是否显示圆角', type: 'boolean', def: 'true' },
                { prop: 'borderRadius', desc: '圆角大小', type: 'number', def: '16' },
                { prop: 'width', desc: '弹出层宽度', type: 'number | string', def: '-' },
                { prop: 'height', desc: '弹出层高度', type: 'number | string', def: '-' },
                { prop: 'backgroundColor', desc: '背景色', type: 'string', def: "'#fff'" },
                { prop: 'title', desc: '标题', type: 'string', def: '-' },
                { prop: 'header', desc: '自定义头部', type: 'ReactNode', def: '-' },
                { prop: 'footer', desc: '自定义底部', type: 'ReactNode', def: '-' },
                { prop: 'duration', desc: '动画时长(毫秒)', type: 'number', def: '300' },
                { prop: 'lockScroll', desc: '是否锁定背景滚动', type: 'boolean', def: 'true' },
                { prop: 'zIndex', desc: '层级', type: 'number', def: '1000' },
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
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-4">弹出位置选择指南</h3>
          <ul className="space-y-3 text-sm text-blue-700">
            <li className="flex items-start gap-2">
              <span className="font-medium">center</span>
              <span>- 用于重要提示、确认对话框、模态窗口</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium">bottom</span>
              <span>- 用于 ActionSheet、分享面板、选择器等</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium">left / right</span>
              <span>- 用于导航抽屉、设置面板、筛选器等</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium">top</span>
              <span>- 用于通知栏、提示条等</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
