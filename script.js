// ═══════════════════════════════════════════════════
//  CONFIGURACIÓN — edita aquí semestre y paralelo
// ═══════════════════════════════════════════════════
const CONFIG_KEY    = 'listado_config_v1';
const STORAGE_KEY   = 'octavo_c2_students_v2';
const FIREBASE_URL  = 'https://firestore.googleapis.com/v1/projects/proyecto-eli-d6ce7/databases/(default)/documents/paralelos/octavo_c2';

// ═══════════════════════════════════════════════════
//  MATERIAS
// ═══════════════════════════════════════════════════
const MATERIAS = ['ia','aud','deon','prac','emp','for','prog'];
const MATERIA_NAMES = {
  ia:   'Inteligencia Artificial',
  aud:  'Auditoría de TI',
  deon: 'Deontología',
  prac: 'Prácticas Laborales 1',
  emp:  'Emprendimiento e Innovación',
  for:  'Computación Forense',
  prog: 'Programación Avanzada'
};

// ═══════════════════════════════════════════════════
//  DATOS INICIALES (del Excel 2026-04-06)
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
let students = [];
let currentFilter = 'todos';
let currentMateriaFilter = 'todos';
let saveTimeout = null;
let listadoConfig = { semestre: '8vo Semestre', paralelo: 'Paralelo C2' };

// ═══════════════════════════════════════════════════
//  UTILIDADES
// ═══════════════════════════════════════════════════
function normalizeNombre(n) {
  return n.trim().toUpperCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/,' ');
}

function emptyMaterias() {
  return { ia:false, aud:false, deon:false, prac:false, emp:false, for:false, prog:false };
}

function initStudents(raw) {
  return raw.map((s, i) => ({
    id: i,
    nombre: s.nombre,
    celular: s.celular || '',
    correo: s.correo || '',
    nuevo: false,
    materias: emptyMaterias()
  }));
}

// ═══════════════════════════════════════════════════
//  PERSISTENCIA LOCAL
// ═══════════════════════════════════════════════════
function loadConfig() {
  try {
    const c = localStorage.getItem(CONFIG_KEY);
    if (c) listadoConfig = JSON.parse(c);
  } catch(e) {}
  updateHeaderTitle();
}

function saveConfig() {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(listadoConfig));
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      students = JSON.parse(saved);
      students.forEach(s => {
        if (!s.materias) s.materias = emptyMaterias();
        if (s.correo === undefined) s.correo = '';
      });
    } else {
      students = initStudents(RAW_STUDENTS);
      saveData();
    }
  } catch(e) {
    students = initStudents(RAW_STUDENTS);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  syncFirebase();
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
            data:    { stringValue: JSON.stringify(students) },
            config:  { stringValue: JSON.stringify(listadoConfig) },
            updated: { stringValue: new Date().toISOString() }
          }
        })
      });
    } catch(e) { /* offline ok */ }
  }, 1500);
}

