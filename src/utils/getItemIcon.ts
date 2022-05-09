import rareBases from "@bases/rareBases.json"
import uniqueBases from "@bases/uniqueBases.json"

export function getItemIcon(itemBase:any){
  if(itemBase.rarity !== "Unique"){

    if(itemBase.base.includes("Map")) return ""

    const base = rareBases[itemBase.base as keyof typeof rareBases]
    if(!base) return ""
    return base.icon
  } else{
    const base =uniqueBases[itemBase.name as keyof typeof uniqueBases] as any
    if(!base) return ""
    return base.icon
  }
}
