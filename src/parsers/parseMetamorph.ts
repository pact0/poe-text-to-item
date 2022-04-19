import { Metamorph } from "@models/index";
import { getMatchAsString } from "@utils/Helper";
import { Patterns } from "@utils/Patterns";

export function parseMetamorph(rawText:string): Metamorph | undefined {
    if (Patterns.Metamorph.test(rawText) === false) {
        return;
    }

    return {
        uses:
            getMatchAsString(Patterns.MetamorphAbility, rawText) || "Unknown",
    };
}
