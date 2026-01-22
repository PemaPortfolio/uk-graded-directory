import { BookOpen } from 'lucide-react'

interface Props {
  categoryName: string
  content: string
}

/**
 * Buying Guide Section for Retail Category Page (Spec 14)
 *
 * Displays category-specific buying advice from appliance_categories.buying_guide.
 */
export default function BuyingGuideSection({ categoryName, content }: Props) {
  // Split content into paragraphs if it contains line breaks
  const paragraphs = content.split('\n').filter((p) => p.trim())

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <BookOpen className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Buying Guide: Graded {categoryName}</h2>
      </div>

      <div className="prose prose-gray max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-600 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Quick tips based on common buying considerations */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <TipCard
          title="Check the Grade"
          description="A-grade has minimal marks, while C-grade may have visible damage. All grades are fully functional."
        />
        <TipCard
          title="Warranty Coverage"
          description="Most graded appliances come with 6-12 months warranty. Some stores offer extended options."
        />
        <TipCard
          title="Delivery Options"
          description="Many stores offer free delivery. Check for installation and old appliance removal services."
        />
        <TipCard
          title="Finance Available"
          description="Spread the cost with 0% finance or buy now, pay later options at participating stores."
        />
      </div>
    </section>
  )
}

function TipCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
