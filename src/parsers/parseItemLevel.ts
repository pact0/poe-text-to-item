import { getMatchAsNumber } from "@utils/Helper";
import { Patterns } from "@utils/Patterns";

export function parseItemLevel(rawText:string): number | undefined {
    return getMatchAsNumber(Patterns.ItemLevel, rawText);
}
