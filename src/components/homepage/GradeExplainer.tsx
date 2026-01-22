/**
 * Grade Explainer Section (Spec 12 - Section 4)
 *
 * AEO-Critical section for AI search engine extraction.
 * Uses HTML table for structured data.
 *
 * Target query: "What is a graded appliance?"
 */
export default function GradeExplainer() {
  const grades = [
    {
      name: 'Tatty Packaging',
      color: 'green',
      savings: '~20% off',
      description: 'Perfect inside, box damaged',
    },
    {
      name: 'A-Grade',
      color: 'blue',
      savings: '~30% off',
      description: 'Like-new condition',
    },
    {
      name: 'B-Grade',
      color: 'amber',
      savings: '~45% off',
      description: 'Minor cosmetic marks',
    },
    {
      name: 'C-Grade',
      color: 'orange',
      savings: '~60% off',
      description: 'Visible dents/scratches',
    },
  ]

  const colorClasses = {
    green: 'bg-green-50 border-green-200 text-green-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    amber: 'bg-amber-50 border-amber-200 text-amber-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
  }

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Question-based H2 for AEO */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#181111] mb-6">
          What is a Graded Appliance?
        </h2>

        {/* Answer Nugget (40-60 words for AEO extraction) */}
        <p className="text-lg text-[#6b7280] text-center max-w-3xl mx-auto mb-8">
          <strong className="text-[#181111]">A graded appliance</strong> is a brand-new product that cannot be sold as
          &quot;new&quot; due to minor cosmetic imperfections, damaged packaging, or being an
          ex-display model. Graded appliances are fully functional, typically come with
          manufacturer warranties, and offer savings of 30-70% compared to full retail prices.
        </p>

        {/* HTML Table (Critical for LLM Extraction) */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-[#181111]">
                  Grade
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-[#181111]">
                  Condition
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-[#181111]">
                  Typical Savings
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Tatty Packaging</td>
                <td className="border border-gray-300 px-4 py-3">Damaged box only, appliance perfect</td>
                <td className="border border-gray-300 px-4 py-3">~20% off RRP</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">A-Grade</td>
                <td className="border border-gray-300 px-4 py-3">Like-new, minimal imperfections</td>
                <td className="border border-gray-300 px-4 py-3">~30% off RRP</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">B-Grade</td>
                <td className="border border-gray-300 px-4 py-3">Minor cosmetic marks on visible surfaces</td>
                <td className="border border-gray-300 px-4 py-3">~45% off RRP</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">C-Grade</td>
                <td className="border border-gray-300 px-4 py-3">Visible dents or scratches</td>
                <td className="border border-gray-300 px-4 py-3">~60% off RRP</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Visual Grade Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {grades.map((grade) => (
            <div
              key={grade.name}
              className={`rounded-lg p-4 text-center border-2 ${colorClasses[grade.color as keyof typeof colorClasses]}`}
            >
              <div className="text-xs font-medium uppercase tracking-wide">
                {grade.name}
              </div>
              <div className="text-2xl font-bold mt-1 text-[#181111]">
                {grade.savings}
              </div>
              <div className="text-sm text-[#6b7280] mt-2">
                {grade.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
