# AI Document Summarization App - MVP Todo

## Core Features to Implement:
1. File upload component supporting PDF, DOCX, TXT, MP3
2. File processing and content extraction
3. AI-powered summarization (using a mock API for demo)
4. Summary display with download option
5. Norwegian language interface

## Files to Create/Modify:

### 1. src/pages/Index.tsx
- Main page with file upload area
- Progress indicator during processing
- Summary results display
- Clean, modern Norwegian interface

### 2. src/components/FileUpload.tsx
- Drag & drop file upload component
- File type validation (PDF, DOCX, TXT, MP3)
- File size validation
- Upload progress indicator

### 3. src/components/SummaryDisplay.tsx
- Display generated summary
- Copy to clipboard functionality
- Download summary as text file
- Processing status indicators

### 4. src/lib/fileProcessor.ts
- File reading and content extraction utilities
- Text extraction from different file types
- Error handling for unsupported formats

### 5. src/lib/aiSummarizer.ts
- Mock AI summarization service
- Text processing and summary generation
- API simulation with realistic delays

### 6. Update index.html
- Change title to "AI Sammendrag" (AI Summary)
- Add Norwegian meta description

## Implementation Strategy:
- Use shadcn/ui components for consistent UI
- Implement client-side file processing
- Mock AI service for demonstration
- Focus on user experience and error handling
- Keep it simple and functional