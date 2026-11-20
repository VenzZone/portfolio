/*-- START DARK MODE --*/
function setActive(element) {
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active", "show");
    const dd = item.querySelector(".dropdown");
    if (dd) dd.classList.remove("up", "down");
  });
  element.classList.add("active");
}

function toggleDropdown(element) {
  const dropdown = element.querySelector(".dropdown");

  document.querySelectorAll(".menu-item").forEach((item) => {
    if (item !== element) {
      item.classList.remove("show");
      const dd = item.querySelector(".dropdown");
      if (dd) dd.classList.remove("up", "down");
    }
  });

  element.classList.toggle("show");

  if (element.classList.contains("show")) {
    const rect = element.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    dropdown.classList.remove("up", "down");
    if (spaceBelow >= 150 || spaceBelow >= spaceAbove) {
      dropdown.classList.add("down");
    } else {
      dropdown.classList.add("up");
    }
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

window.addEventListener("click", function (e) {
  if (!e.target.closest(".menu-item")) {
    document.querySelectorAll(".menu-item").forEach((item) => {
      item.classList.remove("show");
      const dd = item.querySelector(".dropdown");
      if (dd) dd.classList.remove("up", "down");
    });
  }
}); /*-- END DARK MODE --*/

/*-- START MODAL CONTACT --*/
function showContactInfo() {
  alert(
    "📧 Email: vhariola@gmail.com\n" +
      "📞 Contact: +63 928 823 6562\n" +
      "📍 Address: San Jose, Batangas City, Philippines\n" +
      "🌐 Portfolio: https://www.behance.net/venzonariola1",
  );
} /*-- END MODAL CONTACT --*/

/*-- START BURGER MENU TOGGLE --*/
function toggleMenu() {
  const header = document.querySelector(".header-bar");
  header.classList.toggle("active");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
/*-- END BURGER MENU TOGGLE --*/

/*-- DOWNLOAD PDF FILE --*/
function openPDF() {
  window.open("assets/Venzon_Ariola_Professional_Resume.pdf", "_blank");
}

/*--- START IPHONE ACCORDION ---*/
(function () {
  var counter = 0;

  // Reads the host's current text color: light text => the site is in dark mode.
  function applyTone(root) {
    var force = root.getAttribute("data-ipx-theme");
    var dark;
    if (force === "dark" || force === "light") {
      dark = force === "dark";
    } else {
      var m = getComputedStyle(root).color.match(/[\d.]+/g) || [0, 0, 0];
      var lum = (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
      dark = lum > 0.5;
    }
    root.setAttribute("data-ipx-tone", dark ? "dark" : "light");
  }

  function watchTheme(root) {
    var run = function () {
      applyTone(root);
      setTimeout(function () {
        applyTone(root);
      }, 400); // after the site's color transition
    };
    run();
    var mo = new MutationObserver(run);
    var opts = {
      attributes: true,
      attributeFilter: [
        "class",
        "style",
        "data-theme",
        "data-bs-theme",
        "data-mode",
        "data-color-scheme",
      ],
    };
    mo.observe(document.documentElement, opts);
    if (document.body) mo.observe(document.body, opts);
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", run);
    }
  }

  function initIpx(root) {
    if (root.getAttribute("data-ipx-ready")) return;
    root.setAttribute("data-ipx-ready", "1");
    watchTheme(root);

    // unique accordion group per instance, so several showcases never close each other
    var group = "ipx-feature-" + ++counter;
    var items = Array.prototype.slice.call(root.querySelectorAll(".ipx__item"));
    items.forEach(function (d) {
      d.setAttribute("name", group);
    });

    function openIndex() {
      for (var i = 0; i < items.length; i++) if (items[i].open) return i;
      return -1;
    }

    function go(step) {
      var i = openIndex();
      if (i === -1) return;
      items[i].open = false;
      items[(i + step + items.length) % items.length].open = true;
    }

    var actions = {
      next: function () {
        go(1);
      },
      prev: function () {
        go(-1);
      },
      exit: function () {
        var i = openIndex();
        if (i !== -1) items[i].open = false;
      },
    };

    Array.prototype.forEach.call(
      root.querySelectorAll("[data-ipx-action]"),
      function (btn) {
        btn.addEventListener(
          "click",
          actions[btn.getAttribute("data-ipx-action")],
        );
      },
    );

    function syncState() {
      if (!root.querySelector(".ipx__item[open]")) {
        root.setAttribute("data-ipx-checking", "false");
        return;
      }
      var anims = root.getAnimations
        ? root.getAnimations({ subtree: true })
        : [];
      Promise.allSettled(
        anims.map(function (a) {
          return a.finished;
        }),
      ).then(function () {
        root.setAttribute("data-ipx-checking", "true");
      });
    }

    root.addEventListener("toggle", syncState, true);
  }

  function initAll() {
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-ipx]"),
      initIpx,
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
/*--- END IPHONE ACCORDION ---*/

/*---START SLIDER TECH---*/
const slidesData = [
  {
    url: "image/techs/tech1.png",
    category: "Technical Support",
    title: "Network Infrastructure",
    description:
      "Network cabling, server connections, and network infrastructure to ensure reliable connectivity and efficient system operations.",
  },
  {
    url: "image/techs/tech2.jpg",
    category: "Tech Support Specialist",
    title: "IT Support",
    description:
      "Provided hardware and software troubleshooting, installation, and maintenance.",
  },
];

let currentIndex = 0;
let isAutoPlaying = true;
let isHovered = false;
let isLightboxOpen = false;
let progressInterval = null;
const SLIDE_DURATION = 5000;
let progressValue = 0;

let touchStartX = 0;
let touchEndX = 0;

const slidesTrack = document.getElementById("slidesTrack");
const dotsContainer = document.getElementById("dotsContainer");
const slideTitle = document.getElementById("slideTitle");
const slideCategory = document.getElementById("slideCategory");
const slideDescription = document.getElementById("slideDescription");
const currentSlideNum = document.getElementById("currentSlideNum");
const totalSlidesNum = document.getElementById("totalSlidesNum");
const progressBar = document.getElementById("progressBar");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const toggleAutoPlayBtn = document.getElementById("toggleAutoPlayBtn");
const pausePlayIconContainer = document.getElementById(
  "pausePlayIconContainer",
);
const pausePlayText = document.getElementById("pausePlayText");
const sliderWrapper = document.getElementById("sliderWrapper");
const clickZoomHint = document.getElementById("clickZoomHint");

const lightboxModal = document.getElementById("lightboxModal");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
const lightboxNextBtn = document.getElementById("lightboxNextBtn");

const pauseSvg = `<svg class="icon-sm text-emerald" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
const playSvg = `<svg class="icon-sm text-indigo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;

function renderCarousel() {
  slidesTrack.innerHTML = "";
  dotsContainer.innerHTML = "";

  slidesData.forEach((slide, index) => {
    const slideEl = document.createElement("div");
    slideEl.className = "slide-item";
    slideEl.innerHTML = `
                    <img 
                        src="${slide.url}" 
                        alt="${slide.title}" 
                        loading="${index === 0 ? "eager" : "lazy"}"
                    >
                `;

    slideEl.addEventListener("click", () => {
      openLightbox(index);
    });

    slidesTrack.appendChild(slideEl);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `dot-btn ${index === currentIndex ? "active" : "inactive"}`;
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  totalSlidesNum.textContent = String(slidesData.length).padStart(2, "0");
  updateSlideUI();
}

function updateSlideUI() {
  const currentData = slidesData[currentIndex];

  slidesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  slideTitle.textContent = currentData.title;
  slideCategory.textContent = currentData.category;
  slideDescription.textContent = currentData.description;
  currentSlideNum.textContent = String(currentIndex + 1).padStart(2, "0");

  Array.from(dotsContainer.children).forEach((dot, idx) => {
    dot.className = `dot-btn ${idx === currentIndex ? "active" : "inactive"}`;
  });

  if (isLightboxOpen) {
    updateLightboxContent();
  }

  resetProgressBar();
}

function goToSlide(index) {
  currentIndex = (index + slidesData.length) % slidesData.length;
  updateSlideUI();
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function startProgressBar() {
  stopProgressBar();
  if (!isAutoPlaying || isHovered || isLightboxOpen) return;

  progressValue = 0;
  const stepTime = 50;
  const totalSteps = SLIDE_DURATION / stepTime;

  progressInterval = setInterval(() => {
    if (isAutoPlaying && !isHovered && !isLightboxOpen) {
      progressValue += 100 / totalSteps;
      progressBar.style.width = `${Math.min(progressValue, 100)}%`;

      if (progressValue >= 100) {
        nextSlide();
      }
    }
  }, stepTime);
}

function stopProgressBar() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
}

function resetProgressBar() {
  progressBar.style.width = "0%";
  startProgressBar();
}

function toggleAutoplay() {
  isAutoPlaying = !isAutoPlaying;
  if (isAutoPlaying) {
    pausePlayText.textContent = "Pause Autoplay";
    pausePlayIconContainer.innerHTML = pauseSvg;
    startProgressBar();
  } else {
    pausePlayText.textContent = "Play Autoplay";
    pausePlayIconContainer.innerHTML = playSvg;
    stopProgressBar();
    progressBar.style.width = "0%";
  }
}

sliderWrapper.addEventListener("mouseenter", () => {
  isHovered = true;
  stopProgressBar();
});

sliderWrapper.addEventListener("mouseleave", () => {
  isHovered = false;
  startProgressBar();
});

clickZoomHint.addEventListener("click", (e) => {
  e.stopPropagation();
  openLightbox(currentIndex);
});

sliderWrapper.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true },
);

sliderWrapper.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true },
);

function handleSwipe() {
  const threshold = 40;
  if (touchEndX < touchStartX - threshold) {
    nextSlide();
  } else if (touchEndX > touchStartX + threshold) {
    prevSlide();
  }
}

function openLightbox(index) {
  currentIndex = index;
  isLightboxOpen = true;
  stopProgressBar();
  updateLightboxContent();

  lightboxModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  isLightboxOpen = false;
  lightboxModal.classList.remove("active");
  document.body.style.overflow = "";
  startProgressBar();
}

function updateLightboxContent() {
  const currentData = slidesData[currentIndex];
  lightboxImg.src = currentData.url;
  lightboxImg.alt = currentData.title;
  lightboxTitle.textContent = currentData.title;
  lightboxCounter.textContent = `${currentIndex + 1} of ${slidesData.length}`;
}

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  prevSlide();
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  nextSlide();
});

toggleAutoPlayBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleAutoplay();
});

