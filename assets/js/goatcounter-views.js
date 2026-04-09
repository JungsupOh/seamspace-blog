document.addEventListener('DOMContentLoaded', async () => {
  const postViewsEl = document.getElementById('gc-views');
  const totalVisitorsEl = document.getElementById('gc-total-visitors');

  if (postViewsEl) {
    try {
      const path = window.location.pathname;
      const endpoint = 'https://seamspace.goatcounter.com/counter/' + encodeURIComponent(path) + '.json';
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Failed to fetch views');
      const data = await res.json();
      postViewsEl.textContent = (data.count || 0).toLocaleString();
    } catch (e) {
      postViewsEl.textContent = '—';
    }
  }

  if (totalVisitorsEl) {
    try {
      const res = await fetch('https://seamspace.goatcounter.com/api/v0/stats/total');
      if (!res.ok) throw new Error('Failed to fetch total visitors');
      const data = await res.json();
      const total = data.count || data.total || data.hits || 0;
      totalVisitorsEl.textContent = total.toLocaleString();
    } catch (e) {
      totalVisitorsEl.textContent = '—';
    }
  }
});
