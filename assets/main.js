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
  function ensureMastheadScrim() {
    var scrim = document.querySelector(".masthead__scrim");
    if (!scrim) {
      scrim = document.createElement("div");
      scrim.className = "masthead__scrim";
      scrim.setAttribute("aria-hidden", "true");
      document.body.appendChild(scrim);
    }
    return scrim;
  }

  function closeMobileNav(restoreFocus) {
    var nav = document.querySelector(".masthead__nav");
    var toggle = document.querySelector(".masthead__toggle");
    var scrim = document.querySelector(".masthead__scrim");

    if (nav) nav.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    if (scrim) scrim.classList.remove("is-open");
    if (!document.querySelector(".telemetry-backdrop.is-open")) {
      document.body.style.overflow = "";
    }
    if (restoreFocus && toggle && typeof toggle.focus === "function") {
      toggle.focus();
    }
  }

  function initMobileNav() {
    var toggle = document.querySelector(".masthead__toggle");
    var nav = document.querySelector(".masthead__nav");
    if (!toggle || !nav) return;

    var scrim = ensureMastheadScrim();

    if (!scrim._hasScrimInit) {
      scrim._hasScrimInit = true;
      scrim.addEventListener("click", function () {
        closeMobileNav(false);
      });
    }

    if (!document._hasMobileNavGlobalInit) {
      document._hasMobileNavGlobalInit = true;

      document.addEventListener("keydown", function (e) {
        var activeNav = document.querySelector(".masthead__nav");
        if (e.key === "Escape" && activeNav && activeNav.classList.contains("is-open")) {
          closeMobileNav(true);
        }
      });

      if (window.matchMedia) {
        var mq = window.matchMedia("(max-width: 768px)");
        var onMqChange = function () {
          closeMobileNav(false);
        };
        if (typeof mq.addEventListener === "function") {
          mq.addEventListener("change", onMqChange);
        } else if (typeof mq.addListener === "function") {
          mq.addListener(onMqChange);
        }
      }

      window.addEventListener("resize", function () {
        var activeNav = document.querySelector(".masthead__nav");
        if (window.innerWidth > 768 && activeNav && activeNav.classList.contains("is-open")) {
          closeMobileNav(false);
        }
      });
    }

    if (toggle._hasNavInit) return;
    toggle._hasNavInit = true;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      scrim.classList.toggle("is-open", open);
      if (open) {
        document.body.style.overflow = "hidden";
      } else if (!document.querySelector(".telemetry-backdrop.is-open")) {
        document.body.style.overflow = "";
      }
    });

    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        closeMobileNav(false);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 2. FLIP Layout Morphing & Shared Element Expansion (Feature 2)     */
  /* ------------------------------------------------------------------ */
  var activeTrigger = null;

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function setBackgroundInert(isInert) {
    Array.from(document.body.children).forEach(function (el) {
      if (el.classList && el.classList.contains("telemetry-backdrop")) return;
      if (el.tagName === "SCRIPT") return;
      el.inert = !!isInert;
    });
  }

  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(function (el) {
      return el.offsetParent !== null;
    });
  }

  function toShortDrawerId(drawerId) {
    return (drawerId || "").replace(/^drawer-/, "");
  }

  function resolveDrawerElement(shortOrFullId) {
    if (!shortOrFullId) return null;
    var byPrefixed = document.getElementById("drawer-" + toShortDrawerId(shortOrFullId));
    if (byPrefixed) return byPrefixed;
    return document.getElementById(shortOrFullId);
  }

  function openTelemetryDrawer(drawerId, triggerEl, options) {
    var opts = options || {};
    var backdrop = document.getElementById(drawerId) || resolveDrawerElement(drawerId);
    if (!backdrop) return;
    var drawer = backdrop.querySelector(".telemetry-drawer");
    if (!drawer) return;

    if (backdrop._closeTimer) {
      clearTimeout(backdrop._closeTimer);
      backdrop._closeTimer = null;
    }
    backdrop._isClosing = false;

    // Close any other open drawer cleanly without extra history mutations
    document.querySelectorAll(".telemetry-backdrop.is-open").forEach(function (other) {
      if (other !== backdrop) {
        if (other._closeTimer) {
          clearTimeout(other._closeTimer);
          other._closeTimer = null;
        }
        other._isClosing = false;
        other.classList.remove("is-open");
      }
    });

    // Ensure mobile nav does not remain open behind drawer
    closeMobileNav(false);

    var resolvedTrigger =
      triggerEl || document.querySelector('[data-drawer-trigger="' + backdrop.id + '"]');
    activeTrigger = resolvedTrigger;

    var shortId = toShortDrawerId(backdrop.id);
    if (!opts.skipHistory) {
      try {
        var url = new URL(window.location.href);
        if (url.searchParams.get("drawer") !== shortId) {
          url.searchParams.set("drawer", shortId);
          var newUrl = url.pathname + url.search + url.hash;
          history.pushState({ path: url.href, drawer: shortId }, "", newUrl);
        }
      } catch (e) {
        // ignore file:// or sandbox limitations
      }
    }

    var skipAnim = prefersReducedMotion() || !!opts.skipAnimation;

    // 1. First: bounding box of originating element
    var originEl = resolvedTrigger
      ? resolvedTrigger.closest(".index-row, .featured-project, .research-card") || resolvedTrigger
      : null;
    var firstRect = !skipAnim && originEl ? originEl.getBoundingClientRect() : null;

    // 2. Mount/display modal and isolate background landmarks
    setBackgroundInert(true);
    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";

    if (skipAnim) {
      drawer.style.transition = "";
      drawer.style.transform = "";
      drawer.style.opacity = "1";
    } else {
      var rectOrigin = firstRect || {
        left: window.innerWidth / 2,
        top: window.innerHeight / 2,
        width: 20,
        height: 20
      };

      // 3. Last: bounding box of destination dialog
      var lastRect = drawer.getBoundingClientRect();

      // 4. Invert: inverse matrix transform
      var deltaX = rectOrigin.left - lastRect.left;
      var deltaY = rectOrigin.top - lastRect.top;
      var scaleX = Math.max(0.08, rectOrigin.width / (lastRect.width || 1));
      var scaleY = Math.max(0.08, rectOrigin.height / (lastRect.height || 1));

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
    }

    // Focus close button (or first focusable element) for accessibility
    var closeBtn = drawer.querySelector(".telemetry-drawer__close");
    if (closeBtn) {
      closeBtn.focus();
    } else {
      var focusables = getFocusableElements(drawer);
      if (focusables.length) focusables[0].focus();
    }
  }

  function closeTelemetryDrawer(backdrop, options) {
    var opts = options || {};
    if (!backdrop || !backdrop.classList.contains("is-open") || backdrop._isClosing) return;
    backdrop._isClosing = true;
    var drawer = backdrop.querySelector(".telemetry-drawer");

    if (!opts.fromPopstate) {
      var shortId = toShortDrawerId(backdrop.id);
      if (history.state && history.state.drawer === shortId) {
        try {
          history.back();
        } catch (e) {
          // ignore sandbox limitations
        }
      } else {
        try {
          var url = new URL(window.location.href);
          if (url.searchParams.has("drawer")) {
            url.searchParams.delete("drawer");
            var cleanUrl = url.pathname + url.search + url.hash;
            history.replaceState({ path: url.href }, "", cleanUrl);
          }
        } catch (e) {
          // ignore file:// or sandbox limitations
        }
      }
    }

    function finishClose() {
      backdrop._closeTimer = null;
      backdrop._isClosing = false;
      backdrop.classList.remove("is-open");
      document.body.style.overflow = "";
      setBackgroundInert(false);
      if (drawer) {
        drawer.style.transform = "";
        drawer.style.transition = "";
        drawer.style.opacity = "";
      }
      if (activeTrigger && typeof activeTrigger.focus === "function") {
        activeTrigger.focus();
      }
      activeTrigger = null;
    }

    if (drawer && activeTrigger && !prefersReducedMotion() && !opts.skipAnimation) {
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

      backdrop._closeTimer = setTimeout(finishClose, 280);
    } else {
      finishClose();
    }
  }

  function syncDrawerFromUrl(options) {
    var opts = options || {};
    var params = new URLSearchParams(window.location.search);
    var shortId = params.get("drawer");
    var openBackdrop = document.querySelector(".telemetry-backdrop.is-open");

    if (shortId) {
      var targetBackdrop = resolveDrawerElement(shortId);
      if (targetBackdrop) {
        if (openBackdrop && openBackdrop !== targetBackdrop) {
          closeTelemetryDrawer(openBackdrop, { fromPopstate: true, skipAnimation: true });
        }
        if (!targetBackdrop.classList.contains("is-open") || targetBackdrop._isClosing) {
          openTelemetryDrawer(targetBackdrop.id, null, {
            skipHistory: true,
            skipAnimation: !!opts.skipAnimation
          });
        }
        return;
      }
    }

    if (openBackdrop && !openBackdrop._isClosing) {
      closeTelemetryDrawer(openBackdrop, {
        fromPopstate: !!opts.fromPopstate,
        skipAnimation: !!opts.skipAnimation
      });
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

    // Escape dismissal and Tab / Shift+Tab focus trapping inside open drawer
    if (!document._hasDrawerKeyInit) {
      document._hasDrawerKeyInit = true;
      document.addEventListener("keydown", function (e) {
        var openBackdrop = document.querySelector(".telemetry-backdrop.is-open");
        if (!openBackdrop) return;

        if (e.key === "Escape") {
          closeTelemetryDrawer(openBackdrop);
          return;
        }

        if (e.key === "Tab") {
          var drawer = openBackdrop.querySelector(".telemetry-drawer");
          if (!drawer) return;
          var focusables = getFocusableElements(drawer);
          if (!focusables.length) {
            e.preventDefault();
            return;
          }
          var firstEl = focusables[0];
          var lastEl = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl || !drawer.contains(document.activeElement)) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl || !drawer.contains(document.activeElement)) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      });
    }

    // Sync initial ?drawer=... deep link cleanly without pushing history
    syncDrawerFromUrl({ skipAnimation: true });

    // Register active sync handler for popstate Back/Forward navigation
    window._activeDrawerSync = function () {
      syncDrawerFromUrl({ fromPopstate: true });
    };

    if (!window._hasDrawerPopstate) {
      window._hasDrawerPopstate = true;
      window.addEventListener("popstate", function () {
        if (document._hasVtInit) return;
        if (normalizePath(window.location.pathname) === normalizePath(currentPath)) {
          if (typeof window._activeDrawerSync === "function") {
            window._activeDrawerSync();
          }
        }
      });
    }
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
    var hasSyncedOnce = false;

    // Populate filter button counts idempotently via dataset.baseLabel
    filterButtons.forEach(function (btn) {
      if (!btn.dataset.baseLabel) {
        btn.dataset.baseLabel = btn.textContent.trim();
      }
      var filterKey = btn.getAttribute("data-filter") || "all";
      var itemCount = filterKey === "all"
        ? allRows.length
        : allRows.filter(function (row) {
            var cats = (row.getAttribute("data-cat") || "").split(/\s+/);
            return cats.indexOf(filterKey) !== -1;
          }).length;
      btn.textContent = btn.dataset.baseLabel + " (" + itemCount + ")";
    });

    function updateControlPressedStates() {
      filterButtons.forEach(function (btn) {
        var active = (btn.getAttribute("data-filter") || "all") === currentFilter;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });

      sortButtons.forEach(function (btn) {
        var active = (btn.getAttribute("data-sort") || "recommended") === currentSort;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }

    function announceStatus(count) {
      var statusEl = document.getElementById("portfolio-status");
      if (!statusEl) return;
      var noun = count === 1 ? "project" : "projects";
      statusEl.textContent = "Showing " + count + " " + noun + ", sorted by " + currentSort;
    }

    function applyFilterAndSortWithFLIP(skipAnimation, shouldAnnounce) {
      var reduceMotion = prefersReducedMotion() || !!skipAnimation;

      // 1. Record 'First' bounding boxes of currently visible rows
      var firstPositions = new Map();
      if (!reduceMotion) {
        allRows.forEach(function (row) {
          if (row.style.display !== "none" && row.offsetParent !== null) {
            firstPositions.set(row, row.getBoundingClientRect());
          }
        });
      }

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

      // Reorder rows using moveBefore when supported to preserve DOM identity
      matchingRows.forEach(function (row) {
        if (typeof listContainer.moveBefore === "function" && row.parentNode === listContainer) {
          listContainer.moveBefore(row, null);
        } else {
          listContainer.appendChild(row);
        }
      });

      // Toggle zero-match empty state
      var emptyEl = document.getElementById("portfolio-empty");
      if (emptyEl) {
        emptyEl.hidden = matchingRows.length > 0;
        listContainer.hidden = matchingRows.length === 0;
      }

      if (shouldAnnounce) {
        announceStatus(matchingRows.length);
      }

      if (reduceMotion) return;

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

            var cleanup = function (ev) {
              if (ev.target !== row || ev.propertyName !== "transform") return;
              row.style.transition = "";
              row.style.transform = "";
              row.removeEventListener("transitionend", cleanup);
            };
            row.addEventListener("transitionend", cleanup);
          }
        }
      });
    }

    function syncFromUrl(skipAnimation, shouldAnnounce) {
      var params = new URLSearchParams(window.location.search);
      var f = params.get("filter");
      var s = params.get("sort");

      var validFilters = Array.from(filterButtons).map(function (b) {
        return b.getAttribute("data-filter");
      });
      var validSorts = Array.from(sortButtons).map(function (b) {
        return b.getAttribute("data-sort");
      });

      var nextFilter = f || "all";
      var nextSort = (s && validSorts.indexOf(s) !== -1) ? s : "recommended";

      if (hasSyncedOnce && nextFilter === currentFilter && nextSort === currentSort) {
        return;
      }

      currentFilter = nextFilter;
      currentSort = nextSort;
      hasSyncedOnce = true;

      updateControlPressedStates();
      applyFilterAndSortWithFLIP(skipAnimation, shouldAnnounce);
    }

    function updateUrl() {
      var url = new URL(window.location.href);
      if (currentFilter && currentFilter !== "all") {
        url.searchParams.set("filter", currentFilter);
      } else {
        url.searchParams.delete("filter");
      }
      if (currentSort && currentSort !== "recommended") {
        url.searchParams.set("sort", currentSort);
      } else {
        url.searchParams.delete("sort");
      }

      var newSearch = url.search;
      if (newSearch !== window.location.search) {
        var newUrl = url.pathname + (newSearch || "") + (url.hash || "");
        try {
          history.pushState({ path: url.href, filter: currentFilter, sort: currentSort }, "", newUrl);
        } catch (e) {
          // ignore file:// or sandbox limitations
        }
      }
    }

    if (filterBar) {
      filterButtons.forEach(function (btn) {
        if (btn._hasFilterInit) return;
        btn._hasFilterInit = true;

        btn.addEventListener("click", function () {
          var targetFilter = btn.getAttribute("data-filter") || "all";
          if (targetFilter === currentFilter) return;

          currentFilter = targetFilter;
          updateControlPressedStates();
          updateUrl();
          applyFilterAndSortWithFLIP(false, true);
        });
      });
    }

    if (sortBar) {
      sortButtons.forEach(function (btn) {
        if (btn._hasSortInit) return;
        btn._hasSortInit = true;

        btn.addEventListener("click", function () {
          var targetSort = btn.getAttribute("data-sort") || "recommended";
          if (targetSort === currentSort) return;

          currentSort = targetSort;
          updateControlPressedStates();
          updateUrl();
          applyFilterAndSortWithFLIP(false, true);
        });
      });
    }

    document.querySelectorAll("[data-reset-filters]").forEach(function (resetBtn) {
      if (resetBtn._hasResetInit) return;
      resetBtn._hasResetInit = true;

      resetBtn.addEventListener("click", function () {
        currentFilter = "all";
        currentSort = "recommended";
        updateControlPressedStates();
        updateUrl();
        applyFilterAndSortWithFLIP(false, true);

        var allBtn = filterBar ? filterBar.querySelector('button[data-filter="all"]') : null;
        if (allBtn && typeof allBtn.focus === "function") {
          allBtn.focus();
        }
      });
    });

    // Set initial filter & sort states based on URL query parameters
    syncFromUrl(true, false);

    // Register active sync handler for popstate Back/Forward navigation
    window._activeFilterSortSync = function () {
      if (listContainer && (!document.body.contains || document.body.contains(listContainer))) {
        syncFromUrl(false, true);
      }
    };

    if (!window._hasFilterPopstate) {
      window._hasFilterPopstate = true;
      window.addEventListener("popstate", function () {
        if (document._hasVtInit) return;
        if (normalizePath(window.location.pathname) === normalizePath(currentPath)) {
          if (typeof window._activeFilterSortSync === "function") {
            window._activeFilterSortSync();
          }
        }
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* 4. Scholarly BibTeX Archival Toggle & 1-Click Copy (Feature 5)     */
  /* ------------------------------------------------------------------ */
  function initBibTeX() {
    // Toggle BibTeX block with FLIP displacement for following .clip siblings
    document.querySelectorAll("[data-bibtex-toggle]").forEach(function (btn) {
      if (btn._hasBibtexInit) return;
      btn._hasBibtexInit = true;

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var targetId = btn.getAttribute("data-bibtex-toggle");
        var box = document.getElementById(targetId);
        if (!box) return;

        var clip = btn.closest(".clip");
        var clipList = clip ? clip.closest(".clip-list") : null;
        var followingClips = [];
        if (clip && clipList) {
          var allClips = Array.from(clipList.children).filter(function (el) {
            return el.classList && el.classList.contains("clip");
          });
          var idx = allClips.indexOf(clip);
          if (idx !== -1) {
            followingClips = allClips.slice(idx + 1);
          }
        }

        var animateSiblings = !prefersReducedMotion() && followingClips.length > 0;
        var firstTops = new Map();
        if (animateSiblings) {
          followingClips.forEach(function (sib) {
            firstTops.set(sib, sib.getBoundingClientRect().top);
          });
        }

        var isOpen = box.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        btn.textContent = isOpen ? "Hide BibTeX ↑" : "BibTeX citation →";

        if (animateSiblings) {
          followingClips.forEach(function (sib) {
            var firstTop = firstTops.get(sib);
            var lastTop = sib.getBoundingClientRect().top;
            var deltaY = firstTop - lastTop;
            if (Math.abs(deltaY) > 0.5) {
              if (sib._flipCleanup) {
                sib._flipCleanup();
              }
              sib.style.transition = "none";
              sib.style.transform = "translate3d(0, " + deltaY + "px, 0)";

              requestAnimationFrame(function () {
                sib.offsetHeight; // force reflow
                sib.style.transition = "transform 320ms cubic-bezier(0.16, 1, 0.3, 1)";
                sib.style.transform = "translate3d(0, 0, 0)";
              });

              var onEnd = function (ev) {
                if (ev.target === sib && ev.propertyName === "transform" && sib._flipCleanup) {
                  sib._flipCleanup();
                }
              };
              var timerId = setTimeout(function () {
                if (sib._flipCleanup) sib._flipCleanup();
              }, 350);
              sib._flipCleanup = function () {
                clearTimeout(timerId);
                sib.style.transition = "";
                sib.style.transform = "";
                sib.removeEventListener("transitionend", onEnd);
                sib._flipCleanup = null;
              };
              sib.addEventListener("transitionend", onEnd);
            }
          });
        }
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
          if (!btn.dataset.originalLabel) {
            btn.dataset.originalLabel = btn.textContent;
          }
          if (btn._copyTimer) {
            clearTimeout(btn._copyTimer);
          }
          btn.textContent = "Copied to clipboard ✓";
          btn.classList.add("is-copied");
          btn._copyTimer = setTimeout(function () {
            btn.textContent = btn.dataset.originalLabel;
            btn.classList.remove("is-copied");
            btn._copyTimer = null;
          }, 2000);

          var copyStatus = document.getElementById("copy-status");
          if (copyStatus) {
            if (copyStatus._clearTimer) {
              clearTimeout(copyStatus._clearTimer);
            }
            copyStatus.textContent = "BibTeX citation copied to clipboard";
            copyStatus._clearTimer = setTimeout(function () {
              copyStatus.textContent = "";
              copyStatus._clearTimer = null;
            }, 2000);
          }
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
  function normalizePath(p) {
    return (p || "").replace(/\/index\.html$/, "/").replace(/\/$/, "");
  }

  var currentPath = window.location.pathname;

  function updateActiveNav(targetPath, baseHref) {
    var masthead = document.querySelector(".masthead__nav");
    if (!masthead) return;
    var links = Array.from(masthead.querySelectorAll("a"));
    var normalizedTarget = normalizePath(targetPath);
    var resolveBase = baseHref || window.location.href;

    var entries = links.map(function (link) {
      var href = link.getAttribute("href") || "";
      var linkPath = "";
      try {
        linkPath = normalizePath(new URL(href, resolveBase).pathname);
      } catch (e) {
        linkPath = normalizePath(href);
      }
      return { link: link, path: linkPath };
    });

    // Exact match first
    var matchedLink = null;
    for (var i = 0; i < entries.length; i++) {
      if (
        entries[i].path === normalizedTarget ||
        (normalizedTarget === "" && entries[i].path.endsWith("/index.html"))
      ) {
        matchedLink = entries[i].link;
        break;
      }
    }

    // Fallback: match subpages to their parent section nav link (e.g. /portfolio/giggity.html -> Work)
    if (!matchedLink) {
      var bestLen = -1;
      var homePath = entries.length ? entries[0].path : "";
      for (var j = 0; j < entries.length; j++) {
        var lp = entries[j].path;
        if (!lp || lp === homePath) continue;
        if (normalizedTarget.indexOf(lp + "/") === 0 && lp.length > bestLen) {
          bestLen = lp.length;
          matchedLink = entries[j].link;
        }
      }
    }

    links.forEach(function (link) {
      if (link === matchedLink) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function isStaticNotebookPath(pathname) {
    return (
      pathname.indexOf("/portfolio/R/") !== -1 ||
      pathname.indexOf("/portfolio/python-notebooks/") !== -1 ||
      pathname.indexOf("/portfolio/misc/") !== -1
    );
  }

  function navigateWithTransition(targetUrl, sourceLink, pushHistory) {
    if (isStaticNotebookPath(targetUrl.pathname)) {
      window.location.href = targetUrl.href;
      return;
    }

    fetch(targetUrl.href)
      .then(function (res) {
        if (!res.ok) throw new Error("Network error");
        return res.text();
      })
      .then(function (htmlText) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(htmlText, "text/html");
        var assignedVtNodes = [];

        function assignVtName(el, name) {
          if (!el) return;
          el.style.viewTransitionName = name;
          assignedVtNodes.push(el);
        }

        // Pair shared-element tokens only when both source and destination match
        var card = sourceLink
          ? sourceLink.closest("[data-slug], #featured-giggity, #writing .research-card, #writing [class*='card'], .featured-project, .research-card")
          : null;

        var oldTitle = card ? card.querySelector("h3, h2") : null;
        var hasTargetTitle = !!doc.querySelector("main h1");
        if (oldTitle && hasTargetTitle) assignVtName(oldTitle, "project-title");

        var oldTag = card
          ? card.querySelector(".index-row__tag, .featured-badge, .research-card__header, [data-vt-role='tag']")
          : null;
        var hasTargetTag = !!doc.querySelector('[data-vt-role="tag"]');
        if (oldTag && hasTargetTag) assignVtName(oldTag, "project-tag");

        var oldMeta = card
          ? card.querySelector(".index-row__meta, .featured-meta, .research-card__meta, [data-vt-role='meta']")
          : null;
        var hasTargetMeta = !!doc.querySelector('[data-vt-role="meta"]');
        if (oldMeta && hasTargetMeta) assignVtName(oldMeta, "project-meta");

        var transition = document.startViewTransition(function () {
          // Update URL & active states immediately so browser base URI matches targetUrl
          if (pushHistory) {
            history.pushState({ path: targetUrl.href }, "", targetUrl.href);
          }
          currentPath = targetUrl.pathname;

          // Update document title
          document.title = doc.title;

          // Clear any open mobile nav, scrim, drawer scroll lock, or inert state
          closeMobileNav(false);
          document.body.style.overflow = "";
          setBackgroundInert(false);
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

          // Sync masthead & footer navigation links so relative paths match targetUrl
          var curMasthead = document.querySelector(".masthead");
          var newMasthead = doc.querySelector(".masthead");
          if (curMasthead && newMasthead) {
            curMasthead.innerHTML = newMasthead.innerHTML;
          }

          var curFooter = document.querySelector(".footer");
          var newFooter = doc.querySelector(".footer");
          if (curFooter && newFooter) {
            curFooter.innerHTML = newFooter.innerHTML;
          }

          // Replace main content cleanly (direct body children between header and footer)
          function getContentNodes(bodyEl) {
            return Array.from(bodyEl.children).filter(function (el) {
              if (el.tagName === "HEADER" || el.tagName === "FOOTER" || el.tagName === "SCRIPT") return false;
              if (el.classList && el.classList.contains("skip-link")) return false;
              if (el.classList && el.classList.contains("telemetry-backdrop")) return false;
              if (el.classList && el.classList.contains("masthead__scrim")) return false;
              return true;
            });
          }

          var curSections = getContentNodes(document.body);
          curSections.forEach(function (s) { s.remove(); });

          var footer = document.querySelector(".footer");
          var newSections = getContentNodes(doc.body);

          // Resolve relative image src paths against targetUrl so they never 404 across directory levels
          newSections.forEach(function (ns) {
            if (ns.nodeType === Node.ELEMENT_NODE) {
              if (ns.tagName === "IMG" && ns.getAttribute("src")) {
                var s = ns.getAttribute("src");
                if (!s.startsWith("data:") && !s.startsWith("http:") && !s.startsWith("https:")) {
                  ns.setAttribute("src", new URL(s, targetUrl.href).href);
                }
              }
              ns.querySelectorAll("img[src]").forEach(function (img) {
                var s = img.getAttribute("src");
                if (s && !s.startsWith("data:") && !s.startsWith("http:") && !s.startsWith("https:")) {
                  img.setAttribute("src", new URL(s, targetUrl.href).href);
                }
              });
            }
          });

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

          updateActiveNav(targetUrl.pathname, targetUrl.href);

          if (targetUrl.hash) {
            var hashTarget = document.getElementById(targetUrl.hash.slice(1));
            if (hashTarget) {
              hashTarget.scrollIntoView();
            } else {
              window.scrollTo(0, 0);
            }
          } else {
            window.scrollTo(0, 0);
          }

          // Pair shared element tokens on the destination page
          if (oldTitle && hasTargetTitle) {
            assignVtName(document.querySelector("main h1"), "project-title");
          }
          if (oldTag && hasTargetTag) {
            assignVtName(document.querySelector('[data-vt-role="tag"]'), "project-tag");
          }
          if (oldMeta && hasTargetMeta) {
            assignVtName(document.querySelector('[data-vt-role="meta"]'), "project-meta");
          }

          // Route programmatic focus to main landmark for keyboard/screen reader continuity
          var mainEl = document.querySelector("main");
          if (mainEl) {
            if (!mainEl.hasAttribute("tabindex")) mainEl.setAttribute("tabindex", "-1");
            mainEl.focus({ preventScroll: true });
          }

          // Re-initialize dynamic page components
          initAll();
        });

        // Clean up temporary view-transition-name properties after transition completes
        if (transition && transition.finished) {
          transition.finished.finally(function () {
            assignedVtNodes.forEach(function (el) {
              if (el && el.style) el.style.viewTransitionName = "";
            });
          });
        }
      })
      .catch(function () {
        window.location.href = targetUrl.href;
      });
  }

  function initViewTransitions() {
    if (!("startViewTransition" in document)) return;
    if (document._hasVtInit) return;
    document._hasVtInit = true;

    if (!history.state || !history.state.path) {
      history.replaceState({ path: window.location.href }, "", window.location.href);
    }

    document.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (!link) return;

      var href = link.getAttribute("href");
      if (!href) return;

      // Skip non-navigational links
      if (
        href.startsWith("#") ||
        link.hasAttribute("download") ||
        link.getAttribute("target") === "_blank" ||
        link.hasAttribute("data-no-transition")
      ) {
        return;
      }

      var targetUrl;
      try {
        targetUrl = new URL(link.href, window.location.href);
      } catch (err) {
        return;
      }

      // Only handle HTTP(S) navigations on the same origin
      if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") return;
      if (targetUrl.origin !== window.location.origin) return;

      // Skip if exactly current URL
      if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
        if (targetUrl.hash) return; // Allow anchor scrolling
      }

      // Do not intercept links pointing to static HTML notebooks / R files
      if (isStaticNotebookPath(targetUrl.pathname)) {
        return;
      }

      e.preventDefault();
      navigateWithTransition(targetUrl, link, true);
    });

    window.addEventListener("popstate", function () {
      var targetUrl = new URL(window.location.href);
      if (isStaticNotebookPath(targetUrl.pathname)) {
        window.location.reload();
        return;
      }
      // If only ?drawer=, ?filter=, ?sort= or hash changed on the same pathname,
      // sync shallow query state without re-fetching the page or resetting scroll.
      if (normalizePath(targetUrl.pathname) === normalizePath(currentPath)) {
        if (typeof window._activeDrawerSync === "function") {
          window._activeDrawerSync();
        }
        if (typeof window._activeFilterSortSync === "function") {
          window._activeFilterSortSync();
        }
        return;
      }
      navigateWithTransition(targetUrl, null, false);
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
