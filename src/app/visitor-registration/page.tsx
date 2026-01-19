"use client";

import { useState, useEffect } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Navbar from "@/components/Navbar";
import Infobar from "@/components/Infobar";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";
import { getUserProfile } from "@/app/actions";

const rampart = localFont({ src: "../../../public/fonts/RampartOne-Regular.ttf" });
const gilton = localFont({ src: "../../../public/fonts/GiltonRegular.otf" });
const softura = localFont({ src: "../../../public/fonts/Softura-Demo.otf" });

export default function VisitorRegistration() {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    passType: "day1", // Default pass type
    acceptedTerms: false,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const { data: sessionData } = authClient.useSession();

  useEffect(() => {
    const loadProfile = async () => {
        if (sessionData?.user?.id) {
            const userProfile: any = await getUserProfile(sessionData.user.id);
            if (userProfile) {
                setFormData(prev => ({
                    ...prev,
                    name: userProfile.name || sessionData.user.name || "",
                    email: userProfile.email || sessionData.user.email || "",
                    phone: userProfile.mobileNo || "",
                    college: userProfile.collegeName || "",
                }));
            }
            // Ensure modal is closed if user is logged in
            setShowSignInModal(false);
        } else if (sessionData === null) {
            // Only show modal if sessionData is explicitly null (not loading)
            setShowSignInModal(true);
        }
    };
    loadProfile();
  }, [sessionData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePayment = () => {
    // Simulate payment process
    setTimeout(() => {
        // setSubmitted is no longer needed directly as step 3 is the success view
        setCurrentStep(3);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Infobar />
      
      {/* Back Button */}
      <Link 
        href="/"
        className="fixed top-16 left-8 sm:left-12 z-50 w-9 h-9 sm:w-12 sm:h-12 bg-white text-black rounded-full border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:scale-95 cursor-none"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </Link>

      <Navbar 
        showNavLinks={showNavLinks}
        session={sessionData} 
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
      />

      {/* Sign In Modal */}
      {showSignInModal && !sessionData?.user && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-4xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 items-center max-w-md w-full">
            <div className="flex justify-between items-center w-full">
              <h2 className={`text-3xl text-black text-center flex-1 ${gilton.className}`}>
                Sign In Required
              </h2>
              <button 
                onClick={() => setShowSignInModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black transition-colors bg-red-300 z-50 relative cursor-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="text-center">
              <p className={`text-lg text-black font-medium mb-6 ${softura.className}`}>
                You need to sign in to purchase visitor passes for Signifiya&apos;26.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <Link
                href="/sign-in"
                onClick={() => setShowSignInModal(false)}
                className={`w-full bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider border-2 border-transparent hover:bg-[#deb3fa] hover:text-black hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-center cursor-none ${softura.className}`}
              >
                Sign In / Sign Up
              </Link>
              
              <button
                onClick={() => setShowSignInModal(false)}
                className={`w-full bg-gray-200 text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider border-2 border-black hover:bg-gray-300 transition-all cursor-none ${softura.className}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 p-3 sm:p-3">
        <main className="w-full h-full min-h-[calc(100vh-6rem)] bg-[#f3e5f5] rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center relative p-4 sm:p-8 md:p-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-0">
          
           {/* Lottie Background Animation */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40">
                <div className="w-[800px] h-[800px]">
                <DotLottieReact
                    src="https://lottie.host/ac3bacfa-158a-4442-ac68-b799a0c574cd/Aapj1forUL.lottie"
                    loop
                    autoplay
                />
                </div>
            </div>

          {sessionData ? (
          <div className="w-full max-w-2xl relative z-10">
            <div className="text-center mb-8">
              <h1 className={`text-3xl mt-25 sm:mt-0 sm:text-5xl md:text-7xl text-black uppercase leading-none mb-4 ${gilton.className}`}>
                Visitor <span className="italic">Registration</span>
              </h1>
              <p className={`text-xl text-gray-600 font-medium ${softura.className}`}>
                Get your pass to experience Signifiya'26!
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full mb-8">
                <div className="flex justify-between items-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 -z-10"></div>
                    <div className={`absolute top-1/2 left-0 h-1 bg-black -z-10 transition-all duration-500 ease-out`} style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
                    
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${currentStep >= step ? 'bg-black border-black text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                                {currentStep > step ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                ) : (
                                    <span className={`font-bold ${softura.className}`}>{step}</span>
                                )}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${currentStep >= step ? 'text-black' : 'text-gray-400'} ${softura.className}`}>
                                {step === 1 ? 'Details' : step === 2 ? 'Payment' : 'Pass'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {currentStep === 1 && (
              <form onSubmit={handleDetailsSubmit} className="bg-white rounded-4xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className={`text-red-500 text-xs font-bold uppercase tracking-widest text-center ${softura.className}`}>
                    * All fields are mandatory
                </p>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-2 flex-1">
                      <label className={`font-bold text-black uppercase text-sm cursor-none ${softura.className}`}>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full bg-gray-50 border-2 border-black rounded-xl p-4 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-none ${softura.className}`}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <label className={`font-bold text-black uppercase text-sm cursor-none ${softura.className}`}>College / Organization</label>
                      <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                        required
                        className={`w-full bg-gray-50 border-2 border-black rounded-xl p-4 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-none ${softura.className}`}
                        placeholder="Enter your college"
                      />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-2 flex-1">
                      <label className={`font-bold text-black uppercase text-sm cursor-none ${softura.className}`}>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full bg-gray-50 border-2 border-black rounded-xl p-4 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-none ${softura.className}`}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <label className={`font-bold text-black uppercase text-sm cursor-none ${softura.className}`}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={`w-full bg-gray-50 border-2 border-black rounded-xl p-4 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-none ${softura.className}`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label className={`font-bold text-black uppercase text-sm cursor-none ${softura.className}`}>Pass Type</label>
                  <div className="relative">
                    <select
                        name="passType"
                        value={formData.passType}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border-2 border-black rounded-xl p-4 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all appearance-none cursor-none relative z-10 ${softura.className}`}
                    >
                        <option value="day1">Day 1 - ₹49</option>
                        <option value="day2">Day 2 - ₹49</option>
                        <option value="dual">Dual Day Pass - ₹79</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20 text-black">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6"/>
                        </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                    <input 
                        type="checkbox" 
                        name="acceptedTerms"
                        id="acceptedTerms"
                        checked={formData.acceptedTerms}
                        onChange={handleInputChange}
                        required
                        className="w-5 h-5 accent-black cursor-none border-2 border-black rounded focus:ring-0" 
                    />
                    <label htmlFor="acceptedTerms" className={`text-sm text-black font-bold uppercase ${softura.className} cursor-none select-none`}>
                        I accept the Terms & Conditions
                    </label>
                </div>

                <button
                  type="submit"
                  className={`mt-2 w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest border-2 border-transparent hover:bg-[#deb3fa] hover:text-black hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-none ${softura.className}`}
                >
                  Proceed to Payment
                </button>
                
                <Link href="/terms" className={`text-xs text-gray-500 text-center font-bold hover:text-[#cd95f2] transition-colors cursor-none ${softura.className}`}>
                    Read full Terms & Conditions
                </Link>
              </form>
            )}

            {currentStep === 2 && (
                <div className="bg-white rounded-4xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <h2 className={`text-3xl text-black uppercase text-center mb-4 ${gilton.className}`}>Payment Details</h2>
                    
                    <div className="bg-gray-100 p-6 rounded-2xl border-2 border-black border-dashed flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
                            <span className={`text-gray-600 font-bold uppercase text-sm ${softura.className}`}>Name</span>
                            <span className={`text-black font-bold ${softura.className}`}>{formData.name}</span>
                        </div>
                        <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2">
                            <span className={`text-gray-600 font-bold uppercase text-sm ${softura.className}`}>Pass Type</span>
                            <span className={`text-black font-bold uppercase ${softura.className}`}>
                                {formData.passType === 'day1' ? 'Day 1 Pass' : formData.passType === 'day2' ? 'Day 2 Pass' : 'Dual Day Pass'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className={`text-black font-bold uppercase text-lg ${softura.className}`}>Total Amount</span>
                            <span className={`text-black font-extrabold text-2xl ${softura.className}`}>
                                {formData.passType === 'day1' ? '₹49' : formData.passType === 'day2' ? '₹49' : '₹79'}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        className={`w-full bg-[#4caf50] text-white py-4 rounded-xl font-bold uppercase tracking-widest border-2 border-black hover:bg-[#43a047] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-none ${softura.className}`}
                    >
                        Pay Now
                    </button>
                    
                    <button
                        onClick={() => setCurrentStep(1)}
                        className={`w-full bg-gray-200 text-black py-3 rounded-xl font-bold uppercase tracking-widest border-2 border-transparent hover:border-black transition-all cursor-none ${softura.className}`}
                    >
                        Back to Details
                    </button>
                </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white rounded-4xl p-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500 rounded-full border-4 border-black flex items-center justify-center text-white mb-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 className={`text-4xl text-black uppercase ${gilton.className}`}>
                  Pass Generated!
                </h2>
                <p className={`text-xl text-gray-600 font-medium ${softura.className}`}>
                  Your visitor pass has been sent to <strong>{formData.email}</strong>. Please check your inbox.
                </p>
                
                <div className="bg-gray-100 p-6 rounded-2xl border-2 border-black border-dashed w-full max-w-sm mt-4">
                    <div className="aspect-square bg-white border-2 border-black flex items-center justify-center mb-4">
                        {/* Placeholder QR Code */}
                        <div className="w-32 h-32 bg-black/10 flex items-center justify-center">
                            <span className={`text-xs text-gray-400 font-bold ${softura.className}`}>QR CODE</span>
                        </div>
                    </div>
                    <p className={`text-lg font-bold uppercase ${softura.className}`}>{formData.name}</p>
                    <p className={`text-sm text-gray-500 font-bold uppercase tracking-widest ${softura.className}`}>
                        {formData.passType === 'day1' ? 'Day 1 Pass' : formData.passType === 'day2' ? 'Day 2 Pass' : 'Dual Day Pass'}
                    </p>
                </div>

                <button
                  onClick={() => {
                      setCurrentStep(1);
                      setFormData(prev => ({ ...prev, acceptedTerms: false }));
                  }}
                  className={`mt-4 text-black font-bold underline cursor-none ${softura.className}`}
                >
                  Register Another Visitor
                </button>
              </div>
            )}
          </div>
          ) : (
            <div className="w-full max-w-2xl relative z-10 text-center">
              <div className="text-center mb-8">
                <h1 className={`text-3xl sm:text-5xl md:text-7xl text-black uppercase leading-none mb-4 ${gilton.className}`}>
                  Visitor <span className="italic">Registration</span>
                </h1>
                <p className={`text-xl text-gray-600 font-medium ${softura.className}`}>
                  Get your pass to experience Signifiya'26!
                </p>
              </div>
              <div className="bg-white rounded-4xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <p className={`text-lg text-black font-medium mb-6 ${softura.className}`}>
                  Please sign in to continue with visitor registration.
                </p>
                <Link
                  href="/sign-in"
                  className={`inline-block bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider border-2 border-transparent hover:bg-[#deb3fa] hover:text-black hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-none ${softura.className}`}
                >
                  Sign In / Sign Up
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
