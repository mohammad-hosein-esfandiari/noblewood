import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

export const wocommerceAPI = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL || '',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
  version: 'wc/v3',
  axiosConfig: {
    headers: {
      'X-Secret-Key': process.env.API_SECRET_KEY || '',  // اینجا هدر رو ست می‌کنیم
      'Origin': process.env.ALLOWED_ORIGIN || 'http://localhost:4000',
      'Content-Type': 'application/json',  // اضافه کردن هدر Content-Type
      'Accept': 'application/json',  // اضافه کردن هدر Accept
      'Cache-Control': 'no-cache',  // جلوگیری از کش شدن درخواست‌ها
      'Pragma': 'no-cache',  // جلوگیری از کش شدن درخواست‌ها
      'Expires': '0',  // جلوگیری از کش شدن درخواست‌ها
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || 'http://localhost:4000',  // اضافه کردن هدر CORS
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',  // اضافه کردن هدر CORS برای متدها
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Secret-Key',  // اضافه کردن هدر CORS برای هدرها
    },
  },
  
  
});