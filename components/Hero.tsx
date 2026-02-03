'use client'
import { motion } from 'framer-motion'


export default function Hero() {
return (
<section className="h-screen flex items-center justify-center text-center px-6">
<motion.div
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
>
<h1 className="text-5xl md:text-7xl font-bold tracking-tight">
SERGIO ALEXO
</h1>
<p className="mt-6 text-lg text-gray-400">
Disco • House • Groove
</p>
</motion.div>
</section>
)
}