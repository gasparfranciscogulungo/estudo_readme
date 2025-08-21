// Copiar conteúdo dos blocos de código
document.addEventListener('click', async (e) => {
	const btn = e.target.closest('.copy-btn');
	if (!btn) return;
	const wrapper = btn.parentElement;
	const code = wrapper.querySelector('pre');
	if (!code) return;
	try {
		await navigator.clipboard.writeText(code.innerText);
		const original = btn.textContent;
		btn.textContent = 'Copiado!';
		setTimeout(() => (btn.textContent = original), 1200);
	} catch (err) {
		console.error('Falha ao copiar', err);
	}
});

// Ano atual no rodapé
document.addEventListener('DOMContentLoaded', () => {
	const y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear();
});

// Menu mobile: abrir/fechar
document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.site-header');
	const toggle = document.querySelector('.nav-toggle');
	const nav = document.getElementById('primary-nav');
	if (!header || !toggle || !nav) return;

	const closeMenu = () => {
		header.setAttribute('data-menu', 'closed');
		toggle.setAttribute('aria-expanded', 'false');
	};
	const openMenu = () => {
		header.setAttribute('data-menu', 'open');
		toggle.setAttribute('aria-expanded', 'true');
	};

	closeMenu();

	toggle.addEventListener('click', () => {
		const isOpen = header.getAttribute('data-menu') === 'open';
		isOpen ? closeMenu() : openMenu();
	});

	// Fechar ao clicar fora ou em links
	document.addEventListener('click', (e) => {
		if (e.target.closest('.nav-toggle')) return;
		if (e.target.closest('#primary-nav a')) { closeMenu(); return; }
		if (!e.target.closest('#primary-nav') && header.getAttribute('data-menu') === 'open') {
			closeMenu();
		}
	});
});

// Ocultar/mostrar header conforme direção do scroll (mobile e desktop)
(() => {
	let lastY = window.scrollY;
	const header = document.querySelector('.topbar') || document.querySelector('.site-header');
	if (!header) return;
	const threshold = 8; // evita jitter

	const onScroll = () => {
		const y = window.scrollY;
		const goingDown = y > lastY + threshold;
		const goingUp = y < lastY - threshold;

		if (goingDown) header.setAttribute('data-scroll', 'unpinned');
		else if (goingUp) header.setAttribute('data-scroll', 'pinned');

		lastY = y;
	};

	let ticking = false;
	window.addEventListener('scroll', () => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				onScroll();
				ticking = false;
			});
			ticking = true;
		}
	}, { passive: true });
})();

