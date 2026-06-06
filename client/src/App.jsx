import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Custom Cursor Component
function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    const moveCursor = (e) => {
      if (cursor && follower) {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
        follower.style.left = e.clientX + 'px'
        follower.style.top = e.clientY + 'px'
      }
    }

    const addHoverEffect = (e) => {
      if (cursor && follower) {
        cursor.style.transform = 'scale(1.5)'
        follower.style.transform = 'scale(1.5)'
      }
    }

    const removeHoverEffect = (e) => {
      if (cursor && follower) {
        cursor.style.transform = 'scale(1)'
        follower.style.transform = 'scale(1)'
      }
    }

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', () => {
      if (cursor) cursor.style.opacity = '1'
      if (follower) follower.style.opacity = '0.3'
    })
    document.addEventListener('mouseleave', () => {
      if (cursor) cursor.style.opacity = '0'
      if (follower) follower.style.opacity = '0'
    })

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .swiper-slide')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', addHoverEffect)
      el.addEventListener('mouseleave', removeHoverEffect)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverEffect)
        el.removeEventListener('mouseleave', removeHoverEffect)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}

// Theme Switcher Component
function ThemeSwitcher({ isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={`theme-switcher ${isDark ? 'dark' : ''}`}
      aria-label="Toggle theme"
    />
  )
}

// Enhanced Navbar with MarkitUp styling
function Navbar({ isDark, toggleTheme }) {
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  // Logo switching with fallbacks (prefer SVG first)
  const logoCandidates = isDark
    ? ['/assets/img/4.svg', '/assets/img/dark-mode.png', '/assets/img/logo-mark.svg']
    : ['/assets/img/3.svg', '/assets/img/light-mode.png', '/assets/img/logo-mark.svg']
  const [logoIndex, setLogoIndex] = useState(0)
  useEffect(() => { setLogoIndex(0) }, [isDark])
  const handleLogoError = (e) => {
    setLogoIndex((idx) => (idx + 1 < logoCandidates.length ? idx + 1 : idx))
  }

  return (
    <header className={`sticky top-0 z-50 backdrop-blur ${isDark ? 'bg-deep-900/70 border-white/10' : 'bg-white/70 border-black/10'} border-b`} id="top">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="#top" className="inline-flex items-center gap-3 font-extrabold tracking-tight group">
          <img src="/assets/img/logo-mark.svg" alt="SAAP SOLUTIONS logo" className="w-12 h-12 md:w-16 md:h-16 object-contain group-hover:scale-105 transition-transform" />
          <span className={`font-display text-lg md:text-xl font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-deep-900'}`}>
            SAAP Solutions
          </span>
        </a>
        <nav className={`${open ? 'translate-y-0' : '-translate-y-[120%]'} md:translate-y-0 fixed md:static inset-x-0 top-[80px] md:top-auto ${isDark ? 'bg-deep-900/95 md:bg-transparent border-white/10' : 'bg-white/95 md:bg-transparent border-black/10'} border-b md:border-0 transition-transform shadow-lg md:shadow-none`} aria-label="Primary">
          <ul className="flex md:flex-row flex-col items-center gap-5 p-4 md:p-0">
            <li><a className={`${isDark ? 'text-white/70 hover:text-white' : 'text-deep-900/70 hover:text-deep-900'}`} href="#about">About</a></li>
            <li><a className={`${isDark ? 'text-white/70 hover:text-white' : 'text-deep-900/70 hover:text-deep-900'}`} href="#services">Services</a></li>
            <li><a className={`${isDark ? 'text-white/70 hover:text-white' : 'text-deep-900/70 hover:text-deep-900'}`} href="#work">Work</a></li>
            <li><a className={`${isDark ? 'text-white/70 hover:text-white' : 'text-deep-900/70 hover:text-deep-900'}`} href="#testimonials">Testimonials</a></li>
            <li><a className="inline-flex items-center px-3 py-2 rounded-full border border-cyan-400/50 text-cyan-600" href="#contact">Contact</a></li>
            <li><ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} /></li>
          </ul>
        </nav>
        <button className={`md:hidden ${isDark ? 'text-white' : 'text-deep-900'}`} aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className={`block w-6 h-[2px] ${isDark ? 'bg-white' : 'bg-deep-900'}`}></span>
          <span className={`block w-6 h-[2px] ${isDark ? 'bg-white' : 'bg-deep-900'} my-1`}></span>
          <span className={`block w-6 h-[2px] ${isDark ? 'bg-white' : 'bg-deep-900'}`}></span>
        </button>
      </div>
    </header>
  )
}

