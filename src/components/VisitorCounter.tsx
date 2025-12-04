import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const updateCounter = async () => {
      const hasCounted = sessionStorage.getItem('tiamat_visit_counted');

      if (!hasCounted) {
        // Se é a primeira visita na sessão, incrementa no banco
        const { data, error } = await supabase.rpc('increment_visitor_count');
        
        if (!error && data !== null) {
          setCount(data);
          sessionStorage.setItem('tiamat_visit_counted', 'true');
        }
      } else {
        // Se já contou, apenas busca o valor atual sem incrementar
        const { data, error } = await supabase
          .from('site_stats')
          .select('count')
          .eq('id', 'total_visits')
          .single();

        if (!error && data) {
          setCount(data.count);
        }
      }
    };

    updateCounter();
  }, []);

  if (count === null) return null; // Não mostra nada enquanto carrega

  return (
    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
      <Eye className="w-3 h-3 text-purple-500" />
      <span>
        <span className="text-white">{count.toLocaleString()}</span> VIEWS
      </span>
    </div>
  );
};

export default VisitorCounter;
