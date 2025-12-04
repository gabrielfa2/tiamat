import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { User, Mail, Calendar, Edit2, Save, X } from 'lucide-react';

interface UserProfile {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    created_at: string;
}

const ProfilePage = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [fullName, setFullName] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', user!.id)
                .single();

            if (error) throw error;

            setProfile(data);
            setFullName(data.full_name || '');
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            setSaving(true);
            setMessage(null);

            const updates = {
                id: user!.id,
                full_name: fullName,
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase
                .from('user_profiles')
                .upsert(updates);

            if (error) throw error;

            setProfile(prev => prev ? { ...prev, full_name: fullName } : null);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setEditing(false);
        } catch (error) {
            setMessage({ type: 'error', text: 'Error updating profile' });
            console.error('Error updating profile:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 pt-12 pb-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
                    {/* Header Background */}
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                        <div className="absolute -bottom-12 left-8">
                            <div className="h-24 w-24 rounded-full bg-slate-800 p-1">
                                {profile?.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt="Profile"
                                        className="h-full w-full rounded-full object-cover border-2 border-white"
                                    />
                                ) : (
                                    <div className="h-full w-full rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold border-2 border-white">
                                        {user?.email?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-16 px-8 pb-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-1">
                                    {profile?.full_name || 'User'}
                                </h1>
                                <p className="text-slate-400 flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {user?.email}
                                </p>
                            </div>
                            <button
                                onClick={() => editing ? setEditing(false) : setEditing(true)}
                                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                {editing ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                                {editing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        {message && (
                            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="grid gap-6">
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-400" />
                                    Personal Information
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">
                                            Full Name
                                        </label>
                                        {editing ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                                    placeholder="Enter your full name"
                                                />
                                                <button
                                                    onClick={handleUpdateProfile}
                                                    disabled={saving}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Save className="h-4 w-4" />
                                                    {saving ? 'Saving...' : 'Save'}
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-white text-lg">{profile?.full_name || 'Not set'}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-purple-400" />
                                    Account Details
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">
                                            Member Since
                                        </label>
                                        <p className="text-white">
                                            {new Date(user?.created_at || '').toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">
                                            Last Sign In
                                        </label>
                                        <p className="text-white">
                                            {new Date(user?.last_sign_in_at || '').toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
