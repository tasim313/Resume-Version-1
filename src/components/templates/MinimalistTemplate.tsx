import { CVData, CVSettings } from '@/types/cv';

interface TemplateProps {
  cvData: CVData;
  settings: CVSettings;
}

export default function MinimalistTemplate({ cvData, settings }: TemplateProps) {
  const { personalInfo, careerObjective, education, workExperience, skills, projects } = cvData;

  return (
    <div className="p-10 bg-white text-gray-800 font-light" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div className="flex-1">
          <h1 className="text-5xl font-thin mb-4 tracking-wide" style={{ color: settings.primaryColor }}>
            {personalInfo.name || 'Your Name'}
          </h1>
          <div className="text-lg text-gray-600 space-y-1">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.address && <div>{personalInfo.address}</div>}
            <div className="flex space-x-6 mt-3">
              {personalInfo.linkedin && (
                <a href={`https://${personalInfo.linkedin}`} className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              )}
              {personalInfo.github && (
                <a href={`https://${personalInfo.github}`} className="text-blue-600 hover:underline">
                  GitHub
                </a>
              )}
              {personalInfo.portfolio && (
                <a href={`https://${personalInfo.portfolio}`} className="text-blue-600 hover:underline">
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
        {/* Profile Image */}
        {personalInfo.profileImage && (
          <div className="ml-8">
            <img
              src={personalInfo.profileImage}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-2xl shadow-lg border border-gray-200"
            />
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {careerObjective.summary && (
        <div className="mb-10">
          <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-300" style={{ color: settings.primaryColor }}>
            About
          </h2>
          <p className="text-base leading-relaxed text-gray-700">{careerObjective.summary}</p>
        </div>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-300" style={{ color: settings.primaryColor }}>
            Experience
          </h2>
          {workExperience.map((work, index) => (
            <div key={work.id} className="mb-8">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="text-xl font-medium">{work.role || 'Job Title'}</h3>
                  <p className="text-lg text-gray-600">{work.company || 'Company Name'}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{work.duration || 'Duration'}</p>
                  <p>{work.location || 'Location'}</p>
                </div>
              </div>
              {work.responsibilities.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {work.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-gray-700 leading-relaxed pl-4 border-l-2 border-gray-200">
                      {resp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-300" style={{ color: settings.primaryColor }}>
            Projects
          </h2>
          <div className="grid gap-6">
            {projects.map((project) => (
              <div key={project.id} className="border-l-4 border-gray-200 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{project.title || 'Project Title'}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {project.type}
                  </span>
                </div>
                {project.techStack.length > 0 && (
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.description && (
                  <p className="text-gray-700 mb-2">{project.description}</p>
                )}
                <div className="flex space-x-4 text-sm">
                  {project.githubRepo && (
                    <a href={`https://${project.githubRepo}`} className="text-blue-600 hover:underline">
                      Repository
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} className="text-blue-600 hover:underline">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-300" style={{ color: settings.primaryColor }}>
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-lg font-medium">{edu.degree || 'Degree'}</h3>
                  <p className="text-gray-600">{edu.university || 'University'}</p>
                  {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                </div>
                <p className="text-sm text-gray-500">{edu.year || 'Year'}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(skills.programmingLanguages.length > 0 || skills.frameworks.length > 0 || skills.devopsTools.length > 0) && (
        <div className="mb-10">
          <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-300" style={{ color: settings.primaryColor }}>
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.programmingLanguages.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 text-gray-700">Programming Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.programmingLanguages.map((skill, idx) => (
                    <span key={idx} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.frameworks.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 text-gray-700">Frameworks & Libraries</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((skill, idx) => (
                    <span key={idx} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.devopsTools.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 text-gray-700">DevOps & Cloud</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.devopsTools.map((skill, idx) => (
                    <span key={idx} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.databases.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 text-gray-700">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.databases.map((skill, idx) => (
                    <span key={idx} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Digital Signature */}
      {personalInfo.digitalSignature && (
        <div className="mt-12 flex justify-end">
          <div className="text-center">
            <img
              src={personalInfo.digitalSignature}
              alt="Signature"
              className="h-16 mb-2"
            />
            <div className="text-sm text-gray-500 border-t border-gray-300 pt-2">
              Digital Signature
            </div>
          </div>
        </div>
      )}
    </div>
  );
}