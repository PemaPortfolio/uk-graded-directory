'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What does graded mean for appliances?',
    answer:
      'A graded appliance is a brand-new product that cannot be sold as "new" due to minor cosmetic imperfections, damaged packaging, or being an ex-display model. They are fully functional, often include manufacturer warranties, and offer savings of 30-70% compared to full retail prices.',
  },
  {
    question: 'What is the difference between A-grade, B-grade and C-grade?',
    answer:
      'A-grade appliances have minimal cosmetic imperfections and are essentially like-new. B-grade items have noticeable marks or dents on visible surfaces but work perfectly. C-grade appliances have more significant cosmetic damage but remain fully functional. Tatty packaging means only the box is damaged.',
  },
  {
    question: 'Do graded appliances come with a warranty?',
    answer:
      'Yes, most graded appliances come with warranties. A-grade items often retain full manufacturer warranties. B-grade and C-grade typically come with retailer warranties of 6-12 months. Always check the specific warranty offered by each retailer.',
  },
  {
    question: 'What does factory seconds mean?',
    answer:
      'Factory seconds are products that did not pass final quality inspection due to minor cosmetic defects. They never left the factory as "new" stock but are fully functional. Factory seconds typically offer savings of 20-40% and may include manufacturer warranty.',
  },
  {
    question: 'Can I buy graded appliances on finance?',
    answer:
      'Yes, many graded appliance retailers offer finance options including Klarna, Clearpay, and PayPal Credit. Interest-free options are often available for orders over £300. Finance availability varies by retailer, so check individual store pages for details.',
  },
]

/**
 * FAQ Section (Spec 12 - Section 11)
 *
 * Accordion FAQ for SEO (featured snippets) and AEO (AI search engines).
 * Schema.org FAQPage markup required.
 */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Question-based H2 for AEO */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#181111] mb-8">
          Common Questions About Graded Appliances
        </h2>

        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-4 text-left hover:text-[#e85d4c] transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-[#181111] pr-4">
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
                <p className="text-[#6b7280] leading-relaxed">{faq.answer}</p>
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
