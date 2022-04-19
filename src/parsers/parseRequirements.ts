import { Requirements } from "@models/index";
import { getMatchAsNumber } from "@utils/Helper";
import { Patterns } from "@utils/Patterns";

export function parseRequirements(rawText:string): Requirements | undefined {
    if (Patterns.Requirements.test(rawText) === false) {
        return;
    }

    return {
        level: getMatchAsNumber(Patterns.RequirementsLevel, rawText) || 0,
        strength: getMatchAsNumber(Patterns.RequirementsStr, rawText) || 0,
        dexterity: getMatchAsNumber(Patterns.RequirementsDex, rawText) || 0,
        intelligence: getMatchAsNumber(Patterns.RequirementsInt, rawText) || 0,
    };
}
