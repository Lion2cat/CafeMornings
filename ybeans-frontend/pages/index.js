import React, { useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
  const sectionRefs = useRef([]);
  const { scrollYProgress } = useScroll();
  const yBeans = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <Layout>
      <div className="relative overflow-hidden">
        <motion.div 
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
          style={{ 
            backgroundImage: 'url(/images/coffee-beans-bg.jpg)', 
            backgroundSize: 'cover',
            opacity: 0.05,
            y: yBeans
          }}
        />

        <section className="hero-section h-screen flex items-center justify-center bg-coffee-dark text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">Discover<br/>YBeans Monthly</h1>
              <p className="text-xl md:text-3xl mb-10 max-w-2xl mx-auto">Premium coffee beans, delivered to your door every month</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/subscribe" className="bg-yellow-500 text-coffee-dark px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-400 transition duration-300">
                  Start Your Journey
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-coffee-dark to-transparent"></div>
        </section>

        <section className="seasonal-coffee py-32 bg-coffee-light text-coffee-dark relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-16 text-center"
            >
              This Season's Special
            </motion.h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div 
                className="md:w-1/2 mb-12 md:mb-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image src="/images/seasonal-coffee.jpg" alt="Seasonal Coffee Blend" width={600} height={400} className="rounded-lg shadow-2xl" />
              </motion.div>
              <div className="md:w-1/2 md:pl-16">
                <h3 className="text-3xl font-semibold mb-8 text-yellow-600">Summer Sunrise Blend</h3>
                <p className="text-xl mb-8">Experience the bright and refreshing notes of our limited edition Summer Sunrise Blend. This seasonal offering brings together the best of summer flavors in every cup.</p>
                <ul className="space-y-4 mb-12">
                  <motion.li 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center text-xl"
                  >
                    <span className="text-yellow-500 mr-4">☀️</span>Origin: Ethiopia & Colombia
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center text-xl"
                  >
                    <span className="text-yellow-500 mr-4">🍊</span>Tasting Notes: Citrus, Berries, Honey
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center text-xl"
                  >
                    <span className="text-yellow-500 mr-4">🌞</span>Roast Level: Medium
                  </motion.li>
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/subscribe" className="bg-coffee-dark text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-coffee-medium transition duration-300">
                    Try It Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-coffee-dark to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-64 bg-coffee-medium transform -skew-y-6"></div>
        </section>

        <section className="subscription-intro py-32 bg-white relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-16 text-center text-coffee-dark"
            >
              YBeans Monthly Subscription
            </motion.h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div 
                className="md:w-1/2 mb-12 md:mb-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image src="/images/subscription-box.jpg" alt="YBeans Subscription Box" width={600} height={400} className="rounded-lg shadow-2xl" />
              </motion.div>
              <div className="md:w-1/2 md:pl-16">
                <h3 className="text-3xl font-semibold mb-8 text-coffee-medium">What You Get:</h3>
                <ul className="space-y-6 mb-12">
                  {['Freshly roasted premium coffee beans', 'Curated selection changes monthly', 'Tasting notes and brewing tips', 'Free shipping on all subscriptions'].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-xl"
                    >
                      <span className="text-yellow-500 mr-4">✓</span>{item}
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/subscribe" className="bg-coffee-medium text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-coffee-dark transition duration-300">
                    Join Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-coffee-light to-transparent"></div>
        </section>

        <section className="cta-section py-32 bg-coffee-dark text-white relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 text-center relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Join YBeans Monthly?</h2>
            <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">Start your coffee journey today and never run out of great coffee again.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/subscribe" className="bg-yellow-500 text-coffee-dark px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-400 transition duration-300">
                Subscribe Now
              </Link>
            </motion.div>
          </motion.div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
