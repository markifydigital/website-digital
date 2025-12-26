'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';

// This is now a client component, so we can't export metadata directly.
// You would move this to a parent layout if dynamic metadata is needed.
// export const metadata: Metadata = {
//   title: 'Privacy Policy | Markify Digital',
//   description: 'Read the Privacy Policy of Markify Digital to understand how we collect, use, and protect your data.',
// };

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="container py-16 md:py-24 animate-fade-in">
      <article className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">Privacy Policy</h1>
        {lastUpdated && <p className="lead">Last updated: {lastUpdated}</p>}
        
        <p>Markify Digital ("us", "we", or "our") operates the Markify Digital website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

        <h2>Information Collection and Use</h2>
        <p>We collect several different types of information for various purposes to provide and improve our Service to you. This may include, but is not limited to, your name, email address, and usage data.</p>

        <h2>Log Data</h2>
        <p>We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>

        <h2>Cookies</h2>
        <p>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your computer’s hard drive. Our website uses these "cookies" to collect information and improve our Service. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your computer.</p>
        
        <h2>Security</h2>
        <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
        
        <h2>Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
        
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us.</p>
      </article>
    </div>
  );
}
