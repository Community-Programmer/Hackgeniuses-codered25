import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { IRoadMap } from "@/types/aitutor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";
import { toastOptions } from "@/config/toast";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios"; // Assuming axios is used for API calls

const Learning: React.FC = () => {
  const navigate = useNavigate();
  const [learnings, setLearnings] = useState<IRoadMap[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // For showing the loading spinner

  // Fetch the learning roadmap data
  const fetchLearnings = async () => {
    setLoading(true);
    try {
      const apiUrl = `http://localhost:5050/api/v1/interview-helper/roadmap`;
      const response = await axios.get(apiUrl, { withCredentials: true }); // Replace with your actual endpoint
      console.log(response.data); // Log the response structure to inspect it

      // Check if the response data is an array and set the state accordingly
      if (Array.isArray(response.data)) {
        setLearnings(response.data);
      } else {
        console.error("Expected an array, but got:", response.data);
        setLearnings([]); // Set to empty array if the data is not in the expected format
      }
    } catch (error) {
      console.error("Error fetching learnings:", error);
      setLearnings([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearnings();
  }, []);

  // Generate Quiz
  const handleGenerateQuiz = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/quiz/generate/${id}`); // Replace with your correct endpoint
      console.log(response.data);
      navigate(`/ai-tutor/quiz`);
    } catch (error) {
      console.error("Error generating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Roadmap
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/roadmap/${id}`); // Replace with your correct endpoint
      toast.success("Roadmap deleted successfully!", toastOptions);
      fetchLearnings(); // Re-fetch the learnings after deletion
    } catch (error) {
      console.error("Error deleting roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      {loading ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <HashLoader color="#36d7b7" />
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Generating Quiz...
          </p>
        </div>
      ) : (
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-2xl font-bold">
            My Learnings
          </legend>
          <ScrollArea className="w-full h-[650px] rounded-md border">
            <div className="flex gap-3 flex-col xl:p-4 p-1 lg:p-3 md:p-3 sm:p-2">
              {Array.isArray(learnings) && learnings.length > 0 ? (
                learnings.map((topic) => (
                  <Link
                    key={topic._id}
                    to={`${topic._id}`}
                    className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                  >
                    <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                    <div className="sm:flex sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                          {topic.RoadMapFor}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-gray-600">
                          Courses - {topic.RoadMap.length}
                        </p>
                      </div>

                      <div className="hidden sm:block sm:shrink-0">
                        <img
                          alt=""
                          src={topic.Image}
                          className="size-16 rounded-lg object-contain shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-pretty text-sm text-gray-500">
                        {topic.Outcome}
                      </p>
                    </div>

                    <dl className="mt-6 flex gap-4 sm:gap-6 justify-between">
                      <div className="flex gap-7">
                        <div className="flex flex-col-reverse">
                          <dt className="text-sm font-medium text-gray-600">
                            Created At
                          </dt>
                          <dd className="text-xs text-gray-500">
                            {moment(topic.createdAt).format("DD MMM, YYYY")}
                          </dd>
                        </div>

                        <div className="flex flex-col-reverse">
                          <dt className="text-sm font-medium text-gray-600">
                            Completed
                          </dt>
                          <dd className="text-xs text-gray-500">0%</dd>
                        </div>
                      </div>

                      <div className="flex flex-col-reverse justify-self-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              Generate Questions
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleGenerateQuiz(topic._id)}
                            >
                              Generate Quiz
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(topic._id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </dl>
                  </Link>
                ))
              ) : (
                <p>No learnings available</p>
              )}
            </div>
          </ScrollArea>
        </fieldset>
      )}
    </main>
  );
};

export default Learning;
