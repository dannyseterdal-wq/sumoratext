export interface SummaryResult {
  summary: string;
  keyPoints: string[];
  wordCount: number;
  originalLength: number;
}

export class AISummarizer {
  static async generateSummary(content: string, fileName: string): Promise<SummaryResult> {
    const res = await fetch("/.netlify/functions/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, fileName }),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Summarize API failed: ${res.status} ${msg}`);
    }
    return res.json();
  }
}