lightboxCloseBtn.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);

lightboxPrevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  prevSlide();
});

lightboxNextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  nextSlide();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isLightboxOpen) {
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === " ") {
    e.preventDefault();
    toggleAutoplay();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  renderCarousel();
  startProgressBar();
});

/*---END SLIDER TECH---*/

/*-- START BASIC ACCORDION --*/
document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem
            .querySelector(".accordion-header")
            .setAttribute("aria-expanded", "false");
          otherItem.querySelector(".accordion-content").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("active");
        header.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null;
      } else {
        item.classList.add("active");
        header.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
/*-- END BASIC ACCORDION --*/

/*-- START GLOBE ANIMATION --*/
const container = document.getElementById("canvas-container");
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 7.8);

// Renderer setup with explicit alpha transparency
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

// Orbit controls for interactive mouse dragging
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.8;
controls.enableZoom = false; // Disabled scroll zooming
controls.enablePan = false;

// Custom Shader for soft, blurred wave displacement (No white highlights)
const waveVertexShader = `
            uniform float uTime;
            uniform float uAmplitude;
            uniform float uFrequency;
            uniform float uPulseTime;
            uniform vec3 uPulseOrigin;
            uniform float uPixelRatio;

            varying vec3 vNormal;
            varying vec3 vPosition;
            varying float vWaveDisplacement;
            varying float vPulse;

            // 3D Simplex noise implementation
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

            float snoise(vec3 v) {
                const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

                vec3 i  = floor(v + dot(v, C.yyy));
                vec3 x0 = v - i + dot(i, C.xxx);

                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min(g.xyz, l.zxy);
                vec3 i2 = max(g.xyz, l.zxy);

                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;

                i = mod289(i);
                vec4 p = permute(permute(permute(
                            i.z + vec4(0.0, i1.z, i2.z, 1.0))
                          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

                float n_ = 0.142857142857;
                vec3 ns = n_ * D.wyz - D.xzx;

                vec4 j = p - 49.0 * floor(p * ns.z);

                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_);

                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);

                vec4 b0 = vec4(x.xy, y.xy);
                vec4 b1 = vec4(x.zw, y.zw);

                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));

                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

                vec3 p0 = vec3(a0.xy, h.x);
                vec3 p1 = vec3(a0.zw, h.y);
                vec3 p2 = vec3(a1.xy, h.z);
                vec3 p3 = vec3(a1.zw, h.w);

                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;

                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
            }

            void main() {
                vNormal = normal;
                vPosition = position;

                float time = uTime * uFrequency;
                float noiseVal = snoise(position * 1.2 + vec3(time * 0.35));
                float waveVal = sin(position.y * 3.0 + time) * cos(position.x * 3.0 + time) * 0.5;

                float displacement = (noiseVal * 0.75 + waveVal * 0.25) * uAmplitude;
                vWaveDisplacement = displacement;

                // Softened, blurred shockwave expansion
                float pulseRadius = uPulseTime * 6.0;
                float distToPulse = distance(position, uPulseOrigin);
                float pulseWave = smoothstep(pulseRadius - 1.8, pulseRadius, distToPulse) * (1.0 - smoothstep(pulseRadius, pulseRadius + 1.8, distToPulse));
                float pulseEffect = pulseWave * max(0.0, 1.0 - uPulseTime * 0.3) * 1.0;
                vPulse = pulseEffect;

                vec3 displacedPosition = position + normal * (displacement + pulseEffect * 1.2);
                vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
                gl_Position = projectionMatrix * mvPosition;

                // Larger particle points for blurred soft glow
                gl_PointSize = (7.0 + pulseEffect * 8.0) * (2.8 / -mvPosition.z) * uPixelRatio;
            }
        `;

