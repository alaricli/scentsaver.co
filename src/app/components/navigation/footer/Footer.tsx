import { FC } from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import Newsletter from './Newsletter';
import { FooterLink, SocialLink } from '@/types/types';

const footerLinks: FooterLink[] = [
  { href: '/faq', label: 'FAQ' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/shipping', label: 'Shipping' },
  { href: '/returns', label: 'Returns' },
];

const socialLinks: SocialLink[] = [
  {
    href: 'https://www.facebook.com/profile.php?id=61566521623716',
    icon: <FaFacebook size={24} />,
    label: 'Visit our Facebook page',
    hoverColor: 'hover:text-[#1877F2]',
  },
  {
    href: 'https://www.instagram.com/scentsavernet/',
    icon: <FaInstagram size={24} />,
    label: 'Follow us on Instagram',
    hoverColor: 'hover:text-[#E1306C]',
  },
  {
    href: 'https://www.tiktok.com/@scentsaver.net',
    icon: <FaTiktok size={24} />,
    label: 'Follow us on TikTok',
    hoverColor: 'hover:text-[#ff0050]',
  },
];

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-gray-900 p-2 text-center text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* About Section */}
        <div>
          <h2 className="mt-1 text-lg font-bold">About</h2>
          <nav aria-label="Footer navigation">
            <ul className="text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-gray-300"
                    aria-label={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Newsletter Section */}
        <div>
          <h2 className="mt-1 text-lg font-bold">Newsletter</h2>
          <p className="text-center">
            Join our newsletter to stay up to date with us!
          </p>
          <div>
            <Newsletter />
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="mt-1 text-lg font-bold">Get in Touch!</h2>
          <p>
            Contact us:{' '}
            <a
              href="mailto:contact@scentsaver.co"
              className="transition-colors duration-200 hover:text-gray-300"
              aria-label="Send us an email"
            >
              contact@scentsaver.co
            </a>
          </p>

          {/* Social Links */}
          <nav
            className="mt-4 flex justify-center space-x-6"
            aria-label="Social media links"
          >
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white ${social.hoverColor} transition-colors duration-200`}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div className="p-2 text-sm">
        <p>
          <small>
            Copyright © {currentYear} scentsaver.co, all rights reserved
          </small>
        </p>
      </div>

      {/* Optional: Add schema markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'scentsaver.co',
            url: 'https://scentsaver.co',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'contact@scentsaver.co',
              contactType: 'customer service',
            },
            sameAs: socialLinks.map((social) => social.href),
          }),
        }}
      />
    </footer>
  );
};

export default Footer;
