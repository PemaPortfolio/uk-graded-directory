'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
}

interface Props {
  faqs: FAQ[]
  cityName: string
}

/**
 * City FAQ Section (Spec 07 - Section 10)
 *
 * Accordion FAQ section with Schema.org FAQPage markup.
 */
export default function CityFAQSection({ faqs, cityName }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (faqs.length === 0) return null

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Replace {city} placeholder in questions/answers
  const processedFaqs = faqs.map((faq) => ({
    ...faq,
    question: faq.question.replace(/{city}/g, cityName),
    answer: faq.answer.replace(/{city}/g, cityName),
  }))

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {processedFaqs.map((faq, index) => (
            <div key={faq.id} className="py-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-4 text-left hover:text-[#e85d4c] transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/guides/graded-appliances"
            className="text-[#e85d4c] hover:text-[#d94f3f] font-medium transition-colors"
          >
            Read our complete guide →
          </Link>
        </div>
      </div>
    </section>
  )
}
