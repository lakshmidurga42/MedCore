import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PasswordStrength {
  score: number;
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
  requirements: {
    length: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export function validatePassword(password: string): PasswordStrength {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(requirements).filter(Boolean).length;
  
  let label: PasswordStrength['label'] = 'Weak';
  let color = 'bg-rose-500';

  if (score === 2) {
    label = 'Fair';
    color = 'bg-amber-500';
  } else if (score === 3) {
    label = 'Good';
    color = 'bg-emerald-500';
  } else if (score === 4) {
    label = 'Strong';
    color = 'bg-indigo-500';
  }

  return { score, label, color, requirements };
}

export function getThemePreference(): 'light' | 'dark' {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('medcore-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export function setThemePreference(theme: 'light' | 'dark') {
  localStorage.setItem('medcore-theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
