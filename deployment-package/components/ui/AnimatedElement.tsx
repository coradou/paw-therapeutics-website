'use client'

import React, { ReactNode } from 'react'

interface AnimatedElementProps {
  children: ReactNode
  className?: string
  animation?: string
  delay?: number
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  className = '', 
  animation = 'fade-up', 
  delay = 0 
}) => {
  return (
    <div 
      className={`transition-all duration-300 ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        opacity: 1,
        transform: 'translateY(0)'
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedElement
