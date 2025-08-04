<script lang="ts">
	import { renderSVG } from 'uqr';

	const svg = renderSVG('https://popquiz.pezenasentransition.org/', {
		ecc: 'H',
		border: 2,
		pixelSize: 0.5
	});
</script>
<p>L'évenement va bientôt commencer</p>
<p>Pour participer: connectez-vous sur <a
	href="https://popquiz.pezenasentransition.org">popquiz.pezenasentransition.org</a></p>
<div class="svg-wrapper">
	{@html svg}
</div>


<style lang="scss">
  p {
		font-size: 1.5rem;
    text-align: center;
  }

  .svg-wrapper {
		flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    :global(svg) {
      aspect-ratio: 1;
			width: 100%;
      max-width: 500px;
    }
  }
</style>
