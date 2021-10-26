module.exports = {
  title: 'mockBee 🐝',
  tagline: 'The Mock Backend for NeoG Camp',
  url: 'https://mockbee.netlify.app', // Url to your site with no trailing slash
  baseUrl: '/website', // Base directory of your site relative to your repo
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'neog.camp', // Usually your GitHub org/user name.
  projectName: 'mockBee', // Usually your repo name.
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    {
      navbar: {
        title: 'mockBee',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            to: "docs/introduction",
            label: "Docs",
            position: "left",
          },
          {to: '/docs/api/introduction', 
          label: 'API', 
          position: 'left'},
          {
            href: 'https://github.com/neogcamp/neoG-Camp-mock-backend',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/introduction',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} neoG camp. Built with Docusaurus.`,
      },
    },
    "onDuplicateRoutes": "warn",
  "customFields": {},
  "plugins": [],
  "themes": []
}
