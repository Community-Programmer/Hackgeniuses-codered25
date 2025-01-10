// import { useState } from "react";
// import axios, { AxiosError } from "axios";
// import HashLoader from "react-spinners/HashLoader";

// const AITutor: React.FC = () => {
//   const [topic, setTopic] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roadmap, setRoadmap] = useState<any>(null);

//   // Function to call the backend API to generate the roadmap
//   const generateRoadmap = async (topic: string) => {
//     try {
//       setLoading(true);
//       setError(null); // Reset error message before new request

//       // Construct the API endpoint URL dynamically using the topic
//       const apiUrl = `http://localhost:5050/api/v1/interview-helper/roadmap/${topic}`;

//       // Make the POST request to the backend with the topic
//       const response = await axios.post(
//         apiUrl, // Use the dynamically constructed URL
//         {}, // Empty request body, topic is in the URL parameter
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the JWT token from localStorage
//           },
//         }
//       );
//       setRoadmap(response.data); // Store the response in state
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       if (axiosError.response) {
//         // Server responded with an error
//         setError(`Error: ${axiosError.response.data.message}`);
//       } else if (axiosError.request) {
//         // No response received from the server (network issues)
//         setError("Network error. Please try again later.");
//       } else {
//         // Other types of errors (e.g., issues with request setup)
//         setError("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false); // Stop the loading spinner once the request is finished
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (topic) {
//       generateRoadmap(topic); // Generate roadmap when the form is submitted
//     }
//   };

//   return (
//     <main className="flex flex-col justify-center items-center h-[70vh]">
//       {loading ? (
//         <div className="flex flex-col justify-center items-center gap-2">
//           <HashLoader color="#36d7b7" />
//           <p className="text-lg font-semibold text-gray-900 dark:text-white">
//             Generating Roadmap...
//           </p>
//         </div>
//       ) : (
//         <div>
//           <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
//               AI-Powered Tutoring
//             </span>
//             : The Future of Learning Today
//           </h1>
//           <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
//             Dive into the future of education with our AI tutoring platform.
//             Personalized learning experiences tailored to your needs, powered by
//             cutting-edge artificial intelligence.
//           </p>

//           {/* Display error message */}
//           {error && (
//             <div className="mb-4 text-red-500 font-semibold">
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Display roadmap if it exists */}
//           {roadmap && (
//             <div className="mb-6 text-lg text-gray-700">
//               <h2 className="font-bold">Generated Roadmap:</h2>
//               <pre>{JSON.stringify(roadmap, null, 2)}</pre>
//             </div>
//           )}

//           {/* Search Form */}
//           <form className="w-[40vw] mx-auto" onSubmit={handleSubmit}>
//             <label
//               htmlFor="default-search"
//               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
//             >
//               Search
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="search"
//                 id="default-search"
//                 className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Enter topic"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)} // Update topic state on input change
//                 required
//               />
//               <button
//                 type="submit"
//                 className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Search
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </main>
//   );
// };

// export default AITutor;

// import { useState } from "react";
// import axios, { AxiosError } from "axios";
// import HashLoader from "react-spinners/HashLoader";

// const AITutor: React.FC = () => {
//   const [topic, setTopic] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [roadmap, setRoadmap] = useState<any>(null);

//   // Function to call the backend API to generate the roadmap
//   const generateRoadmap = async (topic: string) => {
//     try {
//       setLoading(true);
//       setError(null); // Reset error message before new request

//       // Construct the API endpoint URL dynamically using the topic
//       const apiUrl = `http://localhost:5050/api/v1/interview-helper/roadmap/${topic}`;

//       // Make the POST request to the backend with the topic
//       const response = await axios.post(
//         apiUrl, // Use the dynamically constructed URL
//         {}, // Empty request body, topic is in the URL parameter
//         {
//           withCredentials: true,
//         }
//       );
//       setRoadmap(response.data); // Store the response in state
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       if (axiosError.response) {
//         // Server responded with an error
//         setError(`Error: ${axiosError.response.data.message}`);
//       } else if (axiosError.request) {
//         // No response received from the server (network issues)
//         setError("Network error. Please try again later.");
//       } else {
//         // Other types of errors (e.g., issues with request setup)
//         setError("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false); // Stop the loading spinner once the request is finished
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (topic) {
//       generateRoadmap(topic); // Generate roadmap when the form is submitted
//     }
//   };

//   return (
//     <main className="flex flex-col justify-center items-center h-[70vh]">
//       {loading ? (
//         <div className="flex flex-col justify-center items-center gap-2">
//           <HashLoader color="#36d7b7" />
//           <p className="text-lg font-semibold text-gray-900 dark:text-white">
//             Generating Roadmap...
//           </p>
//         </div>
//       ) : (
//         <div>
//           <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
//               AI-Powered Tutoring
//             </span>
//             : The Future of Learning Today
//           </h1>
//           <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
//             Dive into the future of education with our AI tutoring platform.
//             Personalized learning experiences tailored to your needs, powered by
//             cutting-edge artificial intelligence.
//           </p>

//           {/* Display error message */}
//           {error && (
//             <div className="mb-4 text-red-500 font-semibold">
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Display roadmap if it exists */}
//           {roadmap && (
//             <div className="mb-6 text-lg text-gray-700">
//               <h2 className="font-bold">Generated Roadmap:</h2>
//               <pre>{JSON.stringify(roadmap, null, 2)}</pre>
//             </div>
//           )}

//           {/* Search Form */}
//           <form className="w-[40vw] mx-auto" onSubmit={handleSubmit}>
//             <label
//               htmlFor="default-search"
//               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
//             >
//               Search
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="search"
//                 id="default-search"
//                 className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Enter topic"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)} // Update topic state on input change
//                 required
//               />
//               <button
//                 type="submit"
//                 className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Search
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </main>
//   );
// };

// export default AITutor;

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import HashLoader from "react-spinners/HashLoader";

const AITutor: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<any>(null);

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Function to call the backend API to generate the roadmap
  const generateRoadmap = async (topic: string) => {
    try {
      setLoading(true);
      setError(null); // Reset error message before new request

      // Construct the API endpoint URL dynamically using the topic
      const apiUrl = `http://localhost:5050/api/v1/interview-helper/roadmap/${topic}`;

      // Make the POST request to the backend with the topic
      const response = await axios.post(
        apiUrl, // Use the dynamically constructed URL
        {}, // Empty request body, topic is in the URL parameter
        {
          withCredentials: true,
        }
      );
      setRoadmap(response.data); // Store the response in state
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Server responded with an error
        setError(`Error: ${axiosError.response.data.message}`);
      } else if (axiosError.request) {
        // No response received from the server (network issues)
        setError("Network error. Please try again later.");
      } else {
        // Other types of errors (e.g., issues with request setup)
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Stop the loading spinner once the request is finished
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (topic) {
      generateRoadmap(topic); // Generate roadmap when the form is submitted
    }
  };

  // Redirect to /learnings once the roadmap is generated successfully
  const handleRoadmapGenerated = () => {
    // Redirect to the "/learnings" route
    navigate("/ai-tutor/learning", {
      state: { roadmap }, // Passing the roadmap data as state to the new route
    });
  };

  // Watch for successful roadmap generation and trigger the redirection
  if (roadmap) {
    handleRoadmapGenerated();
  }

  return (
    <main className="flex flex-col justify-center items-center h-[70vh]">
      {loading ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <HashLoader color="#36d7b7" />
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Generating Roadmap...
          </p>
        </div>
      ) : (
        <div>
          <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              AI-Powered Tutoring
            </span>
            : The Future of Learning Today
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Dive into the future of education with our AI tutoring platform.
            Personalized learning experiences tailored to your needs, powered by
            cutting-edge artificial intelligence.
          </p>

          {/* Display error message */}
          {error && (
            <div className="mb-4 text-red-500 font-semibold">
              <p>{error}</p>
            </div>
          )}

          {/* Search Form */}
          <form className="w-[40vw] mx-auto" onSubmit={handleSubmit}>
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)} // Update topic state on input change
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
        </div>
      )}
    </main>
  );
};

export default AITutor;
