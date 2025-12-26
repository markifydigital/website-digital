'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { MarkifyLogo } from "@/components/icons";
import { navLinks } from "@/lib/data";

export function Footer() {
  const [currentYear, setCurrentYear] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
    setIsClient(true);
  }, []);

  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start gap-4">
            <MarkifyLogo />
            <p className="text-muted-foreground">
              Transforming Ideas Into Digital Growth.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div>
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="text-muted-foreground hover:text-primary">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Contact</h3>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li><a href="mailto:markifydigital6@gmail.com" className="hover:text-primary">markifydigital6@gmail.com</a></li>
                <li><a href="tel:+918160058845" className="hover:text-primary">+91 8160058845</a></li>
                <li><a href="https://maps.app.goo.gl/eeVsx1Kexu1xG4Hb6" target="_blank" rel="noopener noreferrer" className="hover:text-primary">3, Prakash Row House, Ritanagar, Vastral Road, Amraiwadi, Ahmedabad - 380026</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Follow Us</h3>
              <div className="mt-4 flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61582567910439" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Facebook"><Facebook /></a>
                <a href="https://www.linkedin.com/in/parth-panchasara-52b3b4392/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn"><Linkedin /></a>
                <a href="https://www.instagram.com/markify_digital" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Instagram"><Instagram /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          {isClient && currentYear && <p>&copy; {currentYear} Markify Digital. All rights reserved.</p>}
        </div>
      </div>
    </footer>
  );
}
