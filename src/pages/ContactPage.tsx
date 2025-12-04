import React from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica real de envio (ex: API, EmailJS)
    alert('Mensagem enviada com sucesso! (Simulação)');
  };

  return (
    <div className="pt-12 pb-12 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Fale Conosco</h1>
          <p className="text-gray-400">
            Tem alguma dúvida ou proposta? Entre em contato com a nossa equipe.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Input de Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Seu Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>

            {/* Input de Mensagem */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Mensagem
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                </div>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                  placeholder="Escreva sua mensagem aqui..."
                />
              </div>
            </div>

            {/* Botão de Enviar */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              ENVIAR MENSAGEM
              <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;