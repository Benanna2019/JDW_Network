<script>
    export let data, request; 
    const { html, frontmatter } = data
</script>

<svelte:head>
    <title>{frontmatter.title}</title>
    <link rel="canonical" href={request.permalink} /> 
</svelte:head>

<style>
    h1 {
      margin-bottom: 10px;
    }

    h3 {
      text-decoration: underline;
      font-size: 1.1rem; 
    }

    ul {
      list-style-type: none;
      padding-left: 0; 
    }

    a {
      text-decoration: none;
      color: black; 
    }

    a:hover, a:focus {
      text-decoration: underline;
      color: #205730; 
    }

    .board-container {
      display: grid;  
      grid-template-columns: 7.5fr 3fr;
      grid-column-gap: 50px; 
    }
  
    .title {
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #ddd;
    }

    .section-nav {
      height: 25rem; 
      border-left: 1px solid black; 
      display: flex; 
      flex-direction: column; 
      justify-content: flex-start;
      align-content: flex-start;
      margin-top: 1rem; 
      margin-left: 1rem; 
      padding-left: 1rem; 
    }
  
    :global(h2) {
      margin-top: 2rem;
    }
  
    :global(pre) {
      background: #eee;
      padding: 1rem;
      border-radius: 1rem;
    }
  
    :global(blockquote) {
      margin: 0;
      background: #ddd;
      padding: 3px 1.5rem 3px 3rem;
      position: relative;
      border-radius: 1rem;
    }
    :global(blockquote:after) {
      content: '>';
      color: #aaa;
      font-size: 30px;
      position: absolute;
      top: 33%;
      left: 1rem;
    }
  
    :global(blockquote p) {
      padding: 0;
    }
  </style>

<a href="/">&LeftArrow; Home</a>

<div class="title">
    <h1>{frontmatter.title}</h1>
    {#if frontmatter.author}<small>By {frontmatter.author}</small>{/if}
</div>


<div class="board-container">
  <div>
    {@html html}
 </div>
  <div class="section-nav">
    <h3>Grant Writers</h3>
    <ul>
      <li><a href="/legalities-of-starting-a-non-profit/">- <em>Legalities of Starting a Non-Profit</em></a></li>
      <li><a href="/non-profit-organization/">- <em>Non-Profit Organization</em></a></li>
      <li><a href="/starting-a-nonprofit-organization/">- <em>Starting a Nonprofit Organization</em></a></li>
    </ul>
 </div>
</div>