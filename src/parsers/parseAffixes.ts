import { AffixType } from "@models/enums";
import { Affix } from "@models/index";
import { Section } from "@models/Section";
import { Patterns } from "@utils/Patterns";

interface AffixPlaceholder {
  header:string;
  mod: string;
  secondMod?: string;
}

export function parseAffixes(affixSections:Section[]): Affix[] | undefined {
  // if ([Rarity.Normal, Rarity.Magic, Rarity.Rare, Rarity.Unique].includes(this.rarity) === false) {
  //     return;
  // }

  const affixPlaceholders: AffixPlaceholder[] = [];
  const sectionIndices = getAffixSectionIndices(affixSections);

  for (const index of sectionIndices) {
    const section = affixSections[index];

    if (section === undefined) {
      continue;
    }

    let affixIndex = -1

    // group affix mods and headers together
    for (const line of section.lines) {
      if(checkAffixHeader(line)){
        affixIndex++;
        affixPlaceholders[affixIndex] ={header: line, mod:""}
      }else {
        // skip helper lines
        if(line.charAt(0) === "(") continue;

        if(affixPlaceholders[affixIndex] && affixPlaceholders[affixIndex].mod !== ""){
          affixPlaceholders[affixIndex] ={...affixPlaceholders[affixIndex],secondMod: line}
          continue;
        }

        affixPlaceholders[affixIndex] ={...affixPlaceholders[affixIndex],mod: line}
      }
    }


  }
  console.log(affixPlaceholders)



  console.log(affixPlaceholders.map((affix: AffixPlaceholder)=>{
    return parsePlaceholder(affix)
  }))
  return []
}

const parsePlaceholder = (affixPlaceholder: AffixPlaceholder): any=>{
  const affix = {header:"", mod:"", influence:"",tier:-1,isElevated:false,isNotable:false,affixType:"", modName:"",type:"", modFormatted:"", modValues:[], craftOfExile:{modgroup:-1}}
  const affixHeaderString = affixPlaceholder.header
  const affixString = affixPlaceholder.secondMod ? affixPlaceholder.mod +", "+affixPlaceholder.secondMod : affixPlaceholder.mod

  // parse header info
  affix.header= affixHeaderString
    .replace(" — Unscalable Value", "")

  affix.affixType = Patterns.AffixPrefix.test(affixHeaderString) ? "prefix" : affix.affixType;
  affix.affixType = Patterns.AffixSuffix.test(affixHeaderString) ? "suffix" : affix.affixType;


  const tier = Patterns.AffixTier.exec(affixHeaderString);
  if(tier){
    affix.tier=Number(tier[1])
  }

  const modName = Patterns.AffixModName.exec(affixHeaderString);
  if(modName){
    affix.modName = modName[1]
  }

  if(affix.modName.includes("Elevated")) affix.isElevated = true

if(affix.header.includes("Master Crafted")){
  // Crafted affix
  affix.craftOfExile.modgroup=11;
}else{
 if(Patterns.AffixInfluenceRedeemer.test(affixHeaderString)) {
    affix.influence = "Redeemer"
    affix.craftOfExile.modgroup = 7;
  } else if(Patterns.AffixInfluenceHunter.test(affixHeaderString)){
    affix.influence = "Hunter"
    affix.craftOfExile.modgroup = 5;
  } else if(Patterns.AffixInfluenceCrusader.test(affixHeaderString)){
    affix.influence = "Crusader"
    affix.craftOfExile.modgroup = 4;
  } else if(Patterns.AffixInfluenceWarlord.test(affixHeaderString)){
    affix.influence = "Warlord"
    affix.craftOfExile.modgroup = 6
  } else if(Patterns.AffixInfluenceShaper.test(affixHeaderString)){
    affix.influence = "Shaper"
    affix.craftOfExile.modgroup = 2
  } else if(Patterns.AffixInfluenceElder.test(affixHeaderString)){
    affix.influence = "Elder"
    affix.craftOfExile.modgroup = 3
  } else if(Patterns.AffixModVeiled.test(affixHeaderString)){
    affix.craftOfExile.modgroup = 10
  } else if(Patterns.AffixModEssence.test(affixHeaderString)){
    affix.craftOfExile.modgroup = 12
  } else if(Patterns.AffixModTemple.test(affixHeaderString)){
    affix.craftOfExile.modgroup = 9
  } else if(Patterns.AffixModBeast.test(affixHeaderString)){
    affix.craftOfExile.modgroup = 14
  } else if(Patterns.AffixModNotable.test(affixHeaderString)){
    affix.craftOfExile.modgroup = 1
    affix.isNotable = true
  }
  }

      // case 'Notable' : case 'of Significance' : mgrp=1; naffs[z]["notable"]=true; break; // Cluster jewel


  // parse actual mods
    affix.mod = affixString
        .replace(Patterns.AffixEnchant, "")
        .replace(Patterns.AffixImplicit, "")
        .replace(Patterns.AffixCrafted, "")
        .replace(Patterns.AffixFractured, "")
        .replace(" — Unscalable Value", "")

    affix.type = Patterns.AffixEnchant.test(affixString) ? AffixType.Enchant : affix.type;
    affix.type = Patterns.AffixImplicit.test(affixString) ? AffixType.Implicit : affix.type;
    affix.type = Patterns.AffixCrafted.test(affixString) ? AffixType.Crafted : affix.type;
    affix.type = Patterns.AffixFractured.test(affixString) ? AffixType.Fractured : affix.type;
    affix.type = Patterns.AffixVeiled.test(affixString) ? AffixType.Veiled : affix.type;

    // Remove digits from text
    affix.modFormatted = affix.mod.replace(Patterns.Digits, "#");

    // Get values
    let matches;
    while ((matches = Patterns.Digits.exec(affix.mod)) !== null) {
        if(matches) affix.modValues.push(parseFloat(matches[0]));
    }

  return affix
}


