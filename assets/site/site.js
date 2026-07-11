(() => {
  const links = Array.from(document.querySelectorAll(".site-header nav a"));
  if (!links.length) return;

  const normalize = (url) => new URL(url, window.location.href);
  const clearActive = () => {
    links.forEach((link) => {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    });
  };
  const setActive = (link, current = "page") => {
    clearActive();
    link.classList.add("is-active");
    link.setAttribute("aria-current", current);
  };

  const pathLinks = links.filter((link) => !normalize(link.href).hash);
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  const pageMatch = pathLinks.find((link) => {
    const linkPath = normalize(link.href).pathname.replace(/\/index\.html$/, "/");
    return linkPath === currentPath;
  });

  if (pageMatch) {
    setActive(pageMatch);
    return;
  }

  const sectionLinks = links
    .map((link) => ({ link, url: normalize(link.href) }))
    .filter(({ url }) => url.pathname.replace(/\/index\.html$/, "/") === currentPath && url.hash);

  if (!sectionLinks.length) return;

  const byId = new Map(sectionLinks.map(({ link, url }) => [url.hash.slice(1), link]));
  const sections = Array.from(byId.keys())
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) {
    setActive(sectionLinks[0].link, "location");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(byId.get(visible.target.id), "location");
    },
    { rootMargin: "-28% 0px -58% 0px", threshold: [0.15, 0.35, 0.6] }
  );

  sections.forEach((section) => observer.observe(section));
  setActive(sectionLinks[0].link, "location");
})();
