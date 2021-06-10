import { Link } from "react-router-dom";

export function Home(){
    return(
        <div>
            <div className="home-container">
                <div style={{margin: "0 3rem",display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column"}}>
                    <h2>Upto <span>70% off</span> on your first purchase</h2>     
                    <Link to="/products" className="secondary-link">Shop Now</Link>
                </div>
                
                <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/people_tax5.svg"  alt="landing"/>
                
            </div>
        </div>
    )
}