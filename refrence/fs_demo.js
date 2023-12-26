const fs = require("fs");
const path = require("path");

//create folder
// fs.mkdir(path.join(__dirname, "/test"), {}, (err) => {
//   if (err) throw err;
//   console.log("folder created...");
// });

//create and write file
fs.writeFile(
  path.join(__dirname, "/test", "hello.txt"),
  "hello wrld",
  (err) => {
    if (err) throw err;
    console.log("file written to...");
  }
);
