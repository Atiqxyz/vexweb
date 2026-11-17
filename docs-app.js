(() => {
  const pages = window.VEX_DOCS || {};
  const groups = [
    {title:"GETTING STARTED", items:[["overview","Overview"],["installation","Installation & setup"],["print","Print statements"]]},
    {title:"LANGUAGE BASICS", items:[["variables","Variables and bindings"],["types","Data types"],["expressions","Expressions and operators"],["functions","Functions"],["conditions","Conditions"],["loops","Loops and iteration"]]},
    {title:"DATA AND MEMORY", items:[["arrays","Arrays"],["structures","Structures"],["enums","Enums and match"],["pointers","Pointers"],["memory","Memory model"],["strings","Strings and text"]]},
    {title:"STANDARD LIBRARY", items:[["builtins","Built-in functions"],["collections","Collection functions"],["fileio","File I/O"],["binary","Binary data"]]},
    {title:"PRACTICAL GUIDES", items:[["examples","Real-world examples"],["syntax","Syntax and lexical rules"],["errors","Errors and diagnostics"],["compiler","Compiler and tools"],["status","What VEX supports today"]]}
  ];
  const nav = document.querySelector("#docs-navigation");
  const article = document.querySelector("#docs-article");
  const currentCrumb = document.querySelector("#current-crumb");
  const signature = document.querySelector("#topic-signature");
  const summary = document.querySelector("#topic-summary");
  const status = document.querySelector("#topic-status");
  const toc = document.querySelector("#article-toc");
  const search = document.querySelector("#docs-search");
  const hint = document.querySelector("#search-hint");
  const mobileToggle = document.querySelector("#docs-mobile-toggle");
  const sidebar = document.querySelector("#docs-sidebar");
  if (!nav || !article || !toc) return;

  const allItems = groups.flatMap(group => group.items);
  nav.innerHTML = groups.map(group => '<section class="sidebar-group"><div class="sidebar-group-title">' +
    group.title + '</div>' + group.items.map(([id,label]) =>
      '<button type="button" class="docs-nav-link" data-page="' + id + '" data-label="' + label.toLowerCase().replace(/"/g,'&quot;') +
      '" aria-current="false">' + label + '</button>').join("") + '</section>').join("");

  function makeToc() {
    const headings = [...article.querySelectorAll(".doc-section h2")];
    if (!headings.length) {
      toc.innerHTML = '<span class="toc-empty">No section list for this page.</span>';
      return;
    }
    headings.forEach((heading,index) => {
      const section = heading.closest(".doc-section");
      if (!section.id) section.id = "section-" + index;
    });
    toc.innerHTML = headings.map((heading,index) =>
      '<a class="toc-link" href="#' + heading.closest(".doc-section").id + '">' + heading.textContent + '</a>').join("");
    toc.querySelectorAll("a").forEach(link => link.addEventListener("click",event => {
      event.preventDefault();
      const section = article.querySelector(link.getAttribute("href"));
      if (section) section.scrollIntoView({behavior:"smooth",block:"start"});
      toc.querySelectorAll("a").forEach(item => item.classList.toggle("active",item===link));
    }));
  }

  function openPage(id, options={}) {
    const page = pages[id];
    if (!page) return;
    article.setAttribute("aria-busy","true");
    article.innerHTML = page.body;
    article.setAttribute("aria-busy","false");
    currentCrumb.textContent = page.crumb || page.title;
    signature.textContent = page.signature || page.title;
    summary.textContent = page.summary || "";
    status.textContent = page.status || "Experimental";
    nav.querySelectorAll("[data-page]").forEach(button => {
      const active = button.dataset.page === id;
      button.classList.toggle("active",active);
      button.setAttribute("aria-current",active ? "page" : "false");
    });
    makeToc();
    if (options.mobile && mobileToggle && sidebar) {
      mobileToggle.setAttribute("aria-expanded","false");
      sidebar.classList.remove("is-open");
    }
    if (options.focusArticle && window.matchMedia && window.matchMedia("(max-width: 760px)").matches) {
      article.scrollIntoView({behavior:"smooth",block:"start"});
    }
  }

  nav.addEventListener("click",event => {
    const button = event.target.closest("[data-page]");
    if (button) openPage(button.dataset.page,{mobile:true,focusArticle:true});
  });
  article.addEventListener("click",event => {
    const button = event.target.closest("[data-page]");
    if (button) openPage(button.dataset.page,{focusArticle:true});
  });

  function filterTopics() {
    const query = (search?.value || "").trim().toLowerCase();
    let shown = 0;
    nav.querySelectorAll(".sidebar-group").forEach((group,index) => {
      const buttons = [...group.querySelectorAll("[data-page]")];
      let groupShown = 0;
      buttons.forEach(button => {
        const page = pages[button.dataset.page] || {};
        const haystack = [
          button.textContent, button.dataset.label, page.title, page.crumb,
          page.summary, page.signature, page.body
        ].join(" ").toLowerCase();
        const visible = !query || haystack.includes(query);
        button.hidden = !visible;
        if (visible) groupShown++;
      });
      group.hidden = groupShown === 0;
      shown += groupShown;
    });
    if (hint) hint.textContent = query ? (shown + " matching topic" + (shown===1?"":"s") + " · click to open") : "Select a topic. The article changes here without a full-page jump.";
  }
  if (search) {
    search.addEventListener("input",filterTopics);
    search.addEventListener("keydown",event => {
      if (event.key === "Escape") {
        search.value = "";
        filterTopics();
        search.blur();
      } else if (event.key === "Enter") {
        const first = nav.querySelector(".sidebar-group:not([hidden]) [data-page]:not([hidden])");
        if (first) openPage(first.dataset.page,{mobile:true,focusArticle:true});
      }
    });
  }
  document.addEventListener("keydown",event => {
    if (event.key === "/" && !event.ctrlKey && !event.metaKey &&
        !["INPUT","TEXTAREA"].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      search?.focus();
    }
  });
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click",() => {
      const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded",String(!expanded));
      sidebar.classList.toggle("is-open",!expanded);
    });
  }
  article.addEventListener("click",async event => {
    const button = event.target.closest(".copy-code");
    if (!button) return;
    const code = document.getElementById(button.dataset.copy);
    if (!code) return;
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(code.innerText);
      button.textContent = "Copied";
      window.setTimeout(() => button.textContent = original,1300);
    } catch {
      button.textContent = "Copy unavailable";
      window.setTimeout(() => button.textContent = original,1600);
    }
  });
  openPage("overview");
})();