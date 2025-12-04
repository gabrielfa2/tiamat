import React from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, Target, ChevronRight } from 'lucide-react';

const RecruitmentPage = () => {
  return (
    <div className="pt-12 pb-12 min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">

        {/* Ícone de Destaque */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-purple-600 blur-2xl opacity-20 rounded-full"></div>
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 w-24 h-24 rounded-2xl border border-slate-700 flex items-center justify-center mx-auto shadow-xl">
            <UserPlus className="h-10 w-10 text-purple-500" />
          </div>
          <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-2 border-4 border-slate-900">
            <Search className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Títulos e Textos */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          ROSTER <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">INCOMPLETE</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Atualmente não temos uma equipe ativa para esta modalidade.
          No entanto, a Tiamat está sempre em busca de novos talentos para expandir nosso domínio.
        </p>

        {/* Card de Aviso */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-10 max-w-xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <Target className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="text-left">
              <h3 className="text-white font-bold mb-1">Estamos Recrutando!</h3>
              <p className="text-gray-400 text-sm">
                Se você é um jogador de alto nível ou representa uma equipe completa buscando uma organização, queremos ouvir você.
              </p>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/about/contact"
            className="group bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-900/20"
          >
            APLICAR PARA A VAGA
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/games"
            className="text-gray-400 hover:text-white font-semibold py-4 px-8 transition-colors"
          >
            Voltar para Jogos
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RecruitmentPage;