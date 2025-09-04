# CV Builder Application - Development Plan

## Core Files to Create/Modify:

1. **src/pages/Index.tsx** - Main CV Builder page with two-panel layout
2. **src/components/CVForm.tsx** - Left panel form component
3. **src/components/CVPreview.tsx** - Right panel preview component
4. **src/components/templates/GoogleTemplate.tsx** - Google-style CV template
5. **src/components/templates/FacebookTemplate.tsx** - Facebook-style CV template
6. **src/components/templates/MinimalistTemplate.tsx** - Clean minimal template
7. **src/types/cv.ts** - TypeScript interfaces for CV data
8. **src/hooks/useLocalStorage.ts** - Custom hook for localStorage persistence

## Key Features Implementation:

### Left Panel (CVForm.tsx):
- Personal Information section
- Career Objective section
- Education section (multiple entries)
- Work Experience section (multiple entries)
- Skills section (categorized)
- Projects section (multiple entries)
- Certifications & Achievements
- Additional sections (Open Source, Languages, etc.)

### Right Panel (CVPreview.tsx):
- Real-time preview
- Template switcher
- Theme customization
- Export buttons (PDF/Word)

### Templates:
- Google-style: Clean, professional, left sidebar
- Facebook-style: Modern two-column with skill emphasis
- Minimalist: Simple, elegant design

### Data Management:
- localStorage for persistence
- TypeScript interfaces for type safety
- Form validation and error handling

## Implementation Strategy:
1. Set up TypeScript interfaces and types
2. Create localStorage hook for data persistence
3. Build form components with all sections
4. Create CV templates matching provided examples
5. Implement real-time preview functionality
6. Add export functionality
7. Style with Tailwind CSS and add animations