import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import ProductCard from '../../components/products/ProductCard';
import { productService } from '../../services/productService';

export default function HomePage() {
  const [freshArrivals, setFreshArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      image: '/img/slider1.jpg',
      title: 'Experience the Pure Taste of Nature',
      cta: 'Shop Now',
      ctaLink: '/products'
    },
    {
      image: '/img/slider2.png',
      title: 'Our Premium Organic Food Selection',
      cta: 'Contact Us',
      ctaLink: '/contact'
    }
  ];

  // Carousel timer matching standard slide transition
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    productService.getFreshArrivals()
      .then((res) => {
        setFreshArrivals(res.data || []);
      })
      .catch((err) => console.error('Error fetching home products', err))
      .finally(() => setLoading(false));
  }, []);

  const produceItems = [
    { name: 'Fresh Basil', img: '/img/basil.jpeg' },
    { name: 'Cherry Tomatoes', img: '/img/cherry tommato.jpeg' },
    { name: 'Bell Peppers', img: '/img/bell peppers.jpeg' },
    { name: 'Baby Spinach', img: '/img/spinache.jpeg' },
    { name: 'Spring Onion', img: '/img/spring onion.jpeg' },
    { name: 'Rosemary', img: '/img/rosemary.jpeg' },
    { name: 'Lollo Rosso', img: '/img/red lollo rossolettuce.jpeg' },
    { name: 'Romaine Lettuce', img: '/img/romaine.jpeg' },
    { name: 'Coriander', img: '/img/corianer.jpeg' },
    { name: 'Chinese Cabbage', img: '/img/chinese cabbage.jpeg' }
  ];

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="pb-16">
      {/* 1. Hero Carousel - First slide CTA 'Shop Now' -> /products */}
      <section className="relative w-full p-0 m-0 overflow-hidden bg-black select-none">
        <div id="header-carousel" className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[650px] flex items-center">
          {/* Animated Background Image with original .carousel-plant zoom */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              key={activeSlide}
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center carousel-plant"
            />
            {/* Dark gradient overlay for readable caption text */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Carousel Caption */}
          <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 flex items-center">
            <div className="max-w-2xl text-left">
              <h1
                key={`heading-${activeSlide}`}
                className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-[1.15] drop-shadow-md slideInDown"
              >
                {currentSlide.title}
              </h1>
              <div key={`btn-${activeSlide}`} className="slideInDown">
                <Link
                  to={currentSlide.ctaLink}
                  className="inline-block px-8 sm:px-10 py-3.5 sm:py-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-full text-sm sm:text-base shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {currentSlide.cta}
                </Link>
              </div>
            </div>
          </div>

          {/* Previous / Next Controls */}
          <button
            onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveSlide((prev) => (prev === 1 ? 0 : 1))}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* 2. Quick Features Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
            <img src="/img/quick1.png" alt="Free delivery" className="h-16 w-auto object-contain mb-4" />
            <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
              Quick, No-Cost Delivery & Setup Included
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
            <img src="/img/quick2.png" alt="Money back" className="h-16 w-auto object-contain mb-4" />
            <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
              30-Day, No-Risk Money-Back Assurance
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
            <img src="/img/quick3.png" alt="Support" className="h-16 w-auto object-contain mb-4" />
            <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
              24/7 Expert Help, Always Just a Click Away
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
            <img src="/img/quick4.png" alt="Payment" className="h-16 w-auto object-contain mb-4" />
            <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
              Doorstep Cash on Delivery (COD) Available
            </p>
          </div>
        </div>
      </section>

      {/* 3. Produce Marquee Ticker */}
      <section className="bg-emerald-950 text-white py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
                Our Produce
              </span>
              <h3 className="text-2xl font-serif font-bold text-primary mt-0.5">
                Quality Vegetables & Exotic Fruits
              </h3>
            </div>
            <p className="text-xs text-emerald-200 max-w-sm text-center sm:text-right">
              Discover a lush oasis of verdant greens, fragrant wonders, and exotic treasures flourishing in our hydroponic gardens.
            </p>
          </div>
        </div>

        {/* CSS Ticker */}
        <div className="relative w-full overflow-hidden py-3">
          <div className="animate-marquee flex items-center space-x-6">
            {[...produceItems, ...produceItems].map((prod, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 bg-emerald-900/90 px-4 py-2 rounded-full border border-emerald-800 shadow-sm flex-shrink-0"
              >
                <img
                  src={prod.img}
                  alt={prod.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                />
                <span className="text-xs font-medium text-white whitespace-nowrap">
                  {prod.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Fresh Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Fresh Arrivals
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Hand-picked healthy seedlings, contemporary planters, and wholesome organic staples.
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-primary hover:underline flex items-center space-x-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {freshArrivals.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Why Shop With Us? Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <img
              src="/img/plant4.png"
              alt="Why shop with us"
              className="max-h-80 w-auto object-contain drop-shadow-xl"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Why Shop With Us?
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              At <b>Shaasya Swornam Pvt. Ltd.</b>, we strive to redefine your shopping experience by offering unmatched quality and service. Here’s why choosing us is the best decision for your organic needs:
            </p>

            <ul className="space-y-3 text-xs text-gray-600 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <div>
                  <strong className="text-gray-900">100% Organic and Natural Products :</strong> Every product we offer is sourced and crafted with care, ensuring it’s free from harmful chemicals, synthetic additives, and preservatives.
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <div>
                  <strong className="text-gray-900">Commitment to Sustainability :</strong> We prioritize eco-friendly practices at every stage, from farming to packaging, supporting a greener, healthier planet.
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <div>
                  <strong className="text-gray-900">Supporting Local Farmers :</strong> Our partnership with dedicated farmers ensures ethical sourcing and fair trade practices.
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <div>
                  <strong className="text-gray-900">Wide Range of Offerings :</strong> From fresh produce to herbal remedies and organic lifestyle products, we are your one-stop shop.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Our Features Section (Appears after Why Shop With Us) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Our Features</h2>
          <p className="text-xs text-gray-500 mt-2">
            At <b>Shaasya Swornam Pvt. Ltd.</b>, we pride ourselves on offering an unparalleled organic experience, powered by innovation, sustainability, and a customer-first approach.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
            <img src="/img/icon1.png" alt="Wide Variety of Plants" className="h-16 w-auto mb-4" />
            <h4 className="font-serif font-bold text-base text-gray-900 mb-2">Wide Variety of Plants</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              From vibrant ornamentals to nutrient-rich edibles, our collection brings the best of nature to your doorstep.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
            <img src="/img/icon2.png" alt="Easy Online Shopping" className="h-16 w-auto mb-4" />
            <h4 className="font-serif font-bold text-base text-gray-900 mb-2">Easy Online Shopping</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Seamless guest ordering with doorstep Cash on Delivery, bringing healthy living straight to your door.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
            <img src="/img/icon3.png" alt="Expert Gardening Advice" className="h-16 w-auto mb-4" />
            <h4 className="font-serif font-bold text-base text-gray-900 mb-2">Expert Gardening Advice</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Tailored professional advice and agronomy support to guide you at every step of your growing journey.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
            <img src="/img/icon4.png" alt="Eco-friendly Products" className="h-16 w-auto mb-4" />
            <h4 className="font-serif font-bold text-base text-gray-900 mb-2">Eco-friendly Products</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sustainable biological inputs and recyclable packaging designed to minimize environmental impact.
            </p>
          </div>
        </div>
      </section>

      {/* 7. About Us Section (Appears after Our Features) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/img/about.jpg"
              alt="Shaasya Swornam Farm"
              className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              About Us
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Welcome to <b>Shaasya Swornam Pvt. Ltd.</b>, where nature meets purity. We are a dedicated team of passionate individuals committed to delivering the finest organic products that nourish both your body and the planet.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Founded on the principles of sustainability, health, and quality, <b>Shaasya Swornam Pvt. Ltd.</b> is more than just a brand – it’s a movement toward a healthier and greener future. We believe that embracing organic living is not just a choice; it’s a responsibility we owe to ourselves and the generations to come.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              At Shaasya Swornam, our journey begins with the soil. Every product we offer is cultivated with care, free from harmful chemicals and pesticides, ensuring that you receive the purest essence of nature in every bite, sip, or touch.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-block px-8 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-full text-xs font-bold shadow-md transition"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Firm Visit Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">
              Visit Our <b>Shaasya Swornam Pvt. Ltd.</b>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              We invite you to come and explore Our <b>Shaasya Swornam Pvt. Ltd.</b>, where your gardening dreams come to life. Our nursery is a vibrant oasis filled with a diverse selection of plants, gardening supplies, and expert advice.
            </p>
          </div>
          <div>
            <Link
              to="/contact"
              className="inline-block px-8 py-3.5 bg-secondary hover:bg-secondary-hover text-white text-xs font-bold rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Visit Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
