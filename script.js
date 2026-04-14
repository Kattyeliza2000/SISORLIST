// ═══════════════════════════════════════════════════
//  SISORLIST v2 — Script completo
//  Nuevas funciones: Login, Panel Admin, Semáforo,
//  Multi-paralelo, Historial de auditoría, Import XLSX,
//  Backup JSON, Atajos de teclado, Mayúsculas forzadas
// ═══════════════════════════════════════════════════

const FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/proyecto-eli-d6ce7/databases/(default)/documents/paralelos/octavo_c2';
const LS_AUTH      = 'sisorlist_auth_v1';
const LS_USERS     = 'sisorlist_users_v1';
const LS_DATA      = 'sisorlist_data_v2';
const LS_CONFIG    = 'sisorlist_config_v2';
const LS_AUDIT     = 'sisorlist_audit_v1';
const LS_PARALELOS = 'sisorlist_paralelos_v1';
const LS_MATERIAS  = 'sisorlist_materias_v1';

// ═══════════════════════════════════════════════════
//  MATERIAS (configurables)
// ═══════════════════════════════════════════════════
const DEFAULT_MATERIAS_MAP = {
  ia:   'Inteligencia Artificial',
  aud:  'Auditoría de TI',
  deon: 'Deontología',
  prac: 'Prácticas Laborales 1',
  emp:  'Emprendimiento e Innovación',
  for:  'Computación Forense',
  prog: 'Programación Avanzada'
};

const CHIP_CLASSES = {
  ia:'chip-ia', aud:'chip-aud', deon:'chip-deon', prac:'chip-prac',
  emp:'chip-emp', for:'chip-for', prog:'chip-prog'
};

let MATERIAS_MAP = { ...DEFAULT_MATERIAS_MAP };
let MATERIAS = Object.keys(MATERIAS_MAP);

// ═══════════════════════════════════════════════════
//  DATOS INICIALES (eliminados — Firebase es la fuente de verdad)
// ═══════════════════════════════════════════════════
const RAW_STUDENTS = [
  {"nombre":"AGUILAR AGUILAR ANDREA JULIANA","celular":"","correo":"aaguilara4@unemi.edu.ec"},
  {"nombre":"AGUILAR BAJAÑA NICOLAS ARNALDO","celular":"593967179277","correo":"naguilarb@unemi.edu.ec"},
  {"nombre":"ALVARADO MONRROY CAROLINA MELANY","celular":"593998196491","correo":"calvaradom8@unemi.edu.ec"},
  {"nombre":"ALVARADO VASQUEZ HELEN SCARLET","celular":"593991127490","correo":"halvaradov@unemi.edu.ec"},
  {"nombre":"ALVARADO VEGA YELITZA YESSENIA","celular":"593980037865","correo":"yalvaradov2@unemi.edu.ec"},
  {"nombre":"APOLINARIO ASENCIO ANTONIO ISMAEL","celular":"593968496267","correo":"aapolinarioa2@unemi.edu.ec"},
  {"nombre":"ARAGON CASTRO CARLOS ALBERTO","celular":"593980855213","correo":"caragonc@unemi.edu.ec"},
  {"nombre":"ASTUDILLO LAGE IVAN GEOVANNY","celular":"593997306466","correo":"iastudillol@unemi.edu.ec"},
  {"nombre":"AVILES FONSECA EMELY MILENA","celular":"593998636785","correo":"eavilesf@unemi.edu.ec"},
  {"nombre":"BAEZ HERRERA MILEYSHA JAEL","celular":"593995559550","correo":"mbaezh@unemi.edu.ec"},
  {"nombre":"BOHORQUEZ BOHORQUEZ BYRON RONALD","celular":"593988116702","correo":"bbohorquezb@unemi.edu.ec"},
  {"nombre":"BRAVO ESMERALDAS KATHERINE JESSENIA","celular":"593968615847","correo":"kbravoe2@unemi.edu.ec"},
  {"nombre":"BRAVO PARRAGA NATHALY MARIA","celular":"593959911369","correo":"nbravop4@unemi.edu.ec"},
  {"nombre":"BRAVO ROSADO JONATHAN DAVID","celular":"593997766081","correo":"jbravor5@unemi.edu.ec"},
  {"nombre":"BRIONES GUERRERO LILIBETH PAOLA","celular":"593997479227","correo":"lbrionesg3@unemi.edu.ec"},
  {"nombre":"CAICEDO MURILLO JUAN ENRIQUE","celular":"593982400840","correo":"jcaicedom4@unemi.edu.ec"},
  {"nombre":"CAICEDO RUGEL BRITHANY MAITE","celular":"593993433715","correo":"bcaicedor@unemi.edu.ec"},
  {"nombre":"CALERO CALERO JOSE GIOVANNY","celular":"593960993160","correo":"jcaleroc3@unemi.edu.ec"},
  {"nombre":"CANDO TIXE IVAN STALIN","celular":"593967295377","correo":"icandot@unemi.edu.ec"},
  {"nombre":"CANO URIÑA FABIANA PAULETTE","celular":"593939197950","correo":"fcanou@unemi.edu.ec"},
  {"nombre":"CARPIO PEÑAFIEL BRYAN JAVIER","celular":"593967957369","correo":"bcarpiop@unemi.edu.ec"},
  {"nombre":"CARRILLO PARDO FANNY DEL CISNE","celular":"593939679242","correo":"fcarrillop@unemi.edu.ec"},
  {"nombre":"CASTILLO TORRES GENESIS LETICIA","celular":"","correo":"gcastillot2@unemi.edu.ec"},
  {"nombre":"CASTRO FIGUEROA JOSE MIGUEL","celular":"593969318217","correo":"jcastrof8@unemi.edu.ec"},
  {"nombre":"CERVANTES UGALDE KEVIN EFRAIN","celular":"593981868829","correo":"kcervantesu@unemi.edu.ec"},
  {"nombre":"CHICA GUARNIZO NATHALY SILVANA","celular":"593980991460","correo":"nchicag@unemi.edu.ec"},
  {"nombre":"CHICAIZA ARELLANO DIEGO ARMANDO","celular":"593939970052","correo":"dchicaizaa@unemi.edu.ec"},
  {"nombre":"CONFORME PIN HITLER LIZANDRO","celular":"593968046034","correo":"hconformep@unemi.edu.ec"},
  {"nombre":"CÓRDOVA QUIROGA HANSEL JAMEEL","celular":"593959716441","correo":"hcordovaq@unemi.edu.ec"},
  {"nombre":"CRESPIN APOLINARIO RONALD ALBERTO","celular":"593985185279","correo":"rcrespina@unemi.edu.ec"},
  {"nombre":"DEFAZ SORIA WASHINGTON ANDRES","celular":"593989946417","correo":"wdefazs@unemi.edu.ec"},
  {"nombre":"DUMES RIZO ANGIE MICHAELLE","celular":"593980939686","correo":"adumesr@unemi.edu.ec"},
  {"nombre":"DURAN CEREZO DANIEL JOEL","celular":"593999542437","correo":"dduranc3@unemi.edu.ec"},
  {"nombre":"FIGUEROA ROSALES JEFFERSON DIOGENES","celular":"593993157129","correo":"jfigueroar7@unemi.edu.ec"},
  {"nombre":"FLORES BARRAGAN DAVID RONALD","celular":"593989117770","correo":"dfloresb2@unemi.edu.ec"},
  {"nombre":"GARCIA LOPEZ KEILA NAYELI","celular":"593999976131","correo":"kgarcial4@unemi.edu.ec"},
  {"nombre":"GAVILANEZ PORTILLA STALIN BLADIMIR","celular":"593993770711","correo":"sgavilanezp2@unemi.edu.ec"},
  {"nombre":"GREFA CALAPUCHA EUCLIDES OMAR","celular":"593989547153","correo":"egrefac2@unemi.edu.ec"},
  {"nombre":"GUADAMUD MENDOZA MARIA ELOISA","celular":"593983271003","correo":"mguadamudm2@unemi.edu.ec"},
  {"nombre":"GUALOTUÑA QUISHPE PAOLO WLADIMIR","celular":"593996520923","correo":"pgualotunaq@unemi.edu.ec"},
  {"nombre":"GUERRA CASTRO MICHELLE DEL CARMEN","celular":"593988543271","correo":"mguerrac3@unemi.edu.ec"},
  {"nombre":"HEREDIA BRITO MILTON HUMBERTO","celular":"593963946765","correo":"mherediab@unemi.edu.ec"},
  {"nombre":"HERRERA CELI ENRIQUE ROLANDO","celular":"593990704501","correo":"eherrerac6@unemi.edu.ec"},
  {"nombre":"HOLGUIN BRITO KATTY ELIZABETH","celular":"593988620413","correo":"kholguinb2@unemi.edu.ec"},
  {"nombre":"HUARACA SANTANA MARIA FERNANDA","celular":"593981438039","correo":"mhuaracas@unemi.edu.ec"},
  {"nombre":"HURTADO ARELLANO JEAN CARLOS","celular":"593993302242","correo":"jhurtadoa3@unemi.edu.ec"},
  {"nombre":"IMBAQUINGO YAZAN JONATHAN JAVIER","celular":"593999959737","correo":"jimbaquingoy@unemi.edu.ec"},
  {"nombre":"JIMENEZ RUEDA JEFFERSON ANDRES","celular":"593979141157","correo":"jjimenezr4@unemi.edu.ec"},
  {"nombre":"LAPO ENCARNACION MARIUXI DEL CISNE","celular":"593979420616","correo":"mlapoe@unemi.edu.ec"},
  {"nombre":"LOOR HIDALGO VICTOR JOSE","celular":"593980023746","correo":"vloorh@unemi.edu.ec"},
  {"nombre":"LUCAS LOPEZ CAROLINA GISSELA","celular":"593968124379","correo":"clucasl2@unemi.edu.ec"},
  {"nombre":"MAZA NIETO JEAN MANUEL","celular":"593981911910","correo":"jmazan@unemi.edu.ec"},
  {"nombre":"MONTAÑO MORA WALTER ANDRE","celular":"593988229078","correo":"wmontanom@unemi.edu.ec"},
  {"nombre":"MONTERO MENDIA LUIS DAVID","celular":"593979373234","correo":"lmonterom@unemi.edu.ec"},
  {"nombre":"MORA MARIN ELIAS JOSUE","celular":"593998568635","correo":"emoram6@unemi.edu.ec"},
  {"nombre":"MORA SOTO JOSE SEBASTIAN","celular":"593963359189","correo":"jmoras3@unemi.edu.ec"},
  {"nombre":"MORALES COELLO RONALD JOSE","celular":"593995425239","correo":"rmoralesc4@unemi.edu.ec"},
  {"nombre":"MORAN BAILON JORGE LUIS","celular":"593991143968","correo":"jmoranb7@unemi.edu.ec"},
  {"nombre":"MOREIRA NUÑEZ JORDY JOEL","celular":"593983694608","correo":"jmoreiran3@unemi.edu.ec"},
  {"nombre":"MOREIRA PINARGOTE JAHAYRA STHEFANIA","celular":"593986038371","correo":"jmoreirap6@unemi.edu.ec"},
  {"nombre":"MOREIRA RODRIGUEZ ANDREA MARGARITA","celular":"593963764035","correo":"amoreirar5@unemi.edu.ec"},
  {"nombre":"MOROCHO MACAS GEOVANNY DAVID","celular":"593982563948","correo":"gmorochom@unemi.edu.ec"},
  {"nombre":"MOZO PUETATE ALEX FERNANDO","celular":"","correo":"amozop@unemi.edu.ec"},
  {"nombre":"ORDOÑEZ VERA ANDRES DIONISIO","celular":"593958926424","correo":"aordonezv2@unemi.edu.ec"},
  {"nombre":"ORELLANA SALAZAR GABRIEL SEBASTIAN","celular":"593963935304","correo":"gorellanas2@unemi.edu.ec"},
  {"nombre":"ORTIZ GARZON ERICK ALEXANDER","celular":"34615155893","correo":"eortizg3@unemi.edu.ec"},
  {"nombre":"PACHECO GUEVARA DIANA JANETH","celular":"593985066358","correo":"dpachecog2@unemi.edu.ec"},
  {"nombre":"PALACIOS LOOR ANTONY SAHIT","celular":"593939475155","correo":"apalaciosl4@unemi.edu.ec"},
  {"nombre":"PANIMBOZA GONZALEZ ANA ELENA","celular":"593994528838","correo":"apanimbozag@unemi.edu.ec"},
  {"nombre":"PARRALES PALADINES RUDDY ESTHEFANIA","celular":"593997366253","correo":"rparralesp@unemi.edu.ec"},
  {"nombre":"PEREA APOLO ALEXIS WLADIMIR","celular":"","correo":"apereaa@unemi.edu.ec"},
  {"nombre":"PEREZ ALMACHI MARLON DAVID","celular":"","correo":"malmachi@unemi.edu.ec"},
  {"nombre":"PICHUCHO BARBOSA MILTON OSWALDO","celular":"593992952447","correo":"mpichuchob@unemi.edu.ec"},
  {"nombre":"PIERPUESAN MULLO MELANY GABRIELA","celular":"","correo":"mpierpuesanm@unemi.edu.ec"},
  {"nombre":"PILAMUNGA MUÑOZ BRITTANY LESSLY","celular":"593987657506","correo":"bpilamungam2@unemi.edu.ec"},
  {"nombre":"QUEZADA VERGARA MICHAEL ANDRES","celular":"593994615500","correo":"mquezadav5@unemi.edu.ec"},
  {"nombre":"QUITUISACA GAMBOA PAOLA ANALY","celular":"593968155888","correo":"pquituisacag@unemi.edu.ec"},
  {"nombre":"RAMOS BONE JOEL GONZALO","celular":"593990297496","correo":"jramosb2@unemi.edu.ec"},
  {"nombre":"RAMOS CUERO FABIO LEONEL","celular":"","correo":"framosc2@unemi.edu.ec"},
  {"nombre":"REYES BARREIRO MARIA MERCEDES","celular":"593984929401","correo":"mreyesb6@unemi.edu.ec"},
  {"nombre":"REYES PITA MARIU ELIZABETH","celular":"593969828715","correo":"mreyesp13@unemi.edu.ec"},
  {"nombre":"RIVAS CEDENO VERONICA DOLORES","celular":"","correo":"vrivasc3@unemi.edu.ec"},
  {"nombre":"RIVAS VARGAS NARCISA AZUCENA","celular":"593985713333","correo":"nrivasv@unemi.edu.ec"},
  {"nombre":"ROBALINO PAPA LADY ADRIANA","celular":"593967393270","correo":"lrobalinop@unemi.edu.ec"},
  {"nombre":"RODRIGUEZ AUQUI JORGE ESTEBAN","celular":"","correo":"jrodrigueza23@unemi.edu.ec"},
  {"nombre":"RODRIGUEZ BERMEO ODALIS MADELEIN","celular":"593984400124","correo":"orodriguezb2@unemi.edu.ec"},
  {"nombre":"SALVADOR VEGA XIMENA LISBETH","celular":"593989680972","correo":"xsalvadorv@unemi.edu.ec"},
  {"nombre":"SANTANA VERA JHON JAIRO","celular":"","correo":"jsantanav6@unemi.edu.ec"},
  {"nombre":"SUAREZ GONZALEZ DANA NICOLLE","celular":"593994689402","correo":"dsuarezg7@unemi.edu.ec"},
  {"nombre":"SUAREZ LITARDO STEFANY GEOMAYRA","celular":"593978860015","correo":"ssuarezl2@unemi.edu.ec"},
  {"nombre":"TAPIA ESPINOSA ESTEFANIA MISHEL","celular":"","correo":"etapiae@unemi.edu.ec"},
  {"nombre":"TENESACA CHAMAIDAN GINGER GABRIELA","celular":"593983325294","correo":"gtenesacac@unemi.edu.ec"},
  {"nombre":"TIGRE ROMERO HÉCTOR SEBASTIÁN","celular":"593999720721","correo":"htigrer@unemi.edu.ec"},
  {"nombre":"TINOCO QUEZADA IBETH BRIGITTE","celular":"593939891180","correo":"itinocoq@unemi.edu.ec"},
  {"nombre":"TOALA PEÑAFIEL ROBERTO ARMANDO","celular":"593986431220","correo":"rtoalap@unemi.edu.ec"},
  {"nombre":"TRIANA PLUAS MORELIA YOLANDA","celular":"593993063803","correo":"mtrianap@unemi.edu.ec"},
  {"nombre":"VALENCIA PEREZ GABRIEL ALEJANDRO","celular":"","correo":"gvalenciap3@unemi.edu.ec"},
  {"nombre":"VELASCO TAPIA LIZBETH ANDREA","celular":"593978828286","correo":"lvelascot@unemi.edu.ec"},
  {"nombre":"VILLACIS HERNANDEZ FELIX DANIEL","celular":"","correo":"fvillacish@unemi.edu.ec"},
  {"nombre":"VILLAMAR PAYAS ALLISSON XIOMARA","celular":"593992188620","correo":"avillamarp2@unemi.edu.ec"},
  {"nombre":"VITE MARTINEZ EDITH ELIZABETH","celular":"","correo":"evitem@unemi.edu.ec"},
  {"nombre":"YAGUAL VEGA EDHISON DARIO","celular":"593969441149","correo":"eyagualv@unemi.edu.ec"},
  {"nombre":"ZAMBRANO GARCIA KEVIN RICARDO","celular":"","correo":"kzambranog6@unemi.edu.ec"},
  {"nombre":"ZAMORA MACAY JEAN CARLOS","celular":"593983618585","correo":"jzamoram9@unemi.edu.ec"}
];

