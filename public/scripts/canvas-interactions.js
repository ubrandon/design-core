const CARD_GAP = 40;
const DRAG_THRESHOLD = 5;
const TITLE_FONT_SIZE = 48;
const TITLE_FONT_SIZES = [
  { label: "Small", size: 24 },
  { label: "Medium", size: 36 },
  { label: "Large", size: 48 },
  { label: "Extra large", size: 72 },
  { label: "Massive", size: 144 },
];
const DUPLICATE_OFFSET = 64;
//  Screen-space distance at which matching object edges or centers snap.
const ALIGN_SNAP_THRESHOLD = 8;
const ALIGN_GUIDE_PADDING = 24;

function roundCanvasPosition(n) {
  return Math.round(Number(n));
}

const projectId = getParam("project");
if (!projectId) {
  try { sessionStorage.setItem("design-core-redirect-hint", "Canvas link was missing a project id."); } catch (_) {}
  window.location.href = withCompany("index.html");
}

// Paths reported by the live-reload watcher are raw (not URL-encoded), so
// compare against those with raw strings. Only URL-build sites use this.
const encProjectId = encodeURIComponent(projectId);
function screenUrl(file, suffix) {
  return dataPath("projects/" + encProjectId + "/screens/" + encodeURIComponent(file)) + (suffix || "");
}

renderNav({
  breadcrumbs: [
    { label: "Projects", href: withCompany("index.html") },
    { label: projectId, href: withCompany("project.html?id=" + encProjectId), id: "project-link" },
    { label: "Canvas" },
  ],
  hint: "Drag to select · Space+drag to pan",
  fixed: true,
});

fetchJSON(dataPath("projects/" + encProjectId + "/project.json"))
  .then(data => {
    var link = document.getElementById("project-link");
    if (link) link.textContent = data.name;
    document.title = data.name + " | Canvas | Design Core";
  })
  .catch(() => {});

const viewport = document.getElementById("viewport");
const stage = document.getElementById("stage");

const STORAGE_KEY = "design-core-canvas-" + activeCompany() + ":" + (projectId || "default");
let restoreState = null;
try {
  const s = sessionStorage.getItem(STORAGE_KEY);
  if (s) restoreState = JSON.parse(s);
} catch (_) {}

const pz = initPanZoom(viewport, stage, { navHeight: 52, restoreState, dragToPan: false });
let canvasTool = "select";
let placingText = false;

function setCanvasTool(tool) {
  if (!["select", "hand", "text"].includes(tool)) return;
  canvasTool = tool;
  placingText = tool === "text";
  pz.dragToPan = tool === "hand";
  viewport.classList.toggle("is-select-tool", tool === "select");
  viewport.classList.toggle("placing-text", tool === "text");
  ["select", "hand", "text"].forEach((name) => {
    const button = document.getElementById("tool-" + name);
    if (!button) return;
    const active = name === tool;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function savePanZoom() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      panX: pz.panX,
      panY: pz.panY,
      zoom: pz.zoom,
    }));
  } catch (_) {}
}
window.addEventListener("pagehide", savePanZoom);

let screens = [];
let texts = [];
const CANVAS_DRAFT_KEY = "design-core:canvas-draft:" + activeCompany() + ":" + projectId;
const canvasPersistence = createCanvasPersistence({
  canvasUrl: dataPath("projects/" + encProjectId + "/canvas.json"),
  draftKey: CANVAS_DRAFT_KEY,
  getState: () => ({ screens, texts }),
  applyState: applyCanvasState,
  onLoadError: showCanvasLoadError,
});

function saveCanvas() {
  return canvasPersistence.save();
}

function saveCanvasAndWait() {
  return canvasPersistence.saveAndWait();
}

// Selection state
const selected = new Set();
const selectedTexts = new Set();
const canvasRenderer = createCanvasRenderer({
  stage,
  getScreens: () => screens,
  getTextLayer: () => textLayer,
  isSelected: (idx) => selected.has(idx),
  screenUrl,
  rawScreenPrefix: dataPath("projects/" + projectId + "/screens/"),
  screenLabel: screenDisplayName,
  onCardPointerDown,
  onLabelEdit: startLabelEdit,
  renderTexts,
});

function renderCards() {
  canvasRenderer.renderCards();
}

function reloadChangedIframes(changedFiles, reloadAll) {
  canvasRenderer.reloadChanged(changedFiles, reloadAll);
}

function setCanvasSelection(screenIndices, textIndices) {
  selected.clear();
  screenIndices.forEach(i => selected.add(i));
  selectedTexts.clear();
  textIndices.forEach(i => selectedTexts.add(i));
  selectedText = selectedTexts.size ? Math.min(...selectedTexts) : -1;
  applySelectionClasses();
  applyTextSelectionClasses();
  updateSelectionBar();
}

function setSelected(indices) {
  setCanvasSelection(indices, []);
}

function setAllSelected() {
  setCanvasSelection(
    screens.map((_, i) => i),
    texts.map((_, i) => i),
  );
}

function clearSelection() {
  setCanvasSelection([], []);
}

function applySelectionClasses() {
  screens.forEach((_, i) => {
    const card = document.getElementById("card-" + i);
    if (card) card.classList.toggle("is-selected", selected.has(i));
  });
}

// Selection toolbar
let selectionBar = null;

function updateSelectionBar() {
  const total = selected.size + selectedTexts.size;
  if (total === 0) {
    if (selectionBar) { selectionBar.remove(); selectionBar = null; }
    return;
  }
  if (!selectionBar) {
    selectionBar = document.createElement("div");
    selectionBar.className = "canvas-selection-bar";
    document.body.appendChild(selectionBar);
  }
  const parts = [];
  if (selected.size) parts.push(selected.size === 1 ? "1 screen" : selected.size + " screens");
  if (selectedTexts.size) parts.push(selectedTexts.size === 1 ? "1 title" : selectedTexts.size + " titles");
  const label = parts.join(" + ");
  selectionBar.innerHTML =
    '<span class="canvas-selection-bar-label">' + label + ' selected</span>' +
    '<button class="canvas-selection-bar-btn" onclick="deleteSelected()">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
    'Delete</button>';
}

function selectedObjectLabel() {
  const parts = [];
  if (selected.size) parts.push(selected.size === 1 ? "1 screen" : selected.size + " screens");
  if (selectedTexts.size) parts.push(selectedTexts.size === 1 ? "1 title" : selectedTexts.size + " titles");
  return parts.join(" + ") || "selection";
}

