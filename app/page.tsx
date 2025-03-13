// pages/index.tsx
'use client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FC, useState, useEffect } from 'react';


interface EventProps {
  title: string;
  date: string;
  location: string;
  description: string;
}

interface InstagramPostProps {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  timestamp: string;
}

const InstagramPost: FC<InstagramPostProps> = ({ imageUrl, caption, likes, timestamp }) => {
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="aspect-square bg-gray-200 overflow-hidden">
        <Image
          src={imageUrl}
          alt={caption}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-white text-sm line-clamp-2 mb-2">{caption}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-white">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">{likes}</span>
          </div>
          <span className="text-white text-xs">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

const EventCard: FC<EventProps> = ({ title, date, location, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
      <p className="text-orange-500 font-semibold mb-2">{date}</p>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2 flex items-center">
        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {location}
      </p>
      <p className="text-gray-700 mb-4">{description}</p>
      <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-5 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
        Register Now
      </button>
    </div>
  );
};

interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl border border-orange-100 group hover:border-orange-200">
      <div className="text-orange-500 flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface DonateOptionProps {
  icon: JSX.Element;
  title: string;
  description: string;
  buttonText: string;
}

const DonateOption: FC<DonateOptionProps> = ({ icon, title, description, buttonText }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:translate-y-1">
      <div className="text-orange-500 mb-4 bg-orange-50 rounded-full p-3 inline-block">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium w-full py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
        {buttonText}
      </button>
    </div>
  );
};

