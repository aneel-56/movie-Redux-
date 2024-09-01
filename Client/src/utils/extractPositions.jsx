const extractPositions = (crew, position) => {
    return crew.filter((each) => {
        return each.job == position
    }).map((each) => {
        return each.name
    }).join(",")  
    
}

export default extractPositions