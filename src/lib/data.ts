
import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';
import { BarChart, Code, Megaphone, Palette, Search, Share2, Users, Target, Award, Icon } from 'lucide-react';
import Link from 'next/link';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) as ImagePlaceholder;

// A mapping from string names to Lucide icon components
export const ICONS: { [key: string]: typeof Share2 } = {
    Share2,
    Search,
    Code,
    Palette,
    Megaphone,
    BarChart,
    Users,
    Target,
    Award,
};

export type Service = {
    id?: string;
    icon: string;
    title: string;
    slug: string;
    description: string;
    longDescription: string;
    image: {
        imageUrl: string;
        imageHint: string;
    };
};

export type Testimonial = {
    id?: string;
    name: string;
    company: string;
    comment: string;
    rating: number;
}


export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export const services_hardcoded = [
  {
    icon: "Share2",
    title: "Social Media Management",
    slug: "social-media-management",
    description: "Elevate your social media presence with our expert strategies. We help you connect with your audience and build a strong online community.",
    longDescription: "Our Social Media Management service is designed to build your brand's presence across key social platforms. We create and manage engaging content, run targeted campaigns, and foster a community around your brand. From content calendars to performance analytics, we handle it all to grow your following and drive engagement.",
    image: getImage('service_social_media'),
  },
  {
    icon: "Search",
    title: "SEO & Google Ranking",
    slug: "seo-google-ranking",
    description: "Climb to the top of search results. Our SEO services are designed to increase your visibility and drive organic traffic to your website.",
    longDescription: "With our SEO & Google Ranking service, we dive deep into keyword research, on-page optimization, and technical SEO to improve your website's visibility. We build high-quality backlinks and create optimized content to help you rank higher for the terms that matter most to your business, driving sustainable, organic traffic.",
    image: getImage('service_seo'),
  },
  {
    icon: "Code",
    title: "Website Development",
    slug: "website-development",
    description: "Get a stunning, high-performance website. Our website design and development team creates sites that are both beautiful and functional.",
    longDescription: "Our Website Development service delivers responsive, high-performance websites tailored to your brand. We focus on creating an exceptional user experience, ensuring your site is fast, secure, and easy to navigate. From corporate sites to e-commerce platforms, we build digital experiences that convert.",
    image: getImage('service_web_dev'),
  },
  {
    icon: "Palette",
    title: "Branding & Logo Design",
    slug: "branding-logo-design",
    description: "Define your brand identity. From logo design to complete branding agency services, we help you make a memorable impression.",
    longDescription: "Our Branding & Logo Design service helps you craft a powerful brand identity. We work with you to develop a unique brand story, a memorable logo, and a cohesive visual system. We'll provide a full suite of brand assets to ensure consistency across all your marketing channels.",
    image: getImage('service_branding'),
  },
  {
    icon: "Megaphone",
    title: "Google Ads & Meta Ads",
    slug: "google-meta-ads",
    description: "Maximize your ROI with targeted ad campaigns. We manage your paid advertising on platforms like Google and Meta to deliver measurable results.",
    longDescription: "Supercharge your growth with our Google & Meta Ads management service. We create, manage, and optimize paid ad campaigns to reach your target audience and drive conversions. Our data-driven approach ensures you get the most out of your advertising budget, with detailed reporting to track your ROI.",
    image: getImage('service_ads'),
  },
  {
    icon: "BarChart",
    title: "Content Creation",
    slug: "content-creation",
    description: "Engage your audience with compelling content. Our team creates high-quality articles, videos, and graphics that tell your brand's story.",
    longDescription: "Our Content Creation service provides you with high-quality, SEO-friendly content that resonates with your audience. We produce blog posts, articles, videos, infographics, and more to establish your authority in your industry and engage your customers at every stage of their journey.",
    image: getImage('service_content'),
  },
];

export const whyChooseUs = [
    {
        icon: Target,
        title: "Result-Driven Approach",
        description: "Our core focus is on delivering measurable results. We use data-driven strategies to ensure your digital marketing efforts lead to real business growth."
    },
    {
        icon: Award,
        title: "Creative Excellence",
        description: "As a leading branding agency, we blend creativity with strategy to build memorable brands that stand out in a crowded digital landscape."
    },
    {
        icon: Users,
        title: "Expert Team",
        description: "Our team consists of social media experts, SEO specialists, and talented designers dedicated to your success. We are Markify Digital."
    }
]

export const testimonials_hardcoded: Testimonial[] = [
  {
    name: "Priya Sharma",
    company: "Sharma Electronics, Ahmedabad",
    comment: "Markify Digital transformed our online presence. Their SEO services are top-notch, and our ranking has never been better. A truly professional digital marketing agency.",
    rating: 5,
  },
  {
    name: "Rahul Kumar",
    company: "Kumar Sarees, Surat",
    comment: "The new website design is incredible! It's beautiful, fast, and our customers love it. The team was creative and understood our vision perfectly.",
    rating: 5,
  },
  {
    name: "Anjali Gupta",
    company: "Gupta Sweets, Vadodara",
    comment: "Their social media expert team is amazing. Our engagement has skyrocketed, and we're reaching a wider audience than ever before. Highly recommended!",
    rating: 5,
  },
];

export const portfolioItems = [
    {
        title: "E-commerce Redesign",
        category: "Website Development",
        description: "Complete overhaul of an outdated e-commerce platform, resulting in a 40% increase in conversions and a 60% improvement in mobile usability.",
        beforeImage: getImage('portfolio_1_before'),
        afterImage: getImage('portfolio_1_after'),
        results: "40% Conversion Increase"
    },
    {
        title: "Startup Rebranding",
        category: "Branding & Logo Design",
        description: "Developed a new brand identity for a tech startup, including a modern logo and brand guidelines that resonated with their target audience.",
        beforeImage: getImage('portfolio_2_before'),
        afterImage: getImage('portfolio_2_after'),
        results: "New Market Positioning"
    },
    {
        title: "Social Growth Campaign",
        category: "Social Media Marketing",
        description: "Launched a viral marketing campaign across multiple social platforms, growing the client's follower base by 300% in just three months.",
        mainImage: getImage('portfolio_3_main'),
        results: "300% Follower Growth"
    }
];

export const clientLogos = [
    getImage('client_logo_engineering'),
    getImage('client_logo_hospital'),
    getImage('client_logo_protein'),
    getImage('client_logo_construction'),
    getImage('client_logo_clinic'),
    getImage('client_logo_gym'),
];
