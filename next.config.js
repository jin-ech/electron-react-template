
const withAntdLess = require('next-plugin-antd-less');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    ...withAntdLess({})
}

module.exports = nextConfig
