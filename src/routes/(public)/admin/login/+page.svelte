<script lang="ts">
	import { enhance }         from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<main class="floral">
	<form method="post" action="?/login" use:enhance>
		<h1>Identification</h1>
		<label>
			Nom d'utilisateur
			<input name="username" />
		</label>
		<label>
			Mot de passe
			<input type="password" name="password" />
		</label>
		<p style="color: red">{form?.message ?? ''}</p>

		<div class="actions">
			<button>Se connecter</button>
			<button formaction="?/register">Créer un compte</button>
		</div>
	</form>
</main>

<style lang="scss">
  :global(header:has(~main.floral)) {
    visibility: hidden;
  }

  :global(body:has(main.floral)) {
    background: url(https://pezenasentransition.org/admin/images/bglog/bglog1.jpg) no-repeat center;
    background-size: cover;
  }

  main {
    align-content: center;
    translate: 0 -50px;
  }

  form {
    max-width: 500px;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 22px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0 auto;
    border: 0;
    border-radius: 0.5rem;
    padding: 1rem;

    label {
      display: flex;
      flex-direction: column;
    }
  }

  .actions {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
</style>
