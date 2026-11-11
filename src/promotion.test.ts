import {describe,it,expect} from 'vitest';
import {initialCart,recommendations,gift} from './data';
import {PROMO_THRESHOLD,MAX_GIFT_QUANTITY,eligibleSubtotal,giftQuantity,remainingAmount,canConfirm,mergeDraft,quantityChange,changeDraft,cartSubtotal} from './promotion';
const at=(price:number)=>[{...initialCart[0],price,quantity:1}];
describe('Type 4 — one gift from 1000 ₽, never multiple',()=>{
 it.each([[0,0,1000],[555,0,445],[999,0,1],[999.99,0,.01],[1000,1,0],[1000.01,1,0],[1999,1,0],[2000,1,0],[3000,1,0],[10000,1,0],[1000000,1,0]])('%s ₽ grants %s gift and leaves %s ₽',(sum,qty,remaining)=>{expect(giftQuantity(at(sum))).toBe(qty);expect(remainingAmount(at(sum))).toBeCloseTo(remaining,2);});
 it('initial promo subtotal is 555 ₽ regardless of unrelated goods',()=>{expect(eligibleSubtotal(initialCart)).toBe(555);expect(giftQuantity(initialCart)).toBe(0);expect(PROMO_THRESHOLD).toBe(1000);expect(MAX_GIFT_QUANTITY).toBe(1);});
 it('444 ₽ produces 999 ₽ and cannot confirm; two units can confirm',()=>{expect(canConfirm(initialCart,{plaster:1},recommendations)).toBe(false);expect(canConfirm(initialCart,{plaster:2},recommendations)).toBe(true);});
 it('700 ₽ unlocks one gift; many units still unlock only one',()=>{const next=mergeDraft(initialCart,{adhesive:1},recommendations);expect(eligibleSubtotal(next)).toBe(1255);expect(giftQuantity(next)).toBe(1);expect(giftQuantity(mergeDraft(next,{adhesive:100},recommendations))).toBe(1);});
 it('losing the threshold removes eligibility and restoring it returns just one slot',()=>{const next=mergeDraft(initialCart,{adhesive:1},recommendations);const less=quantityChange(next,'adhesive',-1);expect(giftQuantity(less)).toBe(0);expect(remainingAmount(less)).toBe(445);expect(giftQuantity(mergeDraft(less,{adhesive:20},recommendations))).toBe(1);});
 it('drafts never mutate the cart; repeated products merge without duplicates',()=>{const old=JSON.stringify(initialCart);const first=mergeDraft(initialCart,{adhesive:1},recommendations);const next=mergeDraft(first,{adhesive:2},recommendations);expect(next.filter(p=>p.id==='adhesive')).toHaveLength(1);expect(next.find(p=>p.id==='adhesive')?.quantity).toBe(3);expect(JSON.stringify(initialCart)).toBe(old);expect(changeDraft({adhesive:1},'adhesive',-1)).toEqual({});});
 it('non-promo products and gifts never unlock the promotion or charge for a gift',()=>{expect(giftQuantity([...initialCart.filter(p=>!p.isPromotionEligible),{...gift,price:99999}])).toBe(0);expect(cartSubtotal([...initialCart,{...gift,price:1000}])).toBe(cartSubtotal(initialCart));expect(cartSubtotal(initialCart,new Set(['ultra-fix']))).toBe(555);});
 it('empty paid selection cannot be confirmed',()=>{expect(canConfirm(initialCart,{},recommendations)).toBe(false);});
});
