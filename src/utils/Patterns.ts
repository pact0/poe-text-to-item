export const Patterns = {
    AffixSectionDelimiter: /(?:^Item\sLevel:\s\d+(?:.+?--------.+?Talisman\sTier:\s\d+)?$)/ms,
    AffixCrafted: /(Master Crafted)| \(crafted\)$/m,
    AffixEnchant: / \(enchant\)$/m,
    AffixFractured: / \(fractured\)$/m,
    AffixImplicit: / \(implicit\)$/m,
    AffixEssence: / (Essence)|(of the Essence)/m,
    AffixPrefix: / (Prefix Modifier)|(of Prefixes)/m,
    AffixSuffix: / (Suffix Modifier)/m,
    AffixTier: / \(Tier: (\d)\)/m,
    AffixModName: /Modifier "(.*?)"/m,
    AffixInfluenceHunter: /(of the Hunt)|(of the Elevated Hunt)|(Hunter's)/m,
    AffixInfluenceShaper: /(of Shaping)|(of Elevated Shaping)|(The Shaper's)/m,
    AffixInfluenceElder: /(Eldritch)|(of the Elder)|(of the Elevated Elder)|(The Elder's)/m,
    AffixInfluenceCrusader: /(of the Crusade)|(of the Elevated Crusade)|(Crusader's)/m,
    AffixInfluenceWarlord: /(of the Conquest)|(of the Elevated Conquest)|(Warlord's)/m,
    AffixInfluenceRedeemer: /(of Redemption)|(of Elevated Redemption)|(Redeemer's)/m,
    AffixModVeiled: /(of the Order)|(Chosen)/m,
    AffixModEssence: /(of the Essence)|(Essences)/m,
    AffixModDelve: /(of the Underground)|(Subterranean)/m,
    AffixModTemple: /(Citaqualotl\'s)|(Guatelitzi\'s)|(Matatl\'s)|(Tacati\'s)|(Topotante\'s)|(Xopec\'s)|(of Citaqualotl)|(of Guatelitzi)|(of Matatl)|(of Puhuarte)|(of Tacati)/m,
    AffixModBeast: /(of Fenumus)|(of Farrul)|(of Craiceann)|(of Saqawal)|(Elreon\'s)/m,
    AffixModNotable: /(Notable)|(of Significance)/m,
    AffixVeiled: /^Veiled\s(?:Suffix|Prefix)$/m,
    AlternateQuality: /^Alternate\sQuality$/m,
    Anointed: /^Allocates\s(.+?)$/m,
    Armour: /^Armour:\s(\d+)/m,
    AttacksPerSecond: /^Attacks\sper\sSecond:\s([\d.]+)/m,
    BeastGenus: /^Genus:\s(.+)$/m,
    BeastGroup: /^Group:\s(.+)$/m,
    BeastFamily: /^Family:\s(.+)$/m,
    BlockChance: /^Chance\sto\sBlock:\s(\d+)%/m,
    CannotUse: /You cannot use this item\. Its stats will be ignored(\r\n|\r|\n)--------/m,
    Corrupted: /^Corrupted$/m,
    CriticalStrikeChance: /^Critical\sStrike\sChance:\s([\d.]+)%/m,
    Digits: /(\d+\.?(?:\d+)?)/g,
    EnergyShield: /^Energy\sShield:\s(\d+)/m,
    Evasion: /^Evasion\sRating:\s(\d+)/m,
    FlaskCharges: /^Consumes ([0-9]+)(?: \(augmented\))? of ([0-9]+)(?: \(augmented\))? Charges on use$/m,
    FlaskDuration: /^Lasts ([0-9.]+)(?: \(augmented\))? Seconds$/m,
    FlatChaosDamage: /^Adds\s(\d+)\sto\s(\d+)\sChaos\sDamage(?!\sto)$/m,
    FlatColdDamage: /^Adds\s(\d+)\sto\s(\d+)\sCold\sDamage(?!\sto)$/m,
    FlatFireDamage: /^Adds\s(\d+)\sto\s(\d+)\sFire\sDamage(?!\sto)$/m,
    FlatLightningDamage: /^Adds\s(\d+)\sto\s(\d+)\sLightning\sDamage(?!\sto)$/m,
    FlatPhysicalDamage: /^Physical Damage:\s(\d*)-(\d*)/m,
    Fractured: /^Fractured Item$/m,
    GemLevel: /^Level:\s(\d+)/m,
    GemExperience: /^Experience:\s(\d+)\/(\d+)$/m,
    IncreasedArmour: /^(\d+)%\sincreased.+?Armour$/gm,
    IncreasedEnergyShield: /^(\d+)%\sincreased.+?Energy\sShield$/gm,
    IncreasedEvasion: /^(\d+)%\sincreased.+?Evasion$/gm,
    IncreasedPhysicalDamage: /^(\d+)%\sincreased\sPhysical\sDamage$/gm,
    InfluenceCrusader: /^Crusader Item$/m,
    InfluenceElder: /^Elder Item$/m,
    InfluenceHunter: /^Hunter Item$/m,
    InfluenceRedeemer: /^Redeemer Item$/m,
    InfluenceShaper: /^Shaper Item$/m,
    InfluenceWarlord: /^Warlord Item$/m,
    ItemLevel: /^Item\sLevel:\s(\d+)/m,
    MapBlighted: /^Blighted\s(.+\sMap)$/m,
    MapElder: /^Elder\s(.+\sMap)$/m,
    MapPackSize: /^Monster Pack Size:\s\+(\d+)%/m,
    MapQuantity: /^Item Quantity:\s\+(\d+)%/m,
    MapRarity: /^Item Rarity:\s\+(\d+)%/m,
    MapRegion: /^Atlas Region:\s(.+?)$/m,
    MapShaped: /^Shaped\s(.+\sMap)$/m,
    MapTier: /^Map\sTier:\s(\d+)/m,
    Mirrored: /^Mirrored$/m,
    Metamorph: /Combine\sthis\swith\sfour\sother\sdifferent\ssamples/m,
    MetamorphAbility: /^Uses:\s(.+)$/m,
    NameSuffix: / of .+$/m,
    Note: /^Note:\s(.+)/m,
    NotePrice: /~.+?\s[\d.]+\/([\d.]+)\s.+/,
    Prophecy: /Right-click\sto\sadd\sthis\sprophecy\sto\syour\scharacter/m,
    Quality: /^Quality(?:.+?)?: \+([0-9]+)%(?: \(augmented\))?$/m,
    QualityCatalyst: /^Quality \((.*)\): \+[0-9]+%(?: \(augmented\))?$/m,
    Rarity: /^Rarity:\s(.+)$/m,
    Relic: /^Relic Unique$/m,
    Replica: /^Replica$/m,
    Requirements: /^Requirements:$/m,
    RequirementsDex: /^Requirements:.+?^Dex:\s(\d+)/ms,
    RequirementsInt: /^Requirements:.+?^Int:\s(\d+)/ms,
    RequirementsLevel: /^Requirements:.+?^Level:\s(\d+)/ms,
    RequirementsStr: /^Requirements:.+?^Str:\s(\d+)/ms,
    SectionDelimiter: /--------/gm,
    Sockets: /^Sockets:\s([GBRWAD -]+)$/m,
    StackSize: /^Stack\sSize:\s([\d,]+)\/([\d,]+)$/m,
    Synthesised: /^Synthesised Item$/m,
    TalismanTier: /^Talisman\sTier:\s(\d+)/m,
    Unidentified: /^Unidentified$/m,
    VaalGem: /^(.*Vaal .+)$/gm,
    WatchstoneUses: /\d uses remaining/g,
    WeaponRange: /^Weapon\sRange:\s(\d+)/m,
} as const;

export type Patterns = keyof typeof Patterns;
