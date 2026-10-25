import React from 'react';
import { FileText, X, Download } from 'lucide-react';
import { Apartment, CalcStats } from '../../types';

interface ContractModalProps {
  isContractModalOpen: boolean;
  setIsContractModalOpen: (open: boolean) => void;
  activeApartment: Apartment | undefined;
  calcStats: CalcStats | null;
  newClientName: string;
  newClientPhone: string;
  discountPercent: number;
  initialPayment: number;
  installmentMonths: number;
  showToast: (msg: string) => void;
}

export default function ContractModal({
  isContractModalOpen,
  setIsContractModalOpen,
  activeApartment,
  calcStats,
  newClientName,
  newClientPhone,
  discountPercent,
  initialPayment,
  installmentMonths,
  showToast,
}: ContractModalProps) {
  if (!isContractModalOpen || !activeApartment || !calcStats) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-sm">
              Avtomatik Shartnoma Generatsiyasi (Word / PDF Shablon)
            </h4>
          </div>
          <button onClick={() => setIsContractModalOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed bg-slate-50">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 font-serif">
            <div className="text-center border-b border-slate-200 pb-3">
              <h2 className="font-bold text-base text-slate-900 uppercase">
                ULUSH KIRITISH ASOSIDA QURILISH SHARTNOMASI № BR-{activeApartment.number}/2026
              </h2>
              <p className="text-[11px] text-slate-500">Chelak sh. • 25.10.2026 yil</p>
            </div>

            <p>
              <strong>&quot;BUNYODKOR RESIDENCE&quot; MChJ</strong> (keyingi o‘rinlarda «Quruvchi») bir tomondan va fuqaro{' '}
              <strong className="underline">{newClientName || '_______________________'}</strong> (Tel:{' '}
              {newClientPhone}) ikkinchi tomondan quyidagilar haqida ushbu shartnomani tuzdilar:
            </p>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1 font-sans">
              <div>
                <strong>1. Shartnoma predmeti:</strong> {activeApartment.block}, {activeApartment.floor}-qavat,{' '}
                <strong>№{activeApartment.number}-xonadon</strong> ({activeApartment.rooms} xonali, {activeApartment.area} m²).
              </div>
              <div>
                <strong>2. Umumiy shartnoma qiymati ({discountPercent}% chegirma bilan):</strong>{' '}
                <span className="text-emerald-700 font-bold">${calcStats.finalTotal.toLocaleString()} AQSH dollari</span>
              </div>
              <div>
                <strong>3. Boshlang‘ich badal:</strong> ${initialPayment.toLocaleString()} USD
              </div>
              <div>
                <strong>4. Bo‘lib to‘lash (Rassrochka) muddati:</strong> {installmentMonths} oy (har oy{' '}
                <strong>${calcStats.monthlyUsd.toLocaleString()} USD</strong> dan).
              </div>
            </div>

            <div>
              <div className="font-bold mb-1 font-sans">1-ILOVA: TO‘LOVLAR GRAFIGI</div>
              <table className="w-full border-collapse border border-slate-300 text-[11px] font-sans">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-1.5">Oy №</th>
                    <th className="border border-slate-300 p-1.5">To‘lov sanasi</th>
                    <th className="border border-slate-300 p-1.5">Summa (USD)</th>
                    <th className="border border-slate-300 p-1.5">Summa (UZS ekvivalenti)</th>
                  </tr>
                </thead>
                <tbody>
                  {calcStats.schedule.map((r) => (
                    <tr key={r.monthNum}>
                      <td className="border border-slate-300 p-1.5 text-center">{r.monthNum}-oy</td>
                      <td className="border border-slate-300 p-1.5 text-center">{r.date}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-bold">${r.usd.toLocaleString()}</td>
                      <td className="border border-slate-300 p-1.5 text-right">{r.uzs.toLocaleString()} so‘m</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={() => setIsContractModalOpen(false)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
          >
            Bekor qilish
          </button>
          <button
            onClick={() => {
              setIsContractModalOpen(false);
              showToast(`Shartnoma №NR-${activeApartment.number} Word (.docx) formatida yuklab olindi!`);
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow"
          >
            <Download className="w-4 h-4" />
            <span>Word (.DOCX) va PDF Yuklab Olish</span>
          </button>
        </div>
      </div>
    </div>
  );
}

