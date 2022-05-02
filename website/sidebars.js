module.exports = {
  docs: [
    "introduction",
    {
      type: "category",
      label: "Getting Started",
      items: [
        "installation",
        "project-structure",
        "configuration",
        "getting-app-running",
      ],
    },
    {
      type: "category",
      label: "Guides",
      items: ["why-miragejs-mock-backend", "syncing-mockbee", "customization"],
    },
  ],
  api: [
    "api/introduction",
    {
      type: "category",
      label: "General",
      items: ["api/general/auth"],
    },
    {
      type: "category",
      label: "Apps",
      items: [
        "api/apps/e-commerce",
        "api/apps/video-library",
        "api/apps/social-media",
        "api/apps/notes-app",
        "api/apps/forum-app",
        "api/apps/project-management",
        "api/apps/habit-tracker",
      ],
    },
  ],
};
