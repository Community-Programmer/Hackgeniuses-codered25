import React, { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Mic, UserCheck, Star } from "lucide-react";
import aiImage1 from "../../assets/ai-first.jpg";
import aiImage2 from "../../assets/resume-img.png";
import TimeLine from "@/components/TimeLine/TimeLine";
import ImprovedStatsCounter from "@/components/Counter/Counter";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

const HomePage: React.FC = () => {
  interface Slide {
    title: string;
    description: string;
    image: string;
    rating: number;
  }

  const slides: Slide[] = [
    {
      title: "Ace Your Interviews with AI Mock Sessions",
      description:
        "Simulate real-world interviews with our AI-powered mock interview sessions. Get instant feedback and improve with each session!",
      image: aiImage1,
      rating: 4.9,
    },
    {
      title: "Perfect Your Resume with AI Evaluation",
      description:
        "Upload your resume and let our AI analyze and provide suggestions to make it stand out. Tailored tips for every role!",
      image: aiImage2,
      rating: 4.8,
    },
  ];

  interface Feature {
    title: string;
    description: string;
    icon: ReactNode;
  }

  const servicess: Feature[] = [
    {
      title: "AI Mock Interview",
      description:
        "Prepare with AI-driven mock interviews designed to replicate industry standards and provide actionable insights.",
      icon: <Mic className="w-6 h-6" />,
    },
    {
      title: "Resume Evaluator",
      description:
        "Upload your resume for instant evaluation. Receive feedback on formatting, content, and keywords.",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: "Personalized Training",
      description:
        "Get tailored technical training and roadmaps based on your strengths and improvement areas.",
      icon: <UserCheck className="w-6 h-6" />,
    },
  ];

  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <>
     <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <section className="w-full relative">
        <div className="bg-[#4796f6] text-white overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10" />
            </div>

            <Carousel className="w-full max-w-6xl mx-auto" selectedIndex={activeSlide}>
              <CarouselContent>
                {slides.map((slide, index) => (
                  <CarouselItem key={index}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12 min-h-[600px] items-center">
                      <div className="relative">
                        <img
                          src={slide.image}
                          alt="Researcher"
                          className="rounded-full shadow-xl border-4 border-lime-500 hover:scale-110 hover:shadow-2xl transition-transform duration-300 ease-in-out"
                        />
                      </div>
                      <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">{slide.title}</h1>
                        <p className="text-lg md:text-xl text-gray-200">{slide.description}</p>
                        <div className="flex items-center gap-2 bg-white/10 p-3 rounded-lg w-fit">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(slide.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">Rated {slide.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeSlide === index ? "w-8 bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setActiveSlide(index)}
                  />
                ))}
              </div>
            </Carousel>
          </motion.div>
        </div>

        {/* Overlapping Services Section */}
        <div className="relative -mt-20 z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicess.map((service, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all bg-white">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-[#2563EB] text-white flex items-center justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Time Line  */}
      <section>
        <TimeLine/>
      </section>

      {/* Counter */}
      <section>
        <ImprovedStatsCounter/>
      </section>
      </div>
      < ScrollToTop/> 
    </>
  );
};

export default HomePage;