// Delete selected canvas objects
function deleteSelected() {
  if (selected.size === 0 && selectedTexts.size === 0) return;
  const screenIndices = Array.from(selected).sort((a, b) => b - a);
  const textIndices = Array.from(selectedTexts).sort((a, b) => b - a);
  const selectedFiles = screenIndices.map(i => screens[i] && screens[i].file).filter(Boolean);
  screenIndices.forEach(i => screens.splice(i, 1));
  textIndices.forEach(i => texts.splice(i, 1));
  const filesToDelete = Array.from(new Set(selectedFiles)).filter(file =>
    !screens.some(screen => screen.file === file)
  );
  clearSelection();
  renderCards();
  if (!filesToDelete.length) {
    saveCanvas();
    return;
  }
  const saved = saveCanvasAndWait();
  let failures = 0;
  saved.then(() => Promise.all(filesToDelete.map(f =>
      fetch(screenUrl(f), { method: "DELETE" })
        .then(r => { if (!r.ok) failures++; })
        .catch(() => { failures++; }),
    ))).then(() => {
    if (failures > 0) {
      showToast(
        failures === 1
          ? "1 screen file could not be deleted on disk"
          : `${failures} screen files could not be deleted on disk`,
      );
    }
  });
}

async function duplicateScreenFile(file) {
  const resp = await fetch(apiUrl("/api/duplicate-screen"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectId, file }),
  });
  let data = {};
  try { data = await resp.json(); } catch (_) {}
  if (!resp.ok || !data.file) {
    throw new Error(data.error || "Could not duplicate screen file.");
  }
  return data.file;
}

async function duplicateSelection(options) {
  const opts = options || {};
  const offsetX = opts.offsetX == null ? DUPLICATE_OFFSET : opts.offsetX;
  const offsetY = opts.offsetY == null ? DUPLICATE_OFFSET : opts.offsetY;
  const screenIndices = Array.from(selected).sort((a, b) => a - b).filter(i => screens[i]);
  const textIndices = Array.from(selectedTexts).sort((a, b) => a - b).filter(i => texts[i]);
  if (!screenIndices.length && !textIndices.length) return null;

  const copiedScreens = [];
  try {
    for (const i of screenIndices) {
      const s = screens[i];
      const file = await duplicateScreenFile(s.file);
      copiedScreens.push({
        file,
        x: roundCanvasPosition(s.x + offsetX),
        y: roundCanvasPosition(s.y + offsetY),
        width: s.width,
        name: s.name && s.name.trim() ? s.name.trim() + " Copy" : "",
      });
    }
  } catch (err) {
    await Promise.all(copiedScreens.map(screen =>
      fetch(screenUrl(screen.file), { method: "DELETE" }).catch(() => null)
    ));
    console.error(err);
    showToast("Could not copy screen file");
    return null;
  }

  const copiedTexts = textIndices.map(i => canvasPersistence.newText({
    text: texts[i].text,
    x: roundCanvasPosition(texts[i].x + offsetX),
    y: roundCanvasPosition(texts[i].y + offsetY),
    size: texts[i].size,
  }));

  const firstScreenIdx = screens.length;
  const firstTextIdx = texts.length;
  screens.push(...copiedScreens);
  texts.push(...copiedTexts);

  const nextScreens = copiedScreens.map((_, i) => firstScreenIdx + i);
  const nextTexts = copiedTexts.map((_, i) => firstTextIdx + i);
  setCanvasSelection(nextScreens, nextTexts);
  renderCards();
  if (opts.save !== false) saveCanvas();
  return { screens: nextScreens, texts: nextTexts };
}

function nudgeSelection(dx, dy) {
  if (selected.size === 0 && selectedTexts.size === 0) return;
  selected.forEach((i) => {
    const screen = screens[i];
    if (!screen) return;
    screen.x = roundCanvasPosition(screen.x + dx);
    screen.y = roundCanvasPosition(screen.y + dy);
    const card = document.getElementById("card-" + i);
    if (card) {
      card.style.left = screen.x + "px";
      card.style.top = screen.y + "px";
    }
  });
  selectedTexts.forEach((i) => {
    const text = texts[i];
    if (!text) return;
    text.x = roundCanvasPosition(text.x + dx);
    text.y = roundCanvasPosition(text.y + dy);
    const el = textLayer && textLayer.querySelector('.canvas-text[data-idx="' + i + '"]');
    if (el) {
      el.style.left = text.x + "px";
      el.style.top = text.y + "px";
    }
  });
  saveCanvas();
}

function zoomToActualSize() {
  pz.zoom = 1;
  pz.applyTransform();
}

function frameSelection() {
  const bounds = movingSelectionBounds();
  if (bounds) frameBounds(bounds, 80);
}

// Keyboard shortcuts
window.addEventListener("keydown", function (e) {
  const inField = e.target.closest("input, textarea, [contenteditable]");
  if (inField) return;
  const primaryModifier = e.metaKey || e.ctrlKey;

  if (e.key === "Delete" || e.key === "Backspace") {
    if (selected.size > 0 || selectedTexts.size > 0) {
      e.preventDefault();
      deleteSelected();
    }
  }
  if ((e.key === "v" || e.key === "V") && !primaryModifier && !e.altKey) {
    e.preventDefault();
    setCanvasTool("select");
  }
  if ((e.key === "h" || e.key === "H") && !primaryModifier && !e.altKey) {
    e.preventDefault();
    setCanvasTool("hand");
  }
  if ((e.key === "t" || e.key === "T") && !primaryModifier && !e.altKey) {
    e.preventDefault();
    addText();
  }
  if ((e.key === "a" || e.key === "A") && primaryModifier) {
    e.preventDefault();
    setAllSelected();
  }
  if ((e.key === "d" || e.key === "D") && primaryModifier && !e.altKey) {
    e.preventDefault();
    if (!e.repeat) duplicateSelection();
  }
  if (e.code === "Digit1" && e.shiftKey && !primaryModifier && !e.altKey) {
    e.preventDefault();
    centerOnContent();
  }
  if (e.code === "Digit2" && e.shiftKey && !primaryModifier && !e.altKey) {
    e.preventDefault();
    frameSelection();
  }
  if (e.key === "0" && !primaryModifier && !e.altKey) {
    e.preventDefault();
    zoomToActualSize();
  }
  if ((e.key === "+" || e.key === "=") && !primaryModifier && !e.altKey) {
    e.preventDefault();
    pz.zoomBy(0.1);
  }
  if (e.key === "-" && !primaryModifier && !e.altKey) {
    e.preventDefault();
    pz.zoomBy(-0.1);
  }
  if (e.key.startsWith("Arrow") && (selected.size > 0 || selectedTexts.size > 0)) {
    const amount = e.shiftKey ? 10 : 1;
    const offsets = {
      ArrowLeft: [-amount, 0],
      ArrowRight: [amount, 0],
      ArrowUp: [0, -amount],
      ArrowDown: [0, amount],
    };
    const offset = offsets[e.key];
    if (offset) {
      e.preventDefault();
      nudgeSelection(offset[0], offset[1]);
    }
  }
  if (e.key === "Escape") {
    closeContextMenu();
    clearSelection();
    setCanvasTool("select");
  }
});

