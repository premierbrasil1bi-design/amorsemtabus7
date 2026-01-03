import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import BookCard from '../components/BookCard';
import { ArrowRight, RefreshCcw, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Quiz = () => {
  const { books } = useData();
  const [step, setStep] = useState('intro'); // intro, quiz, loading, result
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    'Comunicação': 0,
    'Intimidade': 0,
    'Autoconhecimento': 0
  });

  // Perguntas expandidas para maior precisão
  const questions = [
    {
      id: 1,
      text: "Qual é a maior dor da sua relação hoje?",
      options: [
        { 
          label: "Comunicação travada e brigas constantes", 
          desc: "Parece que falamos línguas diferentes e tudo vira discussão.",
          score: { 'Comunicação': 3 } 
        },
        { 
          label: "Esfriamento e distância", 
          desc: "O desejo diminuiu, parecemos apenas bons amigos ou colegas de casa.",
          score: { 'Intimidade': 3 } 
        },
        { 
          label: "Insegurança e ciúmes", 
          desc: "Sinto medo constante de perder, necessidade de controle ou comparação.",
          score: { 'Autoconhecimento': 3 } 
        },
        { 
          label: "Sinto que me anulo", 
          desc: "Tenho dificuldade em dizer não e colocar limites.",
          score: { 'Comunicação': 2, 'Autoconhecimento': 1 }
        }
      ]
    },
    {
      id: 2,
      text: "O que você mais deseja sentir nos próximos dias?",
      options: [
        { 
          label: "Paz e entendimento", 
          desc: "Quero conseguir conversar sem pisar em ovos.",
          score: { 'Comunicação': 2 } 
        },
        { 
          label: "Conexão e desejo", 
          desc: "Quero sentir aquele frio na barriga ou proximidade física novamente.",
          score: { 'Intimidade': 2 } 
        },
        { 
          label: "Segurança e autoestima", 
          desc: "Quero me sentir bem comigo mesmo(a) independente do outro.",
          score: { 'Autoconhecimento': 2 } 
        }
      ]
    },
    {
      id: 3,
      text: "Como você costuma reagir quando algo te chateia?",
      options: [
        { 
          label: "Ataco ou me defendo imediatamente", 
          desc: "Não levo desaforo para casa, mas depois me arrependo.",
          score: { 'Comunicação': 2 } 
        },
        { 
          label: "Me fecho e guardo para mim", 
          desc: "Fico em silêncio esperando que o outro perceba.",
          score: { 'Comunicação': 1, 'Intimidade': 1 } 
        },
        { 
          label: "Investigo o que o outro está fazendo", 
          desc: "Busco provas ou tento controlar a situação.",
          score: { 'Autoconhecimento': 2 } 
        }
      ]
    }
  ];

  const handleOptionClick = (optionScore) => {
    // Atualiza pontuação
    const newScores = { ...scores };
    Object.keys(optionScore).forEach(category => {
      newScores[category] = (newScores[category] || 0) + optionScore[category];
    });
    setScores(newScores);

    // Avança ou finaliza
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('loading');
      setTimeout(() => {
        setStep('result');
      }, 1500);
    }
  };

  const getWinningCategory = () => {
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  };

  const winningCategory = getWinningCategory();
  
  // Filtra livros da categoria vencedora
  const recommendedBooks = books.filter(b => b.category === winningCategory);
  
  // Pega o livro mais relevante (pode ser aleatório ou o primeiro da lista)
  // Se não houver livros na categoria (o que não deve ocorrer), pega o primeiro geral
  const mainRecommendation = recommendedBooks.length > 0 ? recommendedBooks[0] : books[0];

  const resetQuiz = () => {
    setStep('intro');
    setCurrentQuestionIndex(0);
    setScores({ 'Comunicação': 0, 'Intimidade': 0, 'Autoconhecimento': 0 });
  };

  // Barra de progresso
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-brand-beige flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-brand-wine/10 min-h-[600px] flex flex-col">
        
        {/* Header Visual */}
        <div className="bg-brand-wine p-6 text-center relative">
          <Heart className="w-8 h-8 text-brand-beige mx-auto mb-2" />
          <h2 className="text-white font-serif text-2xl">Consultoria Editorial</h2>
          {step === 'quiz' && (
            <div className="absolute bottom-0 left-0 h-1 bg-brand-gold transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
          )}
        </div>

        <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center">
          
          {/* STEP: INTRO */}
          {step === 'intro' && (
            <div className="text-center space-y-6 animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-800">Não sabe por onde começar?</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nossa biblioteca cresce constantemente. Para garantir que você leia exatamente o que precisa agora, criamos este diagnóstico rápido.
              </p>
              <p className="text-gray-500 text-sm">Responda a 3 perguntas rápidas.</p>
              <button 
                onClick={() => setStep('quiz')}
                className="inline-flex items-center px-8 py-4 bg-brand-wine text-white rounded-full font-bold text-lg hover:bg-brand-wineDark transition-all hover:scale-105 shadow-lg"
              >
                Iniciar Diagnóstico <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP: QUIZ Questions */}
          {step === 'quiz' && (
            <div className="w-full animate-fadeIn">
              <div className="mb-6 flex justify-between items-end">
                 <h3 className="text-xl font-bold text-gray-800 leading-tight">
                   {questions[currentQuestionIndex].text}
                 </h3>
                 <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-4">
                   {currentQuestionIndex + 1} de {questions.length}
                 </span>
              </div>
              
              <div className="grid gap-3">
                {questions[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option.score)}
                    className="group flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-brand-wine hover:bg-brand-surface transition-all text-left"
                  >
                    <div className="pr-4">
                      <span className="block font-bold text-brand-text group-hover:text-brand-wine text-lg mb-1">{option.label}</span>
                      <span className="text-sm text-gray-500 leading-snug">{option.desc}</span>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-brand-wine opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: LOADING */}
          {step === 'loading' && (
            <div className="text-center animate-pulse py-12">
              <div className="w-16 h-16 border-4 border-brand-wine border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h4 className="text-xl font-medium text-gray-800 mb-2">Processando suas respostas...</h4>
              <p className="text-gray-500">Cruzando seus dados com nossa curadoria...</p>
            </div>
          )}

          {/* STEP: RESULT */}
          {step === 'result' && mainRecommendation && (
            <div className="w-full animate-fadeIn text-center">
              <div className="mb-6">
                <span className="inline-block py-1 px-3 rounded-full bg-brand-surface text-brand-wine text-xs font-bold uppercase tracking-widest mb-2">
                  Diagnóstico Concluído
                </span>
                <h3 className="text-2xl font-serif text-gray-900">
                  Sua área de foco é: <span className="text-brand-wine">{winningCategory}</span>
                </h3>
                <p className="text-gray-500 text-sm mt-2">Baseado nisso, selecionamos:</p>
              </div>
              
              <div className="max-w-xs mx-auto transform hover:scale-105 transition-transform duration-300">
                <BookCard book={mainRecommendation} />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={resetQuiz}
                  className="flex items-center justify-center text-gray-500 hover:text-brand-wine text-sm font-medium px-4 py-2"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" /> Refazer teste
                </button>
                <Link to="/ebooks" className="flex items-center justify-center text-brand-wine hover:text-brand-wineDark text-sm font-medium px-6 py-2 border border-brand-wine rounded hover:bg-brand-wine hover:text-white transition-colors">
                  Ver outros livros desta categoria
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
