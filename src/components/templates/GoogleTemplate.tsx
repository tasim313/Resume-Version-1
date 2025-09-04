import { CVData, CVSettings } from '@/types/cv';

interface TemplateProps {
  cvData: CVData;
  settings: CVSettings;
}

export default function GoogleTemplate({ cvData, settings }: TemplateProps) {
  const { personalInfo, careerObjective, education, workExperience, skills, projects } = cvData;

  return (
    <div className="p-8 bg-white text-gray-900 font-serif" style={{ fontFamily: 'Times, serif' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{personalInfo.name || 'Your Name'}</h1>
          <div className="text-sm text-gray-600">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span> | {personalInfo.phone}</span>}
            {personalInfo.address && <span> | {personalInfo.address}</span>}
          </div>
        </div>
        {/* Profile Image */}
        {personalInfo.profileImage && (
          <div className="ml-6">
            <img
              src={personalInfo.profileImage}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
            />
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {careerObjective.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 pb-1 border-b border-gray-400">PROFESSIONAL SUMMARY</h2>
          <p className="text-sm leading-relaxed">{careerObjective.summary}</p>
        </div>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b border-gray-400">EXPERIENCE</h2>
          {workExperience.map((work, index) => (
            <div key={work.id} className={`mb-4 ${index !== workExperience.length - 1 ? 'pb-4' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-base">{work.company || 'Company Name'}</h3>
                  <p className="text-sm italic">{work.role || 'Job Title'}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium">{work.duration || 'Duration'}</p>
                  <p className="text-gray-600">{work.location || 'Location'}</p>
                </div>
              </div>
              {work.responsibilities.length > 0 && (
                <ul className="text-sm mt-2 space-y-1">
                  {work.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{resp}</span>
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
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b border-gray-400">SELECTED PROJECTS</h2>
          {projects.map((project, index) => (
            <div key={project.id} className={`mb-3 ${index !== projects.length - 1 ? 'pb-3' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-base">{project.title || 'Project Title'}</h3>
                <span className="text-sm text-gray-600">{project.type}</span>
              </div>
              {project.techStack.length > 0 && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Tech Stack:</span> {project.techStack.join(', ')}
                </p>
              )}
              {project.description && (
                <p className="text-sm">{project.description}</p>
              )}
              <div className="flex space-x-4 mt-1 text-sm">
                {project.githubRepo && (
                  <span className="text-blue-600">GitHub: {project.githubRepo}</span>
                )}
                {project.liveLink && (
                  <span className="text-blue-600">Live: {project.liveLink}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b border-gray-400">EDUCATION</h2>
          {education.map((edu, index) => (
            <div key={edu.id} className={`mb-3 ${index !== education.length - 1 ? 'pb-3' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base">{edu.university || 'University Name'}</h3>
                  <p className="text-sm">{edu.degree || 'Degree'}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium">{edu.year || 'Year'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(skills.programmingLanguages.length > 0 || skills.frameworks.length > 0 || skills.devopsTools.length > 0 || skills.databases.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-1 border-b border-gray-400">TECHNICAL SKILLS</h2>
          <div className="space-y-2 text-sm">
            {skills.programmingLanguages.length > 0 && (
              <div>
                <span className="font-bold">Programming Languages:</span> {skills.programmingLanguages.join(', ')}
              </div>
            )}
            {skills.frameworks.length > 0 && (
              <div>
                <span className="font-bold">Frameworks & Libraries:</span> {skills.frameworks.join(', ')}
              </div>
            )}
            {skills.devopsTools.length > 0 && (
              <div>
                <span className="font-bold">DevOps/Cloud Tools:</span> {skills.devopsTools.join(', ')}
              </div>
            )}
            {skills.databases.length > 0 && (
              <div>
                <span className="font-bold">Databases:</span> {skills.databases.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="text-sm text-gray-600 space-y-1">
        {personalInfo.linkedin && (
          <div><span className="font-medium">LinkedIn:</span> {personalInfo.linkedin}</div>
        )}
        {personalInfo.github && (
          <div><span className="font-medium">GitHub:</span> {personalInfo.github}</div>
        )}
        {personalInfo.portfolio && (
          <div><span className="font-medium">Portfolio:</span> {personalInfo.portfolio}</div>
        )}
      </div>

      {/* Digital Signature */}
      {personalInfo.digitalSignature && (
        <div className="mt-8 flex justify-end">
          <div className="text-center">
            <img
              src={personalInfo.digitalSignature}
              alt="Signature"
              className="h-12 mb-1"
            />
            <div className="text-xs text-gray-500 border-t border-gray-300 pt-1">
              Digital Signature
            </div>
          </div>
        </div>
      )}
    </div>
  );
}