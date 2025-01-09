// import { deleteRoadmap, fetchRoadmap, generateQuiz } from "@/http/aiTutorApi";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import moment from "moment";

// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";
// import { useMutation } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import { ErrorResponse } from "@/types/auth";
// import HashLoader from "react-spinners/HashLoader";
// import { toast } from "react-toastify";
// import { toastOptions } from "@/config/toast";
// import { IRoadMap } from "@/types/aiInterview";

// const Learning: React.FC = () => {
//   const navigate = useNavigate();
//   const [learnigs, setLearnings] = useState<IRoadMap[]>([]);

//   const fetchLearnings = async () => {
//     try {
//       const response = await fetchRoadmap();
//       setLearnings(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching learnings:", error);
//     }
//   };

//   useEffect(() => {
//     fetchLearnings();
//   }, []);


//   const quizMutation = useMutation({
//     mutationFn: generateQuiz,
//     onSuccess: (res) => {
//       console.log(res.data);
//       navigate(`/ai-tutor/quiz`);
//     },
//     onError: (error: AxiosError) => {
//       const errResponse = error.response?.data as ErrorResponse;
//       console.log(errResponse);
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deleteRoadmap,
//     onSuccess: () => {
//       toast.success('Roadmap deleted successfully!',toastOptions);
//       fetchLearnings();
//     },
//     onError: (error: AxiosError) => {
//       const errResponse = error.response?.data as ErrorResponse;
//       console.log(errResponse);
//     },
//   });

//   const handleMenuClick = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation();
//     e.preventDefault();

//     quizMutation.mutate(id);
//   };

//   const handleDelete = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation();
//     e.preventDefault();
//     deleteMutation.mutate(id);
//   };

//   return (
//     <>
//     <main className="flex flex-col justify-center items-center">
//       {quizMutation.isPending ? (
//         <div className="flex flex-col justify-center items-center gap-2">
//           <HashLoader color="#36d7b7" />
//           <p className="text-lg font-semibold text-gray-900 dark:text-white">
//             Generating Quiz...
//           </p>
//         </div>
//       ) : (
//         <fieldset className="grid gap-6 rounded-lg border p-4">
//           <legend className="-ml-1 px-1 text-2xl font-bold">
//             My Learnings
//           </legend>
//           <ScrollArea className="w-full h-[650px] rounded-md border">
//             <div className="flex gap-3 flex-col xl:p-4 p-1 lg:p-3 md:p-3 sm:p-2">
//               {learnigs.map((topic) => (
//                 <Link
//                   key={topic._id}
//                   to={`${topic._id}`}
//                   className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
//                 >
//                   <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

//                   <div className="sm:flex sm:justify-between sm:gap-4">
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
//                         {topic.RoadMapFor}
//                       </h3>

//                       <p className="mt-1 text-xs font-medium text-gray-600">
//                         Courses - {topic.RoadMap.length}
//                       </p>
//                     </div>

//                     <div className="hidden sm:block sm:shrink-0">
//                       <img
//                         alt=""
//                         src={topic.Image}
//                         className="size-16 rounded-lg object-contain shadow-sm"
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <p className="text-pretty text-sm text-gray-500">
//                       {topic.Outcome}
//                     </p>
//                   </div>

//                   <dl className="mt-6 flex gap-4 sm:gap-6 justify-between">
//                     <div className="flex gap-7">
//                       <div className="flex flex-col-reverse">
//                         <dt className="text-sm font-medium text-gray-600">
//                           Created At
//                         </dt>
//                         <dd className="text-xs text-gray-500">
//                           {moment(topic.createdAt).format("DD MMM, YYYY")}
//                         </dd>
//                       </div>

//                       <div className="flex flex-col-reverse">
//                         <dt className="text-sm font-medium text-gray-600">
//                           Completed
//                         </dt>
//                         <dd className="text-xs text-gray-500">0%</dd>
//                       </div>
//                     </div>

//                     <div className="flex flex-col-reverse justify-self-end">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             aria-haspopup="true"
//                             size="icon"
//                             variant="ghost"
//                           >
//                             <MoreHorizontal className="h-4 w-4" />
//                             <span className="sr-only">Toggle menu</span>
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent
//                           align="end"
                          
//                         >
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                           <DropdownMenuItem>
//                             Generate Questions
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={(e) => handleMenuClick(e, topic._id)}>Generate Quiz</DropdownMenuItem>
//                           <DropdownMenuItem onClick={(e) => handleDelete(e, topic._id)}>Delete</DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </dl>
//                 </Link>
//               ))}
//             </div>
//           </ScrollArea>
//         </fieldset>
//       )}
//       </main>
//     </>
//   );
// };

// export default Learning;