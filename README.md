# UK Graded Appliances Directory

The UK's comprehensive directory for finding graded appliance retailers and repair service providers. Save 30-70% on ex-display, B-grade, and factory seconds from verified UK retailers.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3fcf8e?logo=supabase)](https://supabase.com/)

## What is This?

**UK Graded Appliances Directory** is a dual-sided marketplace platform connecting:

- **Buyers** looking for discounted graded appliances (washing machines, fridges, ovens, etc.)
- **Graded appliance retailers** selling ex-display, B-grade, and factory seconds
- **Repair service engineers** offering appliance repair services across the UK

### What are Graded Appliances?

Graded appliances are brand-new products that cannot be sold as "new" due to:
- Minor cosmetic imperfections
- Damaged packaging (tatty packaging)
- Being ex-display models
- Factory seconds that didn't pass final inspection

They are **fully functional**, typically come with manufacturer warranties, and offer **savings of 30-70%** compared to full retail prices.

| Grade | Condition | Typical Savings |
|-------|-----------|-----------------|
| Tatty Packaging | Damaged box only, appliance perfect | ~20% off RRP |
| A-Grade | Like-new, minimal imperfections | ~30% off RRP |
| B-Grade | Minor cosmetic marks on visible surfaces | ~45% off RRP |
| C-Grade | Visible dents or scratches | ~60% off RRP |

## Features

- **Store Directory** - Browse verified graded appliance retailers across 563+ UK cities
- **Repair Services** - Find Gas Safe registered and manufacturer-authorised repair engineers
- **Location-Based Search** - Find stores and services near you by city or postcode
- **Category Browsing** - 29+ appliance categories including washing machines, fridges, dishwashers, and more
- **Brand Pages** - 27+ major brands including Bosch, Samsung, LG, Miele, Hotpoint, and more
- **Buyer Guides** - Educational content about graded appliances, grades, and buying tips
- **Business Listings** - Retailers can add or claim their business profiles
- **Reviews & Ratings** - Community-driven ratings for stores and service providers

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [TypeScript 5](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Supabase](https://supabase.com/) | PostgreSQL database & authentication |
| [Google OAuth](https://developers.google.com/identity) | Social authentication |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PemaPortfolio/uk-graded-directory.git
   cd uk-graded-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on localhost:3000 |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [country]/          # Dynamic country/city/category routes
│   ├── api/                # API routes
│   ├── brands/             # Brand pages
│   ├── business/           # Business add/claim flows
│   ├── categories/         # Categories index
│   ├── guides/             # Buyer guides
│   ├── locations/          # Location browsing
│   ├── provider/           # Repair provider profiles
│   ├── search/             # Search results
│   └── store/              # Store profiles
├── components/             # React components
├── config/                 # Configuration files
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
└── types/                  # TypeScript definitions
```

## Database Schema

The platform uses a PostgreSQL database with 30+ tables including:

- **Location hierarchy**: `countries` → `admin_areas` → `places`
- **Businesses**: `stores` (retail) and `service_providers` (repair)
- **Taxonomy**: `appliance_categories` and `brands`
- **Reviews**: Polymorphic review system with anti-spam protection
- **Analytics**: Click tracking with GDPR consent

## UK Coverage

- **4** UK countries (England, Scotland, Wales, Northern Ireland)
- **217** administrative areas
- **563+** cities and towns
- **29** appliance categories
- **27+** major brands

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Contact

For business inquiries: hello@gradedappliancehub.co.uk

---

**Save money on quality appliances. Find graded deals near you.**
