const Footer = () => {
  return (
    <footer className="bg-gray-900 p-4 text-center text-white">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <h3>Newsletter</h3>
        </div>
        <div>
          <h3>Links</h3>
        </div>
        <div>
          <h3>Get in Touch!</h3>
        </div>
      </div>
      <div className="mt-4">
        <p>Copyright © {new Date().getFullYear()} scentsaver</p>
      </div>
    </footer>
  );
};

export default Footer;
