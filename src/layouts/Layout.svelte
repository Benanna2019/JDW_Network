<script>
  import style from '../../assets/style.css';
  import Nav from "../components/Nav.svelte"; 
  export let templateHtml, segment;
</script>

<style>
  .image-box {
    display: grid; 
    height: 16rem; 
    justify-content: center;
  }


  img {
    height: 18rem; 
    width: 18rem;  
  }

  :global(h1) {
    font-style: italic;
  }
  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 1rem;
  }

  :root {
    --balloon-color: #06395a;
    --balloon-font-size: 14px;
  }

  .footer {
    padding: 2rem 0;
    background: #123d3b;
    padding-top: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    color: #f4f7fb;
    text-align: center;
    font-size: 14px;
  }
  .footer a {
    color: #f4f7fb;
  }
  :global(ul li),
  :global(ol li) {
    margin-bottom: 0.3rem;
  }

  
  
</style>

<svelte:head>
  <!-- You can remove this balloon it is just for hover effects -->
  <link rel="stylesheet" href="https://unpkg.com/balloon-css/balloon.min.css" />
</svelte:head>

<!-- {@html helpers.shortcode({name: 'picture', props: { src: 'images/JDWLogo-V4.png' }})} -->

<div class="image-box">
  <a href="/">
    <img class="logo" src='/images/JDWLogo-V4.png' alt="JDW Logo" /> 
  </a>
</div>
<Nav {segment} /> 
<div class="container">
  {@html templateHtml}
</div>
<div class="footer">Built with ❤ and <a href="https://elderguide.com/tech/elderjs/">Elder.js</a></div>
