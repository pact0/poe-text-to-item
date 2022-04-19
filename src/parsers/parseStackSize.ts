import { StackSize } from "@models/index";
import { Patterns } from "@utils/Patterns";

export function parseStackSize(rawText:string): StackSize | undefined {
    const match = Patterns.StackSize.exec(rawText);

    if (match) {
        return {
            size: parseInt(match[1].replace(/,/g, ""), 10),
            max: parseInt(match[2].replace(/,/g, ""), 10),
        };
    }
}
