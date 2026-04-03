<script lang="ts">
	import LegacyPage from '$lib/components/LegacyPage.svelte';
	import bodyHtml from '$lib/legacy/bodies/social-media.html?raw';

	const page = {
		title: "OTT - Social Media",
		description: "",
		keywords: "",
		bodyClass: "",
		styles: ["/styles/custom-header.css", "/styles/button.css", "/styles/custom-reset.css", "/styles/global-menu.css", "/styles/common.css", "/styles/social-media.css", "/styles/social-media-mobile.css", "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css", "/styles/custom.css"],
		plainScripts: ["https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js", "/assets/contact.js"],
		moduleScripts: ["/src/lib/legacy/scripts/custom-scripts/smoother.js", "/src/lib/legacy/scripts/custom-scripts/rotation-loop-animation.js", "/src/lib/legacy/scripts/custom-scripts/menu-animation.js", "/src/lib/legacy/scripts/home/sponsors.js", "/src/lib/legacy/scripts/home/toform.js", "/src/lib/legacy/scripts/home/audio.js", "/src/lib/legacy/scripts/common/support_button.js", "/src/lib/legacy/scripts/custom-scripts/header-animation.js", "/src/lib/legacy/scripts/custom-scripts/slider-mobile-1.js"]
	};
</script>

<LegacyPage {bodyHtml} {...page} />
