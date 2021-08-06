export function Loader({ color }){
    return (
        <div 
            className="loader"
            style={{
                border: `solid 3px ${color}`,
                borderRightColor: "transparent"
            }}
        >
        </div>

    )
}