const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? { 'Authorization': `Bearer ${user.token}` } : {};
};

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export async function createOrder(orderData) {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
}

export async function getCart() {
  const response = await fetch(`${API_URL}/cart`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  return response.json();
}

export async function addToCart(productId, quantity) {
  const response = await fetch(`${API_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }
  return response.json();
}

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/users`, { // 移除 /api
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, { // 移除 /api
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

export async function addProduct(productData) {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Failed to add product');
  }
  return response.json();
}
