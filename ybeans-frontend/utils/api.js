const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// 确保这个函数被定义并导出
export const getAuthHeader = () => {
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
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

export async function addProduct(productData) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: productData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error:', errorData);
      throw new Error(errorData.message || 'Failed to add product');
    }
    return response.json();
  } catch (error) {
    console.error('Error in addProduct:', error);
    throw error;
  }
}

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const deleteProduct = async (id) => {
  console.log('Attempting to delete product with id:', id);
  console.log('Auth header:', getAuthHeader());
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  const responseData = await response.json();
  console.log('Delete product response:', response.status, responseData);
  if (!response.ok) {
    console.error('Delete product error:', responseData);
    throw new Error(responseData.message || 'Failed to delete product');
  }
  return responseData;
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product');
  }
  return response.json();
};

export const getOrders = async () => {
  const response = await fetch(`${API_URL}/orders`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
};

export const updateOrderStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error('Failed to update order status');
  }
  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    headers: getAuthHeader(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const updateUserRole = async (id, isAdmin) => {
  const response = await fetch(`${API_URL}/users/${id}/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ isAdmin }),
  });
  if (!response.ok) {
    throw new Error('Failed to update user role');
  }
  return response.json();
};

export const getImageUrl = (imageUrl) => {
  return `${API_URL}${imageUrl}`;
};