const waveFragmentShader = `
            uniform vec3 uColorPrimary;
            uniform vec3 uColorSecondary;
            uniform float uPulseColorSwitch;

            varying vec3 vNormal;
            varying vec3 vPosition;
            varying float vWaveDisplacement;
            varying float vPulse;

            void main() {
                float distToCenter = length(gl_PointCoord - vec2(0.5));
                if (distToCenter > 0.5) discard;

                // Smooth falloff for blurred particle glow
                float alpha = pow(smoothstep(0.5, 0.0, distToCenter), 1.5);
                
                // Color interpolation strictly between Orange (#fd6209) and Blue (#4a99e4)
                float t = clamp(vWaveDisplacement * 2.0 + 0.5, 0.0, 1.0);
                vec3 color = mix(uColorPrimary, uColorSecondary, t);

                // Pulse switches color smoothly without white flash
                if (vPulse > 0.01) {
                    vec3 pulseColor = (uPulseColorSwitch > 0.5) ? uColorPrimary : uColorSecondary;
                    color = mix(color, pulseColor, vPulse * 1.2);
                }

                gl_FragColor = vec4(color, alpha);
            }
        `;

const shaderUniforms = {
  uTime: {
    value: 0,
  },
  uAmplitude: {
    value: 0.32,
  },
  uFrequency: {
    value: 1.6,
  },
  uColorPrimary: {
    value: new THREE.Color(0xfd6209),
  }, // Orange (#fd6209)
  uColorSecondary: {
    value: new THREE.Color(0x4a99e4),
  }, // Blue (#4a99e4)
  uPulseOrigin: {
    value: new THREE.Vector3(0, 0, 0),
  },
  uPulseTime: {
    value: 10.0,
  },
  uPulseColorSwitch: {
    value: 1.0,
  },
  uPixelRatio: {
    value: Math.min(window.devicePixelRatio, 2),
  },
};

const VISIBLE_BLENDING = {
  blending: THREE.CustomBlending,
  blendEquation: THREE.AddEquation,
  blendSrc: THREE.SrcAlphaFactor,
  blendDst: THREE.OneMinusSrcAlphaFactor,
  blendSrcAlpha: THREE.OneFactor,
  blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
};

const hologramGroup = new THREE.Group();
scene.add(hologramGroup);

// --- 1. Semi-Transparent Inner Atmosphere Core ---
const innerGlowGeo = new THREE.SphereGeometry(1.08, 32, 32);
const innerGlowMat = new THREE.MeshBasicMaterial({
  color: 0x4a99e4,
  transparent: true,
  opacity: 0.35,
  side: THREE.BackSide,
  ...VISIBLE_BLENDING,
  depthWrite: false,
});
const innerGlowMesh = new THREE.Mesh(innerGlowGeo, innerGlowMat);
hologramGroup.add(innerGlowMesh);

// --- 2. High-Definition Visible Globe Canvas Map (Continents + Grid) ---
const globeCanvas = document.createElement("canvas");
globeCanvas.width = 2048;
globeCanvas.height = 1024;
const gCtx = globeCanvas.getContext("2d");

