export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="p-8 bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}

