import { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Star,
  User,
  Book,
  Smartphone,
} from "lucide-react";

function LandingPage() {
  const [email, setEmail] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState({
    features: false,
    howItWorks: false,
    testimonials: false,
  });

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

    const sections = ["features", "how-it-works", "testimonials"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () =>
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Smart Timetable Management",
      description:
        "Create and customize your academic schedule with an intuitive drag-and-drop interface",
    },
    {
      icon: <Bell className="h-8 w-8 text-blue-600" />,
      title: "Timely Reminders",
      description:
        "Never miss a class with customizable alerts and notifications",
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Time Management",
      description:
        "Track study hours and optimize your schedule for better academic performance",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      title: "Course Progress",
      description:
        "Monitor attendance and assignment completion for each course",
    },
  ];

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

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Computer Science Major",
      quote:
        "TimeTable has completely changed how I manage my classes. I haven't missed a single lecture since I started using it!",
      avatar: "user1.jpg",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Pre-Med Student",
      quote:
        "With my packed schedule, TimeTable has been a lifesaver. The reminders keep me on track with all my labs and study groups.",
      avatar: "user1.jpg",
      rating: 5,
    },
    {
      name: "Marcus Williams",
      role: "Business Administration",
      quote:
        "I love how easy it is to adjust my schedule when classes change. The interface is intuitive and the alerts are reliable.",
      avatar: "user1.jpg",
      rating: 4,
    },
    {
      name: "Priya Patel",
      role: "Engineering Student",
      quote:
        "TimeTable's interface is so intuitive. Managing my complex engineering course load has never been easier!",
      avatar: "user1.jpg",
      rating: 5,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle early access signup
    console.log("Email submitted:", email);
    setEmail("");
    // Show a success message
    alert(
      "Thanks for signing up! We'll notify you when early access is available."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Hero Section */}
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 animate-fadeIn">
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-12 right-12 w-32 h-32 bg-purple-100 rounded-full opacity-50 blur-xl"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Never Miss a Class <span className="text-blue-600">Again</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600">
              The smart timetable app designed for students. Create schedules,
              set reminders, and stay on top of your academic life with ease.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200 hover:scale-105 transform duration-200 ease-in-out flex items-center justify-center"
              >
                Get Early Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>

            <div className="mt-8 flex items-center text-sm text-slate-500">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>14-day free trial. No credit card required.</span>
            </div>

            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-medium">1,000+</span> students already
                joined
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-100 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-blue-50 rounded-full animate-pulse opacity-60"></div>

            <div className="relative p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-white p-4 rounded-lg">
                <img
                  src="user1.jpg"
                  alt="TimeTable App Dashboard Preview"
                  className="rounded-lg w-full"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg transform hover:rotate-3 transition-transform duration-300 ease-in-out">
              <div className="text-xl font-bold">95%</div>
              <div className="text-xs">of students improved attendance</div>
            </div>

            <div className="absolute top-1/2 -right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg transform -translate-y-1/2 hover:-rotate-3 transition-transform duration-300 ease-in-out">
              <div className="text-sm font-bold">4.9/5</div>
              <div className="text-xs">Student rating</div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-24">
          <div className="flex justify-center">
            <ChevronDown className="h-8 w-8 text-blue-600 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-white"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold text-slate-900 ${
                isIntersecting.features ? "animate-slideUp" : "opacity-0"
              }`}
            >
              Everything You Need to Stay Organized
            </h2>
            <p
              className={`mt-4 text-lg text-slate-600 max-w-2xl mx-auto ${
                isIntersecting.features ? "animate-slideUp" : "opacity-0"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              Our powerful features help you manage your academic schedule
              effectively and boost your productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 transform hover:-translate-y-1 ${
                  isIntersecting.features ? "animate-slideUp" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="mb-6 p-3 bg-blue-50 rounded-lg inline-block">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[url('user1.jpg')] opacity-10 bg-cover bg-center"></div>

        <div className="max-w-6xl mx-auto relative z-999999">
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

      {/* Testimonials */}
      <div id="testimonials" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold text-slate-900 ${
                isIntersecting.testimonials ? "animate-slideUp" : "opacity-0"
              }`}
            >
              What Students Say
            </h2>
            <p
              className={`mt-4 text-lg text-slate-600 max-w-2xl mx-auto ${
                isIntersecting.testimonials ? "animate-slideUp" : "opacity-0"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              Hear from students who have transformed their academic experience
            </p>
          </div>

          <div
            className={`relative ${
              isIntersecting.testimonials ? "animate-fadeIn" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${activeTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-slate-50 p-8 rounded-xl shadow-md border border-slate-100">
                      <div className="flex flex-col md:flex-row md:items-center mb-6">
                        <div className="flex-shrink-0 mb-4 md:mb-0">
                          <div className="h-16 w-16 rounded-full bg-blue-100 overflow-hidden">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="md:ml-4">
                          <h4 className="font-medium text-xl text-slate-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {testimonial.role}
                          </p>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-700 text-lg italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                    activeTestimonial === index ? "bg-blue-600" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                number: "10,000+",
                label: "Active Users",
                icon: <User className="h-6 w-6 text-blue-600" />,
              },
              {
                number: "95%",
                label: "Attendance Rate",
                icon: <CheckCircle className="h-6 w-6 text-blue-600" />,
              },
              {
                number: "500+",
                label: "Universities",
                icon: <Book className="h-6 w-6 text-blue-600" />,
              },
              {
                number: "4.9/5",
                label: "App Store Rating",
                icon: <Star className="h-6 w-6 text-blue-600 fill-blue-600" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-sm border border-slate-100"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Choose the plan that works for your academic needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Free Plan
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900">$0</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <p className="text-slate-600 mb-6">
                  Perfect for getting started with basic scheduling needs
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Basic timetable management",
                    "Class reminders",
                    "Up to 5 courses",
                    "Mobile app access",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 bg-slate-100 text-slate-800 rounded-md font-medium hover:bg-slate-200 transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
              <div className="p-8 text-white">
                <div className="inline-block px-3 py-1 bg-blue-500 bg-opacity-30 rounded-full text-sm font-medium mb-4">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold mb-4">Pro Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$4.99</span>
                  <span>/month</span>
                </div>
                <p className="text-blue-100 mb-6">
                  Everything you need for academic success
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "All Free features",
                    "Unlimited courses",
                    "Advanced analytics",
                    "Study time tracking",
                    "Custom notifications",
                    "Assignment tracking",
                    "Priority support",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-300 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-slate-600">
            Both plans come with a 14-day money-back guarantee. No credit card
            required for free plan.
          </div>
        </div>
      </div>

      {/* App Screenshots */}
      <div className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              See TimeTable in Action
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Beautiful, intuitive interface designed for students
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white p-1 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
              >
                <img
                  src={`user1.jpg`}
                  alt={`App Screenshot ${i}`}
                  className="rounded-lg w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-white opacity-5"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Academic Experience?
          </h2>
          <p className="mt-4 text-xl text-blue-100 mb-8">
            Join thousands of students who have improved their attendance and
            academic performance
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <Smartphone className="h-5 w-5 mr-2" />
              Download App
            </button>
            <button className="px-8 py-4 bg-blue-500 bg-opacity-30 text-white border border-white border-opacity-30 rounded-lg font-medium hover:bg-opacity-40 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
              Get Started for Free
            </button>
          </div>

          <p className="mt-6 text-sm text-blue-200">No credit card required</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 text-white" />
                <span className="ml-2 text-xl font-bold text-white">
                  TimeTable
                </span>
              </div>
              <p className="mt-4 text-sm">
                The smart timetable solution for students who want to stay
                organized and never miss a class.
              </p>
              <div className="mt-6 flex space-x-4">
                {["twitter", "facebook", "instagram", "linkedin"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="h-4 w-4 text-white">
                        {/* Icon placeholder */}
                      </div>
                    </a>
                  )
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-white text-lg mb-4">Product</h4>
              <ul className="space-y-3">
                {["Features", "Pricing", "Integrations", "FAQ", "Updates"].map(
                  (item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="hover:text-blue-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                {["About Us", "Blog", "Careers", "Contact", "Partners"].map(
                  (item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="hover:text-blue-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white text-lg mb-4">
                Stay Updated
              </h4>
              <p className="text-sm mb-4">
                Subscribe to our newsletter for tips, updates, and early access
                to new features.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-slate-800 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-500 transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; {new Date().getFullYear()} TimeTable. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a
                href="#"
                className="text-sm hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm hover:text-blue-400 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