async function loadFromFirebase() {
  try {
    const res = await fetch(FIREBASE_URL);
    if (!res.ok) return;
    const doc = await res.json();
    if (doc.fields && doc.fields.data) {
      const parsed = JSON.parse(doc.fields.data.stringValue);
      students = parsed;
      students.forEach(s => {
        if (!s.materias) s.materias = emptyMaterias();
        if (!s.correo) s.correo = '';
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
      if (doc.fields.config) {
        listadoConfig = JSON.parse(doc.fields.config.stringValue);
        saveConfig();
        updateHeaderTitle();
      }
      renderAll();
      showToast('Datos sincronizados ☁');
    }
  } catch(e) { /* usa local */ }
}

// ═══════════════════════════════════════════════════
//  RENDER
// ═══════════════════════════════════════════════════
function renderAll() {
  renderTable();
  renderStats();
  renderMateria();
  renderWhatsApp();
  updateBulkButton();
}

function renderStats() {
  const total   = students.length;
  const conTel  = students.filter(s => s.celular).length;
  const sinTel  = total - conTel;
  const conMail = students.filter(s => s.correo).length;
  const nuevos  = students.filter(s => s.nuevo).length;
  document.getElementById('statTotal').textContent   = total;
  document.getElementById('statConTel').textContent  = conTel;
  document.getElementById('statSinTel').textContent  = sinTel;
  document.getElementById('statConMail').textContent = conMail;
  document.getElementById('statNuevos').textContent  = nuevos;
}

function getFiltered() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  return students.filter(s => {
    const matchQ = !q ||
      s.nombre.toLowerCase().includes(q) ||
      s.celular.includes(q) ||
      s.correo.toLowerCase().includes(q);
    const sinMaterias = MATERIAS.every(m => !s.materias[m]);
    const matchF = currentFilter === 'todos' ||
      (currentFilter === 'contel'      && s.celular) ||
      (currentFilter === 'sintel'      && !s.celular) ||
      (currentFilter === 'conmail'     && s.correo)   ||
      (currentFilter === 'sinmail'     && !s.correo)  ||
      (currentFilter === 'sinmaterias' && sinMaterias);
    return matchQ && matchF;
  });
}

function renderTable() {
  const filtered = getFiltered();
  const tbody = document.getElementById('tableBody');
  const empty = document.getElementById('emptyState');

  if (!filtered.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  tbody.innerHTML = filtered.map((s, i) => {
    const idx = students.indexOf(s);

    const telCell = s.celular
      ? `<span class="celular-edit" onclick="openEditStudent(${idx})">${s.celular}</span>`
      : `<span class="badge-notel" onclick="openEditStudent(${idx})" title="Clic para agregar">sin número</span>`;

    const mailCell = s.correo
      ? `<a href="mailto:${s.correo}" title="${s.correo}">${s.correo}</a>`
      : `<span class="badge-nomail">sin correo</span>`;

    const checks = MATERIAS.map(m => `
      <td class="check-cell" onclick="toggleMateria(${idx},'${m}')">
        <div class="check-icon ${s.materias[m] ? 'checked' : ''}">${s.materias[m] ? '✓' : ''}</div>
      </td>`).join('');

    return `<tr class="${s.nuevo ? 'highlight-new' : ''}">
      <td class="col-num">${i+1}</td>
      <td class="col-nombre">${s.nombre}${s.nuevo ? '<span class="badge-new">NUEVO</span>' : ''}</td>
      <td class="col-celular">${telCell}</td>
      <td class="col-correo">${mailCell}</td>
      ${checks}
      <td>
        <button class="btn-icon" style="background:rgba(45,90,61,0.12);color:var(--accent-text);border-color:rgba(45,90,61,0.2);margin-right:3px" onclick="openEditStudent(${idx})" title="Editar">✎</button>
        <button class="btn-danger" onclick="removeStudent(${idx})" title="Eliminar">✕</button>
      </td>
    </tr>`;
  }).join('');
}

// ═══════════════════════════════════════════════════
//  HEADER — cambio de nombre de listado
// ═══════════════════════════════════════════════════
function updateHeaderTitle() {
  document.getElementById('headerSemestre').textContent = listadoConfig.semestre;
  document.getElementById('headerParalelo').textContent = `— ${listadoConfig.paralelo}`;
  document.title = `${listadoConfig.semestre} ${listadoConfig.paralelo}`;
}

function openRenameModal() {
  document.getElementById('inputSemestre').value = listadoConfig.semestre;
  document.getElementById('inputParalelo').value = listadoConfig.paralelo;
  document.getElementById('modalRename').classList.add('open');
}

function closeRenameModal() {
  document.getElementById('modalRename').classList.remove('open');
}

function saveRename() {
  const sem = document.getElementById('inputSemestre').value.trim();
  const par = document.getElementById('inputParalelo').value.trim();
  if (!sem || !par) { showToast('Completa ambos campos'); return; }
  listadoConfig.semestre = sem;
  listadoConfig.paralelo = par;
  saveConfig();
  syncFirebase();
  updateHeaderTitle();
  closeRenameModal();
  showToast('Nombre del listado actualizado');
}

// ═══════════════════════════════════════════════════
//  FILTROS Y TABS
// ═══════════════════════════════════════════════════
function setFilter(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTable();
  updateBulkButton();
}

function switchTab(tab, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('view-' + tab).classList.add('active');
  if (tab === 'materias') renderMateria();
  if (tab === 'whatsapp') renderWhatsApp();
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
  students[idx].materias[mat] = !students[idx].materias[mat];
  saveData();
  renderTable();
  renderMateria();
}

// ═══════════════════════════════════════════════════
//  MODAL EDITAR ESTUDIANTE (nombre + celular + correo)
// ═══════════════════════════════════════════════════
//  VALIDACIONES
// ═══════════════════════════════════════════════════
function validarCelular(cel) {
  if (!cel) return true; // opcional
  // Acepta: solo dígitos, 7–15 caracteres, puede empezar con 593 o 09
  return /^\d{7,15}$/.test(cel);
}

function validarCorreo(correo) {
  if (!correo) return true; // opcional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarNombre(nombre) {
  if (!nombre || nombre.trim().length < 3) return false;
  // Solo letras, espacios, tildes, guiones — sin números ni símbolos
  return /^[A-ZÁÉÍÓÚÜÑ\s\-']+$/i.test(nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z\s\-']/g, ''));
}

