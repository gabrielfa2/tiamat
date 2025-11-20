import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface EsportsTeam {
  id: string;
  name: string;
  logo_url: string;
  rank: number;
  region: string;
  points: number;
  wins: number;
  losses: number;
  win_rate: number;
  game_type: string;
  achievements: string[];
}

export interface EsportsHighlight {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  duration: number;
  game_type: string;
  views: number;
  featured: boolean;
  upload_date: string;
}

export interface EsportsMatch {
  id: string;
  match_date: string;
  opponent_name: string;
  result: 'win' | 'loss' | 'draw';
  score_team: number;
  score_opponent: number;
  game_type: string;
  tournament_name: string;
}

export interface PlayerStats {
  id: string;
  match_id: string;
  player_name: string;
  character_agent: string;
  kills: number;
  deaths: number;
  assists: number;
  kd_ratio: number;
  damage_dealt: number;
  accuracy: number;
  headshot_percentage: number;
}
