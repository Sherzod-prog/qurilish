import React from 'react';
import { Plus, Send } from 'lucide-react';
import { KassaType, TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setKassaType: (type: KassaType) => void;
  setIsKassaModalOpen: (open: boolean) => void;
  setIsTelegramModalOpen: (open: boolean) => void;
}

export default function Header({
  activeTab,
  setKassaType,
  setIsKassaModalOpen,
  setIsTelegramModalOpen,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
      <div>
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          {activeTab === 'dashboard' && '📊 Rahbar Paneli (CEO Real-Time Svodka)'}
          {activeTab === 'shaxmatka' && '🏢 Turar-joy Majmuasi Interaktiv Shaxmatkasi'}
          {activeTab === 'rassrochka' && '💰 Rassrochka To‘lovlari va Qarzdorlar Monitoringi'}
          {activeTab === 'kassa' && '🧱 Kassa Amallari va Qurilish Ombori Nazorati'}
        </h2>
        <p className="text-xs text-slate-500">
          Sana: 25-Oktabr, 2026-yil • Barcha filiallar va sotuv bo‘limi sinxronlangan
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Quick Kassa Action */}
        <button
          onClick={() => {
            setKassaType('out');
            setIsKassaModalOpen(true);
          }}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4 text-emerald-600" />
          <span>Tezkor Kassa</span>
        </button>

        {/* Telegram Bot Demo Button */}
        <button
          onClick={() => setIsTelegramModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-sky-500/20 transition"
        >
          <Send className="w-4 h-4" />
          <span>📲 Telegram Kunlik Hisobot (Demo)</span>
        </button>
      </div>
    </header>
  );
}

