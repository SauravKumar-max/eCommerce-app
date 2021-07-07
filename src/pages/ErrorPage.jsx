export function ErrorPage(){
    return (
        <div style={{fontSize: "3rem", fontWeight: "bold", textAlign: "center", margin: "6rem", color: "red" }}>
            <p style={{margin: "2rem"}}>404</p>
            <p>Page Not Found</p>
            <i style={{fontSize: "7rem", margin: "2rem"}} className="fas fa-exclamation-triangle"></i>
        </div>
    )
}