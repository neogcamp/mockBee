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
      items: ['advance-concepts', 'custom-apis', 'resources'],
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
      label: 'E-Commerce',
      items: ['api/e-commerce/product', 'api/e-commerce/category', 'api/e-commerce/cart', 'api/e-commerce/wishlist'],
    },
    {
      type: 'category',
      label: 'Video Library',
      items: ['api/video-library/video', 'api/video-library/category', 'api/video-library/like', 'api/video-library/playlist', 'api/video-library/history'],
    },
  ],
};
