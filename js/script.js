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
