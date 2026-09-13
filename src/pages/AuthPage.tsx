import React, { useState } from 'react';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AuthPage: React.FC = () => {
  const { user, login, register, navigate, showToast } = useShop();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (user) {
    navigate('dashboard');
    return null;
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'warning');
      return;
    }
    const res = login(email, password);
    if (res.success) {
      showToast('Welcome back to AmritVana!', 'success');
      navigate('dashboard');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !phone) {
      showToast('Please fill in all registration fields', 'warning');
      return;
    }
    const res = register(name, email, password, phone);
    if (res.success) {
      showToast('Account created successfully! Welcome to the VIP Circle 🎉', 'success');
      navigate('dashboard');
    }
  };

  const handleQuickDemoLogin = () => {
    login('arjun.sharma@example.com', 'password123');
    showToast('Logged in as Demo Patron: Arjun Sharma', 'success');
    navigate('dashboard');
  };

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-12 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-6 sm:p-10 border border-[#EEDCC6] shadow-xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#2D4628] text-[#FDE68A] flex items-center justify-center font-serif text-2xl font-bold mx-auto">
            अ
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#2D4628]">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-xs text-stone-600">
            {mode === 'login' 
              ? 'Access your orders, saved addresses and Amrit Coins' 
              : 'Join the AmritVana VIP Circle for exclusive harvests & discounts'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#FAF5EE] p-1 rounded-full border border-[#EEDCC6]">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
              mode === 'login' ? 'bg-[#2D4628] text-white shadow-xs' : 'text-[#2D4628] hover:text-stone-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${
              mode === 'register' ? 'bg-[#2D4628] text-white shadow-xs' : 'text-[#2D4628] hover:text-stone-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2D4628] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arjun.sharma@example.com"
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#2D4628]">Password</label>
                <button type="button" onClick={() => showToast('Password reset link sent to your email', 'info')} className="text-[11px] text-[#D97706] hover:underline">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
            >
              Sign In to Account <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#2D4628] mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun Sharma"
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D4628] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arjun@example.com"
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D4628] mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input 
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden font-mono text-[#2D4628]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D4628] mb-1">Create Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2 mt-2"
            >
              Create VIP Account <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 1-Click Quick Demo Login Pill */}
        <div className="pt-2 border-t border-[#EEDCC6]/50 text-center">
          <button
            onClick={handleQuickDemoLogin}
            type="button"
            className="w-full py-2.5 bg-[#FAF5EE] hover:bg-[#F5EFE7] text-[#2D4628] border border-[#EEDCC6] rounded-full text-xs font-bold transition-colors"
          >
            ⚡ 1-Click Quick Demo Sign In
          </button>
        </div>

      </div>
    </div>
  );
};
