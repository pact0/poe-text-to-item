//@ts-nocheck
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

export const generateItem = (rawText:string)=>{
const text = rawText
const clearedText = rawText.replace(Patterns.InfluenceExarch,"").replace(Patterns.InfluenceEater,"")
const sections: Section[] = clearedText.split(Patterns.SectionDelimiter).map((x)=>{
  return {section: x, lines: removeEmptyFromArray(x.split("\n"))}
})

  const item ={}

    item.base = parseBaseItem(sections[0])
    item.flags = parseFlags(text,item.base.name)
    item.talisman = parseTalisman(text)
    item.quality = parseQuality(text)
    item.ilvl = parseItemLevel(text)
    item.requirements = parseRequirements(text)
    item.sockets =parseSockets(text)
    item.beast =parseBeast(text)
    item.defences = parseDefense(text)
    item.offense = parseOffense(text)
    item.map = parseMap(text)
    item.note = parseNote(text)
    item.stackSize = parseStackSize(text)
    item.affixes = parseAffixes(sections)
    item.icon = getItemIcon(item.base)
  return item
}
