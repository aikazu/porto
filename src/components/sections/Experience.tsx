import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import ScrollDownButton from '../common/ScrollDownButton';

const Experience = () => {
  const workExperience = [
    {
      id: 1,
      title: 'Solution Architect',
      company: 'PT Global Infotech Solution',
      duration: 'Jun 2021 - Present',
      description: [
        'Managed a diverse array of products from software to hardware, encompassing evaluation, learning, and implementation phases',
        'Led Proof of Concept (POC) initiatives for various IT solutions, including rack servers, backup systems, and cybersecurity tools',
        'Orchestrated the implementation of rack servers, backup solutions, and cybersecurity tools, ensuring seamless integration into client environments'
      ]
    },
    {
      id: 2,
      title: 'IT Consultant',
      company: 'Bhinneka Inti Global Data',
      duration: 'Feb 2020 - Jul 2020',
      description: [
        'Provided expert consultation services to clients, offering strategic guidance and solutions to enhance their IT infrastructure and security posture',
        'Conducted comprehensive Vulnerability Assessment & Penetration Testing (VAPT) to identify and mitigate potential security risks',
        'Collaborated closely with clients to understand their specific needs and tailor VAPT reports to meet ISO certification requirements'
      ]
    },
    {
      id: 3,
      title: 'Senior Information Technology Officer',
      company: 'Danakoo Mitra Artha (danakoo.id)',
      duration: 'Jul 2019 - Jan 2020',
      description: [
        'Spearheaded the enhancement and maintenance of critical applications and servers, ensuring optimal performance and reliability',
        'Demonstrated versatility by actively participating in various IT activities, including development, support, analysis, and administration',
        'Represented the company at events and training, providing support and insights to bolster the organization\'s presence and knowledge base'
      ]
    },
    {
      id: 4,
      title: 'Information Technology Specialist',
      company: 'Teknologi Adhikarya Prima',
      duration: 'Aug 2016 - Jul 2019',
      description: [
        'Engaged in diverse IT activities including development, support, analysis, and administration, adapting to varying project requirements',
        'Collaborated with team members to tackle multifaceted IT challenges and deliver comprehensive solutions',
        'Actively contributed to the growth and development of a startup company by taking on various IT roles and responsibilities'
      ]
    },
    {
      id: 5,
      title: 'Information Technology Specialist',
      company: 'Self Employed',
      duration: 'Nov 2013 - Aug 2016',
      description: [
        'Mentored high school students in IT workshops, imparting knowledge on industry best practices and emerging technologies',
        'Managed outsourced IT projects, ensuring timely delivery and adherence to quality standards',
        'Led remote IT teams in executing various projects, coordinating tasks and ensuring effective communication'
      ]
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'CompTIA Security+ ce Certification',
      institution: 'CompTIA',
      duration: 'Mar 2024 - Mar 2027',
      description: 'Industry-recognized certification validating baseline cybersecurity skills and knowledge'
    },
    {
      id: 2,
      degree: 'ISC2 Candidate',
      institution: 'ISC2',
      duration: 'May 2024 - May 2025',
      description: 'Pursuing advanced cybersecurity knowledge and certification'
    },
    {
      id: 3,
      degree: 'Internal Auditor Training Based on ISO 19011: 2018',
      institution: 'Wijaya Sakti Indonesia',
      duration: '2023',
      description: 'Training on guidelines for auditing management systems'
    },
    {
      id: 4,
      degree: 'Awareness Training Information Security Management System ISO 27001',
      institution: 'Wijaya Sakti Indonesia',
      duration: '2023',
      description: 'Training on information security management system standards and implementation'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="experience" className="section bg-gray-50 dark:bg-gray-800 relative">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience & Education
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <motion.h3 
              className="flex items-center text-2xl font-bold mb-8 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FaBriefcase className="mr-3 text-primary-600 dark:text-primary-400" />
              Work Experience
            </motion.h3>

            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {workExperience.map((job) => (
                <motion.div 
                  key={job.id} 
                  className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700"
                  variants={itemVariants}
                >
                  {/* Timeline dot */}
                  <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-400"></div>
                  
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {job.title}
                    </h4>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-primary-600 dark:text-primary-400 font-medium">
                        {job.company}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {job.duration}
                      </span>
                    </div>
                    
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      {job.description.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 mt-2 mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education */}
          <div>
            <motion.h3 
              className="flex items-center text-2xl font-bold mb-8 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FaGraduationCap className="mr-3 text-primary-600 dark:text-primary-400" />
              Certifications & Education
            </motion.h3>

            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {education.map((edu) => (
                <motion.div 
                  key={edu.id} 
                  className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700"
                  variants={itemVariants}
                >
                  {/* Timeline dot */}
                  <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-400"></div>
                  
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-primary-600 dark:text-primary-400 font-medium">
                        {edu.institution}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {edu.duration}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a 
            href="https://www.credly.com/users/iqbal-attila"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            View Credentials on Credly
          </a>
        </motion.div>
      </div>
      <ScrollDownButton targetSection="contact" />
    </section>
  );
};

export default Experience; 