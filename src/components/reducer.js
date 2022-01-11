export const reducer = (state, action) => {

    if (action.type === "REMOVE_ITEM") {
        return {
            ...state,
            item: state.item.filter((curelem) => {
                return curelem.id !== action.payload;
            })
        }
    }

    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            item: []
        }
    }

    if (action.type === "INCREMENT") {
        const updatedCart = state.item.map((curElem) => {
            if (curElem.id === action.payload) {
                return { ...curElem, quantity: curElem.quantity + 1 };
            }
            return curElem;
        });
        return { ...state, item: updatedCart };
    }

    if (action.type === "DECREMENT") {
        const updatedNewCart = state.item.map((curElem) => {
            if (curElem.id === action.payload) {
                return { ...curElem, quantity: curElem.quantity - 1 };
            }
            return curElem;
        }).filter((curElem) => curElem.quantity !== 0);
        return { ...state, item: updatedNewCart };
    }

    if (action.type === "GET_TOTAL") {
        let { totalItem } = state.item.reduce((accum, curVal) => {
            let { quantity } = curVal;
            accum.totalItem += quantity;
            return accum;
        }, {
            totalItem: 0,
        });
        return { ...state, totalItem };
    }

    if (action.type === "GET_AMOUNT") {
        let { totalAmount } = state.item.reduce((accum, curVal) => {
            let { price, quantity } = curVal;
            let updatedTotalAmount = price * quantity;
            accum.totalAmount += updatedTotalAmount;
            return accum;
        }, {
            totalAmount: 0,
        });
        return { ...state, totalAmount };
    }

    return state;
};