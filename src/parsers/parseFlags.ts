import { Flags } from "@models/Flags";
import { Patterns } from "@utils/Patterns";

export function parseFlags(rawText:string, name:string): Flags {
    return {
        influence: {
            shaper: Patterns.InfluenceShaper.test(rawText),
            elder: Patterns.InfluenceElder.test(rawText),
            warlord: Patterns.InfluenceWarlord.test(rawText),
            redeemer: Patterns.InfluenceRedeemer.test(rawText),
            hunter: Patterns.InfluenceHunter.test(rawText),
            crusader: Patterns.InfluenceCrusader.test(rawText),
            eater: Patterns.InfluenceEater.test(rawText),
            exarch: Patterns.InfluenceExarch.test(rawText),
        },
        relic: Patterns.Relic.test(rawText),
        replica: Patterns.Replica.test(name),
        corrupted: Patterns.Corrupted.test(rawText),
        identified: Patterns.Unidentified.test(rawText) === false,
        synthesised: Patterns.Synthesised.test(rawText),
        fractured: Patterns.Fractured.test(rawText),
        mirrored: Patterns.Mirrored.test(rawText),
        veiled: Patterns.AffixVeiled.test(rawText),
    };
}
