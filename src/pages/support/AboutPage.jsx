import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, Users, HeartHandshake, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">About Us</span>
        </nav>

        {/* Section 1: Hero Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
          <div className="space-y-5">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block">
              Our Journey & Mission
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              Welcome to Shaasya Swornam Pvt. Ltd.
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Where nature meets purity. We are a dedicated team of passionate agriculturalists, scientists, and environmentalists committed to delivering the finest organic products that nourish both your body and the planet.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Founded on the bedrock principles of sustainability, health, and uncompromising quality, Shaasya Swornam is more than just a brand – it’s a nationwide movement toward a cleaner, greener tomorrow.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs">
              <div>
                <span className="text-2xl font-bold font-serif text-primary block">100%</span>
                <span className="text-gray-500">Chemical-Free Products</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-serif text-secondary block">10,000+</span>
                <span className="text-gray-500">Happy Green Homes</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-xl border-4 border-white">
            <img
              src="/img/about.jpg"
              alt="Shaasya Swornam Team and Farm"
              className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Section 2: Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Rooted in Nature, Driven by Integrity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900">Living Soil & Hydroponics</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every seedling and grain begins with ethical, organic cultivation. Free from synthetic nitrogenous fertilizers, carcinogenic pesticides, or genetic tampering.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900">Empowering Farmers</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our farmers are the true backbone of our mission. We guarantee transparent fair-trade procurement prices, supporting rural self-sufficiency across Odisha and India.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900">Purity & Assurance</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                From cold-pressing oils in traditional wooden churns to stone-grinding nutrient-dense ancient millets, our processes maintain natural nutrition in every bite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

