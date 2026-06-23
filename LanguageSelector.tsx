import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ur', name: 'اُردو' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'ml', name: 'മലയാളം' }
];

export const LanguageSelector: React.FC<{ className?: string }> = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('medcore-lang', code);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe size={16} className="text-zinc-400" />
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-xs font-medium outline-none cursor-pointer hover:text-emerald-500 transition-colors dark:text-zinc-300"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
