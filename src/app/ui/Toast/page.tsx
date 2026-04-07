'use client';
import React, { useState, useCallback } from 'react';
import CodeExample from '@/components/CodeExample';

// Toast 类型定义
type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';
type ToastPosition = 'top' | 'center' | 'bottom';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  position: ToastPosition;
  duration: number;
  showIcon: boolean;
}

// 全局 Toast 状态（模拟 Provider）
const useToastStore = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, type: ToastType = 'info', position: ToastPosition = 'center', duration: number = 2000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = {
      id,
      message,
      type,
      position,
      duration,
      showIcon: true,
    };
    
    setToasts((prev) => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    
    return { close: () => setToasts((prev) => prev.filter((t) => t.id !== id)) };
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, show, remove };
};

// Toast 图标组件
const ToastIcon: React.FC<{ type: ToastType }> = ({ type }) => {
  const icons = {
    success: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    loading: (
      <svg className="w-6 h-6 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
  };
  return icons[type] || null;
};

// Toast 容器组件
const ToastContainer: React.FC<{ toasts: ToastItem[]; onRemove: (id: string) => void }> = ({ toasts, onRemove }) => {
  const getPositionClass = (position: ToastPosition) => {
    switch (position) {
      case 'top':
        return 'top-20 left-1/2 -translate-x-1/2';
      case 'bottom':
        return 'bottom-20 left-1/2 -translate-x-1/2';
      case 'center':
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  const getBackgroundColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-white border-l-4 border-green-500';
      case 'error':
        return 'bg-white border-l-4 border-red-500';
      case 'warning':
        return 'bg-white border-l-4 border-yellow-500';
      case 'loading':
        return 'bg-white border-l-4 border-blue-500';
      case 'info':
      default:
        return 'bg-white border-l-4 border-blue-500';
    }
  };

  return (
    <>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`fixed z-[9999] ${getPositionClass(toast.position)} animate-[fadeIn_0.3s_ease-out]`}
          onClick={() => onRemove(toast.id)}
        >
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl min-w-[200px] ${getBackgroundColor(toast.type)}`}
          >
            {toast.showIcon && <ToastIcon type={toast.type} />}
            <span className="text-gray-800 font-medium">{toast.message}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default function ToastPage() {
  const { toasts, show, remove } = useToastStore();
  const [loadingToast, setLoadingToast] = useState<{ close: () => void } | null>(null);

  const handleShow = (message: string, type: ToastType, position: ToastPosition = 'center') => {
    show(message, type, position, 2000);
  };

  const handleLoading = () => {
    const toast = show('加载中...', 'loading', 'center', 0);
    setLoadingToast(toast);
    
    // 3秒后自动关闭
    setTimeout(() => {
      toast.close();
      setLoadingToast(null);
      show('加载完成', 'success', 'center', 1500);
    }, 3000);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Toast 容器 */}
      <ToastContainer toasts={toasts} onRemove={remove} />

      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Toast 轻提示</h1>
        <p className="text-lg text-gray-600">
          用于显示操作反馈的轻量级提示组件，支持多种类型、位置和自定义配置，自动消失不影响用户操作。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="基本提示"
          description="最简单的提示，默认 2 秒后自动消失"
          language="tsx"
          code={`import { Toast } from 'db-rn-ui';

// 显示普通提示
Toast.show('操作成功');

// 或者使用配置对象
Toast.show({
  message: '操作成功',
  duration: 2000,
  position: 'center'
});`}
          preview={
            <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
              <button
                onClick={() => handleShow('这是一条提示消息', 'info')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                显示提示
              </button>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 提示类型 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">提示类型</h2>
        <CodeExample
          title="5 种提示类型"
          description="支持 success、error、warning、info、loading 多种类型"
          language="tsx"
          code={`import { Toast } from 'db-rn-ui';

// 成功提示
Toast.success('操作成功');

// 错误提示
Toast.error('操作失败');

// 警告提示
Toast.warning('请注意');

// 信息提示
Toast.info('提示信息');

// 加载提示
Toast.loading('加载中...');`}
          preview={
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg">
              <button
                onClick={() => handleShow('操作成功', 'success')}
                className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                成功
              </button>
              <button
                onClick={() => handleShow('操作失败', 'error')}
                className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                错误
              </button>
              <button
                onClick={() => handleShow('请注意', 'warning')}
                className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                警告
              </button>
              <button
                onClick={() => handleShow('提示信息', 'info')}
                className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                信息
              </button>
              <button
                onClick={handleLoading}
                disabled={loadingToast !== null}
                className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 col-span-2 sm:col-span-1"
              >
                <svg className={`w-5 h-5 ${loadingToast ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                加载
              </button>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 显示位置 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">显示位置</h2>
        <CodeExample
          title="3 种显示位置"
          description="支持 top、center、bottom 三种位置"
          language="tsx"
          code={`import { Toast } from 'db-rn-ui';

// 顶部显示
Toast.show({
  message: '顶部提示',
  position: 'top'
});

// 中间显示（默认）
Toast.show({
  message: '中间提示',
  position: 'center'
});

// 底部显示
Toast.show({
  message: '底部提示',
  position: 'bottom'
});`}
          preview={
            <div className="flex flex-wrap items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg">
              <button
                onClick={() => handleShow('顶部提示消息', 'info', 'top')}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                顶部显示
              </button>
              <button
                onClick={() => handleShow('中间提示消息', 'info', 'center')}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                中间显示
              </button>
              <button
                onClick={() => handleShow('底部提示消息', 'info', 'bottom')}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                底部显示
              </button>
            </div>
          }
        />
      </section>

      {/* 自定义时长 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">显示时长</h2>
        <CodeExample
          title="自定义显示时间"
          description="通过 duration 设置显示时长，0 表示不自动关闭"
          language="tsx"
          code={`import { Toast } from 'db-rn-ui';

// 短提示（1秒）
Toast.show({
  message: '短提示',
  duration: 1000
});

// 长提示（5秒）
Toast.show({
  message: '长提示',
  duration: 5000
});

// 不自动关闭（需手动关闭）
const toast = Toast.loading({
  message: '加载中...',
  duration: 0
});

// 手动关闭
toast.close();`}
          preview={
            <div className="flex flex-wrap items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg">
              <button
                onClick={() => show('1秒后消失', 'info', 'center', 1000)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                1秒消失
              </button>
              <button
                onClick={() => show('3秒后消失', 'info', 'center', 3000)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                3秒消失
              </button>
              <button
                onClick={() => show('5秒后消失', 'info', 'center', 5000)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                5秒消失
              </button>
            </div>
          }
        />
      </section>

      {/* 实际场景 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">实际场景</h2>
        <CodeExample
          title="常见使用场景"
          description="登录、提交表单、网络请求等场景的使用示例"
          language="tsx"
          code={`import { Toast } from 'db-rn-ui';

// 登录成功
const handleLogin = async () => {
  try {
    await loginApi();
    Toast.success('登录成功');
    navigation.navigate('Home');
  } catch (error) {
    Toast.error('登录失败，请重试');
  }
};

// 提交表单
const handleSubmit = async () => {
  if (!formValid) {
    Toast.warning('请完善表单信息');
    return;
  }
  
  const loading = Toast.loading('提交中...');
  try {
    await submitApi();
    loading.close();
    Toast.success('提交成功');
  } catch (error) {
    loading.close();
    Toast.error('提交失败');
  }
};

// 网络请求
const fetchData = async () => {
  const loading = Toast.loading('加载中...');
  try {
    const data = await fetchApi();
    loading.close();
    setData(data);
  } catch (error) {
    loading.close();
    Toast.error('加载失败');
  }
};`}
          preview={
            <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-20">登录场景：</span>
                <button
                  onClick={() => {
                    show('登录成功', 'success');
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                >
                  模拟登录成功
                </button>
                <button
                  onClick={() => show('登录失败，请重试', 'error')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                >
                  模拟登录失败
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-20">表单验证：</span>
                <button
                  onClick={() => show('请完善表单信息', 'warning')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                >
                  模拟表单验证
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-20">网络请求：</span>
                <button
                  onClick={handleLoading}
                  disabled={loadingToast !== null}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  模拟加载请求
                </button>
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
                { prop: 'message', desc: '提示消息内容', type: 'string', def: '-' },
                { prop: 'type', desc: '提示类型', type: "'success' | 'error' | 'warning' | 'info' | 'loading'", def: "'info'" },
                { prop: 'duration', desc: '显示时长(ms)，0表示不自动关闭', type: 'number', def: '2000' },
                { prop: 'position', desc: '显示位置', type: "'top' | 'center' | 'bottom'", def: "'center'" },
                { prop: 'showIcon', desc: '是否显示图标', type: 'boolean', def: 'true' },
                { prop: 'icon', desc: '自定义图标', type: 'ToastIconConfig | ReactNode', def: '-' },
                { prop: 'onClose', desc: '关闭回调', type: '() => void', def: '-' },
                { prop: 'backgroundColor', desc: '背景色', type: 'string', def: '-' },
                { prop: 'textColor', desc: '文字颜色', type: 'string', def: '-' },
                { prop: 'borderRadius', desc: '圆角大小', type: 'number', def: '8' },
                { prop: 'maxWidth', desc: '最大宽度', type: 'number | string', def: '80%' },
                { prop: 'content', desc: '自定义内容（优先于message）', type: 'ReactNode', def: '-' },
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

      {/* 静态方法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">静态方法</h2>
        <CodeExample
          title="Toast 静态方法"
          description="提供便捷的静态方法快速调用"
          language="tsx"
          code={`import { Toast } from 'db-rn-ui';

// 显示普通提示
Toast.show('提示消息');
Toast.show('提示消息', 2000); // 带时长

// 显示成功提示
Toast.success('操作成功');

// 显示错误提示  
Toast.error('操作失败');

// 显示警告提示
Toast.warning('警告信息');

// 显示信息提示
Toast.info('提示信息');

// 显示加载提示（返回实例可手动关闭）
const loading = Toast.loading('加载中...');
// ... 异步操作
loading.close(); // 手动关闭`}
          preview={
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">所有方法都支持两种调用方式：</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>简写：<code className="bg-gray-200 px-1 rounded">Toast.success('消息')</code></li>
                <li>配置：<code className="bg-gray-200 px-1 rounded">Toast.show({'{'} message: '消息', type: 'success' {'}'})</code></li>
              </ul>
            </div>
          }
        />
      </section>

      {/* 使用建议 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">使用建议</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="font-semibold text-yellow-800 mb-4">最佳实践</h3>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Toast 适用于轻量级反馈，不需要用户操作的场景</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>消息内容应简洁明了，建议不超过 15 个汉字</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>loading 类型需要手动关闭，记得在操作完成后调用 close()</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>同一页面同时只显示一个 Toast，新的会替换旧的</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>避免过度使用 Toast，重要的操作结果建议使用 Modal 或 Alert</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
