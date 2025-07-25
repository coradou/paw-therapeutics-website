'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimatedElementProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade' | 'slide-left' | 'slide-right' | 'scale' | 'wave' | 'rotate' | 'blur' | 'video' | 'image';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  stagger?: boolean;
  index?: number;
}

export default function ScrollAnimatedElement({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  className = '',
  threshold = 0.1,
  stagger = false,
  index = 0
}: ScrollAnimatedElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<'initial' | 'entering' | 'entered' | 'leaving'>('initial');
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Don't initialize observer until mounted to prevent SSR issues
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 清除任何现有的超时
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          
          // 如果是初始状态或离开状态，开始进入动画
          if (animationState === 'initial' || animationState === 'leaving') {
            setAnimationState('entering');
            // 动画完成后设置为已进入状态
            timeoutRef.current = setTimeout(() => {
              setAnimationState('entered');
            }, duration);
          }
        } else {
          // 元素离开视口时
          if (animationState === 'entered' || animationState === 'entering') {
            setAnimationState('leaving');
            // 动画完成后重置为初始状态
            timeoutRef.current = setTimeout(() => {
              setAnimationState('initial');
            }, duration);
          }
        }
      },
      { 
        threshold,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, duration, animationState, isMounted]);

  const getAnimationClass = () => {
    if (!isMounted) {
      // Return safe default for SSR
      return `scroll-animated scroll-animated-${animation} out-of-view`;
    }

    const baseClass = `scroll-animated scroll-animated-${animation}`;
    
    switch (animationState) {
      case 'initial':
        return `${baseClass} out-of-view`;
      case 'entering':
        return `${baseClass} entering`;
      case 'entered':
        return `${baseClass} in-view`;
      case 'leaving':
        return `${baseClass} leaving`;
      default:
        return `${baseClass} out-of-view`;
    }
  };

  const getAnimationStyle = () => {
    if (!isMounted) {
      // Return safe default for SSR
      return {
        '--animation-delay': '0ms',
        '--animation-duration': `${duration}ms`,
      } as React.CSSProperties;
    }

    const staggerDelay = stagger ? index * 100 : 0;
    const totalDelay = delay + staggerDelay;
    
    return {
      '--animation-delay': animationState === 'entering' ? `${totalDelay}ms` : '0ms',
      '--animation-duration': `${duration}ms`,
    } as React.CSSProperties;
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
      style={getAnimationStyle()}
    >
      {children}
    </div>
  );
} 