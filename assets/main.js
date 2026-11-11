/**
 * George Willis · Personal Portfolio & Spatial Engineering Platform
 * Zero-framework vanilla JavaScript architecture.
 * Features:
 *  - Native View Transitions (Feature 4)
 *  - FLIP Layout Morphing & Shared Element Expansion (Feature 2)
 *  - FLIP Project List Filtering & Reordering (Feature 3)
 *  - Scholarly BibTeX Archival Toggle & 1-Click Clipboard Copy (Feature 5)
 *  - Accessible Mobile Navigation & Keyboard Control
 */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ------------------------------------------------------------------ */
  /* 1. Mobile Navigation & Keyboard Trapping                           */
  /* ------------------------------------------------------------------ */
  function initMobileNav() {
    var toggle = document.querySelector(".masthead__toggle");
    var nav = document.querySelector(".masthead__nav");
    if (!toggle || !nav) return;

    function closeMenu(restoreFocus) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      if (restoreFocus) toggle.focus();
    }

    // Clean up any old listeners if re-initialized
    if (toggle._hasNavInit) return;
    toggle._hasNavInit = true;

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu(true);
      }
    });

    if (window.matchMedia) {
      window.matchMedia("(max-width: 768px)").addEventListener("change", function () {
        closeMenu(false);
      });
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        closeMenu(false);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 2. FLIP Layout Morphing & Shared Element Expansion (Feature 2)     */
  /* ------------------------------------------------------------------ */
  var activeTrigger = null;

  function openTelemetryDrawer(drawerId, triggerEl) {
    var backdrop = document.getElementById(drawerId);
    if (!backdrop) return;
    var drawer = backdrop.querySelector(".telemetry-drawer");
    if (!drawer) return;

    activeTrigger = triggerEl;

    // 1. First: bounding box of originating element
    var originEl = triggerEl
      ? triggerEl.closest(".index-row, .featured-project, .research-card") || triggerEl
      : null;
    var firstRect = originEl
      ? originEl.getBoundingClientRect()
      : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 20, height: 20 };

    // 2. Mount/display modal
    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";

    // 3. Last: bounding box of destination dialog
    var lastRect = drawer.getBoundingClientRect();

    // 4. Invert: inverse matrix transform
    var deltaX = firstRect.left - lastRect.left;
    var deltaY = firstRect.top - lastRect.top;
    var scaleX = Math.max(0.08, firstRect.width / (lastRect.width || 1));
    var scaleY = Math.max(0.08, firstRect.height / (lastRect.height || 1));

    drawer.style.transformOrigin = "top left";
    drawer.style.transition = "none";
    drawer.style.transform =
      "translate3d(" + deltaX + "px, " + deltaY + "px, 0) scale(" + scaleX + ", " + scaleY + ")";
    drawer.style.opacity = "0.4";

    // 5. Play: GPU-accelerated smooth transition
    requestAnimationFrame(function () {
      drawer.offsetHeight; // Force reflow
      drawer.style.transition =
        "transform 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease";
      drawer.style.transform = "translate3d(0, 0, 0) scale(1)";
      drawer.style.opacity = "1";
    });

    // Focus close button for accessibility
    var closeBtn = drawer.querySelector(".telemetry-drawer__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeTelemetryDrawer(backdrop) {
    if (!backdrop || !backdrop.classList.contains("is-open")) return;
    var drawer = backdrop.querySelector(".telemetry-drawer");

    if (drawer && activeTrigger) {
      var closeOrigin =
        activeTrigger.closest(".index-row, .featured-project, .research-card") || activeTrigger;
      var firstRect = closeOrigin.getBoundingClientRect();
      var lastRect = drawer.getBoundingClientRect();
      var deltaX = firstRect.left - lastRect.left;
      var deltaY = firstRect.top - lastRect.top;
      var scaleX = Math.max(0.08, firstRect.width / (lastRect.width || 1));
      var scaleY = Math.max(0.08, firstRect.height / (lastRect.height || 1));

      drawer.style.transition =
        "transform 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease";
      drawer.style.transform =
        "translate3d(" + deltaX + "px, " + deltaY + "px, 0) scale(" + scaleX + ", " + scaleY + ")";
      drawer.style.opacity = "0";

      setTimeout(function () {
        backdrop.classList.remove("is-open");
        document.body.style.overflow = "";
        drawer.style.transform = "";
        drawer.style.transition = "";
        if (activeTrigger && typeof activeTrigger.focus === "function") {
          activeTrigger.focus();
        }
        activeTrigger = null;
      }, 280);
    } else {
      backdrop.classList.remove("is-open");
      document.body.style.overflow = "";
      if (activeTrigger && typeof activeTrigger.focus === "function") {
        activeTrigger.focus();
      }
      activeTrigger = null;
    }
  }

  function initTelemetryDrawers() {
    // Open triggers
    document.querySelectorAll("[data-drawer-trigger]").forEach(function (trigger) {
      if (trigger._hasDrawerInit) return;
      trigger._hasDrawerInit = true;

      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var drawerId = trigger.getAttribute("data-drawer-trigger");
        openTelemetryDrawer(drawerId, trigger);
      });
    });

    // Close triggers (buttons and backdrop click)
    document.querySelectorAll(".telemetry-backdrop").forEach(function (backdrop) {
      if (backdrop._hasBackdropInit) return;
      backdrop._hasBackdropInit = true;

      backdrop.addEventListener("click", function (e) {
        if (e.target === backdrop || e.target.closest(".telemetry-drawer__close")) {
          e.preventDefault();
          closeTelemetryDrawer(backdrop);
        }
      });
    });

    // Escape key closes open drawer
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var openBackdrop = document.querySelector(".telemetry-backdrop.is-open");
        if (openBackdrop) {
          closeTelemetryDrawer(openBackdrop);
        }
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 3. FLIP Project List Filtering & Reordering (Feature 3)            */
  /* ------------------------------------------------------------------ */
  function initProjectFilteringAndSorting() {
    var filterBar = document.querySelector("[data-filters]");
    var sortBar = document.querySelector("[data-sorts]");
    var listContainer = document.querySelector(".index-list");
    if (!listContainer || (!filterBar && !sortBar)) return;

    var filterButtons = filterBar ? filterBar.querySelectorAll("button[data-filter]") : [];
    var sortButtons = sortBar ? sortBar.querySelectorAll("button[data-sort]") : [];
    var allRows = Array.from(listContainer.querySelectorAll(".index-row"));

    var currentFilter = "all";
    var currentSort = "recommended";

    function applyFilterAndSortWithFLIP() {
      // 1. Record 'First' bounding boxes of currently visible rows
      var firstPositions = new Map();
      allRows.forEach(function (row) {
        if (row.style.display !== "none" && row.offsetParent !== null) {
          firstPositions.set(row, row.getBoundingClientRect());
        }
      });

      // Filter rows
      var matchingRows = [];
      allRows.forEach(function (row) {
        var cat = row.getAttribute("data-cat") || "";
        var cats = cat.split(/\s+/);
        var matches = currentFilter === "all" || cats.indexOf(currentFilter) !== -1;
        if (matches) {
          row.style.display = "";
          matchingRows.push(row);
        } else {
          row.style.display = "none";
        }
      });

      // Sort matching rows
      matchingRows.sort(function (a, b) {
        if (currentSort === "recency") {
          var yearA = parseInt(a.getAttribute("data-year") || "0", 10);
          var yearB = parseInt(b.getAttribute("data-year") || "0", 10);
          if (yearB !== yearA) return yearB - yearA;
          return (
            parseInt(a.getAttribute("data-order") || "999", 10) -
            parseInt(b.getAttribute("data-order") || "999", 10)
          );
        } else if (currentSort === "title") {
          var titleA = (a.querySelector("h3") ? a.querySelector("h3").textContent : "").trim().toLowerCase();
          var titleB = (b.querySelector("h3") ? b.querySelector("h3").textContent : "").trim().toLowerCase();
          return titleA.localeCompare(titleB);
        } else {
          // 'recommended' default order
          var orderA = parseInt(a.getAttribute("data-order") || "999", 10);
          var orderB = parseInt(b.getAttribute("data-order") || "999", 10);
          return orderA - orderB;
        }
      });

      // Re-append in sorted order
      matchingRows.forEach(function (row) {
        listContainer.appendChild(row);
      });

      // 2. Record 'Last' bounding boxes of now-visible rows
      var lastPositions = new Map();
      matchingRows.forEach(function (row) {
        lastPositions.set(row, row.getBoundingClientRect());
      });

      // 3. Invert & Play FLIP transition on surviving items
      matchingRows.forEach(function (row) {
        var first = firstPositions.get(row);
        var last = lastPositions.get(row);

        if (!first && last) {
          // Entering row: fade/slide in
          row.style.transition = "none";
          row.style.opacity = "0";
          row.style.transform = "translate3d(0, 12px, 0)";
          requestAnimationFrame(function () {
            row.offsetHeight; // reflow
            row.style.transition = "transform 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms ease";
            row.style.opacity = "1";
            row.style.transform = "translate3d(0, 0, 0)";
            setTimeout(function () {
              row.style.transition = "";
              row.style.transform = "";
              row.style.opacity = "";
            }, 400);
          });
        } else if (first && last) {
          var deltaY = first.top - last.top;
          if (Math.abs(deltaY) > 0.5) {
            row.style.transition = "none";
            row.style.transform = "translate3d(0, " + deltaY + "px, 0)";

            requestAnimationFrame(function () {
              row.offsetHeight; // reflow
              row.style.transition = "transform 380ms cubic-bezier(0.16, 1, 0.3, 1)";
              row.style.transform = "translate3d(0, 0, 0)";
            });

            var cleanup = function () {
              row.style.transition = "";
              row.style.transform = "";
              row.removeEventListener("transitionend", cleanup);
            };
            row.addEventListener("transitionend", cleanup);
          }
        }
      });
    }

    if (filterBar) {
      filterButtons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", btn.classList.contains("is-active") ? "true" : "false");
        btn.addEventListener("click", function () {
          filterButtons.forEach(function (b) {
            b.classList.remove("is-active");
            b.setAttribute("aria-pressed", "false");
          });
          btn.classList.add("is-active");
          btn.setAttribute("aria-pressed", "true");
          currentFilter = btn.getAttribute("data-filter") || "all";
          applyFilterAndSortWithFLIP();
        });
      });
    }

    if (sortBar) {
      sortButtons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", btn.classList.contains("is-active") ? "true" : "false");
        btn.addEventListener("click", function () {
          sortButtons.forEach(function (b) {
            b.classList.remove("is-active");
            b.setAttribute("aria-pressed", "false");
          });
          btn.classList.add("is-active");
          btn.setAttribute("aria-pressed", "true");
          currentSort = btn.getAttribute("data-sort") || "recommended";
          applyFilterAndSortWithFLIP();
        });
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* 4. Scholarly BibTeX Archival Toggle & 1-Click Copy (Feature 5)     */
  /* ------------------------------------------------------------------ */
  function initBibTeX() {
    // Toggle BibTeX block
    document.querySelectorAll("[data-bibtex-toggle]").forEach(function (btn) {
      if (btn._hasBibtexInit) return;
      btn._hasBibtexInit = true;

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var targetId = btn.getAttribute("data-bibtex-toggle");
        var box = document.getElementById(targetId);
        if (!box) return;

        var isOpen = box.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        btn.textContent = isOpen ? "Hide BibTeX ↑" : "BibTeX citation →";
      });
    });

    // 1-Click Copy BibTeX
    document.querySelectorAll("[data-copy-bibtex]").forEach(function (btn) {
      if (btn._hasCopyInit) return;
      btn._hasCopyInit = true;

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var box = btn.closest(".bibtex-box");
        if (!box) return;
        var pre = box.querySelector("pre");
        if (!pre) return;
        var text = pre.textContent || "";

        function showCopied() {
          var originalText = btn.textContent;
          btn.textContent = "Copied to clipboard ✓";
          btn.classList.add("is-copied");
          setTimeout(function () {
            btn.textContent = originalText;
            btn.classList.remove("is-copied");
          }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(showCopied).catch(function () {
            fallbackCopy(text);
          });
        } else {
          fallbackCopy(text);
        }

        function fallbackCopy(str) {
          var ta = document.createElement("textarea");
          ta.value = str;
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
            showCopied();
          } catch (err) {
            console.error("Copy failed", err);
          }
          document.body.removeChild(ta);
        }
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 5. Native Multi-Page View Transitions Architecture (Feature 4)     */
  /* ------------------------------------------------------------------ */
  function updateActiveNav(targetPath) {
    var masthead = document.querySelector(".masthead__nav");
    if (!masthead) return;
    var links = masthead.querySelectorAll("a");
    var normalizedTarget = targetPath.replace(/\/index\.html$/, "/").replace(/\/$/, "");

    links.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var linkPath = new URL(href, window.location.href).pathname
        .replace(/\/index\.html$/, "/")
        .replace(/\/$/, "");

      if (linkPath === normalizedTarget || (normalizedTarget === "" && linkPath.endsWith("/index.html"))) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function initViewTransitions() {
    if (!("startViewTransition" in document)) return;

    document.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;

      var href = link.getAttribute("href");
      if (!href) return;

      // Skip non-navigational links
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        link.hasAttribute("download") ||
        link.getAttribute("target") === "_blank" ||
        link.hasAttribute("data-no-transition")
      ) {
        return;
      }

      var targetUrl = new URL(link.href, window.location.href);

      // Same origin only
      if (targetUrl.origin !== window.location.origin) return;

      // Skip if exactly current URL
      if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
        if (targetUrl.hash) return; // Allow anchor scrolling
      }

      // Do not intercept links pointing to static HTML notebooks / R files
      if (targetUrl.pathname.indexOf("/portfolio/R/") !== -1 || targetUrl.pathname.indexOf("/portfolio/python-notebooks/") !== -1 || targetUrl.pathname.indexOf("/portfolio/misc/") !== -1) {
        return;
      }

      e.preventDefault();

      fetch(targetUrl.href)
        .then(function (res) {
          if (!res.ok) throw new Error("Network error");
          return res.text();
        })
        .then(function (htmlText) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(htmlText, "text/html");

          // Shared-element token: clicked project row title -> destination page title
          var oldTitle = link.matches("[data-slug]") ? link.querySelector("h3") : null;
          if (oldTitle) oldTitle.style.viewTransitionName = "project-title";

          document.startViewTransition(function () {
            // Update document title
            document.title = doc.title;

            // Close any open drawer scroll lock
            document.body.style.overflow = "";
            activeTrigger = null;

            // Sync page-specific head styles/stylesheets
            document.head.querySelectorAll("style").forEach(function (s) { s.setAttribute("data-vt", ""); });
            document.head.querySelectorAll("style[data-vt]").forEach(function (s) { s.remove(); });
            doc.head.querySelectorAll("style").forEach(function (s) {
              var c = document.importNode(s, true);
              c.setAttribute("data-vt", "");
              document.head.appendChild(c);
            });
            doc.head.querySelectorAll('link[rel="stylesheet"]').forEach(function (l) {
              var abs = new URL(l.getAttribute("href"), targetUrl.href).href;
              var exists = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]')).some(function (x) {
                return x.href === abs;
              });
              if (!exists) {
                var n = document.createElement("link");
                n.rel = "stylesheet";
                n.href = abs;
                document.head.appendChild(n);
              }
            });

            // Replace main content cleanly (direct body children between header and footer)
            function getContentNodes(bodyEl) {
              return Array.from(bodyEl.children).filter(function (el) {
                if (el.tagName === "HEADER" || el.tagName === "FOOTER" || el.tagName === "SCRIPT") return false;
                if (el.classList && el.classList.contains("skip-link")) return false;
                return true;
              });
            }

            var curSections = getContentNodes(document.body);
            curSections.forEach(function (s) { s.remove(); });

            var footer = document.querySelector(".footer");
            var newSections = getContentNodes(doc.body);

            if (footer && footer.parentNode) {
              newSections.forEach(function (ns) {
                footer.parentNode.insertBefore(document.importNode(ns, true), footer);
              });
            } else {
              newSections.forEach(function (ns) {
                document.body.appendChild(document.importNode(ns, true));
              });
            }

            // Sync telemetry backdrops if any exist in new doc
            var curBackdrops = document.querySelectorAll(".telemetry-backdrop");
            curBackdrops.forEach(function (b) { b.remove(); });
            var newBackdrops = doc.querySelectorAll(".telemetry-backdrop");
            newBackdrops.forEach(function (nb) {
              document.body.appendChild(document.importNode(nb, true));
            });

            // Update URL & active states
            history.pushState({ path: targetUrl.href }, "", targetUrl.href);
            updateActiveNav(targetUrl.pathname);
            window.scrollTo(0, 0);

            // Pair the shared title token on the destination page
            var newTitle = document.querySelector("main h1");
            if (newTitle && oldTitle) newTitle.style.viewTransitionName = "project-title";

            // Re-initialize dynamic page components
            initAll();
          });
        })
        .catch(function () {
          window.location.href = targetUrl.href;
        });
    });

    window.addEventListener("popstate", function () {
      window.location.reload();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Main Orchestrator                                                  */
  /* ------------------------------------------------------------------ */
  function initAll() {
    initMobileNav();
    initTelemetryDrawers();
    initProjectFilteringAndSorting();
    initBibTeX();
  }

  // Initialize on initial DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initAll();
      initViewTransitions();
    });
  } else {
    initAll();
    initViewTransitions();
  }
})();
