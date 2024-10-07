import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

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
            <form className="flex items-center justify-center p-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-2/3 rounded-l-md p-1 text-black"
              />
              <button
                type="submit"
                className="rounded-r-md bg-blue-600 p-1 px-4 font-bold text-white hover:bg-blue-900"
              >
                Join
              </button>
            </form>
            <p className="text-sm">
              By entering your email, you agree to our Terms of Use & Privacy
              Policy, including receipt of emails and promotions. You can
              unsubcribe at any time.
            </p>
          </div>
        </div>

        <div>
          <div>
            <h3 className="text-lg font-bold">Get in Touch!</h3>
            <p>Contact us: contact@scentsaver.net</p>
            <div className="mt-4 flex justify-center space-x-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#1877F2]"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#E1306C]"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#ff0050]"
              >
                <FaTiktok size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#1da1f2]"
              >
                <FaTwitter size={24} />
              </a>
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
