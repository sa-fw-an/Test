import React, { useMemo } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import learnImage from '../assets/learn.jpg';
import teachImage from '../assets/teach.jpg';
import teach1Image from '../assets/teach1.jpg';
import discussImage from '../assets/discuss.jpeg';
import teach2Image from '../assets/teach2.jpeg';

interface ImageConfig {
  src: string;
  alt: string;
  caption?: string;
}

interface HeroContent {
  title: string;
  description: string;
}

const MainPage: React.FC = () => {
  const heroContent: HeroContent = useMemo(() => ({
    title: "SUGAR LABS",
    description: `Whether you're a young learner, teacher, or a budding developer,
      we believe Sugar Labs has something for you. Read on to learn more
      about our award-winning Sugar Learning Platform and how to join our
      diverse community of teachers and learners.`
  }), []);

  const images: Record<string, ImageConfig> = useMemo(() => ({
    main: {
      src: teachImage,
      alt: "Sugar Labs Learning Environment"
    },
    bottom1: {
      src: teach2Image,
      alt: "Sugar Labs Collaboration",
      caption: "Collaborative Learning Environment"
    },
    bottom2: {
      src: teach1Image,
      alt: "Sugar Labs Teaching",
      caption: "Interactive Teaching Tools"
    },
    bottom3: {
      src: discussImage,
      alt: "Sugar Labs Learning",
      caption: "Global Learning Community"
    }
  }), []);

  const renderImageCard = (key: string, image: ImageConfig) => (
    <div 
      key={key}
      className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
                 transition-all duration-500 bg-white"
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full max-h-80 md:h-96 object-cover transform group-hover:scale-105 
                   transition-all duration-700 ease-out"
        loading="lazy"
      />
      {image.caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 
                       to-transparent p-4 md:p-8">
          <p className="text-white font-medium text-lg md:text-xl">{image.caption}</p>
        </div>
      )}
    </div>
  );

  const renderCarouselItem = (key: string, image: ImageConfig) => (
    <div key={key} className="relative">
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      {image.caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 
                       to-transparent p-4">
          <p className="text-white font-medium text-base">{image.caption}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl 
                         transform hover:scale-[1.01] transition-all duration-500 
                         ease-out bg-white">
            <img
              src={images.main.src}
              alt={images.main.alt}
              className="w-full h-[500px] md:h-[700px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 
                           via-black/50 to-transparent" />
            <div className="absolute top-1/2 left-8 md:left-12 transform -translate-y-1/2 
                           text-white max-w-2xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 
                           leading-tight tracking-tight animate-fade-in font-display">
                {heroContent.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90 
                           animate-fade-in-delayed font-light">
                {heroContent.description}
              </p>
            </div>
          </div>

          {/* Desktop Image Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(images)
              .filter(([key]) => key.startsWith('bottom'))
              .map(([key, image]) => renderImageCard(key, image))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={5000}
              transitionTime={500}
              className="rounded-2xl overflow-hidden"
              stopOnHover
              swipeable
              emulateTouch
            >
              {Object.entries(images)
                .filter(([key]) => key.startsWith('bottom'))
                .map(([key, image]) => renderCarouselItem(key, image))}
            </Carousel>
          </div>
        </section>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="space-y-8 md:space-y-10">
            <div className="inline-block px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r 
                           from-red-500/10 to-orange-500/10 rounded-full">
              <span className="text-xs md:text-sm font-bold text-red-600 tracking-wider 
                             uppercase">
                Empowering Young Learners
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black space-y-2 
                           font-display tracking-tight">
              <span>Our Mission?</span>
              <div className="space-y-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r 
                                from-red-500 to-orange-500">
                  Authentic
                </span>
                <br />
                <span>Problem</span>
                <br />
                <span>Solving</span>
              </div>
            </h2>

            <h4 className="text-lg md:text-xl font-bold text-gray-800">
              Igniting Curiosity through Project Based Learning
            </h4>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Empowering Young Minds with Hands-on Learning, Transforming
              Curiosity into Discovery and Innovation.
            </p>
          </div>

          <div className="relative">
            <div className="bg-auto rounded-2xl overflow-hidden shadow-xl">
              {/* Mission Cards */}
              <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-white/95 
                             backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 
                             shadow-xl max-w-xs md:max-w-sm transform hover:scale-105 
                             transition-all duration-500 ease-out z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 
                              text-gray-900">
                  Project Based Learning
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  Empowering learners and educators with hands-on project-based
                  tools that enable creation and real-world problem-solving.
                </p>
              </div>

              <img
                src={learnImage}
                alt="Students learning"
                className="w-full rounded-2xl transform hover:scale-105 
                           transition-all duration-700 ease-out"
                loading="lazy"
              />

              <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 
                             bg-blue-50/95 backdrop-blur-sm rounded-xl md:rounded-2xl 
                             p-6 md:p-8 shadow-xl max-w-xs md:max-w-sm transform 
                             hover:scale-105 transition-all duration-500 ease-out z-10">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 
                              text-blue-900">
                  Challenge and Fun: It's hard fun.
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  Bringing interactive, meaningful experiences that make
                  education exciting and impactful.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
