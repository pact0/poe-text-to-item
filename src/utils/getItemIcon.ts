import rareBases from "@bases/rareBases.json"
import uniqueBases from "@bases/uniqueBases.json"

export function getItemIcon(itemBase:any){
  if(itemBase.rarity !== "Unique"){

    if(itemBase.base.includes("Map")) return ""

    return "http://web.poecdn.com/image/Art/2DItems/" + rareBases[itemBase.base as keyof typeof rareBases].imgurl
  } else{
    const base =uniqueBases[itemBase.name as keyof typeof uniqueBases] as any
    return "http://web.poecdn.com/image/Art/2DItems/" + base.icon + ".png"
  }
}
