import { Beast } from "@models/index";
import { getMatchAsString } from "@utils/Helper";
import { Patterns } from "@utils/Patterns";

export function parseBeast(rawText:string): Beast | undefined {
    if (Patterns.BeastFamily.test(rawText) === false) {
        return;
    }

    return {
        genus: getMatchAsString(Patterns.BeastGenus, rawText) || "Unknown",
        group: getMatchAsString(Patterns.BeastGroup, rawText) || "Unknown",
        family: getMatchAsString(Patterns.BeastFamily, rawText) || "Unknown",
    };
}
