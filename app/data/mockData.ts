import { Apartment, Debtor, Transaction, WarehouseItem, MonthlyStat } from '../types';

// --- INITIAL MOCK DATA ---
export const EXCHANGE_RATE = 12850;

export const INITIAL_APARTMENTS: Apartment[] = [
  // 9-Qavat
  { id: 901, number: 33, floor: 9, block: 'A-Blok', rooms: 3, area: 88.5, pricePerSqm: 700, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  { id: 902, number: 34, floor: 9, block: 'A-Blok', rooms: 2, area: 64.0, pricePerSqm: 720, status: 'sold', client: 'Karimov Azizbek', phone: '+998 90 123-45-67', paidPercent: 100, reserveDate: null },
  { id: 903, number: 35, floor: 9, block: 'A-Blok', rooms: 1, area: 42.5, pricePerSqm: 750, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  { id: 904, number: 36, floor: 9, block: 'A-Blok', rooms: 4, area: 112.0, pricePerSqm: 680, status: 'reserved', client: 'Rustamov Sherzod', phone: '+998 97 700-11-22', paidPercent: 0, reserveDate: '28.10.2026' },
  // 8-Qavat
  { id: 801, number: 29, floor: 8, block: 'A-Blok', rooms: 3, area: 88.5, pricePerSqm: 710, status: 'sold', client: 'Xolmatov Davron', phone: '+998 93 555-44-33', paidPercent: 45, reserveDate: null },
  { id: 802, number: 30, floor: 8, block: 'A-Blok', rooms: 2, area: 64.0, pricePerSqm: 730, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  { id: 803, number: 31, floor: 8, block: 'A-Blok', rooms: 1, area: 42.5, pricePerSqm: 750, status: 'sold', client: 'Aliyeva Malika', phone: '+998 90 987-65-43', paidPercent: 60, reserveDate: null },
  { id: 804, number: 32, floor: 8, block: 'A-Blok', rooms: 4, area: 112.0, pricePerSqm: 690, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  // 7-Qavat
  { id: 701, number: 25, floor: 7, block: 'A-Blok', rooms: 3, area: 88.5, pricePerSqm: 720, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  { id: 702, number: 26, floor: 7, block: 'A-Blok', rooms: 2, area: 64.0, pricePerSqm: 740, status: 'reserved', client: 'Toshmatov Bekzod', phone: '+998 99 888-77-66', paidPercent: 0, reserveDate: '29.10.2026' },
  { id: 703, number: 27, floor: 7, block: 'A-Blok', rooms: 1, area: 42.5, pricePerSqm: 760, status: 'sold', client: 'Sodiqov Jamshid', phone: '+998 91 222-33-44', paidPercent: 35, reserveDate: null },
  { id: 704, number: 28, floor: 7, block: 'A-Blok', rooms: 4, area: 112.0, pricePerSqm: 700, status: 'sold', client: 'Mirzayev Ulug‘bek', phone: '+998 90 333-22-11', paidPercent: 80, reserveDate: null },
  // 6-Qavat
  { id: 601, number: 21, floor: 6, block: 'A-Blok', rooms: 3, area: 88.5, pricePerSqm: 730, status: 'sold', client: 'Qodirov Farrux', phone: '+998 94 654-32-10', paidPercent: 50, reserveDate: null },
  { id: 602, number: 22, floor: 6, block: 'A-Blok', rooms: 2, area: 64.0, pricePerSqm: 750, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  { id: 603, number: 23, floor: 6, block: 'A-Blok', rooms: 1, area: 42.5, pricePerSqm: 770, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  { id: 604, number: 24, floor: 6, block: 'A-Blok', rooms: 4, area: 112.0, pricePerSqm: 710, status: 'reserved', client: 'Nazarov Otabek', phone: '+998 98 111-22-33', paidPercent: 0, reserveDate: '27.10.2026' },
  // 5-Qavat
  { id: 501, number: 17, floor: 5, block: 'A-Blok', rooms: 3, area: 88.5, pricePerSqm: 740, status: 'sold', client: 'Usmonova Dilnoza', phone: '+998 90 555-12-34', paidPercent: 75, reserveDate: null },
  { id: 502, number: 18, floor: 5, block: 'A-Blok', rooms: 2, area: 64.0, pricePerSqm: 760, status: 'sold', client: 'Jalilov Sanjar', phone: '+998 97 444-55-66', paidPercent: 40, reserveDate: null },
  { id: 503, number: 19, floor: 5, block: 'A-Blok', rooms: 1, area: 42.5, pricePerSqm: 780, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  { id: 504, number: 20, floor: 5, block: 'A-Blok', rooms: 4, area: 112.0, pricePerSqm: 720, status: 'sold', client: 'G‘afurov Bobur', phone: '+998 93 777-88-99', paidPercent: 100, reserveDate: null },
  // 4-Qavat
  { id: 401, number: 13, floor: 4, block: 'A-Blok', rooms: 3, area: 88.5, pricePerSqm: 750, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  { id: 402, number: 14, floor: 4, block: 'A-Blok', rooms: 2, area: 64.0, pricePerSqm: 770, status: 'sold', client: 'Yuldashev Nodir', phone: '+998 90 111-00-99', paidPercent: 55, reserveDate: null },
  { id: 403, number: 15, floor: 4, block: 'A-Blok', rooms: 1, area: 42.5, pricePerSqm: 790, status: 'reserved', client: 'Ergashev Jasur', phone: '+998 99 123-98-76', paidPercent: 0, reserveDate: '30.10.2026' },
  { id: 404, number: 16, floor: 4, block: 'A-Blok', rooms: 4, area: 112.0, pricePerSqm: 730, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },

  // B-Blok examples
  { id: 1901, number: 65, floor: 9, block: 'B-Blok', rooms: 2, area: 68.0, pricePerSqm: 690, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  { id: 1902, number: 66, floor: 9, block: 'B-Blok', rooms: 3, area: 92.0, pricePerSqm: 680, status: 'sold', client: 'Hamidov Oybek', phone: '+998 90 456-78-90', paidPercent: 60, reserveDate: null },
  { id: 1903, number: 67, floor: 9, block: 'B-Blok', rooms: 2, area: 65.5, pricePerSqm: 700, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  { id: 1904, number: 68, floor: 9, block: 'B-Blok', rooms: 1, area: 45.0, pricePerSqm: 730, status: 'reserved', client: 'Olimov Zafar', phone: '+998 93 222-11-00', paidPercent: 0, reserveDate: '28.10.2026' },
  { id: 1801, number: 61, floor: 8, block: 'B-Blok', rooms: 2, area: 68.0, pricePerSqm: 700, status: 'sold', client: 'Turdiyev Anvar', phone: '+998 97 333-44-55', paidPercent: 45, reserveDate: null },
  { id: 1802, number: 62, floor: 8, block: 'B-Blok', rooms: 3, area: 92.0, pricePerSqm: 690, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
  { id: 1803, number: 63, floor: 8, block: 'B-Blok', rooms: 2, area: 65.5, pricePerSqm: 710, status: 'sold', client: 'Salimova Nargiza', phone: '+998 90 888-99-00', paidPercent: 90, reserveDate: null },
  { id: 1804, number: 64, floor: 8, block: 'B-Blok', rooms: 1, area: 45.0, pricePerSqm: 740, status: 'free', client: null, phone: null, paidPercent: 0, reserveDate: null },
];

export const INITIAL_DEBTORS: Debtor[] = [
  { id: 1, client: 'Xolmatov Davron', apt: 'A-Blok, #29 (3x)', phone: '+998 93 555-44-33', totalContract: 62835, paid: 28275, monthlyDue: 1440, dueDate: '15.10.2026', overdueDays: 10, status: 'overdue' },
  { id: 2, client: 'Sodiqov Jamshid', apt: 'A-Blok, #27 (1x)', phone: '+998 91 222-33-44', totalContract: 32300, paid: 11305, monthlyDue: 875, dueDate: '18.10.2026', overdueDays: 7, status: 'overdue' },
  { id: 3, client: 'Jalilov Sanjar', apt: 'A-Blok, #18 (2x)', phone: '+998 97 444-55-66', totalContract: 48640, paid: 19450, monthlyDue: 1215, dueDate: '20.10.2026', overdueDays: 5, status: 'overdue' },
  { id: 4, client: 'Qodirov Farrux', apt: 'A-Blok, #21 (3x)', phone: '+998 94 654-32-10', totalContract: 64605, paid: 32300, monthlyDue: 1345, dueDate: '22.10.2026', overdueDays: 3, status: 'overdue' },
  { id: 5, client: 'Aliyeva Malika', apt: 'A-Blok, #31 (1x)', phone: '+998 90 987-65-43', totalContract: 31875, paid: 19125, monthlyDue: 750, dueDate: '26.10.2026', overdueDays: 0, status: 'upcoming' },
  { id: 6, client: 'Yuldashev Nodir', apt: 'A-Blok, #14 (2x)', phone: '+998 90 111-00-99', totalContract: 49280, paid: 27100, monthlyDue: 1100, dueDate: '28.10.2026', overdueDays: 0, status: 'upcoming' },
  { id: 7, client: 'Mirzayev Ulug‘bek', apt: 'A-Blok, #28 (4x)', phone: '+998 90 333-22-11', totalContract: 78400, paid: 62720, monthlyDue: 1960, dueDate: '25.10.2026', overdueDays: 0, status: 'paid_today' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 101, time: 'Bugun, 16:40', type: 'in', title: 'Xonadon #34 — Boshlang‘ich to‘lov', category: 'Sotuv / Rassrochka', block: 'A-Blok', clientOrVendor: 'Karimov Azizbek', amountUsd: 10000, amountUzs: 0, method: 'Naqd USD' },
  { id: 102, time: 'Bugun, 15:15', type: 'out', title: 'Armatura A500C (15 tonna)', category: 'Qurilish materiallari', block: 'B-Blok', clientOrVendor: '"Metall Stroy Snab" MChJ', amountUsd: 11200, amountUzs: 0, method: 'Bank o‘tkazma' },
  { id: 103, time: 'Bugun, 12:30', type: 'in', title: 'Xonadon #28 — Oktabr oyi rassrochka', category: 'Sotuv / Rassrochka', block: 'A-Blok', clientOrVendor: 'Mirzayev Ulug‘bek', amountUsd: 1960, amountUzs: 0, method: 'Naqd USD' },
  { id: 104, time: 'Bugun, 11:05', type: 'out', title: 'G‘isht teruvchi brigada avansi (5-6 qavat)', category: 'Ustalar (Forma-2)', block: 'A-Blok', clientOrVendor: 'Brigadir Rustam aka', amountUsd: 0, amountUzs: 18000000, method: 'Plastik / Naqd UZS' },
  { id: 105, time: 'Kecha, 17:50', type: 'out', title: 'Tayyor beton M350 (45 kub.m)', category: 'Qurilish materiallari', block: 'C-Blok', clientOrVendor: '"Euro Beton" zavodi', amountUsd: 0, amountUzs: 38250000, method: 'Bank o‘tkazma' },
];

export const INITIAL_WAREHOUSE: WarehouseItem[] = [
  { id: 1, name: 'Armatura A500C (Ø 12-22mm)', unit: 'tonna', stock: 42.5, limit: 15, lastPrice: '$745 / t', status: 'normal' },
  { id: 2, name: 'Sement M-400 (Qop 50kg)', unit: 'qop', stock: 180, limit: 300, lastPrice: '44,000 UZS', status: 'low' },
  { id: 3, name: 'Pishiq g‘isht (Standart)', unit: 'dona', stock: 28500, limit: 10000, lastPrice: '1,350 UZS', status: 'normal' },
  { id: 4, name: 'Tayyor Beton M-350', unit: 'kub.m', stock: 0, limit: 0, lastPrice: '850,000 UZS', status: 'direct' },
];

export const MONTHLY_STATS: MonthlyStat[] = [
  { month: 'Yan', income: 64, expense: 45 },
  { month: 'Fev', income: 72, expense: 52 },
  { month: 'Mar', income: 85, expense: 60 },
  { month: 'Apr', income: 78, expense: 68 },
  { month: 'May', income: 95, expense: 70 },
  { month: 'Iyun', income: 110, expense: 82 },
  { month: 'Iyul', income: 102, expense: 75 },
  { month: 'Avg', income: 125, expense: 88 },
  { month: 'Sen', income: 118, expense: 79 },
  { month: 'Okt', income: 98, expense: 62 },
];

