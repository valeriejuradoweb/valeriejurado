import fs from 'fs';
import path from 'path';

export interface FormSubmission {
  id: string;
  timestamp: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  eventDate?: string;
  address1?: string;
  address2?: string;
  details?: string;
  mailchimpAdded: boolean;
}

// Use /tmp directory for Vercel (serverless-friendly)
const DATA_DIR = process.env.VERCEL 
  ? '/tmp/data' 
  : path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = process.env.VERCEL
  ? '/tmp/submissions.json'
  : path.join(DATA_DIR, 'submissions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize submissions file if it doesn't exist
if (!fs.existsSync(SUBMISSIONS_FILE)) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2));
}

export function saveSubmission(submission: Omit<FormSubmission, 'id' | 'timestamp' | 'mailchimpAdded'>): FormSubmission {
  try {
    const submissions = getAllSubmissions();
    
    const newSubmission: FormSubmission = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      mailchimpAdded: false,
      ...submission
    };
    
    submissions.push(newSubmission);
    
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
    
    return newSubmission;
  } catch (error) {
    console.error('Error saving submission:', error);
    throw new Error('Failed to save submission');
  }
}

export function getAllSubmissions(): FormSubmission[] {
  try {
    const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
}

export function getSubmissionById(id: string): FormSubmission | null {
  const submissions = getAllSubmissions();
  return submissions.find(sub => sub.id === id) || null;
}

export function updateSubmission(id: string, updates: Partial<FormSubmission>): boolean {
  try {
    const submissions = getAllSubmissions();
    const index = submissions.findIndex(sub => sub.id === id);
    
    if (index === -1) {
      return false;
    }
    
    submissions[index] = { ...submissions[index], ...updates };
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
    
    return true;
  } catch (error) {
    console.error('Error updating submission:', error);
    return false;
  }
}

export function hasEmailBeenSubmitted(email: string): boolean {
  const submissions = getAllSubmissions();
  return submissions.some(sub => sub.email.toLowerCase() === email.toLowerCase());
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

