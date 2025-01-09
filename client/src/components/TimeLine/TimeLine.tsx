'use client'

import { useEffect, useRef } from 'react'

export default function TimeLine() {
  const stepsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
          }
        })
      },
      { threshold: 0.1 }
    )

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step)
    })

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      title: 'Initial Assessment',
      description:
        'We begin by understanding your specific placement preparation needs and challenges. This involves scheduling a consultation to discuss career goals, preferred industries, and areas of improvement in interview skills.',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
    {
      title: 'Skill Gap Analysis',
      description:
        'We analyze your current skills, identify gaps in technical and soft skills, and determine the focus areas for improvement based on your desired roles and industry expectations.',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      title: 'Personalized Training Plan',
      description:
        'We design a customized training plan based on your skill gaps, including mock interviews, resume enhancement sessions, and technical tests tailored to your career aspirations.',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      title: 'AI-Driven Feedback',
      description:
        'Our AI-powered system evaluates your performance in mock interviews and tests, providing actionable feedback to help you improve communication, problem-solving, and technical skills.',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      title: 'Final Preparation and Review',
      description:
        'We conduct final reviews, including interview simulations, resume polishing, and career guidance, to ensure you are well-prepared and confident for placement opportunities.',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];
  

  return (
    <section className="w-full bg-gray-50 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
            Our Exceptional Thesis Writing Services Ensure The
          </h2>
          <h3 className="text-2xl font-bold tracking-tighter text-[#47d185] sm:text-3xl md:text-4xl lg:text-5xl">
            Following 5 Steps
          </h3>
        </div>
        <div className="relative mt-16">
          {/* Vertical line - hidden on mobile */}
          <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 bg-gray-200 md:block" />
          <div className="space-y-8 md:space-y-20">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className={`flex flex-col opacity-0 translate-y-10 transition-all duration-1000 ease-in-out md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot - Full width on mobile, half on desktop */}
                <div className="flex w-full justify-center md:w-1/2">
                  <div className="relative">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#47d185]">
                      <div className="h-4 w-4 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
                {/* Content box - Full width on mobile, half on desktop */}
                <div
                  className={`w-full px-4 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'
                  }`}
                >
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                    <div className="mb-4 flex items-center space-x-3">
                      <div className="rounded-full bg-[#47d185] p-2 text-white">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-bold sm:text-xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}