'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import type { FAQData } from '@/lib/data/getRetailCategoryData'

interface Props {
  faqs: FAQData[]
  categoryName: string
  placeName: string
}

/**
 * FAQ Section for Retail Category Page (Spec 14)
 *
 * Collapsible FAQ accordion with category-specific questions.
 */
export default function RetailFAQSection({ faqs, categoryName, placeName }: Props) {
  // Generate default FAQs if none provided
  const displayFaqs =
    faqs.length > 0
      ? faqs
      : generateDefaultFaqs(categoryName, placeName)

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

function generateDefaultFaqs(categoryName: string, placeName: string): FAQData[] {
  const categoryLower = categoryName.toLowerCase()

  return [
    {
      id: 'faq-1',
      question: `What does graded mean for ${categoryLower}?`,
      answer: `Graded ${categoryLower} are brand-new units that cannot be sold as "new" due to minor cosmetic damage or damaged packaging. They are fully functional and tested, typically offering 30-70% savings compared to buying new.`,
      category: null,
      display_order: 1,
    },
    {
      id: 'faq-2',
      question: `Do graded ${categoryLower} come with a warranty?`,
      answer: `Yes, most graded ${categoryLower} come with warranties ranging from 6-12 months, with some stores offering up to 24 months. The warranty covers mechanical faults and manufacturer defects, just like a new appliance.`,
      category: null,
      display_order: 2,
    },
    {
      id: 'faq-3',
      question: `Can I get a graded ${categoryLower.replace(/s$/, '')} delivered to ${placeName}?`,
      answer: `Yes, many of our listed stores offer delivery to ${placeName}. Some stores offer free delivery, while others may charge based on distance. Check individual store listings for their delivery options and costs.`,
      category: null,
      display_order: 3,
    },
    {
      id: 'faq-4',
      question: `What's the difference between A-grade and B-grade appliances?`,
      answer: `A-grade appliances have very minor cosmetic marks that are barely noticeable, typically offering around 30% off RRP. B-grade appliances have more visible marks or scratches but still work perfectly, usually offering 40-50% off RRP.`,
      category: null,
      display_order: 4,
    },
    {
      id: 'faq-5',
      question: `Can I finance a graded ${categoryLower.replace(/s$/, '')}?`,
      answer: `Many stores offer finance options for graded appliances, including 0% interest deals and buy now, pay later services like Klarna and Clearpay. Look for the "Finance Available" badge on store listings.`,
      category: null,
      display_order: 5,
    },
    {
      id: 'faq-6',
      question: `Are graded appliances tested before sale?`,
      answer: `Yes, all graded appliances should be fully tested before sale. Reputable retailers check that all functions work correctly and the appliance meets safety standards. Always buy from trusted retailers with good reviews.`,
      category: null,
      display_order: 6,
    },
  ]
}
