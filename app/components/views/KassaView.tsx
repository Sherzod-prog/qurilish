import React from 'react';
import {
  Plus,
  Minus,
  Package,
  HardHat,
} from 'lucide-react';
import { KassaType, Transaction } from '../../types';
import { INITIAL_WAREHOUSE } from '../../data/mockData';

interface KassaViewProps {
  setKassaType: (type: KassaType) => void;
  setIsKassaModalOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
  transactions: Transaction[];
}

export default function KassaView({
  setKassaType,
  setIsKassaModalOpen,
  showToast,
  transactions,
}: KassaViewProps) {
  return (
    <main className="p-4 lg:p-8 space-y-6 overflow-y-auto">
      {/* Quick Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Moliya Kassasi va Qurilish Materiallari Ombori
          </h3>
          <p className="text-xs text-slate-500">
            Prorablar zayavkasi, ta’minotchilar akt-sverkasi va obyektlar kesimida xarajatlar
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setKassaType('in');
              setIsKassaModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Kassaga Kirim (Приход)</span>
          </button>
          <button
            onClick={() => {
              setKassaType('out');
              setIsKassaModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Minus className="w-4 h-4" />
            <span>Kassadan Chiqim (Расход)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Warehouse Stock Cards */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
              <Package className="w-4 h-4 text-emerald-600" />
              <span>Asosiy Qurilish Ombori Qoldig‘i</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">Smeta nazorati</span>
          </div>

          <div className="space-y-3">
            {INITIAL_WAREHOUSE.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-slate-800">{item.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Oxirgi xarid narxi: {item.lastPrice}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-extrabold ${
                      item.status === 'low' ? 'text-rose-600' : 'text-slate-900'
                    }`}
                  >
                    {item.stock.toLocaleString()} {item.unit}
                  </div>
                  {item.status === 'low' && (
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                      Kam qoldi!
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Prorab Mobile Request Demo Box */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <HardHat className="w-4 h-4 text-amber-600" />
                Prorab Jasurdan yangi Zayavka!
              </span>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                B-Blok, 7-qavat
              </span>
            </div>
            <p className="text-xs text-amber-800">
              &quot;Ertaga ertalab suvoqchilar brigadasiga <strong>120 qop Sement M-400</strong> kerak bo‘ladi.&quot;
            </p>
            <button
              onClick={() =>
                showToast('Prorab Jasurning 120 qop sement zayavkasi tasdiqlandi va omborchiga yuborildi!')
              }
              className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition"
            >
              ✅ Zayavkani Tasdiqlash (Ombordan chiqim)
            </button>
          </div>
        </div>

        {/* Full Transactions History */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h4 className="font-bold text-sm text-slate-800">Barcha Kassa Kirim-Chiqim Jurnali</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase text-slate-400 bg-slate-50">
                  <th className="py-3 px-4">Vaqt</th>
                  <th className="py-3 px-4">Izoh</th>
                  <th className="py-3 px-4">Obyekt</th>
                  <th className="py-3 px-4">Kontragent</th>
                  <th className="py-3 px-4 text-right">Summa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 text-slate-500">{tx.time}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{tx.title}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                        {tx.block}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{tx.clientOrVendor}</td>
                    <td className="py-3.5 px-4 text-right font-bold">
                      {tx.type === 'in' ? (
                        <span className="text-emerald-600">
                          + {tx.amountUsd > 0 ? `$${tx.amountUsd.toLocaleString()}` : `${tx.amountUzs.toLocaleString()} UZS`}
                        </span>
                      ) : (
                        <span className="text-rose-600">
                          - {tx.amountUsd > 0 ? `$${tx.amountUsd.toLocaleString()}` : `${tx.amountUzs.toLocaleString()} UZS`}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

