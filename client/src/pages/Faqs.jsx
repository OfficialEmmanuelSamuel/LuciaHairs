import { useState, useRef, useEffect } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";


const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [heights, setHeights] = useState({});
  const refs = useRef([]);

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "You can return any product within 30 days of purchase as long as it is in its original condition.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs will apply and are added at checkout.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has been shipped, we will email you a tracking number to monitor your delivery. Once your order has been shipped, we will email you a tracking number to monitor your delivery. Once your order has been shipped, we will email you a tracking number to monitor your delivery. Once your order has been shipped, we will email you a tracking number to monitor your delivery.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Measure heights of each answer div after render
  useEffect(() => {
    const newHeights = {};
    refs.current.forEach((ref, index) => {
      if (ref) {
        newHeights[index] = ref.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, [faqs]);

  return (
    <>
      <Navbar />
      <section id='Faqs' className='min-h-screen bg-red-00 mt-20 mb-10 max-w-2xl mx-auto my-10 p-4'>
          <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
              {faqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg shadow-sm">
                      {/* Question */}
                      <button className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:bg-gray-100 transition"
                      onClick={() => toggleFAQ(index)}
                      >
                          {faq.question}
                          <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
                      </button>
                      <div className="transition-all duration-500 overflow-hidden">
                          <div ref={(el) => (refs.current[index] = el)} className="p-4 pt-0">
                              <p className="text-gray-600">{faq.answer}</p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>
      <Footer />
    </>
  )
};

export default Faqs;