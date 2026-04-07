/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const path = require('path');

const nextConfig = {
    swcMinify: false,
    reactStrictMode: false,
    output: 'standalone',
    transpilePackages: [
        'db-rn-ui',
        'react-native',
        'react-native-safe-area-context',
        'react-native-vector-icons',
        'react-native-web',
        'react-native-web-linear-gradient',
    ],
    experimental: { 
        webpackBuildWorker: false,
        forceSwcTransforms: false,
    },
    compiler: {},
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config, { isServer, dev }) => {
        const docsNodeModules = path.resolve(__dirname, 'node_modules');

        config.resolve.modules = [
            docsNodeModules,
            'node_modules',
            ...config.resolve.modules,
        ];

        config.resolve.alias = {
            ...config.resolve.alias,
            'react-native$': path.resolve(docsNodeModules, 'react-native-web'),
            'react-native': path.resolve(docsNodeModules, 'react-native-web'),
            'react-native-safe-area-context': path.resolve(docsNodeModules, 'react-native-safe-area-context'),
            'react-native-linear-gradient': 'react-native-web-linear-gradient',
            'react-native-vector-icons': 'react-native-vector-icons/dist',
            'react-native-video': false,
            'react-native-image-picker': false,
        };

        config.module.rules.push({
            test: /Libraries\/ActionSheetIOS\/ActionSheetIOS/,
            loader: 'ignore-loader'
        });

        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(/react-native-linear-gradient/, 'react-native-web-linear-gradient')
        );

        config.resolve.extensions = [
            '.web.tsx', '.web.ts', '.web.jsx', '.web.js',
            '.tsx', '.ts', '.jsx', '.js',
            ...config.resolve.extensions,
        ];

        if (isServer) {
            config.externals = [
                ...config.externals,
                'react-native-linear-gradient',
                'react-native-safe-area-context', 
                'react-native-vector-icons',
                'react-native-video',
                // 'styled-jsx',
            ];
        }

        return config;
    },
    productionBrowserSourceMaps: false,
};

module.exports = nextConfig;