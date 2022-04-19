import { Talisman } from "@models/index";
import { getMatchAsNumber } from "@utils/Helper";
import { Patterns } from "@utils/Patterns";

export function parseTalisman(rawText:string): Talisman | undefined {
    if (Patterns.TalismanTier.test(rawText) === false) {
        return;
    }

    return {
        tier: getMatchAsNumber(Patterns.TalismanTier, rawText) || 0,
    };
}
