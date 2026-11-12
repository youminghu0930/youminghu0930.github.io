import { installNavigation } from './navigation.js';
const el = (tag, text, className) => { const n = document.createElement(tag); if (text) n.textContent = text; if (className) n.className = className; return n; };
const link = (label, url, className) => { const n = el('a', label, className); n.href = url; return n; };
async function render() {
  const response = await fetch('materials/content.json');
  if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
  const { page, sections } = await response.json();
  document.title = page.title;
  document.querySelector('meta[name="description"]').content = page.description;
  const backdrop = el('div', '', 'navigation-backdrop'); backdrop.setAttribute('aria-hidden', 'true');
  const toggle = el('button', '', 'navigation-toggle'); toggle.type = 'button'; toggle.title = 'Toggle section navigation'; toggle.setAttribute('aria-label', 'Toggle section navigation'); toggle.setAttribute('aria-controls', 'section-navigation'); toggle.setAttribute('aria-expanded', 'true');
  const icon = el('span', '', 'menu-icon'); icon.setAttribute('aria-hidden', 'true'); icon.append(el('span'), el('span'), el('span')); toggle.append(icon);
  const header = el('header'); header.dataset.expanded = 'true';
  const nav = el('nav'); nav.id = 'section-navigation'; nav.setAttribute('aria-label', 'Personal page sections');
  for (const s of sections) nav.append(link(s.title, `#${s.id}`));
  nav.append(link(page.mainPage.label, page.mainPage.url, 'return-main-page')); header.append(nav);
  const main = el('main');
  const hero = el('div', '', 'hero'); hero.append(el('p', page.eyebrow, 'eyebrow'), el('h1', page.heading), el('p', page.intro, 'intro'), link(page.portfolioPage.label, page.portfolioPage.url)); main.append(hero);
  sections.forEach((s, i) => {
    const section = el('section'); section.id = s.id; section.setAttribute('aria-labelledby', `${s.id}-heading`);
    const heading = el('h2', s.title); heading.id = `${s.id}-heading`; section.append(heading);
    if (s.intro) section.append(el('p', s.intro, 'section-intro'));
    for (const p of s.paragraphs || []) section.append(el('p', p, 'body-copy'));
    if (s.items) { const grid = el('div', '', 'projects'); for (const item of s.items) { const article = el('article', '', 'project'); article.append(el('h3', item.title), el('p', item.text)); if (item.url) article.append(link(item.linkLabel, item.url)); grid.append(article); } section.append(grid); }
    if (s.links) { const links = el('div', '', 'links'); for (const l of s.links) links.append(link(l.label, l.url)); section.append(links); }
    main.append(section);
  });
  document.querySelector('#app').replaceChildren(backdrop, toggle, header, main); installNavigation();
}
render().catch(error => { console.error(error); const p = el('p', 'The page could not load. Please refresh and try again.'); p.setAttribute('role', 'alert'); document.querySelector('#app').replaceChildren(p); });
