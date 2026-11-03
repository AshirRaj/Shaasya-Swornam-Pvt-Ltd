import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, CheckCircle2, ArrowRight, ChevronRight, Phone, Mail } from 'lucide-react';
import { SERVICES_DATA } from '../../data/services';

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-semibold">Hydroponic & Farming Services</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
          <div className="space-y-4">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block">
              Sustainable Agriculture
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              Transforming Agriculture with Innovative Hydroponic Solutions
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              At <strong>Shaasya Swornam Pvt. Ltd.</strong>, we push traditional agricultural boundaries to pioneer climate-smart, soilless food production. Our cutting-edge hydroponic systems reduce water usage by up to 90% while guaranteeing year-round bountiful harvests.
            </p>

            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Turnkey Commercial and Rooftop Hydroponic Farms</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Custom Automated Nutrient Dosing & IoT Climate Systems</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Professional Agronomic Consultation and Grower Training</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-hover shadow-md transition"
              >
                <span>Request Farm Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-lg border-4 border-white">
            <img
              src="/img/service-img.jpeg"
              alt="Hydroponics facility"
              className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Service Offerings Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              What We Provide
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              Our Turnkey Agri Solutions
            </h2>
            <p className="text-xs text-gray-500">
              Designed for entrepreneurs, institutions, urban rooftops, and forward-thinking farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-card-hover hover:border-emerald-200 transition"
              >
                <div>
                  <div className="aspect-video w-full overflow-hidden bg-gray-50">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] bg-emerald-50 text-primary font-bold px-2 py-0.5 rounded-full uppercase">
                      {srv.tag}
                    </span>
                    <h3 className="font-serif font-bold text-base text-gray-900 mt-1">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-50 mt-4">
                  <Link
                    to="/contact"
                    className="text-xs font-bold text-primary hover:underline flex items-center justify-between"
                  >
                    <span>Inquire for this Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

