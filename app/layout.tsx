import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MIB文件管理平台',
  description: 'SNMP MIB文件管理与配置生成平台',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}