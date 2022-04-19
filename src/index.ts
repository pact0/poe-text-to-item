import { exampleItems } from "@utils/testData";
import { Patterns, removeEmptyFromArray } from "./utils";
import { parseAffixes, parseBaseItem, parseBeast, parseDefense, parseFlags, parseItemLevel, parseMap, parseNote, parseOffense, parseQuality, parseRequirements, parseSockets, parseStackSize } from "./parsers";
import { Section } from "@models/Section";


exampleItems.map((x)=>{
const text = x.text
const sections: Section[] = x.text.split(Patterns.SectionDelimiter).map((x)=>{
  return {section: x, lines: removeEmptyFromArray(x.split("\n"))}
})

  if(x.name === "Body Armor"){
    //console.log("Sockets",parseSockets(text))
    //console.log("Beast",parseBeast(text))
    //console.log("Defense",parseDefense(text))
    //console.log("Map",parseMap(text))
    //console.log("Note",parseNote(text))
    //console.log("Offense",parseOffense(text))
    //console.log("Quality",parseQuality(text))
    //console.log("Requirements",parseRequirements(text))
    //console.log("Stack size",parseStackSize(text))
    //console.log("Item Level",parseItemLevel(text))
    //console.log("Flags",parseFlags(text))
    // console.log(sections)
    // specific section stuff
    // base section will always be idx 0
    //console.log(parseBaseItem(sections[0]))
    console.log(parseAffixes(sections));
  }
})
