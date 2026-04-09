document.addEventListener('DOMContentLoaded', async () => {
  const postViewsEl = document.getElementById('gc-views');
  const totalVisitorsEl = document.getElementById('gc-total-visitors');
  const cardViewEls = document.querySelectorAll('.card-views');

  async function fetchCount(path) {
    const endpoint = 'https://seamspace.goatcounter.com/counter/' + encodeURIComponent(path) + '.json';
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('Failed to fetch views');
    const data = await res.json();
    return data.count || 0;
  }

  if (postViewsEl) {
    try {
      const count = await fetchCount(window.location.pathname);
      postViewsEl.textContent = count.toLocaleString();
    } catch (e) {
      postViewsEl.textContent = '—';
    }
  }

  if (cardViewEls.length) {
    for (const el of cardViewEls) {
      try {
        const path = el.getAttribute('data-path') || el.parentElement?.getAttribute('data-path');
        const count = await fetchCount(path);
        const target = el.querySelector('.gc-card-views');
        if (target) target.textContent = count.toLocaleString();
      } catch (e) {
        const target = el.querySelector('.gc-card-views');
        if (target) target.textContent = '—';
      }
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