// Renderizar o guia em Markdown e ajustar links para preview no GitHub
document.addEventListener('DOMContentLoaded', () => {
	const src = document.getElementById('md-source');
	const out = document.getElementById('doc');
	if (!src || !out || typeof marked === 'undefined') return;

	// Configuração básica do marked
	marked.setOptions({
		breaks: false,
		gfm: true,
		headerIds: true,
		mangle: false
	});

	const raw = src.textContent || src.innerText || '';
	out.innerHTML = marked.parse(raw);

	// Geração de IDs previsíveis para títulos (caso o renderer não aplique)
	const slug = (s) => s
		.toLowerCase()
		.trim()
		.replace(/[`~!@#$%^&*()_+={[}\]|\\:;"'<>?,./]+/g, '')
		.replace(/\s+/g, '-');

	out.querySelectorAll('h1, h2, h3').forEach((h) => {
		if (!h.id) {
			const txt = h.textContent || '';
			h.id = slug(txt);
		}
	});

	// Construir TOC
	const toc = document.getElementById('toc');
	if (toc) {
		const items = Array.from(out.querySelectorAll('h1, h2, h3'))
			.filter(h => h.tagName !== 'H1'); // pula H1 do topo no TOC
		const ul = document.createElement('ul');
		ul.className = 'toc-list';
		const title = document.createElement('div');
		title.className = 'toc-title';
		title.textContent = 'Sumário';
		toc.appendChild(title);
		items.forEach(h => {
			const li = document.createElement('li');
			const level = h.tagName === 'H2' ? 2 : h.tagName === 'H3' ? 3 : 1;
			li.className = `toc-item level-${level}`;
			const a = document.createElement('a');
			a.href = `#${h.id}`;
			a.textContent = h.textContent || '';
			li.appendChild(a);
			ul.appendChild(li);
		});
		toc.appendChild(ul);
	}

	// Scroll suave manual para compensar header sticky (offset)
	const smoothTo = (id) => {
		const el = document.getElementById(id);
		if (!el) return;
		const header = document.querySelector('.topbar');
		const offset = header ? header.offsetHeight + 8 : 0;
		const top = el.getBoundingClientRect().top + window.scrollY - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	};

	document.addEventListener('click', (e) => {
		const a = e.target.closest('a[href^="#"]');
		if (!a) return;
		const id = a.getAttribute('href').slice(1);
		if (!id) return;
		e.preventDefault();
		smoothTo(id);
		// Fechar TOC no mobile
		const toc = document.getElementById('toc');
		if (toc && toc.classList.contains('open')) {
			const btn = document.getElementById('toc-toggle');
			if (btn) btn.setAttribute('aria-expanded', 'false');
			toc.classList.remove('open');
		}
	});

	// Scrollspy: destacar seção ativa
	const tocLinks = Array.from(document.querySelectorAll('#toc a[href^="#"]'));
	if (tocLinks.length) {
		const headings = tocLinks
			.map(a => document.getElementById(a.getAttribute('href').slice(1)))
			.filter(Boolean);
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				const id = entry.target.id;
				const link = tocLinks.find(a => a.getAttribute('href') === `#${id}`);
				if (!link) return;
				if (entry.isIntersecting) {
					tocLinks.forEach(l => l.classList.remove('active'));
					link.classList.add('active');
				}
			});
		}, { rootMargin: '0px 0px -70% 0px', threshold: 0.1 });

		headings.forEach(h => observer.observe(h));
	}

	// Toggle do TOC no mobile
	const tocBtn = document.getElementById('toc-toggle');
	if (tocBtn) {
		const tocEl = document.getElementById('toc');
		tocBtn.addEventListener('click', () => {
			if (!tocEl) return;
			const open = tocEl.classList.toggle('open');
			tocBtn.setAttribute('aria-expanded', String(open));
		});
	}

	// Reescrever links .md e assets para o preview no GitHub
	const baseRepo = 'https://github.com/gasparfranciscogulungo/estudo_readme';
	const branch = 'master';

	// Âncoras
	out.querySelectorAll('a[href]').forEach((a) => {
		const href = a.getAttribute('href');
		if (!href) return;
		// Links internos de hash: mantém
		if (href.startsWith('#')) return;

		// Se for relativo a .md/.mdx → enviar para blob/master
		const isMd = /\.mdx?$/i.test(href);
		const isRelative = !/^https?:\/\//i.test(href) && !href.startsWith('mailto:');

		if (isMd && isRelative) {
			// normaliza ./path -> path
			const path = href.replace(/^\.\//, '');
			a.setAttribute('href', `${baseRepo}/blob/${branch}/${path}`);
			a.setAttribute('target', '_blank');
			a.setAttribute('rel', 'noopener');
			return;
		}

		// Outros relativos (imagens, etc.) que não são .md → apontar para raw
		if (isRelative) {
			const path = href.replace(/^\.\//, '');
			a.setAttribute('href', `${baseRepo}/raw/${branch}/${path}`);
			a.setAttribute('target', '_blank');
			a.setAttribute('rel', 'noopener');
		}
	});

	// Imagens: se relativo, usar raw
	out.querySelectorAll('img[src]').forEach((img) => {
		const src = img.getAttribute('src');
		if (!src) return;
		const isRelative = !/^https?:\/\//i.test(src);
		if (isRelative) {
			const path = src.replace(/^\.\//, '');
			img.setAttribute('src', `${baseRepo}/raw/${branch}/${path}`);
		}
	});
});
