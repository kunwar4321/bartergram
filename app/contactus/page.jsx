"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function TabbedContactForm() {
  const [activeTab, setActiveTab] = useState("careers");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const activeTab =
      sessionStorage.getItem("IsCareerFormOpen") === "YES"
        ? "careers"
        : "business";
    setActiveTab(activeTab);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "IsCareerFormOpen",
      activeTab === "careers" ? "YES" : "NO"
    );
  }, [activeTab]);

  return (
    <div className={`min-h-screen bg-black text-purple-500 p-6 pt-28`}>
      <div className="w-full mx-auto">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-4xl font-bold mb-8 font-sans"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            SEND US A MESSAGE
          </motion.h1>

          <motion.div
            className="flex mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <button
              className={`mr-4 px-4 py-2 rounded-full transition-colors ${
                activeTab === "business"
                  ? "bg-purple-500 text-black"
                  : "bg-gray-800"
              }`}
              onClick={() => {
                sessionStorage.setItem("IsCareerFormOpen", "NO");
                setActiveTab("business");
              }}
              aria-selected={activeTab === "business"}
              role="tab"
            >
              For business
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-colors ${
                activeTab === "careers"
                  ? "bg-purple-500 text-black"
                  : "bg-gray-800"
              }`}
              onClick={() => {
                setActiveTab("careers");
              }}
              aria-selected={activeTab === "careers"}
              role="tab"
            >
              For careers
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "business" ? (
              <BusinessForm key="business" />
            ) : (
              <CareersForm key="careers" />
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-12 overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.6 }}
        >
          <Image
            src="/images/contact.jpg"
            alt="Hands typing on keyboard"
            width={600}
            height={100}
            className="w-full h-96 object-cover object-center"
          />
        </motion.div>

        <motion.div
          className="mt-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl mb-4 font-sans font-bold">
            We are located at:
          </h2>
          <iframe
            width="100%"
            height="500"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15077.647634076851!2d72.8134512!3d19.1334386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7eb7d0eab17%3A0x51bbbc7f4ef51224!2sBartergram!5e0!3m2!1sen!2sin!4v1727697123208!5m2!1sen!2sin"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}

function BusinessForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone number is invalid";
    if (!formData.service) newErrors.service = "Please select a service";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch(
          "http://barter.asit-solutions.in/api/business",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          // Reset form values
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            service: "",
            message: "",
          });
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.form
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
    >
      <motion.div whileHover={{ scale: 1.05 }}>
        <input
          className={`w-full bg-transparent border-b ${
            errors.name ? "border-red-500" : "border-purple-500"
          } p-2`}
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <input
          className={`w-full bg-transparent border-b ${
            errors.email ? "border-red-500" : "border-purple-500"
          } p-2`}
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <input
          className={`w-full bg-transparent border-b ${
            errors.phone ? "border-red-500" : "border-purple-500"
          } p-2`}
          type="tel"
          name="phone"
          placeholder="Phone Number*"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <input
          className="w-full bg-transparent border-b border-purple-500 p-2"
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <select
          className={`w-full bg-transparent border-b ${
            errors.service ? "border-red-500" : "border-purple-500"
          } p-2`}
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select Service*</option>
          <option value="service1">Service 1</option>
          <option value="service2">Service 2</option>
          <option value="service3">Service 3</option>
        </select>
        {errors.service && (
          <p className="text-red-500 text-sm mt-1">{errors.service}</p>
        )}
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <textarea
          className="w-full bg-transparent border-b border-purple-500 p-2"
          name="message"
          placeholder="Your Message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-purple-500 text-black px-6 py-2 rounded-full"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </motion.button>
    </motion.form>
  );
}

function CareersForm() {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cv: null,
    message: "",
  });
  const [fileName, setFileName] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone number is invalid";
    if (!formData.cv) newErrors.cv = "CV is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
    setFormData((prevData) => ({
      ...prevData,
      cv: file,
    }));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        const response = await fetch(
          "http://barter.asit-solutions.in/api/careers",
          {
            method: "POST",
            body: formDataToSend,
          }
        );
        if (response.ok) {
          setFormData({
            name: "",
            email: "",
            phone: "",
            cv: null,
            message: "",
          });
          setFileName(null);
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.form
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
    >
      <motion.div whileHover={{ scale: 1.05 }}>
        <input
          className={`w-full bg-transparent border-b ${
            errors.name ? "border-red-500" : "border-purple-500"
          } p-2`}
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <input
          className={`w-full bg-transparent border-b ${
            errors.email ? "border-red-500" : "border-purple-500"
          } p-2`}
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <input
          className={`w-full bg-transparent border-b ${
            errors.phone ? "border-red-500" : "border-purple-500"
          } p-2`}
          type="tel"
          name="phone"
          placeholder="Phone Number*"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </motion.div>
      <motion.div className="w-full">
        <input
          ref={fileInputRef}
          id="cv-upload"
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          required
          onChange={handleFileChange}
        />
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          className={`w-full bg-transparent border ${
            errors.cv
              ? "border-red-500 text-red-500"
              : "border-purple-500 text-purple-500"
          } px-4 py-2 rounded-full flex items-center justify-center`}
          onClick={handleButtonClick}
        >
          <Upload className="mr-2" size={20} />
          {fileName ? fileName : "Attach CV*"}
        </motion.button>
        {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv}</p>}
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }}>
        <textarea
          className="w-full bg-transparent border-b border-purple-500 p-2"
          name="message"
          placeholder="Your Message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-purple-500 text-black px-6 py-2 rounded-full"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </motion.button>
    </motion.form>
  );
}
