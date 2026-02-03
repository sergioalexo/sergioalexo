import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
title: 'Sergio Alexo | DJ & Music Curator',
description: 'Sergio Alexo – DJ sets, events, mixes, and disco/house energy.',
openGraph: {
title: 'Sergio Alexo | DJ',
description: 'Modern DJ website for Sergio Alexo',
type: 'website',
},
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="bg-black text-white antialiased">{children}</body>
</html>
)
}