// ═══════════════════════════════════════════════════
//  ESTADO GLOBAL
// ═══════════════════════════════════════════════════
let currentSession = null; // { email, role }
let users = [];            // [{ email, password, role }]
let paralelos = [];        // [{ id, nombre, semestre, active }]
let activeParaleloId = 'c2';
let studentsByParalelo = {}; // { paraleloId: [...] }
let listadoConfig = { semestre: '8vo Semestre', paralelo: 'C2' };
let activeFilters  = new Set(); // multi-select combinable (AND)
let currentMateriaFilter = 'todos';
let selectedIds = new Set();
let auditLog = [];
let saveTimeout = null;

// ═══════════════════════════════════════════════════
//  UTILIDADES
// ═══════════════════════════════════════════════════
function normalizeNombre(n) {
  return n.trim().toUpperCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/, ' ');
}
function emptyMaterias() {
  const m = {};
  MATERIAS.forEach(k => m[k] = false);
  return m;
}
function initStudents(raw) {
  return raw.map((s, i) => ({
    id: 'std_' + i + '_' + Date.now(),
    nombre: s.nombre.toUpperCase(),
    celular: s.celular || '',
    correo: s.correo || '',
    nuevo: false,
    materias: emptyMaterias()
  }));
}
function getStudents() { return studentsByParalelo[activeParaleloId] || []; }
function setStudents(arr) { studentsByParalelo[activeParaleloId] = arr; }

// Semáforo
function semaforo(s) {
  const total  = MATERIAS.length;
  const con    = MATERIAS.filter(m => s.materias[m]).length;
  if (con === total) return 'verde';
  if (con === 0)     return 'rojo';
  return 'amarillo';
}

