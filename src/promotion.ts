export const PROMO_THRESHOLD=1000;
export const MAX_GIFT_QUANTITY=1;
export type Product={id:string;article:string;name:string;price:number;image:string;quantity:number;isPromotionEligible:boolean;isGift?:boolean;weight?:number};
export type DraftSelection=Record<string,number>;
// Integer kopecks keep exact thresholds stable when prices include decimals.
export function eligibleCents(cart:Product[]){return cart.reduce((sum,p)=>sum+(p.isPromotionEligible&&!p.isGift?Math.round(p.price*100)*p.quantity:0),0);}
export function eligibleSubtotal(cart:Product[]){return eligibleCents(cart)/100;}
export function giftQuantity(cart:Product[]){return eligibleCents(cart)>=PROMO_THRESHOLD*100?MAX_GIFT_QUANTITY:0;}
export function remainingAmount(cart:Product[]){return Math.max(0,PROMO_THRESHOLD*100-eligibleCents(cart))/100;}
export function giftNoun(n:number){return n%10===1&&n%100!==11?'подарок':n%10>=2&&n%10<=4&&(n%100<10||n%100>20)?'подарка':'подарков';}
export function draftSubtotal(draft:DraftSelection,catalog:Product[]){return catalog.reduce((sum,p)=>sum+Math.round(p.price*100)*(draft[p.id]||0),0)/100;}
export function changeDraft(draft:DraftSelection,id:string,delta:number):DraftSelection{const next={...draft};const qty=Math.max(0,(next[id]||0)+delta);if(qty)next[id]=qty;else delete next[id];return next;}
export function mergeDraft(cart:Product[],draft:DraftSelection,catalog:Product[]):Product[]{const next=cart.filter(p=>!p.isGift).map(p=>({...p}));for(const p of catalog){const qty=draft[p.id]||0;if(!Number.isSafeInteger(qty)||qty<=0)continue;const existing=next.find(item=>item.id===p.id);if(existing)existing.quantity+=qty;else next.push({...p,quantity:qty});}return next;}
export function canConfirm(cart:Product[],draft:DraftSelection,catalog:Product[]){return draftSubtotal(draft,catalog)>0&&giftQuantity(mergeDraft(cart,draft,catalog))>0;}
export function quantityChange(cart:Product[],id:string,delta:number){return cart.map(p=>p.id===id?{...p,quantity:Math.max(0,p.quantity+delta)}:p).filter(p=>p.quantity>0);}
export function cartSubtotal(cart:Product[],selected?:Set<string>){return cart.reduce((sum,p)=>sum+(!p.isGift&&(!selected||selected.has(p.id))?Math.round(p.price*100)*p.quantity:0),0)/100;}
