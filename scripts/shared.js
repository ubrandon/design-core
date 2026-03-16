function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2000);
}

function copyLink(url, btn) {
  navigator.clipboard.writeText(url).then(() => {
    if (btn) {
      const original = btn.textContent;
      btn.textContent = "Copied!";
      btn.classList.add("is-copied");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("is-copied");
      }, 1500);
    } else {
      showToast("Link copied!");
    }
  });
}

function prototypeUrl(projectId, protoId) {
  const origin = window.location.origin;
  const base = document.baseURI || origin + "/";
  return base + "prototype.html?project=" + projectId + "&proto=" + protoId;
}
