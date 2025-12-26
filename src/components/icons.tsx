import React from 'react';
import { cn } from '@/lib/utils';

export function MarkifyLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 160 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_2)">
          {/* Icon */}
          <path d="M22.5 15C17.5 15 15.5 24.5 15.5 24.5C15.5 24.5 14 15 8.5 15C3.5 15 0 18 0 23V40H7V24C7 21.5 8 20 8.5 20C9.5 20 10.5 22 11.5 24.5L13.5 30L17.5 30L19.5 24.5C20.5 22 21.5 20 22.5 20C23 20 24 21.5 24 24V40H31V23C31 18 27.5 15 22.5 15Z" fill="hsl(var(--primary))"/>
          <path d="M11.5 34.5C11.5 33.5 12 32.5 13 32.5H18C19 32.5 19.5 33.5 19.5 34.5V40H11.5V34.5Z" fill="hsl(var(--primary))" />
          <path d="M15.5 8.5C15.5 5.5 18.5 3.5 21.5 4.5L24.5 5.5C28.5 7.5 30.5 11.5 30.5 15.5C30.5 18.5 28.5 21 25.5 21C22.5 21 20 18.5 20 15.5C20 13.5 18.5 9.5 15.5 8.5Z" fill="hsl(var(--accent))"/>
          
          {/* Text */}
          <text x="38" y="24" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" fill="hsl(var(--foreground))">Markify</text>
          <text x="38" y="38" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="normal" fill="hsl(var(--foreground))" letterSpacing="0.1em">DIGITAL</text>
        </g>
        <defs>
          <clipPath id="clip0_1_2">
            <rect width="160" height="40" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <span className="font-headline text-2xl font-bold sr-only">Markify Digital</span>
    </div>
  );
}
