import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

export const wocommerceAPI = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL!,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
  version: 'wc/v3',
  axiosConfig: {
    headers: {
      'X-Secret-Key': process.env.API_SECRET_KEY!,  // اینجا هدر رو ست می‌کنیم
      'Origin': process.env.ALLOWED_ORIGIN || 'http://localhost:4000'
    },
  },
});