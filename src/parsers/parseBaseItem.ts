import { Rarity } from "@models/enums";
import { Section } from "@models/Section";
import { Patterns } from "@utils/Patterns";
import rareBases from "@bases/rareBases.json"


export function parseBaseItem(baseSection:Section): any {
    const section = baseSection;
    if (section === undefined) {
        return "Unknown";
    }

    // if (this.beast !== undefined) {
    //     return "Imprinted Bestiary Orb";
    // }
    //
    // if (this.metamorph !== undefined) {
    //     return getMetamorphBaseItem(section.lines[1]);
    // }

    // If Rare/Unique: line 3, if Normal/Magic: line 2

    const lineLen = section.lines.length

    let base = section.lines[lineLen-1]
    base = base.replace("Synthesised ", "")

    let rarity = Patterns.Rarity.exec(section.section) || "Undefined";

    let name = section.lines[lineLen-2] || "Unknown";

    if(rarity){
      rarity = rarity[1] || "Undefined";

      if (rarity === Rarity.Gem) {
        const match = Patterns.VaalGem.exec(section.section);
        if (match) {
          name = match[1];
        }
      }
    }
  switch (rarity) {
    case "Unique":
      //
      break;
    case "Gem":
      //
      break;

    default:
      console.log("Base Info",getBaseInfo(base as keyof typeof rareBases))
      break;
  }

    //
    // Check if this base item is in game files
    // This will remove prefix/suffix from magic items, synthesised prefix, blighted prefix, ...

    // const found = Object.values(BaseItems).find((item) => {
    //     return baseItem.includes(item.name);
    // });

    // if (found !== undefined) {
    //     baseItem = found.name;
    // }

    return {base:base.trim(),name:name.trim(),rarity:rarity.trim()};
}

const getBaseInfo = (baseName:keyof typeof rareBases)=>{
  return rareBases[baseName];
}

const getMetamorphBaseItem = (baseItem: string): string => {
    const types = ["Heart", "Brain", "Liver", "Lung", "Eye"];

    for (const type of types) {
        if (baseItem.includes(type)) {
            return `Metamorph ${type}`;
        }
    }

    return "Unknown Metamorph Sample";
};
