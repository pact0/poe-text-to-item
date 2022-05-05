export interface Affix {
  header: string;
  mod: string;
  influence: string;
  tier: number;
  isElevated: boolean;
  isNotable: boolean;
  isQualityEnhanced: boolean;
  affixType: string;
  modName: string;
  type: string;
  modFormatted: string;
  modFormattedNoParentheses: string;
  modValues: number[];
  craftOfExile: {modgroup:number};
  modRange: string;
}
