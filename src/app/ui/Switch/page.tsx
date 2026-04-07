'use client';
import React, { useState } from 'react';
import CodeExample from '@/components/CodeExample';

// CSS 模拟的 Switch 组件
interface MockSwitchProps {
  value?: boolean;
  defaultValue?: boolean;
  disabled?: boolean;
  activeColor?: string;
  width?: number;
  height?: number;
  thumbSize?: number;
  onChange?: (value: boolean) => void;
}

const MockSwitch: React.FC<MockSwitchProps> = ({
  value,
  defaultValue = false,
  disabled = false,
  activeColor = '#34C759',
  width = 51,
  height = 31,
  thumbSize = 27,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isOn = value !== undefined ? value : internalValue;

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isOn;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={`relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: isOn ? activeColor : '#E5E5EA',
      }}
    >
      <span
        className="absolute bg-white rounded-full shadow-md transform transition-transform duration-200"
        style={{
          width: `${thumbSize}px`,
          height: `${thumbSize}px`,
          left: isOn ? `${width - thumbSize - 2}px` : '2px',
        }}
      />
    </button>
  );
};

export default function SwitchPage() {
  const [controlledValue, setControlledValue] = useState(true);
  const [settingEnabled, setSettingEnabled] = useState(false);

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Switch 开关</h1>
        <p className="text-lg text-gray-600">
          用于在开启和关闭状态之间切换的交互组件，支持受控和非受控两种模式，常用于设置项的开关。
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="非受控模式"
          description="通过 defaultValue 设置初始值，onChange 获取当前状态"
          language="tsx"
          code={`import { DbSwitch } from 'db-rn-ui';

export default function BasicSwitch() {
  const handleChange = (value: boolean) => {
    console.log('开关状态:', value);
  };

  return (
    <DbSwitch 
      defaultValue={true}
      onChange={handleChange}
    />
  );
}`}
          preview={
            <div className="flex items-center gap-4">
              <MockSwitch
                defaultValue={true}
                onChange={(val) => console.log('开关状态:', val)}
              />
              <span className="text-sm text-gray-600">默认开启</span>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 受控模式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">受控模式</h2>
        <CodeExample
          title="完全受控的开关"
          description="通过 value 和 onChange 完全控制开关状态"
          language="tsx"
          code={`import { DbSwitch } from 'db-rn-ui';
import { useState } from 'react';

export default function ControlledSwitch() {
  const [isOn, setIsOn] = useState(true);

  return (
    <View>
      <DbSwitch 
        value={isOn}
        onChange={setIsOn}
      />
      <Text>当前状态: {isOn ? '开启' : '关闭'}</Text>
    </View>
  );
}`}
          preview={
            <div className="flex items-center gap-4">
              <MockSwitch
                value={controlledValue}
                onChange={setControlledValue}
              />
              <span className="text-sm text-gray-600">
                当前状态: {controlledValue ? '开启' : '关闭'}
              </span>
            </div>
          }
        />
      </section>

      {/* 禁用状态 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">禁用状态</h2>
        <CodeExample
          title="开启和关闭状态的禁用"
          description="使用 disabled 属性禁用开关，不响应用户操作"
          language="tsx"
          code={`import { DbSwitch } from 'db-rn-ui';

export default function DisabledSwitch() {
  return (
    <View>
      {/* 开启状态禁用 */}
      <DbSwitch value={true} disabled />
      
      {/* 关闭状态禁用 */}
      <DbSwitch value={false} disabled />
    </View>
  );
}`}
          preview={
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MockSwitch value={true} disabled />
                <span className="text-sm text-gray-600">开启状态禁用</span>
              </div>
              <div className="flex items-center gap-4">
                <MockSwitch value={false} disabled />
                <span className="text-sm text-gray-600">关闭状态禁用</span>
              </div>
            </div>
          }
        />
      </section>

      {/* 自定义颜色 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义颜色</h2>
        <CodeExample
          title="不同的主题颜色"
          description="通过 activeColor 自定义开启状态的颜色"
          language="tsx"
          code={`import { DbSwitch } from 'db-rn-ui';

export default function ColorfulSwitch() {
  return (
    <View>
      {/* 绿色主题 */}
      <DbSwitch 
        defaultValue={true}
        activeColor="#34C759"
      />
      
      {/* 蓝色主题 */}
      <DbSwitch 
        defaultValue={true}
        activeColor="#007AFF"
      />
      
      {/* 橙色主题 */}
      <DbSwitch 
        defaultValue={true}
        activeColor="#FF9500"
      />
      
      {/* 红色主题 */}
      <DbSwitch 
        defaultValue={true}
        activeColor="#FF3B30"
      />
    </View>
  );
}`}
          preview={
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MockSwitch defaultValue={true} activeColor="#34C759" />
                <span className="text-sm text-gray-600">绿色主题</span>
              </div>
              <div className="flex items-center gap-4">
                <MockSwitch defaultValue={true} activeColor="#007AFF" />
                <span className="text-sm text-gray-600">蓝色主题</span>
              </div>
              <div className="flex items-center gap-4">
                <MockSwitch defaultValue={true} activeColor="#FF9500" />
                <span className="text-sm text-gray-600">橙色主题</span>
              </div>
              <div className="flex items-center gap-4">
                <MockSwitch defaultValue={true} activeColor="#FF3B30" />
                <span className="text-sm text-gray-600">红色主题</span>
              </div>
            </div>
          }
        />
      </section>

      {/* 自定义尺寸 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义尺寸</h2>
        <CodeExample
          title="不同大小的开关"
          description="通过 width、height、thumbSize 调整开关尺寸"
          language="tsx"
          code={`import { DbSwitch } from 'db-rn-ui';

export default function SizedSwitch() {
  return (
    <View>
      {/* 小尺寸 */}
      <DbSwitch 
        defaultValue={true}
        width={40}
        height={24}
        thumbSize={20}
      />
      
      {/* 中等尺寸（默认） */}
      <DbSwitch 
        defaultValue={true}
        width={51}
        height={31}
        thumbSize={27}
      />
      
      {/* 大尺寸 */}
      <DbSwitch 
        defaultValue={true}
        width={60}
        height={36}
        thumbSize={32}
      />
    </View>
  );
}`}
          preview={
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MockSwitch defaultValue={true} width={40} height={24} thumbSize={20} />
                <span className="text-sm text-gray-600">小尺寸 (40x24)</span>
              </div>
              <div className="flex items-center gap-4">
                <MockSwitch defaultValue={true} width={51} height={31} thumbSize={27} />
                <span className="text-sm text-gray-600">中等尺寸 (51x31)</span>
              </div>
              <div className="flex items-center gap-4">
                <MockSwitch defaultValue={true} width={60} height={36} thumbSize={32} />
                <span className="text-sm text-gray-600">大尺寸 (60x36)</span>
              </div>
            </div>
          }
        />
      </section>

      {/* 实际应用场景 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">实际应用场景</h2>
        <CodeExample
          title="设置项列表"
          description="在设置页面中使用开关控制功能开启/关闭"
          language="tsx"
          code={`import { DbSwitch } from 'db-rn-ui';
import { useState } from 'react';

export default function SettingList() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  return (
    <View>
      <View style={styles.settingItem}>
        <Text>推送通知</Text>
        <DbSwitch 
          value={pushEnabled}
          onChange={setPushEnabled}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text>声音提醒</Text>
        <DbSwitch 
          value={soundEnabled}
          onChange={setSoundEnabled}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text>振动反馈</Text>
        <DbSwitch 
          value={vibrationEnabled}
          onChange={setVibrationEnabled}
        />
      </View>
    </View>
  );
}`}
          preview={
            <div className="bg-white rounded-lg divide-y divide-gray-100">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-700">推送通知</span>
                <MockSwitch
                  value={settingEnabled}
                  onChange={setSettingEnabled}
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-700">声音提醒</span>
                <MockSwitch defaultValue={false} />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-700">振动反馈</span>
                <MockSwitch defaultValue={true} />
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
                { prop: 'value', desc: '受控模式下的开关状态', type: 'boolean', def: '-' },
                { prop: 'defaultValue', desc: '非受控模式下的初始状态', type: 'boolean', def: 'false' },
                { prop: 'disabled', desc: '是否禁用开关', type: 'boolean', def: 'false' },
                { prop: 'activeColor', desc: '开启状态的背景颜色', type: 'string', def: "'#34C759'" },
                { prop: 'inactiveColor', desc: '关闭状态的背景颜色', type: 'string', def: "'#E5E5EA'" },
                { prop: 'thumbColor', desc: '滑块的颜色', type: 'string', def: "'#FFFFFF'" },
                { prop: 'width', desc: '开关的宽度', type: 'number', def: '51' },
                { prop: 'height', desc: '开关的高度', type: 'number', def: '31' },
                { prop: 'thumbSize', desc: '滑块的大小', type: 'number', def: '27' },
                { prop: 'onChange', desc: '状态改变时的回调', type: '(value: boolean) => void', def: '-' },
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
            <li><strong>受控 vs 非受控：</strong>需要联动其他状态时用受控模式，简单场景用非受控</li>
            <li><strong>颜色选择：</strong>绿色表示成功/开启，建议使用系统默认颜色保持一致性</li>
            <li><strong>禁用状态：</strong>禁用的开关应配合说明文字，告知用户为何不可操作</li>
            <li><strong>响应反馈：</strong>开关切换建议添加触觉反馈（Haptics）提升体验</li>
            <li><strong>标签说明：</strong>开关旁边应有清晰的文字说明其控制的功能</li>
            <li><strong>即时生效：</strong>开关状态改变应立即生效，无需额外保存按钮</li>
          </ul>
        </div>
      </section>

      {/* 注意事项 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">注意事项</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ 重要提示</h3>
          <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
            <li>不要同时设置 <code className="px-1 py-0.5 bg-yellow-100 rounded text-xs">value</code> 和 <code className="px-1 py-0.5 bg-yellow-100 rounded text-xs">defaultValue</code>，优先使用 <code className="px-1 py-0.5 bg-yellow-100 rounded text-xs">value</code></li>
            <li>受控模式下必须提供 <code className="px-1 py-0.5 bg-yellow-100 rounded text-xs">onChange</code> 回调，否则无法切换状态</li>
            <li>避免在开关切换时执行耗时操作，应使用 loading 状态或延迟执行</li>
            <li>重要操作（如删除、清空）不应直接用开关，建议二次确认</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
