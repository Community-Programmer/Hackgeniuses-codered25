import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Brain, CheckCircle, Users, Network, LucideIcon } from 'lucide-react';

type Stat = {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  {
    icon: Brain,
    value: 5,
    suffix: "+",
    label: "YEARS OF EXPERIENCE",
  },
  {
    icon: CheckCircle,
    value: 80,
    suffix: "+",
    label: "PROJECTS",
  },
  {
    icon: Users,
    value: 3000,
    suffix: "+",
    label: "CLIENTS",
  },
  {
    icon: Network,
    value: 100,
    suffix: "%",
    label: "DELIVERY",
  },
];

type CounterProps = {
  value: number;
  suffix: string;
  duration?: number;
};

function Counter({ value, suffix, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        const percentage = progress / duration;
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
        setCount(Math.floor(easeOutQuart * value));
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isVisible]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function ImprovedStatsCounter() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 overflow-hidden">
      <div className="relative flex flex-col md:flex-row justify-around items-center">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 hidden md:block" />
        <div className="absolute top-1/2 left-0 right-0 hidden md:flex justify-between px-[60px]">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="w-3 h-3 rounded-full bg-[#2563EB] z-10"
            />
          ))}
        </div>

        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="flex flex-col items-center z-20 mb-12 md:mb-0"
          >
            <div className="mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-[#2563EB] blur-md opacity-50" />
              <div className="relative size-20 md:size-24 rounded-full bg-black border-4 border-[#2563EB] flex items-center justify-center text-yellow-400">
                <stat.icon className="size-10 md:size-12" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-2 text-sm md:text-base text-gray-500 font-medium tracking-wider text-center max-w-[150px] md:max-w-[200px]">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
