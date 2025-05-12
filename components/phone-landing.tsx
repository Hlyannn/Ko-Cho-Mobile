"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, PhoneIcon, Mail, Menu, X } from "lucide-react"
import PhoneModel from "@/components/phone-model"
import { useIsMobile } from "@/hooks/use-mobile"

export default function PhoneLanding() {
  const [currentSection, setCurrentSection] = useState("hero")
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const phoneRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const visionRef = useRef<HTMLElement>(null)
  const goalsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  // Handle navigation click
  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
      setCurrentSection(sectionId)
      setIsMobileMenuOpen(false) // Close mobile menu after navigation
    }
  }

  // Handle scroll events and section detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up")
      setLastScrollY(currentScrollY)

      // Check which section is in view
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const sections = [
        { id: "hero", ref: heroRef },
        { id: "vision", ref: visionRef },
        { id: "goals", ref: goalsRef },
        { id: "contact", ref: contactRef },
      ]

      for (const section of sections) {
        const element = section.ref.current
        if (!element) continue

        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setCurrentSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    setTimeout(handleScroll, 100)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Update phone position based on current section
  useEffect(() => {
    if (!phoneRef.current) return

    const phonePositions = {
      hero: { top: "55%", left: "80%", transform: "translate(-50%, -50%)" },
      vision: { top: "55%", left: "20%", transform: "translate(-50%, -50%)" },
      goals: { top: "55%", left: "80%", transform: "translate(-50%, -50%)" },
      contact: { top: "55%", left: "80%", transform: "translate(-50%, -50%)" }
    }

    const position = phonePositions[currentSection as keyof typeof phonePositions] || phonePositions.goals

    if (currentSection === "contact" || isMobile) {
      phoneRef.current.style.opacity = "0"
      phoneRef.current.style.visibility = "hidden"
    } else {
      phoneRef.current.style.opacity = "1"
      phoneRef.current.style.visibility = "visible"
      Object.assign(phoneRef.current.style, {
        top: position.top,
        left: position.left,
        transform: position.transform,
      })
    }
  }, [currentSection, isMobile])

  // Function to check if section is in view
  const isSectionInView = (sectionId: string) => {
    return currentSection === sectionId
  }

  return (
    <div className="relative">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg shadow-lg border-b border-red-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-extrabold tracking-wide text-red-600 drop-shadow-sm font-sans uppercase">Ko Cho Mobile </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-10">
              {[
                { id: "hero", label: "Home" },
                { id: "vision", label: "Vision" },
                { id: "goals", label: "Goals" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`relative text-base font-semibold tracking-wide px-2 py-1 transition-all duration-200
                    ${currentSection === item.id ? "text-red-600" : "text-gray-700 hover:text-red-500"}
                  `}
                  onClick={() => handleNavigation(item.id)}
                >
                  <span className="relative z-10">{item.label}</span>
                  {currentSection === item.id && (
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 rounded-xl bg-white/80 shadow hover:bg-red-100 transition-colors border border-red-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7 text-red-600" />
              ) : (
                <Menu className="h-7 w-7 text-red-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-red-600">Menu</span>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              {[
                { id: "hero", label: "Home" },
                { id: "vision", label: "Vision" },
                { id: "goals", label: "Goals" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                    currentSection === item.id
                      ? "bg-red-50 text-red-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => handleNavigation(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Fixed phone that moves with scroll - Hidden on mobile */}
      <div
        ref={phoneRef}
        className="fixed w-[150px] h-[300px] md:w-[300px] md:h-[600px] z-10 transition-all duration-1000 ease-in-out hidden md:block"
        style={{ 
          top: "50%", 
          left: "75%", 
          transform: "translate(-50%, -50%)",
          opacity: "1",
          visibility: "visible"
        }}
      >
        <PhoneModel />
      </div>

      {/* Scrollable content */}
      <div className="relative z-0 pt-16 bg-white">
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="min-h-screen flex items-center bg-white">
          <div className="container mx-auto px-4">
            <div className={`max-w-full md:max-w-xl transition-all duration-1000 ${
              isSectionInView("hero") 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 drop-shadow-lg tracking-tight text-center">All the Phones You Want In One Place</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-red-400 to-red-600 rounded-full mb-8 mx-auto"></div>
              <p className="text-lg md:text-2xl mb-8 text-gray-700 leading-8 text-center font-medium">ရောင်းရမှာကလူကြီးမင်းတို့ရဲ့တာဝန်ဖြစ်ပြီးသူများထက်ဈေးပိုပေးရမှာကကျွန်တော်တာဝန်ထားလိုက်ပါ။</p>
              <p className="text-gray-500 text-center leading-7">Scroll down to explore our vision and goals.</p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" ref={visionRef} className="min-h-screen flex items-center bg-white">
          <div className="container mx-auto px-4">
            <div className={`max-w-full md:max-w-xl ml-auto mr-0 transition-all duration-1000 ${
              isSectionInView("vision") 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 drop-shadow-lg tracking-tight text-center">Our Vision</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-red-400 to-red-600 rounded-full mb-8 mx-auto"></div>
              <p className="text-lg md:text-xl mb-6 text-gray-700 leading-8 text-center font-bold">
              လူတိုင်းအတွက် စမတ်ဖုန်းများကို ရှာဖွေခြင်းနှင့် ရွေးချယ်ခြင်းနှင့် ပိုင်ဆိုင်ခြင်းကို လွယ်ကူအဆင်ပြေစေပြီး နည်းပညာကို ပိုမိုလက်လှမ်းမီအောင် ပြုလုပ်ပေးရမှာကျွန်တော်ရည်ရွယ်ချက်ဖြစ်သည်။
              </p>
              <p className="text-lg md:text-xl mb-6 text-gray-700 leading-8 text-center font-bold">
              မိတ်ဆွေတို့စိတ်ကျေနပ်မှု၊ တန်ဖိုးရှိသောဈေးနှုန်းများနှင့် နည်းပညာသစ်များဖြင့် အရောင်းအဝယ်လုပ်ငန်းအတွင်း အရည်အသွေးမြင့်ဆုံး၊ ယုံကြည်စိတ်ချရသော မိုဘိုင်းဖုန်းဆိုင်တစ်ခုအဖြစ် ရပ်တည်နိုင်ရန် အာမခံပါသည်။
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-8 text-center font-bold">
              ဖုန်းတစ်လုံး ဝယ်ယူခြင်းဟာ မိတ်ဆွေတို့ရဲ့ဘဝကို မြှင့်တင်ပေးနိုင်တဲ့ အတွေ့အကြုံတစ်ခုဖြစ်အောင် ဖန်တီးပြီး ဖုန်းဝယ်ယူသူများအတွက် ပိုမိုတန်ဖိုးရှိသော လူမှုအသိုင်းအဝိုင်းတစ်ခုကို တည်ဆောက်ပေးစေလိုခြင်းဖြစ်သည်။
              </p>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section id="goals" ref={goalsRef} className="min-h-screen flex items-center bg-white">
          <div className="container mx-auto px-4">
            <div className={`max-w-full md:max-w-xl transition-all duration-1000 ${
              isSectionInView("goals") 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 drop-shadow-lg tracking-tight text-center">Our Goals</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-red-400 to-red-600 rounded-full mb-8 mx-auto"></div>
              <div className="space-y-4 md:space-y-6">
                <div className="p-4 border rounded-lg bg-white backdrop-blur hover:shadow-lg transition-shadow">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-purple-600">Innovation</h3>
                  <p className="text-base md:text-lg text-gray-700 leading-8 font-bold">
                  ကျွန်ုပ်တို့သည် သစ်လွင်သောအတွေးအခေါ်များ၊ တီထွင်မှုများနှင့် အဆင့်မြှင့်ကောင်းမွန်မှုများကို ဆန်းစစ်တီထွင်ခြင်းအားဖြင့် သုံးစွဲသူများ၏ နေ့စဉ်ဘဝများကို ပိုမိုအဆင်ပြေ၊ ထိထိရောက်ရောက် ဖြစ်အောင် ဆောင်ရွက်နေပါသည်။
                  </p>
                </div>

                <div className="p-4 border rounded-lg bg-white backdrop-blur hover:shadow-lg transition-shadow">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-purple-600">Accessibility</h3>
                  <p className="text-base md:text-lg text-gray-700 leading-8 font-bold">
                  နည်းပညာကို လူတိုင်းရောက်ရှိနိုင်စေရန်၊ အတတ်ပညာမရှိသူများမှ စ၍ အတွေ့အကြုံမရှိသူများအထိ စဉ်ဆက်မပြတ် အသုံးပြုနိုင်အောင် ဝန်ဆောင်မှုပေးလျက်ရှိပါသည်။ ဖုန်းကို လူတိုင်းအတွက် ပိုမိုလွယ်ကူ၊ အသုံးပြုရစွမ်းရည်မြင့်မားစေရန် ကြိုးပမ်းဆောင်ရွက်နေပါသည်။
                  </p>
                </div>

                <div className="p-4 border rounded-lg bg-white backdrop-blur hover:shadow-lg transition-shadow">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-purple-600">Sustainability</h3>
                  <p className="text-base md:text-lg text-gray-700 leading-8 font-bold">
                  နည်းပညာကို ပတ်ဝန်းကျင်နှင့် ကိုက်ညီစွာ တီထွင်ပြီး သဘာဝပတ်ဝန်းကျင်ကို ကာကွယ်လျက် ရှိပါသည်။ အနာဂတ်တွင်ကောင်းမွန်သောနည်းပညာများနှင့် ပတ်ဝန်းကျင်ကို ထိခိုက်မခံစေရန် အရေးပါသော သဘာဝပတ်ဝန်းကျင်နည်လမ်းများကို လက်ခံဆောင်ရွက်နေပါသည်။
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="min-h-screen flex items-start bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className={`max-w-full md:max-w-4xl mx-auto transition-all duration-1000 ${
              isSectionInView("contact") 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 drop-shadow-lg tracking-tight text-center">Get in Touch</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-red-400 to-red-600 rounded-full mb-12 mx-auto"></div>

              <div className="grid grid-cols-1 gap-8 mb-12">
                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <PhoneIcon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-black">Phone</h3>
                        <p className="text-gray-600 mb-1 leading-7">(+95) 9 776 111116</p>
                        <p className="text-sm text-gray-500 leading-6">Mon-Fri 9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-black">Email</h3>
                        <p className="text-gray-600 mb-1 leading-7">hlaphonethu@gmail.com</p>
                        <p className="text-sm text-gray-500 leading-6">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-black">Location</h3>
                        <p className="text-gray-600 mb-1 leading-7">No.112/F Ground Floor, Thaming Lane Sone Near Citymart, Thaming Butar Yone Street, Mayangone 11051</p>
                        <p className="text-sm text-gray-500 leading-6">Visit our store</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-semibold mb-4 text-black">Follow Us</h3>
                    <div className="flex gap-6">
                      <a href="https://www.facebook.com/hlaphonethu" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-red-600 hover:text-red-800 transition-colors">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
                      </a>
                     
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-lg h-[300px] md:h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.2906977983607!2d96.12075759999999!3d16.8615084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c195509e44d977%3A0x7e4fdfa0ef27bffc!2sKo%20Cho%20Good%20Secondhand%20Mobile%20Shop!5e0!3m2!1sen!2smm!4v1746920308093!5m2!1sen!2smm"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 md:py-8 text-center text-sm text-black bg-white">
          <div className="container mx-auto px-4">
            <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
