const CART_KEY = "rfh-cart";

export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product, size) => {
  const cart = getCart();

  const existingItem = cart.find(
    (item) => item.id === product.id && item.size === size,
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      size,
      quantity: 1,
    });
  }

  saveCart(cart);
};

export const removeFromCart = (id, size) => {
  const cart = getCart().filter(
    (item) => !(item.id === id && item.size === size),
  );

  saveCart(cart);
};

export const updateQuantity = (id, size, quantity) => {
  const cart = getCart();

  const item = cart.find((item) => item.id === id && item.size === size);

  if (item) {
    item.quantity = quantity;
  }

  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