gCtx.clearRect(0, 0, 2048, 1024);

// Draw Latitude / Longitude Lines
gCtx.strokeStyle = "rgba(74, 153, 228, 0.6)";
gCtx.lineWidth = 2;
for (let i = 0; i < 2048; i += 128) {
  gCtx.beginPath();
  gCtx.moveTo(i, 0);
  gCtx.lineTo(i, 1024);
  gCtx.stroke();
}
for (let j = 0; j < 1024; j += 128) {
  gCtx.beginPath();
  gCtx.moveTo(0, j);
  gCtx.lineTo(2048, j);
  gCtx.stroke();
}

// Draw Stylized Visible Continent Outlines & Dot Arrays
gCtx.fillStyle = "#fd6209";
gCtx.strokeStyle = "#fd6209";
gCtx.lineWidth = 3;

const landmassPaths = [];

function drawLandmass(points) {
  const path = new Path2D();
  path.moveTo(points[0][0], points[0][1]);
  for (let k = 1; k < points.length; k++) {
    path.lineTo(points[k][0], points[k][1]);
  }
  path.closePath();
  landmassPaths.push(path);

  gCtx.beginPath();
  gCtx.moveTo(points[0][0], points[0][1]);
  for (let k = 1; k < points.length; k++) {
    gCtx.lineTo(points[k][0], points[k][1]);
  }
  gCtx.closePath();
  gCtx.stroke();
  gCtx.fillStyle = "rgba(253, 98, 9, 0.6)";
  gCtx.fill();
}

drawLandmass([
  [250, 200],
  [520, 220],
  [480, 480],
  [350, 450],
  [280, 320],
]); // North America
drawLandmass([
  [420, 520],
  [530, 550],
  [480, 850],
  [400, 750],
  [380, 600],
]); // South America
drawLandmass([
  [950, 200],
  [1200, 180],
  [1150, 380],
  [980, 350],
  [920, 250],
]); // Europe
drawLandmass([
  [920, 380],
  [1180, 400],
  [1120, 780],
  [980, 750],
  [880, 500],
]); // Africa
drawLandmass([
  [1200, 180],
  [1750, 220],
  [1680, 550],
  [1350, 500],
  [1220, 350],
]); // Asia
drawLandmass([
  [1500, 620],
  [1780, 650],
  [1720, 880],
  [1480, 820],
]); // Australia

gCtx.fillStyle = "rgba(253, 98, 9, 1)";
for (let x = 0; x < 2048; x += 16) {
  for (let y = 0; y < 1024; y += 16) {
    if (landmassPaths.some((path) => gCtx.isPointInPath(path, x, y))) {
      gCtx.fillRect(x, y, 4, 4);
    }
  }
}

const globeTexture = new THREE.CanvasTexture(globeCanvas);
const coreGeo = new THREE.SphereGeometry(1.1, 64, 64);
const coreMaterial = new THREE.MeshBasicMaterial({
  map: globeTexture,
  transparent: true,
  opacity: 1.0,
  ...VISIBLE_BLENDING,
  depthWrite: false,
});
const coreMesh = new THREE.Mesh(coreGeo, coreMaterial);
hologramGroup.add(coreMesh);

// Core Wireframe Tech Mesh Overlay
const coreWireframeMat = new THREE.MeshBasicMaterial({
  color: 0x4a99e4,
  wireframe: true,
  transparent: true,
  opacity: 0.55,
  ...VISIBLE_BLENDING,
  depthWrite: false,
});
const coreWireMesh = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.13, 2),
  coreWireframeMat,
);
hologramGroup.add(coreWireMesh);

// --- 3. Outer Wave Shells ---
const waveShaderMat = new THREE.ShaderMaterial({
  vertexShader: waveVertexShader,
  fragmentShader: waveFragmentShader,
  uniforms: shaderUniforms,
  transparent: true,
  ...VISIBLE_BLENDING,
  depthWrite: false,
});

const innerShellPoints = new THREE.Points(
  new THREE.IcosahedronGeometry(1.5, 6),
  waveShaderMat,
);
const middleShellPoints = new THREE.Points(
  new THREE.IcosahedronGeometry(2.1, 7),
  waveShaderMat,
);
const outerShellPoints = new THREE.Points(
  new THREE.IcosahedronGeometry(2.6, 8),
  waveShaderMat,
);

hologramGroup.add(innerShellPoints, middleShellPoints, outerShellPoints);

// --- 4. Orbiting HUD Rings ---
function createBinaryRing(radius, height, tiltX, speedFactor) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = 'bold 22px "Courier New", monospace';
  ctx.fillStyle = "#fd6209";

  let binaryStr = "";
  for (let i = 0; i < 90; i++) {
    binaryStr += (Math.random() > 0.5 ? "1010" : "0101") + " ";
  }
  ctx.fillText(binaryStr, 10, 42);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(2, 1);

  const ringGeo = new THREE.CylinderGeometry(
    radius,
    radius,
    height,
    64,
    1,
    true,
  );
  const ringMat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
    opacity: 0.95,
    ...VISIBLE_BLENDING,
    depthWrite: false,
  });

  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = tiltX;
  return {
    mesh: ringMesh,
    texture: texture,
    speed: speedFactor,
  };
}

const ring1 = createBinaryRing(3.1, 0.22, Math.PI / 12, 0.002);
const ring2 = createBinaryRing(3.4, 0.18, -Math.PI / 10, -0.003);
hologramGroup.add(ring1.mesh, ring2.mesh);

// --- 5. Ambient Particles ---
const ambientGeo = new THREE.BufferGeometry();
const pCount = 500;
const pPositions = new Float32Array(pCount * 3);
for (let i = 0; i < pCount * 3; i += 3) {
  pPositions[i] = (Math.random() - 0.5) * 15;
  pPositions[i + 1] = (Math.random() - 0.5) * 15;
  pPositions[i + 2] = (Math.random() - 0.5) * 15;
}
ambientGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));

