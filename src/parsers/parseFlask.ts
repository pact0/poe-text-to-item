import { Flask } from "@models/index";
import { getMatchAsNumber } from "@utils/Helper";
import { Patterns } from "@utils/Patterns";

export function parseFlask(rawText:string): Flask | undefined {
    const chargesMatch = Patterns.FlaskCharges.exec(rawText);

    if (chargesMatch) {
        return {
            charges: {
                consumes: parseInt(chargesMatch[1], 10),
                max: parseInt(chargesMatch[2], 10),
            },
            duration: getMatchAsNumber(Patterns.FlaskDuration, rawText) || 0,
        };
    }
}
