document.addEventListener('DOMContentLoaded', async () => {
  const el = document.getElementById('gc-views');
  if (!el) return;

  try {
    const path = window.location.pathname;
    const endpoint = 'https://seamspace.goatcounter.com/counter/' + encodeURIComponent(path) + '.json';
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('Failed to fetch views');
    const data = await res.json();
    el.textContent = (data.count || 0).toLocaleString();
  } catch (e) {
    el.textContent = '—';
  }
});
