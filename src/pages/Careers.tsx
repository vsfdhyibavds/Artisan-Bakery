import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Heart, Send, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface JobApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
  resume?: FileList;
}

const jobOpenings = [
  {
    id: 'head-baker',
    title: 'Head Baker',
    department: 'Production',
    type: 'Full-time',
    location: 'Main Bakery',
    description: 'Lead our baking team and ensure consistent quality across all products. Requires 5+ years of professional baking experience.',
    requirements: [
      '5+ years professional baking experience',
      'Leadership and team management skills',
      'Knowledge of artisan bread and pastry techniques',
      'Food safety certification',
      'Early morning availability (4 AM start)'
    ],
    benefits: [
      'Competitive salary $55,000-$65,000',
      'Health insurance',
      'Paid time off',
      'Employee discounts',
      'Professional development opportunities'
    ]
  },
  {
    id: 'pastry-chef',
    title: 'Pastry Chef',
    department: 'Production',
    type: 'Full-time',
    location: 'Main Bakery',
    description: 'Create beautiful pastries and desserts. Perfect for someone passionate about French pastry techniques.',
    requirements: [
      '3+ years pastry experience',
      'Culinary school graduate preferred',
      'Creative flair and attention to detail',
      'Ability to work in fast-paced environment',
      'Weekend availability'
    ],
    benefits: [
      'Competitive salary $45,000-$55,000',
      'Health insurance',
      'Paid time off',
      'Employee discounts',
      'Creative freedom'
    ]
  },
  {
    id: 'sales-associate',
    title: 'Sales Associate',
    department: 'Retail',
    type: 'Part-time',
    location: 'Front of House',
    description: 'Provide excellent customer service and help customers find their perfect baked goods.',
    requirements: [
      'Customer service experience',
      'Friendly and outgoing personality',
      'Basic math skills',
      'Ability to work weekends',
      'Food handling certification (we provide training)'
    ],
    benefits: [
      'Hourly wage $16-$18/hour',
      'Flexible scheduling',
      'Employee discounts',
      'Tips',
      'Growth opportunities'
    ]
  }
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<JobApplication>();

  const onSubmit = (data: JobApplication) => {
    console.log('Job application submitted:', data);
    // Here you would typically send the application to your backend
    alert('Thank you for your application! We will review it and get back to you soon.');
    reset();
    setShowApplication(false);
    setSelectedJob(null);
  };

  const selectedJobData = jobOpenings.find(job => job.id === selectedJob);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-200 max-w-3xl mx-auto"
          >
            Be part of a passionate team dedicated to creating exceptional baked goods 
            and serving our community with love and tradition.
          </motion.p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Why Work With Us?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Passionate Environment',
                description: 'Work with people who truly love what they do'
              },
              {
                icon: Users,
                title: 'Team Culture',
                description: 'Collaborative and supportive work environment'
              },
              {
                icon: Clock,
                title: 'Work-Life Balance',
                description: 'Flexible scheduling and fair time off policies'
              },
              {
                icon: MapPin,
                title: 'Great Location',
                description: 'Beautiful downtown location with easy access'
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Current Openings
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find your perfect role in our growing team
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {job.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {job.department}
                    </p>
                  </div>
                  <span className="bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 px-3 py-1 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {job.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>

                <button
                  onClick={() => setSelectedJob(job.id)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && selectedJobData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedJob(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                    {selectedJobData.title}
                  </h2>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    {selectedJobData.department} • {selectedJobData.type}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Job Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedJobData.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedJobData.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {selectedJobData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowApplication(true)}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Application Form Modal */}
      {showApplication && selectedJobData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowApplication(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                  Apply for {selectedJobData.title}
                </h2>
                <button
                  onClick={() => setShowApplication(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone *
                    </label>
                    <input
                      {...register('phone', { required: 'Phone number is required' })}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    {...register('experience', { required: 'Experience is required' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4-5">4-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                  {errors.experience && (
                    <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    {...register('coverLetter', { required: 'Cover letter is required' })}
                    rows={4}
                    placeholder="Tell us why you'd be a great fit for this position..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.coverLetter && (
                    <p className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resume (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      {...register('resume')}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Click to upload resume
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      PDF, DOC, or DOCX (max 5MB)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowApplication(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}