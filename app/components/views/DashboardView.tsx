import React from 'react';
import {
  Wallet,
  Building2,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';
import { Debtor, TabType, Transaction } from '../../types';
import { MONTHLY_STATS } from '../../data/mockData';

interface DashboardViewProps {
  cashUsd: number;
  cashUzs: number;
  setActiveTab: (tab: TabType) => void;
  debtors: Debtor[];
  transactions: Transaction[];
}

export default function DashboardView({
  cashUsd,
  cashUzs,
  setActiveTab,
  debtors,
  transactions,
}: DashboardViewProps) {
  return (
    <main className="p-4 lg:p-8 space-y-6 overflow-y-auto">
      {/* 4 HERO KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Card 1: Kassa */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Joriy Kassa Qoldig‘i
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            ${cashUsd.toLocaleString()} <span className="text-xs font-normal text-slate-500">USD</span>
          </div>
          <div className="text-sm font-bold text-emerald-600 mt-0.5">
            + {(cashUzs / 1000000).toFixed(1)} mln <span className="text-xs font-normal">UZS</span>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>💵 Naqd: $34,200</span>
            <span>🏦 Bank: 165 mln UZS</span>
          </div>
        </div>

        {/* Card 2: Sotuv Holati */}
        <div
          onClick={() => setActiveTab('shaxmatka')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm cursor-pointer hover:border-emerald-500 transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Umumiy Sotuv Holati
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">82 / 120</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              68.3% sotildi
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden flex">
            <div className="bg-rose-500 h-full" style={{ width: '68%' }} title="Sotilgan" />
            <div className="bg-amber-400 h-full" style={{ width: '9%' }} title="Bron" />
            <div className="bg-emerald-500 h-full" style={{ width: '23%' }} title="Bo'sh" />
          </div>
          <div className="mt-3 pt-2 flex items-center justify-between text-[11px] font-medium">
            <span className="text-rose-600">🟥 Sotildi: 82 ta</span>
            <span className="text-amber-600">🟨 Bron: 11 ta</span>
            <span className="text-emerald-600">🟩 Bo‘sh: 27 ta</span>
          </div>
        </div>

        {/* Card 3: Shu oyda kutilayotgan tushum */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Oktabr Rassrochka Rejasi
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">$61,400</span>
            <span className="text-xs text-slate-400">/ $92,000 reja</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: '66.7%' }} />
          </div>
          <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>
              Bajarildi: <strong className="text-indigo-600">66.7%</strong>
            </span>
            <span>
              Kutilmoqda: <strong className="text-slate-700">$30,600</strong>
            </span>
          </div>
        </div>

        {/* Card 4: Muddati o'tgan qarzdorlik */}
        <div
          onClick={() => setActiveTab('rassrochka')}
          className="bg-gradient-to-br from-rose-50 via-white to-rose-50 rounded-2xl p-5 border border-rose-200 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Kechikkan Qarzlar (Prosrochka)
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-600">$12,350</div>
          <div className="text-xs font-medium text-slate-600 mt-1">
            Jami <strong>{debtors.filter((d) => d.status === 'overdue').length} ta mijoz</strong> to‘lovni kechiktirgan
          </div>
          <div className="mt-4 pt-2 border-t border-rose-100 flex items-center justify-between text-xs font-semibold text-rose-600">
            <span>Ro‘yxatni ochish va SMS yuborish</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* CHARTS & PROGRESS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Monthly Cashflow Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Oylar kesimida Sotuv Kirimi vs Qurilish Xarajatlari (2026)
              </h3>
              <p className="text-xs text-slate-500">Ming AQSH dollari ($1,000) hisobida dinamika</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Kassaga kirim
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded-sm bg-slate-300 inline-block" /> Qurilish chiqimi
              </span>
            </div>
          </div>

          {/* Bar Graph Container */}
          <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-6 border-b border-slate-100 pb-2 px-1">
            {MONTHLY_STATS.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end justify-center gap-1 h-44">
                  {/* Income Bar */}
                  <div
                    style={{ height: `${(item.income / 130) * 100}%` }}
                    className="w-3 sm:w-4 bg-emerald-500 rounded-t-md group-hover:bg-emerald-600 transition-all relative"
                    title={`Kirim: $${item.income}k`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-slate-800 text-white px-1.5 py-0.5 rounded pointer-events-none">
                      ${item.income}k
                    </span>
                  </div>
                  {/* Expense Bar */}
                  <div
                    style={{ height: `${(item.expense / 130) * 100}%` }}
                    className="w-3 sm:w-4 bg-slate-300 rounded-t-md group-hover:bg-slate-400 transition-all"
                    title={`Xarajat: $${item.expense}k`}
                  />
                </div>
                <span className="text-[11px] font-medium text-slate-500">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Block Readiness & Sales Progress */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Bloklar bo‘yicha Qurilish va Sotuv
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Har bir domning smeta bajarilishi va sotilgan uylar ulushi
            </p>

            <div className="space-y-5">
              {/* A-Blok */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-sm text-slate-800">🏢 A-Blok (9 qavat)</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Fasad ishlari (85%)
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex justify-between mb-1">
                  <span>Sotildi: 31 / 36 xonadon</span>
                  <span className="font-semibold text-slate-700">86%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '86%' }} />
                </div>
              </div>

              {/* B-Blok */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-sm text-slate-800">🏢 B-Blok (9 qavat)</span>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    G‘isht terish (60%)
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex justify-between mb-1">
                  <span>Sotildi: 24 / 36 xonadon</span>
                  <span className="font-semibold text-slate-700">66%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '66%' }} />
                </div>
              </div>

              {/* C-Blok */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-sm text-slate-800">🏢 C-Blok (12 qavat)</span>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    Kotlovan va Fundament (25%)
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex justify-between mb-1">
                  <span>Sotildi: 27 / 48 xonadon</span>
                  <span className="font-semibold text-slate-700">56%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '56%' }} />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('shaxmatka')}
            className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <span>Shaxmatka oynasiga o‘tish</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RECENT CASHFLOW LOG */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Oxirgi Kassa va Ombor Operatsiyalari (Real-Time)
            </h3>
            <p className="text-xs text-slate-500">
              Har bir kirim va chiqim aniq obyekt hamda javobgar shaxsga bog‘langan
            </p>
          </div>
          <button
            onClick={() => setActiveTab('kassa')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Barcha amallarni ko‘rish</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase text-slate-400 bg-slate-50/50">
                <th className="py-3 px-5">Vaqt</th>
                <th className="py-3 px-5">Amal va Izoh</th>
                <th className="py-3 px-5">Obyekt / Kategoriya</th>
                <th className="py-3 px-5">Mijoz / Kontragent</th>
                <th className="py-3 px-5 text-right">Summa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.slice(0, 5).map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-5 text-xs text-slate-500 whitespace-nowrap">{tx.time}</td>
                  <td className="py-3.5 px-5 font-medium text-slate-800 flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        tx.type === 'in'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {tx.type === 'in' ? (
                        <ArrowDownRight className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </span>
                    <span>{tx.title}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 mr-1.5">
                      {tx.block}
                    </span>
                    <span className="text-xs text-slate-500">{tx.category}</span>
                  </td>
                  <td className="py-3.5 px-5 text-xs font-medium text-slate-700">{tx.clientOrVendor}</td>
                  <td className="py-3.5 px-5 text-right font-bold whitespace-nowrap">
                    {tx.type === 'in' ? (
                      <span className="text-emerald-600">
                        + {tx.amountUsd > 0 ? `$${tx.amountUsd.toLocaleString()}` : `${tx.amountUzs.toLocaleString()} UZS`}
                      </span>
                    ) : (
                      <span className="text-rose-600">
                        - {tx.amountUsd > 0 ? `$${tx.amountUsd.toLocaleString()}` : `${tx.amountUzs.toLocaleString()} UZS`}
                      </span>
                    )}
                    <div className="text-[10px] font-normal text-slate-400">{tx.method}</div>
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

