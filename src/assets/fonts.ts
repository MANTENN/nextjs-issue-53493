import { Manrope, Open_Sans } from 'next/font/google'

export const sansFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap'
})

export const sansMono = Open_Sans({
  subsets: ['latin'],
  variable: '--font-mono'
})
