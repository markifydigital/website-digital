'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';

// This is now a client component, so we can't export metadata directly.
// You would move this to a parent layout if dynamic metadata is needed.
// export const metadata: Metadata = {
//   title: 'Terms and Conditions | Markify Digital',
//   description: 'Read the Terms and Conditions for using the Markify Digital website and services.',
// };

export default function TermsAndConditionsPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="container py-16 md:py-24 animate-fade-in">
      <article className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">Terms and Conditions</h1>
        {lastUpdated && <p className="lead">Last updated: {lastUpdated}</p>}

        <h2>1. Introduction</h2>
        <p>Welcome to Markify Digital. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms and Conditions.</p>

        <h2>2. Intellectual Property Rights</h2>
        <p>Other than the content you own, under these Terms, Markify Digital and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.</p>

        <h2>3. Restrictions</h2>
        <p>You are specifically restricted from all of the following:</p>
        <ul>
          <li>publishing any Website material in any other media;</li>
          <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
          <li>publicly performing and/or showing any Website material;</li>
          <li>using this Website in any way that is or may be damaging to this Website;</li>
          <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
        </ul>

        <h2>4. Limitation of Liability</h2>
        <p>In no event shall Markify Digital, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Markify Digital, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

        <h2>5. Governing Law & Jurisdiction</h2>
        <p>These Terms will be governed by and interpreted in accordance with the laws of the State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in for the resolution of any disputes.</p>

        <h2>6. Changes to Terms</h2>
        <p>Markify Digital is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>
        
        <h2>Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us.</p>
      </article>
    </div>
  );
}
