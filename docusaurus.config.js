const isI18nStaging = process.env.I18N_STAGING === 'true';
const math = require('remark-math');
const katex = require('rehype-katex');
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Fortran 从入门到实践',
  tagline: '从零开始你的 Fortran 之旅',
  url: 'https://fortran-tutorial.lisz.me',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'zhonger', // Usually your GitHub org/user name.
  projectName: 'fortran-tutorial', // Usually your repo name.
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig: {
    navbar: {
      title: 'Fortran 从入门到实践',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: '入门实践',
        },
        {to: '/blog', label: '博客', position: 'left'},
        {
          href: 'https://github.com/zhonger/fortran-tutorial',
          'aria-label': 'GitHub',
          className: 'header-github-link',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '开始页',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/zhonger/fortran-tutorial',
            },
          ],
        },
      ],
      copyright: `版权所有 © ${new Date().getFullYear()} <a href="https://lisz.me">zhonger</a>, 此网站使用 <a href="https://docusaurus.io/">Docusaurus</a> 构建。 `,
    },
    prism: {
      additionalLanguages: ['fortran'],
      theme: require('prism-react-renderer/themes/github'),
    },
    hideableSidebar: true,
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/zhonger/fortran-tutorial/edit/master/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/zhonger/fortran-tutorial/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-ZL1C0Z88NL',
          anonymizeIP: true,
        },
      },
    ],
  ],
};