// ═══════════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════════
function loadUsers() {
  try {
    const u = localStorage.getItem(LS_USERS);
    if (u) { users = JSON.parse(u); }
  } catch(e) {}
  // Siempre asegurarse de que el admin principal existe con la contraseña correcta
  const ADMIN_EMAIL = 'ky211209@gmail.com';
  const ADMIN_PASS  = 'admin-dus2109';
  const idx = users.findIndex(u => u.email === ADMIN_EMAIL);
  if (idx === -1) {
    users.push({ email: ADMIN_EMAIL, password: ADMIN_PASS, role: 'admin' });
  } else {
    users[idx].password = ADMIN_PASS;
    users[idx].role = 'admin';
  }
  saveUsers();
}
function saveUsers() {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

function doLogin() {
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('loginPassword').value;
  const err   = document.getElementById('loginError');

  const user = users.find(u => u.email === email && u.password === pass);
  if (!user) {
    err.textContent = 'Correo o contraseña incorrectos.';
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';
  currentSession = { email: user.email, role: user.role };
  localStorage.setItem(LS_AUTH, JSON.stringify(currentSession));
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appMain').style.display = 'block';
  document.getElementById('userBadgeEmail').textContent = user.email.split('@')[0];
  auditEntry('🔑', `Inicio de sesión`, user.email);
  renderAll();
  loadFromFirebase();
}

function doLogout() {
  localStorage.removeItem(LS_AUTH);
  currentSession = null;
  closePanel();
  document.getElementById('appMain').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
}

function checkSession() {
  try {
    const s = localStorage.getItem(LS_AUTH);
    if (s) {
      const sess = JSON.parse(s);
      const user = users.find(u => u.email === sess.email);
      if (user) {
        currentSession = sess;
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appMain').style.display = 'block';
        document.getElementById('userBadgeEmail').textContent = sess.email.split('@')[0];
        return true;
      }
    }
  } catch(e) {}
  return false;
}

// ═══════════════════════════════════════════════════
//  PARALELOS
// ═══════════════════════════════════════════════════
function loadParalelos() {
  try {
    const p = localStorage.getItem(LS_PARALELOS);
    if (p) { paralelos = JSON.parse(p); return; }
  } catch(e) {}
  paralelos = [{ id: 'c2', nombre: 'C2', semestre: '8vo Semestre', active: true }];
  saveParalelos();
}
function saveParalelos() {
  localStorage.setItem(LS_PARALELOS, JSON.stringify(paralelos));
}
function renderParaleloTabs() {
  const cont = document.getElementById('paraleloTabs');
  if (!cont) return;
  if (paralelos.length <= 1) { cont.innerHTML = ''; return; }
  cont.innerHTML = paralelos.map(p =>
    `<button class="paralelo-tab-btn${p.id === activeParaleloId ? ' active' : ''}"
      onclick="switchParalelo('${p.id}')">${p.nombre}</button>`
  ).join('');
}
function switchParalelo(id) {
  activeParaleloId = id;
  const p = paralelos.find(x => x.id === id);
  if (p) listadoConfig = { semestre: p.semestre, paralelo: p.nombre };
  updateHeaderTitle();
  renderParaleloTabs();
  renderAll();
}

// ═══════════════════════════════════════════════════
//  MATERIAS CONFIG
// ═══════════════════════════════════════════════════
function loadMateriasConfig() {
  try {
    const m = localStorage.getItem(LS_MATERIAS);
    if (m) {
      MATERIAS_MAP = JSON.parse(m);
      MATERIAS = Object.keys(MATERIAS_MAP);
      rebuildTableHeader();
    }
  } catch(e) {}
}
function saveMateriasConfig() {
  localStorage.setItem(LS_MATERIAS, JSON.stringify(MATERIAS_MAP));
}
function rebuildTableHeader() {
  // rebuild chip headers
  const chipCols = document.querySelectorAll('th.col-materia .materia-abbrev');
  // handled by dynamic rendering
}

// ═══════════════════════════════════════════════════
//  PERSISTENCIA
// ═══════════════════════════════════════════════════
function loadData() {
  try {
    const saved = localStorage.getItem(LS_DATA);
    if (saved) {
      studentsByParalelo = JSON.parse(saved);
      // fix materias keys for each paralelo
      Object.keys(studentsByParalelo).forEach(pid => {
        studentsByParalelo[pid].forEach(s => {
          if (!s.materias) s.materias = emptyMaterias();
          if (!s.correo) s.correo = '';
          MATERIAS.forEach(m => { if (s.materias[m] === undefined) s.materias[m] = false; });
        });
      });
    } else {
      // Sin datos locales — Firebase los traerá en loadFromFirebase()
      studentsByParalelo = {};
    }
  } catch(e) {
    studentsByParalelo = {};
  }
}

function saveData(action) {
  localStorage.setItem(LS_DATA, JSON.stringify(studentsByParalelo));
  if (action) auditEntry('💾', action, currentSession ? currentSession.email : 'sistema');
  syncFirebase();
}

function loadConfig() {
  try {
    const c = localStorage.getItem(LS_CONFIG);
    if (c) listadoConfig = JSON.parse(c);
  } catch(e) {}
  updateHeaderTitle();
}
function saveConfig() {
  localStorage.setItem(LS_CONFIG, JSON.stringify(listadoConfig));
}

// ═══════════════════════════════════════════════════
//  AUDITORÍA
// ═══════════════════════════════════════════════════
function loadAuditLog() {
  try {
    const a = localStorage.getItem(LS_AUDIT);
    if (a) auditLog = JSON.parse(a);
  } catch(e) { auditLog = []; }
}
function saveAuditLog() {
  localStorage.setItem(LS_AUDIT, JSON.stringify(auditLog.slice(0, 500)));
}
function auditEntry(icon, msg, user) {
  const entry = {
    ts: new Date().toISOString(),
    icon, msg,
    user: user || (currentSession ? currentSession.email : 'sistema'),
    paralelo: activeParaleloId
  };
  auditLog.unshift(entry);
  saveAuditLog();
}
function renderAudit() {
  const cont = document.getElementById('auditContent');
  if (!cont) return;
  if (!auditLog.length) {
    cont.innerHTML = '<div class="audit-container"><div class="audit-empty">Sin historial de cambios aún</div></div>';
    return;
  }
  const rows = auditLog.map(e => {
    const d = new Date(e.ts);
    const dateStr = d.toLocaleDateString('es-EC') + ' ' + d.toLocaleTimeString('es-EC', { hour:'2-digit', minute:'2-digit' });
    return `<div class="audit-entry">
      <div class="audit-time">${dateStr}</div>
      <div class="audit-icon">${e.icon}</div>
      <div>
        <div class="audit-msg">${e.msg}</div>
        <div class="audit-user">${e.user} · Paralelo ${e.paralelo || ''}</div>
      </div>
    </div>`;
  }).join('');
  cont.innerHTML = `<div class="audit-container">${rows}</div>`;
}
function clearAuditLog() {
  if (!confirm('¿Limpiar todo el historial de auditoría?')) return;
  auditLog = [];
  saveAuditLog();
  renderAudit();
  showToast('Historial limpiado');
}

// ═══════════════════════════════════════════════════
//  FIREBASE SYNC
// ═══════════════════════════════════════════════════
async function syncFirebase() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    try {
      await fetch(FIREBASE_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            data:    { stringValue: JSON.stringify(studentsByParalelo) },
            config:  { stringValue: JSON.stringify(listadoConfig) },
            updated: { stringValue: new Date().toISOString() }
          }
        })
      });
    } catch(e) {}
  }, 1500);
}
async function loadFromFirebase() {
  try {
    const res = await fetch(FIREBASE_URL);
    if (!res.ok) return;
    const doc = await res.json();
    if (doc.fields && doc.fields.data) {
      const parsed = JSON.parse(doc.fields.data.stringValue);
      // merge: firebase wins for existing data
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        // v2 format: object keyed by paralelo
        Object.assign(studentsByParalelo, parsed);
      } else if (Array.isArray(parsed)) {
        // v1 compat: array → put in c2
        studentsByParalelo.c2 = parsed;
      }
      Object.keys(studentsByParalelo).forEach(pid => {
        studentsByParalelo[pid].forEach(s => {
          if (!s.materias) s.materias = emptyMaterias();
          if (!s.correo) s.correo = '';
        });
      });
      localStorage.setItem(LS_DATA, JSON.stringify(studentsByParalelo));
      if (doc.fields.config) {
        listadoConfig = JSON.parse(doc.fields.config.stringValue);
        saveConfig();
        updateHeaderTitle();
      }
      renderAll();
      showToast('Datos sincronizados ☁');
    }
  } catch(e) {}
}

// ═══════════════════════════════════════════════════
//  HELPERS DE ROL
// ═══════════════════════════════════════════════════
function isViewer()  { return currentSession && currentSession.role === 'viewer'; }
function isEditor()  { return currentSession && currentSession.role === 'editor'; }
function isAdmin()   { return currentSession && currentSession.role === 'admin'; }
function canEdit()   { return isAdmin() || isEditor(); }

function applyRoleUI() {
  const viewer = isViewer();
  const admin  = isAdmin();

  // Header: exportar y backup — solo admin/editor
  document.querySelectorAll('.btn-icon, .btn-excel, .btn-backup').forEach(b => {
    b.style.display = viewer ? 'none' : '';
  });

  // Header: título clickeable (cambiar semestre) — solo admin
  const h1 = document.querySelector('header h1');
  if (h1) {
    h1.style.cursor    = admin ? 'pointer' : 'default';
    h1.onclick         = admin ? openRenameModal : null;
    const hint = h1.querySelector('.edit-hint');
    if (hint) hint.style.display = admin ? '' : 'none';
  }

  // Dropdown: Panel de Control — solo admin/editor
  const panelBtn = document.querySelector('.user-dropdown-item[onclick*="openPanelFromMenu"]');
  if (panelBtn) panelBtn.style.display = viewer ? 'none' : '';

  // Tabs: WhatsApp y Auditoría — solo admin/editor
  document.querySelectorAll('.tab').forEach(t => {
    const txt = t.textContent.trim();
    if (txt.includes('WhatsApp') || txt.includes('Auditoría')) {
      t.style.display = viewer ? 'none' : '';
    }
  });

  // Toolbar: botones de acción — solo admin/editor
  const btnImport  = document.querySelector('.btn-icon-toolbar[onclick*="openImport"]');
  const btnAdd     = document.querySelector('.btn-primary[onclick*="openAddStudent"]');
  const btnBulk    = document.getElementById('btnBulkDelete');
  const btnFltExp  = document.getElementById('btnFilterExport');
  if (btnImport) btnImport.style.display = viewer ? 'none' : '';
  if (btnAdd)    btnAdd.style.display    = viewer ? 'none' : '';
  if (btnBulk)   btnBulk.style.display  = viewer ? 'none' : '';
  // btnFilterExport: se oculta para viewer siempre; para otros lo controla updateFilterSummary
  if (btnFltExp && viewer) btnFltExp.style.display = 'none';

  // Columna checkbox — solo admin/editor
  const checkAllTh = document.querySelector('th.col-check');
  if (checkAllTh) checkAllTh.style.display = viewer ? 'none' : '';
  const accionTh = document.querySelector('th.col-accion');
  if (accionTh) accionTh.style.display = viewer ? 'none' : '';

  // Placeholder del buscador
  const search = document.getElementById('searchInput');
  if (search) {
    search.placeholder = viewer
      ? 'Buscar por nombre, celular o correo…'
      : 'Buscar por nombre, celular o correo… (Enter para agregar)';
    search.onkeydown = viewer ? null : handleSearchKey;
  }
}


