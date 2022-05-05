import { Affix } from "./Affix";
import { Base } from "./Base";
import { Beast } from "./Beast";
import { Flags } from "./Flags";
import { Quality } from "./Quality";
import { Defense } from "./Defense";
import { Requirements } from "./Requirements";
import { Sockets } from "./Sockets";
import { Talisman } from "./Talisman";
import { Offense } from "./Offense";
import { Map } from "./Map";
import { StackSize } from "./StackSize";

export interface Item {
  base: Base;
  flags: Flags;
  affixes: Affix[];
  talisman?: Talisman;
  quality?: Quality;
  ilvl: number;
  requirements: Requirements;
  sockets: Sockets;
  beast?: Beast;
  defences: Defense;
  offense: Offense;
  map?: Map;
  note?: string;
  stackSize?: StackSize;
}
