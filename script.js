// script.js — drag & drop PNGs + add ONE-TIME comment (no "Bearbeiten")

window.addEventListener("DOMContentLoaded", () => {
  // --------------------
  // MAP
  // --------------------
  const map = L.map("map").setView([52.3906, 13.0645], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Grenzen
const potsdamBounds = L.latLngBounds(
  [52.33, 12.95],
  [52.45, 13.20]
);

map.setMaxBounds(potsdamBounds);
map.fitBounds(potsdamBounds);

  // Marker clustering: group markers when zoomed out and show counts
  const markersCluster = L.markerClusterGroup();
  markersCluster.addTo(map);

const z = map.getZoom();
map.setMinZoom(z);

map.on("drag", () => {
  map.panInsideBounds(potsdamBounds, { animate: false });
});



  // --------------------
  // ICONS
  // --------------------
  const iconMap = {
    "blue-ballerina": L.icon({ iconUrl: encodeURI("illustrations/blue/ballerina.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "blue-child": L.icon({ iconUrl: encodeURI("illustrations/blue/child.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "blue-dad": L.icon({ iconUrl: encodeURI("illustrations/blue/dad.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "blue-grandpa": L.icon({ iconUrl: encodeURI("illustrations/blue/grandpa.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "blue-guitar": L.icon({ iconUrl: encodeURI("illustrations/blue/guitar.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "blue-guy-on-bike": L.icon({ iconUrl: encodeURI("illustrations/blue/guy_on_bike.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "blue-hammock": L.icon({ iconUrl: encodeURI("illustrations/blue/hammock.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "blue-man-with-dog": L.icon({ iconUrl: encodeURI("illustrations/blue/man_with_dog.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "blue-mum": L.icon({ iconUrl: encodeURI("illustrations/blue/mum.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "blue-old-couple": L.icon({ iconUrl: encodeURI("illustrations/blue/old_couple.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "blue-wheelchair": L.icon({ iconUrl: encodeURI("illustrations/blue/wheelchair.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "blue-yoga": L.icon({ iconUrl: encodeURI("illustrations/blue/yoga.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),

    "green-bush": L.icon({ iconUrl: encodeURI("illustrations/green/Bush.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "green-bush-2": L.icon({ iconUrl: encodeURI("illustrations/green/Bush 2.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "green-plant": L.icon({ iconUrl: encodeURI("illustrations/green/Plant.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "green-tree-1": L.icon({ iconUrl: encodeURI("illustrations/green/Tree 1.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "green-tree-2": L.icon({ iconUrl: encodeURI("illustrations/green/Tree 2.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "green-tree-3": L.icon({ iconUrl: encodeURI("illustrations/green/Tree 3.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "green-tree-4": L.icon({ iconUrl: encodeURI("illustrations/green/Tree 4.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "green-tree-5": L.icon({ iconUrl: encodeURI("illustrations/green/Tree 5.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "green-tree-6": L.icon({ iconUrl: encodeURI("illustrations/green/Tree 6.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "green-tree-7": L.icon({ iconUrl: encodeURI("illustrations/green/Tree 7.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "green-tree-8": L.icon({ iconUrl: encodeURI("illustrations/green/Tree 8.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "green-tulip": L.icon({ iconUrl: encodeURI("illustrations/green/Tulip.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),

    "pink-barbarons": L.icon({ iconUrl: encodeURI("illustrations/pink/barbarons.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "pink-cassette-player": L.icon({ iconUrl: encodeURI("illustrations/pink/cassette_player.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "pink-chair": L.icon({ iconUrl: encodeURI("illustrations/pink/chair.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "pink-disco": L.icon({ iconUrl: encodeURI("illustrations/pink/disco.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "pink-dj": L.icon({ iconUrl: encodeURI("illustrations/pink/dj.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "pink-dog": L.icon({ iconUrl: encodeURI("illustrations/pink/dog.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "pink-happy-dog": L.icon({ iconUrl: encodeURI("illustrations/pink/happy_dog.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "pink-ladder": L.icon({ iconUrl: encodeURI("illustrations/pink/ladder.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "pink-lamp": L.icon({ iconUrl: encodeURI("illustrations/pink/lamp.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "pink-mushrooms": L.icon({ iconUrl: encodeURI("illustrations/pink/mushrooms.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "pink-pillows": L.icon({ iconUrl: encodeURI("illustrations/pink/pillows.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
    "pink-sofa": L.icon({ iconUrl: encodeURI("illustrations/pink/sofa.png"), iconSize: [56, 56], iconAnchor: [28, 28] }),
  };

  // --------------------
  // POPUP HTML
  // --------------------
  function escapeHtml(str = "") {
    return String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m]));
  }

  function editPopup(text = "") {
    return `
      <div class="popupBox">
        <div style="font-weight:600;margin-bottom:6px;">Kommentar</div>
        <textarea class="commentInput" rows="3" style="width:100%;resize:vertical;">${escapeHtml(text)}</textarea>
        <button class="saveBtn" type="button" style="margin-top:8px;width:100%;cursor:pointer;">Speichern</button>
      </div>
    `;
  }

  // View mode WITHOUT "Bearbeiten"
  function viewPopup(text = "") {
    const t = (text || "").trim();
    return `
      <div class="popupBox">
        <div style="font-weight:600;margin-bottom:6px;">Kommentar</div>
        <div>${t ? escapeHtml(t) : "<i>(kein Kommentar)</i>"}</div>
      </div>
    `;
  }

  // --------------------
  // DROP SHIELD
  // --------------------
  const shield = document.getElementById("dropShield");
  let draggedType = null;

  function activateShield() {
    shield.classList.add("active");
    shield.style.display = "block";
    shield.style.pointerEvents = "auto";
  }

  function deactivateShield() {
    shield.classList.remove("active");
    shield.style.pointerEvents = "none";
    shield.style.display = "none";
  }

  deactivateShield();

  // --------------------
  // DRAG SETUP
  // --------------------
  //let draggedType = null;
const supportsPointerEvents = window.PointerEvent != null;
let lastPointerClientX = null;
let lastPointerClientY = null;
let dragPreview = null;
let dragPreviewSource = null;

function createDragPreview(src, clientX, clientY, sourceEl) {
  removeDragPreview();
  dragPreview = document.createElement('img');
  dragPreview.src = src;
  dragPreview.className = 'drag-preview';
  dragPreview.style.position = 'fixed';
  dragPreview.style.width = '56px';
  dragPreview.style.height = '56px';
  dragPreview.style.pointerEvents = 'none';
  dragPreview.style.zIndex = '9999';
  document.body.appendChild(dragPreview);
  dragPreviewSource = sourceEl;
  if (dragPreviewSource) dragPreviewSource.style.opacity = '0.4';
  moveDragPreview(clientX, clientY);
}

function moveDragPreview(clientX, clientY) {
  if (!dragPreview) return;
  dragPreview.style.left = `${clientX}px`;
  dragPreview.style.top = `${clientY}px`;
  dragPreview.style.transform = 'translate(-50%, -140%)';
}

function removeDragPreview() {
  if (dragPreviewSource) {
    dragPreviewSource.style.opacity = '';
    dragPreviewSource = null;
  }
  if (dragPreview) {
    dragPreview.remove();
    dragPreview = null;
  }
}

function performDrop(clientX, clientY, type) {
  removeDragPreview();
  deactivateShield();

  if (!type || !iconMap[type]) return;

  const bounds = map.getContainer().getBoundingClientRect();
  const x = clientX - bounds.left;
  const y = clientY - bounds.top;
  const latlng = map.containerPointToLatLng([x, y]);

  const marker = L.marker(latlng, { icon: iconMap[type] });
  marker.comment = "";

  // Bind popup (IMPORTANT: do NOT open yet)
  // Offset the popup so it appears above the illustration instead of overlapping it
  marker.bindPopup(editPopup(marker.comment), {
    closeOnClick: false,
    autoClose: false,
    interactive: true,
    offset: L.point(0, -36),
  });

  // Wire the Save button whenever popup opens
  marker.on("popupopen", () => {
    const popupEl = marker.getPopup().getElement();
    if (!popupEl) return;

    L.DomEvent.disableClickPropagation(popupEl);

    const textarea = popupEl.querySelector(".commentInput");
    const saveBtn = popupEl.querySelector(".saveBtn");

    if (saveBtn && textarea) {
      saveBtn.onclick = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        marker.comment = textarea.value.trim();
        console.log("SAVED:", marker.comment);

        // Switch to read-only view (no edit button)
        marker.setPopupContent(viewPopup(marker.comment));
        marker.openPopup();
      };
    }
  });

  // Add marker to cluster group (will aggregate when zoomed out)
  markersCluster.addLayer(marker);

  // Open popup after listener exists (cluster may keep marker visible)
  setTimeout(() => marker.openPopup(), 50);

  // Clicking marker later shows the saved comment
  marker.on("click", () => {
    marker.setPopupContent(viewPopup(marker.comment));
    marker.openPopup();
  });
}

// --------------------
// DRAG SOURCE (desktop drag)
// --------------------
document.querySelectorAll(".draggable").forEach((el) => {
  // Desktop drag
  el.addEventListener("dragstart", (e) => {
    draggedType = el.dataset.type;
    e.dataTransfer.setData("text/plain", draggedType);
    e.dataTransfer.effectAllowed = "copy";
    activateShield();
  });

  el.addEventListener("dragend", () => {
    draggedType = null;
    deactivateShield();
  });

  // Pointer start (touch/pen only)
  el.addEventListener(
    "pointerdown",
    (e) => {
      if (e.pointerType !== "touch" && e.pointerType !== "pen") return;

      draggedType = el.dataset.type;
      activePointerId = e.pointerId;
      activePointerType = e.pointerType;
      lastPointerClientX = e.clientX;
      lastPointerClientY = e.clientY;

      activateShield();
      createDragPreview(el.src, e.clientX, e.clientY, el);

      if (e.target.setPointerCapture) {
        try {
          e.target.setPointerCapture(e.pointerId);
        } catch (err) {
          // ignore if not supported
        }
      }

      e.preventDefault();
    },
    { passive: false }
  );

  // Touch fallback for devices that may not reliably emit Pointer Events
  el.addEventListener(
    "touchstart",
    (e) => {
      if (supportsPointerEvents) return;
      const touch = e.touches[0];
      if (!touch) return;

      draggedType = el.dataset.type;
      activePointerId = touch.identifier;
      activePointerType = "touch";
      lastPointerClientX = touch.clientX;
      lastPointerClientY = touch.clientY;

      activateShield();
      createDragPreview(el.src, touch.clientX, touch.clientY, el);
      e.preventDefault();
    },
    { passive: false }
  );

  el.addEventListener("pointerup", () => {
    // no-op: drop handled by the shield/global listeners
  });
  el.addEventListener("pointercancel", () => {
    // no-op: cancel handled globally
  });
});

// --------------------
// DROP TARGET (shield)
// --------------------

// Desktop drop stays as-is, but delegate to performDrop()
shield.addEventListener("drop", (e) => {
  e.preventDefault();

  const type =
    (e.dataTransfer && e.dataTransfer.getData("text/plain")) || draggedType;

  performDrop(e.clientX, e.clientY, type);

  // Clean up shared drag state
  draggedType = null;
  activePointerId = null;
});

// Keep your existing dragover for desktop
shield.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
});

// Pointer “drop”: track pointer movement on the shield, then drop on pointerup
shield.addEventListener(
  "pointermove",
  (e) => {
    if (e.pointerId !== activePointerId) return;
    if (e.pointerType !== "touch" && e.pointerType !== "pen") return;

    lastPointerClientX = e.clientX;
    lastPointerClientY = e.clientY;
    moveDragPreview(e.clientX, e.clientY);

    e.preventDefault();
  },
  { passive: false }
);

shield.addEventListener(
  "pointerup",
  (e) => {
    if (e.pointerId !== activePointerId) return;
    if (e.pointerType !== "touch" && e.pointerType !== "pen") return;

    const clientX = e.clientX ?? lastPointerClientX;
    const clientY = e.clientY ?? lastPointerClientY;

    performDrop(clientX, clientY, draggedType);

    // Clean up
    draggedType = null;
    activePointerId = null;
    lastPointerClientX = null;
    lastPointerClientY = null;

    e.preventDefault();
  },
  { passive: false }
);

shield.addEventListener(
  "pointercancel",
  (e) => {
    if (e.pointerId !== activePointerId) return;

    draggedType = null;
    activePointerId = null;
    lastPointerClientX = null;
    lastPointerClientY = null;

    deactivateShield();
    e.preventDefault();
  },
  { passive: false }
);

window.addEventListener(
  "pointermove",
  (e) => {
    if (!activePointerId) return;
    if (e.pointerId !== activePointerId) return;
    lastPointerClientX = e.clientX;
    lastPointerClientY = e.clientY;
    moveDragPreview(e.clientX, e.clientY);
    e.preventDefault();
  },
  { passive: false }
);

window.addEventListener(
  "pointerup",
  (e) => {
    if (!activePointerId) return;
    if (e.pointerId !== activePointerId) return;

    const clientX = e.clientX ?? lastPointerClientX;
    const clientY = e.clientY ?? lastPointerClientY;

    performDrop(clientX, clientY, draggedType);
    draggedType = null;
    activePointerId = null;
    lastPointerClientX = null;
    lastPointerClientY = null;
  }
);

window.addEventListener(
  "pointercancel",
  (e) => {
    if (!activePointerId) return;
    if (e.pointerId !== activePointerId) return;

    draggedType = null;
    activePointerId = null;
    lastPointerClientX = null;
    lastPointerClientY = null;
    deactivateShield();
  }
);

window.addEventListener(
  "touchmove",
  (e) => {
    if (supportsPointerEvents) return;
    if (activePointerType !== "touch") return;
    const touch = [...e.touches].find((t) => t.identifier === activePointerId) || e.touches[0];
    if (!touch) return;

    lastPointerClientX = touch.clientX;
    lastPointerClientY = touch.clientY;
    moveDragPreview(touch.clientX, touch.clientY);
    e.preventDefault();
  },
  { passive: false }
);

window.addEventListener(
  "touchend",
  (e) => {
    if (supportsPointerEvents) return;
    if (activePointerType !== "touch") return;
    const touch = [...e.changedTouches].find((t) => t.identifier === activePointerId) || e.changedTouches[0];
    if (!touch) return;

    performDrop(touch.clientX, touch.clientY, draggedType);
    draggedType = null;
    activePointerId = null;
    activePointerType = null;
    lastPointerClientX = null;
    lastPointerClientY = null;
  },
  { passive: false }
);

window.addEventListener(
  "touchcancel",
  (e) => {
    if (supportsPointerEvents) return;
    if (activePointerType !== "touch") return;
    draggedType = null;
    activePointerId = null;
    activePointerType = null;
    lastPointerClientX = null;
    lastPointerClientY = null;
    deactivateShield();
  },
  { passive: false }
);

});

// --------------------
// SIDEBAR FILTER (click question bubbles to filter illustrations)
// --------------------
(() => {
  const sidebar = document.querySelector(".elements");
  if (!sidebar) return;

  const filterHeader = sidebar.querySelector(".filter-header");
  const filterBubble = filterHeader ? filterHeader.querySelector(".sidebar-filter-bubble") : null;
  const backBtn = filterHeader ? filterHeader.querySelector(".sidebar-back-btn") : null;

  function clearFilter() {
    // show all draggable items
    document.querySelectorAll('.elements .draggable').forEach((el) => {
      el.style.display = '';
    });
    if (filterHeader) filterHeader.style.display = 'none';
  }

  function applyFilter(color, bubbleEl) {
    document.querySelectorAll('.elements .draggable').forEach((el) => {
      const t = el.dataset.type || '';
      if (t.startsWith(color + '-')) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });

    if (filterHeader && filterBubble) {
      filterHeader.style.display = 'flex';
      // copy bubble content and color class
      filterBubble.innerHTML = bubbleEl.innerHTML;
      // copy color class so it looks like the question bubble (bubble-green/pink/blue)
      filterBubble.className = 'sidebar-filter-bubble';
      bubbleEl.classList.forEach((c) => {
        if (c.startsWith('bubble-')) filterBubble.classList.add(c);
      });
    }
  }

  // wire back button
  if (backBtn) backBtn.addEventListener('click', () => clearFilter());

  // map question bubbles
  document.querySelectorAll('.bubble').forEach((b) => {
    b.addEventListener('click', (ev) => {
      ev.preventDefault();
      // determine color from class (bubble-green, bubble-pink, bubble-blue)
      const cls = Array.from(b.classList).find((c) => c.startsWith('bubble-'));
      if (!cls) return;
      const color = cls.replace('bubble-', '');
      applyFilter(color, b);
    });
  });
})();
