/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
      unoptimized: true,
      path: '',
      loader: 'default',
      domains: ['www.teleiosdome.com', 'teleiosdome.com'],
  },
}

