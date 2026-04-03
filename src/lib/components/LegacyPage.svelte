<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { onDestroy, onMount, tick } from 'svelte';

	type LegacyPageProps = {
		title: string;
		description?: string;
		keywords?: string;
		bodyClass?: string;
		styles?: string[];
		plainScripts?: string[];
		moduleScripts?: string[];
		bodyHtml: string;
	};

	let {
		title,
		description = '',
		keywords = '',
		bodyClass = '',
		styles = [],
		plainScripts = [],
		moduleScripts = [],
		bodyHtml
	}: LegacyPageProps = $props();

	type LegacyModule = {
		default?: () => void | (() => void);
	};

	type InlineScript = {
		content?: string;
		src?: string;
		type?: string;
	};

	const moduleRegistry = import.meta.glob<LegacyModule>('/src/lib/legacy/scripts/**/*.{js,ts}');
	const appendedScripts: HTMLScriptElement[] = [];
	const disposers: Array<() => void> = [];
	let previousBodyClass = '';

	function withBase(path: string) {
		if (!base) return path;
		if (path.startsWith('/')) {
			if (path.startsWith(`${base}/`) || path === base) return path;
			return `${base}${path}`;
		}
		if (/^(?:\.\.\/|\.\/)+(assets|videos|images|icons|logos|audio|favicon|odometer|styles)\//.test(path)) {
			return `${base}/${path.replace(/^(?:\.\.\/|\.\/)+/, '')}`;
		}
		return path;
	}

	function rewriteAssetPath(path: string) {
		return withBase(path);
	}

	function rewriteBodyHtml(html: string) {
		if (!base) return html;

		return html
			.replace(/\b(href|src|poster|action)=(['"])(\/|(?:\.\.\/|\.\/)+(?:assets|videos|images|icons|logos|audio|favicon|odometer|styles)\/)/g, (_match, attr, quote, pathStart) => {
				const rewritten = pathStart.startsWith('/') ? withBase(pathStart) : rewriteAssetPath(pathStart);
				return `${attr}=${quote}${rewritten}`;
			})
			.replace(/\b(srcset)=(['"])(.*?)\2/g, (_match, attr, quote, value) => {
				const rewritten = String(value)
					.split(',')
					.map((entry) => {
						const trimmed = entry.trim();
						const firstSpace = trimmed.indexOf(' ');
						const rawPath = firstSpace === -1 ? trimmed : trimmed.slice(0, firstSpace);
						const rest = firstSpace === -1 ? '' : trimmed.slice(firstSpace);
						const nextPath = rewriteAssetPath(rawPath);
						return nextPath === rawPath ? trimmed : `${nextPath}${rest}`;
					})
					.join(', ');
				return `${attr}=${quote}${rewritten}${quote}`;
			});
	}

	function extractBodyScripts(html: string) {
		const scripts: InlineScript[] = [];
		const stripped = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_match, attrs = '', content = '') => {
			const srcMatch = attrs.match(/\bsrc=(['"])(.*?)\1/i);
			const typeMatch = attrs.match(/\btype=(['"])(.*?)\1/i);

			scripts.push({
				src: srcMatch ? withBase(srcMatch[2]) : undefined,
				type: typeMatch ? typeMatch[2] : undefined,
				content: srcMatch ? undefined : content.trim()
			});

			return '';
		});

		return {
			html: rewriteBodyHtml(stripped),
			scripts
		};
	}

	function getResolvedStyles() {
		return styles.map(withBase);
	}

	function getResolvedPlainScripts() {
		return plainScripts.map(withBase);
	}

	function getResolvedBodyHtml() {
		return extractBodyScripts(bodyHtml).html;
	}

	function getInlineBodyScripts() {
		return extractBodyScripts(bodyHtml).scripts;
	}

	function loadExternalScript(src: string, type?: string) {
		return new Promise<void>((resolve, reject) => {
			if (!browser) {
				resolve();
				return;
			}

			if (document.querySelector(`script[src="${src}"]`)) {
				resolve();
				return;
			}

			const script = document.createElement('script');
			script.src = src;
			script.async = false;
			if (type) script.type = type;
			script.onload = () => resolve();
			script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
			document.body.appendChild(script);
			appendedScripts.push(script);
		});
	}

	async function runInlineBodyScript(scriptDef: InlineScript) {
		if (scriptDef.src) {
			await loadExternalScript(scriptDef.src, scriptDef.type);
			return;
		}

		if (!scriptDef.content?.trim()) return;

		const script = document.createElement('script');
		if (scriptDef.type) script.type = scriptDef.type;
		script.textContent = scriptDef.content;
		document.body.appendChild(script);
		appendedScripts.push(script);
	}

	onMount(async () => {
		previousBodyClass = document.body.className;
		document.body.className = bodyClass;
		(window as Window & { __OTT_BASE__?: string }).__OTT_BASE__ = base;

		await tick();

		document.querySelectorAll('a[href^="/"]').forEach((link) => {
			if (!link.hasAttribute('data-sveltekit-reload')) {
				link.setAttribute('data-sveltekit-reload', '');
			}
		});

		for (const src of getResolvedPlainScripts()) {
			await loadExternalScript(src);
		}

		for (const scriptDef of getInlineBodyScripts()) {
			await runInlineBodyScript(scriptDef);
		}

		for (const key of moduleScripts) {
			const loader = moduleRegistry[key];
			if (!loader) {
				console.warn('Legacy module not found:', key);
				continue;
			}

			const loaded = (await loader()) as LegacyModule;
			const maybeDispose = typeof loaded.default === 'function' ? loaded.default() : undefined;
			if (typeof maybeDispose === 'function') {
				disposers.push(maybeDispose);
			}
		}
	});

	onDestroy(() => {
		if (!browser) return;
		document.body.className = previousBodyClass;
		disposers.splice(0).reverse().forEach((dispose) => dispose());
		appendedScripts.splice(0).forEach((script) => script.remove());
	});
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
		<meta name="twitter:description" content={description} />
	{/if}
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}
		<meta property="og:title" content={title} />
		<meta name="twitter:title" content={title} />
	{#each getResolvedStyles() as href}
		<link rel="stylesheet" href={href} />
	{/each}
</svelte:head>

<div class="min-h-screen">
	{@html getResolvedBodyHtml()}
</div>
