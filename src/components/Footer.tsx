
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-micropm-soft-gray py-10 px-6 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-micropm-purple flex items-center justify-center">
                <span className="text-white font-bold text-lg">μ</span>
              </div>
              <span className="font-playfair font-bold text-xl">MicroPM</span>
            </div>
            <p className="text-micropm-medium-gray mb-4">
              Product Management in a Box for indie hackers, founders, and early PMs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/tools" className="text-micropm-medium-gray hover:text-micropm-purple">
                    Tools
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-micropm-medium-gray hover:text-micropm-purple">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-micropm-medium-gray hover:text-micropm-purple">
                    Templates
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-micropm-medium-gray hover:text-micropm-purple">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-micropm-medium-gray hover:text-micropm-purple">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-micropm-medium-gray hover:text-micropm-purple">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Subscribe to our newsletter</h4>
            <p className="text-micropm-medium-gray mb-4">
              Get product management tips and updates.
            </p>
            <div className="flex max-w-md">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-l-md border border-r-0 border-micropm-soft-gray focus:outline-none focus:ring-1 focus:ring-micropm-purple"
              />
              <button className="bg-micropm-purple hover:bg-opacity-90 text-white px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-micropm-soft-gray mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-micropm-medium-gray text-sm mb-4 md:mb-0">
            © {currentYear} MicroPM. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-micropm-medium-gray hover:text-micropm-purple text-sm">
              Terms
            </Link>
            <Link to="#" className="text-micropm-medium-gray hover:text-micropm-purple text-sm">
              Privacy
            </Link>
            <Link to="#" className="text-micropm-medium-gray hover:text-micropm-purple text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
