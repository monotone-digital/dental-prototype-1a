import type { Metadata } from 'next';
import './globals.css';
import { clinic } from '@/lib/clinic';
export const metadata: Metadata = {
  title: `${clinic.name} — Dental Clinic in Faisalabad`,
  description: `Examination and x-ray evaluation, treatment planning, pain management, fillings, root canal treatment, extractions, crowns, bridges, dentures, scaling, whitening, braces, and aligners at ${clinic.name}, Samanabad, Faisalabad. Call ${clinic.phone}.`,
  robots: { index: false, follow: false },
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
