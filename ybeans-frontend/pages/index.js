import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
  const sectionRefs = useRef([]);
  const { scrollYProgress } = useScroll();
  const yBeans = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 3000); // 动画持续3秒
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

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
      <div className="storytelling-container relative">
        <motion.div 
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
          style={{ 
            backgroundImage: 'url(ybeans-frontend/public/background.jpg)', 
            backgroundSize: 'cover',
            opacity: 0.1,
            y: yBeans
          }}
        />

        <section className="brand-animation py-20 bg-coffee-light relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Experience YBeans</h2>
            <div className="grid-animation relative w-80 h-80 mx-auto" onClick={startAnimation}>
              {[...Array(9)].map((_, index) => (
                <div key={index} className={`square ${index === 4 && isAnimating ? 'falling-square' : ''}`}></div>
              ))}
              <div className={`coffee-bean ${isAnimating ? 'animate-coffee-bean' : ''}`}></div>
            </div>
            <p className="text-center mt-4">Click to see the magic!</p>
          </div>
        </section>

        <section ref={(el) => (sectionRefs.current[0] = el)} className="hero-section h-screen flex items-center justify-center bg-coffee-dark text-white relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center z-10"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Discover YBeans Monthly</h1>
            <p className="text-xl md:text-2xl mb-8">Premium coffee beans, delivered to your door every month</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/subscribe" className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300">
                Start Your Subscription
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Image src="/images/scroll-down-arrow.png" alt="Scroll Down" width={40} height={40} />
          </motion.div>
        </section>

        <section ref={(el) => (sectionRefs.current[1] = el)} className="subscription-intro py-20 bg-coffee-light relative">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
            >
              YBeans Monthly Subscription
            </motion.h2>
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 mb-8 md:mb-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image src="/images/subscription-box.jpg" alt="YBeans Subscription Box" width={500} height={300} className="rounded-lg shadow-lg" />
              </motion.div>
              <div className="md:w-1/2 md:pl-8">
                <h3 className="text-2xl font-semibold mb-4">What You Get:</h3>
                <ul className="list-disc list-inside mb-6">
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Freshly roasted premium coffee beans
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Curated selection changes monthly
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Tasting notes and brewing tips
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Free shipping on all subscriptions
                  </motion.li>
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/subscribe" className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300">
                    Join Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section ref={(el) => (sectionRefs.current[2] = el)} className="seasonal-coffee py-20 bg-coffee-medium text-white relative">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
            >
              This Season's Special: Summer Blend
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image src="/images/summer-blend.jpg" alt="Summer Blend Coffee" width={400} height={400} className="rounded-lg shadow-lg" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Taste the Sunshine</h3>
                <p className="mb-4">Our Summer Blend combines light, fruity notes with a smooth finish. Perfect for cold brews and iced lattes.</p>
                <ul className="list-disc list-inside mb-6">
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Origin: Colombia & Ethiopia
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Roast: Medium-Light
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Flavor Notes: Citrus, Berries, Honey
                  </motion.li>
                </ul>
                <p className="mb-4">Available now for all subscribers!</p>
              </div>
            </div>
          </div>
        </section>

        <section ref={(el) => (sectionRefs.current[3] = el)} className="how-it-works py-20 bg-coffee-light relative">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="bg-coffee-medium text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2">Choose Your Plan</h3>
                <p>Select how often you want your coffee delivered.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-coffee-medium text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2">Receive Your Coffee</h3>
                <p>We'll ship your freshly roasted beans right to your door.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="bg-coffee-medium text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2">Enjoy & Repeat</h3>
                <p>Savor your coffee and look forward to next month's selection.</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={(el) => (sectionRefs.current[4] = el)} className="testimonials py-20 bg-coffee-dark text-white relative">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
            >
              What Our Subscribers Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-coffee-medium p-6 rounded-lg shadow-lg"
              >
                <p className="mb-4">"I love the variety of coffees I get to try each month. YBeans has introduced me to flavors I never knew existed!"</p>
                <p className="font-semibold">- Sarah T., Subscribed for 6 months</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-coffee-medium p-6 rounded-lg shadow-lg"
              >
                <p className="mb-4">"The convenience of having premium coffee delivered to my door is unbeatable. Plus, the quality is always top-notch."</p>
                <p className="font-semibold">- Mike R., Subscribed for 1 year</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={(el) => (sectionRefs.current[5] = el)} className="cta-section py-20 bg-coffee-light relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join YBeans Monthly?</h2>
            <p className="text-xl mb-8">Start your coffee journey today and never run out of great coffee again.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/subscribe" className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition duration-300">
                Subscribe Now
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