function renderAll() {
  applyRoleUI();
  buildFilterMateriasBtns();
  renderTable();
  renderStats();
  renderMateria();
  renderWhatsApp();
  renderAudit();
  renderParaleloTabs();
  rebuildImportMateriaSelect();
  updateFilterSummary();
}

function rebuildImportMateriaSelect() {
  const sel = document.getElementById('importMateria');
  if (!sel) return;
  sel.innerHTML = MATERIAS.map(k =>
    `<option value="${k}">${MATERIAS_MAP[k]}</option>`
  ).join('');
  buildFilterMateriasBtns();
}

function renderStats() {
  const sts = studentsByParalelo[activeParaleloId] || [];
  const total   = sts.length;
  const verde   = sts.filter(s => semaforo(s) === 'verde').length;
  const amarillo= sts.filter(s => semaforo(s) === 'amarillo').length;
  const rojo    = sts.filter(s => semaforo(s) === 'rojo').length;
  const conTel  = sts.filter(s => s.celular).length;
  const sinTel  = total - conTel;
  const conMail = sts.filter(s => s.correo).length;
  const nuevos  = sts.filter(s => s.nuevo).length;
  document.getElementById('statTotal').textContent    = total;
  document.getElementById('statVerde').textContent    = verde;
  document.getElementById('statAmarillo').textContent = amarillo;
  document.getElementById('statRojo').textContent     = rojo;
  document.getElementById('statConTel').textContent   = conTel;
  document.getElementById('statSinTel').textContent   = sinTel;
  document.getElementById('statConMail').textContent  = conMail;
  document.getElementById('statNuevos').textContent   = nuevos;
}

function getFiltered() {
  const sts = studentsByParalelo[activeParaleloId] || [];
  const q   = (document.getElementById('searchInput') || {}).value || '';
  const ql  = q.toLowerCase();

  return sts.filter(s => {
    // Búsqueda de texto
    const matchQ = !q ||
      s.nombre.toLowerCase().includes(ql) ||
      s.celular.includes(ql) ||
      s.correo.toLowerCase().includes(ql);

    if (!matchQ) return false;
    if (!activeFilters.size) return true; // sin filtros = todos

    const sem = semaforo(s);

    // Cada filtro activo debe cumplirse (AND)
    for (const f of activeFilters) {
      if (f === 'verde'    && sem !== 'verde')    return false;
      if (f === 'amarillo' && sem !== 'amarillo') return false;
      if (f === 'rojo'     && sem !== 'rojo')     return false;
      if (f === 'contel'   && !s.celular)         return false;
      if (f === 'sintel'   && s.celular)          return false;
      if (f === 'conmail'  && !s.correo)          return false;
      if (f === 'sinmail'  && s.correo)           return false;
      // filtros de materia: prefijo "mat_"
      if (f.startsWith('mat_')) {
        const key = f.slice(4);
        if (!s.materias[key]) return false;
      }
      // filtros "sin materia": prefijo "nomat_"
      if (f.startsWith('nomat_')) {
        const key = f.slice(6);
        if (s.materias[key]) return false;
      }
    }
    return true;
  });
}

