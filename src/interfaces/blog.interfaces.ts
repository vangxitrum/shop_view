interface BlogItemType {
  key: React.Key
  id: string
  slug: string
  title: string // Title of blog
  author: string // Author name
  category: string
  thumbnail: string
  publish_date: string
  excerpt: string
}

interface RecentPostsType {
  key: React.Key
  title: string
  publish_date: string
  thumbnail: string
  slug: string
}

interface BlogTagItemType {
  name: string
  slug: string
}

export type { BlogItemType, RecentPostsType, BlogTagItemType }
