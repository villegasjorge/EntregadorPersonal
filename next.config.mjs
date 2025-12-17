import withPWA from 'next-pwa';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

const config = withPWA({
  dest: 'public',
  disable: !isProd,
  register: true,
  skipWaiting: true,
})(
  {
    experimental: {
      serverActions: true,
    },
    webpack: (config) => {
      config.resolve.alias['@'] = path.join(process.cwd(), 'app');
      config.resolve.alias['@components'] = path.join(process.cwd(), 'components');
      config.resolve.alias['@lib'] = path.join(process.cwd(), 'lib');
      return config;
    },
  }
);

export default config;
