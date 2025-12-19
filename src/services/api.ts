import axios from 'axios';

// Base API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    apiClient.post('/auth/login', { email, password }),
  
  register: (data: any) => 
    apiClient.post('/auth/register', data),
  
  // Use /me endpoint (matches backend)
  getProfile: () => 
    apiClient.get('/me'),
  
  updateProfile: (data: any) => 
    apiClient.put('/profile', data),
  
  changePassword: (data: any) => 
    apiClient.post('/auth/change-password', data),

  deleteAccount: (password: string) =>
    apiClient.delete('/profile', { data: { password } }),
};

// Premium Packages API
export const packagesAPI = {
  getAll: () => 
    apiClient.get('/premium-packages'),
};

// Payment API
export const paymentAPI = {
  create: (premiumPackageId: number, promoCode: string | null = null) => 
    apiClient.post('/payment/create', {
      premium_package_id: premiumPackageId,
      promo_code: promoCode,
    }),
  
  getStatus: (paymentId: string) => 
    apiClient.get(`/payment/${paymentId}`),
  
  getUserPayments: () => 
    apiClient.get('/payment'),
};

// Promo Code API
export const promoCodeAPI = {
  validate: (code: string, premiumPackageId: number) => 
    apiClient.post('/promo-codes/validate', {
      code,
      premium_package_id: premiumPackageId,
    }),
};

// Referral API
export const referralAPI = {
  getMyInfo: () => 
    apiClient.get('/referral/info'),
  
  getRedemptions: () => 
    apiClient.get('/referral/redemptions'),
};

// Conversation API
export const conversationAPI = {
  getAll: () =>
    apiClient.get('/conversations'),
  
  getById: (id: string) =>
    apiClient.get(`/conversations/${id}`),
  
  create: (data: any) =>
    apiClient.post('/conversations', data),
  
  delete: (id: string) =>
    apiClient.delete(`/conversations/${id}`),
  
  sendMessage: (conversationId: string, message: string) =>
    apiClient.post(`/conversations/${conversationId}/messages`, { message }),
};

export default apiClient;
