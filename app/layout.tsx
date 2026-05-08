import type { Metadata } from 'next'
import '@/styles/globals.css'
import { storeConfig } from '@/config/store'
import { FloatingWhatsAppButton } from '@/components/shared/FloatingWhatsAppButton'
import { StickyMobileCTA } from '@/components/shared/StickyMobileCTA'
import { PageLoader } from '@/components/shared/PageLoader'
import { Great_Vibes } from 'next/font/google'

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
})

export const metadata: Metadata = {
  title: {
    default: storeConfig.name,
    template: `%s | ${storeConfig.name}`,
  },
  description: storeConfig.description,
  keywords: ['online store', 'whatsapp shopping', 'nigeria', storeConfig.name],
  openGraph: {
    title: storeConfig.name,
    description: storeConfig.tagline,
    siteName: storeConfig.name,
    images: [{ url: storeConfig.heroImage, width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: storeConfig.name,
    description: storeConfig.tagline,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --color-primary: ${storeConfig.primaryColor};
            --color-secondary: ${storeConfig.secondaryColor};
          }
        `}</style>
      </head>
      <body className={`${greatVibes.variable} font-body antialiased`}>
        <PageLoader minDuration={1800} />
        {children}
        <FloatingWhatsAppButton />
        <StickyMobileCTA />
      </body>
    </html>
  )
}