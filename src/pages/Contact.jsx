import React from 'react';
import { siteData } from '../data/content';
import { Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-brand-beige min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 md:p-12 rounded shadow-sm text-center">
        <h1 className="font-serif text-3xl font-bold text-brand-wine mb-6">Fale Conosco</h1>
        <p className="text-gray-600 mb-8">
          Tem dúvidas sobre algum eBook, sugestões de pauta ou quer indicar uma obra para análise? 
          Estamos abertos ao diálogo.
        </p>

        <div className="space-y-6">
          <div className="flex flex-col items-center p-6 bg-brand-beige/30 rounded border border-gray-100">
            <Mail className="w-8 h-8 text-brand-wine mb-3" />
            <h3 className="font-bold text-brand-text mb-1">E-mail</h3>
            <a href={`mailto:${siteData.general.contactEmail}`} className="text-brand-wine hover:underline text-lg">
              {siteData.general.contactEmail}
            </a>
            <p className="text-xs text-gray-500 mt-2">Respondemos em até 48 horas úteis.</p>
          </div>

          <div className="p-6">
            <h3 className="font-serif text-xl font-bold text-brand-text mb-2">Para Autores</h3>
            <p className="text-sm text-gray-600">
              Se você é um autor independente e deseja ter sua obra avaliada por nossa curadoria, envie um e-mail com o assunto "Submissão Editorial" contendo uma amostra do seu trabalho.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
