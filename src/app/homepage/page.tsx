"use client";

import { useRouter } from "next/navigation";
import React from "react";

const MatrimonyLandingPage = () => {
    

  return (
    <div className="matrimony-landing">
      {/* Navigation */}
     

      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center flex items-center justify-center text-center text-white"
               style={{backgroundImage: "url('https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.webp?a=1&b=1&s=612x612&w=0&k=20&c=TDlfitfgP1f1Z2zp6WBW2Ezyk5Ed3BCeD9HcNEVoKzo=')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-4xl px-5">
          <h1 className="text-5xl md:text-6xl font-bold mb-5">
            We Bring People Together, Love Unites Them..
          </h1>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Trusted Matrimony & Matchmaking Service
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Id nisi et magna rhoncus
              pharetra vel risus. Tristique quis vivamus lectus duis
              suscipereId.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/api/placeholder/40/40" alt="Heart Icon" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Best Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Nec auctor nec eu diam
                nulla. Lorem ipsum dolor sit amet consectetur. Nec auctor nec eu
                diam nulla cum egestas nec duis euismod.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/api/placeholder/40/40" alt="Profile Icon" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Verified Profile</h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Nec auctor nec eu diam
                nulla. Lorem ipsum dolor sit amet consectetur. Nec auctor nec eu
                diam nulla cum egestas nec duis euismod.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/api/placeholder/40/40" alt="Chat Icon" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Direct Communication</h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Nec auctor nec eu diam
                nulla. Lorem ipsum dolor sit amet consectetur. Nec auctor nec eu
                diam nulla cum egestas nec duis euismod.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-orange-50 relative overflow-hidden" id="about">
        <div className="absolute inset-0 opacity-5"
             style={{backgroundImage: "url('https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.webp?a=1&b=1&s=612x612&w=0&k=20&c=TDlfitfgP1f1Z2zp6WBW2Ezyk5Ed3BCeD9HcNEVoKzo=')", backgroundSize: 'contain'}}></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                Lorem ipsum dolor sit amet consectetur. Ultricies maecenas
                pharetra amet sagittis. Lorem irfeugiat duis. Consectetur nec
                suspendisse ut augue nulla cursus tempus massa diam in pharetra.
                Viverra enim non et congue pellentesque at. Suspendisse a vivit
                molestie non ornare. Vestibulum duis lacus nec in. Tempus id
                amet euismod elementum facilisis eget sed pellentesque
                adipiscing. Imperdiet praesent risus adipiscing. Curabitur.
              </p>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-600 transition-colors">
                Read More
              </button>
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="/api/placeholder/250/200" alt="Wedding Ceremony" className="w-full rounded-lg object-cover" />
                  <img src="/api/placeholder/250/150" alt="Wedding Ceremony" className="w-full rounded-lg object-cover" />
                </div>
                <div className="space-y-4 mt-8">
                  <img src="/api/placeholder/250/150" alt="Wedding Ceremony" className="w-full rounded-lg object-cover" />
                  <img src="/api/placeholder/250/200" alt="Wedding Ceremony" className="w-full rounded-lg object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Id nisi et magna rhoncus
              pharetra vel risus. Tristique quis vivamus lectus duis
              suscipereId.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { names: "Gunja & Adariya", date: "12 Apr 2020", image: "/api/placeholder/280/300" },
              { names: "Sundaraj & Radha", date: "13 Apr 2020", image: "/api/placeholder/280/300" },
              { names: "Raja & Adariya", date: "12 Apr 2020", image: "/api/placeholder/280/300" },
              { names: "Gunja & Adariya", date: "12 Apr 2020", image: "/api/placeholder/280/300" }
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square">
                  <img src={story.image} alt="Success Story" className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{story.names}</h3>
                  <p className="text-gray-500 text-sm mb-3">{story.date}</p>
                  <button className="bg-orange-500 text-white px-4 py-1 rounded text-sm hover:bg-orange-600 transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="relative h-96 bg-cover bg-center flex items-center justify-center text-center text-white"
               style={{backgroundImage: "url('https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.webp?a=1&b=1&s=612x612&w=0&k=20&c=TDlfitfgP1f1Z2zp6WBW2Ezyk5Ed3BCeD9HcNEVoKzo=')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-4xl px-5">
          <h2 className="text-5xl font-bold mb-3">The Best Gift From You</h2>
          <p className="text-xl">Will Be Your Presentation In Our Wedding</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20" id="contact">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-2/5">
              <img src="/api/placeholder/400/500" alt="Couple Illustration" className="w-full h-auto" />
            </div>
            <div className="lg:w-3/5">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <img src="/api/placeholder/30/30" alt="Phone Icon" className="w-8 h-8 mr-4 mt-1 flex-shrink-0" />
                  <div className="pl-8 border-l border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">PHONE:</h3>
                    <p className="text-gray-600 text-lg font-medium">+91 9833737743 / 0431 2781555</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <img src="/api/placeholder/30/30" alt="Email Icon" className="w-8 h-8 mr-4 mt-1 flex-shrink-0" />
                  <div className="pl-8 border-l border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">EMAIL:</h3>
                    <p className="text-gray-600 text-lg font-medium">vrrmatrimony@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <img src="/api/placeholder/30/30" alt="Clock Icon" className="w-8 h-8 mr-4 mt-1 flex-shrink-0" />
                  <div className="pl-8 border-l border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Working Hours:</h3>
                    <p className="text-gray-600 text-lg font-medium">Monday to Sunday 10AM - 6PM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <img src="/api/placeholder/30/30" alt="Location Icon" className="w-8 h-8 mr-4 mt-1 flex-shrink-0" />
                  <div className="pl-8 border-l border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">ADDRESS:</h3>
                    <p className="text-gray-600 text-lg font-medium leading-relaxed">
                      Trichy Vayalur Road Reddy Matrimony,<br />
                      No:1, Geetha Nagar, Vayalur Road,<br />
                      Trichy - 620017.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
};

export default MatrimonyLandingPage;