import { getMatchAsString } from "@utils/Helper";
import { Patterns } from "@utils/Patterns";

export function parseNote(rawText:string): string | undefined {
    return getMatchAsString(Patterns.Note, rawText);
}
