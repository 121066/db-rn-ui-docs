export interface CodeExampleProps {
  /** 代码内容（必需） */
  code: string;
  /** 代码语言 */
  language?: 'jsx' | 'tsx' | 'javascript' | 'typescript' | 'json' | 'css' | 'html';
  /** 示例标题 */
  title?: string;
  /** 示例描述 */
  description?: string;
  /** 预览内容 */
  preview?: React.ReactNode;
  /** 默认展开状态 */
  defaultExpanded?: boolean;
  /** 自定义样式 */
  className?: string;
  /** 预览区域样式 */
  previewClassName?: string;
}
