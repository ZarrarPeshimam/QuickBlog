import React from 'react';

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 my-32 px-4">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>
      <p className="md:text-lg text-gray-500/70 pb-4">
        Subscribe to get the latest blogs, new tech, and exclusive news.
      </p>

      <form className="flex items-center w-full max-w-2xl">
        <input
          className="flex-grow h-12 md:h-13 px-4 border border-gray-300 rounded-l-md outline-none text-gray-700"
          type="email"
          placeholder="Enter your email ID"
          required
        />
        <button
          type="submit"
          className="h-12 md:h-13 px-6 md:px-10 bg-primary text-white font-medium rounded-r-md"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
