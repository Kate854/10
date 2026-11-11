import type {CSSProperties} from 'react';
const paths:Record<string,React.ReactNode>={
 gift:<><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8H8a3 3 0 1 1 3-3l1 3Zm0 0h4a3 3 0 1 0-3-3l-1 3Z"/></>,
 search:<><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></>,
 trash:<><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/></>,
 heart:<path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/>,
 doc:<><path d="M6 3h9l4 4v14H6zM15 3v5h4M9 12h7M9 16h6"/></>,
 arrow:<path d="M20 12H4m6-6-6 6 6 6"/>,
 close:<path d="m6 6 12 12M18 6 6 18"/>,
 person:<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="9" r="3"/><path d="M6 18a6 6 0 0 1 12 0"/></>,
 company:<><circle cx="12" cy="12" r="9"/><path d="M8 17V7h8v10M10 10h4M10 13h4M10 17v-2h4v2"/></>,
 print:<><path d="M7 8V3h10v5M7 17H4V9h16v8h-3M7 14h10v7H7Z"/><path d="M16 11h1"/></>,
 share:<><circle cx="6" cy="12" r="3"/><circle cx="18" cy="5" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.5 10.5 7-4m-7 7 7 4"/></>,
 drop:<><path d="M12 2S4 11 4 16a8 8 0 0 0 16 0c0-5-8-14-8-14Z"/><path d="m7 16 9-9M8 20l11-11"/></>,
 check:<path d="m5 12 4 4L20 5"/>
};
export function Icon({name,size=18,style}:{name:string;size?:number;style?:CSSProperties}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name]||paths.doc}</svg>}
