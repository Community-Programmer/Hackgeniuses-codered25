import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import HashLoader from 'react-spinners/HashLoader'

const InterviewHelper: React.FC = () => {

    const [topic, setTopic] = useState('')
    const [isPending, setisPending] = useState(false)
   



  return (
    <>
      <main className="flex flex-col justify-center items-center h-[70vh]">
        {isPending ?
        <div className="flex flex-col justify-center items-center gap-2">
        <HashLoader color="#36d7b7" />
        <p className="text-lg font-semibold text-gray-900 dark:text-white">Generating Roadmap...</p>
        </div> :         <div>
        <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            AI-Powered Interview Trainer
          </span>
          : The Future of Interview's Today
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Dive into the future of interview preparation with our AI placement preparation platform.
          Personalized interview experiences tailored to your needs, powered by
          cutting-edge artificial intelligence.
        </p>
        <form className="w-[40vw] mx-auto" >
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              value={topic}
              onChange={(e)=>setTopic(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        </div>}

        
      </main>
    </>
  );
};

export default InterviewHelper;