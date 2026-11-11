import {MAX_GIFT_QUANTITY} from './promotion';
export const GIFT_OPTION_IDS=['gift-tape','gift-seal','gift-plaster'] as const;
export type GiftOptionId=typeof GIFT_OPTION_IDS[number];
const selectionQuota=(quota:number)=>Math.min(MAX_GIFT_QUANTITY,Math.max(0,Math.floor(quota)));
export function normalizeGiftSelections(selections:string[],quota:number):GiftOptionId[]{return selections.filter((id):id is GiftOptionId=>GIFT_OPTION_IDS.includes(id as GiftOptionId)).slice(0,selectionQuota(quota));}
export function addGift(selections:GiftOptionId[],id:string,quota:number):GiftOptionId[]{const current=normalizeGiftSelections(selections,quota);if(!GIFT_OPTION_IDS.includes(id as GiftOptionId)||current.length>=selectionQuota(quota))return current;return [...current,id as GiftOptionId];}
export function removeGift(selections:GiftOptionId[],id:GiftOptionId){return selections.filter(value=>value!==id);}
export function giftCounts(selections:GiftOptionId[]){return selections.reduce<Partial<Record<GiftOptionId,number>>>((counts,id)=>{counts[id]=(counts[id]||0)+1;return counts;},{});}
export function canConfirmGifts(draft:GiftOptionId[],applied:GiftOptionId[],quota:number){const normalized=normalizeGiftSelections(draft,quota);return quota>0&&normalized.length===selectionQuota(quota)&&normalized.length===draft.length&&[...normalized].sort().join('|')!==[...normalizeGiftSelections(applied,quota)].sort().join('|');}
