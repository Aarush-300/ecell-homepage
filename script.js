/*DARK AND LIGHT THEME SWITCHER*/
let isDarkMode = true;
let webglThemeUpdater = null;

function applyThemeState(dark) {
  isDarkMode = Boolean(dark);
  document.body.classList.toggle("dark-theme", isDarkMode);

  const label = document.getElementById("theme-label");
  const indicator = document.getElementById("theme-indicator");

  if (label) {
    label.textContent = isDarkMode ? "Dark Theme" : "Light Theme";
  }

  if (indicator) {
    indicator.style.backgroundColor = isDarkMode ? "#0072FF" : "#00C853";
  }

  if (typeof webglThemeUpdater === "function") {
    webglThemeUpdater(isDarkMode);
  }
}

function toggleTheme() {
  const nextState = !isDarkMode;
  try {
    localStorage.setItem("ecell_theme", nextState ? "dark" : "light");
  } catch (err) {
    /*Ignore storage errors in restricted browsing modes*/
  }
  applyThemeState(nextState);
}

/*OUR ACTIVITIES DATA*/
const activitiesData = [
  {
    title: "Study Abroad",
    description: "An interactive guidance session designed for students aspiring to pursue graduate studies and global research opportunities abroad.",
    localImage: "IMG_3029-CLQUeSFB.jpg",
    remoteFallback: "https://ecell-msit.vercel.app/assets/IMG_3029-CLQUeSFB.jpg"
  },
  {
    title: "Career Launcher",
    description: "A focused seminar exploring career pathways across technology, management, and high-growth startup roles.",
    localImage: "IMG_2094-BBlxtcv7.jpg",
    remoteFallback: "https://ecell-msit.vercel.app/assets/IMG_2094-BBlxtcv7.jpg"
  },
  {
    title: "MSME",
    description: "An official entrepreneurship awareness seminar conducted with MSME to guide student innovators on enterprise grants and incubation.",
    localImage: "IMG_4617-Cg1tDCYQ.jpg",
    remoteFallback: "https://ecell-msit.vercel.app/assets/IMG_4617-Cg1tDCYQ.jpg"
  }
];

function renderActivities() {
  const grid = document.getElementById("activities-grid");
  if (!grid) return;

  grid.innerHTML = activitiesData.map(act => `
    <div class="clip-card overflow-hidden flex flex-col justify-between">
      <div>
        <div class="relative h-60 overflow-hidden bg-[#0A0A0A] border-b themed-border">
          <img
            src="${act.localImage}"
            alt="${act.title}"
            loading="lazy"
            class="w-full h-full object-cover hover:scale-105 transition duration-500"
            onerror="if (!this.dataset.fallback) { this.dataset.fallback = 'true'; this.src = '${act.remoteFallback}'; }"
          />
        </div>
        <div class="p-7">
          <h3 class="font-display font-extrabold text-2xl uppercase themed-heading mb-3">${act.title}</h3>
          <p class="text-sm sm:text-base themed-subtext leading-relaxed">${act.description}</p>
        </div>
      </div>
    </div>
  `).join("");
}

/*OUR SPONSORS SECTION LOGOS ONLY*/
const sponsorsData = [
  {
    name: "Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    imgClass: "h-11 max-w-[165px] object-contain"
  },
  {
    name: "Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    imgClass: "h-10 max-w-[175px] object-contain"
  },
  {
    name: "Amazon",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    imgClass: "h-10 max-w-[155px] object-contain mt-2"
  },
  {
    name: "Flipkart",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/flipkart.svg",
    imgClass: "h-10 max-w-[160px] object-contain"
  }
];

