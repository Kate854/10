import type {Product} from './promotion';
import type {GiftOptionId} from './gifts';
import tape from './assets/tape.svg?raw';
import seal from './assets/seal.svg?raw';
import pink from './assets/pink.svg?raw';
import bag from './assets/bag.svg?raw';
import paint from './assets/paint.svg?raw';
import brand from './assets/brand.svg?raw';
import vetonit from './assets/vetonit.svg?raw';
import cement from './assets/cement.svg?raw';
import green from './assets/cement-green.svg?raw';
import red from './assets/cement-red.svg?raw';
import giftImage from './assets/gift.svg?raw';
const uri=(svg:string)=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
export const logo=uri(brand);
export const images={pink:uri(pink),bag:uri(bag),paint:uri(paint),vetonit:uri(vetonit),cement:uri(cement),green:uri(green),red:uri(red),gift:uri(giftImage)};
// Prototype 10 / Type 4: five recommendations shown in the new mockups, plus the initial promotion product.
export const recommendations:Product[]=[
{id:'plaster',article:'202722',name:'Штукатурка декор. акриловая Церезит CT 64 короед 2,0 мм база, 25 кг',price:444,image:images.pink,quantity:0,isPromotionEligible:true,weight:25},
{id:'adhesive',article:'202722',name:'Клей для мозаики и мрамора Церезит CM 115 белый (5 кг)',price:700,image:images.bag,quantity:0,isPromotionEligible:true,weight:5},
{id:'cement-500',article:'202722',name:'Цемент ЦЕМ II/А-Ш 42,5Н, М-500, Д20 (50 кг)',price:578,image:images.cement,quantity:0,isPromotionEligible:true,weight:50},
{id:'cement-400',article:'202722',name:'Цемент Цемрос ЦЕМ II/А-Ш 32,5Н, М-400, Д20 (50 кг)',price:624,image:images.green,quantity:0,isPromotionEligible:true,weight:50},
{id:'cement-500-i',article:'202722',name:'Цемент Цемрос ЦЕМ I 42,5Н, М-500',price:662,image:images.red,quantity:0,isPromotionEligible:true,weight:50}
];
export const initialCart:Product[]=[
{id:'ultra-fix',article:'007564',name:'Клей для плитки Vetonit Ultra Fix, эластичный, высокодеформативный C2 T S1 (25 кг)',price:555,image:images.vetonit,quantity:1,isPromotionEligible:true,weight:25},
{id:'paint',article:'007564',name:'Краска для стен и потолков Pufas Decoself мороз. (2,7 кг)',price:44120,image:images.paint,quantity:1,isPromotionEligible:false,weight:2.7},
{id:'decor',article:'103516',name:'Затирка Weber Vetonit Декор, бежевый, 2 кг',price:44120,image:images.bag,quantity:1,isPromotionEligible:false,weight:2},
{id:'granit-fix',article:'007564',name:'Клей для керамогранита крупного формата Vetonit Granit Fix C2 T (25 кг)',price:967,image:images.vetonit,quantity:1,isPromotionEligible:false,weight:25}
];
export const gift:Product={id:'gift',article:'тов-170227',name:'Герметик силиконовый Vetonit Comfort Sil серый 06 (280 мл)',price:0,image:images.gift,quantity:1,isPromotionEligible:false,isGift:true};

export type GiftOption={id:GiftOptionId;name:string;article:string;image:string;pack:string};
export const giftOptions:GiftOption[]=[
{id:'gift-tape',name:'Лента армирующая Knauf Курт 50 мм x 25 м',article:'202722',image:uri(tape),pack:'4 рул.'},
{id:'gift-seal',name:'Лента уплотнительная Knauf Дихтунгсбанд, 0,03x30 м',article:'202722',image:uri(seal),pack:'2 рул.'},
{id:'gift-plaster',name:'Штукатурка декор. акриловая Церезит CT 64 короед 2,0 мм база, 25 кг',article:'202722',image:images.pink,pack:'1 шт.'}
];
