module.exports = {
  title: "mockBee",
  tagline: "Mock Backend Servers for your next Frontend Project!",
  url: "https://mockbee.netlify.app", // Url to your site with no trailing slash
  baseUrl: "/", // Base directory of your site relative to your repo
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "neogcamp", // Usually your GitHub org/user name.
  projectName: "mockBee", // Usually your repo name.
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/neogcamp/mockBee/website",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "mockBee",
      logo: {
        alt: "My Site Logo",
        src: "img/mockbee.png",
      },
      items: [
        {
          to: "docs/introduction",
          label: "Docs",
          position: "left",
        },
        { to: "/docs/api/introduction", label: "API", position: "left" },
        { to: "/showcase", label: "Showcase", position: "left" },
        {
          href: "https://github.com/neogcamp/neoG-Camp-mock-backend",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "/docs/introduction",
            },
            {
              label: "Get Started",
              to: "/docs/installation",
            },
            {
              label: "Guides",
              to: "/docs/why-miragejs-mock-backend/",
            },
            {
              label: "API Documentation",
              to: "/docs/api/introduction/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Website",
              href: "https://neog.camp/",
            },
            {
              label: "Discord",
              href: "https://discord.com/invite/qaGwEEB8eF",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/neogcamp",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/neogcamp",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} neoG camp. Built with Docusaurus.`,
    },
  },
  onDuplicateRoutes: "warn",
  customFields: {},
  plugins: [],
  themes: [],
};
