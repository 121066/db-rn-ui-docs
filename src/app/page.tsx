export default function Home() {
  return (
    <div className="space-y-12 pb-20">
      <section>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">欢迎使用 db-rn-ui</h1>
        <p className="text-lg text-gray-600 mb-6">
          现代化的 React Native UI 组件库，提供高质量、可定制的组件。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🎨 丰富的组件</h3>
            <p className="text-gray-600">提供 20+ 高质量的 UI 组件，满足各种业务需求。</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">⚡ 高性能</h3>
            <p className="text-gray-600">优化的组件实现，确保应用流畅运行。</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🔧 易于定制</h3>
            <p className="text-gray-600">灵活的 API 和样式系统，轻松定制组件外观。</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📚 完整文档</h3>
            <p className="text-gray-600">详细的使用指南和 API 文档，快速上手。</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">快速开始</h2>
        <div className="bg-gray-900 rounded-lg p-6 text-gray-100">
          <p className="mb-2 text-sm text-gray-400">安装组件库</p>
          <code className="text-sm">npm install db-rn-ui</code>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">主要特性</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span className="text-gray-700">支持 React Native 和 Web 平台</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span className="text-gray-700">TypeScript 完整支持</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span className="text-gray-700">响应式设计</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span className="text-gray-700">无障碍访问支持</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">✓</span>
            <span className="text-gray-700">主题定制</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
