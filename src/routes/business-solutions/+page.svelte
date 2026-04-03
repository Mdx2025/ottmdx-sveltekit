<script lang="ts">
	import LegacyPage from '$lib/components/LegacyPage.svelte';
	import bodyHtml from '$lib/legacy/bodies/business-solutions.html?raw';

	const page = {
		title: "OTT - Business Solutions",
		description: "",
		keywords: "",
		bodyClass: "",
		styles: ["/styles/custom-header.css", "/styles/button.css", "/styles/custom-reset.css", "/styles/global-menu.css", "/styles/common.css", "/styles/business-solutions.css", "/styles/business-solutions-mobile.css", "/styles/custom.css"],
		plainScripts: ["/assets/contact.js"],
		moduleScripts: ["/src/lib/legacy/scripts/custom-scripts/smoother.js", "/src/lib/legacy/scripts/custom-scripts/rotation-loop-animation.js", "/src/lib/legacy/scripts/custom-scripts/menu-animation.js", "/src/lib/legacy/scripts/home/sponsors.js", "/src/lib/legacy/scripts/home/toform.js", "/src/lib/legacy/scripts/home/audio.js", "/src/lib/legacy/scripts/common/support_button.js", "/src/lib/legacy/scripts/custom-scripts/header-animation.js"]
	};
</script>

<LegacyPage {bodyHtml} {...page} />