// Right-click context menu
let ctxMenu = null;

function closeContextMenu() {
  if (ctxMenu) { ctxMenu.remove(); ctxMenu = null; }
  window.removeEventListener("pointerdown", onCtxOutside);
}

function onCtxOutside(e) {
  if (ctxMenu && !ctxMenu.contains(e.target)) closeContextMenu();
}

function showContextMenu(x, y, items) {
  closeContextMenu();
  ctxMenu = document.createElement("div");
  ctxMenu.className = "canvas-context-menu";
  ctxMenu.setAttribute("role", "menu");
  for (const item of items) {
    if (item.sep) {
      const sep = document.createElement("div");
      sep.className = "canvas-context-menu-sep";
      ctxMenu.appendChild(sep);
      continue;
    }
    if (item.heading) {
      const heading = document.createElement("div");
      heading.className = "canvas-context-menu-heading";
      heading.textContent = item.heading;
      ctxMenu.appendChild(heading);
      continue;
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "canvas-context-menu-item" +
      (item.danger ? " canvas-context-menu-item--danger" : "") +
      (item.active ? " is-active" : "");
    btn.setAttribute("role", typeof item.active === "boolean" ? "menuitemradio" : "menuitem");
    if (typeof item.active === "boolean") btn.setAttribute("aria-checked", item.active ? "true" : "false");
    const iconWrap = document.createElement("span");
    iconWrap.className = "canvas-context-menu-icon";
    if (item.icon) iconWrap.innerHTML = item.icon;
    btn.appendChild(iconWrap);
    const labelEl = document.createElement("span");
    labelEl.className = "canvas-context-menu-label";
    labelEl.textContent = item.label;
    btn.appendChild(labelEl);
    if (item.meta) {
      const metaEl = document.createElement("span");
      metaEl.className = "canvas-context-menu-meta";
      metaEl.textContent = item.meta;
      btn.appendChild(metaEl);
    }
    btn.addEventListener("click", () => {
      if (btn.dataset.busy === "1") return;
      if (item.async) {
        const startBusy = (text) => {
          btn.dataset.busy = "1";
          btn.disabled = true;
          iconWrap.innerHTML = SPINNER_SVG;
          if (text) labelEl.textContent = text;
          for (const other of ctxMenu.querySelectorAll(".canvas-context-menu-item")) {
            if (other !== btn) other.disabled = true;
          }
          window.removeEventListener("pointerdown", onCtxOutside);
        };
        const setLabel = (text) => { if (text) labelEl.textContent = text; };
        Promise.resolve(item.action({ startBusy, setLabel }))
          .catch(err => { console.error(err); })
          .finally(() => { closeContextMenu(); });
      } else {
        closeContextMenu();
        item.action();
      }
    });
    ctxMenu.appendChild(btn);
  }
  ctxMenu.style.left = x + "px";
  ctxMenu.style.top = y + "px";
  document.body.appendChild(ctxMenu);

  const rect = ctxMenu.getBoundingClientRect();
  if (rect.right > window.innerWidth) ctxMenu.style.left = (x - rect.width) + "px";
  if (rect.bottom > window.innerHeight) ctxMenu.style.top = (y - rect.height) + "px";

  setTimeout(() => window.addEventListener("pointerdown", onCtxOutside), 0);
}

const SPINNER_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" class="canvas-context-menu-spinner"><path d="M21 12a9 9 0 1 1-6.2-8.55"/></svg>';

const ICON_SELECT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></svg>';
const ICON_COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const ICON_DELETE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
const ICON_DOWNLOAD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>';
const ICON_TEXT_SIZE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>';

const canvasExporter = createCanvasExporter({ getScreens: () => screens, projectId: encProjectId });
const downloadScreensAsPng = canvasExporter.downloadScreens;

viewport.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  const textEl = e.target.closest(".canvas-text");
  const card = e.target.closest(".canvas-card");

  if (textEl) {
    const idx = parseInt(textEl.dataset.idx, 10);
    if (isNaN(idx)) return;
    if (!selectedTexts.has(idx)) {
      clearSelection();
      selectText(idx);
    }

    const label = selectedObjectLabel();
    const selectedSizes = new Set(
      Array.from(selectedTexts)
        .map(i => texts[i] && texts[i].size)
        .filter(size => Number.isFinite(size)),
    );
    const sizeItems = TITLE_FONT_SIZES.map(option => ({
      label: option.label,
      meta: option.size + "px",
      icon: ICON_TEXT_SIZE,
      active: selectedSizes.size === 1 && selectedSizes.has(option.size),
      action: () => setSelectedTextSize(option.size),
    }));
    showContextMenu(e.clientX, e.clientY, [
      { label: "Select All", icon: ICON_SELECT, action: setAllSelected },
      { label: "Duplicate " + label, icon: ICON_COPY, async: true, action: ({ startBusy }) => { startBusy("Duplicating…"); return duplicateSelection(); } },
      { sep: true },
      { heading: "Text size" },
      ...sizeItems,
      { sep: true },
      { label: "Delete " + label, icon: ICON_DELETE, danger: true, action: deleteSelected },
    ]);
  } else if (card) {
    const idx = parseInt(card.id.replace("card-", ""), 10);
    if (isNaN(idx)) return;
    if (!selected.has(idx)) setSelected([idx]);

    const count = selected.size;
    const label = selectedTexts.size ? selectedObjectLabel() : (count === 1 ? screenDisplayName(screens[idx]) : count + " screens");
    const exactLabel = count === 1 ? "Download PNG · Exact size" : "Download " + count + " PNGs · Exact size";
    const retinaLabel = count === 1 ? "Download PNG · 2×" : "Download " + count + " PNGs · 2×";
    const duplicateLabel = "Duplicate " + label;
    const items = [
      { label: "Select All", icon: ICON_SELECT, action: setAllSelected },
      { label: duplicateLabel, icon: ICON_COPY, async: true, action: ({ startBusy }) => { startBusy("Duplicating…"); return duplicateSelection(); } },
      { label: exactLabel, icon: ICON_DOWNLOAD, action: () => downloadScreensAsPng([...selected], 1) },
      { label: retinaLabel, icon: ICON_DOWNLOAD, action: () => downloadScreensAsPng([...selected], 2) },
      { sep: true },
      { label: "Delete " + label, icon: ICON_DELETE, danger: true, action: deleteSelected },
    ];
    showContextMenu(e.clientX, e.clientY, items);
  } else {
    clearSelection();
    showContextMenu(e.clientX, e.clientY, [
      { label: "Select All", icon: ICON_SELECT, action: setAllSelected },
    ]);
  }
});

