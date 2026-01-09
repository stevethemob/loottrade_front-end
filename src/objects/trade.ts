import type { Item } from "./item";

export interface trade{
    id: number;
    itemOffer: Item;
    tradeOffers: Item[];
    traderUser: string;
}