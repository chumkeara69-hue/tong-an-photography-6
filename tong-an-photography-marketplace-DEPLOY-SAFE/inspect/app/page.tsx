export default function Home() {
  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <header className="fixed top-0 w-full backdrop-blur bg-black/60 border-b border-yellow-700/20 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span>☰</span>
          <h1 className="text-yellow-400 tracking-[0.3em] font-serif text-xl">TONG AN</h1>
          <span>🛒</span>
        </div>
      </header>

      <section className="relative h-screen flex items-end pt-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-black/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 pb-20">
          <h2 className="font-serif text-6xl max-w-3xl leading-tight">Photography That Tells a Story.</h2>
          <p className="text-gray-300 max-w-xl mt-6">Discover and purchase carefully captured photographs from Cambodia and beyond.</p>
          <div className="flex gap-4 mt-8">
            <button className="bg-yellow-500 text-black px-6 py-3 rounded">Explore Collection</button>
            <button className="border border-yellow-500 px-6 py-3 rounded text-yellow-400">View Latest</button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="font-serif text-4xl mb-8">Featured Collections</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {["Soul of Angkor","Phnom Penh Nights","Artisans of the Land"].map((t,i)=>(
            <div key={i} className="relative overflow-hidden rounded-xl group">
              <img src={`https://picsum.photos/800/1000?random=${i+1}`} className="h-[480px] w-full object-cover transition group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h4 className="font-serif text-2xl">{t}</h4>
                <p className="text-yellow-400 text-sm">Premium Collection</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-yellow-700/20 py-10 text-center text-gray-400">
        © Tong An Photography
      </footer>
    </main>
  );
}
