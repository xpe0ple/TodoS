"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { CheckCircle, Brain, Zap, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

const FlippableCard = ({
  frontIcon,
  title,
  description,
  backText,
  isFlipped,
  onClick,
}: {
  frontIcon: React.ReactNode;
  title: string;
  description: string;
  backText: string;
  isFlipped: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className="relative w-full h-72 perspective cursor-pointer"
      onClick={onClick}
    >
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-500 preserve-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front */}
        <Card className="absolute w-full h-full backface-hidden">
          <CardContent className="p-6 text-center">
            {frontIcon}
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
        </Card>

        {/* Back */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mt-10">{backText}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function AboutPage() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Organize Smarter, Work Better — with AI.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our AI-powered todo web app helps you manage tasks effortlessly,
            prioritize wisely, and stay productive without the stress.
          </p>
          <Button size="lg" className="group">
            Try Smart Todo Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Flippable Cards */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-gray-800 dark:to-gray-900">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FlippableCard
            frontIcon={
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            }
            title="Intelligent Task Management"
            description="Add, organize, and manage your tasks with an intuitive and clean interface — backed by AI."
            backText="Helps you manage daily goals efficiently with automatic organization."
            isFlipped={flippedIndex === 0}
            onClick={() => handleFlip(0)}
          />

          <FlippableCard
            frontIcon={
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            }
            title="AI-Powered Insights"
            description="Receive personalized suggestions on deadlines, priorities, and workflow improvements."
            backText="Your productivity coach that adapts to your schedule."
            isFlipped={flippedIndex === 1}
            onClick={() => handleFlip(1)}
          />

          <FlippableCard
            frontIcon={<Zap className="h-12 w-12 text-primary mx-auto mb-4" />}
            title="Automation that Works for You"
            description="Let AI handle reminders, task grouping, and even recommend when to take breaks."
            backText="Automates your daily planning and rest cycles intelligently."
            isFlipped={flippedIndex === 2}
            onClick={() => handleFlip(2)}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Focus Better with AI</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Let our smart assistant handle the clutter, so you can focus on what
            truly matters.
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 font-semibold hover:bg-gray-100"
          >
            Try It Now
          </Button>
        </div>
      </section>
    </div>
  );
}
