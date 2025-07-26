'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '../../lib/i18n'
import PawLogo from '../ui/PawLogo'

const navItems = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/products', key: 'products' },
  { href: '/pipeline', key: 'pipeline' },
  { href: '/investors', key: 'investors' },
  { href: '/careers', key: 'careers' },
  { href: '/awards', key: 'awards' },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const { t, setLanguage, language } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Check if scrolled
      setIsScrolled(currentScrollY > 10)
      
      // Check scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down, hide navbar
        setIsVisible(false)
      } else {
        // Scrolling up, show navbar
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value
    setLanguage(newLanguage as 'zh' | 'en')
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 bg-white shadow-lg ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between transition-all duration-300 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 focus:outline-none transform transition-all duration-300 hover:scale-105 mr-8">
            <PawLogo 
              variant="dark" 
              size="sm" 
              className="transition-all duration-300" 
            />
            <span className="font-bold text-paw-dark transition-all duration-300 whitespace-nowrap text-xl">
              {language === 'zh' ? (
                <span className="text-paw-primary">爪子制药</span>
              ) : (
                <span className="text-paw-primary">PAW Therapeutics</span>
              )}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 ml-4 flex-1 justify-center">
            {navItems.map((item, index) => (
              <Link
                key={item.key}
                href={item.href}
                className={`font-medium transition-all duration-300 focus:outline-none transform hover:scale-110 whitespace-nowrap text-sm xl:text-base ${
                  pathname === item.href ? 'text-paw-primary' : 'text-paw-dark hover:text-paw-primary'
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </Link>
            ))}
          </div>
          
          {/* Medium screen navigation - compact version */}
          <div className="hidden md:flex lg:hidden items-center space-x-2 ml-4 flex-1 justify-center">
            {navItems.slice(0, 6).map((item, index) => (
              <Link
                key={item.key}
                href={item.href}
                className={`font-medium transition-all duration-300 focus:outline-none transform hover:scale-110 whitespace-nowrap text-xs ${
                  pathname === item.href ? 'text-paw-primary' : 'text-paw-dark hover:text-paw-primary'
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
                title={t.nav[item.key as keyof typeof t.nav]}
              >
                {item.key === 'products' && language === 'en' ? 'Products' : 
                 item.key === 'investors' && language === 'en' ? 'Investors' :
                 item.key === 'about' && language === 'en' ? 'About' :
                 item.key === 'blog' && language === 'en' ? 'News' :
                 t.nav[item.key as keyof typeof t.nav]}
              </Link>
            ))}
            {/* More menu for remaining items */}
            <div className="relative group">
              <button className="font-medium text-xs text-paw-dark hover:text-paw-primary transition-all duration-300">
                More
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  {navItems.slice(6).map((item, index) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`block px-4 py-2 text-sm transition-all duration-300 ${
                        pathname === item.href ? 'text-paw-primary bg-paw-light' : 'text-paw-dark hover:text-paw-primary hover:bg-gray-50'
                      }`}
                    >
                      {t.nav[item.key as keyof typeof t.nav]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Language selector */}
          <div className="hidden md:flex items-center">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="font-medium text-paw-dark hover:text-paw-primary transition-all duration-300 bg-transparent border-none outline-none cursor-pointer focus:outline-none ml-2 text-sm lg:text-base"
            >
              <option value="zh">🇨🇳 中文</option>
              <option value="en">🇺🇸 EN</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-paw-primary focus:outline-none transition-all duration-300 hover:scale-110 hover:bg-gray-100"
          >
            <svg
              className={`h-6 w-6 transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`absolute h-6 w-6 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white shadow-xl rounded-b-2xl border-t border-gray-100 backdrop-blur-xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium focus:outline-none transition-all duration-300 transform hover:translate-x-2 hover:scale-105 ${
                    pathname === item.href
                      ? 'text-white bg-gradient-to-r from-paw-primary to-paw-deep shadow-lg'
                      : 'text-gray-700 hover:text-paw-primary hover:bg-gradient-to-r hover:from-gray-50 hover:to-paw-light'
                  }`}
                  style={{
                    animationDelay: `${index * 80}ms`
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <div className={`transform transition-all duration-300 ${
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 80}ms`
                  }}>
                    {t.nav[item.key as keyof typeof t.nav]}
                  </div>
                </Link>
              ))}
              <div className="mt-4 px-4 py-3 bg-gradient-to-r from-gray-50 to-paw-light rounded-xl">
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="block w-full text-base font-medium text-gray-700 hover:text-paw-primary bg-transparent border-none outline-none cursor-pointer focus:outline-none"
                >
                  <option value="zh">🇨🇳 中文</option>
                  <option value="en">🇺🇸 EN</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 