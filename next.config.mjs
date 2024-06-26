/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'dist',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'http-crud-music-app-storage.s3.eu-north-1.amazonaws.com',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
