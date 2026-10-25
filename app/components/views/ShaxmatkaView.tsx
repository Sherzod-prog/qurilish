import React from 'react';
import {
  User,
  Calculator,
  Clock,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { Apartment, CalcStats, FloorGroup } from '../../types';
import { EXCHANGE_RATE } from '../../data/mockData';

interface ShaxmatkaViewProps {
  selectedBlock: string;
  setSelectedBlock: (block: string) => void;
  selectedRooms: string;
  setSelectedRooms: (rooms: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  floorsList: FloorGroup[];
  activeApartment: Apartment | undefined;
  setActiveApartment: (apt: Apartment) => void;
  setNewClientName: (name: string) => void;
  setNewClientPhone: (phone: string) => void;
  calcStats: CalcStats | null;
  discountPercent: number;
  setDiscountPercent: (val: number) => void;
  initialPayment: number;
  setInitialPayment: (val: number) => void;
  installmentMonths: number;
  setInstallmentMonths: (val: number) => void;
  newClientName: string;
  newClientPhone: string;
  handleStatusUpdate: (newStatus: string) => void;
  setIsContractModalOpen: (open: boolean) => void;
}

export default function ShaxmatkaView({
  selectedBlock,
  setSelectedBlock,
  selectedRooms,
  setSelectedRooms,
  selectedStatus,
  setSelectedStatus,
  floorsList,
  activeApartment,
  setActiveApartment,
  setNewClientName,
  setNewClientPhone,
  calcStats,
  discountPercent,
  setDiscountPercent,
  initialPayment,
  setInitialPayment,
  installmentMonths,
  setInstallmentMonths,
  newClientName,
  newClientPhone,
  handleStatusUpdate,
  setIsContractModalOpen,
}: ShaxmatkaViewProps) {
  return (
    <main className="flex-1 flex flex-col xl:flex-row overflow-hidden">
      {/* Left Side: Building Grid */}
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-5">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
          {/* Block Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {['A-Blok', 'B-Blok'].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBlock(b)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedBlock === b
                    ? 'bg-slate-900 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🏢 {b}
              </button>
            ))}
          </div>

          {/* Room Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-400 mr-1">Xonalar:</span>
            {['all', '1', '2', '3', '4'].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRooms(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  selectedRooms === r
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {r === 'all' ? 'Barchasi' : `${r} xona`}
              </button>
            ))}
          </div>

          {/* Status Legend & Filter */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setSelectedStatus(selectedStatus === 'free' ? 'all' : 'free')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition ${
                selectedStatus === 'free'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Bo‘sh
            </button>
            <button
              onClick={() => setSelectedStatus(selectedStatus === 'reserved' ? 'all' : 'reserved')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition ${
                selectedStatus === 'reserved'
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Bron
            </button>
            <button
              onClick={() => setSelectedStatus(selectedStatus === 'sold' ? 'all' : 'sold')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition ${
                selectedStatus === 'sold'
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Sotilgan
            </button>
          </div>
        </div>

        {/* Shaxmatka Floors Matrix */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {selectedBlock} — Qavatlar va Xonadonlar Xaritasi (Ustiga bosing)
            </span>
            <span className="text-xs text-slate-500">
              1 m² o‘rtacha narxi: <strong>$700 – $780</strong>
            </span>
          </div>

          {floorsList.map(({ floor, items }) => (
            <div
              key={floor}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 py-1.5 border-b border-slate-100 last:border-none"
            >
              {/* Floor Number Badge */}
              <div className="w-20 shrink-0 flex sm:flex-col items-center justify-center bg-slate-100 rounded-xl py-2 px-3 text-center">
                <span className="text-sm font-extrabold text-slate-800">{floor}</span>
                <span className="text-[10px] uppercase text-slate-400 font-semibold ml-1 sm:ml-0">qavat</span>
              </div>

              {/* Apartment Cards Row */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {items.map((apt) => {
                  const totalUsd = Math.round(apt.area * apt.pricePerSqm);
                  const isSelected = activeApartment?.id === apt.id;

                  let cardStyle = 'bg-emerald-50/70 border-emerald-300 hover:bg-emerald-100/80 text-emerald-950';
                  let badgeStyle = 'bg-emerald-600 text-white';
                  let statusLabel = 'Bo‘sh';

                  if (apt.status === 'reserved') {
                    cardStyle = 'bg-amber-50/80 border-amber-300 hover:bg-amber-100/80 text-amber-950';
                    badgeStyle = 'bg-amber-500 text-white';
                    statusLabel = `Bron: ${apt.reserveDate}`;
                  } else if (apt.status === 'sold') {
                    cardStyle = 'bg-rose-50/80 border-rose-300 hover:bg-rose-100/70 text-rose-950';
                    badgeStyle = 'bg-rose-600 text-white';
                    statusLabel = `Sotilgan (${apt.paidPercent}%)`;
                  }

                  return (
                    <div
                      key={apt.id}
                      onClick={() => {
                        setActiveApartment(apt);
                        setNewClientName(apt.client || '');
                        setNewClientPhone(apt.phone || '+998 90 ');
                      }}
                      className={`p-3 rounded-xl border-2 transition cursor-pointer relative ${cardStyle} ${
                        isSelected ? 'ring-4 ring-slate-900/20 border-slate-900 scale-[1.02]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-extrabold text-sm">№ {apt.number}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeStyle}`}>
                          {statusLabel}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs font-semibold opacity-85">
                        <span>{apt.rooms} xona</span>
                        <span>{apt.area} m²</span>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-black/10 flex items-center justify-between">
                        <span className="font-extrabold text-sm">${totalUsd.toLocaleString()}</span>
                        <span className="text-[10px] opacity-75">${apt.pricePerSqm}/m²</span>
                      </div>

                      {apt.client && (
                        <div className="mt-1 text-[11px] font-medium truncate opacity-90 flex items-center gap-1">
                          <User className="w-3 h-3 shrink-0" />
                          <span className="truncate">{apt.client}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Slide-Over Panel: Apartment Passport & Live Calculator */}
      {activeApartment && calcStats && (
        <div className="w-full xl:w-[430px] bg-white border-t xl:border-t-0 xl:border-l border-slate-200 p-5 overflow-y-auto shrink-0 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Top Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white text-xs font-bold">
                    {activeApartment.block}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                      activeApartment.status === 'free'
                        ? 'bg-emerald-100 text-emerald-700'
                        : activeApartment.status === 'reserved'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {activeApartment.status === 'free'
                      ? 'Sotuvda bo‘sh'
                      : activeApartment.status === 'reserved'
                        ? 'Vaqtincha Bron'
                        : 'Sotilgan xonadon'}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1.5">
                  Xonadon №{activeApartment.number} ({activeApartment.rooms} xonali)
                </h3>
                <p className="text-xs text-slate-500">
                  {activeApartment.floor}-qavat • Umumiy maydon: <strong>{activeApartment.area} m²</strong> • Narx: <strong>${activeApartment.pricePerSqm}/m²</strong>
                </p>
              </div>
            </div>

            {/* Schematic Floor Plan Preview */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center justify-between gap-4">
              <div className="w-24 h-20 rounded-lg bg-white border border-slate-300 p-1.5 flex flex-col justify-between text-[9px] text-slate-400 font-mono">
                <div className="flex gap-1 h-1/2">
                  <div className="flex-1 border border-slate-200 flex items-center justify-center bg-emerald-50/40 text-slate-600">
                    Zal 24m²
                  </div>
                  <div className="w-8 border border-slate-200 flex items-center justify-center">
                    Oshxona
                  </div>
                </div>
                <div className="flex gap-1 h-1/2 mt-1">
                  <div className="flex-1 border border-slate-200 flex items-center justify-center">
                    Yotoq 16m²
                  </div>
                  <div className="w-6 border border-slate-200 flex items-center justify-center">
                    Xoll
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-xs font-bold text-slate-700">2D Planirovka sxemasi</div>
                <p className="text-[11px] text-slate-500">
                  Balkon +2.4 m² bonus sifatida qo‘shib beriladi. Karobka holatida topshiriladi.
                </p>
                <div className="text-xs font-extrabold text-slate-900 pt-1">
                  Boshlang‘ich narx: ${calcStats.baseTotal.toLocaleString()}
                </div>
              </div>
            </div>

            {/* LIVE RASSROCHKA CALCULATOR */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                  <Calculator className="w-4 h-4" />
                  <span>Tezkor Rassrochka Kalkulyatori</span>
                </div>
                <span className="text-[11px] text-slate-400">1$ = {EXCHANGE_RATE.toLocaleString()} UZS</span>
              </div>

              {/* Discount Slider */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">
                    Chegirma (Skidka): <strong className="text-emerald-400">{discountPercent}%</strong>
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    -${calcStats.discountAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
                />
              </div>

              {/* Initial Payment Input */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Boshlang‘ich to‘lov (USD)
                  </label>
                  <input
                    type="number"
                    value={initialPayment}
                    onChange={(e) => setInitialPayment(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Bo‘lib to‘lash muddati
                  </label>
                  <select
                    value={installmentMonths}
                    onChange={(e) => setInstallmentMonths(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value={12}>12 oy (1 yil)</option>
                    <option value={18}>18 oy (1.5 yil)</option>
                    <option value={24}>24 oy (2 yil)</option>
                    <option value={36}>36 oy (3 yil)</option>
                  </select>
                </div>
              </div>

              {/* Calculated Summary Box */}
              <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700/80 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Shartnoma yakuniy summasi:</span>
                  <span className="font-bold text-white">${calcStats.finalTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Qolgan qarz ({installmentMonths} oyga):</span>
                  <span className="font-bold text-amber-400">${calcStats.remaining.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-emerald-400">Har oylik to‘lov:</span>
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-emerald-400">
                      ${calcStats.monthlyUsd.toLocaleString()} <span className="text-xs font-normal">/ oy</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      ≈ {calcStats.monthlyUzs.toLocaleString()} UZS
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Schedule Table Preview */}
              <div>
                <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                  Avtomatik To‘lov Grafigi (Dastlabki oylar):
                </div>
                <div className="max-h-28 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/60 divide-y divide-slate-800/80 text-[11px]">
                  {calcStats.schedule.map((row) => (
                    <div key={row.monthNum} className="px-3 py-1.5 flex justify-between items-center">
                      <span className="text-slate-400">
                        {row.monthNum}-oy • {row.date}
                      </span>
                      <span className="font-bold text-slate-200">${row.usd.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Client Information Input for Action */}
            <div className="space-y-2.5 pt-1">
              <label className="block text-xs font-bold text-slate-700">
                Mijoz F.I.Sh va Telefon raqami (Shartnoma uchun):
              </label>
              <input
                type="text"
                placeholder="Masalan: Toshmatov Bekzod"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="+998 90 123-45-67"
                value={newClientPhone}
                onChange={(e) => setNewClientPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleStatusUpdate('reserved')}
                className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <Clock className="w-4 h-4" />
                <span>Bron Qilish</span>
              </button>
              <button
                onClick={() => handleStatusUpdate('sold')}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sotish va Kassaga</span>
              </button>
            </div>

            <button
              onClick={() => setIsContractModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow transition"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Tayyor Shartnoma va Grafikni (.DOCX / PDF) Chiqarish</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

