import rareBases from "@bases/rareBases.json"
import uniqueBases from "@bases/uniqueBases.json"

export function getItemIcon(itemBase){
  if(itemBase.rarity !== "Unique"){
    if(itemBase.base.includes("Map")) return ""
    return "http://web.poecdn.com/image/Art/2DItems/" + rareBases[itemBase.base].imgurl
  } else{
    return "http://web.poecdn.com/image/Art/2DItems/" + uniqueBases[itemBase.name].icon + ".png"
  }
}
