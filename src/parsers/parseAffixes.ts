import { AffixType } from "@models/enums";
import { Affix } from "@models/index";
import { Section } from "@models/Section";
import { Patterns } from "@utils/Patterns";

export function parseAffixes(affixSections:Section[]): Affix[] | undefined {
    // if ([Rarity.Normal, Rarity.Magic, Rarity.Rare, Rarity.Unique].includes(this.rarity) === false) {
    //     return;
    // }

    const affixes: Affix[] = [];
    const sectionIndices = getAffixSectionIndices(affixSections);
    sectionIndices.map((id)=>{
    console.log("Section",affixSections[id])
  })

    for (const index of sectionIndices) {
        const section = affixSections[index];

        if (section === undefined) {
            continue;
        }

        for (const line of section.lines) {
            const affix = stringToAffix(line);
            affixes.push(affix);
        }
    }

    return affixes;
}

const stringToAffix = (affixString: string): Affix => {
  console.log("Affix String", affixString)
    const affix: Affix = {
        text: affixString,
        formatted: "",
        values: [],
        influence: "",
        type: AffixType.Explicit,
    };

    // Determine flags and remove them from text
    affix.text = affixString
        .replace(Patterns.AffixEnchant, "")
        .replace(Patterns.AffixImplicit, "")
        .replace(Patterns.AffixCrafted, "")
        .replace(Patterns.AffixFractured, "");

    affix.type = Patterns.AffixEnchant.test(affixString) ? AffixType.Enchant : affix.type;
    affix.type = Patterns.AffixImplicit.test(affixString) ? AffixType.Implicit : affix.type;
    affix.type = Patterns.AffixCrafted.test(affixString) ? AffixType.Crafted : affix.type;
    affix.type = Patterns.AffixFractured.test(affixString) ? AffixType.Fractured : affix.type;
    affix.type = Patterns.AffixVeiled.test(affixString) ? AffixType.Veiled : affix.type;

              // case "Redeemer's":
              //   mgrp = 7;
              //   break;
              // case "Subterranean":
              // case "of the Underground":
              //   mgrp = 12;
              //   break;
              // case "Chosen":
              // case "of the Order":
              //   mgrp = 10;
              //   break;
              // case "Essences":
              // case "of the Essence":
              //   mgrp = 13;
              //   break;
              // case "of Fenumus":
              // case "of Farrul":
              // case "of Craiceann":
              // case "of Saqawal":
              // case "Elreon's":
              //   mgrp = 14;
              //   break;
              // case "Notable":
              // case "of Significance":
              //   mgrp = 1;
              //   naffs[z]["notable"] = true;
              //   break; // Cluster jewel
              // case "Citaqualotl's":
              // case "Guatelitzi's":
              // case "Matatl's":
              // case "Tacati's":
              // case "Topotante's":
              // case "Xopec's":
              // case "of Citaqualotl":
              // case "of Guatelitzi":
              // case "of Matatl":
              // case "of Puhuarte":
              // case "of Tacati":
              //   mgrp = 9;
              //   break;

    affix.influence = Patterns.AffixInfluenceHunter.test(affixString) ? "Hunter" : affix.influence;
    // Remove digits from text
    affix.formatted = affix.text.replace(Patterns.Digits, "#");

    // Get values
    let matches;
    while ((matches = Patterns.Digits.exec(affix.text)) !== null) {
        affix.values.push(parseFloat(matches[0]));
    }

  // const treg = /"(.*)"/gm;
  // if(treg.test(affix.text))
    return affix;
};

const getAffixSectionIndices = (sections:Section[]): number[] => {
    const indices: number[] = [];

    // Try to find enchant section
    const enchantIdx = findSectionIndex(Patterns.AffixEnchant, sections);
    if (enchantIdx !== undefined) {
        indices.push(enchantIdx);
    }

    // Try to find implicit section
    const implicitIdx = findSectionIndex(Patterns.AffixImplicit, sections);
    if (implicitIdx !== undefined) {
        indices.push(implicitIdx);
    }

    // Normal items have no explicits, don't bother
    // if (instance.rarity === Rarity.Normal) {
    //     return indices;
    // }

    // If implicit index found, explicit index must be next
    if (implicitIdx !== undefined) {
        indices.push(implicitIdx + 1);
        return indices;
    }

    // If implicit index not found, but enchant, explicit index must come after enchant
    if (implicitIdx === undefined && enchantIdx !== undefined) {
        indices.push(enchantIdx + 1);
        return indices;
    }

    // If implicit and enchant index not found, explicit must come after item level
    const itemlevelIdx = findSectionIndex(Patterns.ItemLevel, sections);
    if (itemlevelIdx !== undefined) {
        indices.push(itemlevelIdx + 1);
        return indices;
    }

    // Hope this never happens :(
    return indices;
};

const findSectionIndex = (pattern: RegExp, sections:Section[]): number | undefined => {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (pattern.test(section.section)) {
      return i;
    }
  }
    }
