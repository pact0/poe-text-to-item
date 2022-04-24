import { exampleItems } from "@utils/testData";
import { generateItem } from "@utils/generateItem";

import fs from "fs";
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "testItem.txt"), 'utf8')

console.log(generateItem(data))

// list of example items
// exampleItems.map((x)=>{
//   console.log(generateItem(x.text))
// })
