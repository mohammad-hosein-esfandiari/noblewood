import axios from 'axios';

// ساخت نمونه axios با baseURL و timeout
const API = axios.create({
  baseURL: '/api/routes', // ← اینو بعداً عوض کن به آدرس واقعی خودت
  timeout: 10000, // 10 ثانیه
});

// اینترسپتور برای درخواست‌ها
API.interceptors.request.use(
  (config) => {
    console.log('📤 درخواست ارسال شد:', config);
    return config;
  },
  (error) => {
    console.log('❌ خطا در ارسال درخواست:', error);
    return Promise.reject(error);
  }
);

// اینترسپتور برای پاسخ‌ها
API.interceptors.response.use(
  (response) => {
    console.log('📥 پاسخ دریافت شد:', response);
    return response;
  },
  (error) => {
    console.log('❌ خطا در دریافت پاسخ:', error);
    return Promise.reject(error);
  }
);

// خروجی
export default API;
