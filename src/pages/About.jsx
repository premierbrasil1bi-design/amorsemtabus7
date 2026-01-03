import React from 'react';
import { siteData } from '../data/content';

const About = () => {
  const { title, text } = siteData.about;

  return (
    <div className="bg-brand-beige min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded shadow-sm">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-wine mb-8 text-center">{title}</h1>
        
        <div className="space-y-6 text-lg text-brand-text leading-relaxed font-light">
          {text.map((paragraph, index) => (
            <p key={index} className={index === text.length - 1 ? "font-medium text-brand-wineDark" : ""}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 italic">
            Amor Sem Tabus — Porque a verdade aproxima.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
