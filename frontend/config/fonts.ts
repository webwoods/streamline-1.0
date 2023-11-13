import { Fira_Code as FontMono, Inter as FontSans, Readex_Pro as ReadexFont, Aclonica } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const readexFont = ReadexFont({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const aclonica = Aclonica({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400"]
})