function renderTable() {
  const sts = studentsByParalelo[activeParaleloId] || [];
  const filtered = getFiltered();
  const tbody = document.getElementById('tableBody');
  const empty = document.getElementById('emptyState');
  if (!tbody) return;
  const viewer = isViewer();

  if (!filtered.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    if (!viewer) updateBulkButton();
    return;
  }
  empty.style.display = 'none';

  // Rebuild header chips dynamically
  const thead = document.querySelector('#mainTable thead tr');
  if (thead) {
    const oldMats = thead.querySelectorAll('th.col-materia');
    oldMats.forEach(el => el.remove());
    const actTh = thead.querySelector('th.col-accion');
    MATERIAS.forEach(m => {
      const th = document.createElement('th');
      th.className = 'col-materia';
      const chipClass = CHIP_CLASSES[m] || 'chip-ia';
      th.innerHTML = `<div class="materia-abbrev chip ${chipClass}">${m.toUpperCase()}</div>`;
      thead.insertBefore(th, actTh);
    });
  }

  tbody.innerHTML = filtered.map((s, i) => {
    const idx = sts.indexOf(s);
    const sem = semaforo(s);
    const semDot = `<span class="sem-dot sem-${sem}" title="${sem === 'verde' ? 'Completo' : sem === 'amarillo' ? 'Parcial' : 'Sin materias'}"></span>`;

    // En modo viewer: celular y correo sin clic editable
    const telCell = viewer
      ? (s.celular ? `<span>${s.celular}</span>` : `<span class="badge-notel">sin número</span>`)
      : (s.celular
          ? `<span class="celular-edit" onclick="openEditStudent(${idx})">${s.celular}</span>`
          : `<span class="badge-notel" onclick="openEditStudent(${idx})" title="Clic para agregar">sin número</span>`);

    const mailCell = s.correo
      ? `<a href="mailto:${s.correo}" title="${s.correo}">${s.correo}</a>`
      : `<span class="badge-nomail">sin correo</span>`;

    // En modo viewer: checks sin onclick
    const checks = MATERIAS.map(m => viewer
      ? `<td class="check-cell"><div class="check-icon ${s.materias[m] ? 'checked' : ''}" style="cursor:default">${s.materias[m] ? '✓' : ''}</div></td>`
      : `<td class="check-cell" onclick="toggleMateria(${idx},'${m}')"><div class="check-icon ${s.materias[m] ? 'checked' : ''}">${s.materias[m] ? '✓' : ''}</div></td>`
    ).join('');

    const isSelected = selectedIds.has(s.id);

    return `<tr class="${s.nuevo ? 'highlight-new' : ''}${isSelected ? ' selected-row' : ''}" id="row_${s.id}">
      ${viewer ? '' : `<td class="col-check"><input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleSelect('${s.id}', this.checked)"></td>`}
      <td class="col-sem">${semDot}</td>
      <td class="col-num">${i+1}</td>
      <td class="col-nombre">${s.nombre}${s.nuevo ? '<span class="badge-new">NUEVO</span>' : ''}</td>
      <td class="col-celular">${telCell}</td>
      <td class="col-correo">${mailCell}</td>
      ${checks}
      ${viewer ? '' : `<td>
        <button class="btn-icon" style="background:rgba(45,90,61,0.12);color:var(--accent-text);border-color:rgba(45,90,61,0.2);margin-right:3px" onclick="openEditStudent(${idx})" title="Editar">✎</button>
        <button class="btn-danger" onclick="removeStudent(${idx})" title="Eliminar">✕</button>
      </td>`}
    </tr>`;
  }).join('');

  if (!viewer) updateBulkButton();
}

// ═══════════════════════════════════════════════════
//  SELECCIÓN MÚLTIPLE
// ═══════════════════════════════════════════════════
function toggleSelect(id, checked) {
  if (checked) selectedIds.add(id); else selectedIds.delete(id);
  updateBulkButton();
  // update row class
  const row = document.getElementById('row_' + id);
  if (row) row.classList.toggle('selected-row', checked);
}
function toggleAll(cb) {
  const filtered = getFiltered();
  if (cb.checked) filtered.forEach(s => selectedIds.add(s.id));
  else selectedIds.clear();
  renderTable();
}
function updateBulkButton() {
  const btn   = document.getElementById('btnBulkDelete');
  const count = document.getElementById('bulkCount');
  if (!btn) return;
  if (selectedIds.size > 0) {
    btn.style.display = 'inline-flex';
    count.textContent = selectedIds.size;
  } else {
    btn.style.display = 'none';
  }
}
function bulkDeleteSelected() {
  if (!canEdit()) return;
  if (!selectedIds.size) return;
  const sts = studentsByParalelo[activeParaleloId] || [];
  const names = sts.filter(s => selectedIds.has(s.id)).slice(0,3).map(s => '• ' + s.nombre).join('\n');
  const extra = selectedIds.size > 3 ? `\n  ...y ${selectedIds.size - 3} más` : '';
  if (!confirm(`⚠ ¿Eliminar ${selectedIds.size} estudiante(s)?\n\n${names}${extra}\n\nEsta acción no se puede deshacer.`)) return;
  studentsByParalelo[activeParaleloId] = sts.filter(s => !selectedIds.has(s.id));
  const n = selectedIds.size;
  selectedIds.clear();
  saveData(`Eliminación masiva de ${n} estudiantes`);
  renderAll();
  showToast(`${n} estudiante(s) eliminados`);
}

// ═══════════════════════════════════════════════════
//  HEADER / RENAME
// ═══════════════════════════════════════════════════
function updateHeaderTitle() {
  const sem = listadoConfig.semestre || '';
  const par = listadoConfig.paralelo || '';
  document.getElementById('headerSemestre').textContent = sem;
  document.getElementById('headerParalelo').textContent = `— Paralelo ${par}`;
  document.title = `${sem} ${par} · SISORLIST`;
}
function openRenameModal() {
  document.getElementById('inputSemestre').value = listadoConfig.semestre;
  const sel = document.getElementById('inputParaleloSelect');
  sel.innerHTML = paralelos.map(p =>
    `<option value="${p.id}" ${p.id === activeParaleloId ? 'selected' : ''}>${p.nombre} — ${p.semestre}</option>`
  ).join('');
  // Rellenar nombre editable del paralelo activo
  const active = paralelos.find(p => p.id === activeParaleloId);
  document.getElementById('inputParaleloNombre').value = active ? active.nombre : '';
  document.getElementById('modalRename').classList.add('open');
}
function onParaleloSelectChange(sel) {
  const p = paralelos.find(x => x.id === sel.value);
  if (p) document.getElementById('inputParaleloNombre').value = p.nombre;
}
function closeRenameModal() { document.getElementById('modalRename').classList.remove('open'); }
function saveRename() {
  const sem    = document.getElementById('inputSemestre').value.trim();
  const pid    = document.getElementById('inputParaleloSelect').value;
  const nombre = document.getElementById('inputParaleloNombre').value.trim().toUpperCase();
  if (!sem)    { showToast('Ingresa el semestre'); return; }
  if (!nombre) { showToast('Ingresa el nombre del paralelo'); return; }
  const p = paralelos.find(x => x.id === pid);
  if (p) {
    p.semestre = sem;
    p.nombre   = nombre;
    activeParaleloId = pid;
    listadoConfig = { semestre: sem, paralelo: nombre };
    saveParalelos();
    saveConfig();
    syncFirebase();
    updateHeaderTitle();
    renderParaleloTabs();
    auditEntry('✎', `Cambio a "${sem}" — Paralelo ${nombre}`);
    closeRenameModal();
    showToast('Semestre y paralelo actualizados');
  }
}

// ═══════════════════════════════════════════════════
//  FILTROS COMBINABLES (multi-select AND)
// ═══════════════════════════════════════════════════
function toggleFilter(f, btn) {
  // Conflictos: no puede estar con/sin a la vez
  const conflicts = {
    contel: 'sintel', sintel: 'contel',
    conmail: 'sinmail', sinmail: 'conmail',
    verde: ['amarillo','rojo'], amarillo: ['verde','rojo'], rojo: ['verde','amarillo']
  };
  const conflict = conflicts[f];
  if (conflict) {
    const toRemove = Array.isArray(conflict) ? conflict : [conflict];
    toRemove.forEach(c => {
      activeFilters.delete(c);
      const cb = document.querySelector(`.filter-btn[data-filter="${c}"]`);
      if (cb) cb.classList.remove('active');
    });
  }
  if (activeFilters.has(f)) {
    activeFilters.delete(f);
    btn.classList.remove('active');
  } else {
    activeFilters.add(f);
    btn.classList.add('active');
  }
  selectedIds.clear();
  updateFilterSummary();
  renderTable();
}

function clearAllFilters() {
  activeFilters.clear();
  document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
  updateFilterSummary();
  selectedIds.clear();
  renderTable();
}

function updateFilterSummary() {
  const summary = document.getElementById('filterSummary');
  const text    = document.getElementById('filterSummaryText');
  const btnExp  = document.getElementById('btnFilterExport');
  if (!summary) return;

  if (!activeFilters.size) {
    summary.style.display = 'none';
    if (btnExp) btnExp.style.display = 'none';
    return;
  }

  const labels = {
    verde:'🟢 Completos', amarillo:'🟡 Parciales', rojo:'🔴 Sin materias',
    contel:'Con número', sintel:'Sin número',
    conmail:'Con correo', sinmail:'Sin correo'
  };

  const parts = [...activeFilters].map(f => {
    if (f.startsWith('mat_'))   return `Con ${MATERIAS_MAP[f.slice(4)]  || f.slice(4)}`;
    if (f.startsWith('nomat_')) return `Sin ${MATERIAS_MAP[f.slice(6)]  || f.slice(6)}`;
    return labels[f] || f;
  });

  const count = getFiltered().length;
  text.textContent = `${parts.join(' + ')} → ${count} estudiante${count !== 1 ? 's' : ''}`;
  summary.style.display = 'flex';
  if (btnExp && !isViewer()) btnExp.style.display = '';
}

function buildFilterMateriasBtns() {
  const cont = document.getElementById('filterMateriasBtns');
  if (!cont) return;
  cont.innerHTML = MATERIAS.map(k => {
    const chipClass = CHIP_CLASSES[k] || 'chip-ia';
    return `
      <button class="filter-btn filter-mat-btn" data-filter="mat_${k}"
        title="Tiene ${MATERIAS_MAP[k]}"
        onclick="toggleFilter('mat_${k}',this)">
        <span class="chip chip-xs ${chipClass}">${k.toUpperCase()}</span> Inscritos
      </button>
      <button class="filter-btn filter-mat-btn filter-nomat" data-filter="nomat_${k}"
        title="No tiene ${MATERIAS_MAP[k]}"
        onclick="toggleFilter('nomat_${k}',this)">
        <span class="chip chip-xs ${chipClass}">${k.toUpperCase()}</span> No inscritos
      </button>`;
  }).join('');
}

function exportFiltered() {
  if (isViewer()) return;
  const sts = getFiltered();
  if (!sts.length) { showToast('No hay estudiantes con ese filtro'); return; }

  const labels = {
    verde:'Completos', amarillo:'Parciales', rojo:'Sin materias',
    contel:'Con número', sintel:'Sin número',
    conmail:'Con correo', sinmail:'Sin correo'
  };
  const filterName = [...activeFilters].map(f => {
    if (f.startsWith('mat_'))   return `Con_${f.slice(4)}`;
    if (f.startsWith('nomat_')) return `Sin_${f.slice(6)}`;
    return labels[f] || f;
  }).join('_') || 'todos';

  const header = ['#','Apellidos y Nombres','Celular','Correo','Estado',
    ...MATERIAS.map(m => MATERIAS_MAP[m])];
  const rows = sts.map((s, i) => [
    i+1, s.nombre, s.celular||'', s.correo||'', semaforo(s),
    ...MATERIAS.map(m => s.materias[m] ? 'X' : '')
  ]);

  const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
  ws['!cols'] = [{ wch:4 },{ wch:40 },{ wch:16 },{ wch:32 },{ wch:12 },
    ...MATERIAS.map(() => ({ wch:10 }))];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Filtrado');
  const fname = `filtro_${filterName}_${listadoConfig.semestre}_${listadoConfig.paralelo}`
    .replace(/\s+/g,'_').slice(0, 80) + '.xlsx';
  XLSX.writeFile(wb, fname);
  auditEntry('⬇', `Exportó filtro: ${filterName} (${sts.length} estudiantes)`);
  showToast(`Exportados ${sts.length} estudiantes ✓`);
}

// Compatibilidad con código que usa setFilter (paralelos, etc.)
function setFilter(f, btn) {
  clearAllFilters();
  if (f !== 'todos') toggleFilter(f, document.querySelector(`.filter-btn[data-filter="${f}"]`) || btn);
}
function switchTab(tab, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('view-' + tab).classList.add('active');
  if (tab === 'materias')  renderMateria();
  if (tab === 'whatsapp')  renderWhatsApp();
  if (tab === 'auditoria') renderAudit();
}
function setMateriaFilter(mat, btn) {
  currentMateriaFilter = mat;
  document.querySelectorAll('.mf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMateria();
}

// ═══════════════════════════════════════════════════
//  TOGGLE MATERIA
// ═══════════════════════════════════════════════════
function toggleMateria(idx, mat) {
  if (!canEdit()) return;
  const sts = studentsByParalelo[activeParaleloId];
  const prev = sts[idx].materias[mat];
  sts[idx].materias[mat] = !prev;
  const action = `${prev ? 'Quitó' : 'Marcó'} ${MATERIAS_MAP[mat]} a ${sts[idx].nombre}`;
  saveData(action);
  renderTable();
  renderStats();
  renderMateria();
}

// ═══════════════════════════════════════════════════
//  VALIDACIONES (con forzado a mayúsculas)
// ═══════════════════════════════════════════════════
function validarCelular(cel) {
  if (!cel) return true;
  return /^\d{7,15}$/.test(cel);
}
function validarCorreo(correo) {
  if (!correo) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}
function validarNombre(nombre) {
  if (!nombre || nombre.trim().length < 3) return false;
  // Solo letras mayúsculas, espacios, guiones, apóstrofes
  const clean = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return /^[A-Z\s\-']+$/.test(clean);
}
function mostrarError(inputId, mensaje) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.style.borderColor = 'var(--red)';
  el.title = mensaje;
  el.classList.add('input-error');
  setTimeout(() => {
    el.style.borderColor = '';
    el.title = '';
    el.classList.remove('input-error');
  }, 2500);
}

// ═══════════════════════════════════════════════════
//  MODAL EDITAR ESTUDIANTE
// ═══════════════════════════════════════════════════
function openEditStudent(idx) {
  if (!canEdit()) return;
  const sts = studentsByParalelo[activeParaleloId];
  const s   = sts[idx];
  document.getElementById('editIdx').value         = idx;
  document.getElementById('editNombreInput').value = s.nombre;
  document.getElementById('editCelularInput').value= s.celular;
  document.getElementById('editCorreoInput').value = s.correo;
  document.getElementById('modalEditStudent').classList.add('open');
  setTimeout(() => document.getElementById('editNombreInput').focus(), 100);
}
function closeEditStudent() { document.getElementById('modalEditStudent').classList.remove('open'); }
function saveEditStudent() {
  const idx  = parseInt(document.getElementById('editIdx').value);
  const nom  = document.getElementById('editNombreInput').value.trim().toUpperCase();
  const cel  = document.getElementById('editCelularInput').value.trim().replace(/\s+/g,'');
  const mail = document.getElementById('editCorreoInput').value.trim().toLowerCase();

  if (!validarNombre(nom)) {
    mostrarError('editNombreInput', 'Solo letras mayúsculas, mín. 3 caracteres');
    showToast('⚠ Nombre inválido — solo letras mayúsculas'); return;
  }
  if (!validarCelular(cel)) {
    mostrarError('editCelularInput', 'Solo dígitos, entre 7 y 15 caracteres');
    showToast('⚠ Número de celular inválido'); return;
  }
  if (!validarCorreo(mail)) {
    mostrarError('editCorreoInput', 'Formato de correo inválido');
    showToast('⚠ Correo institucional inválido'); return;
  }
  const sts = studentsByParalelo[activeParaleloId];
  const old = { ...sts[idx] };
  sts[idx].nombre  = nom;
  sts[idx].celular = cel;
  sts[idx].correo  = mail;
  auditEntry('✎', `Editó estudiante: ${old.nombre} → ${nom}`, currentSession ? currentSession.email : '');
  saveData();
  renderAll();
  closeEditStudent();
  showToast('Datos actualizados');
}

// ═══════════════════════════════════════════════════
//  MODAL AGREGAR ESTUDIANTE
// ═══════════════════════════════════════════════════
function openAddStudent() {
  if (!canEdit()) return;
  document.getElementById('addNombre').value  = '';
  document.getElementById('addCelular').value = '';
  document.getElementById('addCorreo').value  = '';
  document.getElementById('modalAdd').classList.add('open');
  setTimeout(() => document.getElementById('addNombre').focus(), 100);
}
function closeAddStudent() { document.getElementById('modalAdd').classList.remove('open'); }
function addStudent() {
  const nombre  = document.getElementById('addNombre').value.trim().toUpperCase();
  const celular = document.getElementById('addCelular').value.trim().replace(/\s+/g,'');
  const correo  = document.getElementById('addCorreo').value.trim().toLowerCase();

  if (!validarNombre(nombre)) {
    mostrarError('addNombre', 'Solo letras mayúsculas, mín. 3 caracteres');
    showToast('⚠ Nombre inválido — solo letras mayúsculas'); return;
  }
  if (!validarCelular(celular)) {
    mostrarError('addCelular', 'Solo dígitos, entre 7 y 15 caracteres');
    showToast('⚠ Número de celular inválido'); return;
  }
  if (!validarCorreo(correo)) {
    mostrarError('addCorreo', 'Formato de correo inválido');
    showToast('⚠ Correo institucional inválido'); return;
  }
  const sts = studentsByParalelo[activeParaleloId] || [];
  const exists = sts.find(s => normalizeNombre(s.nombre) === normalizeNombre(nombre));
  if (exists) { showToast('⚠ Este estudiante ya existe en el listado'); return; }

  sts.push({ id: 'std_' + Date.now(), nombre, celular, correo, nuevo: true, materias: emptyMaterias() });
  studentsByParalelo[activeParaleloId] = sts;
  auditEntry('➕', `Agregó estudiante: ${nombre}`, currentSession ? currentSession.email : '');
  saveData();
  renderAll();
  closeAddStudent();
  showToast(`✓ ${nombre} agregado`);
}

// ═══════════════════════════════════════════════════
//  ELIMINAR ESTUDIANTE
// ═══════════════════════════════════════════════════
function removeStudent(idx) {
  if (!canEdit()) return;
  const sts = studentsByParalelo[activeParaleloId];
  const s   = sts[idx];
  if (!confirm(`¿Eliminar a ${s.nombre} del listado?`)) return;
  auditEntry('🗑', `Eliminó estudiante: ${s.nombre}`, currentSession ? currentSession.email : '');
  sts.splice(idx, 1);
  selectedIds.delete(s.id);
  saveData();
  renderAll();
  showToast('Estudiante eliminado');
}

// ═══════════════════════════════════════════════════
//  VISTA MATERIAS
// ═══════════════════════════════════════════════════
function renderMateria() {
  const cont = document.getElementById('materiaContent');
  const sts  = studentsByParalelo[activeParaleloId] || [];
  const mat  = currentMateriaFilter;
  if (!cont) return;

  if (mat === 'todos') {
    cont.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:1rem">` +
      MATERIAS.map(m => {
        const list = sts.filter(s => s.materias[m]);
        const chipClass = CHIP_CLASSES[m] || 'chip-ia';
        return `<div style="background:var(--surface);border-radius:10px;border:1px solid var(--border);padding:1.25rem">
          <div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;color:var(--text3);margin-bottom:4px;font-family:'IBM Plex Mono',monospace">${m.toUpperCase()}</div>
          <div style="font-size:13px;font-weight:500;margin-bottom:0.6rem;color:var(--text)">${MATERIAS_MAP[m]}</div>
          <div style="font-size:11.5px;font-family:'IBM Plex Mono',monospace;color:var(--accent);font-weight:500;margin-bottom:0.5rem">${list.length} estudiantes</div>
          <div style="font-size:11px;line-height:2;color:var(--text)">
            ${list.length ? list.map(s => `• ${s.nombre}`).join('<br>') : '<span style="color:var(--text3);font-size:11px">Ninguno registrado aún</span>'}
          </div>
        </div>`;
      }).join('') + `</div>`;
  } else {
    const list = sts.filter(s => s.materias[mat]);
    cont.innerHTML = `<div style="background:var(--surface);border-radius:10px;border:1px solid var(--border);padding:1.5rem">
      <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:1rem">
        <div>
          <div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;color:var(--text3);font-family:'IBM Plex Mono',monospace;margin-bottom:4px">${mat.toUpperCase()}</div>
          <div style="font-size:1.05rem;font-weight:500">${MATERIAS_MAP[mat] || mat}</div>
        </div>
        <div style="font-family:'IBM Plex Mono',monospace;font-size:1.5rem;font-weight:500;color:var(--accent)">${list.length}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;min-width:400px">
        <thead style="background:var(--bg)">
          <tr>
            <th style="padding:7px 10px;text-align:left;font-size:9.5px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;font-family:'IBM Plex Mono',monospace;color:var(--text2)">#</th>
            <th style="padding:7px 10px;text-align:left;font-size:9.5px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;font-family:'IBM Plex Mono',monospace;color:var(--text2)">Nombre</th>
            <th style="padding:7px 10px;text-align:left;font-size:9.5px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;font-family:'IBM Plex Mono',monospace;color:var(--text2)">Celular</th>
            <th style="padding:7px 10px;text-align:left;font-size:9.5px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;font-family:'IBM Plex Mono',monospace;color:var(--text2)">Correo</th>
          </tr>
        </thead>
        <tbody>
          ${list.length ? list.map((s,i) => `<tr style="border-bottom:1px solid var(--border)">
            <td style="padding:7px 10px;font-size:10.5px;font-family:'IBM Plex Mono',monospace;color:var(--text3)">${i+1}</td>
            <td style="padding:7px 10px;font-size:11.5px">${s.nombre}</td>
            <td style="padding:7px 10px;font-size:10.5px;font-family:'IBM Plex Mono',monospace;color:var(--text2)">${s.celular || '—'}</td>
            <td style="padding:7px 10px;font-size:10px;font-family:'IBM Plex Mono',monospace;color:var(--blue)">${s.correo ? `<a href="mailto:${s.correo}" style="color:var(--blue);text-decoration:none">${s.correo}</a>` : '—'}</td>
          </tr>`).join('') : `<tr><td colspan="4" style="padding:2rem;text-align:center;color:var(--text3);font-size:12px">Ninguno registrado en esta materia</td></tr>`}
        </tbody>
      </table>
    </div>`;
  }
}

// ═══════════════════════════════════════════════════
//  VISTA WHATSAPP
// ═══════════════════════════════════════════════════
function renderWhatsApp() {
  const sts   = studentsByParalelo[activeParaleloId] || [];
  const conTel = sts.filter(s => s.celular);
  const sinTel = sts.filter(s => !s.celular);
  const waCom  = document.getElementById('waComList');
  const waSin  = document.getElementById('waSinList');
  if (!waCom || !waSin) return;
  waCom.innerHTML = conTel.map((s,i) => `<div style="margin-bottom:4px">${i+1}. ${s.nombre}<br>
    <span style="color:var(--text3);font-size:10px;margin-left:16px;font-family:'IBM Plex Mono',monospace">${s.celular}</span>
  </div>`).join('');
  waSin.innerHTML = sinTel.map((s,i) => `<div style="margin-bottom:3px">${i+1}. ${s.nombre}</div>`).join('');
}

// ═══════════════════════════════════════════════════
//  IMPORT TXT / XLSX
// ═══════════════════════════════════════════════════
function openImport() {
  if (!canEdit()) return;
  document.getElementById('modalImport').classList.add('open');
  rebuildImportMateriaSelect();
}
function closeImport() {
  document.getElementById('modalImport').classList.remove('open');
  document.getElementById('importText').value = '';
  const res = document.getElementById('importResult');
  res.textContent = ''; res.classList.remove('show');
  document.getElementById('importFileTxt').value = '';
  document.getElementById('importFileXlsx').value = '';
}

function loadImportFile(input, type) {
  const file = input.files[0];
  if (!file) return;
  if (type === 'xlsx') {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const wb  = XLSX.read(e.target.result, { type: 'binary' });
        const ws  = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
        // Extraer nombres de la primera o segunda columna (SGA)
        const lines = [];
        rows.forEach(row => {
          // buscar columna con nombres (largo, letras)
          for (let i = 0; i < row.length; i++) {
            const cell = String(row[i] || '').trim();
            if (cell.length > 4 && /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(cell)) {
              lines.push(cell);
              break;
            }
          }
        });
        document.getElementById('importText').value = lines.join('\n');
        showToast(`Excel cargado — ${lines.length} líneas detectadas`);
      } catch(err) {
        showToast('Error al leer el Excel. Verifica el formato.');
      }
    };
    reader.readAsBinaryString(file);
  } else {
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById('importText').value = e.target.result;
      showToast(`"${file.name}" cargado`);
    };
    reader.onerror = () => showToast('Error al leer el archivo');
    reader.readAsText(file, 'UTF-8');
  }
}

