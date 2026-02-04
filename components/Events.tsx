const events = [
//{ date: 'Mar 22, 2026', venue: 'Underground Club', city: 'Toronto' },
//{ date: 'Apr 05, 2026', venue: 'Rooftop Sessions', city: 'Montreal' },
]


export default function Events() {
return (
<section className="max-w-4xl mx-auto px-6">
<h2 className="text-3xl font-semibold mb-6">Upcoming Events</h2>
<ul className="space-y-4">
{events.map((e, i) => (
<li key={i} className="flex justify-between border-b border-gray-800 pb-3">
<span>{e.date}</span>
<span className="text-gray-400">{e.venue} — {e.city}</span>
</li>
))}
</ul>
</section>
)
}