'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import type { RepairFAQData } from '@/lib/data/getRepairCategoryData'

interface Props {
  faqs: RepairFAQData[]
  categoryName: string
  placeName: string
}

/**
 * FAQ Section for Repair Category Page (Spec 10)
 *
 * Collapsible FAQ accordion with repair-specific questions.
 */
export default function RepairFAQSection({ faqs, categoryName, placeName }: Props) {
  // Generate default FAQs if none provided
  const displayFaqs = faqs.length > 0 ? faqs : generateDefaultRepairFaqs(categoryName, placeName)

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <HelpCircle className="w-5 h-5 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-3">
        {displayFaqs.map((faq, index) => (
          <FAQItem
            key={faq.id || index}
            question={customizeFAQ(faq.question, categoryName, placeName)}
            answer={customizeFAQ(faq.answer, categoryName, placeName)}
          />
        ))}
      </div>
    </section>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-medium text-gray-900 pr-4">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <p className="text-gray-600 pt-3">{answer}</p>
        </div>
      )}
    </div>
  )
}

function customizeFAQ(text: string, categoryName: string, placeName: string): string {
  return text
    .replace(/{category}/gi, categoryName.toLowerCase())
    .replace(/{location}/gi, placeName)
    .replace(/{appliance}/gi, categoryName.toLowerCase())
}

function generateDefaultRepairFaqs(categoryName: string, placeName: string): RepairFAQData[] {
  const categoryLower = categoryName.toLowerCase()

  return [
    {
      id: 'faq-1',
      question: `How much does ${categoryLower} repair cost in ${placeName}?`,
      answer: `${categoryName} repair costs in ${placeName} typically range from £50 to £150, depending on the fault. This usually includes a callout fee (£45-£85) and parts/labour. Many engineers offer a "no fix no fee" policy, meaning you only pay if they successfully repair your appliance.`,
      category: null,
      display_order: 1,
    },
    {
      id: 'faq-2',
      question: `Can I get same-day ${categoryLower} repair?`,
      answer: `Yes, many repair engineers in ${placeName} offer same-day callouts. We list which engineers provide same-day service so you can contact them directly. Emergency repairs may be available for an additional fee.`,
      category: null,
      display_order: 2,
    },
    {
      id: 'faq-3',
      question: `Is it worth repairing my ${categoryLower}?`,
      answer: `As a general rule, if the repair cost is more than 50% of the price of a new appliance, it may be more economical to replace. Consider the age of your ${categoryLower} too - most last 7-10 years. Our engineers can advise whether repair is worthwhile after diagnosis.`,
      category: null,
      display_order: 3,
    },
    {
      id: 'faq-4',
      question: `Do ${categoryLower} repair engineers offer warranties?`,
      answer: `Yes, most reputable repair engineers provide warranties on their work, typically 3-12 months on parts and labour. Check individual engineer profiles for their specific warranty terms. This protects you if the same fault reoccurs.`,
      category: null,
      display_order: 4,
    },
    {
      id: 'faq-5',
      question: `How do I choose a ${categoryLower} repair engineer?`,
      answer: `Look for engineers with good reviews, relevant experience, and appropriate certifications (Gas Safe for gas appliances). Check if they offer manufacturer-authorized repairs if your appliance is under warranty. Compare callout fees and ask about their diagnostic process.`,
      category: null,
      display_order: 5,
    },
    {
      id: 'faq-6',
      question: `What information should I provide when booking a repair?`,
      answer: `Have your ${categoryLower} make, model, and serial number ready. Describe the problem as clearly as possible, including any error codes displayed. Note when the problem started and if anything triggered it. This helps the engineer prepare and may speed up the repair.`,
      category: null,
      display_order: 6,
    },
  ]
}