function sgaNombreToApellidosNombre(fullName) {
  const parts = fullName.trim().toUpperCase().split(/\s+/);
  if (parts.length < 3) return parts.join(' ');
  const apellidos = parts.slice(-2);
  const nombres   = parts.slice(0, -2);
  return [...apellidos, ...nombres].join(' ');
}
function parseSgaLine(line) {
  const tabParts = line.split('\t').map(p => p.trim()).filter(p => p.length > 0);
  if (tabParts.length >= 2 && /^\d{8,13}$/.test(tabParts[0]))
    return { cedula: tabParts[0], rawNombre: tabParts.slice(1).join(' ') };
  const spaceParts = line.trim().split(/\s+/);
  if (spaceParts.length >= 3 && /^\d{8,13}$/.test(spaceParts[0]))
    return { cedula: spaceParts[0], rawNombre: spaceParts.slice(1).join(' ') };
  return null;
}

function processImport() {
  const mat  = document.getElementById('importMateria').value;
  const text = document.getElementById('importText').value;
  if (!text.trim()) { showToast('Pega o carga el contenido del TXT primero'); return; }

  const sts   = studentsByParalelo[activeParaleloId] || [];
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 3);
  let matched = 0, newAdded = 0, alreadyHad = 0, sgaDetected = 0;

  lines.forEach(line => {
    const sgaParsed = parseSgaLine(line);
    let nombreFinal;
    if (sgaParsed) {
      sgaDetected++;
      nombreFinal = sgaNombreToApellidosNombre(sgaParsed.rawNombre).toUpperCase();
    } else {
      nombreFinal = line.trim().toUpperCase();
    }
    const normalized = normalizeNombre(nombreFinal);
    const found = sts.find(s =>
      normalizeNombre(s.nombre) === normalized ||
      normalizeNombre(s.nombre).includes(normalized.slice(0,10)) ||
      normalized.includes(normalizeNombre(s.nombre).slice(0,10))
    );
    if (found) {
      if (!found.materias[mat]) { found.materias[mat] = true; matched++; }
      else alreadyHad++;
    } else {
      sts.push({
        id: 'std_' + Date.now() + '_' + Math.random(),
        nombre: nombreFinal,
        celular: '',
        correo: '', nuevo: true,
        materias: { ...emptyMaterias(), [mat]: true }
      });
      newAdded++;
    }
  });

  studentsByParalelo[activeParaleloId] = sts;
  auditEntry('⬆', `Importación: ${matched} marcados, ${newAdded} nuevos — ${MATERIAS_MAP[mat]}`, currentSession ? currentSession.email : '');
  saveData();
  renderAll();

  const res = document.getElementById('importResult');
  res.textContent =
    `✓ Proceso completado — ${MATERIAS_MAP[mat]}\n\n` +
    (sgaDetected > 0 ? `• Formato SGA detectado (${sgaDetected} líneas reordenadas)\n` : '') +
    `• ${matched} marcados en esta materia\n` +
    `• ${newAdded} nuevos agregados\n` +
    `• ${alreadyHad} ya estaban registrados\n` +
    `• ${lines.length} líneas procesadas`;
  res.classList.add('show');
  showToast(`Importación completada — ${matched + newAdded} actualizados`);
}