const ambientMat = new THREE.PointsMaterial({
  size: 0.035,
  color: 0x4a99e4,
  transparent: true,
  opacity: 0.85,
  ...VISIBLE_BLENDING,
  depthWrite: false,
});
const ambientParticles = new THREE.Points(ambientGeo, ambientMat);
scene.add(ambientParticles);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function triggerPulse(point) {
  shaderUniforms.uPulseOrigin.value.copy(point);
  shaderUniforms.uPulseTime.value = 0.0;
  shaderUniforms.uPulseColorSwitch.value =
    shaderUniforms.uPulseColorSwitch.value > 0.5 ? 0.0 : 1.0;
}

window.addEventListener("pointerdown", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(outerShellPoints);

  if (intersects.length > 0) {
    triggerPulse(intersects[0].point);
  } else {
    const targetPt = new THREE.Vector3(0, 0, 1.5).applyQuaternion(
      camera.quaternion,
    );
    triggerPulse(targetPt);
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();
  shaderUniforms.uTime.value = elapsedTime;

  if (shaderUniforms.uPulseTime.value < 8.0) {
    shaderUniforms.uPulseTime.value += 0.025;
  }

  // Orbital Rotations
  hologramGroup.rotation.y += 0.004;
  hologramGroup.rotation.x += 0.0012;

  coreMesh.rotation.y -= 0.005;

  ring1.mesh.rotation.y += ring1.speed;
  ring1.texture.offset.x += 0.002;

  ring2.mesh.rotation.y += ring2.speed;
  ring2.texture.offset.x -= 0.0025;

  ambientParticles.rotation.y += 0.0008;

  controls.update();
  renderer.render(scene, camera);
}

window.onload = function () {
  animate();
};
/*-- END GLOBE ANIMATION --*/

/*-- START TAB CERTIFICATE --*/
(function () {
  "use strict";
  if (window.CertShowcase) return;

  var P = {
    award:
      '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>',
    palette:
      '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.7 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.7 1.7-1.7H16c3.3 0 6-2.7 6-6 0-4.9-4.5-8.4-10-8.4z"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9z"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
    ext: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    dl: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    print:
      '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    zoom: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',
  };
  function svg(inner) {
    return (
      '<svg class="cert-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      inner +
      "</svg>"
    );
  }
  function icon(name) {
    if (name && String(name).trim().indexOf("<svg") === 0) return name;
    return svg(P[name] || P.award);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }
  function safeUrl(u) {
    u = String(u || "").trim();
    return /^javascript:/i.test(u) ? "" : u;
  }

  var DARK_SELECTORS =
    '.dark, .dark-mode, .dark-theme, .theme-dark, .night-mode, [data-theme="dark"], [data-bs-theme="dark"], [data-mode="dark"], [data-color-scheme="dark"]';
  var uid = 0;
  var isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var canInlinePdf = !isIOS && navigator.pdfViewerEnabled !== false;
  var reduceMotion =
    window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function init(root) {
    if (root.__cert) return;

    var d = root.dataset;
    var pv = String(d.perView || "1,2,3")
      .split(",")
      .map(function (n) {
        return parseInt(n, 10) || 1;
      });
    var opt = {
      theme: d.theme || "auto",
      accent: d.accent || "",
      autoplay: d.autoplay != null ? +d.autoplay : 3800,
      gap: d.gap != null ? +d.gap : 20,
      darkSelector: d.darkSelector || "",
      subtitle: d.subtitle || "Certificate",
      mobile: pv[0],
      tablet: pv[1] || pv[0],
      desktop: pv[2] || pv[1] || pv[0],
    };

    var cats = [].slice
      .call(root.querySelectorAll(".cert-category"))
      .filter(function (c) {
        return c.querySelector(".cert-card");
      });
    if (!cats.length) {
      console.warn("[CertShowcase] No .cert-category with .cert-card found.");
      return;
    }
    root.__cert = true;

    var id = "cert" + ++uid;
    root.setAttribute("data-theme", opt.theme);
    if (opt.accent) root.style.setProperty("--cert-accent", opt.accent);

    var suppressClick = false,
      modalOpen = false;

    var tabsWrap = document.createElement("div");
    tabsWrap.className = "cert-tabs-wrap";
    if (cats.length < 2) tabsWrap.hidden = true;
    tabsWrap.innerHTML =
      '<div class="cert-tabs" role="tablist" aria-label="Certificate categories"><span class="cert-pill"></span>' +
      cats
        .map(function (c, i) {
          return (
            '<button type="button" role="tab" class="cert-tab" id="' +
            id +
            "-t" +
            i +
            '" aria-controls="' +
            id +
            "-p" +
            i +
            '" aria-selected="' +
            (i === 0) +
            '" tabindex="' +
            (i === 0 ? 0 : -1) +
            '">' +
            icon(c.getAttribute("data-icon")) +
            "<span>" +
            esc(c.getAttribute("data-name") || "Certificates") +
            "</span></button>"
          );
        })
        .join("") +
      "</div>";
    root.insertBefore(tabsWrap, root.firstChild);
    var tabsEl = tabsWrap.querySelector(".cert-tabs");
    var pill = tabsWrap.querySelector(".cert-pill");
    var tabs = [].slice.call(tabsWrap.querySelectorAll(".cert-tab"));

    function enhanceCard(card) {
      var img = card.querySelector("img");
      var titleEl = card.querySelector(".cert-title");
      var metaEl = card.querySelector(".cert-meta");
      var href = (card.getAttribute("href") || "").trim();
      var pdf = href && href !== "#" ? safeUrl(href) : "";
      var item = {
        title: titleEl
          ? titleEl.textContent.trim()
          : (img && img.alt) || "Certificate",
        meta: metaEl ? metaEl.textContent.trim() : "",
        pdf: pdf,
        image: img ? safeUrl(img.getAttribute("src")) : "",
      };

      var thumb = document.createElement("span");
      thumb.className = "cert-image";
      if (img) {
        img.alt = "";
        img.loading = "lazy";
        img.draggable = false;
        img.addEventListener("error", function () {
          thumb.classList.add("cert-broken");
        });
        thumb.appendChild(img);
      } else {
        thumb.classList.add("cert-broken");
      }
      thumb.insertAdjacentHTML(
        "beforeend",
        '<span class="cert-noimg">' +
          svg(P.award) +
          "</span>" +
          '<span class="cert-overlay"><span class="cert-ov-icon">' +
          svg(pdf ? P.file : P.zoom) +
          "</span>" +
          '<span class="cert-ov-badge">' +
          (pdf ? "View certificate" : "View image") +
          "</span></span>",
      );

      var info = document.createElement("span");
      info.className = "cert-info";
      if (titleEl) info.appendChild(titleEl);
      if (metaEl) info.appendChild(metaEl);
      card.insertBefore(thumb, card.firstChild);
      card.appendChild(info);

      card.draggable = false;
      card.setAttribute("aria-label", "View " + item.title);
      if (!pdf) {
        card.removeAttribute("href");
        card.setAttribute("role", "button");
        card.tabIndex = 0;
        card.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            card.click();
          }
        });
      }
      card.addEventListener("click", function (e) {
        if (pdf && (e.metaKey || e.ctrlKey || e.shiftKey)) return;
        e.preventDefault();
        if (!suppressClick) openItem(item, card);
      });
      return item;
    }

    var panels = cats.map(function (el, i) {
      var cards = [].slice.call(el.querySelectorAll(".cert-card"));
      var items = cards.map(enhanceCard);

      var stage = document.createElement("div");
      stage.className = "cert-stage";
      stage.innerHTML =
        '<button type="button" class="cert-arrow cert-prev" aria-label="Previous">' +
        svg(P.left) +
        "</button>" +
        '<button type="button" class="cert-arrow cert-next" aria-label="Next">' +
        svg(P.right) +
        "</button>" +
        '<div class="cert-viewport"><div class="cert-track"></div></div>';
      var track = stage.querySelector(".cert-track");
      cards.forEach(function (c) {
        track.appendChild(c);
      });
      var dots = document.createElement("div");
      dots.className = "cert-dots";
      el.appendChild(stage);
      el.appendChild(dots);

      el.setAttribute("role", "tabpanel");
      el.id = id + "-p" + i;
      el.setAttribute("aria-labelledby", id + "-t" + i);
      el.hidden = i !== 0;

      return {
        el: el,
        items: items,
        cards: cards,
        n: cards.length,
        viewport: stage.querySelector(".cert-viewport"),
        track: track,
        dots: dots,
        prev: stage.querySelector(".cert-prev"),
        next: stage.querySelector(".cert-next"),
        index: 0,
        pv: 3,
        max: 0,
        step: 0,
      };
    });
    var active = 0;

    function layout(i) {
      var p = panels[i];
      if (p.el.hidden) return;
      var w = p.viewport.clientWidth;
      if (!w) return;
      var cw = root.clientWidth,
        gap = opt.gap || 0;
      var perView = cw < 560 ? opt.mobile : cw < 900 ? opt.tablet : opt.desktop;
      perView = Math.max(1, perView | 0);
      var cardW = (w - gap * (perView - 1)) / perView;
      p.cards.forEach(function (c) {
        c.style.width = cardW + "px";
      });
      p.track.style.gap = gap + "px";
      p.step = cardW + gap;
      p.pv = perView;
      p.max = Math.max(0, p.n - perView);
      p.index = Math.min(p.index, p.max);
      p.track.classList.toggle("cert-few", p.n <= perView);
      if (p.dots.children.length !== p.max + 1) buildDots(p);
      root.toggleAttribute("data-compact", cw < 720);
      apply(p, false);
    }
    function buildDots(p) {
      p.dots.innerHTML = "";
      if (p.max === 0) return;
      for (var k = 0; k <= p.max; k++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "cert-dot";
        dot.setAttribute("aria-label", "Go to slide " + (k + 1));
        dot.dataset.k = k;
        p.dots.appendChild(dot);
      }
    }
    function apply(p, animate) {
      var move = "translate3d(" + -p.index * p.step + "px,0,0)";
      if (animate === false) {
        p.track.style.transition = "none";
        p.track.style.transform = move;
        void p.track.offsetWidth;
        p.track.style.transition = "";
      } else {
        p.track.style.transform = move;
      }
      [].forEach.call(p.dots.children, function (dot, k) {
        dot.setAttribute("aria-current", k === p.index ? "true" : "false");
      });
      p.prev.hidden = p.next.hidden = p.max === 0;
      p.cards.forEach(function (c, j) {
        c.tabIndex = j >= p.index && j < p.index + p.pv ? 0 : -1;
      });
    }
    function cur() {
      return panels[active];
    }
    function next(user) {
      var p = cur();
      p.index = p.index >= p.max ? 0 : p.index + 1;
      apply(p);
      if (user) restart();
    }
    function prev(user) {
      var p = cur();
      p.index = p.index <= 0 ? p.max : p.index - 1;
      apply(p);
      if (user) restart();
    }

    function movePill() {
      var t = tabs[active];
      if (!t) return;
      pill.style.width = t.offsetWidth + "px";
      pill.style.transform = "translateX(" + t.offsetLeft + "px)";
      if (tabsEl.scrollWidth > tabsEl.clientWidth) {
        tabsEl.scrollTo({
          left: t.offsetLeft - (tabsEl.clientWidth - t.offsetWidth) / 2,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    }
    function select(i, focus) {
      if (i === active) return;
      tabs[active].setAttribute("aria-selected", "false");
      tabs[active].tabIndex = -1;
      panels[active].el.hidden = true;
      active = i;
      tabs[i].setAttribute("aria-selected", "true");
      tabs[i].tabIndex = 0;
      panels[i].el.hidden = false;
      panels[i].index = 0;
      layout(i);
      movePill();
      restart();
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () {
        select(i);
      });
      t.addEventListener("keydown", function (e) {
        var k = e.key,
          n = tabs.length,
          to = -1;
        if (k === "ArrowRight") to = (i + 1) % n;
        else if (k === "ArrowLeft") to = (i - 1 + n) % n;
        else if (k === "Home") to = 0;
        else if (k === "End") to = n - 1;
        if (to > -1) {
          e.preventDefault();
          select(to, true);
        }
      });
    });

    panels.forEach(function (p) {
      p.prev.addEventListener("click", function () {
        prev(true);
      });
      p.next.addEventListener("click", function () {
        next(true);
      });
      p.dots.addEventListener("click", function (e) {
        var dot = e.target.closest(".cert-dot");
        if (!dot) return;
        p.index = +dot.dataset.k;
        apply(p);
        restart();
      });
      p.viewport.addEventListener("scroll", function () {
        p.viewport.scrollLeft = 0;
      });
      p.track.addEventListener("focusin", function (e) {
        var c = e.target.closest(".cert-card");
        if (!c) return;
        var j = p.cards.indexOf(c);
        if (j < p.index) {
          p.index = j;
          apply(p);
        } else if (j >= p.index + p.pv) {
          p.index = Math.min(p.max, j - p.pv + 1);
          apply(p);
        }
      });
      var sx = null,
        sy = 0;
      p.viewport.addEventListener("pointerdown", function (e) {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        sx = e.clientX;
        sy = e.clientY;
      });
      p.viewport.addEventListener("pointerup", function (e) {
        if (sx === null) return;
        var dx = e.clientX - sx,
          dy = e.clientY - sy;
        sx = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          if (dx < 0) next(true);
          else prev(true);
          suppressClick = true;
          setTimeout(function () {
            suppressClick = false;
          }, 60);
        }
      });
      p.viewport.addEventListener("pointercancel", function () {
        sx = null;
      });
    });
    root.addEventListener("keydown", function (e) {
      if (!e.target.closest(".cert-stage")) return;
      if (e.key === "ArrowRight") next(true);
      else if (e.key === "ArrowLeft") prev(true);
    });

    var timer = null,
      paused = false,
      inView = true;
    function restart() {
      clearInterval(timer);
      timer = null;
      if (opt.autoplay > 0 && !reduceMotion) {
        timer = setInterval(function () {
          if (
            !paused &&
            inView &&
            !document.hidden &&
            !modalOpen &&
            cur().max > 0
          )
            next(false);
        }, opt.autoplay);
      }
    }
    root.addEventListener("mouseenter", function () {
      paused = true;
    });
    root.addEventListener("mouseleave", function () {
      paused = false;
    });
    root.addEventListener("focusin", function (e) {
      if (e.target.matches(":focus-visible")) paused = true;
    });
    root.addEventListener("focusout", function () {
      paused = false;
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (es) {
          inView = es[0].isIntersecting;
        },
        { threshold: 0.2 },
      ).observe(root);
    }

    var modal,
      win,
      bodyEl,
      lastFocus,
      prevOverflow = "";
    function resolveTheme() {
      var t = opt.theme;
      if (t === "dark" || t === "light") return t;
      if (t === "system")
        return matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      var sel = opt.darkSelector || DARK_SELECTORS;
      try {
        return root.parentElement && root.parentElement.closest(sel)
          ? "dark"
          : "light";
      } catch (err) {
        console.warn("[CertShowcase] Invalid data-dark-selector:", sel);
        return "light";
      }
    }
    function applyTheme() {
      var m = resolveTheme();
      root.setAttribute("data-mode", m);
      if (modal) modal.setAttribute("data-mode", m);
    }

    function buildModal() {
      modal = document.createElement("div");
      modal.className = "cert-modal";
      if (opt.accent) modal.style.setProperty("--cert-accent", opt.accent);
      modal.setAttribute("data-mode", resolveTheme());
      modal.innerHTML =
        '<div class="cert-backdrop" data-close></div>' +
        '<div class="cert-win" role="dialog" aria-modal="true" aria-labelledby="' +
        id +
        '-mt" tabindex="-1">' +
        '<header class="cert-mh"><div class="cert-mt"><span class="cert-mico">' +
        svg(P.file) +
        "</span>" +
        '<div class="cert-mtxt"><h3 class="cert-mtitle" id="' +
        id +
        '-mt"></h3><p class="cert-msub"></p></div></div>' +
        '<div class="cert-mact">' +
        '<button type="button" class="cert-x" data-close aria-label="Close">' +
        svg(P.x) +
        "</button>" +
        '</div></header><div class="cert-mbody"></div></div>';
      document.body.appendChild(modal);
      win = modal.querySelector(".cert-win");
      bodyEl = modal.querySelector(".cert-mbody");
      modal.addEventListener("click", function (e) {
        if (e.target.closest("[data-close]")) closeModal();
      });
    }
    function openItem(it, trigger) {
      if (!modal) buildModal();
      lastFocus = trigger || document.activeElement;
      applyTheme();
      modal.querySelector(".cert-mtitle").textContent = it.title;
      modal.querySelector(".cert-msub").textContent = it.meta || opt.subtitle;

      if (it.pdf && canInlinePdf) {
        bodyEl.innerHTML =
          '<iframe class="cert-frame" title="' + esc(it.title) + '"></iframe>';
        bodyEl.firstChild.src = it.pdf;
      } else if (it.pdf) {
        bodyEl.innerHTML =
          '<div class="cert-fallback">' +
          (it.image ? '<img src="' + esc(it.image) + '" alt="">' : "") +
          "<p>Your browser can’t preview PDFs inside the page.</p>" +
          '<a class="cert-btn cert-btn-primary" href="' +
          esc(it.pdf) +
          '" target="_blank" rel="noopener noreferrer">' +
          svg(P.ext) +
          "<span>Open PDF</span></a></div>";
      } else {
        bodyEl.innerHTML =
          '<div class="cert-lightbox"><img src="' +
          esc(it.image) +
          '" alt="' +
          esc(it.title) +
          '"></div>';
      }

      prevOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      modalOpen = true;
      requestAnimationFrame(function () {
        modal.classList.add("cert-open");
        win.focus();
      });
      document.addEventListener("keydown", onModalKey);
    }
    function closeModal() {
      if (!modal || !modalOpen) return;
      modalOpen = false;
      modal.classList.remove("cert-open");
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onModalKey);
      setTimeout(function () {
        if (!modalOpen) bodyEl.innerHTML = "";
      }, 300);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onModalKey(e) {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab") return;
      var f = [].filter.call(
        win.querySelectorAll(
          'a[href],button,iframe,[tabindex]:not([tabindex="-1"])',
        ),
        function (n) {
          return !n.hidden && n.offsetParent !== null;
        },
      );
      if (!f.length) return;
      var first = f[0],
        last = f[f.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first || document.activeElement === win)
      ) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    applyTheme();
    if ("MutationObserver" in window) {
      var mo = new MutationObserver(applyTheme);
      for (var a = root.parentElement; a; a = a.parentElement) {
        mo.observe(a, {
          attributes: true,
          attributeFilter: [
            "class",
            "data-theme",
            "data-bs-theme",
            "data-mode",
            "data-color-scheme",
          ],
        });
      }
    }
    if (window.matchMedia) {
      var mq = matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", applyTheme);
      else if (mq.addListener) mq.addListener(applyTheme);
    }
    var raf = 0;
    function relayout() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        layout(active);
        movePill();
      });
    }
    if ("ResizeObserver" in window) new ResizeObserver(relayout).observe(root);
    else window.addEventListener("resize", relayout);
    root.classList.add("cert-ready");
    layout(0);
    movePill();
    requestAnimationFrame(function () {
      pill.classList.add("cert-anim");
    });
    if (document.fonts && document.fonts.ready)
      document.fonts.ready.then(relayout);
    restart();
  }

  function initAll() {
    [].forEach.call(document.querySelectorAll(".cert-widget"), init);
  }
  window.CertShowcase = { init: initAll };
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", initAll);
  else initAll();
})();
/*-- END TAB CERTIFICATE --*/

