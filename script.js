const SERVICES = [
  {id:1,name:'Engine repair / replacement',category:'Engine & transmission'},
  {id:2,name:'Transmission repair / replacement',category:'Engine & transmission'},
  {id:3,name:'Oil change & filter',category:'Maintenance & inspections'},
  {id:4,name:'Brake inspection / repair',category:'Brakes'},
  {id:5,name:'Brake pad & rotor replacement',category:'Brakes'},
  {id:6,name:'Brake caliper replacement',category:'Brakes'},
  {id:7,name:'Brake fluid flush',category:'Brakes'},
  {id:8,name:'Battery replacement',category:'Electrical & diagnostics'},
  {id:9,name:'Alternator replacement',category:'Electrical & diagnostics'},
  {id:10,name:'Starter replacement',category:'Electrical & diagnostics'},
  {id:11,name:'Radiator replacement',category:'Cooling & A/C'},
  {id:12,name:'Water pump replacement',category:'Cooling & A/C'},
  {id:13,name:'Thermostat replacement',category:'Cooling & A/C'},
  {id:14,name:'Cooling system repair',category:'Cooling & A/C'},
  {id:15,name:'A/C system diagnosis & repair',category:'Cooling & A/C'},
  {id:16,name:'A/C compressor replacement',category:'Cooling & A/C'},
  {id:17,name:'Heater repair',category:'Cooling & A/C'},
  {id:18,name:'Serpentine belt replacement',category:'Engine & transmission'},
  {id:19,name:'Timing belt / timing chain repair',category:'Engine & transmission'},
  {id:20,name:'Spark plugs replacement',category:'Engine & transmission'},
  {id:21,name:'Ignition coil replacement',category:'Electrical & diagnostics'},
  {id:22,name:'Fuel pump replacement',category:'Engine & transmission'},
  {id:23,name:'Fuel injector service / replacement',category:'Engine & transmission'},
  {id:24,name:'Air filter replacement',category:'Maintenance & inspections'},
  {id:25,name:'Cabin air filter replacement',category:'Maintenance & inspections'},
  {id:26,name:'Suspension repair',category:'Suspension & steering'},
  {id:27,name:'Strut replacement',category:'Suspension & steering'},
  {id:28,name:'Shock replacement',category:'Suspension & steering'},
  {id:29,name:'Control arm replacement',category:'Suspension & steering'},
  {id:30,name:'Ball joint replacement',category:'Suspension & steering'},
  {id:31,name:'Tie rod replacement',category:'Suspension & steering'},
  {id:32,name:'Wheel bearing replacement',category:'Suspension & steering'},
  {id:33,name:'CV axle replacement',category:'Suspension & steering'},
  {id:34,name:'Driveshaft repair',category:'Engine & transmission'},
  {id:35,name:'Differential repair',category:'Engine & transmission'},
  {id:36,name:'Steering system repair',category:'Suspension & steering'},
  {id:37,name:'Power steering repair',category:'Suspension & steering'},
  {id:38,name:'Exhaust system repair',category:'Tires, wheels & exhaust'},
  {id:39,name:'Muffler replacement',category:'Tires, wheels & exhaust'},
  {id:40,name:'Catalytic converter replacement',category:'Tires, wheels & exhaust'},
  {id:41,name:'Engine mount replacement',category:'Engine & transmission'},
  {id:42,name:'Transmission mount replacement',category:'Engine & transmission'},
  {id:43,name:'Wheel alignment',category:'Tires, wheels & exhaust'},
  {id:44,name:'Tire rotation',category:'Tires, wheels & exhaust'},
  {id:45,name:'Tire replacement',category:'Tires, wheels & exhaust'},
  {id:46,name:'TPMS diagnosis / repair',category:'Tires, wheels & exhaust'},
  {id:47,name:'Electrical diagnosis / repair',category:'Electrical & diagnostics'},
  {id:48,name:'Check-engine diagnosis',category:'Electrical & diagnostics'},
  {id:49,name:'Computer diagnostic scan',category:'Electrical & diagnostics'},
  {id:50,name:'Sensor replacement',category:'Electrical & diagnostics'},
  {id:51,name:'ADAS calibration',category:'Electrical & diagnostics'},
  {id:52,name:'Vehicle inspection',category:'Maintenance & inspections'},
  {id:53,name:'Pre-purchase inspection',category:'Maintenance & inspections'},
  {id:54,name:'Preventive maintenance service',category:'Maintenance & inspections'},
  {id:55,name:'Fluid service / flush',category:'Maintenance & inspections'},
  {id:56,name:'Road test / final inspection',category:'Maintenance & inspections'}
];

const repairList = document.getElementById('repairList');
const serviceSearch = document.getElementById('serviceSearch');
const categoryFilter = document.getElementById('categoryFilter');
const serviceCount = document.getElementById('serviceCount');
const selectedCount = document.getElementById('selectedCount');
const selectedNames = document.getElementById('selectedNames');
const selectedServicesInput = document.getElementById('selectedServicesInput');
const selected = new Set();

