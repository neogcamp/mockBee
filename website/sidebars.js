module.exports = {
  docs: [
       'introduction'
    ,
    {
      type: 'category',
      label: 'Getting Started',
      items: ['installation', 'understanding-code-structure', 'configuration', 'getting-app-running'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['why-miragejs-mock-backend', 'how-it-works', 'customization' , 'available-apis', 'playground'],
    },
    {
      type: 'category',
      label: 'Advanced Guides',
      items: ['main-concepts', 'custom-apis', 'resources'],
    }
  ],
  api: [
    'api/introduction',
    {
      type: 'category',
      label: 'General',
      items: ['api/general/auth'],
    },
    {
      type: 'category',
      label: 'Apps',
      items: ['api/apps/e-commerce', 'api/apps/video-library'],
    },
  ],
};
