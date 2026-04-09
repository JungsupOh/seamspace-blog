/**
 * seamspace Blog OG Embed Helper
 * 
 * Usage on www.seamspace.site:
 * 
 * <div class="blog-embed" data-blog-url="https://blog.seamspace.site/ko/2026/04/09/post-slug/"></div>
 * <script src="https://blog.seamspace.site/assets/embed-helper.js"></script>
 * 
 * Or fetch OG data via API:
 * const og = await seamspaceBlog.fetchOG('https://blog.seamspace.site/ko/...');
 * // { title, description, image, url }
 */

const seamspaceBlog = {
  // Fetch OG tags from a blog post URL (requires CORS proxy or same-origin)
  async fetchOG(url) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      return {
        title: doc.querySelector('meta[property="og:title"]')?.content || '',
        description: doc.querySelector('meta[property="og:description"]')?.content || '',
        image: doc.querySelector('meta[property="og:image"]')?.content || '',
        url: doc.querySelector('meta[property="og:url"]')?.content || url,
      };
    } catch (e) {
      console.error('Failed to fetch OG data:', e);
      return null;
    }
  },

  // Render a blog card into a container element
  renderCard(container, og) {
    if (!og) return;
    container.innerHTML = `
      <a href="${og.url}" class="seamspace-blog-card" target="_blank" rel="noopener" style="
        display: flex; flex-direction: column; border-radius: 12px; overflow: hidden;
        border: 1px solid #E8E5F0; text-decoration: none; color: inherit;
        transition: box-shadow 0.3s; max-width: 400px;
      ">
        ${og.image ? `<img src="${og.image}" alt="${og.title}" style="width:100%;aspect-ratio:16/9;object-fit:cover;">` : ''}
        <div style="padding: 16px;">
          <h3 style="margin:0 0 8px; font-size:16px; font-weight:600; color:#1A1A2E;">${og.title}</h3>
          <p style="margin:0; font-size:14px; color:#555570; line-height:1.5;">${og.description}</p>
        </div>
      </a>
    `;
  },

  // Auto-init: find all [data-blog-url] elements and render cards
  async init() {
    const embeds = document.querySelectorAll('[data-blog-url]');
    for (const el of embeds) {
      const url = el.dataset.blogUrl;
      if (url) {
        const og = await this.fetchOG(url);
        this.renderCard(el, og);
      }
    }
  }
};

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => seamspaceBlog.init());
} else {
  seamspaceBlog.init();
}