// Enhanced Hero Section with MarkitUp styling
function Hero({ isDark }) {
  return (
    <section className={`min-h-screen flex items-center ${isDark ? 'bg-gradient-to-br from-deep-900 via-deep-800 to-deep-900' : 'bg-hero'}`} id="hero">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: .8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <div className={`text-lg md:text-xl font-medium ${isDark ? 'text-white/80' : 'text-deep-900/80'}`}>
                <span>Welcome to <b>SAAP SOLUTIONS</b></span>
              </div>
              <h1 className={`font-display font-extrabold tracking-tight text-5xl md:text-6xl lg:text-7xl leading-tight ${isDark ? 'text-white' : 'text-deep-900'}`}>
                <span className="block">Driving Digital</span>
                <span className="block">Excellence</span>
              </h1>
              <div className={`text-xl md:text-2xl font-medium ${isDark ? 'text-white/80' : 'text-deep-900/80'}`}>
                A Premier <strong className="text-cyan-500">Digital Marketing Agency</strong>
              </div>
            </div>
            
            <p className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>
              We partner with visionary brands to architect immersive digital experiences, driving measurable growth through innovative marketing and cutting-edge web development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <span>Contact Us</span>
              </a>
              <a href="#work" className={`inline-flex items-center justify-center px-8 py-4 rounded-full border-2 ${isDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-deep-900/30 text-deep-900 hover:bg-deep-900/10'} transition-all duration-300 hover:scale-105`}>
                <span>View Work</span>
              </a>
            </div>
            
            <div className="flex gap-6 justify-center lg:justify-start">
              <a href="#" className={`w-12 h-12 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-deep-900/10 hover:bg-deep-900/20'} flex items-center justify-center transition-all duration-300 hover:scale-110`} aria-label="Instagram">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className={`w-12 h-12 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-deep-900/10 hover:bg-deep-900/20'} flex items-center justify-center transition-all duration-300 hover:scale-110`} aria-label="LinkedIn">
                <i className="fab fa-linkedin text-lg"></i>
              </a>
              <a href="#" className={`w-12 h-12 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-deep-900/10 hover:bg-deep-900/20'} flex items-center justify-center transition-all duration-300 hover:scale-110`} aria-label="Twitter">
                <i className="fab fa-twitter text-lg"></i>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: .8, delay: .2 }} 
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] lg:max-w-full mx-auto">
              <img src={`/assets/img/${isDark ? 'hero_dark_v2.png' : 'hero_light_v2.png'}`} alt="Digital Agency Hero Graphic" className="relative w-full h-auto will-change-transform drop-shadow-2xl rounded-[2rem] border border-white/10 object-cover aspect-square" />
              <div className={`absolute inset-0 -z-10 blur-3xl ${isDark ? 'bg-cyan-400/20' : 'bg-cyan-400/30'} rounded-full scale-110`}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Enhanced Services with Swiper
