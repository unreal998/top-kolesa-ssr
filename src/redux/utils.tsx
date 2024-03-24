import { ShopItemAPI } from "@/shared/types";

export function sortItemsList(sortParam: string, itemsList: ShopItemAPI[]) {
  switch (sortParam) {
    case 'priceHigh':
      itemsList.sort((a, b) => b.price_uah - a.price_uah);
      break;
    case 'priceLow':
      itemsList.sort((a, b) => a.price_uah - b.price_uah);
      break;
    case 'rated':
      itemsList.sort((a, b) => b.rate - a.rate);
      break;
    case 'date':
      itemsList.sort((a, b) => b.year - a.year);
      break;
    default:
      break;
  }
  return itemsList;
}