/*-- START GRAPHIC DESIGN IPHONE TAB--*/
(() => {
  const sc3dCarousel = document.getElementById("sc3dCarousel");
  const sc3dCards = Array.from(sc3dCarousel.querySelectorAll(".sc3d-card"));
  const sc3dTotal = sc3dCards.length;

  let sc3dCurrentPos = 0;
  let sc3dAnimFrame = null;

  // Keeps cards looping smoothly around the circle
  function sc3dGetShortestOffset(diff) {
    return (
      ((((diff + sc3dTotal / 2) % sc3dTotal) + sc3dTotal) % sc3dTotal) -
      sc3dTotal / 2
    );
  }

  // Distance between cards based on container width
  function sc3dGetSpacing() {
    return Math.min(sc3dCarousel.clientWidth * 0.34, 250);
  }

  // Update position, scale, depth, and brightness of each card
  function sc3dUpdateCards() {
    const spacing = sc3dGetSpacing();

    sc3dCards.forEach((card, index) => {
      const offset = sc3dGetShortestOffset(index - sc3dCurrentPos);
      const absOffset = Math.min(Math.abs(offset), 2);

      const x = offset * spacing;
      const scale = 1.25 - 0.38 * absOffset;
      const zIndex = 100 - Math.round(Math.abs(offset) * 10);
      const opacity =
        Math.abs(offset) > 2.4 ? 0 : 1 - Math.max(0, absOffset - 1) * 0.5;
      const brightness = 1 - Math.min(Math.abs(offset), 1) * 0.25;

      card.style.transform = `translate(calc(-50% + ${x}px), -50%) scale(${scale})`;
      card.style.zIndex = zIndex;
      card.style.opacity = opacity;
      card.style.filter = `brightness(${brightness})`;
    });
  }

  // Smooth cubic-ease slide animation
  function sc3dSlideTo(targetPos) {
    cancelAnimationFrame(sc3dAnimFrame);
    const startPos = sc3dCurrentPos;
    const startTime = performance.now();
    const duration = 450;

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      sc3dCurrentPos = startPos + (targetPos - startPos) * easeOut;
      sc3dUpdateCards();

      if (progress < 1) {
        sc3dAnimFrame = requestAnimationFrame(animate);
      } else {
        sc3dCurrentPos = ((targetPos % sc3dTotal) + sc3dTotal) % sc3dTotal;
        sc3dUpdateCards();
      }
    }

    sc3dAnimFrame = requestAnimationFrame(animate);
  }

  // Click a side card to bring it to the center
  sc3dCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const offset = sc3dGetShortestOffset(index - sc3dCurrentPos);
      if (Math.abs(offset) >= 0.5) {
        sc3dSlideTo(sc3dCurrentPos + Math.round(offset));
      }
    });
  });

  // Slide to the next card every 3 seconds
  setInterval(() => {
    if (!document.hidden) {
      sc3dSlideTo(Math.round(sc3dCurrentPos) + 1);
    }
  }, 3000);

  window.addEventListener("resize", sc3dUpdateCards);
  sc3dUpdateCards();
})();
/*-- END GRAPHIC DESIGN IPHONE TAB--*/
