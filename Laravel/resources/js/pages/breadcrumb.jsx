import { useLocation, Link } from 'react-router-dom';
import React from 'react';
import '../../css/bento.css';

const Breadcrumb = () => {
  const location = useLocation();

  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50" style={{ fontFamily: "'Bitcount Prop Double', sans-serif"}}>
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-gray-700">
        <li>
          <Link to="/" className="block transition-colors hover:text-gray-900">Home</Link>
        </li>

        {paths.map((segment, index) => {
          const fullPath = '/' + paths.slice(0, index + 1).join('/');
          const isLast = index === paths.length - 1;

          return (
            <React.Fragment key={index}>
              <li className="rtl:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>

              <li>
                {isLast ? (
                  <span className="text-gray-700">{decodeURIComponent(segment)}</span>
                ) : (
                  <Link to={fullPath} className="block transition-colors hover:text-gray-900">
                    {decodeURIComponent(segment)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
    </div>
  );
};

export default Breadcrumb;