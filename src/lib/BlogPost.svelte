<script lang="ts">
  import { marked } from 'marked';
  import type { Post } from '../types';
  import { onMount } from 'svelte';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/atom-one-dark.css';

  export let post: Post;
  
  marked.setOptions({
    highlight: function(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    }
  });
  
  $: htmlContent = marked(post.content);

  onMount(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  });

  function goBack(event: MouseEvent) {
    event.preventDefault();
    history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
</script>

<div class="post-container">
  <button class="back-button" on:click={goBack}>
    <span class="terminal-text">&lt; back</span>
  </button>
  
  <article class="card">
    <h2 class="post-title">{post.title}</h2>
    <div class="post-meta">
      <span class="terminal-text">[{post.date}]</span> by <span class="author">{post.author}</span>
    </div>
    <div class="post-content">
      {@html htmlContent}
    </div>
  </article>
</div>

<style>
  .post-container {
    position: relative;
  }

  .back-button {
    background: none;
    border: 1px solid var(--primary);
    color: var(--primary);
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: var(--font-mono);
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    border-radius: 4px;
  }

  .back-button:hover {
    background: var(--primary);
    color: var(--card-bg);
  }

  .author {
    color: var(--accent);
  }
  
  article {
    margin-bottom: 2rem;
  }

  .post-title {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
  }

  .post-content {
    width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  :global(article h1) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  :global(article h2) {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  :global(article ul, article ol) {
    list-style-position: inside;
    padding-left: 1rem;
    margin-bottom: 1rem;
    width: calc(100% - 2rem);
    max-width: 100%;
  }

  :global(article ul) {
    list-style-type: none;
  }

  :global(article ol) {
    padding-left: 2rem;
  }

  :global(article li) {
    padding-left: 1.5rem;
    text-indent: -1.5rem;
    margin-bottom: 0.5rem;
    width: calc(100% - 1.5rem);
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  :global(article ul li::before) {
    content: ">";
    color: var(--primary);
    margin-right: 0.5rem;
  }

  :global(article ol li) {
    padding-left: 0.5rem;
    text-indent: 0;
  }

  :global(pre) {
    background: var(--background) !important;
    border-radius: 4px;
    margin: 1.5rem 0;
    padding: 1rem;
    overflow-x: auto;
    width: 100%;
  }

  :global(pre code) {
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
    font-family: var(--font-mono) !important;
    font-size: 0.9em;
  }

  :global(.hljs) {
    background: transparent !important;
    padding: 0 !important;
    border: none !important;
  }

  :global(p) {
    margin-bottom: 1rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    width: 100%;
    max-width: 100%;
  }

  :global(code:not(pre code)) {
    background-color: var(--background);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: var(--font-mono);
    color: var(--accent);
    border: 1px solid var(--border-color);
  }
</style>