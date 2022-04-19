import { Defense } from "@models/index";
import { getMatchAsNumber } from "@utils/Helper";
import { Patterns } from "@utils/Patterns";

export function parseDefense(rawText:string): Defense | undefined {
    const blockChance = getMatchAsNumber(Patterns.BlockChance, rawText);
    const evasion = getMatchAsNumber(Patterns.Evasion, rawText);
    const energyShield = getMatchAsNumber(Patterns.EnergyShield, rawText);
    const armour = getMatchAsNumber(Patterns.Armour, rawText);

    if (
        blockChance !== undefined ||
        evasion !== undefined ||
        energyShield !== undefined ||
        armour !== undefined
    ) {
        return {
            blockChance: blockChance || 0,
            evasion: evasion || 0,
            energyShield: energyShield || 0,
            armour: armour || 0,
        };
    }
}
