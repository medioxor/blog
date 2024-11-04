import type { Post } from './types';

export function getPostById(posts: Post[], id: number): Post | undefined {
  return posts.find(post => post.id === id);
}

export function getPostBySlug(posts: Post[], slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}