// Card click, drag, marquee, and deselect
let objectPointer = null;
let marquee = null;
let marqueeEl = null;

function onCardPointerDown(e, idx) {
  if (e.button !== 0) return;
  if (placingText) return;
  if (e.pointerType === "touch") return;
  if (pz.spaceHeld || pz.dragToPan) return;
  e.stopPropagation();
  e.preventDefault();
  closeContextMenu();

  const shiftHeld = e.shiftKey;

  if (shiftHeld) {
    const nextScreens = new Set(selected);
    if (nextScreens.has(idx)) nextScreens.delete(idx); else nextScreens.add(idx);
    setCanvasSelection([...nextScreens], [...selectedTexts]);
  } else if (!selected.has(idx)) {
    setSelected([idx]);
  }

  objectPointer = {
    kind: "screen",
    idx,
    startX: e.clientX,
    startY: e.clientY,
    lastX: e.clientX,
    lastY: e.clientY,
    moved: false,
    shiftHeld,
    duplicateOnDrag: e.altKey,
    duplicateReady: !e.altKey,
    duplicatePromise: null,
    dragOffsets: null,
    textDragOffsets: null,
    pointerId: e.pointerId,
  };
  canvasPersistence.setInteractionActive(true);
  viewport.setPointerCapture(e.pointerId);
}

viewport.addEventListener("pointerdown", (e) => {
  if (e.button !== 0) return;
  if (placingText) {
    e.preventDefault();
    e.stopPropagation();
    placeTextAt(e.clientX, e.clientY);
    return;
  }
  if (e.pointerType === "touch") return;
  if (pz.spaceHeld || pz.dragToPan) return;
  if (e.target.closest(".canvas-card")) return;

  e.preventDefault();
  e.stopPropagation();
  closeContextMenu();
  const additive = e.shiftKey;
  const baseScreens = new Set(selected);
  const baseTexts = new Set(selectedTexts);
  if (!additive) clearSelection();
  marquee = {
    startX: e.clientX,
    startY: e.clientY,
    moved: false,
    additive,
    baseScreens,
    baseTexts,
    pointerId: e.pointerId,
  };
  window.addEventListener("pointermove", onMarqueeWindowPointerMove, true);
  window.addEventListener("pointerup", onMarqueeWindowPointerEnd);
  window.addEventListener("pointercancel", onMarqueeWindowPointerEnd);
});

function releaseViewportCaptureSafe(pointerId) {
  try {
    if (pointerId != null && viewport.releasePointerCapture) {
      viewport.releasePointerCapture(pointerId);
    }
  } catch (_) {}
}

function stagePointFromClient(clientX, clientY) {
  return pz.clientToStage(clientX, clientY);
}

let alignmentGuideEls = [];

function clearAlignmentGuides() {
  alignmentGuideEls.forEach(el => el.remove());
  alignmentGuideEls = [];
}

function normalizedBounds(x, y, width, height) {
  return { minX: x, minY: y, maxX: x + width, maxY: y + height };
}

function screenBounds(idx) {
  const s = screens[idx];
  if (!s) return null;
  const card = document.getElementById("card-" + idx);
  const width = s.width || 390;
  const measuredHeight = card ? card.offsetHeight : 0;
  const height = measuredHeight > 200 ? measuredHeight : Math.round(width * 2.16);
  return normalizedBounds(s.x, s.y, width, height);
}

function textBounds(idx) {
  const t = texts[idx];
  if (!t) return null;
  const el = textLayer && textLayer.querySelector('.canvas-text[data-idx="' + idx + '"]');
  const width = el && el.offsetWidth ? el.offsetWidth : Math.max(120, singleLineText(t.text).length * t.size * 0.6);
  const height = el && el.offsetHeight ? el.offsetHeight : t.size * 1.1 + 8;
  return normalizedBounds(t.x, t.y, width, height);
}

function unionBounds(items) {
  if (!items.length) return null;
  return items.reduce((out, item) => ({
    minX: Math.min(out.minX, item.minX),
    minY: Math.min(out.minY, item.minY),
    maxX: Math.max(out.maxX, item.maxX),
    maxY: Math.max(out.maxY, item.maxY),
  }));
}

function movingSelectionBounds() {
  const items = [];
  selected.forEach(i => { const b = screenBounds(i); if (b) items.push(b); });
  selectedTexts.forEach(i => { const b = textBounds(i); if (b) items.push(b); });
  return unionBounds(items);
}

function collectAlignmentTargets() {
  const items = [];
  screens.forEach((_, i) => { if (!selected.has(i)) { const b = screenBounds(i); if (b) items.push(b); } });
  texts.forEach((_, i) => { if (!selectedTexts.has(i)) { const b = textBounds(i); if (b) items.push(b); } });
  return items;
}

function offsetBounds(bounds, dx, dy) {
  return {
    minX: bounds.minX + dx,
    minY: bounds.minY + dy,
    maxX: bounds.maxX + dx,
    maxY: bounds.maxY + dy,
  };
}

function axisValues(bounds, axis) {
  return axis === "x"
    ? [bounds.minX, (bounds.minX + bounds.maxX) / 2, bounds.maxX]
    : [bounds.minY, (bounds.minY + bounds.maxY) / 2, bounds.maxY];
}

function bestAxisAlignment(movingBounds, targets, axis) {
  const movingValues = axisValues(movingBounds, axis);
  const threshold = ALIGN_SNAP_THRESHOLD / pz.zoom;
  let best = null;
  targets.forEach(target => {
    const targetValues = axisValues(target, axis);
    for (let i = 0; i < movingValues.length; i++) {
      const delta = targetValues[i] - movingValues[i];
      const distance = Math.abs(delta);
      if (distance <= threshold && (!best || distance < best.distance)) {
        best = { delta, distance, position: targetValues[i], target };
      }
    }
  });
  return best;
}