const checkAffixHeader = (affixString: string): boolean=>{
  return affixString.charAt(0)=== "{"
}

const stringToAffixHeader = (affixString: string) => {
    const affix = {
        headerText: affixString,
        modName: "",
        influence: "",
        affixType: "",
        tier: -1
    };

    affix.headerText = affixString
        .replace(" — Unscalable Value", "")

    affix.affixType = Patterns.AffixPrefix.test(affixString) ? "prefix" : affix.affixType;
    affix.affixType = Patterns.AffixSuffix.test(affixString) ? "suffix" : affix.affixType;



     const tier = Patterns.AffixTier.exec(affixString);
  if(tier){
    affix.tier=Number(tier[1])
  }

     const modName = Patterns.AffixModName.exec(affixString);
  if(modName){
    affix.modName = modName[1]
  }


    affix.influence = Patterns.AffixInfluenceRedeemer.test(affixString) ? "Redeemer" : affix.influence;
    affix.influence = Patterns.AffixInfluenceHunter.test(affixString) ? "Hunter" : affix.influence;
    affix.influence = Patterns.AffixInfluenceWarlord.test(affixString) ? "Warlord" : affix.influence;
    affix.influence = Patterns.AffixInfluenceCrusader.test(affixString) ? "Crusader" : affix.influence;
    affix.influence = Patterns.AffixInfluenceShaper.test(affixString) ? "Shaper" : affix.influence;
    affix.influence = Patterns.AffixInfluenceElder.test(affixString) ? "Elder" : affix.influence;


    // Remove digits from text
    // affix.formatted = affix.text.replace(Patterns.Digits, "#");
    //
    // // Get values
    // let matches;
    // while ((matches = Patterns.Digits.exec(affix.text)) !== null) {
    //     affix.values.push(parseFloat(matches[0]));
    // }

    return affix;
};


const stringToAffix = (affixString: string): Affix => {
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
        .replace(Patterns.AffixFractured, "")
        .replace(" — Unscalable Value", "")

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
