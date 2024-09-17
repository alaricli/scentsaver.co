export function storeCartId(cartId) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cartId', cartId);
  }
}

export function getStoredCartId() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('cartId');
  }
  return null;
}
