<script>
  export let assessment;
  export let helpers;
  console.log("These are the helpers in Blog Teaser", helpers)
  console.log("These are the assessments in Blog Teaser", assessment)
</script>

<div class="entry">
    <a href={helpers.permalinks.assessment({ slug: assessment.slug })}>{assessment.frontmatter.title}</a>
    <p>{assessment.frontmatter.excerpt}</p>
</div>
