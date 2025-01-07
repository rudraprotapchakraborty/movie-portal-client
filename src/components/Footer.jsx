const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 px-6 lg:px-20 pt-16 lg:pt-20 transition-all duration-500 ease-in-out">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* About Us Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 hover:text-green-400 transition-colors duration-300">About Us</h3>
              <p className="text-sm transition-all duration-300 hover:text-gray-400">
                Welcome to <span className="font-semibold text-green-400">Movie Portal</span>, your one-stop destination for movies. Our mission is to provide all kinds of movies. Thank you for being a part of our journey!
              </p>
            </div>
  
            {/* Quick Links Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 hover:text-green-400 transition-colors duration-300">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition-colors duration-300">Home</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors duration-300">Services</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
  
            {/* Support Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 hover:text-green-400 transition-colors duration-300">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors duration-300">Report an Issue</a></li>
              </ul>
            </div>
  
            {/* Contact Us Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 hover:text-green-400 transition-colors duration-300">Contact Us</h3>
              <p className="text-sm mb-2 transition-all duration-300 hover:text-gray-400">
                <strong>Email:</strong> <a href="mailto:support@movieportal.com" className="hover:text-green-400 transition-colors duration-300">support@movieportal.com</a>
              </p>
              <p className="text-sm mb-2 transition-all duration-300 hover:text-gray-400">
                <strong>Phone:</strong> <a href="tel:+1234567890" className="hover:text-green-400 transition-colors duration-300">+1 234 567 890</a>
              </p>
              <p className="text-sm mb-4 transition-all duration-300 hover:text-gray-400">
                <strong>Address:</strong> 123 Main Street, Rajshahi, Bangladesh
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.437 9.879v-6.99h-2.54V12h2.54v-1.528c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.46h-1.261c-1.243 0-1.63.772-1.63 1.564V12h2.773l-.443 2.889h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.5 3h-5.8L12 10.35 6.3 3H.5L9.7 12 1 21h5.7L12 13.5 18.3 21h5.7l-8.7-9L23.5 3z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7.25A4.75 4.75 0 1 1 7.25 12 4.75 4.75 0 0 1 12 7.25zm0 1.5a3.25 3.25 0 1 0 3.25 3.25A3.25 3.25 0 0 0 12 8.75zm5.5-2a.75.75 0 1 1-.75-.75.75.75 0 0 1 .75.75z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
  
        {/* Footer Bottom Section */}
        <div className="text-center text-gray-500 text-sm mt-16 lg:mt-20 transition-all duration-300 hover:text-green-400">
          © 2025 MoviePortal. Built with love.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  