export default function Mixes() {
  return (
    <section className="max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-semibold mb-6">Latest Mixes</h2>

      <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
        <iframe
          src="https://audius.co/embed/track/wyZ8Od5?flavor=card"
          width="100%"
          height="480"
          allow="encrypted-media"
          style={{ border: 'none' }}
        />
      </div>
    </section>
  )
}