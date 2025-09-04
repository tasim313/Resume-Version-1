import { CVData, CVSettings } from '@/types/cv';

interface TemplateProps {
  cvData: CVData;
  settings: CVSettings;
}

export default function FacebookTemplate({ cvData, settings }: TemplateProps) {
  const { personalInfo, careerObjective, education, workExperience, skills, projects } = cvData;

  return (
    <div className="p-8 bg-white text-gray-900 font-sans">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2 uppercase tracking-wide" style={{ color: settings.primaryColor }}>
            {personalInfo.name || 'FIRST LAST'}
          </h1>
          <h2 className="text-xl font-medium text-gray-700 mb-3">
            {workExperience[0]?.role || 'Technical Program Manager'}
          </h2>
          <div className="text-sm text-gray-600">
            {personalInfo.address && <span>{personalInfo.address}</span>}
            {personalInfo.email && <span> • {personalInfo.email}</span>}
            {personalInfo.phone && <span> • {personalInfo.phone}</span>}
          </div>
        </div>
        {/* Profile Image */}
        {personalInfo.profileImage && (
          <div className="ml-6">
            <img
              src={personalInfo.profileImage}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full border-4 border-gray-200"
            />
          </div>
        )}
      </div>

      {/* Professional Experience */}
      {workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-800 uppercase tracking-wide">
            PROFESSIONAL EXPERIENCE
          </h2>
          {workExperience.map((work, index) => (
            <div key={work.id} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-base uppercase">{work.company || 'COMPANY NAME'}</h3>
                  <p className="text-sm font-medium">{work.role || 'Job Title'}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium">{work.location || 'Location'}</p>
                  <p className="text-gray-600">{work.duration || 'Duration'}</p>
                </div>
              </div>
              {work.responsibilities.length > 0 && (
                <ul className="text-sm mt-3 space-y-2 ml-4">
                  {work.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-3 mt-1 text-xs">●</span>
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              {/* Selected Project Experience for this role */}
              {index === 0 && projects.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium italic mb-2">Selected Project Experience</p>
                  <ul className="text-sm space-y-2 ml-4">
                    {projects.slice(0, 2).map((project, projectIdx) => (
                      <li key={project.id} className="flex items-start">
                        <span className="mr-3 mt-1 text-xs">●</span>
                        <div>
                          <span className="font-medium">{project.title}</span>
                          {project.description && (
                            <div className="ml-4 mt-1">
                              <span className="mr-3 text-xs">-</span>
                              <span>{project.description}</span>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-800 uppercase tracking-wide">
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base uppercase">{edu.university || 'UNIVERSITY NAME'}</h3>
                  <p className="text-sm italic">{edu.degree || 'Degree Program'}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium">{edu.year || 'Year'}</p>
                </div>
              </div>
              {edu.achievements.length > 0 && (
                <ul className="text-sm mt-2 space-y-1 ml-4">
                  {edu.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-3 mt-1 text-xs">●</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Additional Information */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-800 uppercase tracking-wide">
          ADDITIONAL INFORMATION
        </h2>
        <div className="space-y-2 text-sm">
          {skills.programmingLanguages.length > 0 && (
            <div>
              <span className="font-bold">Technical Skills:</span> {skills.programmingLanguages.join(', ')}{skills.frameworks.length > 0 && `, ${skills.frameworks.join(', ')}`}
            </div>
          )}
          {skills.devopsTools.length > 0 && (
            <div>
              <span className="font-bold">DevOps & Cloud:</span> {skills.devopsTools.join(', ')}
            </div>
          )}
          {cvData.certifications.length > 0 && (
            <div>
              <span className="font-bold">Certifications:</span> {cvData.certifications.map(cert => cert.name).join(', ')}
            </div>
          )}
        </div>
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