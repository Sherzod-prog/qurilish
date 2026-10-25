import React from 'react';
import { Send, X } from 'lucide-react';

interface TelegramModalProps {
  isTelegramModalOpen: boolean;
  setIsTelegramModalOpen: (open: boolean) => void;
  cashUsd: number;
  cashUzs: number;
}

export default function TelegramModal({
  isTelegramModalOpen,
  setIsTelegramModalOpen,
  cashUsd,
  cashUzs,
}: TelegramModalProps) {
  if (!isTelegramModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl text-white">
        {/* Telegram Header */}
        <div className="bg-sky-600 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Navro‘z ERP — Rahbar Boti</h4>
              <p className="text-[11px] text-sky-100">bot • har kuni soat 20:00 da</p>
            </div>
          </div>
          <button
            onClick={() => setIsTelegramModalOpen(false)}
            className="text-white/80 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="p-5 bg-[#0f172a] space-y-4 max-h-[75vh] overflow-y-auto font-sans">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm p-4 text-xs space-y-2.5 leading-relaxed shadow">
            <div className="font-bold text-emerald-400 text-sm">
              📊 KUNLIK SVODKA — 25.10.2026 (20:00)
            </div>
            <p className="text-slate-300">
              Assalomu alaykum! Bugungi kompaniya bo‘yicha moliyaviy va qurilish hisoboti:
            </p>

            <div className="p-2.5 rounded-xl bg-slate-900/90 space-y-1">
              <div className="font-bold text-white">💵 KASSA AYLANMASI:</div>
              <div className="text-emerald-400">➕ Bugungi kirim: +$11,960 USD</div>
              <div className="text-rose-400">➖ Bugungi chiqim: -$11,200 USD va -18.0 mln UZS</div>
              <div className="pt-1 border-t border-slate-800 text-slate-200 font-semibold">
                🏦 Joriy Kassa Qoldig‘i: ${cashUsd.toLocaleString()} va {(cashUzs / 1000000).toFixed(1)} mln so‘m
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 space-y-1">
              <div className="font-bold text-white">🏢 SOTUV BO‘LIMI:</div>
              <div>✅ Sotildi: 1 ta xonadon (A-Blok, #34)</div>
              <div>🟨 Yangi bron: 2 ta xonadon</div>
              <div>📦 Jami bo‘sh qolgan uylar: 27 ta</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 space-y-1">
              <div className="font-bold text-white">🧱 OMBOR VA QURILISH:</div>
              <div>🚛 Kirim: Armatura 15 tonna (B-Blok uchun)</div>
              <div className="text-amber-400">⚠️ Diqqat: Sement M-400 omborda 180 qop qoldi!</div>
            </div>

            <div className="text-[10px] text-slate-400 text-right pt-1">20:00 ✓✓</div>
          </div>

          <button
            onClick={() => setIsTelegramModalOpen(false)}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition"
          >
            Tushunarli, oynani yopish
          </button>
        </div>
      </div>
    </div>
  );
}

