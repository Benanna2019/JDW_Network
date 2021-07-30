<script>
    export let helpers;
    export let helps; 
    console.log("These are the helpers in Helps Teaser", helpers)
    console.log("These are the helps in Helps Teaser", helps)
  </script>
  
  <div class="entry">
      <a href={helpers.permalinks.helps({ slug: helps.slug })}>{helps.frontmatter.title}</a>
      <p>{helps.frontmatter.excerpt}</p>
  </div>