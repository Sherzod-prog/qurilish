'use client';

import React, { useState, useMemo } from 'react';
import {
  Apartment,
  CalcStats,
  Debtor,
  FloorGroup,
  KassaType,
  TabType,
  Transaction,
} from './types';
import {
  EXCHANGE_RATE,
  INITIAL_APARTMENTS,
  INITIAL_DEBTORS,
  INITIAL_TRANSACTIONS,
} from './data/mockData';
import Toast from './components/Toast';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/views/DashboardView';
import ShaxmatkaView from './components/views/ShaxmatkaView';
import RassrochkaView from './components/views/RassrochkaView';
import KassaView from './components/views/KassaView';
import TelegramModal from './components/modals/TelegramModal';
import ContractModal from './components/modals/ContractModal';
import KassaModal from './components/modals/KassaModal';

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<TabType>('dashboard'); // 'dashboard' | 'shaxmatka' | 'rassrochka' | 'kassa'
  const [apartments, setApartments] = useState<Apartment[]>(INITIAL_APARTMENTS);
  const [debtors, setDebtors] = useState<Debtor[]>(INITIAL_DEBTORS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [cashUsd, setCashUsd] = useState(48500);
  const [cashUzs, setCashUzs] = useState(215000000);

  // Shaxmatka Filter States
  const [selectedBlock, setSelectedBlock] = useState('A-Blok');
  const [selectedRooms, setSelectedRooms] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeApartment, setActiveApartment] = useState<Apartment | undefined>(INITIAL_APARTMENTS[2]); // Default open #35 for quick demo

  // Calculator States inside Drawer
  const [discountPercent, setDiscountPercent] = useState(3);
  const [initialPayment, setInitialPayment] = useState(10000);
  const [installmentMonths, setInstallmentMonths] = useState(24);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('+998 90 ');

  // Modals & Notifications
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [isKassaModalOpen, setIsKassaModalOpen] = useState(false);
  const [kassaType, setKassaType] = useState<KassaType>('out'); // 'in' | 'out'
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Kassa Form State
  const [txTitle, setTxTitle] = useState('');
  const [txCategory, setTxCategory] = useState('Qurilish materiallari');
  const [txBlock, setTxBlock] = useState('A-Blok');
  const [txVendor, setTxVendor] = useState('');
  const [txCurrency, setTxCurrency] = useState('USD');
  const [txAmount, setTxAmount] = useState('');

  // Helper to show toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered Apartments for Shaxmatka
  const filteredApartments = useMemo(() => {
    return apartments.filter((apt) => {
      if (apt.block !== selectedBlock) return false;
      if (selectedRooms !== 'all' && apt.rooms !== Number(selectedRooms)) return false;
      if (selectedStatus !== 'all' && apt.status !== selectedStatus) return false;
      return true;
    });
  }, [apartments, selectedBlock, selectedRooms, selectedStatus]);

  // Group by floors descending
  const floorsList = useMemo<FloorGroup[]>(() => {
    const floors: Record<number, Apartment[]> = {};
    filteredApartments.forEach((apt) => {
      if (!floors[apt.floor]) floors[apt.floor] = [];
      floors[apt.floor].push(apt);
    });
    return Object.keys(floors)
      .map(Number)
      .sort((a, b) => b - a)
      .map((floorNum) => ({
        floor: floorNum,
        items: floors[floorNum].sort((a, b) => a.number - b.number),
      }));
  }, [filteredApartments]);

  // Live Calculator Computations
  const calcStats = useMemo<CalcStats | null>(() => {
    if (!activeApartment) return null;
    const baseTotal = Math.round(activeApartment.area * activeApartment.pricePerSqm);
    const discountAmount = Math.round((baseTotal * discountPercent) / 100);
    const finalTotal = baseTotal - discountAmount;
    const safeInitial = Math.min(initialPayment, finalTotal);
    const remaining = Math.max(0, finalTotal - safeInitial);
    const monthlyUsd = installmentMonths > 0 ? Math.round(remaining / installmentMonths) : 0;
    const monthlyUzs = monthlyUsd * EXCHANGE_RATE;

    // Generate 6 sample schedule rows
    const schedule = Array.from({ length: Math.min(installmentMonths, 6) }, (_, idx) => {
      const date = new Date(2026, 10 + idx, 25);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
      return {
        monthNum: idx + 1,
        date: formattedDate,
        usd: monthlyUsd,
        uzs: monthlyUzs,
      };
    });

    return {
      baseTotal,
      discountAmount,
      finalTotal,
      remaining,
      monthlyUsd,
      monthlyUzs,
      schedule,
    };
  }, [activeApartment, discountPercent, initialPayment, installmentMonths]);

  // Handle reserving or selling an apartment
  const handleStatusUpdate = (newStatus: string) => {
    if (!activeApartment || !calcStats) return;
    const clientName = newClientName.trim() || (newStatus === 'reserved' ? 'Yangi Mijoz (Bron)' : 'Yangi Xaridor');
    const updated = apartments.map((apt) => {
      if (apt.id === activeApartment.id) {
        return {
          ...apt,
          status: newStatus,
          client: clientName,
          phone: newClientPhone,
          paidPercent: newStatus === 'sold' ? Math.round((initialPayment / calcStats.finalTotal) * 100) : 0,
          reserveDate: newStatus === 'reserved' ? '02.11.2026' : null,
        };
      }
      return apt;
    });
    setApartments(updated);
    const updatedCurrent = updated.find((a) => a.id === activeApartment.id);
    setActiveApartment(updatedCurrent);

    if (newStatus === 'sold' && initialPayment > 0) {
      setCashUsd((prev) => prev + Number(initialPayment));
      setTransactions((prev) => [
        {
          id: Date.now(),
          time: 'Hozirgina',
          type: 'in',
          title: `Xonadon #${activeApartment.number} — Boshlang‘ich to‘lov`,
          category: 'Sotuv / Rassrochka',
          block: activeApartment.block,
          clientOrVendor: clientName,
          amountUsd: Number(initialPayment),
          amountUzs: 0,
          method: 'Naqd USD',
        },
        ...prev,
      ]);
    }

    showToast(
      newStatus === 'reserved'
        ? `Xonadon #${activeApartment.number} "${clientName}" nomiga bron qilindi!`
        : `Xonadon #${activeApartment.number} sotildi va $${initialPayment.toLocaleString()} kassaga kirim qilindi!`
    );
  };

  // Handle Debtor Payment
  const handlePayDebtor = (debtor: Debtor) => {
    setDebtors((prev) =>
      prev.map((d) =>
        d.id === debtor.id
          ? { ...d, paid: d.paid + d.monthlyDue, overdueDays: 0, status: 'paid_today' }
          : d
      )
    );
    setCashUsd((prev) => prev + debtor.monthlyDue);
    setTransactions((prev) => [
      {
        id: Date.now(),
        time: 'Hozirgina',
        type: 'in',
        title: `${debtor.apt} — Rassrochka to‘lovi`,
        category: 'Sotuv / Rassrochka',
        block: 'A-Blok',
        clientOrVendor: debtor.client,
        amountUsd: debtor.monthlyDue,
        amountUzs: 0,
        method: 'Naqd USD',
      },
      ...prev,
    ]);
    showToast(`${debtor.client}dan $${debtor.monthlyDue.toLocaleString()} qabul qilindi va kvitantsiya shakllantirildi!`);
  };

  // Handle Kassa Transaction Submit
  const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numAmount = Number(txAmount);
    if (!txTitle || !numAmount) return;

    const newTx: Transaction = {
      id: Date.now(),
      time: 'Hozirgina',
      type: kassaType,
      title: txTitle,
      category: txCategory,
      block: txBlock,
      clientOrVendor: txVendor || 'Mas’ul shaxs',
      amountUsd: txCurrency === 'USD' ? numAmount : 0,
      amountUzs: txCurrency === 'UZS' ? numAmount : 0,
      method: txCurrency === 'USD' ? 'Naqd USD' : 'Naqd UZS / Bank',
    };

    setTransactions((prev) => [newTx, ...prev]);

    if (txCurrency === 'USD') {
      setCashUsd((prev) => (kassaType === 'in' ? prev + numAmount : prev - numAmount));
    } else {
      setCashUzs((prev) => (kassaType === 'in' ? prev + numAmount : prev - numAmount));
    }

    setIsKassaModalOpen(false);
    setTxTitle('');
    setTxVendor('');
    setTxAmount('');
    showToast(
      kassaType === 'in'
        ? `Kassaga ${numAmount.toLocaleString()} ${txCurrency} muvaffaqiyatli kirim qilindi!`
        : `Kassadan ${txBlock} uchun ${numAmount.toLocaleString()} ${txCurrency} chiqim qilindi!`
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col md:flex-row font-sans">
      {/* TOAST NOTIFICATION */}
      <Toast toastMessage={toastMessage} />

      {/* SIDEBAR NAVIGATION */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} debtors={debtors} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP HEADER */}
        <Header
          activeTab={activeTab}
          setKassaType={setKassaType}
          setIsKassaModalOpen={setIsKassaModalOpen}
          setIsTelegramModalOpen={setIsTelegramModalOpen}
        />

        {/* VIEW 1: CEO DASHBOARD */}
        {activeTab === 'dashboard' && (
          <DashboardView
            cashUsd={cashUsd}
            cashUzs={cashUzs}
            setActiveTab={setActiveTab}
            debtors={debtors}
            transactions={transactions}
          />
        )}

        {/* VIEW 2: INTERAKTIV SHAXMATKA & LIVE CALCULATOR */}
        {activeTab === 'shaxmatka' && (
          <ShaxmatkaView
            selectedBlock={selectedBlock}
            setSelectedBlock={setSelectedBlock}
            selectedRooms={selectedRooms}
            setSelectedRooms={setSelectedRooms}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            floorsList={floorsList}
            activeApartment={activeApartment}
            setActiveApartment={setActiveApartment}
            setNewClientName={setNewClientName}
            setNewClientPhone={setNewClientPhone}
            calcStats={calcStats}
            discountPercent={discountPercent}
            setDiscountPercent={setDiscountPercent}
            initialPayment={initialPayment}
            setInitialPayment={setInitialPayment}
            installmentMonths={installmentMonths}
            setInstallmentMonths={setInstallmentMonths}
            newClientName={newClientName}
            newClientPhone={newClientPhone}
            handleStatusUpdate={handleStatusUpdate}
            setIsContractModalOpen={setIsContractModalOpen}
          />
        )}

        {/* VIEW 3: RASSROCHKA VA QARZDORLAR */}
        {activeTab === 'rassrochka' && (
          <RassrochkaView
            debtors={debtors}
            showToast={showToast}
            handlePayDebtor={handlePayDebtor}
          />
        )}

        {/* VIEW 4: KASSA VA QURILISH OMBORI */}
        {activeTab === 'kassa' && (
          <KassaView
            setKassaType={setKassaType}
            setIsKassaModalOpen={setIsKassaModalOpen}
            showToast={showToast}
            transactions={transactions}
          />
        )}
      </div>

      {/* MODAL 1: TELEGRAM BOT CEO DAILY SUMMARY PREVIEW */}
      <TelegramModal
        isTelegramModalOpen={isTelegramModalOpen}
        setIsTelegramModalOpen={setIsTelegramModalOpen}
        cashUsd={cashUsd}
        cashUzs={cashUzs}
      />

      {/* MODAL 2: AUTOMATIC CONTRACT (.DOCX / PDF) PREVIEW */}
      <ContractModal
        isContractModalOpen={isContractModalOpen}
        setIsContractModalOpen={setIsContractModalOpen}
        activeApartment={activeApartment}
        calcStats={calcStats}
        newClientName={newClientName}
        newClientPhone={newClientPhone}
        discountPercent={discountPercent}
        initialPayment={initialPayment}
        installmentMonths={installmentMonths}
        showToast={showToast}
      />

      {/* MODAL 3: QUICK KASSA KIRIM / CHIQIM */}
      <KassaModal
        isKassaModalOpen={isKassaModalOpen}
        setIsKassaModalOpen={setIsKassaModalOpen}
        kassaType={kassaType}
        setKassaType={setKassaType}
        txBlock={txBlock}
        setTxBlock={setTxBlock}
        txCategory={txCategory}
        setTxCategory={setTxCategory}
        txTitle={txTitle}
        setTxTitle={setTxTitle}
        txVendor={txVendor}
        setTxVendor={setTxVendor}
        txCurrency={txCurrency}
        setTxCurrency={setTxCurrency}
        txAmount={txAmount}
        setTxAmount={setTxAmount}
        handleAddTransaction={handleAddTransaction}
      />
    </div>
  );
}