function renderSponsors() {
  const grid = document.getElementById("sponsors-grid");
  if (!grid) return;

  grid.innerHTML = sponsorsData.map(sp => `
    <div class="clip-card p-8 flex items-center justify-center min-h-[150px]">
      <div class="h-24 w-full flex items-center justify-center px-6 py-4 bg-[#F4F4F4] border border-[#9CA3AF]/30">
        <img
          src="${sp.logoUrl}"
          alt="${sp.name}"
          loading="lazy"
          class="${sp.imgClass}"
          onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\'font-display font-black text-xl text-[#0A0A0A]\'>${sp.name}</span>';"
        />
      </div>
    </div>
  `).join("");
}

/*MEET OUR SPEAKERS*/
const speakersData = [
  {
    name: "Dr. Bill Van Heyst",
    role: "DEAN, FACULTY OF ENGINEERING, UNIVERSITY OF WINDSOR",
    primaryImg: "1.jpeg",
    altImg: "1.jpg",
    initials: "BH",
    linkedin: "https://ca.linkedin.com/in/bill-van-heyst-197b5022"
  },
  {
    name: "Vedant Rusty",
    role: "YOUTUBER & PODCASTER @STORIESWITHRUSTY",
    primaryImg: "2.jpeg",
    altImg: "2.jpg",
    initials: "VR",
    linkedin: "https://in.linkedin.com/in/vedantrusty"
  },
  {
    name: "Bhanu Pathak",
    role: "FOUNDER GROWSHOW MEDIA",
    primaryImg: "3.jpg",
    altImg: "3.jpeg",
    initials: "BP",
    linkedin: "https://in.linkedin.com/in/pathakbhanu"
  }
];

function renderSpeakers() {
  const grid = document.getElementById("speakers-grid");
  if (!grid) return;

  grid.innerHTML = speakersData.map(sp => `
    <div class="clip-card p-8 text-center flex flex-col items-center justify-between">
      <div class="w-full">
        <div class="speaker-avatar-ring">
          <img
            src="${sp.primaryImg}"
            alt="${sp.name}"
            loading="lazy"
            onerror="if (!this.dataset.triedAlt) { this.dataset.triedAlt = 'true'; this.src = '${sp.altImg}'; } else { this.style.display = 'none'; this.parentElement.innerHTML = '<span>${sp.initials}</span>'; }"
          />
        </div>
        <h3 class="font-display font-extrabold text-2xl themed-heading mb-2">${sp.name}</h3>
        <p class="font-mono text-xs font-bold uppercase tracking-widest text-[#00C853] leading-relaxed max-w-xs mx-auto">${sp.role}</p>
      </div>
      <div class="mt-7 pt-4 border-t themed-border w-full flex justify-center">
        <a href="${sp.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="${sp.name} LinkedIn" class="inline-flex items-center justify-center w-11 h-11 bg-[#0072FF] hover:bg-[#00C853] text-[#F4F4F4] hover:text-[#0A0A0A] font-display font-black text-xl transition">in</a>
      </div>
    </div>
  `).join("");
}

/*
 * Helper: Creates a clean, caption-free procedural dial texture
 * matching the circular segmented rings on the animation.mp4 knobs
 * using only #00C853, #0072FF, and #0A0A0A (zero numbers/captions).
 */
