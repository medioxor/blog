<script lang="ts">
  import type { Post } from '../types';
  
  export let posts: Post[];
  let searchTerm = '';
  
  $: filteredPosts = searchTerm
    ? posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;
  
  function navigate(event: MouseEvent, slug: string) {
    event.preventDefault();
    history.pushState({}, '', `/post/${slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
</script>

<div class="search-container">
  <input
    type="text"
    bind:value={searchTerm}
    placeholder="Search posts..."
    class="search-input"
  />
</div>

<div class="posts">
  {#if filteredPosts.length === 0}
    <div class="no-results card">
      <p>No posts found matching "{searchTerm}"</p>
    </div>
  {:else}
    {#each filteredPosts as post}
      <a 
        href="/post/{post.slug}" 
        class="post-card card"
        on:click={(e) => navigate(e, post.slug)}
      >
        <h2>{post.title}</h2>
        <div class="post-meta">
          <span class="terminal-text">[{post.date}]</span> 
          <span class="author">by {post.author}</span>
        </div>
      </a>
    {/each}
  {/if}
</div>

<style>
  .search-container {
    margin-bottom: 2rem;
  }

  .search-input {
    width: 100%;
    padding: 0.8rem 1rem;
    font-family: var(--font-mono);
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    color: var(--text);
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--hover-shadow);
  }

  .search-input::placeholder {
    color: var(--text-muted);
  }

  .posts {
    display: grid;
    gap: 1.5rem;
  }

  .post-card {
    display: block;
    text-decoration: none;
  }

  .post-card:hover h2 {
    color: var(--accent);
  }

  h2 {
    transition: color 0.3s ease;
  }

  .author {
    color: var(--accent);
  }

  .no-results {
    text-align: center;
    padding: 2rem;
    color: var(--text-muted);
  }
</style>