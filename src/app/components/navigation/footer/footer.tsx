const Footer = () => {
  return (
    <footer className="bg-gray-900 p-4 text-center text-white">
      <div className="space-y-2">
        <p>Copyright © {new Date().getFullYear()} Scent Saver</p>
        <p>
          Follow us on
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: '5px' }}
          >
            Twitter
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
