import { Product } from "../context/context.types";

export function getSortedData(productData:Product[], sortBy: string | null):Product[]{
    if(sortBy === "LOW_TO_HIGH"){
        return productData.sort((a, b) => a["price"] - b["price"]);
    }
    if(sortBy === "HIGH_TO_LOW"){
        return productData.sort((a, b) => b["price"] - a["price"])
    }
    if(sortBy === "RATING"){
        return productData.sort((a, b) => b["ratings"] - a["ratings"])
    }
    return productData;
}

export function getFilteredData(productData:Product[], showInventoryAll: boolean, showFastDeliveryOnly: boolean):Product[]{
        return productData
            .filter(( {fastDelivery} ) => showFastDeliveryOnly ? fastDelivery : true)
            .filter(( {inStock} ) => showInventoryAll ? true: inStock)
}

export function getSearchData(productData: Product[], searchInputValue: string):Product[]{
    return productData.filter((item) =>
    item.name.toLowerCase().includes(searchInputValue.toLowerCase())
  );
}

export function priceRangeFiltered(productData:Product[], range: number | number[]):Product[]{
    return productData.filter(item => item.price < range);
}