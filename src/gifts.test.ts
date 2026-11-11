import {describe,it,expect} from 'vitest';
import {GIFT_OPTION_IDS,normalizeGiftSelections,addGift,removeGift,giftCounts,canConfirmGifts} from './gifts';
import {giftOptions} from './data';
import type {GiftOptionId} from './gifts';
describe('Type 4 choice and exact previous deletion/restore behavior',()=>{
 it('has exactly three gift variants',()=>{expect(giftOptions.map(g=>g.id)).toEqual([...GIFT_OPTION_IDS]);});
 it('no choice is available below the threshold',()=>{expect(addGift([],'gift-tape',0)).toEqual([]);expect(canConfirmGifts([],[],0)).toBe(false);});
 it.each(GIFT_OPTION_IDS)('can choose and confirm %s as the only gift',(id)=>{const choice=addGift([],id,1);expect(choice).toEqual([id]);expect(canConfirmGifts(choice,[],1)).toBe(true);});
 it('cannot choose two gifts or repeat one gift',()=>{const choice=addGift([],'gift-tape',1);expect(addGift(choice,'gift-seal',1)).toEqual(choice);expect(addGift(choice,'gift-tape',1)).toEqual(choice);expect(canConfirmGifts(['gift-tape','gift-seal'],[],1)).toBe(false);});
 it('even an oversized input quota is clamped to one',()=>{expect(normalizeGiftSelections(['gift-tape','gift-seal'],100)).toEqual(['gift-tape']);expect(addGift(['gift-tape'],'gift-seal',100)).toEqual(['gift-tape']);});
 it('can replace an existing gift after deselecting it in a draft',()=>{const current:GiftOptionId[]=['gift-tape'];const next=addGift(removeGift(current,'gift-tape'),'gift-seal',1);expect(current).toEqual(['gift-tape']);expect(canConfirmGifts(next,current,1)).toBe(true);expect(canConfirmGifts(current,current,1)).toBe(false);});
 it('delete/restore remembers the exact variant and never opens a second slot',()=>{const current:GiftOptionId[]=['gift-plaster'];const deleted=[...current];const remaining=removeGift(current,'gift-plaster');expect(remaining).toEqual([]);expect(normalizeGiftSelections([...remaining,...deleted],1)).toEqual(current);expect(normalizeGiftSelections([...remaining,...deleted],0)).toEqual([]);});
 it('invalid gift IDs are rejected and cancelled drafts never alter applied choices',()=>{const current:GiftOptionId[]=['gift-tape'];expect(addGift([],'invalid',1)).toEqual([]);expect(normalizeGiftSelections(['invalid','gift-seal'],1)).toEqual(['gift-seal']);const draft=removeGift([...current],'gift-tape');expect(draft).toEqual([]);expect(current).toEqual(['gift-tape']);expect(giftCounts(current)).toEqual({'gift-tape':1});});
});
