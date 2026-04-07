'use client';
import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { CodeExampleProps } from './CodeExample.types';

export const CodeExample: React.FC<CodeExampleProps> = ({
  code,
  language = 'tsx',
  title,
  description,
  preview,
  defaultExpanded = false,
  className = '',
  previewClassName = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await (navigator as any).clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* 标题和描述 */}
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-sm font-semibold text-gray-800">{title}</h3>}
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      )}

      {/* 预览区域 */}
      {preview && (
        <div className={`p-8 bg-white rounded-xl border border-gray-200 shadow-sm ${previewClassName}`}>
          <div className="w-full">
            {preview}
          </div>
        </div>
      )}

      {/* 代码区域 */}
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
        {/* 代码头部 - 语言标签和操作按钮 */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-xs font-mono text-gray-400 uppercase">{language}</span>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-xs font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              title="复制代码"
            >
              {copied ? '✓ 已复制' : '复制'}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1 text-xs font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              title={isExpanded ? '折叠代码' : '展开代码'}
            >
              {isExpanded ? '折叠' : '展开'}
            </button>
          </div>
        </div>

        {/* 代码内容 */}
        {isExpanded && (
          <Highlight theme={themes.nightOwl} code={code} language={language as any}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={`${className} px-4 py-3 overflow-x-auto text-sm`}
                style={style}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        )}

        {/* 代码折叠时的提示 */}
        {!isExpanded && (
          <div className="px-4 py-3 text-xs text-gray-400 italic">
            点击"展开"查看完整代码...
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeExample;
