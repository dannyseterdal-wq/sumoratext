export interface ProcessedFile {
  name: string;
  type: string;
  size: number;
  content: string;
}

export class FileProcessor {
  static async processFile(file: File): Promise<ProcessedFile> {
    const { name, type, size } = file;
    
    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];
    
    const allowedExtensions = ['.pdf', '.docx', '.txt', '.jpg', '.jpeg', '.png'];
    const hasValidExtension = allowedExtensions.some(ext => 
      name.toLowerCase().endsWith(ext)
    );
    
    // More flexible type checking for image files
    const isImageFile = type.startsWith('image/') || 
                       name.toLowerCase().endsWith('.jpg') || 
                       name.toLowerCase().endsWith('.jpeg') || 
                       name.toLowerCase().endsWith('.png');
    const isValidType = allowedTypes.includes(type) || hasValidExtension || isImageFile;
    
    if (!isValidType) {
      throw new Error('Ugyldig filtype. Støttede formater: PDF, DOCX, TXT, JPG, PNG');
    }
    
    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (size > maxSize) {
      throw new Error('Filen er for stor. Maksimal størrelse: 10MB');
    }
    
    let content = '';
    
    try {
      if (type === 'text/plain' || name.toLowerCase().endsWith('.txt')) {
        content = await this.processTextFile(file);
      } else if (type === 'application/pdf' || name.toLowerCase().endsWith('.pdf')) {
        content = await this.processPdfFile(file);
      } else if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || name.toLowerCase().endsWith('.docx')) {
        content = await this.processDocxFile(file);
      } else if (isImageFile) {
        content = await this.processImageFile(file);
      } else {
        throw new Error('Ukjent filtype');
      }
      
      if (!content.trim()) {
        throw new Error('Kunne ikke hente innhold fra filen');
      }
      
      return { name, type: type || 'unknown', size, content };
    } catch (error) {
      console.error('File processing error:', error);
      throw new Error(`Feil ved behandling av fil: ${error instanceof Error ? error.message : 'Ukjent feil'}`);
    }
  }
  
  private static async processTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string || '');
      reader.onerror = () => reject(new Error('Kunne ikke lese tekstfil'));
      reader.readAsText(file, 'UTF-8');
    });
  }
  
  private static async processPdfFile(file: File): Promise<string> {
    // For MVP, we'll simulate PDF processing
    // In a real implementation, you'd use a library like pdf-parse or PDF.js
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`[Simulert PDF-innhold fra ${file.name}]\n\nDette er en simulering av tekstinnhold hentet fra en PDF-fil. I en ekte implementering ville dette være den faktiske teksten fra PDF-dokumentet.\n\nPDF-filer inneholder ofte formatert tekst, bilder og tabeller som kan ekstraheres og behandles av AI for sammendrag.`);
      }, 1500);
    });
  }
  
  private static async processDocxFile(file: File): Promise<string> {
    // For MVP, we'll simulate DOCX processing
    // In a real implementation, you'd use a library like mammoth.js
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`[Simulert DOCX-innhold fra ${file.name}]\n\nDette er en simulering av tekstinnhold hentet fra et Word-dokument. I en ekte implementering ville dette være den faktiske teksten fra DOCX-filen.\n\nWord-dokumenter kan inneholde rik formatering, tabeller, bilder og annet innhold som kan ekstraheres for AI-behandling.`);
      }, 1200);
    });
  }
  
  private static async processImageFile(file: File): Promise<string> {
    // For MVP, we'll simulate OCR processing
    // In a real implementation, you'd use a service like Tesseract.js or Google Vision API
    console.log('Processing image file:', file.name, 'Type:', file.type, 'Size:', file.size);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const ocrText = `[Simulert OCR-gjenkjenning fra ${file.name}]

Dette er en simulering av tekst hentet fra et bilde ved hjelp av OCR (Optical Character Recognition).

I en ekte implementering ville systemet:
- Analysere bildet for å identifisere tekst
- Bruke maskinlæring for å gjenkjenne bokstaver og ord
- Konvertere visuell tekst til redigerbar tekst
- Håndtere forskjellige fonter og tekststørrelser

Eksempel på gjenkjent tekst fra bildet:
"Dette er et eksempel på tekst som kunne vært gjenkjent i et bilde. OCR-teknologi kan lese tekst fra skjermbilder, dokumenter, skilt, og andre bilder som inneholder skriftlig informasjon."

OCR-kvaliteten avhenger av:
- Bildekvalitet og oppløsning
- Kontrast mellom tekst og bakgrunn  
- Fonttype og tekststørrelse
- Bildevinkel og belysning

Denne simulerte OCR-teksten viser hvordan AI kan ekstraktere og behandle tekstinnhold fra bilder for videre sammendrag og analyse.`;
        
        resolve(ocrText);
      }, 2000); // Simulate OCR processing time
    });
  }
}