// Animation component for fade-in effect
const FadeIn: FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolling(true);
      
      // Get all section elements
      const sections = document.querySelectorAll('section[id]');
      
      // Find the current active section based on scroll position
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
      
      // Clear the timeout if it exists
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
      
      // Set a new timeout
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100) as unknown as number;
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const upcomingEvents = [
    {
      title: "Community Fundraiser Gala",
      date: "April 18, 2025",
      location: "Nairobi Convention Center",
      description: "Join us for an evening of inspiration, entertainment, and community spirit as we raise funds for our education programs."
    },
    {
      title: "Volunteer Day: School Rebuilding",
      date: "May 2, 2025",
      location: "Little Haven Center, Mombasa",
      description: "Help us renovate and prepare our newest daycare center. All skills welcome!"
    },
    {
      title: "Youth Leadership Workshop",
      date: "May 15, 2025",
      location: "Virtual Event",
      description: "Empowering the next generation of leaders with practical skills and mentorship."
    }
  ];

  return (
    <div className="bg-gray-50">
      <Head>
        <title>High Five Initiative | Care. Connect. Impact.</title>
        <meta name="description" content="Creating meaningful social impact through various campaigns and programs across Africa." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-md bg-white/90 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-orange-500 flex items-center">
              <Image 
              src="/images/high-five-logo.png"  
              alt="High Five Initiative" 
              width={40} 
              height={40} 
              className="mr-2"
              />
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text">High Five</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a 
              onClick={() => scrollToSection('hero')} 
              className={`cursor-pointer text-gray-800 hover:text-orange-500 font-medium transition-colors ${activeSection === 'hero' ? 'text-orange-500' : ''}`}
            >
              Home
            </a>
            <a 
              onClick={() => scrollToSection('work')} 
              className={`cursor-pointer text-gray-800 hover:text-orange-500 font-medium transition-colors ${activeSection === 'work' ? 'text-orange-500' : ''}`}
            >
              Our Work
            </a>
            <a 
              onClick={() => scrollToSection('events')} 
              className={`cursor-pointer text-gray-800 hover:text-orange-500 font-medium transition-colors ${activeSection === 'events' ? 'text-orange-500' : ''}`}
            >
              Events
            </a>
            <a 
              onClick={() => scrollToSection('donate')} 
              className={`cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md ${activeSection === 'donate' ? 'from-orange-600 to-orange-700' : ''}`}
            >
              Donate Now
            </a>
          </nav>
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg px-4 py-6 absolute w-full">
            <nav className="flex flex-col space-y-4">
              <a onClick={() => scrollToSection('hero')} className="text-gray-800 hover:text-orange-500 transition-colors">Home</a>
              <a onClick={() => scrollToSection('work')} className="text-gray-800 hover:text-orange-500 transition-colors">Our Work</a>
              <a onClick={() => scrollToSection('events')} className="text-gray-800 hover:text-orange-500 transition-colors">Events</a>
              <a onClick={() => scrollToSection('impact')} className="text-gray-800 hover:text-orange-500 transition-colors">Impact</a>
              <a onClick={() => scrollToSection('donate')} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full text-center">Donate Now</a>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative py-20 overflow-hidden scroll-mt-24">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white z-0 opacity-80"></div>
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -left-24 bottom-0 w-80 h-80 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>

          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
            <FadeIn>
              <div className="md:w-1/2 mb-12 md:mb-0 md:pr-8">
                <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">
                  Community Impact Platform
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Care. Connect. <span className="text-orange-500">Impact.</span>
                </h1>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  The High Five Initiative is a community platform dedicated to creating meaningful social impact through various campaigns and programs across Africa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => scrollToSection('volunteer')} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                    Get Involved
                  </button>
                  <button onClick={() => scrollToSection('work')} className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-medium px-8 py-3 rounded-lg transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform md:translate-x-8 hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/api/placeholder/600/400"
                    alt="Children learning together"
                    width={600}
                    height={400}
                    className="w-full h-auto" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Our Work Section */}
        <section id="work" className="py-20 scroll-mt-24">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                  What We Do
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
                  We focus on sustainable development through education, healthcare, and community empowerment programs across Africa.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FadeIn delay={100}>
                <ServiceCard
                  icon={<svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>}
                  title="Education"
                  description="We provide access to quality education for underserved communities, focusing on infrastructure, resources, and teacher training."
                />
              </FadeIn>

              <FadeIn delay={200}>
                <ServiceCard
                  icon={<svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>}
                  title="Healthcare"
                  description="We work to improve healthcare access through mobile clinics, vaccination programs, and health education initiatives."
                />
              </FadeIn>

              <FadeIn delay={300}>
                <ServiceCard
                  icon={<svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>}
                  title="Community Empowerment"
                  description="We support local initiatives, entrepreneurship, and sustainable development projects led by community members."
                />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section id="impact" className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-block px-3 py-1 bg-white text-orange-600 rounded-full text-sm font-medium mb-4">
                  Our Impact
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Making A Difference</h2>
                <div className="w-24 h-1 bg-white mx-auto"></div>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <FadeIn delay={100}>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">12K+</div>
                  <div className="text-lg font-medium">Children Educated</div>
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">36</div>
                  <div className="text-lg font-medium">Communities Served</div>
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">8</div>
                  <div className="text-lg font-medium">Countries Reached</div>
                </div>
              </FadeIn>

              <FadeIn delay={400}>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">5M+</div>
                  <div className="text-lg font-medium">Funds Raised</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-20 scroll-mt-24">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                  Get Involved
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <EventCard
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    description={event.description}
                  />
                </FadeIn>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/events" className="text-orange-500 hover:text-orange-600 font-medium flex items-center justify-center">
                View All Events
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Volunteer Section */}
        <section id="volunteer" className="py-20 bg-gray-100 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <FadeIn>
                <div className="md:w-1/2 mb-12 md:mb-0 md:pr-8">
                  <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                    Join Our Team
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Volunteer With Us</h2>
                  <p className="text-lg text-gray-700 mb-8">
                    Make a difference by volunteering your time and skills. We have opportunities for everyone, whether you&apos;re looking to volunteer remotely or in-person across our project locations.
                  </p>
                  <ul className="mb-8">
                    <li className="flex items-center mb-4">
                      <svg className="w-5 h-5 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Flexible time commitments</span>
                    </li>
                    <li className="flex items-center mb-4">
                      <svg className="w-5 h-5 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Remote and in-person opportunities</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Training and support provided</span>
                    </li>
                  </ul>
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                    Apply to Volunteer
                  </button>
                </div>
              </FadeIn>
              <FadeIn delay={300}>
                <div className="md:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/api/placeholder/600/400"
                      alt="Volunteers working together"
                      width={600}
                      height={400}
                      className="w-full h-auto" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section id="donate" className="py-20 scroll-mt-24">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
                  Support Our Mission
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Make A Donation</h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
                  Your donation helps us continue our work in providing education, healthcare, and community support across Africa.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FadeIn delay={100}>
                <DonateOption
                  icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>}
                  title="One-time Donation"
                  description="Make a one-time donation to support our programs. Every contribution makes a difference."
                  buttonText="Donate Now"
                />
              </FadeIn>

              <FadeIn delay={200}>
                <DonateOption
                  icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.0020 00-9.729-1.11A5.002 5.002 0 0111.1 2H9a1 1 0 010-2h2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 0016.1 7H14a1 1 0 010-2h2a1 1 0 011 1v2.101a7.002 7.002 0 01-11.601 2.566 1 1 0 01-.661-1.889A5.002 5.002 0 0013.9 7H12a1 1 0 010-2h2a1 1 0 011 1v2.101a7.002 7.002 0 01-11.601 2.566 1 1 0 01-.661-1.889A5.002 5.002 0 013.9 7H3a1 1 0 01-1-1V3a1 1 0 011-1h1z" clipRule="evenodd" />
                  </svg>}
                  title="Monthly Giving"
                  description="Become a monthly donor and provide sustainable support for our long-term initiatives."
                  buttonText="Give Monthly"
                />
              </FadeIn>

              <FadeIn delay={300}>
                <DonateOption
                  icon={<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>}
                  title="Corporate Sponsorship"
                  description="Partner with us through corporate sponsorship programs tailored to your organization's goals."
                  buttonText="Partner With Us"
                />
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-20 bg-white scroll-mt-24">
  <div className="container mx-auto px-4">
    <FadeIn>
      <div className="text-center mb-16">
        <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
          @highfiveinitiative
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Instagram Gallery</h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
          Follow our journey on Instagram and see the impact we&apos;re making across communities.
        </p>
      </div>
    </FadeIn>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Instagram posts would be dynamically loaded here */}
      <FadeIn delay={100}>
        <InstagramPost
          id="post1"
          imageUrl="https://www.instagram.com/p/DDPbf9Io8Th/"
          caption="Celebrating the opening of our new school in Mombasa! Thanks to all our supporters who made this possible. #EducationForAll #HighFiveInitiative"
          likes={124}
          timestamp="2 days ago"
        />
      </FadeIn>
      <FadeIn delay={150}>
        <InstagramPost
          id="post2"
          imageUrl="/api/placeholder/400/400"
          caption="Our healthcare volunteers providing essential vaccines to children in rural communities. Every child deserves access to healthcare. #HealthForAll"
          likes={98}
          timestamp="4 days ago"
        />
      </FadeIn>
      <FadeIn delay={200}>
        <InstagramPost
          id="post3"
          imageUrl="/api/placeholder/400/400"
          caption="Women's empowerment workshop teaching sustainable farming techniques. These skills will help build resilient communities. #WomenEmpowerment"
          likes={156}
          timestamp="1 week ago"
        />
      </FadeIn>
      <FadeIn delay={250}>
        <InstagramPost
          id="post4"
          imageUrl="/api/placeholder/400/400"
          caption="Clean water initiative completed in Turkana County. Now over 500 families have access to clean drinking water. #WaterForLife"
          likes={201}
          timestamp="1 week ago"
        />
      </FadeIn>
      <FadeIn delay={300}>
        <InstagramPost
          id="post5"
          imageUrl="/api/placeholder/400/400"
          caption="Youth leadership program graduation ceremony. These young leaders are ready to make a difference in their communities! #YouthLeaders"
          likes={87}
          timestamp="2 weeks ago"
        />
      </FadeIn>
      <FadeIn delay={350}>
        <InstagramPost
          id="post6"
          imageUrl="/api/placeholder/400/400"
          caption="Building playgrounds for children in underserved areas. Play is an essential part of childhood development. #PlayMatters"
          likes={112}
          timestamp="2 weeks ago"
        />
      </FadeIn>
      <FadeIn delay={400}>
        <InstagramPost
          id="post7"
          imageUrl="/api/placeholder/400/400"
          caption="Volunteer teams distributing food packages during the pandemic. Together we can overcome any challenge. #CommunitySupport"
          likes={145}
          timestamp="3 weeks ago"
        />
      </FadeIn>
      <FadeIn delay={450}>
        <InstagramPost
          id="post8"
          imageUrl="/api/placeholder/400/400"
          caption="Teacher training program in session. Equipping educators with new skills to improve learning outcomes. #QualityEducation"
          likes={78}
          timestamp="3 weeks ago"
        />
      </FadeIn>
    </div>

    <div className="text-center mt-12">
      <a 
        href="https://www.instagram.com/highfive_initiative/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center"
      >
        <FaInstagram className="mr-2" size={20} />
        Follow Us on Instagram
      </a>
    </div>
  </div>
</section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <FadeIn>
                <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
                <p className="text-gray-300 mb-8">
                  Subscribe to our newsletter to receive updates on our projects, events, and impact stories.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                    Subscribe
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="text-2xl font-bold text-white flex items-center mb-4">
                <span className="mr-2 bg-orange-500 p-1 rounded-lg">🖐️</span>
                High Five
              </Link>
              <p className="mb-4">
                Creating meaningful social impact through various campaigns and programs across Africa.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Our Programs</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Get Involved</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Volunteer</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Donate</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Partnerships</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Fundraise</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  123 Charity Street, Nairobi, Kenya
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  info@highfiveinitiative.org
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  +254 123 456 789
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} High Five Initiative. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Add this to the global window object
declare global {
  interface Window {
    scrollTimeout: number;
  }
}