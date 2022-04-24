## Poe-text-to-item

The purpose of this package is to convert text generated after clicking
`ALT+CTRL+C` on an item in game into a nice object containing all the necessary
data.


### Example Usage
 Install the package
``````
yarn add poe-text-to-item
``````
or
``````
npm install poe-text-to-item
``````
Example usage
``````
import fs from "fs";
const path = require("path");
import { generateItem } from "poe-text-to-item";

// where testItem.txt is a file with item text
const data = fs.readFileSync(path.resolve(__dirname, "testItem.txt"), 'utf8')
const item = generateItem(data)
``````
