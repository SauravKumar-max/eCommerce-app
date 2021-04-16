import { useProduct } from "../context/product-context";
import { useProductDetails } from "../context/productpage-context";
import { Link } from "react-router-dom";



export function ProductCard(){
    const {data, state} = useProduct();
    const { dispatchCart, cartState } = useProductDetails();

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

    function getSearchData(productData, searchInputValue){
        return productData.filter((item) =>
        item.name.toLowerCase().includes(searchInputValue)
      );
    }

    function priceRangeFiltered(productData, range){
        return productData.filter(item => parseInt(item.price, 10) < range);
    }
    
    const searchResultData = getSearchData(data, state.searchInputValue );
    const priceRangeData = priceRangeFiltered( searchResultData, state.priceRange )
    const sortedData = getSortedData(priceRangeData, state.sortBy);
    const filteredData = getFilteredData(sortedData, state.showInventoryAll, state.showFastDeliveryOnly)

    return(
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem"
            }}>
            {filteredData === [] ? <h2>No Data Found</h2> : filteredData.map(item => {
                return(
                    
                    <div style={{ border: "solid 1px #adadad" }} key={item.id} className="card-bdg">
                        <img onClick={ () => dispatchCart({type: "SHOW_PRODUCT", payload: item}) } className="card-img" src={item.image} alt={item.name}/>
                        <div className="wishlist-heart">
                            <p>{cartState.itemsInWishList.find(element => element.id === item.id) ?
                              <i onClick={() => dispatchCart({type: "REMOVE_FROM_WISHLIST", payload: item.id})} className="fas fa-heart"></i> : 
                              <i onClick={() => dispatchCart({type: "ADD_TO_WISHLIST", payload: item})} className="far fa-heart"></i>}
                            </p>
                        </div>
                        <div className="card-info" style={{padding: "0.5rem 1rem 0 1rem"}}>
                            <p style={{fontSize: "0.9rem"}} className="brand">{item.name}</p>
                            <small>{item.brand}</small>
                            
                            <div className="price-details" >
                                <p className="price">Rs. {item.price}</p>
                                <p className="offer" style={{padding: "0 0.5rem"}}> ({item.offer}) </p>
                            </div>
                            <div className="card-btn">
                                {
                                    cartState.itemsInCart.find(element => element.id === item.id) ? 
                                    <Link to="/cart" className="secondary-link" > <i className="fas fa-arrow-right"></i> Go to Cart </Link>
                                    :
                                    <button className={ item.inStock ? "text-icon-btn" : "text-icon-btn out-of-stock"}
                                        disabled={!item.inStock} 
                                        onClick={ () => dispatchCart({type: "ADD_TO_CART", payload: item})}>
                                        <i className="fas fa-shopping-cart"></i>
                                        {item.inStock ? "Add To Cart" : "Out of Stock"}
                                    </button>
                                }
                            </div>
                        </div>

                       
                    </div>
                )
            })}
        </div>
    )
}