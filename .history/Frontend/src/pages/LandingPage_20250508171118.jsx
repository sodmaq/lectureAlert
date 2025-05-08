import { useState } from "react";
import { Bell, Calendar, Clock, CheckCircle, ArrowRight } from "lucide-react";

function LandingPage() {
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      title: "Smart Timetable Management",
      description:
        "Create and customize your academic schedule with an intuitive drag-and-drop interface",
    },
    {
      icon: <Bell className="h-6 w-6 text-blue-600" />,
      title: "Timely Reminders",
      description:
        "Never miss a class with customizable alerts and notifications",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Time Management",
      description:
        "Track study hours and optimize your schedule for better academic performance",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-blue-600" />,
      title: "Course Progress",
      description:
        "Monitor attendance and assignment completion for each course",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle early access signup
    console.log("Email submitted:", email);
    setEmail("");
    // Normally would add API call here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      {/* <nav className="px-6 py-4 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-slate-800">
              TimeTable
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm text-slate-600 hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-slate-600 hover:text-blue-600"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-sm text-slate-600 hover:text-blue-600"
            >
              Testimonials
            </a>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
            Sign Up
          </button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <div className="pt-16 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
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
                className="flex-1 px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Get Early Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
            <div className="mt-8 flex items-center text-sm text-slate-500">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>14-day free trial. No credit card required.</span>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <img
                src="/api/placeholder/600/400"
                alt="TimeTable App Dashboard Preview"
                className="rounded-lg w-full"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-xl font-bold">95%</div>
              <div className="text-xs">of students improved attendance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              Everything You Need to Stay Organized
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Our powerful features help you manage your academic schedule
              effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Get started with TimeTable in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Schedule",
                description:
                  "Import your course schedule or build it from scratch with our easy-to-use interface",
              },
              {
                step: "02",
                title: "Set Up Reminders",
                description:
                  "Customize when and how you want to be notified about upcoming classes and deadlines",
              },
              {
                step: "03",
                title: "Never Miss a Class",
                description:
                  "Receive timely alerts and stay on top of your academic responsibilities",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-xl text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              What Students Say
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Hear from students who have transformed their academic experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Computer Science Major",
                quote:
                  "TimeTable has completely changed how I manage my classes. I haven't missed a single lecture since I started using it!",
              },
              {
                name: "Sarah Chen",
                role: "Pre-Med Student",
                quote:
                  "With my packed schedule, TimeTable has been a lifesaver. The reminders keep me on track with all my labs and study groups.",
              },
              {
                name: "Marcus Williams",
                role: "Business Administration",
                quote:
                  "I love how easy it is to adjust my schedule when classes change. The interface is intuitive and the alerts are reliable.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-slate-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Transform Your Academic Experience?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of students who have improved their attendance and
            academic performance
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors">
            Get Started for Free
          </button>
          <p className="mt-4 text-sm text-blue-200">No credit card required</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-white" />
              <span className="ml-2 text-xl font-bold text-white">
                TimeTable
              </span>
            </div>
            <p className="mt-4 text-sm">
              The smart timetable solution for students who want to stay
              organized and never miss a class.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} TimeTable. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