function drawAlignmentGuides(snap, movingBounds) {
  clearAlignmentGuides();
  const thickness = 1 / pz.zoom;
  if (snap.x) {
    const guide = document.createElement("div");
    const top = Math.min(movingBounds.minY, snap.x.target.minY) - ALIGN_GUIDE_PADDING;
    const bottom = Math.max(movingBounds.maxY, snap.x.target.maxY) + ALIGN_GUIDE_PADDING;
    guide.className = "canvas-alignment-guide";
    guide.style.left = snap.x.position + "px";
    guide.style.top = top + "px";
    guide.style.width = thickness + "px";
    guide.style.height = (bottom - top) + "px";
    stage.appendChild(guide);
    alignmentGuideEls.push(guide);
  }
  if (snap.y) {
    const guide = document.createElement("div");
    const left = Math.min(movingBounds.minX, snap.y.target.minX) - ALIGN_GUIDE_PADDING;
    const right = Math.max(movingBounds.maxX, snap.y.target.maxX) + ALIGN_GUIDE_PADDING;
    guide.className = "canvas-alignment-guide";
    guide.style.left = left + "px";
    guide.style.top = snap.y.position + "px";
    guide.style.width = (right - left) + "px";
    guide.style.height = thickness + "px";
    stage.appendChild(guide);
    alignmentGuideEls.push(guide);
  }
}

function beginSelectionDrag(pointer) {
  pointer.moved = true;
  viewport.classList.add("dragging-card");
  const start = stagePointFromClient(pointer.startX, pointer.startY);
  clearAlignmentGuides();
  pointer.dragStartStage = start;
  pointer.dragOffsets = [];
  selected.forEach(i => {
    const s = screens[i];
    if (s) pointer.dragOffsets.push({ idx: i, originX: s.x, originY: s.y });
  });
  pointer.textDragOffsets = [];
  selectedTexts.forEach(i => {
    const t = texts[i];
    if (t) pointer.textDragOffsets.push({ idx: i, originX: t.x, originY: t.y });
  });
  pointer.initialSelectionBounds = movingSelectionBounds();
  pointer.alignmentTargets = collectAlignmentTargets();
}

function moveSelectionDragToClient(pointer, clientX, clientY, disableSnap) {
  const point = stagePointFromClient(clientX, clientY);
  const rawDx = point.x - pointer.dragStartStage.x;
  const rawDy = point.y - pointer.dragStartStage.y;
  let dx = rawDx;
  let dy = rawDy;
  let snap = { x: null, y: null };
  if (!disableSnap && pointer.initialSelectionBounds && pointer.alignmentTargets.length) {
    const proposed = offsetBounds(pointer.initialSelectionBounds, rawDx, rawDy);
    snap.x = bestAxisAlignment(proposed, pointer.alignmentTargets, "x");
    snap.y = bestAxisAlignment(proposed, pointer.alignmentTargets, "y");
    if (snap.x) dx += snap.x.delta;
    if (snap.y) dy += snap.y.delta;
  }
  pointer.dragOffsets.forEach(d => {
    const s = screens[d.idx];
    if (!s) return;
    s.x = roundCanvasPosition(d.originX + dx);
    s.y = roundCanvasPosition(d.originY + dy);
    const el = document.getElementById("card-" + d.idx);
    if (el) {
      el.style.left = s.x + "px";
      el.style.top = s.y + "px";
    }
  });
  pointer.textDragOffsets.forEach(d => {
    const t = texts[d.idx];
    if (!t) return;
    t.x = roundCanvasPosition(d.originX + dx);
    t.y = roundCanvasPosition(d.originY + dy);
    const el = textLayer && textLayer.querySelector('.canvas-text[data-idx="' + d.idx + '"]');
    if (el) { el.style.left = t.x + "px"; el.style.top = t.y + "px"; }
  });
  if (snap.x || snap.y) {
    drawAlignmentGuides(snap, offsetBounds(pointer.initialSelectionBounds, dx, dy));
  } else {
    clearAlignmentGuides();
  }
}

function startAltDuplicateDrag(pointer, isActive) {
  if (pointer.duplicatePromise) return;
  pointer.duplicatePromise = duplicateSelection({ offsetX: 0, offsetY: 0, save: false })
    .then((result) => {
      if (!isActive()) {
        if (result) {
          const start = stagePointFromClient(pointer.startX, pointer.startY);
          const end = stagePointFromClient(pointer.lastX, pointer.lastY);
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          if (Math.max(Math.abs(dx), Math.abs(dy)) < 16) {
            result.screens.forEach(i => {
              screens[i].x = roundCanvasPosition(screens[i].x + DUPLICATE_OFFSET);
              screens[i].y = roundCanvasPosition(screens[i].y + DUPLICATE_OFFSET);
            });
            result.texts.forEach(i => {
              texts[i].x = roundCanvasPosition(texts[i].x + DUPLICATE_OFFSET);
              texts[i].y = roundCanvasPosition(texts[i].y + DUPLICATE_OFFSET);
            });
            renderCards();
          } else {
            beginSelectionDrag(pointer);
            moveSelectionDragToClient(pointer, pointer.lastX, pointer.lastY, true);
            viewport.classList.remove("dragging-card");
            clearAlignmentGuides();
          }
          saveCanvas();
        }
        return;
      }
      if (!result) {
        pointer.duplicateOnDrag = false;
        pointer.duplicateReady = true;
        return;
      }
      pointer.duplicateReady = true;
      beginSelectionDrag(pointer);
      moveSelectionDragToClient(pointer, pointer.lastX, pointer.lastY);
    })
    .catch((err) => {
      console.error(err);
      if (isActive()) {
        pointer.duplicateOnDrag = false;
        pointer.duplicateReady = true;
        showToast("Could not copy selection");
      }
    });
}

function finishObjectPointer(e, releaseCapture) {
  if (objectPointer && objectPointer.pointerId === e.pointerId) {
    const pointer = objectPointer;
    if (pointer.moved) {
      viewport.classList.remove("dragging-card");
      clearAlignmentGuides();
      saveCanvas();
    } else if (!pointer.shiftHeld) {
      if (pointer.kind === "screen") setSelected([pointer.idx]);
      else setCanvasSelection([], [pointer.idx]);
    }
    objectPointer = null;
    canvasPersistence.setInteractionActive(false);
    if (releaseCapture) releaseViewportCaptureSafe(e.pointerId);
    return true;
  }
  return false;
}

function endCanvasPointerSession(e) {
  if (finishObjectPointer(e, true)) return true;
  if (marquee && marquee.pointerId === e.pointerId) {
    return endMarqueePointer(e);
  }
  return false;
}

