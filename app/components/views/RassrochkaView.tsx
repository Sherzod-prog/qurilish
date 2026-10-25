import React from 'react';
import {
  AlertTriangle,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { Debtor } from '../../types';
import { EXCHANGE_RATE } from '../../data/mockData';

interface RassrochkaViewProps {
  debtors: Debtor[];
  showToast: (msg: string) => void;
  handlePayDebtor: (debtor: Debtor) => void;
}

export default function RassrochkaView({
  debtors,
  showToast,
  handlePayDebtor,
}: RassrochkaViewProps) {
  return (
    <main className="p-4 lg:p-8 space-y-6 overflow-y-auto">
      {/* Top Summary Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Avtomatik Qarzdorlik Monitoringi va SMS-Eslatma Tizimi
            </h3>
            <p className="text-xs text-slate-500">
              To‘lov muddati yaqinlashganda (3 kun oldin) va o‘tib ketganda mijozga avtomatik SMS boradi
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            showToast('Barcha kechikkan 4 ta mijozga Eskiz.uz orqali rasmiy SMS eslatma yuborildi!')
          }
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Barcha qarzdorlarga ommaviy SMS yuborish</span>
        </button>
      </div>

      {/* Debtors Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase text-slate-400 bg-slate-50">
                <th className="py-3.5 px-5">Mijoz F.I.Sh</th>
                <th className="py-3.5 px-5">Xonadon</th>
                <th className="py-3.5 px-5">Shartnoma / To‘landi</th>
                <th className="py-3.5 px-5">Oylik To‘lov</th>
                <th className="py-3.5 px-5">To‘lov Sanasi va Holat</th>
                <th className="py-3.5 px-5 text-right">Tezkor Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {debtors.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/90 transition">
                  <td className="py-4 px-5">
                    <div className="font-bold text-slate-800">{d.client}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" /> {d.phone}
                    </div>
                  </td>
                  <td className="py-4 px-5 font-semibold text-slate-700">{d.apt}</td>
                  <td className="py-4 px-5">
                    <div className="text-xs text-slate-500">
                      Jami: <strong className="text-slate-800">${d.totalContract.toLocaleString()}</strong>
                    </div>
                    <div className="text-xs text-emerald-600 font-semibold">
                      To‘landi: ${d.paid.toLocaleString()} ({Math.round((d.paid / d.totalContract) * 100)}%)
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-extrabold text-slate-900">${d.monthlyDue.toLocaleString()}</div>
                    <div className="text-[11px] text-slate-400">
                      ≈ {(d.monthlyDue * EXCHANGE_RATE).toLocaleString()} UZS
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-xs font-medium text-slate-700 mb-1">Sana: {d.dueDate}</div>
                    {d.status === 'overdue' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700">
                        🔥 {d.overdueDays} kun kechikkan
                      </span>
                    )}
                    {d.status === 'upcoming' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700">
                        ⏳ Yaqinlashmoqda
                      </span>
                    )}
                    {d.status === 'paid_today' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                        ✅ To‘langan
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() =>
                        showToast(`${d.client} (${d.phone}) raqamiga eslatma SMS yuborildi!`)
                      }
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 transition"
                    >
                      💬 SMS
                    </button>
                    {d.status !== 'paid_today' && (
                      <button
                        onClick={() => handlePayDebtor(d)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                      >
                        💰 To‘lov qabul qilish
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

