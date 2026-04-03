<script lang="ts">
	import LegacyPage from '$lib/components/LegacyPage.svelte';
	import bodyHtml from '$lib/legacy/bodies/error/index.html?raw';

	const page = {
		title: "Page Title",
		description: "Page Title",
		keywords: "",
		bodyClass: "",
		styles: ["../styles/core.css", "../styles/home.css"],
		plainScripts: [],
		moduleScripts: ["/src/lib/legacy/scripts/home/home.js"]
	};
</script>

<LegacyPage {bodyHtml} {...page} />
