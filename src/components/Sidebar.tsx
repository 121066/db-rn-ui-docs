'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
    {
        name: '首页',
        href: '/',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
        ),
    },
    {
        name: '开始使用',
        href: '/ui',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        name: '组件',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
        ),
        children: [
            {
                name:'Icon',
                href:'/ui/Icon',
                description:'Icon 图标'
            },
            {
                name: 'Button',
                href: '/ui/button',
                description: '按钮组件',
            },
            {
                name: 'Checkbox',
                href: '/ui/checkbox',
                description: '复选框组件',
            },
            {
                name: 'Radio',
                href: '/ui/radio',
                description: '单选框组件',
            },
            {
                name: 'Input',
                href: '/ui/input',
                description: '输入框组件',
            },
            {
                name: 'Card',
                href: '/ui/card',
                description: '卡片组件',
            },
            {
                name:'Loading',
                href:'/ui/Loading',
                description:'Loading 效果'
            },
            {
                name: 'Drawer',
                href: '/ui/drawer',
                description: '抽屉组件',
            },
            {
                name:'NavBar',
                href:'/ui/navbar',
                description:'导航'
            },
            {
                name:"ProductTtitle",
                href:'/ui/ProductTitle',
                description:'标题'
            },
            {
                name:'TitlePair',
                href:'/ui/TitlePair',
                description:"副标题"
            },
            {
                name:'ProductCard',
                href:'/ui/ProductCard',
                description:'商品卡片'
            },
            {
                name:'AmountDisplay',
                href:'/ui/AmountDisplay',
                description:''
            },
            {
                name:'Swiper',
                href:'/ui/Swiper',
                description:'轮播图'
            },
            {
                name:'Toast',
                href:'/ui/Toast',
                description:"Toast 提示"
            },
            {
                name:"Tab",
                href:'/ui/Tab',
                description:"Tab栏"
            },
            {
                name:"Login",
                href:'/ui/login',
                description:"登录页"
            },
            {
                name:"SearchBar",
                href:'/ui/SearchBar',
                description:"搜索栏"
            },
            {
                name:'Tag',
                href:'/ui/Tag',
                description:"Tag 标签"
            },
            {
                name:"Popup",
                href:'/ui/Popup',
                description:'Popup 弹出层'
            },
            {
                name:'PopupField',
                href:'/ui/PopupField',
                description:'弹窗表单字段'
            },
            {
                name:"InfiniteList",
                href:'/ui/InfiniteList',
                description:'列表滚动'
            },
            {
                name:'GridMenu',
                href:'/ui/GridMenu',
                description:"GridMenu 宫格菜单"
            },
            {
                name:"OrderBar",
                href:'/ui/OrderBar',
                description:"OrderBar 订单栏"
            },
            {
                name:"TrendArrow",
                href:'/ui/TrendArrow',
                description:"TrendArrow 趋势箭头"
            },
            {
                name:"Switch",
                href:'/ui/Switch',
                description:"Switch 开关"
            },
            {
                name:'SearchHistory',
                href:'/ui/SearchHistory',
                description:'搜索历史'
            },
            {
                name:'SelectionButton',
                href:'/ui/SelectionButton',
                description:'选择按钮'
            },
            {
                name:'Sku',
                href:'/ui/Sku',
                description:'SKU'
            }
        ],
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-72 bg-white border-r border-gray-200 h-screen flex flex-col">
            {/* Logo 区域 */}
            <div className="p-2 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <img className="rounded  brightness-100" src="/images/logo.png" alt="logo" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">db-rn-ui</h2>
                        <p className="text-xs text-gray-500">组件库</p>
                    </div>
                </div>
            </div>

            {/* 导航菜单 */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navigation.map((item) => (
                    <div key={item.name}>
                        {item.href ? (
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === item.href
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-900 mb-2">
                                    {item.icon}
                                    {item.name}
                                </div>
                                {item.children && (
                                    <div className="ml-6 space-y-1">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${pathname === child.href
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200 font-medium'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{child.name}</span>
                                                    {pathname === child.href && (
                                                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                {child.description && (
                                                    <p className="text-xs text-gray-500 mt-1">{child.description}</p>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </nav>

            {/* 底部信息 */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">版本 1.0.0</p>
                    <div className="flex justify-center gap-3">
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