// ═══════════════════════════════════════════════════
//  EXPORTAR
// ═══════════════════════════════════════════════════
function exportCSV() {
  if (isViewer()) return;
  const sts = getFiltered();
  const header = ['#','Nombre','Celular','Correo','Semáforo',...MATERIAS.map(m => MATERIAS_MAP[m])];
  const rows = sts.map((s, i) => [
    i+1, s.nombre, s.celular, s.correo, semaforo(s),
    ...MATERIAS.map(m => s.materias[m] ? 'X' : '')
  ]);
  const csv = [header, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF'+csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `listado_${listadoConfig.semestre}_${listadoConfig.paralelo}.csv`.replace(/\s+/g,'_');
  a.click(); URL.revokeObjectURL(url);
  showToast(`CSV exportado: ${sts.length} estudiantes`);
}

function exportExcel() {
  if (isViewer()) return;
  if (typeof XLSX === 'undefined') { showToast('Error: librería Excel no cargada'); return; }
  const sts = getFiltered();
  const wb  = XLSX.utils.book_new();
  const headerRow = ['#','Apellidos y Nombres','Celular','Correo Institucional','Semáforo',
    ...MATERIAS.map(m => MATERIAS_MAP[m])];
  const dataRows = sts.map((s, i) => [
    i+1, s.nombre, s.celular||'', s.correo||'', semaforo(s),
    ...MATERIAS.map(m => s.materias[m] ? '✓' : '')
  ]);
  const ws1 = XLSX.utils.aoa_to_sheet([headerRow, ...dataRows]);
  ws1['!cols'] = [{ wch:4 },{ wch:40 },{ wch:16 },{ wch:32 },{ wch:10 },...MATERIAS.map(() => ({ wch:16 }))];
  XLSX.utils.book_append_sheet(wb, ws1, 'Listado');

  // Resumen por materia
  const resHead = [['Materia','Registrados','Sin registrar','Total']];
  MATERIAS.forEach(m => {
    const con = sts.filter(s => s.materias[m]).length;
    resHead.push([MATERIAS_MAP[m], con, sts.length - con, sts.length]);
  });
  const ws2 = XLSX.utils.aoa_to_sheet(resHead);
  ws2['!cols'] = [{ wch:28 },{ wch:14 },{ wch:14 },{ wch:10 }];
  XLSX.utils.book_append_sheet(wb, ws2, 'Resumen por Materia');

  // Sin ninguna materia
  const sinMat = sts.filter(s => MATERIAS.every(m => !s.materias[m]));
  const ws3 = XLSX.utils.aoa_to_sheet([['#','Apellidos y Nombres','Celular','Correo'],
    ...sinMat.map((s,i) => [i+1, s.nombre, s.celular||'', s.correo||''])]);
  ws3['!cols'] = [{ wch:4 },{ wch:40 },{ wch:16 },{ wch:32 }];
  XLSX.utils.book_append_sheet(wb, ws3, 'Sin Materias');

  XLSX.writeFile(wb, `listado_${listadoConfig.semestre}_${listadoConfig.paralelo}.xlsx`.replace(/\s+/g,'_'));
  showToast(`Excel exportado: ${sts.length} estudiantes`);
}

function downloadBackup() {
  if (isViewer()) return;
  const backup = {
    exportedAt: new Date().toISOString(),
    exportedBy: currentSession ? currentSession.email : 'sistema',
    version: 'sisorlist-v2',
    config: listadoConfig,
    paralelos,
    studentsByParalelo,
    auditLog: auditLog.slice(0, 100)
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `sisorlist_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click(); URL.revokeObjectURL(url);
  auditEntry('💾', 'Backup JSON descargado', currentSession ? currentSession.email : '');
  showToast('Backup descargado ✓');
}

// ═══════════════════════════════════════════════════
//  COPIAR
// ═══════════════════════════════════════════════════
function copyNumbers() {
  const sts = studentsByParalelo[activeParaleloId] || [];
  const nums = sts.filter(s => s.celular).map(s => s.celular).join('\n');
  navigator.clipboard.writeText(nums).then(() => showToast('Números copiados'));
}
function copyNumbersWA() {
  const sts = studentsByParalelo[activeParaleloId] || [];
  const nums = sts.filter(s => s.celular).map(s => `+${s.celular} ${s.nombre}`).join('\n');
  navigator.clipboard.writeText(nums).then(() => showToast('Lista copiada con formato WhatsApp'));
}
function copyEmails() {
  const sts = studentsByParalelo[activeParaleloId] || [];
  const mails = sts.filter(s => s.correo).map(s => s.correo).join(';');
  navigator.clipboard.writeText(mails).then(() => showToast(`${sts.filter(s=>s.correo).length} correos copiados`));
}

// ═══════════════════════════════════════════════════
//  PANEL DE CONTROL
// ═══════════════════════════════════════════════════
// ─── Dropdown menú usuario ───
function toggleUserMenu() {
  const dd = document.getElementById('userDropdown');
  const isOpen = dd.classList.contains('open');
  dd.classList.toggle('open', !isOpen);
  // actualizar el email en el dropdown
  if (!isOpen && currentSession) {
    document.getElementById('userDropdownEmail').textContent = currentSession.email;
  }
}
function openPanelFromMenu() {
  document.getElementById('userDropdown').classList.remove('open');
  openPanel();
}
// Cerrar dropdown al click fuera
document.addEventListener('click', function(e) {
  const wrap = document.getElementById('userBadgeWrap');
  if (wrap && !wrap.contains(e.target)) {
    const dd = document.getElementById('userDropdown');
    if (dd) dd.classList.remove('open');
  }
});

function openPanel() {
  if (isViewer()) { showToast('Sin acceso al panel de control'); return; }

  // Tabs visibles según rol
  const tabUsuarios  = document.querySelector('.panel-tab[onclick*="usuarios"]');
  const tabParalelos = document.querySelector('.panel-tab[onclick*="paralelos"]');
  const tabMaterias  = document.querySelector('.panel-tab[onclick*="materias_cfg"]');
  if (tabUsuarios)  tabUsuarios.style.display  = isAdmin() ? '' : 'none';
  if (tabParalelos) tabParalelos.style.display = isAdmin() ? '' : 'none';
  if (tabMaterias)  tabMaterias.style.display  = isAdmin() ? '' : 'none';

  document.getElementById('cfgEmail').value    = currentSession ? currentSession.email : '';
  document.getElementById('cfgPassword').value = '';
  document.getElementById('cfgPassword2').value= '';
  renderUsuariosLista();
  renderParalelosLista();
  renderMateriasConfigLista();
  document.getElementById('modalPanel').classList.add('open');
}
function closePanel() { document.getElementById('modalPanel').classList.remove('open'); }

function switchPanelTab(id, btn) {
  document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel-section').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('psec-' + id).classList.add('active');
}

// ─── Editar usuario (solo admin) ───
function openEditUser(i) {
  if (!currentSession || currentSession.role !== 'admin') return;
  const u = users[i];
  document.getElementById('editUserIdx').value      = i;
  document.getElementById('editUserEmail').value    = u.email;
  document.getElementById('editUserPassword').value = '';
  document.getElementById('editUserRole').value     = u.role;
  // reset eye buttons
  document.getElementById('editUserPassword').type  = 'password';
  document.getElementById('modalEditUser').classList.add('open');
}
function closeEditUser() { document.getElementById('modalEditUser').classList.remove('open'); }
function saveEditUser() {
  const i        = parseInt(document.getElementById('editUserIdx').value);
  const email    = document.getElementById('editUserEmail').value.trim().toLowerCase();
  const password = document.getElementById('editUserPassword').value;
  const role     = document.getElementById('editUserRole').value;
  if (!email) { showToast('Ingresa el correo'); return; }
  // no puede haber duplicado excepto él mismo
  if (users.find((u, idx) => u.email === email && idx !== i)) { showToast('Ese correo ya está en uso'); return; }
  const oldEmail = users[i].email;
  users[i].email = email;
  users[i].role  = role;
  if (password) {
    if (password.length < 6) { showToast('La contraseña debe tener al menos 6 caracteres'); return; }
    users[i].password = password;
  }
  // si editó su propio usuario, actualizar sesión
  if (currentSession.email === oldEmail) {
    currentSession.email = email;
    currentSession.role  = role;
    localStorage.setItem(LS_AUTH, JSON.stringify(currentSession));
    document.getElementById('userBadgeEmail').textContent = email.split('@')[0];
  }
  saveUsers();
  auditEntry('🔧', `Usuario editado: ${oldEmail} → ${email} (${role})`);
  renderUsuariosLista();
  closeEditUser();
  showToast('Usuario actualizado');
}

// --- Cuenta ---
function saveCuenta() {
  const email = document.getElementById('cfgEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('cfgPassword').value;
  const pass2 = document.getElementById('cfgPassword2').value;
  if (!email) { showToast('Ingresa el correo'); return; }
  if (pass && pass !== pass2) { showToast('Las contraseñas no coinciden'); return; }
  const oldEmail = currentSession.email;
  const user = users.find(u => u.email === oldEmail);
  if (user) {
    user.email = email;
    if (pass) user.password = pass;
    saveUsers();
    currentSession.email = email;
    localStorage.setItem(LS_AUTH, JSON.stringify(currentSession));
    document.getElementById('userBadgeEmail').textContent = email.split('@')[0];
    auditEntry('🔧', `Cuenta actualizada: ${oldEmail} → ${email}`);
    showToast('Cuenta actualizada');
    closePanel();
  }
}

// --- Usuarios ---
function renderUsuariosLista() {
  const cont = document.getElementById('usuariosLista');
  if (!cont) return;
  const isAdmin = currentSession && currentSession.role === 'admin';
  const ROLE_LABEL = { admin: 'Admin', editor: 'Editor', viewer: 'Visualizador' };
  cont.innerHTML = users.map((u, i) => `
    <div class="user-row">
      <div>
        <div class="user-row-email">${u.email}</div>
        <div style="margin-top:3px"><span class="user-role-badge role-${u.role}">${ROLE_LABEL[u.role] || u.role}</span></div>
      </div>
      ${isAdmin ? `<div style="display:flex;gap:0.4rem;align-items:center">
        <button class="btn-secondary" style="font-size:11px;padding:4px 8px" onclick="openEditUser(${i})">✎ Editar</button>
        ${users.length > 1 ? `<button class="btn-danger" style="font-size:10px" onclick="removeUser(${i})">✕</button>` : ''}
      </div>` : ''}
    </div>`).join('');
}
function addUser() {
  const email    = document.getElementById('newUserEmail').value.trim().toLowerCase();
  const password = document.getElementById('newUserPassword').value;
  const role     = document.getElementById('newUserRole').value;
  if (!email)    { showToast('Ingresa el correo'); return; }
  if (!password) { showToast('Ingresa una contraseña'); return; }
  if (password.length < 6) { showToast('La contraseña debe tener al menos 6 caracteres'); return; }
  if (users.find(u => u.email === email)) { showToast('Este usuario ya existe'); return; }
  users.push({ email, password, role });
  saveUsers();
  auditEntry('👤', `Usuario agregado: ${email} (${role})`);
  renderUsuariosLista();
  document.getElementById('newUserEmail').value    = '';
  document.getElementById('newUserPassword').value = '';
  showToast(`Usuario ${email} agregado correctamente`);
}
function removeUser(i) {
  if (users[i].email === currentSession.email) { showToast('No puedes eliminar tu propio usuario'); return; }
  if (!confirm(`¿Eliminar acceso de ${users[i].email}?`)) return;
  auditEntry('👤', `Usuario eliminado: ${users[i].email}`);
  users.splice(i, 1);
  saveUsers();
  renderUsuariosLista();
  showToast('Usuario eliminado');
}

// --- Paralelos ---
function renderParalelosLista() {
  const cont = document.getElementById('paralelosLista');
  if (!cont) return;
  cont.innerHTML = paralelos.map((p, i) => `
    <div class="paralelo-row">
      <div>
        <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:500">Paralelo ${p.nombre}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${p.semestre}</div>
      </div>
      <div style="display:flex;gap:0.5rem;align-items:center">
        ${p.id === activeParaleloId ? '<span class="paralelo-active-badge">ACTIVO</span>' : `<button class="btn-secondary" style="font-size:11px" onclick="switchParaleloPanel('${p.id}')">Activar</button>`}
        ${paralelos.length > 1 ? `<button class="btn-danger" style="font-size:10px" onclick="removeParalelo(${i})">✕</button>` : ''}
      </div>
    </div>`).join('');
  // Prellenar campos de edición con el paralelo activo
  const activo = paralelos.find(p => p.id === activeParaleloId);
  if (activo) {
    const nInput = document.getElementById('editParaleloNombre');
    const sInput = document.getElementById('editParaleloSemestre');
    if (nInput) nInput.value = activo.nombre;
    if (sInput) sInput.value = activo.semestre;
  }
}

function saveEditParalelo() {
  const nombre = (document.getElementById('editParaleloNombre').value || '').trim().toUpperCase();
  const sem    = (document.getElementById('editParaleloSemestre').value || '').trim();
  if (!nombre || !sem) { showToast('Completa el nombre y el semestre'); return; }
  const p = paralelos.find(x => x.id === activeParaleloId);
  if (!p) { showToast('No hay paralelo activo'); return; }
  const anterior = `${p.nombre} — ${p.semestre}`;
  p.nombre   = nombre;
  p.semestre = sem;
  listadoConfig = { semestre: sem, paralelo: nombre };
  saveParalelos();
  saveData(`Paralelo modificado: ${nombre}`);
  auditEntry('✏️', `Paralelo modificado: ${anterior} → ${nombre} — ${sem}`);
  updateHeaderTitle();
  renderParalelosLista();
  renderParaleloTabs();
  showToast(`Paralelo actualizado: ${nombre} — ${sem}`);
}
function switchParaleloPanel(id) {
  activeParaleloId = id;
  const p = paralelos.find(x => x.id === id);
  if (p) listadoConfig = { semestre: p.semestre, paralelo: p.nombre };
  updateHeaderTitle();
  renderParalelosLista();
  renderParaleloTabs();
  renderAll();
  showToast(`Paralelo ${p ? p.nombre : id} activo`);
}
function addParalelo() {
  const nombre = document.getElementById('newParaleloNombre').value.trim().toUpperCase();
  const sem    = document.getElementById('newParaleloSemestre').value.trim();
  if (!nombre || !sem) { showToast('Completa nombre y semestre'); return; }
  const id = 'p_' + nombre.toLowerCase() + '_' + Date.now();
  paralelos.push({ id, nombre, semestre: sem, active: false });
  if (!studentsByParalelo[id]) studentsByParalelo[id] = [];
  saveParalelos();
  saveData(`Paralelo ${nombre} creado`);
  renderParalelosLista();
  renderParaleloTabs();
  document.getElementById('newParaleloNombre').value = '';
  document.getElementById('newParaleloSemestre').value = '';
  auditEntry('📂', `Paralelo creado: ${nombre} — ${sem}`);
  showToast(`Paralelo ${nombre} creado`);
}
function removeParalelo(i) {
  if (paralelos[i].id === activeParaleloId) { showToast('No puedes eliminar el paralelo activo'); return; }
  if (!confirm(`¿Eliminar paralelo ${paralelos[i].nombre}? Se borrarán sus estudiantes.`)) return;
  auditEntry('🗑', `Paralelo eliminado: ${paralelos[i].nombre}`);
  delete studentsByParalelo[paralelos[i].id];
  paralelos.splice(i, 1);
  saveParalelos();
  saveData();
  renderParalelosLista();
  renderParaleloTabs();
  showToast('Paralelo eliminado');
}

// --- Materias config ---
function renderMateriasConfigLista() {
  const cont = document.getElementById('materiasConfigLista');
  if (!cont) return;
  cont.innerHTML = MATERIAS.map((k, i) => `
    <div class="paralelo-row">
      <div>
        <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:500">${k.toUpperCase()}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${MATERIAS_MAP[k]}</div>
      </div>
      ${MATERIAS.length > 1 ? `<button class="btn-danger" style="font-size:10px" onclick="removeMateria('${k}')">✕</button>` : ''}
    </div>`).join('');
}
function addMateria() {
  const key  = document.getElementById('newMateriaKey').value.trim().toLowerCase().replace(/\s+/g,'');
  const name = document.getElementById('newMateriaName').value.trim();
  if (!key || !name) { showToast('Completa clave y nombre'); return; }
  if (MATERIAS_MAP[key]) { showToast('Esta clave ya existe'); return; }
  MATERIAS_MAP[key] = name;
  MATERIAS = Object.keys(MATERIAS_MAP);
  // Add key to all students
  Object.values(studentsByParalelo).forEach(arr =>
    arr.forEach(s => { if (s.materias[key] === undefined) s.materias[key] = false; })
  );
  saveMateriasConfig();
  saveData(`Materia agregada: ${name}`);
  auditEntry('📚', `Materia agregada: ${key} — ${name}`);
  renderMateriasConfigLista();
  rebuildImportMateriaSelect();
  renderAll();
  document.getElementById('newMateriaKey').value = '';
  document.getElementById('newMateriaName').value = '';
  showToast(`Materia ${name} agregada`);
}
function removeMateria(key) {
  if (!confirm(`¿Eliminar la materia "${MATERIAS_MAP[key]}"? Se perderán todos los registros de esa materia.`)) return;
  auditEntry('📚', `Materia eliminada: ${key} — ${MATERIAS_MAP[key]}`);
  delete MATERIAS_MAP[key];
  MATERIAS = Object.keys(MATERIAS_MAP);
  Object.values(studentsByParalelo).forEach(arr =>
    arr.forEach(s => { delete s.materias[key]; })
  );
  saveMateriasConfig();
  saveData();
  renderMateriasConfigLista();
  rebuildImportMateriaSelect();
  renderAll();
  showToast('Materia eliminada');
}

// ═══════════════════════════════════════════════════
//  ATAJOS DE TECLADO
// ═══════════════════════════════════════════════════
function handleSearchKey(e) {
  if (e.key === 'Enter') { openAddStudent(); }
}

document.addEventListener('keydown', e => {
  if (!currentSession) return; // solo si está logueado
  // Escape cierra modales
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    return;
  }
  // Enter en modal editar
  if (e.key === 'Enter') {
    const editModal = document.getElementById('modalEditStudent');
    if (editModal && editModal.classList.contains('open')) {
      // no si el foco está en el textarea
      if (document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault(); saveEditStudent(); return;
      }
    }
    const addModal = document.getElementById('modalAdd');
    if (addModal && addModal.classList.contains('open')) {
      if (document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault(); addStudent(); return;
      }
    }
  }
  // Login: Enter
  const loginSc = document.getElementById('loginScreen');
  if (loginSc && loginSc.style.display !== 'none' && e.key === 'Enter') {
    doLogin(); return;
  }
});

// ═══════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ═══════════════════════════════════════════════════
//  CERRAR MODALES AL CLICK FUERA
// ═══════════════════════════════════════════════════
document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
});

// ═══════════════════════════════════════════════════
//  INICIALIZACIÓN
// ═══════════════════════════════════════════════════
function init() {
  loadUsers();
  loadParalelos();
  loadMateriasConfig();
  loadData();
  loadConfig();
  loadAuditLog();
  rebuildImportMateriaSelect();

  if (checkSession()) {
    renderAll();
    loadFromFirebase();
  }
}

init();
