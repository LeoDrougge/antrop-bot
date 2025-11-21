'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <div 
      className="w-full max-w-[1268px] mx-auto flex page-container header-top-margin"
      style={{ 
        height: '96px'
      }}
    >
      {/* Left section with logo and text */}
      <div 
        className="flex-1 flex items-center border-b border-dashed relative w-full sm:w-auto"
        style={{ borderColor: 'var(--outline_muted)' }}
      >
        <div className="flex items-center gap-[18px] pl-0 w-full sm:w-auto">
          {/* Logo */}
          <a 
            href="https://www.antrop.se" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-[51px] h-[51px] flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <Image 
              src="/Assets/antrop-logo.svg" 
              alt="Antrop logo" 
              width={51} 
              height={51}
              className="w-full h-full"
            />
          </a>
          
          {/* Text content */}
          <div className="flex flex-col">
            <Link 
              href="/" 
              className="header-sm cursor-pointer hover:opacity-80 transition-opacity leading-[1.5]" 
              style={{ color: 'var(--text-regular)' }}
            >
              Antrop Bot
            </Link>
            <p 
              className="header-sm leading-[1.5]" 
              style={{ color: 'var(--text-muted)' }}
            >
              Ett experiment från antrop
            </p>
          </div>
        </div>
      </div>
      
      {/* Right section - empty but with border */}
      <div 
        className="hidden sm:flex flex-1 items-center justify-end border-b border-dashed"
        style={{ borderColor: 'var(--outline_muted)' }}
      >
      </div>
    </div>
  );
}

