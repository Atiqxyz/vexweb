const menuButton=document.querySelector(".menu-toggle");const navigation=document.querySelector("#primary-nav");if(menuButton&&navigation){menuButton.addEventListener("click",()=>{const open=menuButton.getAttribute("aria-expanded")==="true";menuButton.setAttribute("aria-expanded",String(!open));menuButton.setAttribute("aria-label",open?"Open navigation":"Close navigation");navigation.classList.toggle("is-open",!open)});navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","Open navigation");navigation.classList.remove("is-open")}));}
const year=document.querySelector("#year");if(year)year.textContent=String(new Date().getFullYear());
const docsToggle=document.querySelector("#docs-mobile-toggle");const docsSidebar=document.querySelector("#docs-sidebar");if(docsToggle&&docsSidebar){docsToggle.addEventListener("click",()=>{const open=docsToggle.getAttribute("aria-expanded")==="true";docsToggle.setAttribute("aria-expanded",String(!open));docsSidebar.classList.toggle("is-open",!open)});docsSidebar.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{docsToggle.setAttribute("aria-expanded","false");docsSidebar.classList.remove("is-open")}));}
const search=document.querySelector("#docs-search");if(search){const links=[...document.querySelectorAll(".docs-nav-link")];const groups=[...document.querySelectorAll(".docs-nav-group")];const sections=[...document.querySelectorAll(".doc-section")];search.addEventListener("input",()=>{const q=search.value.trim().toLowerCase();links.forEach(link=>{const target=document.querySelector(link.getAttribute("href"));const haystack=(link.textContent+" "+(target?.innerText||"")).toLowerCase();link.hidden=!!q&&!haystack.includes(q)});groups.forEach(group=>{const visible=[...group.querySelectorAll(".docs-nav-link")].some(link=>!link.hidden);group.hidden=!!q&&!visible;if(q&&visible)group.open=true;});sections.forEach(section=>{section.hidden=!!q&&!section.innerText.toLowerCase().includes(q)});});search.addEventListener("keydown",event=>{if(event.key==="Escape"){search.value="";search.dispatchEvent(new Event("input"));search.blur();}});document.addEventListener("keydown",event=>{if(event.key==="/"&&!event.ctrlKey&&!event.metaKey&&!["INPUT","TEXTAREA"].includes(document.activeElement?.tagName)){event.preventDefault();search.focus();}});}
document.querySelectorAll(".copy-code").forEach(button=>button.addEventListener("click",async()=>{const target=document.getElementById(button.dataset.copy);if(!target)return;try{await navigator.clipboard.writeText(target.innerText);button.textContent="Copied";setTimeout(()=>button.textContent="Copy",1400);}catch{button.textContent="Select code";}}));
const sections=[...document.querySelectorAll(".doc-section, #overview")];const tocLinks=[...document.querySelectorAll(".toc-link")];const sideLinks=[...document.querySelectorAll(".docs-nav-link")];if("IntersectionObserver"in window&&sections.length){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const id=entry.target.id;tocLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+id));sideLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+id));});},{rootMargin:"-18% 0px -72% 0px"});sections.forEach(section=>observer.observe(section));}

/* Site-wide persistent light/dark theme */
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const meta = document.querySelector('meta[name="theme-color"]');
  const stored = (() => { try { return localStorage.getItem("vex-theme"); } catch { return null; } })();
  const initial = stored === "dark" || stored === "light" ? stored : "light";
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    if (meta) meta.setAttribute("content", dark ? "#111410" : "#10110f");
    if (toggle) {
      toggle.innerHTML = dark
        ? '<span class="theme-icon" aria-hidden="true">☀</span><span>Light mode</span>'
        : '<span class="theme-icon" aria-hidden="true">☾</span><span>Dark mode</span>';
      toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
    }
  }
  applyTheme(initial);
  if (toggle) toggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("vex-theme", next); } catch {}
    applyTheme(next);
  });
})();
