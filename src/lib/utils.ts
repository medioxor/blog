import type { Post } from '../types';

function extractMetadata(content: string): { metadata: { title: string; date: string; author: string }; content: string } {
  const metadataRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(metadataRegex);
  
  if (match) {
    const metadata = match[1].split('\n').reduce((acc, line) => {
      const [key, ...value] = line.split(':');
      if (key && value) {
        acc[key.trim()] = value.join(':').trim();
      }
      return acc;
    }, {} as Record<string, string>);

    return {
      metadata: {
        title: metadata.title || 'Untitled',
        date: metadata.date || new Date().toISOString().split('T')[0],
        author: metadata.author || 'Anonymous'
      },
      content: match[2].trim()
    };
  }

  // Fallback to extracting title from first h1
  const titleMatch = content.match(/^#\s+(.*)$/m);
  return {
    metadata: {
      title: titleMatch ? titleMatch[1] : 'Untitled',
      date: new Date().toISOString().split('T')[0],
      author: '0xMalwareHunter'
    },
    content: content
  };
}

// Import all markdown files using Vite's import.meta.glob
const postFiles = import.meta.glob('/posts/*.md', { as: 'raw', eager: true });

export async function getPosts(): Promise<Post[]> {
  const posts = Object.entries(postFiles).map(([path, content], index) => {
    const { metadata, content: cleanContent } = extractMetadata(content as string);
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    return {
      id: index + 1,
      title: metadata.title,
      date: metadata.date,
      content: cleanContent,
      author: metadata.author,
      slug
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}