function mostrarError(inputId, mensaje) {
  const el = document.getElementById(inputId);
  el.style.borderColor = 'var(--red)';
  el.title = mensaje;
  el.classList.add('input-error');
  setTimeout(() => {
    el.style.borderColor = '';
    el.title = '';
    el.classList.remove('input-error');
  }, 2500);
}

  const s = students[idx];
  document.getElementById('editIdx').value        = idx;
  document.getElementById('editNombreInput').value = s.nombre;
  document.getElementById('editCelularInput').value = s.celular;
  document.getElementById('editCorreoInput').value  = s.correo;
  document.getElementById('modalEditStudent').classList.add('open');
}

function closeEditStudent() {
  document.getElementById('modalEditStudent').classList.remove('open');
}

function saveEditStudent() {
  const idx  = parseInt(document.getElementById('editIdx').value);
  const nom  = document.getElementById('editNombreInput').value.trim().toUpperCase();
  const cel  = document.getElementById('editCelularInput').value.trim().replace(/\s+/g,'');
  const mail = document.getElementById('editCorreoInput').value.trim().toLowerCase();

  if (!nom || nom.length < 3) {
    mostrarError('editNombreInput', 'El nombre es obligatorio y debe tener al menos 3 letras');
    showToast('⚠ El nombre no puede estar vacío'); return;
  }
  if (!validarCelular(cel)) {
    mostrarError('editCelularInput', 'Solo dígitos, entre 7 y 15 caracteres (ej: 593967179277)');
    showToast('⚠ Número de celular inválido'); return;
  }
  if (!validarCorreo(mail)) {
    mostrarError('editCorreoInput', 'Formato de correo inválido (ej: usuario@unemi.edu.ec)');
    showToast('⚠ Correo institucional inválido'); return;
  }

  students[idx].nombre  = nom;
  students[idx].celular = cel;
  students[idx].correo  = mail;
  saveData();
  renderAll();
  closeEditStudent();
  showToast('Datos actualizados');
}

// ═══════════════════════════════════════════════════
//  MODAL AGREGAR ESTUDIANTE
// ═══════════════════════════════════════════════════
function openAddStudent() {
  document.getElementById('addNombre').value  = '';
  document.getElementById('addCelular').value = '';
  document.getElementById('addCorreo').value  = '';
  document.getElementById('modalAdd').classList.add('open');
}

function closeAddStudent() {
  document.getElementById('modalAdd').classList.remove('open');
}

function addStudent() {
  const nombre  = document.getElementById('addNombre').value.trim().toUpperCase();
  const celular = document.getElementById('addCelular').value.trim().replace(/\s+/g,'');
  const correo  = document.getElementById('addCorreo').value.trim().toLowerCase();

  if (!nombre || nombre.length < 3) {
    mostrarError('addNombre', 'El nombre es obligatorio');
    showToast('⚠ Ingresa el nombre del estudiante'); return;
  }
  if (!validarCelular(celular)) {
    mostrarError('addCelular', 'Solo dígitos, entre 7 y 15 caracteres (ej: 593967179277)');
    showToast('⚠ Número de celular inválido'); return;
  }
  if (!validarCorreo(correo)) {
    mostrarError('addCorreo', 'Formato de correo inválido (ej: usuario@unemi.edu.ec)');
    showToast('⚠ Correo institucional inválido'); return;
  }

  const exists = students.find(s => normalizeNombre(s.nombre) === normalizeNombre(nombre));
  if (exists) { showToast('⚠ Este estudiante ya existe en el listado'); return; }

  students.push({
    id: Date.now(),
    nombre,
    celular,
    correo,
    nuevo: true,
    materias: emptyMaterias()
  });

  saveData();
  renderAll();
  closeAddStudent();
  showToast(`✓ ${nombre} agregado al listado`);
}

