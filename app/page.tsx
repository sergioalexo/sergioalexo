import Hero from '@/components/Hero'
import About from '@/components/About'
import Events from '@/components/Events'
import Mixes from '@/components/Mixes'
import Contact from '@/components/Contact'


export default function Home() {
return (
<main className="space-y-32">
<Hero />
<About />
<Events />
<Mixes />
<Contact />
</main>
)
}