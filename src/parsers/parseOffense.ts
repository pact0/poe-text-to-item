import { DamageRange, Offense } from "@models/index";
import { getMatchAsNumber } from "@utils/Helper";
import { Patterns } from "@utils/Patterns";

export function parseOffense(rawText:string): Offense | undefined {
    if (Patterns.AttacksPerSecond.test(rawText) === false) {
        return;
    }

    const data: Offense = {
        range: getMatchAsNumber(Patterns.WeaponRange, rawText) || 0,
        critChance:
            getMatchAsNumber(Patterns.CriticalStrikeChance, rawText) || 0,
        aps: getMatchAsNumber(Patterns.AttacksPerSecond, rawText) || 0,
        damage: {
            physical: getDamageRange(Patterns.FlatPhysicalDamage, rawText),
            fire: getDamageRange(Patterns.FlatFireDamage, rawText),
            cold: getDamageRange(Patterns.FlatColdDamage, rawText),
            lightning: getDamageRange(Patterns.FlatLightningDamage, rawText),
            chaos: getDamageRange(Patterns.FlatChaosDamage, rawText),
        },
        dps: {
            physical: 0,
            fire: 0,
            cold: 0,
            lightning: 0,
            elemental: 0,
            chaos: 0,
            total: 0,
        },
    };

    data.dps.physical = calculateDPS(data.damage.physical, data.aps);
    data.dps.fire = calculateDPS(data.damage.fire, data.aps);
    data.dps.cold = calculateDPS(data.damage.cold, data.aps);
    data.dps.lightning = calculateDPS(data.damage.lightning, data.aps);
    data.dps.chaos = calculateDPS(data.damage.chaos, data.aps);
    data.dps.elemental = data.dps.fire + data.dps.cold + data.dps.lightning;
    data.dps.total = data.dps.elemental + data.dps.physical + data.dps.chaos;

    return data;
}

function getDamageRange(pattern: RegExp, itemtext: string): DamageRange {
    const data: DamageRange = {
        min: 0,
        max: 0,
    };

    const match = pattern.exec(itemtext);
    if (match) {
        data.min = parseInt(match[1], 10);
        data.max = parseInt(match[2], 10);
    }

    return data;
}

function calculateDPS(damage: DamageRange, aps: number): number {
    const dps: number = ((damage.min + damage.max) / 2) * aps;

    return +dps.toFixed(2);
}