viewport.addEventListener("pointermove", (e) => {
  if (objectPointer && e.pointerId === objectPointer.pointerId) {
    const pointer = objectPointer;
    pointer.lastX = e.clientX;
    pointer.lastY = e.clientY;
    const dx = e.clientX - pointer.startX;
    const dy = e.clientY - pointer.startY;
    if (!pointer.moved && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;

    if (!pointer.moved) {
      if (pointer.duplicateOnDrag && !pointer.duplicateReady) {
        startAltDuplicateDrag(pointer, () => objectPointer && objectPointer.pointerId === e.pointerId);
        return;
      }
      beginSelectionDrag(pointer);
    }

    moveSelectionDragToClient(pointer, e.clientX, e.clientY, e.metaKey || e.ctrlKey);
    return;
  }

  if (marquee && e.pointerId === marquee.pointerId) { updateMarqueeSelection(e); return; }
});

function clearMarqueePointerListeners() {
  window.removeEventListener("pointermove", onMarqueeWindowPointerMove, true);
  window.removeEventListener("pointerup", onMarqueeWindowPointerEnd);
  window.removeEventListener("pointercancel", onMarqueeWindowPointerEnd);
}

function onMarqueeWindowPointerMove(e) {
  if (marquee && e.pointerId === marquee.pointerId) {
    updateMarqueeSelection(e);
  }
}

function onMarqueeWindowPointerEnd(e) {
  if (marquee && e.pointerId === marquee.pointerId) {
    endMarqueePointer(e);
  }
}

function updateMarqueeSelection(e) {
  if (!marquee || e.pointerId !== marquee.pointerId) return false;
  const dx = e.clientX - marquee.startX;
  const dy = e.clientY - marquee.startY;
  if (!marquee.moved && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return true;

  if (!marquee.moved) {
    marquee.moved = true;
    pz.isPanning = false;
    marqueeEl = document.createElement("div");
    marqueeEl.className = "canvas-marquee";
    document.body.appendChild(marqueeEl);
  }

  const x = Math.min(marquee.startX, e.clientX);
  const y = Math.min(marquee.startY, e.clientY);
  const w = Math.abs(dx);
  const h = Math.abs(dy);
  marqueeEl.style.left = x + "px";
  marqueeEl.style.top = y + "px";
  marqueeEl.style.width = w + "px";
  marqueeEl.style.height = h + "px";

  const hits = [];
  const textHits = [];
  screens.forEach((s, i) => {
    const card = document.getElementById("card-" + i);
    if (card) {
      const cr = card.getBoundingClientRect();
      if (cr.right > x && cr.left < x + w && cr.bottom > y && cr.top < y + h) {
        hits.push(i);
      }
    }
  });
  if (textLayer) {
    textLayer.querySelectorAll(".canvas-text").forEach((el) => {
      const tr = el.getBoundingClientRect();
      if (tr.right > x && tr.left < x + w && tr.bottom > y && tr.top < y + h) {
        const idx = parseInt(el.dataset.idx, 10);
        if (!isNaN(idx)) textHits.push(idx);
      }
    });
  }
  if (marquee.additive) {
    const nextScreens = new Set(marquee.baseScreens);
    const nextTexts = new Set(marquee.baseTexts);
    hits.forEach((i) => nextScreens.add(i));
    textHits.forEach((i) => nextTexts.add(i));
    setCanvasSelection([...nextScreens], [...nextTexts]);
  } else {
    setCanvasSelection(hits, textHits);
  }
  return true;
}

function endMarqueePointer(e) {
  if (!marquee || marquee.pointerId !== e.pointerId) return false;
  if (marquee.moved) updateMarqueeSelection(e);
  if (marqueeEl) { marqueeEl.remove(); marqueeEl = null; }
  marquee = null;
  clearMarqueePointerListeners();
  releaseViewportCaptureSafe(e.pointerId);
  return true;
}

viewport.addEventListener("pointerup", (e) => {
  if (endCanvasPointerSession(e)) return;

  if (
    !pz.didPan &&
    !e.target.closest(".canvas-card") &&
    !e.target.closest(".canvas-text") &&
    !e.target.closest(".canvas-context-menu")
  ) {
    clearSelection();
  }
});

viewport.addEventListener("pointercancel", (e) => {
  endCanvasPointerSession(e);
});

viewport.addEventListener("lostpointercapture", (e) => {
  finishObjectPointer(e, false);
  if (marquee && marquee.pointerId === e.pointerId) {
    endMarqueePointer(e);
  }
});

// Canvas data

function getCanvasBounds() {
  const items = [];
  screens.forEach((_, i) => {
    const bounds = screenBounds(i);
    if (bounds) items.push(bounds);
  });
  texts.forEach((_, i) => {
    const bounds = textBounds(i);
    if (bounds) items.push(bounds);
  });
  return unionBounds(items);
}

//  Frame a bounds rect inside the viewport and apply the pan/zoom.
function frameBounds(b, margin) {
  const rect = viewport.getBoundingClientRect();
  const m = margin == null ? 60 : margin;
  const contentW = Math.max(1, b.maxX - b.minX);
  const contentH = Math.max(1, b.maxY - b.minY);
  const zX = (rect.width - m * 2) / contentW;
  const zY = (rect.height - m * 2) / contentH;
  let z = Math.min(zX, zY, 1);
  z = Math.max(0.2, Math.min(2, z));
  const cx = (b.minX + b.maxX) / 2;
  const cy = (b.minY + b.maxY) / 2;
  pz.zoom = z;
  pz.panX = -cx * z;
  pz.panY = -cy * z;
  pz.applyTransform();
}

//  Frame all objects inside the viewport. The stage's (0,0) is CSS-positioned
//  at the viewport center, so panning by (-cx*z, -cy*z) lands the content
//  center at the viewport center.
function centerOnContent() {
  const b = getCanvasBounds();
  if (!b) {
    pz.zoom = 1;
    pz.panX = 0;
    pz.panY = 0;
    pz.applyTransform();
    return;
  }
  frameBounds(b, 60);
}

//  Frame a single screen by its file name. Returns true if the screen was found.
function centerOnScreen(file) {
  const idx = screens.findIndex((s) => s.file === file);
  if (idx < 0) return false;
  const s = screens[idx];
  const w = s.width || 390;
  const card = document.getElementById("card-" + idx);
  const measured = card ? card.offsetHeight : 0;
  const h = measured > 200 ? measured : Math.round(w * 2.16);
  frameBounds({ minX: s.x, minY: s.y, maxX: s.x + w, maxY: s.y + h }, 40);
  return true;
}

function applyCanvasState(merged, changedFiles, reloadAllScreens) {
  const next = merged.screens;
  const nextTexts = merged.texts;
  const structureSame = screens.length === next.length && next.every((n, i) =>
    screens[i] && n.file === screens[i].file && n.width === screens[i].width && (n.name || "") === (screens[i].name || "")
  );
  const textsSame = texts.length === nextTexts.length && nextTexts.every((n, i) =>
    texts[i] && n.id === texts[i].id && n.text === texts[i].text && n.x === texts[i].x && n.y === texts[i].y && n.size === texts[i].size
  );
  if (!structureSame) {
    clearSelection();
    screens = next;
    renderCards();
    var empty = document.getElementById("canvas-empty");
    if (empty) empty.remove();
  } else {
    const positionsChanged = next.some((n, i) => n.x !== screens[i].x || n.y !== screens[i].y);
    if (positionsChanged) {
      next.forEach((n, i) => {
        screens[i].x = n.x;
        screens[i].y = n.y;
        const card = document.getElementById("card-" + i);
        if (card) {
          card.style.left = n.x + "px";
          card.style.top = n.y + "px";
        }
      });
    }
  }
  if (reloadAllScreens) {
    reloadChangedIframes([], true);
  } else if (changedFiles && changedFiles.length) {
    reloadChangedIframes(changedFiles, false);
  }
  if (!textsSame) {
    clearTextSelection();
    texts = nextTexts;
    renderTexts();
  }
}

function showCanvasLoadError() {
  if (screens.length) {
    showToast("Canvas could not refresh. Check the console.");
    return;
  }
  var existing = document.getElementById("canvas-empty");
  if (existing) return;
  var el = document.createElement("div");
  el.id = "canvas-empty";
  el.className = "canvas-empty";
  el.innerHTML = '<div class="canvas-empty__title">No screens yet</div><div class="canvas-empty__body">Ask the AI to create screens for this project. Describe the UI you want to explore.</div>';
  document.body.appendChild(el);
}

function loadCanvas(changedFiles, reloadAllScreens) {
  return canvasPersistence.load(changedFiles, reloadAllScreens);
}

function refreshScreens() {
  clearSelection();
  const btn = document.querySelector('[onclick="refreshScreens()"]');
  if (btn) { btn.disabled = true; }
  loadCanvas([], true).then(() => {
    if (btn) {
      btn.textContent = "✓ Refresh";
      btn.disabled = false;
      setTimeout(() => { btn.textContent = "Refresh"; }, 1500);
    }
  });
}

// An explicit ?screen=<file> deep-link always wins over the saved session
// view, otherwise clicking a preview card could land on a different spot.
const deepLinkScreen = getParam("screen");

loadCanvas().then(() => {
  const applyInitialFrame = () => {
    if (deepLinkScreen && centerOnScreen(deepLinkScreen)) return;
    if (restoreState) return;
    centerOnContent();
  };

  // First frame uses a fallback height; refine once the iframes report their
  // real size so the initial zoom isn't skewed by the 150px default.
  applyInitialFrame();
  const iframes = stage.querySelectorAll("iframe");
  let pending = iframes.length;
  if (!pending) return;
  let finalized = false;
  const finalize = () => {
    if (finalized) return;
    finalized = true;
    applyInitialFrame();
  };
  iframes.forEach((f) => {
    f.addEventListener("load", () => {
      if (--pending <= 0) finalize();
    }, { once: true });
  });
  // Guard in case some iframes never fire load (e.g. cached errors).
  setTimeout(finalize, 1500);
});

// Live reload
window.__onDataChanged = function(paths) {
  const prefix = dataPath("projects/" + projectId + "/");
  const relevant = paths.filter(p => p.startsWith(prefix));
  if (!relevant.length && paths.length > 0) return;

  const canvasJsonChanged = relevant.some(p => p === prefix + "canvas.json");
  const screenFiles = relevant.filter(p => p.startsWith(prefix + "screens/"));

  if (canvasJsonChanged || relevant.length === 0) {
    loadCanvas(screenFiles, relevant.length === 0);
  } else if (screenFiles.length) {
    reloadChangedIframes(screenFiles, false);
  }
};

function screenDisplayName(s) {
  if (s.name && s.name.trim()) return s.name.trim();
  return (s.file || "").replace(/\.html$/, "");
}

function startLabelEdit(idx) {
  const card = document.getElementById("card-" + idx);
  if (!card) return;
  const label = card.querySelector(".canvas-card-label");
  if (!label || label.querySelector("input")) return;
  const current = screenDisplayName(screens[idx]);
  const input = document.createElement("input");
  input.type = "text";
  input.className = "canvas-card-label-input";
  input.value = current;
  label.textContent = "";
  label.appendChild(input);
  input.focus();
  input.select();

  const stop = (e) => e.stopPropagation();
  input.addEventListener("pointerdown", stop);
  input.addEventListener("mousedown", stop);
  input.addEventListener("click", stop);
  input.addEventListener("dblclick", stop);

  let committed = false;
  const commit = () => {
    if (committed) return;
    committed = true;
    const next = input.value.trim();
    const defaultName = (screens[idx].file || "").replace(/\.html$/, "");
    const nameToStore = (!next || next === defaultName) ? "" : next;
    const changed = (screens[idx].name || "") !== nameToStore;
    screens[idx].name = nameToStore;
    label.textContent = screenDisplayName(screens[idx]);
    if (changed) saveCanvas();
  };
  const cancel = () => {
    if (committed) return;
    committed = true;
    label.textContent = current;
  };
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); commit(); input.blur(); }
    else if (e.key === "Escape") { e.preventDefault(); cancel(); input.blur(); }
  });
  input.addEventListener("blur", () => {
    commit();
    window.removeEventListener("pointerdown", onOutside, true);
  });
  // Capture-phase: fires before pan-zoom and card handlers can preventDefault.
  const onOutside = (e) => {
    if (e.target === input || input.contains(e.target)) return;
    commit();
    window.removeEventListener("pointerdown", onOutside, true);
  };
  setTimeout(() => window.addEventListener("pointerdown", onOutside, true), 0);
}

