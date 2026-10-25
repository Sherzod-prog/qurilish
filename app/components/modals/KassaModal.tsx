import React from 'react';
import { X } from 'lucide-react';
import { KassaType } from '../../types';

interface KassaModalProps {
  isKassaModalOpen: boolean;
  setIsKassaModalOpen: (open: boolean) => void;
  kassaType: KassaType;
  setKassaType: (type: KassaType) => void;
  txBlock: string;
  setTxBlock: (val: string) => void;
  txCategory: string;
  setTxCategory: (val: string) => void;
  txTitle: string;
  setTxTitle: (val: string) => void;
  txVendor: string;
  setTxVendor: (val: string) => void;
  txCurrency: string;
  setTxCurrency: (val: string) => void;
  txAmount: string;
  setTxAmount: (val: string) => void;
  handleAddTransaction: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function KassaModal({
  isKassaModalOpen,
  setIsKassaModalOpen,
  kassaType,
  setKassaType,
  txBlock,
  setTxBlock,
  txCategory,
  setTxCategory,
  txTitle,
  setTxTitle,
  txVendor,
  setTxVendor,
  txCurrency,
  setTxCurrency,
  txAmount,
  setTxAmount,
  handleAddTransaction,
}: KassaModalProps) {
  if (!isKassaModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <h4 className="font-bold text-sm">
            {kassaType === 'in' ? '➕ Kassaga Kirim Qilish' : '➖ Kassadan Chiqim (Xarajat)'}
          </h4>
          <button onClick={() => setIsKassaModalOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAddTransaction} className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setKassaType('in')}
              className={`py-2 rounded-lg font-bold transition ${
                kassaType === 'in' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600'
              }`}
            >
              ➕ Kirim (Приход)
            </button>
            <button
              type="button"
              onClick={() => setKassaType('out')}
              className={`py-2 rounded-lg font-bold transition ${
                kassaType === 'out' ? 'bg-rose-600 text-white shadow' : 'text-slate-600'
              }`}
            >
              ➖ Chiqim (Расход)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Qaysi Obyektga?</label>
              <select
                value={txBlock}
                onChange={(e) => setTxBlock(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
              >
                <option value="A-Blok">🏢 A-Blok</option>
                <option value="B-Blok">🏢 B-Blok</option>
                <option value="C-Blok">🏢 C-Blok</option>
                <option value="Ofis">💼 Asosiy Ofis</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategoriya (Modda)</label>
              <select
                value={txCategory}
                onChange={(e) => setTxCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
              >
                <option value="Qurilish materiallari">🧱 Sement / Armatura / G‘isht</option>
                <option value="Ustalar (Forma-2)">👷‍♂️ Ustalar va Brigada haqi</option>
                <option value="Texnika ijarasi">🚜 Kran va Ekskavator</option>
                <option value="Sotuv / Rassrochka">💰 Xonadon sotuvi</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Amal mazmuni / Izoh</label>
            <input
              type="text"
              required
              placeholder="Masalan: 20 tonna Sement M-400 xaridi"
              value={txTitle}
              onChange={(e) => setTxTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Kimga berildi / Kimdan olindi?</label>
            <input
              type="text"
              placeholder="Masalan: Prorab Jasur yoki 'StroySnab' MChJ"
              value={txVendor}
              onChange={(e) => setTxVendor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Valyuta</label>
              <select
                value={txCurrency}
                onChange={(e) => setTxCurrency(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
              >
                <option value="USD">USD ($)</option>
                <option value="UZS">UZS (So‘m)</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Summa</label>
              <input
                type="number"
                required
                placeholder="5000"
                value={txAmount}
                onChange={(e) => setTxAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-white font-bold shadow transition ${
              kassaType === 'in' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
            }`}
          >
            Tasdiqlash va Kassaga Yozish
          </button>
        </form>
      </div>
    </div>
  );
}

