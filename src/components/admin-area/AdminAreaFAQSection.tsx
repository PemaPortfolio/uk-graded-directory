interface FAQ {
  id: string
  question: string
  answer: string
}

interface AdminAreaFAQSectionProps {
  faqs: FAQ[]
  adminAreaName: string
  className?: string
}

/**
 * FAQ section for admin area pages
 */
export function AdminAreaFAQSection({
  faqs,
  adminAreaName,
  className = '',
}: AdminAreaFAQSectionProps) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  // Replace placeholders in FAQ content
  const processedFaqs = faqs.map((faq) => ({
    ...faq,
    question: faq.question.replace(/{location}/g, adminAreaName),
    answer: faq.answer.replace(/{location}/g, adminAreaName),
  }))

  return (
    <section className={className}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Frequently Asked Questions
      </h2>

      <div
        className="space-y-4"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        {processedFaqs.map((faq) => (
          <details
            key={faq.id}
            className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-medium text-gray-900 dark:text-gray-100 hover:text-[#e85d4c] transition-colors">
              <span itemProp="name">{faq.question}</span>
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div
              className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-400"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text">{faq.answer}</div>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

export default AdminAreaFAQSection
