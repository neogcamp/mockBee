#! /usr/bin/env node

const main = require("./dist/main");
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
