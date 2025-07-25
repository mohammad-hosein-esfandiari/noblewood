"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CreditCard, MapPin, User, Phone, Mail } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
}

export default function CheckoutPage() {
  const { state } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'online',
  });
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store order data in localStorage (in real app, send to backend)
    const orderData = {
      id: Date.now(),
      items: state.items,
      total: state.total,
      customerInfo: formData,
      orderDate: new Date().toISOString(),
      status: 'pending',
    };

    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    
    setIsLoading(false);
    router.push('/payment');
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            سبد خرید شما خالی است
          </h1>
          <p className="text-gray-600 mb-8">
            برای ادامه فرآیند خرید، ابتدا محصولاتی به سبد خرید خود اضافه کنید.
          </p>
          <Link
            href="/"
            className="bg-amber-600 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transition-colors duration-200"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center space-x-2 rtl:space-x-reverse text-amber-600 hover:text-amber-700 transition-colors duration-200 mb-4"
          >
            <ArrowRight className="w-5 h-5" />
            <span>بازگشت به سبد خرید</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            تکمیل سفارش
          </h1>
          <p className="text-gray-600">
            اطلاعات خود را وارد کنید تا سفارش شما تکمیل شود
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                  <User className="w-5 h-5 text-amber-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    اطلاعات شخصی
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      نام *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="نام خانوادگی خود را وارد کنید"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      ایمیل *
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      شماره تماس *
                    </label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="09123456789"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    آدرس ارسال
                  </h2>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    آدرس کامل *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="آدرس کامل خود را وارد کنید"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      شهر *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="نام شهر"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                      کد پستی *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="1234567890"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    روش پرداخت
                  </h2>
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 rtl:space-x-reverse p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-amber-600"
                    />
                    <span className="font-medium">پرداخت آنلاین</span>
                    <span className="text-sm text-gray-500">- درگاه پرداخت امن</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 rtl:space-x-reverse p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-amber-600"
                    />
                    <span className="font-medium">پرداخت در محل</span>
                    <span className="text-sm text-gray-500">- پرداخت هنگام تحویل</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'در حال پردازش...' : 'تکمیل سفارش'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              خلاصه سفارش
            </h2>
            
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 rtl:space-x-reverse">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="w-15 h-15 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">تعداد: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">قیمت کالاها</span>
                <span className="font-medium">{formatPrice(state.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">هزینه ارسال</span>
                <span className="font-medium text-green-600">رایگان</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>مجموع</span>
                <span className="text-amber-700">{formatPrice(state.total)}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-800">
                🚚 ارسال رایگان برای سفارش‌های بالای ۵ میلیون تومان
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}