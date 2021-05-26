export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';

export const addToCart = product =>{
    // alert('caught')
    return {
        type: ADD_TO_CART,
        product: product,
    };
}; 

export const removeFromCart = productId => {
    return {
        type: REMOVE_FROM_CART,
        productId: productId,
    };
};

export const totallyDeleteFromCart = (productId) => {
	return {
		type: DELETE_FROM_CART,
		productId: productId,
	};
};