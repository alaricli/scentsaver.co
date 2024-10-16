import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import Newsletter from './Newsletter';

const Footer = () => {
  return (
    <footer className="bg-gray-900 p-2 text-center text-white">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">Links</h3>
          <ul className="text-sm">
            <li>
              <Link href="/all">Shop</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Use</Link>
            </li>
            <li>
              <Link href="/shipping">Shipping</Link>
            </li>
            <li>
              <Link href="/returns">Returns</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h3 className="text-lg font-bold">Newsletter</h3>
          <p className="text-center">
            Join our mailing list and stay up to date
          </p>
          <div>
            <Newsletter />
          </div>
        </div>

        <div>
          <div>
            <h3 className="text-lg font-bold">Get in Touch!</h3>
            <p>
              Contact us:{' '}
              <a
                href="mailto:contact@scentsaver.net"
                className="hover:text-gray-300"
              >
                contact@scentsaver.net
              </a>
            </p>

            <div className="mt-4 flex justify-center space-x-6">
              <a
                href="https://www.facebook.com/profile.php?id=61566521623716"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#1877F2]"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/scentsavernet/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#E1306C]"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@scentsaver.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#ff0050]"
              >
                <FaTiktok size={24} />
              </a>
              {/* <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#1da1f2]"
              >
                <FaTwitter size={24} />
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 text-sm">
        <p>
          Copyright © {new Date().getFullYear()} scentsaver.net, all rights
          reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
