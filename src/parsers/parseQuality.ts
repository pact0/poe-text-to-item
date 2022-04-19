import { Quality } from "@models/index";
import { getMatchAsNumber, getMatchAsString } from "@utils/Helper";
import { Patterns } from "@utils/Patterns";

export function parseQuality(rawText:string): Quality | undefined {
    if (Patterns.Quality.test(rawText) === false) {
        return;
    }

    const data: Quality = {
        value: getMatchAsNumber(Patterns.Quality, rawText) || 0,
    };

    const catalyst = getMatchAsString(Patterns.QualityCatalyst, rawText);

    if (catalyst !== undefined) {
        data.catalyst = catalyst;
    }

    return data;
}
