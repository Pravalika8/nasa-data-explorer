import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCamera, FaSearch, FaGlobe, FaMeteor, FaImage
} from 'react-icons/fa';

const features = [
  {
    title: 'Astronomy Picture of the Day (APOD)',
    icon: <FaCamera className="text-blue-400 text-3xl" />,
    description: 'See NASA’s featured photo of the day, including high-resolution images and descriptions.',
    link: '/apod',
  },
  {
    title: 'EPIC Earth Images',
    icon: <FaGlobe className="text-green-400 text-3xl" />,
    description: 'View daily Earth images captured from a satellite orbiting 1 million miles away.',
    link: '/epic',
  },
  {
    title: 'NASA Media Library',
    icon: <FaImage className="text-yellow-400 text-3xl" />,
    description: 'Search and browse NASA’s vast archive of images and videos by keyword.',
    link: '/media',
  },
  {
    title: 'Near-Earth Objects (Asteroids)',
    icon: <FaMeteor className="text-purple-400 text-3xl" />,
    description: 'Visualize asteroids approaching Earth with size, speed, and date filters.',
    link: '/neo',
  },
];

function HomePage() {
  return (
    <React.Fragment>
      <div className=' bg-center bg-no-repeat pt-8 bg-cover text-white transition-opacity duration-1000 opacity-100'>
        <div className="max-w-5xl w-full h-full mx-auto px-4 py-10" >
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-300">
            Welcome to NASA Data Explorer
          </h1>
          <p className="text-gray-300 text-center mb-10">
            Explore the wonders of the universe through NASA's public APIs. Choose a section below to get started.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <Link
                to={feature.link}
                key={idx}
                className="bg-gray-800/95 hover:bg-gray-700 rounded-lg p-6 shadow transition-all duration-200"
              >
                <div className="flex items-center gap-4 mb-2">
                  {feature.icon}
                  <h2 className="text-xl font-semibold">{feature.title}</h2>
                </div>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
