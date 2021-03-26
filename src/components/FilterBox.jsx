import { useProduct } from "../context/product-context";

export function FilterBox(){
    const { dispatch } = useProduct();
    return (
        <div>
            <h3>Filters</h3>
            <div>
                <p>Price</p>
                <label>
                    <input 
                    type="radio"
                    name="price-sort"
                    onClick={() => {
                        dispatch({type: "SORT", payload: "LOW_TO_HIGH"})
                    }}
                    />
                    Low to High
                </label>

                <label>
                    <input 
                    type="radio"
                    name="price-sort"
                    onClick={() => {
                        dispatch({type: "SORT", payload: "HIGH_TO_LOW"})
                    }}/>
                    High to Low
                </label>
            </div>
            <div>
                <p>Gender</p>
                <label>
                    <input 
                    type="radio"
                    name="gender"/>
                    Women
                </label>

                <label>
                    <input 
                    type="radio"
                    name="gender"/>
                    Men
                </label>
            </div>
            <div>
                <p>Avability</p>
                <label>
                    <input 
                    type="checkbox"
                    onClick={() => dispatch({ type: "TOGGLE_INVENTORY" })}/>
                    Include Out of Stock
                </label>

                <label>
                    <input 
                    type="checkbox"
                    onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}/>
                    Fast Delivery Only
                </label>
            </div>
        </div>
    )
}