function Services({ isDark }) {
  const services = [
    { icon: 'web', title: 'Website Design', subtitle: 'Modern & Responsive', text: 'Human‑centric UX/UI design systems engineered for optimal engagement and seamless conversion.' },
    { icon: 'code', title: 'Web Development', subtitle: 'Full-Stack Solutions', text: 'Robust, scalable, and high-performance web applications built with modern engineering practices.' },
    { icon: 'trending_up', title: 'SEO Optimization', subtitle: 'Organic Growth', text: 'Data-driven SEO strategies that maximize visibility, dominate search rankings, and capture growth.' },
    { icon: 'palette', title: 'Digital Branding', subtitle: 'Brand Identity', text: 'Compelling visual identities and strategic messaging that resonate deeply with your target audience.' },
    { icon: 'campaign', title: 'Social Media', subtitle: 'Engagement & Growth', text: 'Targeted social campaigns and community management that amplify brand voice and drive engagement.' },
    { icon: 'videocam', title: 'Video Production', subtitle: 'Creative Content', text: 'High-end video production and motion graphics that tell your brand\'s story with cinematic impact.' }
  ]

  return (
    <section className={`py-20 lg:py-32 ${isDark ? 'bg-deep-800' : 'bg-gray-50'}`} id="services">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`font-display font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6 ${isDark ? 'text-white' : 'text-deep-900'}`}>
              Our Services
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>
              Comprehensive digital solutions designed to elevate your brand and accelerate your business growth.
            </p>
          </motion.div>
        </div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{ 
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          autoplay={{ 
            delay: 4000,
            disableOnInteraction: false 
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 }
          }}
          className="services-swiper relative"
        >
          {services.map((service, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative overflow-hidden rounded-3xl border ${isDark ? 'border-white/10 bg-deep-700' : 'border-black/10 bg-white'} p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 group h-full`}
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-cyan-600 grid place-items-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-3xl font-bold text-white">{service.icon}</span>
                </div>
                <h3 className={`font-display font-bold text-2xl mb-3 ${isDark ? 'text-white' : 'text-deep-900'}`}>
                  {service.title}
                </h3>
                <p className={`text-base font-semibold mb-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  {service.subtitle}
                </p>
                <p className={`text-base leading-relaxed ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>
                  {service.text}
                </p>
                <div className="absolute inset-0 rounded-3xl ring-1 ring-cyan-400/0 group-hover:ring-cyan-400/40 transition-all duration-300" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <div className="swiper-button-prev !relative !w-12 !h-12 !mt-0 !text-cyan-500 !bg-white/10 !rounded-full !backdrop-blur-sm hover:!bg-white/20 transition-all"></div>
          <div className="swiper-pagination !relative !w-auto"></div>
          <div className="swiper-button-next !relative !w-12 !h-12 !mt-0 !text-cyan-500 !bg-white/10 !rounded-full !backdrop-blur-sm hover:!bg-white/20 transition-all"></div>
        </div>
      </div>
    </section>
  )
}

// View Work tiles (like Services)
function WorkTiles({ isDark }) {
  const projects = [
    { img: '/assets/img/fintech_v2.png', title: 'Fintech Landing', tag: 'Landing Page' },
    { img: '/assets/img/saas_v2.png', title: 'SaaS Dashboard', tag: 'Web App' },
    { img: '/assets/img/ecommerce_v2.png', title: 'E‑commerce Storefront', tag: 'E‑commerce' },
    { img: '/assets/img/crypto_v2.png', title: 'Crypto Analytics', tag: 'Analytics' },
    { img: '/assets/img/saas_v2.png', title: 'Marketing Site', tag: 'Marketing' },
    { img: '/assets/img/ecommerce_v2.png', title: 'Portfolio Site', tag: 'Portfolio' }
  ]

  return (
    <section className={`py-20 lg:py-32 ${isDark ? 'bg-deep-900' : 'bg-white'}`} id="work">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`font-display font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6 ${isDark ? 'text-white' : 'text-deep-900'}`}>
              Featured Work
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>
              A curated showcase of our recent digital transformations and strategic implementations.
            </p>
          </motion.div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: '.work-next',
            prevEl: '.work-prev',
          }}
          pagination={{ clickable: true, el: '.work-pagination' }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 }
          }}
          className="testimonials-swiper relative"
        >
          {projects.map((p, i) => (
            <SwiperSlide key={i}>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                href="#"
                className={`relative rounded-3xl overflow-hidden border ${isDark ? 'border-white/10 bg-deep-800' : 'border-black/10 bg-white'} group block h-full`}
              >
                <img src={p.img} alt={p.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/40 p-6 flex items-end`}> 
                  <div>
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white/80">{p.tag}</span>
                    <h3 className="text-white text-xl font-bold">{p.title}</h3>
                  </div>
                </div>
              </motion.a>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center items-center gap-4 mt-12">
          <div className="work-prev !relative !w-12 !h-12 !mt-0 !text-cyan-500 !bg-white/10 !rounded-full !backdrop-blur-sm hover:!bg-white/20 transition-all"></div>
          <div className="work-pagination !relative !w-auto"></div>
          <div className="work-next !relative !w-12 !h-12 !mt-0 !text-cyan-500 !bg-white/10 !rounded-full !backdrop-blur-sm hover:!bg-white/20 transition-all"></div>
        </div>
      </div>
    </section>
  )
}

// Enhanced Testimonials with Swiper
function Testimonials({ isDark }) {
  const testimonials = [
    { 
      img: '/assets/img/testimonial1.jpg', 
      name: 'Alex Chen', 
      role: 'Growth Lead, Nimbus',
      text: "They delivered a stunning website that boosted our conversions within weeks. The attention to detail and user experience is exceptional." 
    },
    { 
      img: '/assets/img/testimonial2.jpg', 
      name: 'Priya Singh', 
      role: 'Founder, Mavenly',
      text: "A rare blend of strategy, design, and engineering. Highly recommend their services for any digital transformation project." 
    },
    { 
      img: '/assets/img/testimonial3.jpg', 
      name: 'Diego Morales', 
      role: 'COO, Verde',
      text: "Professional, fast, and detail‑oriented. The brand system they created elevated our presence significantly." 
    }
  ]

  return (
    <section className={`py-20 lg:py-32 ${isDark ? 'bg-deep-900' : 'bg-white'}`} id="testimonials">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`font-display font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6 ${isDark ? 'text-white' : 'text-deep-900'}`}>
              Client Success
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>
              Hear from the brands we've <b className="text-cyan-500">empowered</b>
            </p>
          </motion.div>
        </div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          navigation={{
            nextEl: '.testimonials-next',
            prevEl: '.testimonials-prev',
          }}
          pagination={{ 
            clickable: true,
            el: '.testimonials-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          autoplay={{ 
            delay: 5000,
            disableOnInteraction: false 
          }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 }
          }}
          className="testimonials-swiper relative"
        >
          {testimonials.map((testimonial, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative rounded-3xl border ${isDark ? 'border-white/10 bg-deep-800' : 'border-black/10 bg-gray-50'} p-8 lg:p-10 text-center shadow-lg hover:shadow-xl transition-all duration-300 group h-full`}
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-8 overflow-hidden ring-4 ring-cyan-400/20 group-hover:ring-cyan-400/40 transition-all duration-300">
                  <img 
                    src={testimonial.img} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=00d0ff&color=fff&size=80`
                    }}
                  />
                </div>
                <div className="mb-6">
                  <svg className="w-8 h-8 mx-auto mb-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-white/80' : 'text-deep-900/80'}`}>
                  "{testimonial.text}"
                </p>
                <div className="space-y-2">
                  <h6 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-deep-900'}`}>
                    {testimonial.name}
                  </h6>
                  <p className={`text-sm font-medium ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <div className="testimonials-prev !relative !w-12 !h-12 !mt-0 !text-cyan-500 !bg-white/10 !rounded-full !backdrop-blur-sm hover:!bg-white/20 transition-all"></div>
          <div className="testimonials-pagination !relative !w-auto"></div>
          <div className="testimonials-next !relative !w-12 !h-12 !mt-0 !text-cyan-500 !bg-white/10 !rounded-full !backdrop-blur-sm hover:!bg-white/20 transition-all"></div>
        </div>
      </div>
    </section>
  )
}

// Enhanced Contact Form
function Contact({ isDark }) {
  const statusRef = useRef(null)
  
  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()
    
    if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
      statusRef.current.textContent = 'Please provide a valid name, email, and message.'
      return
    }
    
    statusRef.current.textContent = 'Sending…'
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          message, 
          interest: form.querySelector('#interest')?.value 
        })
      })
      if (!res.ok) throw new Error('Request failed')
      statusRef.current.textContent = 'Thanks! Your message has been sent.'
      form.reset()
    } catch (err) {
      statusRef.current.textContent = 'Something went wrong. Please try again.'
    }
  }

  return (
    <section className={`py-20 lg:py-32 ${isDark ? 'bg-deep-800' : 'bg-gray-50'}`} id="contact">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`font-display font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl mb-6 ${isDark ? 'text-white' : 'text-deep-900'}`}>
              Let's Build Together
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>
              Share your vision with our team, and we'll connect with you within 24 hours to discuss your project.
            </p>
          </motion.div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-deep-900'}`}>
                Partner with Us
              </h3>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>
                Ready to redefine your digital presence? Our experts are here to provide the strategic guidance and innovative solutions your brand needs to thrive.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <i className="fas fa-envelope text-cyan-500"></i>
                </div>
                <div>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-deep-900'}`}>Email Us</p>
                  <p className={`text-sm ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>hello@saapsolutions.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <i className="fas fa-phone text-cyan-500"></i>
                </div>
                <div>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-deep-900'}`}>Call Us</p>
                  <p className={`text-sm ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>+91 63947 49683</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-cyan-500"></i>
                </div>
                <div>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-deep-900'}`}>Visit Us</p>
                  <p className={`text-sm ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>Level 4, Cyber City, DLF Phase 2<br/>Gurugram, Haryana 122002, India</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-3xl border ${isDark ? 'border-white/10 bg-deep-700' : 'border-black/10 bg-white'} p-8 lg:p-10 shadow-2xl`}
            onSubmit={onSubmit}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-deep-900/80'}`}>Name</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  placeholder="Jane Doe" 
                  required 
                  className={`px-4 py-4 rounded-xl border ${isDark ? 'bg-deep-800 border-white/10 text-white placeholder-white/50' : 'bg-white border-black/10 text-deep-900 placeholder-deep-900/50'} outline-none focus:ring-2 focus:ring-cyan-400/40 transition-all`} 
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-deep-900/80'}`}>Email</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="jane@company.com" 
                  required 
                  className={`px-4 py-4 rounded-xl border ${isDark ? 'bg-deep-800 border-white/10 text-white placeholder-white/50' : 'bg-white border-black/10 text-deep-900 placeholder-deep-900/50'} outline-none focus:ring-2 focus:ring-cyan-400/40 transition-all`} 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-3 mt-6">
              <label htmlFor="interest" className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-deep-900/80'}`}>Service Interest</label>
              <select 
                id="interest" 
                name="interest" 
                className={`px-4 py-4 rounded-xl border ${isDark ? 'bg-deep-800 border-white/10 text-white' : 'bg-white border-black/10 text-deep-900'} outline-none focus:ring-2 focus:ring-cyan-400/40 transition-all`}
              >
                <option>Website Design</option>
                <option>Web Development</option>
                <option>SEO Optimization</option>
                <option>Digital Branding</option>
                <option>Social Media</option>
                <option>Video Production</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-3 mt-6">
              <label htmlFor="message" className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-deep-900/80'}`}>Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                placeholder="Briefly describe your project" 
                required 
                className={`px-4 py-4 rounded-xl border ${isDark ? 'bg-deep-800 border-white/10 text-white placeholder-white/50' : 'bg-white border-black/10 text-deep-900 placeholder-deep-900/50'} outline-none focus:ring-2 focus:ring-cyan-400/40 transition-all resize-none`}
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
              <button 
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" 
                type="submit"
              >
                <span>Send Inquiry</span>
                <i className="fas fa-paper-plane ml-2"></i>
              </button>
              <p className={`text-sm min-h-[22px] ${isDark ? 'text-white/70' : 'text-deep-900/70'}`} aria-live="polite" ref={statusRef}></p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

// Main App Component
export default function App() {
  const [isDark, setIsDark] = useState(false)
  
  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  useEffect(() => {
    const click = (e) => {
      const t = e.target
      if (t instanceof Element && t.matches('a[href^="#"]')) {
        const id = t.getAttribute('href')
        if (!id || id === '#') return
        const el = document.querySelector(id)
        if (el) { 
          e.preventDefault()
          el.scrollIntoView({ behavior: 'smooth', block: 'start' }) 
        }
      }
    }
    document.addEventListener('click', click)
    return () => document.removeEventListener('click', click)
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-deep-900 text-white' : 'bg-hero text-deep-900'}`}>
      <CustomCursor />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <main>
        <Hero isDark={isDark} />
        <Services isDark={isDark} />
        <WorkTiles isDark={isDark} />
        <Testimonials isDark={isDark} />
        <Contact isDark={isDark} />
      </main>

      <footer className={`py-16 lg:py-20 border-t ${isDark ? 'border-white/10 bg-deep-900' : 'border-black/10 bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12 items-start">
            <div className="lg:col-span-2">
              <a href="#top" className="inline-flex items-center gap-4 mb-6 group">
                <img src="/assets/img/logo-mark.svg" alt="SAAP SOLUTIONS logo" className="w-16 h-16 md:w-20 md:h-20 object-contain group-hover:scale-105 transition-transform" />
                <span className="font-display text-2xl font-bold uppercase tracking-widest leading-tight">
                  <span className="block">SAAP</span>
                  <span className="block">Solutions</span>
                </span>
              </a>
              <p className={`text-lg leading-relaxed max-w-md mb-8 ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>
                We partner with visionary brands to architect immersive digital experiences, driving measurable growth through innovative marketing and cutting-edge web development.
              </p>
              <div className="flex gap-4">
                <a className={`w-12 h-12 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-deep-900/10 hover:bg-deep-900/20'} flex items-center justify-center transition-all duration-300 hover:scale-110`} href="#" aria-label="Instagram">
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a className={`w-12 h-12 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-deep-900/10 hover:bg-deep-900/20'} flex items-center justify-center transition-all duration-300 hover:scale-110`} href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin text-lg"></i>
                </a>
                <a className={`w-12 h-12 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-deep-900/10 hover:bg-deep-900/20'} flex items-center justify-center transition-all duration-300 hover:scale-110`} href="#" aria-label="Twitter">
                  <i className="fab fa-twitter text-lg"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-900'}`}>Quick Links</h4>
              <nav className="space-y-4" aria-label="Footer">
                <a className={`block text-base hover:opacity-70 transition-opacity ${isDark ? 'text-white/70' : 'text-deep-900/70'}`} href="#about">About</a>
                <a className={`block text-base hover:opacity-70 transition-opacity ${isDark ? 'text-white/70' : 'text-deep-900/70'}`} href="#services">Services</a>
                <a className={`block text-base hover:opacity-70 transition-opacity ${isDark ? 'text-white/70' : 'text-deep-900/70'}`} href="#testimonials">Testimonials</a>
                <a className={`block text-base hover:opacity-70 transition-opacity ${isDark ? 'text-white/70' : 'text-deep-900/70'}`} href="#contact">Contact</a>
              </nav>
            </div>
            
            <div>
              <h4 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-900'}`}>Contact Info</h4>
              <div className="space-y-4">
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-deep-900'}`}>Email</p>
                  <p className={`text-sm ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>hello@saapsolutions.com</p>
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-deep-900'}`}>Phone</p>
                  <p className={`text-sm ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>+91 63947 49683</p>
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-deep-900'}`}>Address</p>
                  <p className={`text-sm ${isDark ? 'text-white/70' : 'text-deep-900/70'}`}>Level 4, Cyber City<br/>Gurugram, Haryana 122002, India</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`border-t mt-12 pt-8 text-center ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-deep-900/60'}`}>
              © {new Date().getFullYear()} SAAP SOLUTIONS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}