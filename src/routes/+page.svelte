<script lang="ts">
	import LegacyPage from '$lib/components/LegacyPage.svelte';
	import bodyHtml from '$lib/legacy/bodies/index.html?raw';

	const page = {
		title: "Over the Top (OTT) - Pioneering Digital Innovation for Transformative Business Success",
		description: "Welcome to Over the Top (OTT): Your One-Stop Shop for Cutting-Edge Partnerships",
		keywords: "Marketing, cyber-security, affiliates, reputation, public relations, business, artificial intelligence, platforms, finance, voip, government solutions, Revolutionizing Marketing Strategies for Unmatched Growth, Comprehensive Cybersecurity Solutions for a Safer Tomorrow, Harnessing the Power of AI for Business Excellence, Innovative Financial Solutions Tailored for Your Needs, Advanced VoIP Services for Seamless Communication, Expert Public Relations for Enhanced Brand Visibility, Scaling Your Business from 1x to 100x with OTT's Expertise, Empowering Global Enterprises with Unparalleled Strategies, OTT's Unique Approach to Digital Innovation, Our Commitment to Transformative Success, Explore Our Cohesive Platform of Services, Why Choose OTT for Your Business Growth?, Success Stories: Businesses Transformed by OTT",
		bodyClass: "intro body",
		styles: ["/odometer/odometer.css", "/styles/core.css", "/styles/home.css", "/styles/custom-header.css", "/styles/global-menu.css", "/styles/button.css", "/styles/custom.css"],
		plainScripts: ["/odometer/odometer.js", "/assets/contact.js"],
		moduleScripts: ["/src/lib/legacy/scripts/home/home.js"]
	};
</script>

<LegacyPage {bodyHtml} {...page} />
