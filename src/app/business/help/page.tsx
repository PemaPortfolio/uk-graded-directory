/**
 * Business Help Page
 *
 * /business/help - FAQ and guidance for businesses.
 */

import { Metadata } from 'next'
import Link from 'next/link'
import { Store, Wrench, CheckCircle, Clock, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Help for Businesses | UK Graded Appliances Directory',
  description: 'Learn how to list your appliance store or repair service on the UK Graded Appliances Directory.',
}

export default function BusinessHelpPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f6] dark:bg-[#0f0d0d] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Help for Businesses
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about listing your business on our directory.
          </p>
        </div>

        {/* Business Types */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Who Can List?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#e85d4c]/10 flex items-center justify-center">
                  <Store className="w-5 h-5 text-[#e85d4c]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Appliance Stores
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Perfect for retailers selling graded, refurbished, or ex-display appliances. Whether you have a physical showroom or operate online.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Graded appliance specialists
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Ex-display retailers
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Refurbished appliance sellers
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Repair Services
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                For qualified engineers and companies offering appliance repairs, maintenance, and installation services.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Appliance repair engineers
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Service companies
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Installation specialists
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            How It Works
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#e85d4c] text-white flex items-center justify-center font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  Check if you&apos;re listed
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Search our directory to see if your business is already listed. If it is, you can claim it.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#e85d4c] text-white flex items-center justify-center font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  Add or claim your listing
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fill out your business details or verify ownership of an existing listing with a simple code.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#e85d4c] text-white flex items-center justify-center font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  Verify your email
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We&apos;ll send a verification email to confirm your business details.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#e85d4c] text-white flex items-center justify-center font-semibold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  Go live
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Once approved, your listing will appear in search results. You can update it anytime from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Why List With Us?
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                Reach More Customers
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get found by people actively searching for graded appliances.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                Build Trust
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showcase your credentials, reviews, and verified status.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                Free to List
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Basic listings are completely free. No hidden fees.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 dark:text-gray-100">
                How long does it take to get listed?
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-400">
                After submitting your details and verifying your email, most listings are reviewed and approved within 1-2 business days.
              </div>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 dark:text-gray-100">
                Can I update my listing after it&apos;s live?
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-400">
                Yes! Once you claim your listing, you can update your details, add photos, and manage your profile anytime through your dashboard.
              </div>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 dark:text-gray-100">
                Is it really free?
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-400">
                Yes, basic listings are free. We may offer premium features in the future, but you&apos;ll never be charged without opting in.
              </div>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 dark:text-gray-100">
                What if my business is already listed but I didn&apos;t add it?
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-400">
                We add businesses from public sources to help customers find services. You can claim your listing by verifying you own the business - we&apos;ll send a code to your registered email or phone.
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/business/add"
            className="
              inline-flex items-center justify-center
              h-12 px-8
              bg-[#e85d4c] hover:bg-[#d94f3f]
              text-white font-semibold
              rounded-lg
              transition-colors
            "
          >
            Add Your Business Now
          </Link>
        </div>
      </div>
    </main>
  )
}
