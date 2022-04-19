import { Map } from "@models/index";
import { getMatchAsNumber, getMatchAsString } from "@utils/Helper";
import { Patterns } from "@utils/Patterns";

export function parseMap(rawText:string): Map | undefined {
    if (Patterns.MapTier.test(rawText) === false) {
        return;
    }

    return {
        quantity: getMatchAsNumber(Patterns.MapQuantity, rawText) || 0,
        rarity: getMatchAsNumber(Patterns.MapRarity, rawText) || 0,
        packSize: getMatchAsNumber(Patterns.MapPackSize, rawText) || 0,
        tier: getMatchAsNumber(Patterns.MapTier, rawText) || 0,
        blighted: Patterns.MapBlighted.test(rawText),
        shaped: Patterns.MapShaped.test(rawText),
        elder: Patterns.MapElder.test(rawText),
        region: getMatchAsString(Patterns.MapRegion, rawText) || "Unknown",
    };
}
