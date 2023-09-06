const initialState = {
    userId: null,
    itemId: null,
    show: "search",
}

const reducer = (state=initialState, action) => {
    switch(action.type) {

        case 'authenticated':
            return {
                ...state,
                userId: action.payload,
            }

        case 'logout':
            return {
                ...state,
                userId: null,
                show: "search",
            }

        case 'SET_SHOW':
            return {
                ...state,
                show: action.payload,
            }

        case 'SET_ITEM':
            return {
                ...state,
                show: action.payload,
            }

        default:
            return state
    }
}

export default reducer