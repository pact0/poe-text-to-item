//@ts-nocheck
import rareBases from "@bases/rareBases.json"
import uniqueBases from "@bases/uniqueBases.json"

export function getItemIcon(itemBase){
  if(itemBase.rarity !== "Unique"){
    if(itemBase.base.includes("Map")) return ""
    if(!rareBases[itemBase.base] || rareBases[itemBase.base].imgurl) return ""
    return "http://web.poecdn.com/image/Art/2DItems/" + rareBases[itemBase.base].imgurl
  } else{
    return "http://web.poecdn.com/image/Art/2DItems/" + uniqueBases[itemBase.name].icon + ".png"
  }
}
