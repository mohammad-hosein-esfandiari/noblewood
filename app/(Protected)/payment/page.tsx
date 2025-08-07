"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, CreditCard, ArrowRight, Loader } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'failed'>('processing');
  const [paymentId, setPaymentId] = useState('');

  useEffect(() => {
    // Get order data from localStorage
    const storedOrder = localStorage.getItem('currentOrder');
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    } else {
      // If no order data, redirect to home
      router.push('/');
      return;
    }

    // Generate payment ID
    setPaymentId(`PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

    // Simulate payment processing
    const timer = setTimeout(() => {
      // Simulate 90% success rate
      const isSuccess = Math.random() > 0.1;
      setPaymentStatus(isSuccess ? 'success' : 'failed');
      
      if (isSuccess) {
        // Clear cart and order data on successful payment
        localStorage.removeItem('nobleWoodCart');
        localStorage.removeItem('currentOrder');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRetryPayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;
      setPaymentStatus(isSuccess ? 'success' : 'failed');
      
      if (isSuccess) {
        localStorage.removeItem('nobleWoodCart');
        localStorage.removeItem('currentOrder');
      }
    }, 3000);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {paymentStatus === 'processing' && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <Loader className="w-16 h-16 text-amber-600 mx-auto animate-spin mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                در حال پردازش پرداخت
              </h1>
              <p className="text-gray-600">
                لطفاً صبر کنید، در حال اتصال به درگاه پرداخت...
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">شماره سفارش:</span>
                <span className="font-mono font-medium">#{orderData.id}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">شماره پرداخت:</span>
                <span className="font-mono font-medium">{paymentId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">مبلغ قابل پرداخت:</span>
                <span className="text-2xl font-bold text-amber-700">
                  {formatPrice(orderData.total)}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              از این صفحه خارج نشوید تا پرداخت تکمیل شود
            </p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                پرداخت موفق!
              </h1>
              <p className="text-gray-600">
                سفارش شما با موفقیت ثبت شد و پرداخت انجام گردید.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-gray-600 block">شماره سفارش:</span>
                  <span className="font-mono font-medium">#{orderData.id}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">شماره پرداخت:</span>
                  <span className="font-mono font-medium">{paymentId}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">تاریخ پرداخت:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString('fa-IR')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 block">مبلغ پرداخت شده:</span>
                  <span className="font-bold text-green-700">
                    {formatPrice(orderData.total)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                اطلاعات کامل سفارش به ایمیل شما ارسال خواهد شد.
                سفارش شما در حال آماده‌سازی است و ظرف ۲-۳ روز کاری ارسال خواهد شد.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
                >
                  ادامه خرید
                </Link>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 transition-colors duration-200">
                  مشاهده جزئیات سفارش
                </button>
              </div>
            </div>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❌</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                پرداخت ناموفق
              </h1>
              <p className="text-gray-600 mb-4">
                متأسفانه پرداخت شما انجام نشد. لطفاً دوباره تلاش کنید.
              </p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6 mb-6">
              <div className="text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">شماره سفارش:</span>
                  <span className="font-mono font-medium">#{orderData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">شماره پرداخت:</span>
                  <span className="font-mono font-medium">{paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">مبلغ:</span>
                  <span className="font-bold text-red-700">
                    {formatPrice(orderData.total)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                ممکن است به دلایل زیر پرداخت شما ناموفق بوده باشد:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• موجودی کافی در حساب شما وجود ندارد</li>
                <li>• اطلاعات کارت بانکی اشتباه وارد شده</li>
                <li>• مشکل موقت در درگاه پرداخت</li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <button
                  onClick={handleRetryPayment}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
                >
                  تلاش مجدد
                </button>
                <Link
                  href="/checkout"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 transition-colors duration-200 inline-flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>بازگشت به تکمیل سفارش</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}