function createCleanDialCapTexture(variant) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");

  /*Base Primary Green cap*/
  ctx.fillStyle = "#00C853";
  ctx.fillRect(0, 0, 256, 256);

  /*Outer dark ring border*/
  ctx.strokeStyle = "#0A0A0A";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(128, 128, 114, 0, Math.PI * 2);
  ctx.stroke();

  /*Inner Primary Blue accent ring*/
  ctx.strokeStyle = "#0072FF";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(128, 128, 92, 0, Math.PI * 2);
  ctx.stroke();

  if (variant % 3 === 0) {
    /*Radial tick marks (replaces numbers with clean geometric ticks)*/
    ctx.strokeStyle = "#0A0A0A";
    ctx.lineWidth = 3;
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      const r1 = i % 3 === 0 ? 52 : 62;
      const r2 = 82;
      ctx.beginPath();
      ctx.moveTo(128 + Math.cos(angle) * r1, 128 + Math.sin(angle) * r1);
      ctx.lineTo(128 + Math.cos(angle) * r2, 128 + Math.sin(angle) * r2);
      ctx.stroke();
    }
    /*Center geometric core*/
    ctx.fillStyle = "#0A0A0A";
    ctx.beginPath();
    ctx.arc(128, 128, 22, 0, Math.PI * 2);
    ctx.fill();
  } else if (variant % 3 === 1) {
    /*Segmented arc ring (like top knob in animation.mp4)*/
    ctx.strokeStyle = "#0A0A0A";
    ctx.lineWidth = 18;
    const segments = [
      [0.1, 1.3],
      [1.6, 2.5],
      [2.8, 3.8],
      [4.2, 5.7]
    ];
    segments.forEach(([start, end]) => {
      ctx.beginPath();
      ctx.arc(128, 128, 62, start, end);
      ctx.stroke();
    });
  } else {
    /*Concentric geometric rings*/
    ctx.strokeStyle = "#0A0A0A";
    ctx.lineWidth = 5;
    [34, 52, 70].forEach(r => {
      ctx.beginPath();
      ctx.arc(128, 128, r, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/*
 * Helper: Creates a clean, caption-free face texture for the 3D cube panels
 * (replaces "$1,257", "CASHBOX PRIZE POOL", "802" with clean geometric framing).
 */
function createCleanCubeFaceTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d");

  /*Primary Green face*/
  ctx.fillStyle = "#00C853";
  ctx.fillRect(0, 0, 512, 512);

  /*Outer dark bevel border*/
  ctx.strokeStyle = "#0A0A0A";
  ctx.lineWidth = 22;
  ctx.strokeRect(11, 11, 490, 490);

  /*Inner thin frame line (no text or captions)*/
  ctx.strokeStyle = "#0A0A0A";
  ctx.lineWidth = 4;
  ctx.strokeRect(42, 42, 428, 428);

  /*Corner geometric vents in #0072FF & #0A0A0A*/
  ctx.fillStyle = "#0072FF";
  ctx.fillRect(58, 58, 72, 10);
  ctx.fillStyle = "#0A0A0A";
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(380 + i * 14, 420, 6, 32);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/*THREE.JS SCENE: ANIMATION.MP4 + CAPTION-FREE 3D ISOMETRIC CUBE REPLICA (NO CURSOR MOVEMENT)*/
function initWebGL() {
  const canvas = document.getElementById("webgl-canvas");
  const video = document.getElementById("bg-video");
  if (!canvas || typeof THREE === "undefined") return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  } catch (err) {
    return;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(isDarkMode ? 0x0a0a0a : 0xf4f4f4, 1);

  /*1. Background Video Scene (plays animation.mp4 with cropped captions when served via HTTP)*/
  const bgScene = new THREE.Scene();
  const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  /*2. Main 3D Scene (renders caption-free 3D isometric cube-and-dials matching animation.mp4)*/
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 11.5);

  /*Ensure video plays automatically*/
  let videoReady = false;
  let videoTexture = null;
  let videoQuadMat = null;

  if (video) {
    /*Disable any subtitle/caption tracks*/
    if (video.textTracks) {
      for (let i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = "disabled";
      }
    }
    video.muted = true;

    const markVideoReady = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        videoReady = true;
        if (videoQuadMat) {
          videoQuadMat.uniforms.uVideoAspect.value.set(video.videoWidth, video.videoHeight);
        }
      }
    };

    video.addEventListener("loadeddata", markVideoReady);
    video.addEventListener("playing", markVideoReady);
    video.play().catch(() => {
      const startOnInteract = () => {
        video.play().catch(() => {});
        window.removeEventListener("click", startOnInteract);
      };
      window.addEventListener("click", startOnInteract);
    });

    try {
      videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;

      /*WebGL1-safe shader (no dynamic for-loops) that removes bottom watermark & recolors to Brandkit*/
      videoQuadMat = new THREE.ShaderMaterial({
        uniforms: {
          uVideoTex: { value: videoTexture },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uVideoAspect: { value: new THREE.Vector2(820, 616) },
          uDarkMode: { value: isDarkMode ? 1.0 : 0.0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uVideoTex;
          uniform vec2 uResolution;
          uniform vec2 uVideoAspect;
          uniform float uDarkMode;
          varying vec2 vUv;

          float sampleLuma(vec2 uv) {
            vec3 c = texture2D(uVideoTex, clamp(uv, 0.0, 1.0)).rgb;
            return max(c.g, dot(c, vec3(0.299, 0.587, 0.114)));
          }

          void main() {
            vec2 p = vUv - 0.5;
            float sAspect = uResolution.x / max(uResolution.y, 1.0);
            float vAspect = uVideoAspect.x / max(uVideoAspect.y, 1.0);

            if (sAspect > vAspect) {
              p.y *= vAspect / sAspect;
            } else {
              p.x *= sAspect / vAspect;
            }

            /*Center the cube and crop out the bottom cashbox caption (y < 0.23)*/
            vec2 uv = p * 0.95 + 0.5 + vec2(0.0, 0.055);

            vec3 brandGreen = vec3(0.0, 0.7843, 0.3255);
            vec3 brandBlue  = vec3(0.0, 0.4471, 1.0);
            vec3 brandBlack = vec3(0.0392, 0.0392, 0.0392);
            vec3 brandLight = vec3(0.9569, 0.9569, 0.9569);
            vec3 bgColor    = mix(brandLight, brandBlack, uDarkMode);

            if (uv.x < 0.02 || uv.x > 0.98 || uv.y < 0.23 || uv.y > 0.98) {
              gl_FragColor = vec4(bgColor, 1.0);
              return;
            }

            /*Unrolled 5-tap smoothing to suppress surface captions*/
            vec2 d = vec2(0.004, 0.004);
            float c0 = sampleLuma(uv);
            float c1 = sampleLuma(uv + vec2( d.x,  0.0));
            float c2 = sampleLuma(uv + vec2(-d.x,  0.0));
            float c3 = sampleLuma(uv + vec2( 0.0,  d.y));
            float c4 = sampleLuma(uv + vec2( 0.0, -d.y));
            float maxL = max(c0, max(max(c1, c2), max(c3, c4)));
            float avgL = (c0 + c1 + c2 + c3 + c4) * 0.2;
            float luma = smoothstep(0.05, 0.85, mix(avgL, maxL, 0.6));
            luma *= smoothstep(0.23, 0.27, uv.y);

            vec3 col = luma < 0.45
              ? mix(bgColor, brandBlue, smoothstep(0.02, 0.45, luma))
              : mix(brandBlue, brandGreen, smoothstep(0.45, 0.95, luma));

            float alpha = mix(0.28, 0.85, uDarkMode) * step(0.02, luma);
            gl_FragColor = vec4(mix(bgColor, col, alpha), 1.0);
          }
        `,
        depthWrite: false,
        depthTest: false
      });

      const bgQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), videoQuadMat);
      bgScene.add(bgQuad);
    } catch (e) {
      videoReady = false;
    }
  }

  /*
   * Build the 3D Isometric Cube with 6 Cylindrical Dials (matches animation.mp4 geometry)
   * Completely free of captions/text, using #00C853, #0072FF, and #0A0A0A.
   */
  const ambientLight = new THREE.AmbientLight(0xf4f4f4, 0.75);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x00c853, 1.6);
  keyLight.position.set(5, 7, 6);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x0072ff, 1.5);
  rimLight.position.set(-6, -5, 4);
  scene.add(rimLight);

  const vaultGroup = new THREE.Group();
  /*Isometric tilt matching animation.mp4*/
  vaultGroup.rotation.x = 0.62;
  vaultGroup.rotation.z = -0.48;
  scene.add(vaultGroup);

  const faceTexture = createCleanCubeFaceTexture();
  const cubeSize = 3.1;
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshStandardMaterial({
    map: faceTexture,
    roughness: 0.32,
    metalness: 0.15
  });
  const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
  vaultGroup.add(cubeMesh);

  /*Outer wireframe edge accent in Primary Blue (#0072FF)*/
  const edgesGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(cubeSize + 0.03, cubeSize + 0.03, cubeSize + 0.03));
  const edgesMat = new THREE.LineBasicMaterial({ color: 0x0072ff, transparent: true, opacity: 0.65 });
  const edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
  vaultGroup.add(edgesMesh);

  /*Attach 6 Cylindrical Knobs/Dials on each face of the cube*/
  const dialDirections = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1)
  ];

  const dials = [];
  const knobBodyMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.4,
    metalness: 0.25
  });
  const collarMat = new THREE.MeshBasicMaterial({
    color: 0x0072ff
  });

  dialDirections.forEach((dir, idx) => {
    const dialGroup = new THREE.Group();

    /*Position on the cube face*/
    dialGroup.position.copy(dir).multiplyScalar(cubeSize * 0.5);

    /*Align cylinder Y-axis with face normal*/
    const up = new THREE.Vector3(0, 1, 0);
    dialGroup.quaternion.setFromUnitVectors(up, dir);

    /*Base Blue Collar Ring*/
    const collarGeo = new THREE.CylinderGeometry(1.02, 1.06, 0.12, 48);
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.y = 0.06;
    dialGroup.add(collarMesh);

    /*Dark Cylindrical Knob Body with clean patterned top cap*/
    const capTex = createCleanDialCapTexture(idx);
    const capMat = new THREE.MeshBasicMaterial({ map: capTex });
    const cylGeo = new THREE.CylinderGeometry(0.95, 0.98, 0.68, 48);
    const cylMesh = new THREE.Mesh(cylGeo, [knobBodyMat, capMat, knobBodyMat]);
    cylMesh.position.y = 0.36;
    dialGroup.add(cylMesh);

    vaultGroup.add(dialGroup);
    dials.push(cylMesh);
  });

  /*Theme updater for Dark (#0A0A0A) and Light (#F4F4F4) modes*/
  webglThemeUpdater = (dark) => {
    renderer.setClearColor(dark ? 0x0a0a0a : 0xf4f4f4, 1);
    if (videoQuadMat) {
      videoQuadMat.uniforms.uDarkMode.value = dark ? 1.0 : 0.0;
    }
    cubeMat.opacity = dark ? 0.88 : 0.35;
    cubeMat.transparent = true;
  };
  webglThemeUpdater(isDarkMode);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (videoQuadMat) {
      videoQuadMat.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    /*Continuous autonomous rotation matching animation.mp4 (NO cursor movement)*/
    vaultGroup.rotation.y = t * 0.52;
    vaultGroup.rotation.x = 0.62 + Math.sin(t * 0.52) * 0.18;

    /*Rotate the individual cylindrical dials smoothly*/
    dials.forEach((dial, i) => {
      dial.rotation.y = t * (i % 2 === 0 ? 0.8 : -0.8);
    });

    renderer.autoClear = true;
    /*Render the caption-free 3D isometric cube-and-dials scene*/
    renderer.render(scene, camera);
  }

  animate();
}

/*INITIALIZE ALL MODULES ON DOM LOAD*/
document.addEventListener("DOMContentLoaded", () => {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("ecell_theme");
  } catch (err) {
    savedTheme = null;
  }
  applyThemeState(savedTheme ? savedTheme === "dark" : true);

  renderActivities();
  renderSponsors();
  renderSpeakers();
  initWebGL();
});