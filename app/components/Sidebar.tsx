import React from 'react';
import {
  Building2,
  LayoutDashboard,
  Grid,
  Calendar,
  Wallet,
} from 'lucide-react';
import { Debtor, TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  debtors: Debtor[];
}

export default function Sidebar({ activeTab, setActiveTab, debtors }: SidebarProps) {
  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800">
      {/* Brand Logo */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between md:justify-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-base tracking-wide text-white leading-tight">
            BUNYODKOR RESIDENCE
          </h1>
          <p className="text-xs text-emerald-400 font-medium">Construction Web-ERP</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 flex md:flex-col gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'dashboard'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
            }`}
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('shaxmatka')}
          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'shaxmatka'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
            }`}
        >
          <div className="flex items-center gap-3">
            <Grid className="w-5 h-5 shrink-0" />
            <span>Xonadonlar</span>
          </div>
          <span className="hidden md:inline-block text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
            Live
          </span>
        </button>

        <button
          onClick={() => setActiveTab('rassrochka')}
          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'rassrochka'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
            }`}
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 shrink-0" />
            <span>Qarzlar</span>
          </div>
          <span className="hidden md:inline-block text-[11px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
            {debtors.filter((d) => d.status === 'overdue').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('kassa')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'kassa'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
            }`}
        >
          <Wallet className="w-5 h-5 shrink-0" />
          <span>Kassa va Ombor</span>
        </button>
      </nav>

      {/* Sidebar Bottom Info */}
      <div className="mt-auto hidden md:block p-4 border-t border-slate-800 space-y-4">
        <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Ichki Valyuta Kursi:</span>
            <span className="text-emerald-400 font-semibold">Faol</span>
          </div>
          <div className="text-sm font-bold text-white">1 USD = 12,850 UZS</div>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
            B
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-semibold text-white truncate">Bosh Ta’sischi (CEO)</div>
            <div className="text-xs text-slate-400">SuperAdmin ruxsati</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

