// 空模块 - 用于在 Web 环境中替代 React Native 专用包
// 这些包在 Web 环境下不需要，通过 webpack alias 指向此文件来避免解析错误

const EmptyComponent = () => null;

export default EmptyComponent;
export { EmptyComponent as LinearGradient };
