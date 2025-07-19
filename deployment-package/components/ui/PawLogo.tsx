interface PawLogoProps {
  className?: string
  variant?: 'primary' | 'white' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export default function PawLogo({ 
  className = '', 
  variant = 'dark',
  size = 'md' 
}: PawLogoProps) {
  const colors = {
    primary: {
      paw: '#007C8C',
      cross: 'white'
    },
    white: {
      paw: 'white',
      cross: '#007C8C'
    },
    dark: {
      paw: '#0F1114',
      cross: 'white'
    }
  }

  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-32 h-32'
  }

  const { paw, cross } = colors[variant]

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${sizes[size]} ${className}`}
      aria-label="爪子制药 Logo"
    >
      {/* 爪子脚趾 */}
      <ellipse cx="35" cy="25" rx="8" ry="12" fill={paw}/>
      <ellipse cx="50" cy="20" rx="8" ry="12" fill={paw}/>
      <ellipse cx="65" cy="25" rx="8" ry="12" fill={paw}/>
      <ellipse cx="25" cy="40" rx="8" ry="12" fill={paw}/>
      <ellipse cx="75" cy="40" rx="8" ry="12" fill={paw}/>
      
      {/* 爪子掌心 - 更圆润的形状 */}
      <path 
        d="M50 35 Q30 40 25 60 Q25 75 35 80 Q45 85 50 85 Q55 85 65 80 Q75 75 75 60 Q70 40 50 35" 
        fill={paw}
      />
      
      {/* 医疗十字 */}
      <rect x="46" y="50" width="8" height="20" fill={cross}/>
      <rect x="40" y="56" width="20" height="8" fill={cross}/>
    </svg>
  )
} 