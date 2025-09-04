import { useState } from 'react';
import { CVData, PersonalInfo, Education, WorkExperience, Project, Certification } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Briefcase, GraduationCap, Code, Award, User, Target } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface CVFormProps {
  cvData: CVData;
  updateCVData: <K extends keyof CVData>(section: K, data: CVData[K]) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function CVForm({ cvData, updateCVData, activeSection, setActiveSection }: CVFormProps) {
  const [newSkill, setNewSkill] = useState('');
  const [skillCategory, setSkillCategory] = useState<keyof CVData['skills']>('programmingLanguages');

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = {
        ...cvData.skills,
        [skillCategory]: [...cvData.skills[skillCategory], newSkill.trim()]
      };
      updateCVData('skills', updatedSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (category: keyof CVData['skills'], index: number) => {
    const updatedSkills = {
      ...cvData.skills,
      [category]: cvData.skills[category].filter((_, i) => i !== index)
    };
    updateCVData('skills', updatedSkills);
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      university: '',
      year: '',
      gpa: '',
      achievements: []
    };
    updateCVData('education', [...cvData.education, newEducation]);
  };

  const updateEducation = <K extends keyof Education>(id: string, field: K, value: Education[K]) => {
    const updatedEducation = cvData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateCVData('education', updatedEducation);
  };

  const removeEducation = (id: string) => {
    updateCVData('education', cvData.education.filter(edu => edu.id !== id));
  };

  const addWorkExperience = () => {
    const newWork: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      duration: '',
      location: '',
      responsibilities: [],
      achievements: [],
      isCurrentJob: false
    };
    updateCVData('workExperience', [...cvData.workExperience, newWork]);
  };

  const updateWorkExperience = <K extends keyof WorkExperience>(id: string, field: K, value: WorkExperience[K]) => {
    const updatedWork = cvData.workExperience.map(work =>
      work.id === id ? { ...work, [field]: value } : work
    );
    updateCVData('workExperience', updatedWork);
  };

  const removeWorkExperience = (id: string) => {
    updateCVData('workExperience', cvData.workExperience.filter(work => work.id !== id));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      techStack: [],
      githubRepo: '',
      liveLink: '',
      description: '',
      achievements: [],
      type: 'Web App'
    };
    updateCVData('projects', [...cvData.projects, newProject]);
  };

  const updateProject = <K extends keyof Project>(id: string, field: K, value: Project[K]) => {
    const updatedProjects = cvData.projects.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    );
    updateCVData('projects', updatedProjects);
  };

  const removeProject = (id: string) => {
    updateCVData('projects', cvData.projects.filter(project => project.id !== id));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">CV Information</h2>
        <p className="text-sm text-gray-600 mt-1">Fill in your details to build your professional CV</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="h-full">
          <TabsList className="grid w-full grid-cols-6 sticky top-0 bg-white z-10 border-b">
            <TabsTrigger value="personal" className="text-xs"><User className="w-4 h-4 mr-1" />Personal</TabsTrigger>
            <TabsTrigger value="objective" className="text-xs"><Target className="w-4 h-4 mr-1" />Objective</TabsTrigger>
            <TabsTrigger value="education" className="text-xs"><GraduationCap className="w-4 h-4 mr-1" />Education</TabsTrigger>
            <TabsTrigger value="experience" className="text-xs"><Briefcase className="w-4 h-4 mr-1" />Experience</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs"><Code className="w-4 h-4 mr-1" />Skills</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs"><Award className="w-4 h-4 mr-1" />Projects</TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Profile Image Upload */}
                  <div className="flex justify-center mb-6">
                    <ImageUpload
                      value={cvData.personalInfo.profileImage}
                      onChange={(imageUrl) => updateCVData('personalInfo', { ...cvData.personalInfo, profileImage: imageUrl })}
                      onRemove={() => updateCVData('personalInfo', { ...cvData.personalInfo, profileImage: undefined })}
                      label="Profile Picture"
                      placeholder="Optional: Upload a professional headshot"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={cvData.personalInfo.name}
                        onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={cvData.personalInfo.email}
                        onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={cvData.personalInfo.phone}
                        onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={cvData.personalInfo.address}
                        onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, address: e.target.value })}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={cvData.personalInfo.linkedin}
                        onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, linkedin: e.target.value })}
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={cvData.personalInfo.github}
                        onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, github: e.target.value })}
                        placeholder="github.com/johndoe"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="portfolio">Portfolio Website</Label>
                    <Input
                      id="portfolio"
                      value={cvData.personalInfo.portfolio}
                      onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, portfolio: e.target.value })}
                      placeholder="johndoe.dev"
                    />
                  </div>

                  {/* Additional Social Links */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Social Links (Optional)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                          id="twitter"
                          value={cvData.personalInfo.twitter}
                          onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, twitter: e.target.value })}
                          placeholder="twitter.com/johndoe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stackoverflow">Stack Overflow</Label>
                        <Input
                          id="stackoverflow"
                          value={cvData.personalInfo.stackoverflow}
                          onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, stackoverflow: e.target.value })}
                          placeholder="stackoverflow.com/users/123456"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="medium">Medium</Label>
                        <Input
                          id="medium"
                          value={cvData.personalInfo.medium}
                          onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, medium: e.target.value })}
                          placeholder="medium.com/@johndoe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="kaggle">Kaggle</Label>
                        <Input
                          id="kaggle"
                          value={cvData.personalInfo.kaggle}
                          onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, kaggle: e.target.value })}
                          placeholder="kaggle.com/johndoe"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="leetcode">LeetCode</Label>
                        <Input
                          id="leetcode"
                          value={cvData.personalInfo.leetcode}
                          onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, leetcode: e.target.value })}
                          placeholder="leetcode.com/johndoe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hackerrank">HackerRank</Label>
                        <Input
                          id="hackerrank"
                          value={cvData.personalInfo.hackerrank}
                          onChange={(e) => updateCVData('personalInfo', { ...cvData.personalInfo, hackerrank: e.target.value })}
                          placeholder="hackerrank.com/johndoe"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Digital Signature Upload */}
                  <div className="mt-6">
                    <ImageUpload
                      value={cvData.personalInfo.digitalSignature}
                      onChange={(imageUrl) => updateCVData('personalInfo', { ...cvData.personalInfo, digitalSignature: imageUrl })}
                      onRemove={() => updateCVData('personalInfo', { ...cvData.personalInfo, digitalSignature: undefined })}
                      label="Digital Signature"
                      placeholder="Optional: Upload your signature for formal documents"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="objective" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Career Objective / Professional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={cvData.careerObjective.summary}
                    onChange={(e) => updateCVData('careerObjective', { summary: e.target.value })}
                    placeholder="Write a compelling summary of your career goals, expertise, and value proposition..."
                    className="min-h-32"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Education</h3>
                <Button onClick={addEducation} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </div>
              {cvData.education.map((edu) => (
                <Card key={edu.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              placeholder="Bachelor of Computer Science"
                            />
                          </div>
                          <div>
                            <Label>University/Institute</Label>
                            <Input
                              value={edu.university}
                              onChange={(e) => updateEducation(edu.id, 'university', e.target.value)}
                              placeholder="Stanford University"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Year</Label>
                          <Input
                            value={edu.year}
                            onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                            placeholder="2020"
                          />
                        </div>
                        <div>
                          <Label>GPA/CGPA</Label>
                          <Input
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            placeholder="3.8/4.0"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Work Experience</h3>
                <Button onClick={addWorkExperience} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </div>
              {cvData.workExperience.map((work) => (
                <Card key={work.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={work.company}
                              onChange={(e) => updateWorkExperience(work.id, 'company', e.target.value)}
                              placeholder="Google"
                            />
                          </div>
                          <div>
                            <Label>Role</Label>
                            <Input
                              value={work.role}
                              onChange={(e) => updateWorkExperience(work.id, 'role', e.target.value)}
                              placeholder="Software Engineer"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWorkExperience(work.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Duration</Label>
                          <Input
                            value={work.duration}
                            onChange={(e) => updateWorkExperience(work.id, 'duration', e.target.value)}
                            placeholder="Jan 2020 - Present"
                          />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input
                            value={work.location}
                            onChange={(e) => updateWorkExperience(work.id, 'location', e.target.value)}
                            placeholder="Mountain View, CA"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Responsibilities (one per line)</Label>
                        <Textarea
                          value={work.responsibilities.join('\n')}
                          onChange={(e) => updateWorkExperience(work.id, 'responsibilities', e.target.value.split('\n').filter(r => r.trim()))}
                          placeholder="• Developed scalable web applications&#10;• Led team of 5 engineers&#10;• Improved system performance by 40%"
                          className="min-h-24"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-2">
                    <select
                      value={skillCategory}
                      onChange={(e) => setSkillCategory(e.target.value as keyof CVData['skills'])}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="programmingLanguages">Programming Languages</option>
                      <option value="frameworks">Frameworks & Libraries</option>
                      <option value="devopsTools">DevOps/Cloud Tools</option>
                      <option value="databases">Databases</option>
                      <option value="softSkills">Soft Skills</option>
                    </select>
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill..."
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill}>Add</Button>
                  </div>

                  {Object.entries(cvData.skills).map(([category, skills]) => (
                    <div key={category}>
                      <Label className="text-sm font-medium capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-red-100"
                            onClick={() => removeSkill(category as keyof CVData['skills'], index)}
                          >
                            {skill} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Projects</h3>
                <Button onClick={addProject} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
              {cvData.projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label>Project Title</Label>
                            <Input
                              value={project.title}
                              onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                              placeholder="E-commerce Platform"
                            />
                          </div>
                          <div>
                            <Label>Project Type</Label>
                            <select
                              value={project.type}
                              onChange={(e) => updateProject(project.id, 'type', e.target.value as Project['type'])}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            >
                              <option value="Web App">Web App</option>
                              <option value="Mobile App">Mobile App</option>
                              <option value="AI/ML">AI/ML</option>
                              <option value="DevOps">DevOps</option>
                              <option value="Open Source">Open Source</option>
                            </select>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProject(project.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>GitHub Repository</Label>
                          <Input
                            value={project.githubRepo}
                            onChange={(e) => updateProject(project.id, 'githubRepo', e.target.value)}
                            placeholder="github.com/user/project"
                          />
                        </div>
                        <div>
                          <Label>Live Link</Label>
                          <Input
                            value={project.liveLink}
                            onChange={(e) => updateProject(project.id, 'liveLink', e.target.value)}
                            placeholder="https://project.com"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Tech Stack (comma separated)</Label>
                        <Input
                          value={project.techStack.join(', ')}
                          onChange={(e) => updateProject(project.id, 'techStack', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          placeholder="Brief description of the project..."
                          className="min-h-20"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}