// ═══════════════════════════════════════════════════
//  ELIMINAR ESTUDIANTE
// ═══════════════════════════════════════════════════
function removeStudent(idx) {
  const s = students[idx];
  if (!confirm(`¿Eliminar a ${s.nombre} del listado?\nEsta acción no se puede deshacer.`)) return;
  students.splice(idx, 1);
  saveData();
  renderAll();
  updateBulkButton();
  showToast('Estudiante eliminado');
}

function updateBulkButton() {
  const btn = document.getElementById('btnBulkDelete');
  const count = document.getElementById('bulkCount');
  if (!btn) return;
  const filtered = getFiltered();
  if (currentFilter === 'sinmaterias' && filtered.length > 0) {
    btn.style.display = 'inline-flex';
    count.textContent = filtered.length;
  } else {
    btn.style.display = 'none';
  }
}

function bulkDelete() {
  const filtered = getFiltered();
  if (!filtered.length) return;
  const nombres = filtered.slice(0, 5).map(s => '• ' + s.nombre).join('\n');
  const extra = filtered.length > 5 ? `\n  ...y ${filtered.length - 5} más` : '';
  if (!confirm(`⚠ ¿Eliminar ${filtered.length} estudiante(s) sin ninguna materia registrada?\n\n${nombres}${extra}\n\nEsta acción NO se puede deshacer.`)) return;
  const idsToDelete = new Set(filtered.map(s => s.id));
  students = students.filter(s => !idsToDelete.has(s.id));
  saveData();
  currentFilter = 'todos';
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn').classList.add('active');
  renderAll();
  updateBulkButton();
  showToast(`${idsToDelete.size} estudiante(s) eliminados del listado`);
}