// Canvas titles
let textLayer = null;
let selectedText = -1;

function ensureTextLayer() {
  if (!textLayer || textLayer.parentElement !== stage) {
    textLayer = document.createElement("div");
    textLayer.className = "canvas-text-layer";
    stage.appendChild(textLayer);
  }
  return textLayer;
}

function selectText(idx) {
  selectedText = idx;
  selectedTexts.clear();
  if (idx >= 0) selectedTexts.add(idx);
  applyTextSelectionClasses();
  updateSelectionBar();
}

function applyTextSelectionClasses() {
  if (!textLayer) return;
  textLayer.querySelectorAll(".canvas-text").forEach((el) => {
    el.classList.toggle("is-selected", selectedTexts.has(parseInt(el.dataset.idx, 10)));
  });
}

function clearTextSelection() {
  selectedText = -1;
  selectedTexts.clear();
  applyTextSelectionClasses();
  updateSelectionBar();
}

function singleLineText(str) {
  return String(str || "").replace(/\s*\n+\s*/g, " ").trim();
}

function renderTexts() {
  const layer = ensureTextLayer();
  const existing = new Map(
    Array.from(layer.querySelectorAll(":scope > .canvas-text"), el => [el.dataset.textId, el]),
  );
  texts.forEach((text, idx) => {
    let el = existing.get(text.id);
    if (!el) el = createCanvasText();
    existing.delete(text.id);
    el.dataset.idx = String(idx);
    el.dataset.textId = text.id;
    el.classList.toggle("is-selected", selectedTexts.has(idx));
    el.style.left = text.x + "px";
    el.style.top = text.y + "px";
    el.style.fontSize = text.size + "px";
    if (!el.querySelector("input, textarea")) el.textContent = singleLineText(text.text) || "Title";
    layer.appendChild(el);
  });
  existing.forEach(el => el.remove());
}

