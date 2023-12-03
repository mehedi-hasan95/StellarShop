import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-6 dark:bg-gray-800 dark:text-gray-100 border-t-2 border-emerald-600 py-10 mt-10">
      <div className="container grid grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Getting started</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <Link rel="noopener noreferrer" href="#">
              Installation
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Release Notes
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Upgrade Guide
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Using with Preprocessors
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Optimizing for Production
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Browser Support
            </Link>
            <Link rel="noopener noreferrer" href="#">
              IntelliSense
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Core Concepts</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <Link rel="noopener noreferrer" href="#">
              Utility-First
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Responsive Design
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Hover, Focus, &amp; Other States
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Dark Mode
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Adding Base Styles
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Extracting Components
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Adding New Utilities
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Customization</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <Link rel="noopener noreferrer" href="#">
              Configuration
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Theme Configuration
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Breakpoints
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Customizing Colors
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Customizing Spacing
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Configuring Variants
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Plugins
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Community</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <Link rel="noopener noreferrer" href="#">
              GitHub
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Discord
            </Link>
            <Link rel="noopener noreferrer" href="#">
              Twitter
            </Link>
            <Link rel="noopener noreferrer" href="#">
              YouTube
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 pt-12 text-sm">
        <span className="dark:text-gray-400">
          © Copyright {new Date().getFullYear()}. All Rights Reserved by{" "}
          <span className="text-blue-500">Mehedi</span>.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
