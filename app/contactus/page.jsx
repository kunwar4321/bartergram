'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload } from 'lucide-react'

export default function TabbedContactForm() {
    const [activeTab, setActiveTab] = useState('business')

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div className={`min-h-screen bg-black text-purple-500 p-6 pt-28`}>
            <div className="w-full mx-auto">
                <div className="max-w-6xl mx-auto">
                    <motion.h1
                        className="text-4xl font-bold mb-8"
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
                            className={`mr-4 px-4 py-2 rounded-full transition-colors ${activeTab === 'business' ? 'bg-purple-500 text-black' : 'bg-gray-800'}`}
                            onClick={() => setActiveTab('business')}
                            aria-selected={activeTab === 'business'}
                            role="tab"
                        >
                            For business
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full transition-colors ${activeTab === 'careers' ? 'bg-purple-500 text-black' : 'bg-gray-800'}`}
                            onClick={() => setActiveTab('careers')}
                            aria-selected={activeTab === 'careers'}
                            role="tab"
                        >
                            For careers
                        </button>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'business' ? (
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
                    <h2 className="text-2xl mb-4">We are located at:</h2>
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
    )
}

function BusinessForm() {
    return (
        <motion.form
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <motion.input whileHover={{ scale: 1.05 }} className="w-full bg-transparent border-b border-purple-500 p-2" type="text" placeholder="Name*" required />
            <motion.input whileHover={{ scale: 1.05 }} className="w-full bg-transparent border-b border-purple-500 p-2" type="email" placeholder="Email*" required />
            <motion.input whileHover={{ scale: 1.05 }} className="w-full bg-transparent border-b border-purple-500 p-2" type="tel" placeholder="Phone Number*" required />
            <motion.input whileHover={{ scale: 1.05 }} className="w-full bg-transparent border-b border-purple-500 p-2" type="text" placeholder="Company" />
            <motion.select whileHover={{ scale: 1.05 }} className="w-full bg-transparent border-b border-purple-500 p-2">
                <option value="">Select Service*</option>
                <option value="service1">Service 1</option>
                <option value="service2">Service 2</option>
                <option value="service3">Service 3</option>
            </motion.select>
            <motion.textarea whileHover={{ scale: 1.05 }} className="w-full bg-transparent border-b border-purple-500 p-2" placeholder="Your Message" rows={4}></motion.textarea>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500 text-black px-6 py-2 rounded-full"
                type="submit"
            >
                Submit
            </motion.button>
        </motion.form>
    )
}

function CareersForm() {
    const fileInputRef = useRef(null)
    const [fileName, setFileName] = useState(null)

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        setFileName(file ? file.name : null)
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <motion.form
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <motion.input whileHover={{ scale: 1.05 }} className="w-full bg-transparent border-b border-purple-500 p-2" type="text" placeholder="Name*" required />
            <motion.input whileHover={{ scale: 1.05 }} className="w-full bg-transparent border-b border-purple-500 p-2" type="email" placeholder="Email*" required />
            <motion.input whileHover={{ scale: 1.05 }} className="w-full bg-transparent border-b border-purple-500 p-2" type="tel" placeholder="Phone Number*" required />
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
                    className="w-full bg-transparent border border-purple-500 text-purple-500 px-4 py-2 rounded-full flex items-center justify-center"
                    onClick={handleButtonClick}
                >
                    <Upload className="mr-2" size={20} />
                    {fileName ? fileName : "Attach CV*"}
                </motion.button>
            </motion.div>
            <motion.textarea whileHover={{ scale: 1.05 }} className="w-full bg-transparent border-b border-purple-500 p-2" placeholder="Your Message" rows={4}></motion.textarea>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500 text-black px-6 py-2 rounded-full"
                type="submit"
            >
                Submit
            </motion.button>
        </motion.form>
    )
}