// ═══════════════════════════════════════════════════
//  VISTA MATERIAS
// ═══════════════════════════════════════════════════
function renderMateria() {
  const cont = document.getElementById('materiaContent');
  const mat  = currentMateriaFilter;

  if (mat === 'todos') {
    cont.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:1rem">` +
      MATERIAS.map(m => {
        const list = students.filter(s => s.materias[m]);
        return `<div style="background:var(--surface);border-radius:10px;border:1px solid var(--border);padding:1.25rem">
          <div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;color:var(--text3);margin-bottom:4px;font-family:'IBM Plex Mono',monospace">${m.toUpperCase()}</div>
          <div style="font-size:13px;font-weight:500;margin-bottom:0.6rem;color:var(--text)">${MATERIA_NAMES[m]}</div>
          <div style="font-size:11.5px;font-family:'IBM Plex Mono',monospace;color:var(--accent);font-weight:500;margin-bottom:0.5rem">${list.length} estudiantes</div>
          <div style="font-size:11px;line-height:2;color:var(--text)">
            ${list.length ? list.map(s => `• ${s.nombre}`).join('<br>') : '<span style="color:var(--text3);font-size:11px">Ninguno registrado aún</span>'}
          </div>
        </div>`;
      }).join('') + `</div>`;
  } else {
    const list = students.filter(s => s.materias[mat]);
    cont.innerHTML = `<div style="background:var(--surface);border-radius:10px;border:1px solid var(--border);padding:1.5rem">
      <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:1rem">
        <div>
          <div style="font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;color:var(--text3);font-family:'IBM Plex Mono',monospace;margin-bottom:4px">${mat.toUpperCase()}</div>
          <div style="font-size:1.05rem;font-weight:500">${MATERIA_NAMES[mat]}</div>
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
  const conTel = students.filter(s => s.celular);
  const sinTel = students.filter(s => !s.celular);

  document.getElementById('waComList').innerHTML =
    conTel.map((s,i) => `<div style="margin-bottom:4px">${i+1}. ${s.nombre}<br>
      <span style="color:var(--text3);font-size:10px;margin-left:16px;font-family:'IBM Plex Mono',monospace">${s.celular}</span>
    </div>`).join('');

  document.getElementById('waSinList').innerHTML =
    sinTel.map((s,i) => `<div style="margin-bottom:3px">${i+1}. ${s.nombre}</div>`).join('');
}

// ═══════════════════════════════════════════════════
//  IMPORT TXT
// ═══════════════════════════════════════════════════
function openImport() { document.getElementById('modalImport').classList.add('open'); }

function closeImport() {
  document.getElementById('modalImport').classList.remove('open');
  document.getElementById('importText').value = '';
  document.getElementById('importResult').classList.remove('show');
}

// Convierte formato SGA "NOMBRES APELLIDOS" → "APELLIDOS NOMBRES"
// El SGA da 2 nombres + 2 apellidos: las últimas 2 palabras son los apellidos.
// Ej: "NICOLAS ARNALDO AGUILAR BAJAÑA" → "AGUILAR BAJAÑA NICOLAS ARNALDO"
function sgaNombreToApellidosNombre(fullName) {
  const parts = fullName.trim().toUpperCase().split(/\s+/);
  if (parts.length < 3) return parts.join(' ');
  const apellidos = parts.slice(-2);
  const nombres   = parts.slice(0, -2);
  return [...apellidos, ...nombres].join(' ');
}

// Detecta si una línea viene del SGA: empieza con cédula/número separado por tab o espacios
// Formato: "0956402895\tNICOLAS ARNALDO AGUILAR BAJAÑA"
function parseSgaLine(line) {
  const tabParts = line.split('\t').map(p => p.trim()).filter(p => p.length > 0);
  if (tabParts.length >= 2 && /^\d{8,13}$/.test(tabParts[0])) {
    return { cedula: tabParts[0], rawNombre: tabParts.slice(1).join(' ') };
  }
  const spaceParts = line.trim().split(/\s+/);
  if (spaceParts.length >= 3 && /^\d{8,13}$/.test(spaceParts[0])) {
    return { cedula: spaceParts[0], rawNombre: spaceParts.slice(1).join(' ') };
  }
  return null;
}

function processImport() {
  const mat  = document.getElementById('importMateria').value;
  const text = document.getElementById('importText').value;
  if (!text.trim()) { showToast('Pega el contenido del TXT primero'); return; }

  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 3);
  let matched = 0, newAdded = 0, alreadyHad = 0, sgaDetected = 0;

  lines.forEach(line => {
    const sgaParsed = parseSgaLine(line);
    let nombreFinal;

    if (sgaParsed) {
      sgaDetected++;
      nombreFinal = sgaNombreToApellidosNombre(sgaParsed.rawNombre);
    } else {
      nombreFinal = line.trim().toUpperCase();
    }

    const normalized = normalizeNombre(nombreFinal);

    const found = students.find(s =>
      normalizeNombre(s.nombre) === normalized ||
      normalizeNombre(s.nombre).includes(normalized.slice(0,10)) ||
      normalized.includes(normalizeNombre(s.nombre).slice(0,10))
    );

    if (found) {
      if (!found.materias[mat]) { found.materias[mat] = true; matched++; }
      else alreadyHad++;
    } else {
      students.push({
        id: Date.now() + Math.random(),
        nombre: nombreFinal,
        celular: sgaParsed ? sgaParsed.cedula : '',
        correo: '',
        nuevo: true,
        materias: { ...emptyMaterias(), [mat]: true }
      });
      newAdded++;
    }
  });

  saveData();
  renderAll();

  const sgaNote = sgaDetected > 0
    ? `• Formato SGA detectado (${sgaDetected} líneas reordenadas)\n`
    : '';

  const res = document.getElementById('importResult');
  res.textContent =
    `✓ Proceso completado — ${MATERIA_NAMES[mat]}\n\n` +
    sgaNote +
    `• ${matched} marcados en esta materia\n` +
    `• ${newAdded} nuevos agregados\n` +
    `• ${alreadyHad} ya estaban registrados\n` +
    `• ${lines.length} líneas procesadas`;
  res.classList.add('show');
  showToast(`Importación completada — ${matched + newAdded} actualizados`);
}

// ═══════════════════════════════════════════════════
//  EXPORTAR CSV (con correo)
// ═══════════════════════════════════════════════════
function exportCSV() {
  const header = ['#','Nombre','Celular','Correo','IA','Auditoría TI','Deontología','Prácticas Lab.','Emprendimiento','Cómputo Forense','Prog. Avanzada'];
  const rows = students.map((s, i) => [
    i+1, s.nombre, s.celular, s.correo,
    ...MATERIAS.map(m => s.materias[m] ? 'X' : '')
  ]);
  const csv = [header, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF'+csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const sem  = listadoConfig.semestre.replace(/\s+/g,'_');
  const par  = listadoConfig.paralelo.replace(/\s+/g,'_');
  a.href = url;
  a.download = `listado_${sem}_${par}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('CSV exportado con correos');
}

function exportExcel() {
  if (typeof XLSX === 'undefined') {
    showToast('Error: librería Excel no cargada. Verifica tu conexión a internet.');
    return;
  }

  const sem = listadoConfig.semestre;
  const par = listadoConfig.paralelo;
  const wb  = XLSX.utils.book_new();

  // ── Hoja 1: Listado completo ──────────────────────
  const headerRow = ['#','Apellidos y Nombres','Celular','Correo Institucional',
    'IA','Auditoría TI','Deontología','Prácticas Lab.','Emprendimiento','Cómputo Forense','Prog. Avanzada'];

  const dataRows = students.map((s, i) => [
    i + 1,
    s.nombre,
    s.celular || '',
    s.correo  || '',
    ...MATERIAS.map(m => s.materias[m] ? '✓' : '')
  ]);

  const wsData = [headerRow, ...dataRows];
  const ws1 = XLSX.utils.aoa_to_sheet(wsData);

  // Ancho de columnas
  ws1['!cols'] = [
    { wch: 4 },   // #
    { wch: 40 },  // Nombre
    { wch: 16 },  // Celular
    { wch: 32 },  // Correo
    { wch: 6 }, { wch: 13 }, { wch: 13 },
    { wch: 14 }, { wch: 16 }, { wch: 16 }, { wch: 16 }
  ];

  XLSX.utils.book_append_sheet(wb, ws1, 'Listado');

  // ── Hoja 2: Resumen por materia ───────────────────
  const resumenRows = [['Materia', 'Registrados', 'Sin registrar', 'Total']];
  MATERIAS.forEach(m => {
    const con = students.filter(s => s.materias[m]).length;
    const sin = students.length - con;
    resumenRows.push([MATERIA_NAMES[m], con, sin, students.length]);
  });
  const ws2 = XLSX.utils.aoa_to_sheet(resumenRows);
  ws2['!cols'] = [{ wch: 28 }, { wch: 14 }, { wch: 14 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(wb, ws2, 'Resumen por Materia');

  // ── Hoja 3: Sin ninguna materia ───────────────────
  const sinMaterias = students.filter(s => MATERIAS.every(m => !s.materias[m]));
  const ws3Data = [
    ['# ', 'Apellidos y Nombres', 'Celular', 'Correo'],
    ...sinMaterias.map((s, i) => [i + 1, s.nombre, s.celular || '', s.correo || ''])
  ];
  const ws3 = XLSX.utils.aoa_to_sheet(ws3Data);
  ws3['!cols'] = [{ wch: 4 }, { wch: 40 }, { wch: 16 }, { wch: 32 }];
  XLSX.utils.book_append_sheet(wb, ws3, 'Sin Materias');

  // ── Descargar ─────────────────────────────────────
  const filename = `listado_${sem}_${par}.xlsx`.replace(/\s+/g, '_');
  XLSX.writeFile(wb, filename);
  showToast(`Excel exportado: ${students.length} estudiantes en 3 hojas`);
}


// ═══════════════════════════════════════════════════
//  COPIAR NÚMEROS
// ═══════════════════════════════════════════════════
function copyNumbers() {
  const nums = students.filter(s => s.celular).map(s => s.celular).join('\n');
  navigator.clipboard.writeText(nums).then(() => showToast('Números copiados al portapapeles'));
}

function copyNumbersWA() {
  const nums = students.filter(s => s.celular)
    .map(s => `+${s.celular} ${s.nombre}`).join('\n');
  navigator.clipboard.writeText(nums).then(() => showToast('Lista copiada con formato WhatsApp'));
}

// ═══════════════════════════════════════════════════
//  COPIAR CORREOS
// ═══════════════════════════════════════════════════
function copyEmails() {
  const mails = students.filter(s => s.correo).map(s => s.correo).join(';');
  navigator.clipboard.writeText(mails).then(() => showToast(`${students.filter(s=>s.correo).length} correos copiados (separados por ;)`));
}

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
//  CERRAR MODALES AL HACER CLIC EN EL OVERLAY
// ═══════════════════════════════════════════════════
document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
});

// ═══════════════════════════════════════════════════
//  INICIALIZACIÓN
// ═══════════════════════════════════════════════════
loadConfig();
loadData();
renderAll();
loadFromFirebase();
