import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostBySlug, Post, renderMarkdown } from '@/utils/markdownutils';
import { motion } from 'framer-motion';

const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [readingProgress, setReadingProgress] = useState<number>(0);

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      try {
        if (slug) {
          const fetchedPost = await getPostBySlug(slug);
          setPost(fetchedPost);

          // Set document title based on post title
          document.title = fetchedPost?.title || 'News Detail';
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();

    // Calculate reading progress
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPosition = document.documentElement.scrollTop;
      const progress = (scrollPosition / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Post Not Found
        </h1>
        <p className="mb-8 text-gray-600">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={handleGoBack}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-blue-600"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Back button */}
      <motion.button
        onClick={handleGoBack}
        className="mb-6 px-4 py-2 flex items-center text-blue-600 hover:text-blue-700 transition-colors rounded-md hover:bg-blue-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to News
      </motion.button>

      {/* Article Header */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <span className="inline-block px-3 py-1 text-sm font-semibold bg-green-100 text-green-600 mb-4 rounded-full">
          {post.category}
        </span>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
        <div className="flex flex-wrap items-center text-gray-500 mb-3">
          <span className="mr-4 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {post.date}
          </span>
          <span className="mr-4">•</span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {post.author}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Image - Made smaller with max-height and contained within a reasonable size */}
      <motion.div
        className="mb-8 rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto bg-gray-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto max-h-80 object-contain mx-auto"
        />
      </motion.div>

      {/* Article Content */}
      <motion.div
        className="prose prose-lg max-w-none mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />

      {/* Author Bio Section */}
      <div className="bg-blue-50 rounded-lg p-6 my-8 flex items-center space-x-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
          {post.author.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-lg text-gray-800">
            About {post.author}
          </h4>
          <p className="text-gray-600 mt-1">{post.description}</p>
        </div>
      </div>

      {/* Tags Section */}
      <div className="border-t border-gray-200 pt-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Last updated timestamp */}
      <div className="text-right text-gray-500 text-sm italic mb-8">
        Last updated:{' '}
        {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Back to top"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default NewsDetailPage;
