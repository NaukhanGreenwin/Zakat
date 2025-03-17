"use client";

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  reference?: string;
}

export default function ZakatFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: "What exactly is Zakat?",
      answer: "Zakat is a compulsory annual charity that Muslims give from their wealth, after meeting a specific minimum (Nisab).",
      reference: "\"And establish prayer and give Zakat.\" (Quran 2:43)\n\nProphet Muhammad (ﷺ) said: \"Islam is built upon five pillars: testimony that none has the right to be worshipped except Allah, performing prayers, giving Zakat, fasting Ramadan, and performing Hajj.\" (Sahih Bukhari 8, Sahih Muslim 16)"
    },
    {
      question: "Why is Zakat important in Islam?",
      answer: "Zakat purifies your wealth, benefits those in need, and promotes social justice.",
      reference: "\"Take from their wealth a charity (Zakat) to cleanse and purify them.\" (Quran 9:103)\n\n\"Charity (Zakat) does not decrease wealth.\" (Sahih Muslim, 2588)"
    },
    {
      question: "Who must pay Zakat?",
      answer: "Any adult Muslim who owns wealth above Nisab for a full lunar year.",
      reference: "\"Let them know Allah has obligated Zakat to be taken from their rich and returned to their poor.\" (Sahih Bukhari, 1395)"
    },
    {
      question: "What is Nisab, and how do I determine it?",
      answer: "Nisab is the minimum wealth threshold for Zakat, equal to 85 grams gold or 595 grams silver.",
      reference: "Hadith-based consensus: Nisab equals the Prophet's standard (85g gold or 595g silver)."
    },
    {
      question: "How much Zakat do I pay?",
      answer: "You pay 2.5% of net zakatable wealth once it exceeds Nisab.",
      reference: "Prophet's Sunnah: The agreed-upon standard is 2.5% (Ijma of scholars)."
    },
    {
      question: "Do I pay Zakat on my RRSP?",
      answer: "It depends. Zakat applies only to funds you can access immediately (after taxes or penalties). If your RRSP is locked, you don't pay Zakat on it now. But when you withdraw, pay Zakat on the withdrawn amount for that year.",
      reference: "Fatwa councils such as AMJA, Islamic Fiqh Academy"
    },
    {
      question: "Is my house or personal car subject to Zakat?",
      answer: "No. Personal residence and personal vehicles are exempt.",
      reference: "Ijma of scholars (scholarly consensus)"
    },
    {
      question: "Do I pay Zakat on jewelry?",
      answer: "Opinions differ, but many scholars say yes on gold/silver jewelry.",
      reference: "A woman asked the Prophet if jewelry was zakatable. He replied, \"Would you prefer that Allah replaces them with bracelets of fire?\" She immediately paid Zakat. (Sunan Abu Dawud, 1563)"
    },
    {
      question: "Is cryptocurrency zakatable?",
      answer: "Yes, as currency/assets. Pay Zakat on current market value.",
      reference: "Fatwa by multiple Islamic councils and scholars."
    },
    {
      question: "Can I subtract debts from my Zakat calculation?",
      answer: "Yes. Immediate debts due this year are subtracted.",
      reference: "Consensus of jurists – Hanafi, Shafi'i, Maliki, Hanbali"
    },
    {
      question: "Can long-term debts like mortgages be deducted?",
      answer: "Only the portion payable immediately (current year's installment).",
      reference: "Islamic Fiqh Academy resolution"
    },
    {
      question: "What if I missed paying Zakat in past years?",
      answer: "Calculate immediately and pay missed Zakat. Seek forgiveness.",
      reference: "\"The debt of Allah deserves to be paid most.\" (Sahih Bukhari, 1953)"
    },
    {
      question: "Who is eligible to receive Zakat?",
      answer: "The Quran clearly identifies eight categories eligible for Zakat: the poor, needy, collectors, those whose hearts incline to Islam, freeing captives, debtors, in Allah's path, and the traveler.",
      reference: "\"Zakat is for the poor, needy, collectors, those whose hearts incline to Islam, freeing captives, debtors, in Allah's path, and the traveler.\" (Quran 9:60)"
    },
    {
      question: "Can I pay Zakat to my relatives?",
      answer: "Yes, except to immediate dependents (parents, spouse, children).",
      reference: "\"Giving charity to a needy relative earns double reward: charity and family bond.\" (Sunan An-Nasa'i, 2582)"
    },
    {
      question: "Can Zakat be given to non-Muslims?",
      answer: "No. Zakat must be given to Muslims, but charity (Sadaqah) can be given to anyone.",
      reference: "Scholarly consensus based on Quran 9:60"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">🌙 Zakat FAQ</h2>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className={`w-full text-left p-4 focus:outline-none flex justify-between items-center ${
                openIndex === index ? 'bg-emerald-50' : 'bg-white'
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <svg
                className={`w-5 h-5 text-emerald-600 transform ${
                  openIndex === index ? 'rotate-180' : ''
                } transition-transform duration-200`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {openIndex === index && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700 mb-3">{item.answer}</p>
                {item.reference && (
                  <div className="mt-2 p-3 bg-amber-50 border-l-4 border-amber-500 text-sm text-gray-700 whitespace-pre-line">
                    <strong>Reference:</strong><br />
                    {item.reference}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 