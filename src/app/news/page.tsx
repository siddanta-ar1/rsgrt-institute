import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import NewsCard from '@/components/NewsCard'
import type { NewsItem } from '@/lib/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'News | RSGRT Institute',
  description: 'Latest news and updates from RSGRT Institute.',
}

export default async function NewsPage() {
  const { data: news, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="text-red-500 text-center p-6">Error loading news: {error.message}</p>
  }

  if (!news || news.length === 0) {
    return <p className="text-gray-600 text-center p-6">No news available at the moment.</p>
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Latest News</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item: NewsItem) => (
          <NewsCard
            key={item.id}
            title={item.title}
            description={item.description ?? undefined}
            image_url={item.image_url ?? undefined}
            external_link={item.external_link ?? ''}
          />
        ))}
      </div>
    </section>
  )
}
