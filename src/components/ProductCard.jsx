import { useProduct } from "../context/product-context"

export function ProductCard(){
    const {data, state} = useProduct();

    function getSortedData(productData, sortBy){
        if(sortBy === "LOW_TO_HIGH"){
            return productData.sort((a, b) => a["price"] - b["price"]);
        }
        if(sortBy === "HIGH_TO_LOW"){
            return productData.sort((a, b) => b["price"] - a["price"])
        }
        return productData;
    }

    function getFilteredData(productData, showInventoryAll, showFastDeliveryOnly){
            return productData
                .filter(( {fastDelivery} ) => showFastDeliveryOnly ? fastDelivery : true)
                .filter(( {inStock} ) => showInventoryAll ? true: inStock)
    }
    
    const sortedData = getSortedData(data, state.sortBy);
    const filteredData = getFilteredData(sortedData, state.showInventoryAll, state.showFastDeliveryOnly)
    console.log(filteredData);
    return(
        <div>
            {filteredData.map(item => {
                return(
                    
                )
                })}
        </div>
    )
}