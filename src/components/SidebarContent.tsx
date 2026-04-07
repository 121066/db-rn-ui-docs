'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
    name: string;
    href?: string;
    icon: React.ReactNode;
    children?: NavItem[];
    description?: string;
}

interface SidebarContentProps {
    navigation: NavItem[];
}

export function SidebarContent({ navigation }: SidebarContentProps) {
    const pathname = usePathname();

    return (
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
                                            href={child.href || '#'}
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
    );
}
