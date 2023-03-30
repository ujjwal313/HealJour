/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");

fs.copyFile(
  path.join(__dirname + "/package.json"),
  path.join(__dirname + "/dist/package.json"),
  (err) => {
    if (err) throw new Error(err);
    console.log("package.json copied..");
  }
);

fs.copyFile(
  path.join(__dirname + "/master.deploy.sh"),
  path.join(__dirname + "/dist/master.deploy.sh"),
  (err) => {
    if (err) throw new Error(err);
    console.log("master.deploy.sh copied..");
  }
);

fs.copyFile(
  path.join(__dirname + "/dev.ecosystem.config.js"),
  path.join(__dirname + "/dist/dev.ecosystem.config.js"),
  (err) => {
    if (err) throw new Error(err);
    console.log("dev.ecosystem.config.cjs copied..");
  }
);
// });
