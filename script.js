/*DARK AND LIGHT THEME SWITCHER*/
let isDarkMode = false;
let webglSceneRef = null;

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

  /*Update Three js Fog color to match Brandkit background*/
  if (webglSceneRef && webglSceneRef.fog) {
    webglSceneRef.fog.color.setHex(isDarkMode ? 0x0a0a0a : 0xf4f4f4);
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
      <div class="h-24 w-full flex items-center justify-center px-6 py-4 bg-white border border-[#9CA3AF]/30">
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
        <a href="${sp.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="${sp.name} LinkedIn" class="inline-flex items-center justify-center w-11 h-11 bg-[#0072FF] hover:bg-[#00C853] text-white hover:text-[#0A0A0A] font-display font-black text-xl transition">in</a>
      </div>
    </div>
  `).join("");
}

/*THREE JS 3D WEBGL SCENE*/
function initWebGL() {
  const canvas = document.getElementById("webgl-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (err) {
    return;
  }

  const scene = new THREE.Scene();
  webglSceneRef = scene;
  scene.fog = new THREE.FogExp2(isDarkMode ? 0x0a0a0a : 0xf4f4f4, 0.032);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 14);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  /*Brandkit Primary Green and Primary Blue Lights*/
  const greenLight = new THREE.PointLight(0x00c853, 2.5, 35);
  greenLight.position.set(4, 4, 4);
  scene.add(greenLight);

  const blueLight = new THREE.PointLight(0x0072ff, 2.5, 40);
  blueLight.position.set(-6, -4, 3);
  scene.add(blueLight);

  const crystalGroup = new THREE.Group();
  scene.add(crystalGroup);

  const crystalGeo = new THREE.OctahedronGeometry(2.0, 1);
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x00c853,
    emissive: 0x0072ff,
    emissiveIntensity: 0.22,
    roughness: 0.15,
    metalness: 0.1,
    flatShading: true,
    transparent: true,
    opacity: 0.22
  });
  const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
  crystalGroup.add(crystalMesh);

  const wireGeo = new THREE.IcosahedronGeometry(2.55, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x0072ff,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  crystalGroup.add(wireMesh);

  const ringGeo = new THREE.TorusGeometry(4.1, 0.02, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00c853,
    transparent: true,
    opacity: 0.35
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2.3;
  crystalGroup.add(ringMesh);

  const shards = [];
  const shardGeo = new THREE.DodecahedronGeometry(0.55, 0);
  const shardMat = new THREE.MeshStandardMaterial({
    color: 0x0072ff,
    roughness: 0.4,
    metalness: 0.1,
    flatShading: true,
    transparent: true,
    opacity: 0.28
  });

  for (let i = 0; i < 20; i++) {
    const shard = new THREE.Mesh(shardGeo, shardMat);
    const angle = (i / 20) * Math.PI * 2;
    const radius = 5.5 + Math.random() * 8;
    shard.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 13,
      (Math.random() - 0.5) * 10 - 3
    );
    const scale = 0.35 + Math.random() * 0.85;
    shard.scale.set(scale, scale, scale);
    shard.userData = {
      rotX: (Math.random() - 0.5) * 0.012,
      rotY: (Math.random() - 0.5) * 0.012,
      offset: Math.random() * Math.PI * 2
    };
    scene.add(shard);
    shards.push(shard);
  }

  let mouseX = 0;
  let mouseY = 0;
  let scrollY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    crystalMesh.rotation.y = t * 0.3;
    crystalMesh.rotation.x = Math.sin(t * 0.4) * 0.2;
    wireMesh.rotation.y = -t * 0.18;
    ringMesh.rotation.z = t * 0.35;

    crystalGroup.position.y = Math.sin(t * 1.1) * 0.3;
    crystalGroup.position.x = THREE.MathUtils.lerp(crystalGroup.position.x, mouseX * 1.4, 0.05);

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 14 - Math.min(scrollY * 0.0015, 4), 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouseY * 0.7, 0.05);

    shards.forEach(s => {
      s.rotation.x += s.userData.rotX;
      s.rotation.y += s.userData.rotY;
      s.position.y += Math.sin(t + s.userData.offset) * 0.0025;
    });

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
  applyThemeState(savedTheme === "dark");

  renderActivities();
  renderSponsors();
  renderSpeakers();
  initWebGL();
});