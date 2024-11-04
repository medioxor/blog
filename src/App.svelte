<script lang="ts">
  import { onMount } from 'svelte';
  import PostList from './lib/PostList.svelte';
  import BlogPost from './lib/BlogPost.svelte';
  import Header from './lib/Header.svelte';
  import type { Post } from './types';
  import { getPosts } from './lib/utils';
  import { getPostBySlug } from './routes';

  let posts: Post[] = [];
  let currentPost: Post | undefined;
  
  // Simple client-side routing
  function handleRoute() {
    const path = window.location.pathname;
    if (path === '/') {
      currentPost = undefined;
    } else {
      const slug = path.split('/').pop();
      currentPost = posts.length > 0 ? getPostBySlug(posts, slug!) : undefined;
    }
  }

  onMount(async () => {
    posts = await getPosts();
    handleRoute();
    
    // Handle browser navigation
    window.addEventListener('popstate', handleRoute);
    
    return () => {
      window.removeEventListener('popstate', handleRoute);
    };
  });
</script>

<main>
  <Header />
  <div class="container">
    {#if currentPost}
      <BlogPost post={currentPost} />
    {:else}
      <PostList {posts} />
    {/if}
  </div>
</main>