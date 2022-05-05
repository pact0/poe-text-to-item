//@ts-nocheck
import { Item } from "@models/Item";
import { Section } from "@models/Section"
import { parseAffixes } from "@parsers/parseAffixes";
import { parseBaseItem } from "@parsers/parseBaseItem";
import { parseBeast } from "@parsers/parseBeast";
import { parseDefense } from "@parsers/parseDefense";
import { parseFlags } from "@parsers/parseFlags";
import { parseItemLevel } from "@parsers/parseItemLevel";
import { parseMap } from "@parsers/parseMap";
import { parseNote } from "@parsers/parseNote";
import { parseOffense } from "@parsers/parseOffense";
import { parseQuality } from "@parsers/parseQuality";
import { parseRequirements } from "@parsers/parseRequirements";
import { parseSockets } from "@parsers/parseSockets";
import { parseStackSize } from "@parsers/parseStackSize";
import { parseTalisman } from "@parsers/parseTalisman";
import { getItemIcon } from "@utils/getItemIcon";
import { removeEmptyFromArray } from "./Helper";
import { Patterns } from "./Patterns";

export const generateItem = (rawText:string): Item=>{
const text = rawText
const clearedText = rawText.replace(Patterns.InfluenceExarch,"").replace(Patterns.InfluenceEater,"")
const sections: Section[] = clearedText.split(Patterns.SectionDelimiter).map((x)=>{
  return {section: x, lines: removeEmptyFromArray(x.split("\n"))}
})

  const base:Base = parseBaseItem(sections[0])

  const item ={
    base :base,
    flags : parseFlags(text,base.name),
    talisman :parseTalisman(text),
    quality : parseQuality(text),
    ilvl  : parseItemLevel(text),
    requirements : parseRequirements(text),
    sockets :parseSockets(text),
    beast :parseBeast(text),
    defences : parseDefense(text),
    offense : parseOffense(text),
    map : parseMap(text),
    note : parseNote(text),
    stackSize : parseStackSize(text),
    affixes : parseAffixes(sections),
    icon : getItemIcon(base),
  }

  return item
}
