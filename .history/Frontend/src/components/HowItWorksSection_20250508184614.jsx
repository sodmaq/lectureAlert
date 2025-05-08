// components/HowItWorksSection.js
import { useEffect } from "react";
import { Calendar, Bell, CheckCircle } from "lucide-react";

const HowItWorksSection = ({ isIntersecting, setIsIntersecting }) => {
  const steps = [
    {
      step: "01",
      title: "Create Your Schedule",
      description:
        "Import your course schedule or build it from scratch with our easy-to-use interface",
      icon: <Calendar className="h-8 w-8 text-white" />,
    },
    {
      step: "02",
      title: "Set Up Reminders",
      description:
        "Customize when and how you want to be notified about upcoming classes and deadlines",
      icon: <Bell className="h-8 w-8 text-white" />,
    },
    {
      step: "03",
      title: "Never Miss a Class",
      description:
        "Receive timely alerts and stay on top of your academic responsibilities",
      icon: <CheckCircle className="h-8 w-8 text-white" />,
    },
  ];

  // Animation on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const element = document.getElementById("how-it-works");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [setIsIntersecting]);

  return (
    <div id="how-it-works" className="py-24 px-6 bg-slate-900 relative">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1600/800')] opacity-10 bg-cover bg-center"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold text-white ${
              isIntersecting.howItWorks ? "animate-slideUp" : "opacity-0"
            }`}
          >
            How It Works
          </h2>
          <p
            className={`mt-4 text-lg text-slate-300 max-w-2xl mx-auto ${
              isIntersecting.howItWorks ? "animate-slideUp" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            Get started with TimeTable in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`text-center relative ${
                isIntersecting.howItWorks ? "animate-slideUp" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-1 bg-blue-500 opacity-30 z-0"></div>
              )}

              <div className="relative z-10 mb-8">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white mb-6 shadow-lg shadow-blue-700/30 transform hover:rotate-12 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white text-blue-600 font-bold flex items-center justify-center shadow">
                  {item.step}
                </div>
              </div>

              <h3 className="font-semibold text-2xl text-white mb-4">
                {item.title}
              </h3>
              <p className="text-slate-300 text-lg">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
