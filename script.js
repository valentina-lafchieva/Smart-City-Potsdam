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

const z = map.getZoom();
map.setMinZoom(z);

map.on("drag", () => {
  map.panInsideBounds(potsdamBounds, { animate: false });
});



  // --------------------
  // ICONS
  // --------------------
  const iconMap = {
    dog: L.icon({ iconUrl: "dog.png", iconSize: [48, 48], iconAnchor: [24, 24] }),
    disco: L.icon({ iconUrl: "disco_ball.png", iconSize: [48, 48], iconAnchor: [24, 24] }),
    mushroom: L.icon({ iconUrl: "mushrooms.png", iconSize: [48, 48], iconAnchor: [24, 24] }),
    ballerina: L.icon({ iconUrl: "ballerina.png", iconSize: [80, 48], iconAnchor: [24, 24] }),
    guitar: L.icon({ iconUrl: "guitar.png", iconSize: [80, 48], iconAnchor: [24, 24] }),
    skater: L.icon({ iconUrl: "skater.png", iconSize: [48, 48], iconAnchor: [24, 24] }),
    bush: L.icon({ iconUrl: "bush.png", iconSize: [80, 48], iconAnchor: [24, 24] }),
    tree1: L.icon({ iconUrl: "tree1.png", iconSize: [48, 80], iconAnchor: [24, 24] }),
    tree2: L.icon({ iconUrl: "tree2.png", iconSize: [48, 48], iconAnchor: [24, 24] }),
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
  document.querySelectorAll(".draggable").forEach((el) => {
    el.addEventListener("dragstart", (e) => {
      draggedType = el.dataset.type;
      e.dataTransfer.setData("text/plain", draggedType);
      e.dataTransfer.effectAllowed = "copy";
      activateShield();
    });

    el.addEventListener("dragend", () => {
      deactivateShield();
    });
  });

  shield.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
  });

  // --------------------
  // DROP => MARKER + ONE-TIME COMMENT
  // --------------------
  shield.addEventListener("drop", (e) => {
    e.preventDefault();
    deactivateShield();

    const type = (e.dataTransfer && e.dataTransfer.getData("text/plain")) || draggedType;
    if (!type || !iconMap[type]) return;

    const bounds = map.getContainer().getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const latlng = map.containerPointToLatLng([x, y]);

    const marker = L.marker(latlng, { icon: iconMap[type] }).addTo(map);
    marker.comment = "";

    // Bind popup (IMPORTANT: do NOT open yet)
    marker.bindPopup(editPopup(marker.comment), {
      closeOnClick: false,
      autoClose: false,
      interactive: true,
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

    // Open popup after listener exists
    marker.openPopup();

    // Clicking marker later shows the saved comment
    marker.on("click", () => {
      marker.setPopupContent(viewPopup(marker.comment));
      marker.openPopup();
    });
  });
});
