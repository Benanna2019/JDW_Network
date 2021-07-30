<script>
	export let segment;
</script>

<style>
    nav {
		/* border-bottom: 1px solid rgba(255, 62, 0, 0.1); */
		/* background: #06395a; */
		background: #123d3b;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: 3.5rem;
		grid-column-gap: 50px;
	}
	a {
		/* padding: 1rem 3rem; */
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
		text-transform: uppercase;
		font-weight: 300;
		font-size: 1em;
		background: none;
		/* border: 0; */
		cursor: pointer;
		text-decoration: none;
		color: #e2e2e2; 
	}

	@media (max-width: 700px) {
		a {
			font-size: 10px;
			padding: 0 10px;
		}
	}
	a:hover,
	a:focus {
		outline: none;
		text-decoration: underline;
	}

	@media (max-width: 700px) {
		a {
			width: calc(100% - 10px);
		}
		nav {
			display: grid; 
			grid-template-columns: 1fr;
			grid-template-rows: repeat(5, 25px);
		}
	}
	@media (max-width: 1300px) {
		nav {
			border-top: 1px solid #e1e1e1;
			justify-content: center;
			font-size: 1rem;
		}
	}
</style>

<!-- <div class="nav-container"> -->
<nav>
			<!-- <a
				aria-current={segment === undefined ? 'page' : undefined}
				href="/">home</a>
			<a
				aria-current={segment === 'helps' ? 'page' : undefined}
				href="/getting-started-with-elder.js">helps</a> -->
			<a
				aria-current={segment === 'assessment' ? 'page' : undefined}
				href="/coalition-self-assessment-tool/">assessment tooling</a>


		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->

			<a
				aria-current={segment === 'board' ? 'page' : undefined}
				href="/protecting-your-nonprofit-corporation/">board materials</a>
			<a
				aria-current={segment === 'grant' ? 'page' : undefined}
				href="/how-to-win-grants-for-a-fraction-of-the-cost-finally/">grant writers</a>
			<a
				aria-current={segment === 'prplan' ? 'page' : undefined}
				href="/public-relations-plan/">public relations plan</a>
			<a
				aria-current={segment === 'starting' ? 'page' : undefined}
				href="/starting-a-nonprofit-organization/">starting a non-profit</a>

</nav>
<!-- </div> -->