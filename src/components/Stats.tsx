import { motion } from 'framer-motion';
import { stats, statisticsData } from '@/constants/Stats.ts';
import {
  headerReveal,
  numberCounter,
  imageReveal,
  container,
  item,
} from '@/styles/Animations';

const Stats = () => {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6 bg-white">
      <div className="relative mb-24">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 transform -translate-y-1/2 opacity-30"></div>

        <motion.div
          className="relative z-10 text-center mx-auto max-w-2xl bg-white py-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1 variants={headerReveal} className="text-center">
            <motion.span
              className="block text-black font-Caveat text-7xl mb-2"
              variants={headerReveal}
              custom={1}
            >
              What
            </motion.span>
            <motion.div
              className="text-transparent bg-clip-text bg-gradient-to-r 
                        from-red-500 to-orange-500 font-Pacifico text-6xl mb-2"
              variants={headerReveal}
              custom={2}
            >
              numbers
            </motion.div>
            <motion.span
              className="text-black italic font-serif text-4xl"
              variants={headerReveal}
              custom={3}
            >
              say for us?
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-gray-600 text-xl leading-relaxed font-Roboto mt-6"
            variants={headerReveal}
            custom={4}
          >
            Sugar Labs, founded in 2008, has had{' '}
            <span className="italic">an impact on the lives of many</span>. Here
            are some of the statistics we are tracking
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="mb-16"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div
          className="flex flex-col lg:flex-row items-center bg-gradient-to-r from-green-50 to-green-100 rounded-2xl overflow-hidden shadow-xl border border-green-200"
          variants={item}
          whileHover="hover"
        >
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <h3 className="text-gray-700 text-2xl font-medium mb-4 font-AnonymousPro">
              Kids whose lives have been enriched by using the Sugar Learning
              Platform.
            </h3>
            <motion.div
              className="text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent font-Caveat"
              variants={numberCounter}
            >
              3,000,000+
            </motion.div>
            <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
          </div>

          <motion.div
            className="w-full lg:w-1/2 h-64 lg:h-96 relative"
            variants={imageReveal}
          >
            <img
              src={stats.kidlaptop}
              alt="Student with laptop"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent"></div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {statisticsData.slice(1).map((stat, index) => (
          <motion.div
            key={index}
            className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${stat.bgColor} border ${stat.borderColor}`}
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="h-48 relative overflow-hidden"
              variants={imageReveal}
            >
              <img
                src={stat.imageSrc}
                alt={stat.imageAlt}
                className="w-full h-full object-cover object-center"
              />
              <div
                className={`absolute inset-0 opacity-10 bg-gradient-to-br ${stat.gradient}`}
              ></div>
            </motion.div>
            <div className="p-6">
              <h3 className="text-gray-700 text-xl font-medium mb-3 font-AnonymousPro line-clamp-2 h-14">
                {stat.title}
              </h3>
              <motion.div
                className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent font-Caveat`}
                variants={numberCounter}
              >
                {stat.value}
              </motion.div>
              <div
                className={`w-24 h-1 bg-gradient-to-r ${stat.gradient} opacity-50 rounded-full mt-2`}
              ></div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Closing Section with Interactive Element */}
      <motion.div
        className="text-center mt-16 pt-16 border-t border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Join us and make a difference
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          These numbers represent more than statistics - they represent lives
          changed through education and technology. Sugar Labs continues to grow
          and impact communities worldwide.
        </p>

        {/* Interactive Stats Summary - Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {statisticsData.map((stat, index) => (
            <motion.div
              key={index}
              className={`px-4 py-3 rounded-lg ${stat.bgColor} border ${stat.borderColor} flex flex-col items-center justify-center`}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <span
                className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} text-xl md:text-2xl`}
              >
                {stat.value}
              </span>
              <span className="text-gray-700 text-xs md:text-sm text-center mt-1 line-clamp-1">
                {stat.title.split('.')[0].substring(0, 20)}
                {stat.title.split('.')[0].length > 20 ? '...' : ''}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
