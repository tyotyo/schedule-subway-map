// Export the rendered subway-map <svg> as a downloadable PNG.
// CSS variables (var(--fg-1) …) and fonts won't resolve in a detached SVG, so
// we inline each node's *computed* style before serializing, then rasterize via
// canvas. The grid background lives on the container div (not the SVG), so we
// paint a solid dark rect behind everything.

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportMapPng(svgEl, { filename = "subway-map.png", scale = 2, background = "#11161D" } = {}) {
  if (!svgEl) return;

  const vb = svgEl.viewBox && svgEl.viewBox.baseVal;
  const w = vb && vb.width ? vb.width : svgEl.clientWidth || 680;
  const h = vb && vb.height ? vb.height : svgEl.clientHeight || 380;

  // Clone and copy resolved styles node-by-node.
  const clone = svgEl.cloneNode(true);
  const src = svgEl.querySelectorAll("*");
  const dst = clone.querySelectorAll("*");
  const props = ["fill", "stroke", "stroke-width", "opacity", "font-family", "font-size", "font-weight", "letter-spacing", "stroke-linecap"];
  src.forEach((s, i) => {
    const cs = getComputedStyle(s);
    const d = dst[i];
    if (!d) return;
    props.forEach((p) => {
      const v = cs.getPropertyValue(p);
      if (v) d.style.setProperty(p, v);
    });
  });
  clone.setAttribute("width", w);
  clone.setAttribute("height", h);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bg.setAttribute("x", 0);
  bg.setAttribute("y", 0);
  bg.setAttribute("width", w);
  bg.setAttribute("height", h);
  bg.setAttribute("fill", background);
  clone.insertBefore(bg, clone.firstChild);

  const xml = new XMLSerializer().serializeToString(clone);
  const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);

  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch (e) { /* best effort */ }
  }

  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = svgUrl;
  });

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  ctx.drawImage(img, 0, 0);

  await new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, filename);
      resolve();
    }, "image/png");
  });
}