function renderServices() {
  const search = serviceSearch.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const visible = SERVICES.filter(service => {
    const matchesSearch = `${service.id} ${service.name} ${service.category}`.toLowerCase().includes(search);
    const matchesCategory = category === 'all' || service.category === category;
    return matchesSearch && matchesCategory;
  });
  repairList.innerHTML = visible.map(service => `
    <label class="repair-option">
      <input type="checkbox" value="${service.id}" ${selected.has(service.id) ? 'checked' : ''} aria-label="Select ${service.name}">
      <span class="job-num">${String(service.id).padStart(2, '0')}.</span>
      <span class="job-name">${service.name}</span>
    </label>`).join('');
  serviceCount.textContent = `${visible.length} service${visible.length === 1 ? '' : 's'} shown`;
  document.getElementById('repairEmpty').hidden = visible.length !== 0;
  repairList.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => {
      const id = Number(input.value);
      input.checked ? selected.add(id) : selected.delete(id);
      updateSelection();
    });
  });
}
function updateSelection() {
  const items = SERVICES.filter(service => selected.has(service.id));
  selectedCount.textContent = items.length;
  selectedNames.textContent = items.length ? items.map(service => service.name).join(', ') : 'Choose services from the list above.';
  selectedServicesInput.value = items.map(service => `${service.id}. ${service.name}`).join('\n');
}
serviceSearch.addEventListener('input', renderServices);
categoryFilter.addEventListener('change', renderServices);
document.getElementById('clearSelection').addEventListener('click', () => {
  selected.clear(); renderServices(); updateSelection();
});
document.getElementById('requestSelected').addEventListener('click', () => {
  if (!selected.size) showToast('Select at least one repair service, or use the details box below.');
});
renderServices(); updateSelection();

const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
menuToggle.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  siteNav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
}));

document.getElementById('currentYear').textContent = new Date().getFullYear();

let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
}
function formToMailto(form, subject, extraLines = []) {
  const data = new FormData(form);
  const ignored = new Set(['damagePhotos']);
  const lines = [];
  for (const [key, value] of data.entries()) {
    if (ignored.has(key) || value instanceof File || !String(value).trim()) continue;
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
    lines.push(`${label}: ${String(value).trim()}`);
  }
  lines.push(...extraLines);
  const email = 'CCC.NBW@outlook.com';
  const recipient = form.elements.email?.value?.trim();
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n\n'))}`;
  window.location.href = mailto;
  return recipient;
}

document.getElementById('repairForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const services = selectedServicesInput.value.trim() || 'No specific service selected; see additional details.';
  formToMailto(form, 'Auto Repair Estimate Request', [`Selected services:\n${services}`]);
  showToast('Your email draft is being opened. Check the details and press Send in your email app.');
});

const photoInput = document.getElementById('damagePhotos');
const photoPreview = document.getElementById('photoPreview');
const validTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
function renderPhotos() {
  photoPreview.innerHTML = '';
  Array.from(photoInput.files || []).forEach((file, index) => {
    const item = document.createElement('div'); item.className = 'photo-file';
    const name = document.createElement('span'); name.textContent = `${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`;
    const remove = document.createElement('button'); remove.type = 'button'; remove.setAttribute('aria-label', `Remove ${file.name}`); remove.textContent = '×';
    remove.addEventListener('click', () => {
      const transfer = new DataTransfer();
      Array.from(photoInput.files).forEach((selectedFile, selectedIndex) => { if (selectedIndex !== index) transfer.items.add(selectedFile); });
      photoInput.files = transfer.files; renderPhotos();
    });
    item.append(name, remove); photoPreview.append(item);
  });
}
photoInput.addEventListener('change', () => {
  const files = Array.from(photoInput.files || []);
  const invalid = files.filter(file => !validTypes.has(file.type) || !/\.(jpe?g|png|webp)$/i.test(file.name));
  if (invalid.length) {
    showToast(`Unsupported file type: ${invalid.map(file => file.name).join(', ')}. Choose JPG, PNG, or WEBP files.`);
    const transfer = new DataTransfer();
    files.filter(file => !invalid.includes(file)).forEach(file => transfer.items.add(file));
    photoInput.files = transfer.files;
  }
  renderPhotos();
});

document.getElementById('collisionForm').addEventListener('submit', event => {
  event.preventDefault();
  const files = Array.from(photoInput.files || []);
  const photoLine = files.length ? `Selected photo files (please attach these manually to the email):\n${files.map(file => `- ${file.name}`).join('\n')}` : 'No vehicle photos selected.';
  formToMailto(event.currentTarget, 'Collision Repair / Insurance Estimate Request', [photoLine]);
  const message = document.getElementById('collisionMessage');
  message.hidden = false;
  message.textContent = files.length ? 'Email draft requested. Remember to attach your selected photos before sending.' : 'Email draft requested. You can still add damage photos to your email before sending.';
  showToast('Check your email draft and attach the selected photos before sending.');
});

document.getElementById('towingForm').addEventListener('submit', event => {
  event.preventDefault();
  formToMailto(event.currentTarget, 'Towing Assistance Request');
  showToast('Your towing email draft is being opened. For urgent help, call 571-585-9377.');
});

// Optional keyboard shortcut for desktop users. On Mac use Command+K; elsewhere use Ctrl+K.
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault(); serviceSearch.focus();
  }
});
