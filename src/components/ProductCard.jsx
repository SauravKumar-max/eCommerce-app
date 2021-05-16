import { useProduct } from "../context/product-context";
import { useCart } from "../context/cart-context";
import { AddToCartBtn } from "./index";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishlist-context";
import axios from "axios";

export function ProductCard(){
    const { loader, data, state, dispatch } = useProduct();
    const { cartState } = useCart();
    const { cart } = cartState;
    const { wishlistState, dispatchWishlist } = useWishlist();
    const { wishlist } = wishlistState;
    const emptyLoaderArray = [...Array(8)];

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
    const priceRangeData = priceRangeFiltered( searchResultData, state.priceRange );
    const sortedData = getSortedData(priceRangeData, state.sortBy);
    const filteredData = getFilteredData(sortedData, state.showInventoryAll, state.showFastDeliveryOnly);

    const api = "https://ecommerce-backend.sauravkumar007.repl.co/wishlists";

    const removewishlist = async (product) => {
        dispatch({type: "LOAD_LOADER"});
        try {
            await axios.delete(`${api}/${product._id}`);
            dispatchWishlist({type: "DELETE_FROM_WISHLIST", payload: product._id });
            dispatch({type: "SHOW_TOAST", payload: `${product.name} removed from Wishlist`});
            dispatch({type: "HIDE_LOADER"});
        } catch (error) {
            console.log(error);
        }
    } 


    const addToWishlist = async (product) => {
        dispatch({type: "LOAD_LOADER"});
        try {
            axios.post(api, {_id: product._id});
            dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: product });
            dispatch({type: "SHOW_TOAST", payload: `${product.name} added to Wishlist`});
            dispatch({type: "HIDE_LOADER"});
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem"
            }}>
            {loader && emptyLoaderArray.map((element, i) => <span key={i} className="loading-box"></span>)}
            {filteredData === [] ? <h2>No Data Found</h2> : filteredData.map(item => {
                return(
                    <div style={{ border: "solid 1px #adadad" }} key={item._id} className="card-bdg">
                        <img onClick={ () => dispatch({type: "SHOW_PRODUCT", payload: item}) } className="card-img" src={item.image} alt={item.name}/>
                        <div className="wishlist-heart">
                            <p>{wishlist.find(element => element._id === item._id) ?
                              <i onClick={() => removewishlist(item) } className="fas fa-heart"></i> 
                              : 
                              <i onClick={() => addToWishlist(item)} className="far fa-heart"></i>}
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
                                    cart.find(element => element._id === item._id) ? 
                                    <Link to="/cart" className="secondary-link" > <i className="fas fa-arrow-right"></i> Go to Cart </Link>
                                    :
                                    <AddToCartBtn item={item} />
                                }
                            </div>
                        </div>

                       
                    </div>
                )
            })}
        </div>
    )
}