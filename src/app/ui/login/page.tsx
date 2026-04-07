'use client';
import React from 'react';
import CodeExample from '@/components/CodeExample';

export default function LoginPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">LoginPage 登录页面</h1>
        <p className="text-lg text-gray-600">
          完整的登录业务组件，支持账号密码登录、手机号一键登录、短信验证码登录以及第三方登录，提供丰富的自定义配置选项。
        </p>
      </section>

      {/* 功能特性 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">功能特性</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>账号密码登录 - 传统的用户名/邮箱 + 密码方式</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>手机号一键登录 - 基于运营商认证的快速登录</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>短信验证码登录 - 手机号 + 短信验证码登录</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>第三方登录 - 支持微信、支付宝、QQ、微博等平台</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>用户协议和隐私政策 - 可配置的协议勾选</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="最简单的登录页面"
          description="只需提供登录回调函数即可快速创建一个登录页面"
          language="tsx"
          code={`import { DbLoginPage } from 'db-rn-ui';
import { Alert } from 'react-native';

export default function SimpleLogin() {
  const handleAccountLogin = async (data: { account: string; password: string }) => {
    // 调用登录 API
    const result = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      return { success: false, message: result.message };
    }
  };

  return (
    <DbLoginPage
      appName="我的应用"
      onAccountLogin={handleAccountLogin}
    />
  );
}`}
          preview={
            <div className="w-full max-w-md mx-auto">
              <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-200 transition-transform hover:scale-105 cursor-pointer">
                    A
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">我的应用</h3>
                  <p className="text-sm text-gray-500 mt-2">欢迎登录</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-300 rounded-xl px-4 py-3.5 transition-all hover:border-blue-400 hover:shadow-md cursor-text">
                    <span className="text-gray-400 text-sm">账号/邮箱/手机号</span>
                  </div>
                  <div className="bg-white border border-gray-300 rounded-xl px-4 py-3.5 transition-all hover:border-blue-400 hover:shadow-md cursor-text">
                    <span className="text-gray-400 text-sm">密码</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95">
                    登录
                  </button>
                </div>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 多种登录方式 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">多种登录方式</h2>
        <CodeExample
          title="启用所有登录方式"
          description="同时启用账号密码、短信验证码和第三方登录"
          language="tsx"
          code={`import { DbLoginPage } from 'db-rn-ui';
import { Alert } from 'react-native';

export default function FullFeatureLogin() {
  return (
    <DbLoginPage
      appName="电商平台"
      title="欢迎回来"
      subtitle="登录后享受更多优惠"
      // 启用所有登录方式
      enableAccountLogin={true}
      enableSmsLogin={true}
      enableThirdPartyLogin={true}
      // 登录回调
      onAccountLogin={async ({ account, password }) => {
        // 账号密码登录逻辑
        return { success: true };
      }}
      onSmsLogin={async ({ phone, code }) => {
        // 短信验证码登录逻辑
        return { success: true };
      }}
      onSendCode={async (phone) => {
        // 发送验证码
        const success = await sendSmsCode(phone);
        return success;
      }}
      // 第三方登录
      thirdPartyLogins={[
        {
          platform: 'wechat',
          title: '微信登录',
          onPress: () => handleWechatLogin(),
        },
        {
          platform: 'alipay',
          title: '支付宝登录',
          onPress: () => handleAlipayLogin(),
        },
      ]}
      thirdPartyTitle="其他登录方式"
    />
  );
}`}
          preview={
            <div className="w-full max-w-md mx-auto">
              <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">电商平台</h3>
                  <p className="text-sm text-gray-500 mt-1">欢迎回来</p>
                  <p className="text-xs text-gray-400 mt-1">登录后享受更多优惠</p>
                </div>
                <div className="flex gap-6 border-b border-gray-200 mb-6">
                  <span className="pb-3 border-b-2 border-blue-500 text-blue-500 font-medium cursor-pointer transition-colors">账号密码</span>
                  <span className="pb-3 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">短信验证码</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-300 rounded-xl px-4 py-3.5 transition-all hover:border-blue-400 hover:shadow-md cursor-text">
                    <span className="text-gray-400 text-sm">账号/邮箱/手机号</span>
                  </div>
                  <div className="bg-white border border-gray-300 rounded-xl px-4 py-3.5 transition-all hover:border-blue-400 hover:shadow-md cursor-text">
                    <span className="text-gray-400 text-sm">密码</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95">
                    登录
                  </button>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-500 mb-4">其他登录方式</p>
                  <div className="flex justify-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-lg shadow-green-200 transition-transform hover:scale-110 cursor-pointer active:scale-95">微信</div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-lg shadow-blue-200 transition-transform hover:scale-110 cursor-pointer active:scale-95">支付宝</div>
                  </div>
                </div>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 自定义头部 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">自定义头部</h2>
        <CodeExample
          title="自定义 Logo 和标题"
          description="通过 logoSource 和 renderHeader 自定义页面头部"
          language="tsx"
          code={`import { DbLoginPage } from 'db-rn-ui';
import { Image, View, Text } from 'react-native';

export default function CustomHeaderLogin() {
  return (
    <DbLoginPage
      showLogo={true}
      logoSource={require('./assets/logo.png')}
      appName=""
      title=""
      subtitle=""
      renderHeader={() => (
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Image
            source={require('./assets/logo.png')}
            style={{ width: 100, height: 100, borderRadius: 20 }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 16 }}>
            欢迎回来
          </Text>
          <Text style={{ fontSize: 14, color: '#999', marginTop: 8 }}>
            登录以继续使用
          </Text>
        </View>
      )}
      onAccountLogin={handleLogin}
    />
  );
}`}
          preview={
            <div className="w-full max-w-md mx-auto">
              <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl mx-auto mb-5 flex items-center justify-center text-white text-3xl font-bold shadow-xl transition-transform hover:scale-105 cursor-pointer">
                    Logo
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">欢迎回来</h3>
                  <p className="text-sm text-gray-500 mt-2">登录以继续使用</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-300 rounded-xl px-4 py-3.5 transition-all hover:border-blue-400 hover:shadow-md cursor-text">
                    <span className="text-gray-400 text-sm">账号</span>
                  </div>
                  <div className="bg-white border border-gray-300 rounded-xl px-4 py-3.5 transition-all hover:border-blue-400 hover:shadow-md cursor-text">
                    <span className="text-gray-400 text-sm">密码</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:from-blue-600 hover:to-purple-700 active:scale-95">
                    登录
                  </button>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* 协议和隐私 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">用户协议</h2>
        <CodeExample
          title="配置用户协议和隐私政策"
          description="启用协议勾选，用户必须同意协议才能登录"
          language="tsx"
          code={`import { DbLoginPage } from 'db-rn-ui';

export default function AgreementLogin() {
  return (
    <DbLoginPage
      appName="我的应用"
      requireAgreement={true}
      onUserAgreement={() => {
        // 跳转到用户协议页面
        navigation.navigate('UserAgreement');
      }}
      onPrivacyPolicy={() => {
        // 跳转到隐私政策页面
        navigation.navigate('PrivacyPolicy');
      }}
      onAccountLogin={handleLogin}
    />
  );
}`}
          preview={
            <div className="w-full max-w-md mx-auto">
              <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800">我的应用</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-300 rounded-xl px-4 py-3.5 transition-all hover:border-blue-400 hover:shadow-md cursor-text">
                    <span className="text-gray-400 text-sm">账号</span>
                  </div>
                  <div className="bg-white border border-gray-300 rounded-xl px-4 py-3.5 transition-all hover:border-blue-400 hover:shadow-md cursor-text">
                    <span className="text-gray-400 text-sm">密码</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95">
                    登录
                  </button>
                </div>
                <div className="mt-6 flex items-center gap-3 justify-center">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer transition-colors hover:border-blue-400"></div>
                  <span className="text-sm text-gray-500">
                    我已阅读并同意
                    <span className="text-blue-500 cursor-pointer hover:underline">《用户协议》</span>
                    和
                    <span className="text-blue-500 cursor-pointer hover:underline">《隐私政策》</span>
                  </span>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* 注册和忘记密码 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">注册和忘记密码</h2>
        <CodeExample
          title="显示注册和忘记密码链接"
          description="启用 showRegisterLink 和 showForgotPassword 显示相关链接"
          language="tsx"
          code={`import { DbLoginPage } from 'db-rn-ui';

export default function LoginWithLinks() {
  return (
    <DbLoginPage
      appName="我的应用"
      showRegisterLink={true}
      showForgotPassword={true}
      onRegister={() => {
        navigation.navigate('Register');
      }}
      onForgotPassword={() => {
        navigation.navigate('ForgotPassword');
      }}
      onAccountLogin={handleLogin}
    />
  );
}`}
          preview={
            <div className="w-full max-w-md mx-auto">
              <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800">我的应用</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white border border-gray-300 rounded-xl px-4 py-3.5 transition-all hover:border-blue-400 hover:shadow-md cursor-text">
                    <span className="text-gray-400 text-sm">账号</span>
                  </div>
                  <div className="bg-white border border-gray-300 rounded-xl px-4 py-3.5 transition-all hover:border-blue-400 hover:shadow-md cursor-text">
                    <span className="text-gray-400 text-sm">密码</span>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-sm text-blue-500 cursor-pointer hover:underline transition-colors">忘记密码？</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-95">
                    登录
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <span className="text-sm text-gray-500">
                    还没有账号？<span className="text-blue-500 cursor-pointer hover:underline transition-colors">立即注册</span>
                  </span>
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* API 说明表格 - DbLoginPage */}
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
                { prop: 'showLogo', desc: '是否显示 Logo', type: 'boolean', def: 'true' },
                { prop: 'logoSource', desc: 'Logo 图片源', type: 'ImageSourcePropType', def: '-' },
                { prop: 'appName', desc: '应用名称', type: 'string', def: '-' },
                { prop: 'title', desc: '欢迎标题', type: 'string', def: "'欢迎登录'" },
                { prop: 'subtitle', desc: '副标题', type: 'string', def: '-' },
                { prop: 'enableAccountLogin', desc: '是否启用账号密码登录', type: 'boolean', def: 'true' },
                { prop: 'enablePhoneLogin', desc: '是否启用手机号一键登录', type: 'boolean', def: 'false' },
                { prop: 'enableSmsLogin', desc: '是否启用短信验证码登录', type: 'boolean', def: 'false' },
                { prop: 'enableThirdPartyLogin', desc: '是否启用第三方登录', type: 'boolean', def: 'false' },
                { prop: 'showRegisterLink', desc: '是否显示注册链接', type: 'boolean', def: 'false' },
                { prop: 'showForgotPassword', desc: '是否显示忘记密码', type: 'boolean', def: 'true' },
                { prop: 'defaultLoginType', desc: '默认登录方式', type: "'account' | 'phone' | 'sms'", def: "'account'" },
                { prop: 'accountPlaceholder', desc: '账号输入框占位文字', type: 'string', def: "'账号/邮箱/手机号'" },
                { prop: 'passwordPlaceholder', desc: '密码输入框占位文字', type: 'string', def: "'密码'" },
                { prop: 'phonePlaceholder', desc: '手机号输入框占位文字', type: 'string', def: "'手机号'" },
                { prop: 'codePlaceholder', desc: '验证码输入框占位文字', type: 'string', def: "'验证码'" },
                { prop: 'loginButtonText', desc: '登录按钮文字', type: 'string', def: "'登录'" },
                { prop: 'thirdPartyLogins', desc: '第三方登录配置', type: 'ThirdPartyLoginConfig[]', def: '-' },
                { prop: 'thirdPartyTitle', desc: '第三方登录标题', type: 'string', def: "'其他登录方式'" },
                { prop: 'onAccountLogin', desc: '账号密码登录回调', type: '(data: AccountLoginData) => Promise<LoginResult>', def: '-' },
                { prop: 'onPhoneLogin', desc: '手机号一键登录回调', type: '(data: PhoneLoginData) => Promise<LoginResult>', def: '-' },
                { prop: 'onSmsLogin', desc: '短信验证码登录回调', type: '(data: PhoneLoginData) => Promise<LoginResult>', def: '-' },
                { prop: 'onSendCode', desc: '发送验证码回调', type: '(phone: string) => Promise<boolean>', def: '-' },
                { prop: 'onRegister', desc: '点击注册回调', type: '() => void', def: '-' },
                { prop: 'onForgotPassword', desc: '点击忘记密码回调', type: '() => void', def: '-' },
                { prop: 'onUserAgreement', desc: '点击用户协议回调', type: '() => void', def: '-' },
                { prop: 'onPrivacyPolicy', desc: '点击隐私政策回调', type: '() => void', def: '-' },
                { prop: 'requireAgreement', desc: '是否必须勾选协议才能登录', type: 'boolean', def: 'false' },
                { prop: 'codeCountdown', desc: '验证码倒计时时间（秒）', type: 'number', def: '60' },
                { prop: 'showPasswordStrength', desc: '是否显示密码强度', type: 'boolean', def: 'false' },
                { prop: 'primaryColor', desc: '主色调', type: 'string', def: "'#FF2442'" },
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

      {/* 类型定义说明 */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">类型定义</h2>
        
        <h3 className="text-lg font-medium text-gray-700">ThirdPartyLoginConfig</h3>
        <div className="overflow-x-auto mb-6">
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
                { prop: 'platform', desc: '第三方平台', type: "'wechat' | 'alipay' | 'qq' | 'weibo'" },
                { prop: 'icon', desc: '图标名称', type: 'string' },
                { prop: 'iconFamily', desc: '图标库', type: 'string' },
                { prop: 'title', desc: '显示标题', type: 'string' },
                { prop: 'onPress', desc: '点击回调', type: '() => void' },
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

        <h3 className="text-lg font-medium text-gray-700">LoginResult</h3>
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
                { prop: 'success', desc: '是否登录成功', type: 'boolean' },
                { prop: 'data', desc: '登录成功返回的数据', type: 'any' },
                { prop: 'message', desc: '错误信息', type: 'string' },
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
