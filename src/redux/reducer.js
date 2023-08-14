
const initialState = {
    userId: null
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        
        case 'authenticated':
            return {
                ...state, 
                userId: action.payload
            }

        case 'logout': 
            return {
                ...state,
                userId: null
            }

        default: 
            return state
    }
}

export default reducer