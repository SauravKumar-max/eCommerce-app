export function Navbar(){
    return(
        <div>
            <nav className="navbar">
            <p>MyMart</p>

            <div className="hamburger">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <ul className="navbar-lists">
                <li><a href="https://maximuss-component.netlify.app/">Products</a></li>
                <li><a href="https://www.google.com/">Cart</a></li>
                <li><a href="https://www.youtube.com/">WishList</a></li>
            </ul>
        </nav>
        </div>
    )
}