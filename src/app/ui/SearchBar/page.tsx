'use client';
import React from 'react';
import CodeExample from '@/components/CodeExample';

export default function SearchBarPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">SearchBar 搜索栏</h1>
        <p className="text-lg text-gray-600">
          功能丰富的搜索输入组件，支持拍照搜索、语音输入、扫一扫等功能，适用于商品搜索、内容搜索等场景。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="受控组件"
          description="使用 value 和 onChangeText 实现受控输入，onSubmit 处理搜索提交"
          language="tsx"
          code={`import { DbSearchBar } from 'db-rn-ui';
import { useState } from 'react';
import { Alert } from 'react-native';

export default function BasicSearchBar() {
  const [searchText, setSearchText] = useState('');

  return (
    <DbSearchBar
      placeholder="搜索商品"
      value={searchText}
      onChangeText={setSearchText}
      onSubmit={(text: string) => Alert.alert('搜索', \`搜索: \${text}\`)}
    />
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl">
                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-200 transition-all hover:shadow-md hover:border-blue-300 cursor-text">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-gray-400 text-sm flex-1">搜索商品</span>
                </div>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 带功能按钮 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">功能按钮</h2>
        <CodeExample
          title="拍照和扫一扫"
          description="启用 showCamera 和 showScan 显示拍照搜索和扫码功能按钮"
          language="tsx"
          code={`import { DbSearchBar } from 'db-rn-ui';
import { Alert } from 'react-native';

export default function SearchBarWithFeatures() {
  return (
    <DbSearchBar
      placeholder="搜索商品、店铺"
      showCamera
      showScan
      onCameraPress={() => Alert.alert('拍照', '打开相机拍照搜索')}
      onScanPress={() => Alert.alert('扫一扫', '打开扫码功能')}
    />
  );
}`}
          preview={
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-gray-400 text-sm flex-1">搜索商品、店铺</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 语音和搜索按钮 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">语音和搜索按钮</h2>
        <CodeExample
          title="语音输入和搜索按钮"
          description="启用语音输入功能，并显示搜索按钮"
          language="tsx"
          code={`import { DbSearchBar } from 'db-rn-ui';
import { Alert } from 'react-native';

export default function SearchBarWithVoice() {
  return (
    <DbSearchBar
      placeholder="语音搜索试试"
      showVoice
      showSearchButton
      searchButtonText="搜索"
      onVoicePress={() => Alert.alert('语音', '开始语音识别')}
      onSubmit={(text: string) => Alert.alert('搜索', \`搜索: \${text}\`)}
    />
  );
}`}
          preview={
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 bg-white px-4 py-2.5 rounded-full">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-gray-400 text-sm flex-1">语音搜索试试</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">搜索</button>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 自定义左右侧 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义左右侧</h2>
        <CodeExample
          title="返回按钮和取消按钮"
          description="使用 leftExtra 和 rightExtra 自定义搜索栏两侧内容"
          language="tsx"
          code={`import { DbSearchBar, DbIcon } from 'db-rn-ui';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SearchBarWithExtras() {
  const navigation = useNavigation();

  return (
    <DbSearchBar
      placeholder="搜索"
      leftExtra={
        <DbIcon name="arrow-back" family="Ionicons" size={20} color="#333" />
      }
      onLeftExtraPress={() => navigation.goBack()}
      rightExtra={
        <Text style={{ fontSize: 14, color: '#007AFF' }}>取消</Text>
      }
      onRightExtraPress={() => console.log('取消')}
    />
  );
}`}
          preview={
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div className="flex-1 flex items-center gap-2 bg-white px-4 py-2.5 rounded-full">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-gray-400 text-sm flex-1">搜索</span>
                </div>
                <span className="text-blue-500 text-sm">取消</span>
              </div>
            </div>
          }
        />
      </section>

      {/* 禁用模式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">禁用模式</h2>
        <CodeExample
          title="只读点击模式"
          description="设置 disabled 为 true，点击搜索栏触发 onPress 事件，适用于跳转到搜索页面的场景"
          language="tsx"
          code={`import { DbSearchBar } from 'db-rn-ui';
import { Alert } from 'react-native';

export default function DisabledSearchBar() {
  return (
    <DbSearchBar
      placeholder="点击进入搜索页"
      disabled
      showCamera
      showScan
      onPress={() => Alert.alert('跳转', '跳转到搜索页')}
    />
  );
}`}
          preview={
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full cursor-pointer">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-gray-400 text-sm flex-1">点击进入搜索页</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
            </div>
          }
        />
      </section>

      {/* 自定义图标 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义图标</h2>
        <CodeExample
          title="使用 MaterialIcons 图标"
          description="通过 icons 属性自定义各个功能按钮的图标配置"
          language="tsx"
          code={`import { DbSearchBar } from 'db-rn-ui';
import { Alert } from 'react-native';

export default function CustomIconSearchBar() {
  return (
    <DbSearchBar
      placeholder="使用 MaterialIcons 图标"
      showCamera
      showScan
      showVoice
      icons={{
        search: { name: 'search', family: 'MaterialIcons', color: '#FF6B6B' },
        camera: { name: 'photo-camera', family: 'MaterialIcons' },
        scan: { name: 'qr-code-scanner', family: 'MaterialIcons' },
        voice: { name: 'keyboard-voice', family: 'MaterialIcons' },
      }}
      onCameraPress={() => Alert.alert('拍照')}
      onScanPress={() => Alert.alert('扫一扫')}
      onVoicePress={() => Alert.alert('语音')}
    />
  );
}`}
          preview={
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-gray-400 text-sm flex-1">使用 MaterialIcons 图标</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
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
                { prop: 'value', desc: '搜索框的值（受控）', type: 'string', def: '-' },
                { prop: 'defaultValue', desc: '默认值（非受控）', type: 'string', def: '-' },
                { prop: 'placeholder', desc: '占位提示文字', type: 'string', def: "'搜索'" },
                { prop: 'onChangeText', desc: '文本变化回调', type: '(text: string) => void', def: '-' },
                { prop: 'onSubmit', desc: '提交搜索回调', type: '(text: string) => void', def: '-' },
                { prop: 'onPress', desc: '点击搜索框回调（disabled 时有效）', type: '() => void', def: '-' },
                { prop: 'onFocus', desc: '聚焦回调', type: '() => void', def: '-' },
                { prop: 'onBlur', desc: '失焦回调', type: '() => void', def: '-' },
                { prop: 'onClear', desc: '清空回调', type: '() => void', def: '-' },
                { prop: 'showCamera', desc: '是否显示拍照按钮', type: 'boolean', def: 'false' },
                { prop: 'onCameraPress', desc: '拍照按钮点击回调', type: '() => void', def: '-' },
                { prop: 'showScan', desc: '是否显示扫一扫按钮', type: 'boolean', def: 'false' },
                { prop: 'onScanPress', desc: '扫一扫按钮点击回调', type: '() => void', def: '-' },
                { prop: 'showVoice', desc: '是否显示语音按钮', type: 'boolean', def: 'false' },
                { prop: 'onVoicePress', desc: '语音按钮点击回调', type: '() => void', def: '-' },
                { prop: 'showClear', desc: '是否显示清除按钮', type: 'boolean', def: 'true' },
                { prop: 'showSearchButton', desc: '是否显示搜索按钮', type: 'boolean', def: 'false' },
                { prop: 'searchButtonText', desc: '搜索按钮文字', type: 'string', def: "'搜索'" },
                { prop: 'leftExtra', desc: '左侧额外内容', type: 'ReactNode', def: '-' },
                { prop: 'onLeftExtraPress', desc: '左侧额外内容点击回调', type: '() => void', def: '-' },
                { prop: 'rightExtra', desc: '右侧额外内容', type: 'ReactNode', def: '-' },
                { prop: 'onRightExtraPress', desc: '右侧额外内容点击回调', type: '() => void', def: '-' },
                { prop: 'disabled', desc: '是否禁用输入', type: 'boolean', def: 'false' },
                { prop: 'shape', desc: '搜索框形状', type: "'round' | 'square'", def: "'round'" },
                { prop: 'icons', desc: '自定义图标配置', type: 'SearchBarIconsConfig', def: '-' },
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

      {/* SearchBarIconsConfig 说明 */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">SearchBarIconsConfig 图标配置</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">属性</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { prop: 'search', desc: '搜索图标配置', type: 'SearchBarIconConfig' },
                { prop: 'clear', desc: '清除图标配置', type: 'SearchBarIconConfig' },
                { prop: 'camera', desc: '拍照图标配置', type: 'SearchBarIconConfig' },
                { prop: 'scan', desc: '扫一扫图标配置', type: 'SearchBarIconConfig' },
                { prop: 'voice', desc: '语音图标配置', type: 'SearchBarIconConfig' },
              ].map((item) => (
                <tr key={item.prop}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{item.prop}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                  <td className="px-6 py-4 text-sm text-purple-600">{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
