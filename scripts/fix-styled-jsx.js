#!/usr/bin/env node
/**
 * 修复 monorepo 中 styled-jsx 的 React 多实例冲突
 * 
 * 问题描述：
 *   - docs 项目使用 React 18 + Next.js 13
 *   - 根项目使用 React 19（用于 React Native 0.78）
 *   - styled-jsx 是 Next.js 的内置依赖，被 npm workspaces 提升到根 node_modules
 *   - styled-jsx 在服务端渲染时 require('react') 解析到根目录的 React 19
 *   - 但 docs 页面组件使用的是本地的 React 18，导致 useContext 多实例冲突
 * 
 * 解决方案：
 *   将 styled-jsx 复制到 docs 的 node_modules 中，使其 require('react') 
 *   按 Node.js 模块解析规则优先找到 docs 本地的 React 18
 */
const fs = require('fs');
const path = require('path');

const docsNodeModules = path.resolve(__dirname, '../node_modules');
const rootNodeModules = path.resolve(__dirname, '../../../node_modules');

const targetPath = path.join(docsNodeModules, 'styled-jsx');
const sourcePath = path.join(rootNodeModules, 'styled-jsx');

// 如果 docs 本地已经有 styled-jsx，跳过
if (fs.existsSync(targetPath)) {
    console.log('[fix-styled-jsx] styled-jsx already exists in docs/node_modules, skipping.');
    process.exit(0);
}

// 如果根目录没有 styled-jsx，跳过
if (!fs.existsSync(sourcePath)) {
    console.log('[fix-styled-jsx] styled-jsx not found in root node_modules, skipping.');
    process.exit(0);
}

// 复制 styled-jsx 到 docs 的 node_modules
function copyDirSync(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

try {
    copyDirSync(sourcePath, targetPath);
    console.log('[fix-styled-jsx] Copied styled-jsx to docs/node_modules successfully.');
} catch (err) {
    console.error('[fix-styled-jsx] Failed to copy styled-jsx:', err.message);
    process.exit(1);
}