function createCanvasText() {
  const el = document.createElement("div");
  el.className = "canvas-text";
  el.addEventListener("pointerdown", (e) => {
    const idx = parseInt(el.dataset.idx, 10);
    if (!isNaN(idx)) onTextPointerDown(e, idx);
  });
  el.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    e.preventDefault();
    const idx = parseInt(el.dataset.idx, 10);
    if (!isNaN(idx)) startTextEdit(idx);
  });
  return el;
}

// Arm placement: the next click on the canvas drops the title where you click.
function addText() {
  setCanvasTool("text");
}
function cancelPlaceText() {
  setCanvasTool("select");
}
function placeTextAt(clientX, clientY) {
  const point = stagePointFromClient(clientX, clientY);
  const x = point.x;
  const y = point.y;
  texts.push(canvasPersistence.newText({ text: "", x: roundCanvasPosition(x), y: roundCanvasPosition(y), size: TITLE_FONT_SIZE }));
  cancelPlaceText();
  renderTexts();
  const idx = texts.length - 1;
  selectText(idx);
  startTextEdit(idx);
}

function onTextPointerDown(e, idx) {
  if (e.button !== 0) return;
  if (placingText) return;
  if (e.pointerType === "touch") return;
  if (pz.spaceHeld || pz.dragToPan) return;
  const el = e.currentTarget;
  if (el.querySelector("input, textarea")) return;
  e.stopPropagation();
  e.preventDefault();
  closeContextMenu();
  const shiftHeld = e.shiftKey;
  if (shiftHeld) {
    const nextTexts = new Set(selectedTexts);
    if (nextTexts.has(idx)) nextTexts.delete(idx); else nextTexts.add(idx);
    setCanvasSelection([...selected], [...nextTexts]);
  } else if (selectedTexts.has(idx)) {
    selectedText = idx;
  } else {
    setCanvasSelection([], [idx]);
  }
  objectPointer = {
    kind: "text",
    idx,
    startX: e.clientX,
    startY: e.clientY,
    lastX: e.clientX,
    lastY: e.clientY,
    moved: false,
    shiftHeld,
    duplicateOnDrag: e.altKey,
    duplicateReady: !e.altKey,
    duplicatePromise: null,
    dragOffsets: null,
    textDragOffsets: null,
    pointerId: e.pointerId,
  };
  canvasPersistence.setInteractionActive(true);
  viewport.setPointerCapture(e.pointerId);
}

function startTextEdit(idx) {
  const el = textLayer && textLayer.querySelector('.canvas-text[data-idx="' + idx + '"]');
  if (!el || el.querySelector("input, textarea")) return;
  const current = singleLineText(texts[idx].text);
  const input = document.createElement("input");
  input.type = "text";
  input.className = "canvas-text-input";
  input.value = current;
  input.style.fontSize = texts[idx].size + "px";
  el.textContent = "";
  el.appendChild(input);
  const measure = document.createElement("span");
  measure.style.cssText = "position:absolute;left:-99999px;top:-99999px;visibility:hidden;white-space:pre;font:inherit;letter-spacing:inherit;";
  el.appendChild(measure);
  const autoSize = () => {
    measure.textContent = input.value || input.placeholder || "Title";
    const measured = measure.offsetWidth || (measure.getBoundingClientRect().width / pz.zoom);
    input.style.width = Math.max(120, Math.ceil(measured) + 24) + "px";
  };
  autoSize();
  requestAnimationFrame(() => {
    input.focus();
    const caret = input.value.length;
    input.setSelectionRange(caret, caret);
    autoSize();
  });

  const stop = (e) => e.stopPropagation();
  input.addEventListener("pointerdown", stop);
  input.addEventListener("mousedown", stop);
  input.addEventListener("click", stop);
  input.addEventListener("dblclick", stop);
  input.addEventListener("input", autoSize);

  let committed = false;
  let removeOutsideListeners = () => {};
  const commit = () => {
    if (committed) return;
    committed = true;
    const next = singleLineText(input.value);
    if (!next) {
      texts.splice(idx, 1);
      clearTextSelection();
      renderTexts();
      saveCanvas();
      removeOutsideListeners();
      return;
    }
    const changed = texts[idx].text !== next;
    texts[idx].text = next;
    renderTexts();
    selectText(idx);
    if (changed) saveCanvas();
    removeOutsideListeners();
  };
  const cancel = () => {
    if (committed) return;
    committed = true;
    if (!current) { texts.splice(idx, 1); clearTextSelection(); }
    renderTexts();
    removeOutsideListeners();
  };
  input.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Enter") { e.preventDefault(); commit(); }
    else if (e.key === "Escape") { e.preventDefault(); cancel(); }
  });
  input.addEventListener("blur", commit);
  const onOutside = (e) => {
    if (e.target === input || input.contains(e.target)) return;
    commit();
  };
  setTimeout(() => {
    if (committed) return;
    window.addEventListener("pointerdown", onOutside, true);
    window.addEventListener("mousedown", onOutside, true);
    removeOutsideListeners = () => {
      window.removeEventListener("pointerdown", onOutside, true);
      window.removeEventListener("mousedown", onOutside, true);
    };
  }, 0);
}

function setSelectedTextSize(size) {
  if (!TITLE_FONT_SIZES.some(option => option.size === size) || selectedTexts.size === 0) return;
  selectedTexts.forEach(i => {
    if (texts[i]) texts[i].size = size;
  });
  renderTexts();
  saveCanvas();
}
