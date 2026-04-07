'use client';
import React from 'react';
import CodeExample from '@/components/CodeExample';

// SVG 图标组件用于文档展示
const IconPreview = ({ name, family, color = '#333', size = 24 }: { name: string; family: string; color?: string; size?: number }) => {
  // 使用 SVG 模拟不同图标库的图标
  const icons: Record<string, Record<string, JSX.Element>> = {
    Ionicons: {
      'home': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M416 174.74V48h-80v58.45L256 32 0 272h64v208h144v-128h96v128h144V272h64z"/></svg>,
      'search': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M456.69 421.39L362.6 327.3c19.1-26.91 30.49-59.21 30.49-93.72C393.09 145.55 310.16 64 207.55 64S22 145.55 22 246.58c0 101.03 82.93 183.58 185.55 183.58 34.5 0 66.81-11.4 93.72-30.49l94.09 94.09a25 25 0 0035.3 0l25.93-25.94a25 25 0 000-35.33zM207.55 352.18c-58.14 0-105.57-47-105.57-105.6s47.43-105.6 105.57-105.6c58.14 0 105.57 47 105.57 105.6s-47.43 105.6-105.57 105.6z"/></svg>,
      'heart': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M352 56h-48c-26.51 0-48 21.49-48 48v12.88l-24-24-88 88L96 200l-8 8v192c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V104c0-26.51-21.49-48-48-48z"/></svg>,
      'star': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"/></svg>,
      'person': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M256 256c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0 48c-64 0-192 32-192 96v48h384v-48c0-64-128-96-192-96z"/></svg>,
      'arrow-back': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M401 137l-23-23L160 332 96 268l-23 23 87 87 23 23 23-23 201-201z"/></svg>,
      'close': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm101 259l-59 59-42-42-42 42-59-59 42-42-42-42 59-59 42 42 42-42 59 59-42 42 42 42z"/></svg>,
      'checkmark': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M186.3 339.9l-53.7-53.7L80 338.8l106.3 106.3 245.7-245.7-52.7-52.7z"/></svg>,
      'add': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm128 217h-97v97h-62v-97h-97v-62h97v-97h62v97h97v62z"/></svg>,
      'trash': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M128 405.43V232.57c0-15.83 12.47-28.57 27.86-28.57h200.28c15.39 0 27.86 12.74 27.86 28.57v172.86c0 15.83-12.47 28.57-27.86 28.57H155.86c-15.39 0-27.86-12.74-27.86-28.57zm47.79-244.8V99.36C175.79 81.48 190.27 67 208.15 67h95.7c17.88 0 32.36 14.48 32.36 32.36v61.27l74.87 2.42v32H100.92v-32l74.87-2.42z"/></svg>,
    },
    FontAwesome: {
      'home': <svg viewBox="0 0 576 512" fill={color} style={{ width: size, height: size }}><path d="M280.37 148.26L96 300.11V464a16 16 0 0016 16l112.06-.29a16 16 0 0015.92-16V368a16 16 0 0116-16h64a16 16 0 0116 16v95.64a16 16 0 0016 16.05L464 480a16 16 0 0016-16V300L295.67 148.26a12.19 12.19 0 00-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 00-12-12h-56a12 12 0 00-12 12v72.61L318.85 15.37a48 48 0 00-61.7 0L4.34 251.47a12 12 0 007.85 20.65l39.12 2.87a12 12 0 0011.59-6.2l19.86-32.66a48 48 0 0139-22.41l140.63 2.72 140.63-2.72a48 48 0 0139 22.41l19.86 32.66a12 12 0 0011.59 6.2l39.12-2.87a12 12 0 007.85-20.65z"/></svg>,
      'search': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>,
      'heart': <svg viewBox="0 0 512 512" fill={color} style={{ width: size, height: size }}><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>,
      'star': <svg viewBox="0 0 576 512" fill={color} style={{ width: size, height: size }}><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>,
      'user': <svg viewBox="0 0 448 512" fill={color} style={{ width: size, height: size }}><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>,
    },
    MaterialIcons: {
      'home': <svg viewBox="0 0 24 24" fill={color} style={{ width: size, height: size }}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
      'search': <svg viewBox="0 0 24 24" fill={color} style={{ width: size, height: size }}><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>,
      'favorite': <svg viewBox="0 0 24 24" fill={color} style={{ width: size, height: size }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
      'star': <svg viewBox="0 0 24 24" fill={color} style={{ width: size, height: size }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>,
      'person': <svg viewBox="0 0 24 24" fill={color} style={{ width: size, height: size }}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
      'settings': <svg viewBox="0 0 24 24" fill={color} style={{ width: size, height: size }}><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 00-.59.22L4.1 8.87a.49.49 0 00.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>,
    },
    Entypo: {
      'home': <svg viewBox="0 0 20 20" fill={color} style={{ width: size, height: size }}><path d="M19 8h-3.26A11.93 11.93 0 0010 2.65V0H8v2.09A11.62 11.62 0 001.67 8H0v2h1.3A12.29 12.29 0 000 15v5h20v-5a12.29 12.29 0 00-1.3-5H20V8z"/></svg>,
      'magnifying-glass': <svg viewBox="0 0 20 20" fill={color} style={{ width: size, height: size }}><path d="M17.59 15.4l-3.67-3.66A6.84 6.84 0 0016 7.67 6.87 6.87 0 009.12.8a6.87 6.87 0 00-6.88 6.87 6.87 6.87 0 006.88 6.88 6.84 6.84 0 004.07-1.34l3.66 3.67L17.59 15.4zM2.5 7.67a6.63 6.63 0 016.62-6.62 6.63 6.63 0 016.63 6.62 6.63 6.63 0 01-6.63 6.63A6.63 6.63 0 012.5 7.67z"/></svg>,
      'heart': <svg viewBox="0 0 20 20" fill={color} style={{ width: size, height: size }}><path d="M10 18.2l-1.4-1.3C3.5 12.2 0 9.1 0 5.3 0 2.4 2.4 0 5.3 0c1.6 0 3.2.8 4.1 2.1.4.6.7 1.3.9 2h.4c.2-.7.5-1.4.9-2C12.5.8 14.1 0 15.7 0c2.9 0 5.3 2.4 5.3 5.3 0 3.8-3.5 6.9-8.6 11.6L10 18.2z"/></svg>,
      'star': <svg viewBox="0 0 20 20" fill={color} style={{ width: size, height: size }}><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>,
      'user': <svg viewBox="0 0 20 20" fill={color} style={{ width: size, height: size }}><path d="M10 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
    },
    AntDesign: {
      'home': <svg viewBox="0 0 1024 1024" fill={color} style={{ width: size, height: size }}><path d="M946.5 505L534.6 93.1a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V848c0 17.7 14.3 32 32 32h168.3c17.7 0 32-14.3 32-32V768h58.9v80c0 17.7 14.3 32 32 32H723c17.7 0 32-14.3 32-32v-96h43.4c35.3 0 64-28.7 64-64 0-17-6.8-33.3-18.8-45.3z"/></svg>,
      'search': <svg viewBox="0 0 1024 1024" fill={color} style={{ width: size, height: size }}><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62.2l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"/></svg>,
      'heart': <svg viewBox="0 0 1024 1024" fill={color} style={{ width: size, height: size }}><path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"/></svg>,
      'star': <svg viewBox="0 0 1024 1024" fill={color} style={{ width: size, height: size }}><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L569.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3-12.3 12.7-12.1 32.9.6 45.3l183.7 179.1-43.4 252.9c-1.2 6.9-.1 14.1 3.2 20.3 8.2 15.6 27.6 21.7 43.2 13.4L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"/></svg>,
      'user': <svg viewBox="0 0 1024 1024" fill={color} style={{ width: size, height: size }}><path d="M858.5 763.6a374 374 0 00-80.8-63.5 375.63 375.63 0 00-64.6-29.7 332.16 332.16 0 01101.1-125.6 332.56 332.56 0 01100.8-60.1 332.16 332.16 0 01-30.4-123.4c0-184.3-149.5-333.8-333.8-333.8S199.8 156.8 199.8 341.1c0 43.1 8.2 84.1 23.1 121.6a332.56 332.56 0 01-30.4 123.4 332.16 332.16 0 01100.8 60.1 375.63 375.63 0 00-64.6 29.7 374 374 0 00-80.8 63.5C90.5 801.9 80.7 835.9 80.7 869.9c0 17.7 14.3 32 32 32h800c17.7 0 32-14.3 32-32 0-34-9.8-68-28.2-106.3z"/></svg>,
    },
  };

  const iconSet = icons[family] || icons.Ionicons;
  return iconSet[name] || <span style={{ fontSize: size / 2 }}>{name}</span>;
};

export default function IconPage() {
  const iconFamilies = [
    { name: 'Ionicons', desc: 'Ionic 框架图标库，现代简洁风格' },
    { name: 'FontAwesome', desc: '最流行的图标库之一，丰富的图标资源' },
    { name: 'MaterialIcons', desc: 'Google Material Design 风格图标' },
    { name: 'Entypo', desc: 'Entypo 图标库，优雅精致' },
    { name: 'AntDesign', desc: '蚂蚁设计图标库，适合中后台产品' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* 标题和描述 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Icon 图标</h1>
        <p className="text-lg text-gray-600">
          支持多图标库的图标组件，统一封装 Ionicons、FontAwesome、MaterialIcons、Entypo、AntDesign 五大图标库，提供一致的 API 使用体验。
        </p>
      </section>

      {/* 支持的图标库 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">支持的图标库</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {iconFamilies.map((family) => (
            <div key={family.name} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="font-semibold text-gray-800 mb-1">{family.name}</div>
              <div className="text-sm text-gray-500">{family.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">基础用法</h2>
        <CodeExample
          title="使用不同图标库"
          description="通过 family 属性切换不同的图标库，默认使用 Ionicons"
          language="tsx"
          code={`import { DbIcon } from 'db-rn-ui';

export default function BasicIcons() {
  return (
    <>
      {/* Ionicons - 默认 */}
      <DbIcon name="home" size={24} color="#333" />
      
      {/* FontAwesome */}
      <DbIcon name="home" family="FontAwesome" size={24} color="#333" />
      
      {/* MaterialIcons */}
      <DbIcon name="home" family="MaterialIcons" size={24} color="#333" />
      
      {/* Entypo */}
      <DbIcon name="home" family="Entypo" size={24} color="#333" />
      
      {/* AntDesign */}
      <DbIcon name="home" family="AntDesign" size={24} color="#333" />
    </>
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-5 gap-6 items-center justify-items-center">
                  {['Ionicons', 'FontAwesome', 'MaterialIcons', 'Entypo', 'AntDesign'].map((family) => (
                    <div key={family} className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-gray-50 rounded-xl transition-all hover:bg-gray-100 hover:scale-110 cursor-pointer">
                        <IconPreview name="home" family={family} size={28} color="#333" />
                      </div>
                      <span className="text-xs text-gray-500">{family}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 图标尺寸 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">图标尺寸</h2>
        <CodeExample
          title="不同尺寸的图标"
          description="通过 size 属性设置图标大小，默认 24"
          language="tsx"
          code={`import { DbIcon } from 'db-rn-ui';

export default function IconSizes() {
  return (
    <>
      <DbIcon name="heart" size={16} color="#FF2442" />
      <DbIcon name="heart" size={24} color="#FF2442" />
      <DbIcon name="heart" size={32} color="#FF2442" />
      <DbIcon name="heart" size={48} color="#FF2442" />
    </>
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-center gap-8">
                  {[16, 24, 32, 48].map((size) => (
                    <div key={size} className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-red-50 rounded-xl transition-all hover:bg-red-100 hover:scale-110 cursor-pointer">
                        <IconPreview name="heart" family="Ionicons" size={size} color="#FF2442" />
                      </div>
                      <span className="text-xs text-gray-500">{size}px</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 图标颜色 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">图标颜色</h2>
        <CodeExample
          title="自定义颜色"
          description="通过 color 属性设置图标颜色"
          language="tsx"
          code={`import { DbIcon } from 'db-rn-ui';

export default function IconColors() {
  return (
    <>
      <DbIcon name="star" size={32} color="#FFD700" />
      <DbIcon name="star" size={32} color="#FF6B6B" />
      <DbIcon name="star" size={32} color="#4ECDC4" />
      <DbIcon name="star" size={32} color="#45B7D1" />
      <DbIcon name="star" size={32} color="#96CEB4" />
    </>
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-center gap-6">
                  {[
                    { color: '#FFD700', name: '金色' },
                    { color: '#FF6B6B', name: '红色' },
                    { color: '#4ECDC4', name: '青色' },
                    { color: '#45B7D1', name: '蓝色' },
                    { color: '#96CEB4', name: '绿色' },
                  ].map(({ color, name }) => (
                    <div key={color} className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-gray-50 rounded-xl transition-all hover:scale-110 cursor-pointer" style={{ backgroundColor: `${color}20` }}>
                        <IconPreview name="star" family="Ionicons" size={32} color={color} />
                      </div>
                      <span className="text-xs text-gray-500">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 常用图标 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">常用图标</h2>
        <CodeExample
          title="Ionicons 常用图标"
          description="以下为 Ionicons 常用图标示例"
          language="tsx"
          code={`import { DbIcon } from 'db-rn-ui';

export default function CommonIcons() {
  return (
    <>
      <DbIcon name="home" size={24} color="#333" />
      <DbIcon name="search" size={24} color="#333" />
      <DbIcon name="heart" size={24} color="#FF2442" />
      <DbIcon name="star" size={24} color="#FFD700" />
      <DbIcon name="person" size={24} color="#333" />
      <DbIcon name="arrow-back" size={24} color="#333" />
      <DbIcon name="close" size={24} color="#333" />
      <DbIcon name="add" size={24} color="#333" />
      <DbIcon name="trash" size={24} color="#FF2442" />
      <DbIcon name="checkmark" size={24} color="#00C853" />
    </>
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-5 gap-4">
                  {[
                    { name: 'home', label: '首页' },
                    { name: 'search', label: '搜索' },
                    { name: 'heart', label: '收藏', color: '#FF2442' },
                    { name: 'star', label: '评分', color: '#FFD700' },
                    { name: 'person', label: '个人' },
                    { name: 'arrow-back', label: '返回' },
                    { name: 'close', label: '关闭' },
                    { name: 'add', label: '添加' },
                    { name: 'trash', label: '删除', color: '#FF2442' },
                    { name: 'checkmark', label: '完成', color: '#00C853' },
                  ].map((icon) => (
                    <div key={icon.name} className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-gray-50 rounded-xl transition-all hover:bg-gray-100 hover:scale-110 cursor-pointer">
                        <IconPreview name={icon.name} family="Ionicons" size={24} color={icon.color || '#333'} />
                      </div>
                      <span className="text-xs text-gray-500">{icon.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
          defaultExpanded={true}
        />
      </section>

      {/* 点击事件 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">点击事件</h2>
        <CodeExample
          title="可点击的图标"
          description="通过 onPress 属性添加点击事件"
          language="tsx"
          code={`import { DbIcon } from 'db-rn-ui';
import { Alert } from 'react-native';

export default function ClickableIcon() {
  return (
    <DbIcon
      name="heart"
      size={32}
      color="#FF2442"
      onPress={() => Alert.alert('点击', '收藏按钮被点击')}
    />
  );
}`}
          preview={
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-center gap-8">
                  <button className="flex flex-col items-center gap-3 group">
                    <div className="p-4 bg-red-50 rounded-2xl transition-all group-hover:bg-red-100 group-hover:scale-110 group-active:scale-95">
                      <IconPreview name="heart" family="Ionicons" size={32} color="#FF2442" />
                    </div>
                    <span className="text-sm text-gray-600">点击收藏</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 group">
                    <div className="p-4 bg-blue-50 rounded-2xl transition-all group-hover:bg-blue-100 group-hover:scale-110 group-active:scale-95">
                      <IconPreview name="star" family="Ionicons" size={32} color="#FFD700" />
                    </div>
                    <span className="text-sm text-gray-600">点击评分</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 group">
                    <div className="p-4 bg-gray-50 rounded-2xl transition-all group-hover:bg-gray-100 group-hover:scale-110 group-active:scale-95">
                      <IconPreview name="trash" family="Ionicons" size={32} color="#666" />
                    </div>
                    <span className="text-sm text-gray-600">点击删除</span>
                  </button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">属性</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">默认值</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { prop: 'name', desc: '图标名称', type: 'string', def: '-' },
                { prop: 'family', desc: '图标库名称', type: "'Ionicons' | 'FontAwesome' | 'MaterialIcons' | 'Entypo' | 'AntDesign'", def: "'Ionicons'" },
                { prop: 'size', desc: '图标大小', type: 'number', def: '24' },
                { prop: 'color', desc: '图标颜色', type: 'string', def: "'#000'" },
                { prop: 'style', desc: '自定义样式', type: 'StyleProp<ViewStyle>', def: '-' },
                { prop: 'onPress', desc: '点击事件回调', type: '() => void', def: '-' },
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

      {/* 图标库链接 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">图标库文档</h2>
        <div className="bg-gray-50 p-6 rounded-xl">
          <p className="text-gray-600 mb-4">点击下方链接查看各图标库的完整图标列表：</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Ionicons', url: 'https://ionic.io/ionicons' },
              { name: 'FontAwesome', url: 'https://fontawesome.com/icons' },
              { name: 'MaterialIcons', url: 'https://fonts.google.com/icons' },
              { name: 'Entypo', url: 'http://www.entypo.com/' },
              { name: 'AntDesign', url: 'https://ant.design/components/icon/' },
            ].map((lib) => (
              <a
                key={lib.name}
                href={lib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {lib.name} 图标库
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
