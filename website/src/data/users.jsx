/*
Welcome to submissions for Mockbee.

Below you will see an array of objects. Each object signifies a project currently shown at the <url>/showcase. 
You can add yours below , by simply creating an object below with the exact same keys, but your own values.
For example, an Adarsh Balika would make the following object :
{
  title:"Principles of Javascript",
  description:"Javascript is the best , I dont like anything else.",
  preview: require("./showcase/<adarsh-image.jpg>"),
  source:"https://github.com/<adarsh-balika-repo>",
  tags :["Adarsh","Balika"]
}
Here's and example of a good PR :<link>

There are two ways to create a PR: 
1.Github UI Interface
2.Forking the repo and making the changes locally then commiting them and creating a PR.

A few steps to be followed :

1.Github UI Interface.
 * - Create a PR in this file of Users.
 * - This will create a branch on your Docusaurus fork (usually "patch-1").
 * - Rename the branch to addtoshowcase/<yourprojecttitle>
 * - Go to https://github.com/sashaboi/docasaurus-testing/tree/master/src/data/showcase
 * - Drag-and-drop an image here to add it to your existing PR. <dimensions to be followed>
 
2.Forking.

 * - Create a branch with name which follows addtoshowcase/<yourprojecttitle>
 * - Make changes to users.jsx , and add your image to the docasaurus-testing/tree/master/src/data/showcase folder.
 * - Commit to your own branch and create a pull request to merge to the <whichever we want> Master branch
 * 

After submission , our maintainers will take 3-5 weeks to review, process, approve your applications and then merge your changes into the production branch.
Thank you for submitting!

*/

export const users = [
  {
    title: "AgileTs",
    description: "Global State and Logic Framework for reactive Applications",
    preview: require("./showcase/agilets.png"),
    website: "https://agile-ts.org/",
    source: "https://github.com/agile-ts/documentation",
    tags: ["opensource", "design"],
  },
  {
    title: "AgileTs",
    description: "Global State and Logic Framework for reactive Applications",
    preview: require("./showcase/agilets.png"),
    website: "https://agile-ts.org/",
    source: "https://github.com/agile-ts/documentation",
    tags: ["opensource", "design"],
  },
  {
    title: "AgileTs",
    description: "Global State and Logic Framework for reactive Applications",
    preview: require("./showcase/agilets.png"),
    website: "https://agile-ts.org/",
    source: "https://github.com/agile-ts/documentation",
    tags: ["opensource", "design"],
  },
  {
    title: "AgileTs",
    description: "Global State and Logic Framework for reactive Applications",
    preview: require("./showcase/agilets.png"),
    website: "https://agile-ts.org/",
    source: "https://github.com/agile-ts/documentation",
    tags: ["opensource", "design"],
  },
  {
    title: "AgileTs",
    description: "Global State and Logic Framework for reactive Applications",
    preview: require("./showcase/agilets.png"),
    website: "https://agile-ts.org/",
    source: "https://github.com/agile-ts/documentation",
    tags: ["opensource", "design"],
  },
  {
    title: "AgileTs",
    description: "Global State and Logic Framework for reactive Applications",
    preview: require("./showcase/agilets.png"),
    website: "https://agile-ts.org/",
    source: "https://github.com/agile-ts/documentation",
    tags: ["opensource", "design"],
  },
];
