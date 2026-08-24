(function (global) {
  function createCanvasRenderer(options) {
    var stage = options.stage;

    function createCard(screen, bust) {
      var card = document.createElement("div");
      card.className = "canvas-card";
      card.dataset.file = screen.file;

      var label = document.createElement("div");
      label.className = "canvas-card-label";
      label.title = "Double-click to rename";
      card.appendChild(label);

      var body = document.createElement("div");
      body.className = "canvas-card-body";
      var iframe = document.createElement("iframe");
      iframe.src = options.screenUrl(screen.file, bust);
      iframe.dataset.file = screen.file;
      iframe.setAttribute("sandbox", "allow-same-origin");
      iframe.setAttribute("scrolling", "no");
      iframe.style.cssText = "pointer-events:none;border:none;overflow:hidden;";
      iframe.addEventListener("load", function () { autoSizeIframe(iframe); });
      body.appendChild(iframe);
      card.appendChild(body);

      card.addEventListener("pointerdown", function (event) {
        var index = parseInt(card.dataset.idx, 10);
        if (!isNaN(index)) options.onCardPointerDown(event, index);
      });
      label.addEventListener("pointerdown", function (event) {
        if (!label.querySelector("input")) event.stopPropagation();
      });
      label.addEventListener("mousedown", function (event) {
        if (!label.querySelector("input")) event.stopPropagation();
      });
      label.addEventListener("click", function (event) { event.stopPropagation(); });
      label.addEventListener("dblclick", function (event) {
        event.stopPropagation();
        event.preventDefault();
        var index = parseInt(card.dataset.idx, 10);
        if (!isNaN(index)) options.onLabelEdit(index);
      });
      return card;
    }

    function updateCard(card, screen, index) {
      card.id = "card-" + index;
      card.dataset.idx = String(index);
      card.dataset.file = screen.file;
      card.classList.toggle("is-selected", options.isSelected(index));
      card.style.left = screen.x + "px";
      card.style.top = screen.y + "px";
      card.style.width = screen.width + "px";

      var label = card.querySelector(".canvas-card-label");
      label.dataset.idx = String(index);
      if (!label.querySelector("input")) label.textContent = options.screenLabel(screen);

      var iframe = card.querySelector("iframe");
      var widthChanged = iframe.width !== screen.width;
      iframe.width = screen.width;
      iframe.style.width = screen.width + "px";
      if (widthChanged) requestAnimationFrame(function () { autoSizeIframe(iframe); });
    }

    function renderCards() {
      var screens = options.getScreens();
      var bust = "?t=" + Date.now();
      var existing = new Map(
        Array.from(stage.querySelectorAll(":scope > .canvas-card"), function (card) { return [card.dataset.file, card]; }),
      );
      screens.forEach(function (screen, index) {
        var card = existing.get(screen.file);
        if (!card) card = createCard(screen, bust);
        existing.delete(screen.file);
        updateCard(card, screen, index);
        stage.insertBefore(card, options.getTextLayer() || null);
      });
      existing.forEach(function (card) { card.remove(); });
      options.renderTexts();
    }

    function reloadChanged(changedFiles, reloadAll) {
      var screens = options.getScreens();
      var bust = "?t=" + Date.now();
      screens.forEach(function (screen, index) {
        var fullPath = options.rawScreenPrefix + screen.file;
        if (!reloadAll && !changedFiles.some(function (file) { return file === fullPath; })) return;
        var card = document.getElementById("card-" + index);
        var iframe = card && card.querySelector("iframe");
        if (iframe) iframe.src = options.screenUrl(screen.file, bust);
      });
    }

    function autoSizeIframe(iframe) {
      try {
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        var win = iframe.contentWindow;
        var body = doc.body;
        var scrollTop = doc.documentElement.scrollTop || (body && body.scrollTop) || 0;
        var height = Math.max(
          body ? body.scrollHeight : 0,
          doc.documentElement.scrollHeight,
          body ? body.getBoundingClientRect().bottom + scrollTop : 0,
          1,
        );
        if (body) {
          var elements = body.getElementsByTagName("*");
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (isVerticallyClipped(element, win)) continue;
            var rect = element.getBoundingClientRect();
            if (Number.isFinite(rect.bottom)) height = Math.max(height, rect.bottom + scrollTop);
          }
        }
        iframe.style.height = Math.ceil(height) + "px";
      } catch (error) {
        console.error("Could not size canvas iframe", error);
      }
    }

    function isVerticallyClipped(element, win) {
      var parent = element.parentElement;
      while (parent && parent !== element.ownerDocument.body) {
        var overflow = win.getComputedStyle(parent).overflowY;
        if (overflow === "hidden" || overflow === "clip" || overflow === "auto" || overflow === "scroll") return true;
        parent = parent.parentElement;
      }
      return false;
    }

    return {
      renderCards: renderCards,
      reloadChanged: reloadChanged,
      autoSizeIframe: autoSizeIframe,
    };
  }

  global.createCanvasRenderer = createCanvasRenderer;
})(typeof window !== "undefined" ? window : globalThis);
