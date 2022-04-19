export const prepareText = (text: string): string => {
 let newText = text.replace("Searing Exarch Item", "");
  newText = newText.replace("Eater of Worlds Item", "");
  return newText.replace(/^[\r\n]+|\.|[\r\n]+$/g, "");
}

export const removeEmptyFromArray = (arr:any[])=> {
  return arr.filter((x)=> {return x !=="" || x === undefined});
}

export const checkIfBlockContains = (block:string, text:RegExp)=>{
  return block.match(text);
}

export const getMatchAsNumber = (pattern: RegExp, target: string): number | undefined => {
    const match = pattern.exec(target);

    if (match) {
        return parseFloat(match[1]);
    }
};

export const getMatchAsString = (pattern: RegExp, target: string): string | undefined => {
    const match = pattern.exec(target);

    if (match) {
        return match[1];
    }
};
