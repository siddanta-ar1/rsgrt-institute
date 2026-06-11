export type VideoMeta = {
  platform: 'youtube' | 'vimeo' | 'other'
  embedUrl: string
  thumbnailUrl: string | null
  videoId: string | null
}

export function parseVideoUrl(url: string): VideoMeta {
  // YouTube — handle watch, short, and embed URLs
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  )
  if (ytMatch) {
    const id = ytMatch[1]
    return {
      platform: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      videoId: id,
    }
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    const id = vimeoMatch[1]
    return {
      platform: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`,
      thumbnailUrl: null,
      videoId: id,
    }
  }

  return { platform: 'other', embedUrl: url, thumbnailUrl: null, videoId: null }
}
