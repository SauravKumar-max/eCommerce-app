import { useProduct } from "../context/product-context";

export function FilterBox(){
    const { state, dispatch } = useProduct();
    const { showInventoryAll, showFastDeliveryOnly, sortBy, priceRange, toggleFilter } = state;
    
    return(
        <div className="filter-box">

            <div onClick={() => dispatch({type: "TOGGLE_FILTERS"})} className="dropdown-btn">
                <button><i className="fas fa-caret-square-down"></i></button>
                <h3>Filters</h3>
            </div>

            {toggleFilter && 
            <div>
                <div className="sorting">
                    <p>Price</p>
                    <label>
                        <input 
                        type="radio"
                        name="price-sort"
                        checked={sortBy === "LOW_TO_HIGH"}
                        onChange={() => {
                            dispatch({type: "SORT", payload: "LOW_TO_HIGH"})
                        }}
                        />
                        Low to High
                    </label>

                    <label>
                        <input 
                        type="radio"
                        name="price-sort"
                        checked={sortBy === "HIGH_TO_LOW"}
                        onChange={() => {
                            dispatch({type: "SORT", payload: "HIGH_TO_LOW"})
                        }}/>
                        High to Low
                    </label>

                </div>

                <div className="avability">
                    <p>Avability</p>
                    <label>
                        <input 
                        type="checkbox"
                        checked={ showInventoryAll }
                        onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}/>
                        Include Out of Stock
                    </label>

                    <label>
                        <input 
                        type="checkbox"
                        checked={ showFastDeliveryOnly }
                        onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}/>
                        Fast Delivery Only
                    </label>

                </div>

                <div className="price-range">
                    <p>Price Range</p> 
                    <label>
                        Below Rs. {priceRange}
                        <input 
                            value={priceRange}
                            onChange={(e) => dispatch({type: "PRICE_RANGE", payload: e.target.value})} 
                            type="range" 
                            max="1000" 
                        />
                    </label>
                </div>

            </div>
            }  
        </div>
    )
}

    