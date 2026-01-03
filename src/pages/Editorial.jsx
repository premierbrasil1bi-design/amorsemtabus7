import React from 'react';
import { siteData } from '../data/content';
import { ShieldCheck, CheckCircle } from 'lucide-react';

const Editorial = () => {
  const { title, description, criteria } = siteData.editorial;

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-full bg-brand-beige mb-4">
             <ShieldCheck className="w-10 h-10 text-brand-wine" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-text mb-4">{title}</h1>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {criteria.map((item, index) => (
            <div key={index} className="bg-brand-beige/50 p-6 rounded border border-brand-beige hover:border-brand-wine/30 transition-colors">
              <h3 className="font-serif text-lg font-bold text-brand-wine mb-3">{item.title}</h3>
              <p className="text-brand-text/80 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 rounded border-l-4 border-brand-gold">
          <h3 className="font-serif text-xl font-bold text-brand-text mb-4">Como funciona nossa Avaliação?</h3>
          <p className="text-gray-600 mb-4">
            Ao contrário de plataformas abertas onde qualquer usuário pode avaliar, aqui cada nota é atribuída por nossa equipe editorial.
          </p>
          <ul className="space-y-3">
             <li className="flex items-start gap-3">
               <CheckCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
               <span className="text-sm text-gray-700">Lemos integralmente todas as obras listadas.</span>
             </li>
             <li className="flex items-start gap-3">
               <CheckCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
               <span className="text-sm text-gray-700">Verificamos a credibilidade do autor e a coerência do conteúdo.</span>
             </li>
             <li className="flex items-start gap-3">
               <CheckCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
               <span className="text-sm text-gray-700">A nota reflete a qualidade técnica, clareza e responsabilidade do material, não apenas gosto pessoal.</span>
             </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editorial;
