// =============================================
// EcoSort App — Core JavaScript
// =============================================

// ---- State ----
let bluetoothConnected = false;
let cameraStream = null;
let notifCount = 0;
let scanHistory = JSON.parse(localStorage.getItem('ecosort_history') || '[]');
let notifications = JSON.parse(localStorage.getItem('ecosort_notifs') || '[]');
let dummyNotifInterval = null;
let scanStats = JSON.parse(localStorage.getItem('ecosort_stats') || '{"total":0,"wet":0,"dry":0,"hazardous":0}');

// Waste database for dummy detection
const wasteDB = [
    { name:'Plastic Bottle', type:'Dry Waste', bin:'Blue Bin', icon:'fa-bottle-water', color:'bg-blue-500', badgeClass:'bg-blue-100 text-blue-700', btnColor:'bg-blue-500 hover:bg-blue-600', confidence: 97 },
    { name:'Apple Core', type:'Wet Waste', bin:'Green Bin', icon:'fa-apple-alt', color:'bg-green-500', badgeClass:'bg-green-100 text-green-700', btnColor:'bg-green-500 hover:bg-green-600', confidence: 94 },
    { name:'Newspaper', type:'Dry Waste', bin:'Blue Bin', icon:'fa-newspaper', color:'bg-blue-500', badgeClass:'bg-blue-100 text-blue-700', btnColor:'bg-blue-500 hover:bg-blue-600', confidence: 99 },
    { name:'Banana Peel', type:'Wet Waste', bin:'Green Bin', icon:'fa-leaf', color:'bg-green-500', badgeClass:'bg-green-100 text-green-700', btnColor:'bg-green-500 hover:bg-green-600', confidence: 96 },
    { name:'Old Battery', type:'Hazardous', bin:'Red Bin', icon:'fa-battery-full', color:'bg-red-500', badgeClass:'bg-red-100 text-red-700', btnColor:'bg-red-500 hover:bg-red-600', confidence: 91 },
    { name:'Cardboard Box', type:'Dry Waste', bin:'Blue Bin', icon:'fa-box', color:'bg-blue-500', badgeClass:'bg-blue-100 text-blue-700', btnColor:'bg-blue-500 hover:bg-blue-600', confidence: 98 },
    { name:'Coffee Grounds', type:'Wet Waste', bin:'Green Bin', icon:'fa-mug-hot', color:'bg-green-500', badgeClass:'bg-green-100 text-green-700', btnColor:'bg-green-500 hover:bg-green-600', confidence: 92 },
    { name:'Glass Jar', type:'Dry Waste', bin:'Blue Bin', icon:'fa-wine-bottle', color:'bg-blue-500', badgeClass:'bg-blue-100 text-blue-700', btnColor:'bg-blue-500 hover:bg-blue-600', confidence: 95 },
    { name:'Vegetable Peels', type:'Wet Waste', bin:'Green Bin', icon:'fa-carrot', color:'bg-green-500', badgeClass:'bg-green-100 text-green-700', btnColor:'bg-green-500 hover:bg-green-600', confidence: 97 },
    { name:'Metal Can', type:'Dry Waste', bin:'Blue Bin', icon:'fa-trash-can', color:'bg-blue-500', badgeClass:'bg-blue-100 text-blue-700', btnColor:'bg-blue-500 hover:bg-blue-600', confidence: 93 },
    { name:'CFL Bulb', type:'Hazardous', bin:'Red Bin', icon:'fa-lightbulb', color:'bg-red-500', badgeClass:'bg-red-100 text-red-700', btnColor:'bg-red-500 hover:bg-red-600', confidence: 89 },
    { name:'E-Waste Circuit', type:'Hazardous', bin:'Red Bin', icon:'fa-microchip', color:'bg-red-500', badgeClass:'bg-red-100 text-red-700', btnColor:'bg-red-500 hover:bg-red-600', confidence: 88 },
];

const dailyTips = [
    "Recycle 1 plastic bottle = Save 100ml of oil!",
    "Composting reduces landfill waste by 30%.",
    "1 recycled aluminum can saves energy for 3 hours of TV!",
    "Paper can be recycled up to 7 times.",
    "India generates 62 million tons of waste annually.",
    "Segregating waste at source saves ₹1600 crore per year!",
    "A single glass bottle takes 4000 years to decompose.",
    "Plastic bags take 500-1000 years to decompose in landfills.",
];


// ============================
// BLUETOOTH
// ============================
function requestBluetooth() {
    const btn = document.getElementById('bt-connect-btn');
    btn.innerHTML = '<i class="fab fa-bluetooth-b mr-2"></i> Connecting<span class="connecting-dots"><span></span><span></span><span></span></span>';
    btn.classList.add('connecting');

    // Try Web Bluetooth API (will show real browser permission dialog)
    if (navigator.bluetooth) {
        navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['battery_service']
        }).then(device => {
            console.log('Bluetooth device selected:', device.name);
            simulateConnection();
        }).catch(err => {
            console.log('Bluetooth dialog closed/cancelled:', err.message);
            // Even if user cancels, we simulate connection for demo
            simulateConnection();
        });
    } else {
        // Fallback for browsers without Web Bluetooth
        setTimeout(simulateConnection, 2000);
    }
}

function skipBluetooth() {
    document.getElementById('bt-overlay').classList.add('hidden');
    setTimeout(() => document.getElementById('bt-overlay').style.display = 'none', 500);
}

function simulateConnection() {
    const btn = document.getElementById('bt-connect-btn');
    btn.innerHTML = '<i class="fas fa-check mr-2"></i> Connected!';

    setTimeout(() => {
        document.getElementById('bt-overlay').classList.add('hidden');
        setTimeout(() => document.getElementById('bt-overlay').style.display = 'none', 500);
        setBluetoothConnected(true);
    }, 1000);
}

function setBluetoothConnected(connected) {
    bluetoothConnected = connected;
    const bar = document.getElementById('bt-status-bar');
    const icon = document.getElementById('bt-bar-icon');
    const title = document.getElementById('bt-bar-title');
    const sub = document.getElementById('bt-bar-sub');
    const status = document.getElementById('bt-bar-status');
    const dot = document.getElementById('bt-dot');
    const toggle = document.getElementById('bt-toggle');

    if (connected) {
        bar.className = 'mx-4 mt-3 px-4 py-2.5 rounded-xl border flex items-center gap-3 transition-all duration-500 bg-gradient-to-r from-blue-500/10 to-green-500/10 border-green-200';
        icon.className = 'w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-sm transition-all';
        title.textContent = 'Arduino Connected';
        title.className = 'text-xs font-semibold text-gray-700';
        sub.textContent = 'Receiving data via Bluetooth';
        status.className = 'flex items-center gap-1 text-[10px] font-semibold text-green-600';
        status.innerHTML = '<span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live';
        dot.className = 'w-2 h-2 rounded-full bg-green-500 animate-pulse';
        if (toggle) toggle.checked = true;

        // Start dummy notifications
        startDummyNotifications();
        showToast('🔗 Arduino connected via Bluetooth!');
    } else {
        bar.className = 'mx-4 mt-3 px-4 py-2.5 rounded-xl border flex items-center gap-3 transition-all duration-500 bg-gray-50 border-gray-200';
        icon.className = 'w-8 h-8 rounded-lg bg-gray-400 flex items-center justify-center text-white text-sm transition-all';
        title.textContent = 'Arduino Disconnected';
        title.className = 'text-xs font-semibold text-gray-500';
        sub.textContent = 'Tap to connect via Bluetooth';
        status.className = 'flex items-center gap-1 text-[10px] font-semibold text-gray-400';
        status.innerHTML = '<span class="w-2 h-2 rounded-full bg-gray-400"></span> Offline';
        if (toggle) toggle.checked = false;

        stopDummyNotifications();
    }
}

function toggleBtSetting(el) {
    if (el.checked) {
        if (navigator.bluetooth) {
            navigator.bluetooth.requestDevice({ acceptAllDevices: true, optionalServices: ['battery_service'] })
                .then(() => setBluetoothConnected(true))
                .catch(() => setBluetoothConnected(true)); // simulate anyway
        } else {
            setBluetoothConnected(true);
        }
    } else {
        setBluetoothConnected(false);
        showToast('🔌 Arduino disconnected');
    }
}


// ============================
// NOTIFICATIONS (DUMMY FROM ARDUINO)
// ============================
function startDummyNotifications() {
    if (dummyNotifInterval) return;
    // First batch — immediate
    addDummyNotif();
    setTimeout(addDummyNotif, 3000);
    setTimeout(addDummyNotif, 7000);

    // Then every 12 seconds
    dummyNotifInterval = setInterval(addDummyNotif, 12000);
}

function stopDummyNotifications() {
    if (dummyNotifInterval) { clearInterval(dummyNotifInterval); dummyNotifInterval = null; }
}

function addDummyNotif() {
    const item = wasteDB[Math.floor(Math.random() * wasteDB.length)];
    const notif = {
        id: Date.now(),
        icon: item.icon,
        color: item.color,
        title: `${item.name} Detected`,
        desc: `Sensor identified ${item.type.toLowerCase()} via Bluetooth. Route to ${item.bin}.`,
        type: item.type,
        time: 'Just now',
        timestamp: Date.now()
    };
    notifications.unshift(notif);
    if (notifications.length > 30) notifications = notifications.slice(0, 30);
    localStorage.setItem('ecosort_notifs', JSON.stringify(notifications));
    renderNotifs();
    updateNotifBadge();
    showToast(`📡 ${item.name} detected → ${item.bin}`);
}

function renderNotifs() {
    const list = document.getElementById('notif-list');
    if (notifications.length === 0) {
        list.innerHTML = '<div class="text-center py-16 text-gray-300"><i class="fas fa-bell-slash text-3xl mb-2"></i><p class="text-xs">No notifications yet</p></div>';
        return;
    }
    list.innerHTML = notifications.map((n, i) => {
        const timeStr = getTimeAgo(n.timestamp);
        const isNew = i < 3;
        return `<div class="notif-item ${isNew ? 'new-notif' : ''}">
            <div class="w-10 h-10 rounded-xl ${n.color} flex items-center justify-center text-white flex-shrink-0"><i class="fas ${n.icon} text-sm"></i></div>
            <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start">
                    <h4 class="text-xs font-semibold truncate pr-2">${n.title}</h4>
                    <span class="text-[9px] text-gray-400 whitespace-nowrap">${timeStr}</span>
                </div>
                <p class="text-[10px] text-gray-400 mt-0.5 leading-relaxed">${n.desc}</p>
                <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${n.type==='Wet Waste'?'bg-green-100 text-green-700':n.type==='Dry Waste'?'bg-blue-100 text-blue-700':'bg-red-100 text-red-700'}">${n.type}</span>
            </div>
        </div>`;
    }).join('');
}

function clearNotifs() {
    notifications = [];
    localStorage.removeItem('ecosort_notifs');
    notifCount = 0;
    renderNotifs();
    updateNotifBadge();
}

function updateNotifBadge() {
    notifCount++;
    const badge = document.getElementById('notif-badge');
    badge.textContent = Math.min(notifCount, 99);
    badge.style.display = notifCount > 0 ? 'flex' : 'none';
}

function getTimeAgo(ts) {
    const diff = Date.now() - ts;
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return 'Just now';
    if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
    if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
    return `${Math.floor(sec / 86400)}d ago`;
}


// ============================
// CAMERA & SCAN
// ============================
async function startScan() {
    const video = document.getElementById('camera-feed');
    const placeholder = document.getElementById('camera-placeholder');
    const startBtn = document.getElementById('scan-start-btn');
    const captureBtn = document.getElementById('scan-capture-btn');
    const result = document.getElementById('scan-result');
    const overlay = document.getElementById('detection-overlay');

    result.classList.add('hidden');
    overlay.classList.add('hidden');

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
        });
        video.srcObject = cameraStream;
        video.style.display = 'block';
        placeholder.style.display = 'none';
        startBtn.classList.add('hidden');
        captureBtn.classList.remove('hidden');
        showToast('📷 Camera active — point at waste item');
    } catch (err) {
        console.log('Camera error:', err);
        // Fallback: simulate camera view
        placeholder.innerHTML = '<i class="fas fa-video text-green-400 text-4xl animate-pulse"></i><p class="text-green-400/70 text-xs mt-2">Camera simulated</p>';
        startBtn.classList.add('hidden');
        captureBtn.classList.remove('hidden');
        showToast('📷 Camera simulated for demo');
    }
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
        cameraStream = null;
    }
    const video = document.getElementById('camera-feed');
    video.srcObject = null;
    video.style.display = 'none';
    document.getElementById('camera-placeholder').style.display = 'flex';
    document.getElementById('scan-start-btn').classList.remove('hidden');
    document.getElementById('scan-capture-btn').classList.add('hidden');
    document.getElementById('scan-result').classList.add('hidden');
    document.getElementById('detection-overlay').classList.add('hidden');
}

function captureAndDetect() {
    const overlay = document.getElementById('detection-overlay');
    const label = document.getElementById('det-label');
    const result = document.getElementById('scan-result');
    const captureBtn = document.getElementById('scan-capture-btn');

    // Show detecting animation
    overlay.classList.remove('hidden');
    label.textContent = 'Analyzing...';
    captureBtn.disabled = true;
    captureBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Detecting...';
    result.classList.add('hidden');

    // Simulate processing time (like Arduino sending data)
    const processTime = 1500 + Math.random() * 1500;
    setTimeout(() => {
        const item = wasteDB[Math.floor(Math.random() * wasteDB.length)];
        label.textContent = `${item.name} — ${item.type}`;

        // Show result card
        document.getElementById('res-name').textContent = item.name;
        const badge = document.getElementById('res-badge');
        badge.textContent = item.type;
        badge.className = `px-3 py-1 text-[10px] font-bold rounded-full ${item.badgeClass}`;
        document.getElementById('res-confidence').innerHTML = `Detected with <span class="text-green-600 font-semibold">${item.confidence}%</span> confidence via Bluetooth sensor data.`;
        const actionBtn = document.getElementById('res-action-btn');
        actionBtn.className = `w-full py-3 text-white font-semibold rounded-xl text-sm transition ${item.btnColor}`;
        document.getElementById('res-action-text').textContent = `Throw in ${item.bin}`;
        result.classList.remove('hidden');

        captureBtn.disabled = false;
        captureBtn.innerHTML = '<i class="fas fa-crosshairs mr-2"></i>Detect Again';

        // Save to history
        addToHistory(item);

        // Add a notification too
        if (bluetoothConnected) {
            const notif = {
                id: Date.now(), icon: item.icon, color: item.color,
                title: `Scanned: ${item.name}`,
                desc: `Camera scan confirmed ${item.type.toLowerCase()}. Dispose in ${item.bin}.`,
                type: item.type, time: 'Just now', timestamp: Date.now()
            };
            notifications.unshift(notif);
            localStorage.setItem('ecosort_notifs', JSON.stringify(notifications));
            renderNotifs();
            updateNotifBadge();
        }

        showToast(`✅ ${item.name} → ${item.bin}`);
    }, processTime);
}

function toggleFlash() {
    showToast('⚡ Flash toggled');
}


// ============================
// SCAN HISTORY
// ============================
function addToHistory(item) {
    const entry = {
        name: item.name,
        type: item.type,
        bin: item.bin,
        icon: item.icon,
        color: item.color,
        confidence: item.confidence,
        timestamp: Date.now()
    };
    scanHistory.unshift(entry);
    if (scanHistory.length > 50) scanHistory = scanHistory.slice(0, 50);
    localStorage.setItem('ecosort_history', JSON.stringify(scanHistory));

    // Update stats
    scanStats.total++;
    if (item.type === 'Wet Waste') scanStats.wet++;
    else if (item.type === 'Dry Waste') scanStats.dry++;
    else scanStats.hazardous++;
    localStorage.setItem('ecosort_stats', JSON.stringify(scanStats));

    renderHistory();
    updateProfileStats();
}

function renderHistory() {
    const list = document.getElementById('history-list');
    if (scanHistory.length === 0) {
        list.innerHTML = '<div class="text-center py-16 text-gray-300"><i class="fas fa-history text-3xl mb-2"></i><p class="text-xs">No scans yet. Start scanning!</p></div>';
        return;
    }
    list.innerHTML = scanHistory.map(h => {
        const timeStr = getTimeAgo(h.timestamp);
        const binColor = h.type === 'Wet Waste' ? 'text-green-500' : h.type === 'Dry Waste' ? 'text-blue-500' : 'text-red-500';
        return `<div class="history-item">
            <div class="hist-icon ${h.color}"><i class="fas ${h.icon}"></i></div>
            <div class="flex-1"><h4 class="text-xs font-semibold">${h.name}</h4><p class="text-[10px] text-gray-400">${h.type} • ${timeStr}</p></div>
            <span class="text-[10px] ${binColor} font-semibold">${h.bin}</span>
        </div>`;
    }).join('');
}

function clearHistory() {
    scanHistory = [];
    scanStats = { total: 0, wet: 0, dry: 0, hazardous: 0 };
    localStorage.removeItem('ecosort_history');
    localStorage.removeItem('ecosort_stats');
    renderHistory();
    updateProfileStats();
    showToast('🗑️ History cleared');
}


// ============================
// NAVIGATION
// ============================
function goTo(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    // Special actions per screen
    if (id === 'notifications') { notifCount = 0; document.getElementById('notif-badge').style.display = 'none'; }
    if (id === 'history') renderHistory();
    if (id === 'profile') updateProfileStats();
    if (id !== 'scan') stopCamera();
}


// ============================
// EXPAND / COLLAPSE
// ============================
function toggleExpand(card) {
    const content = card.querySelector('.cat-expand');
    const arrow = card.querySelector('.expand-arrow');
    content.classList.toggle('hidden');
    if (arrow) arrow.classList.toggle('rotated');
}


// ============================
// PROFILE
// ============================
function updateProfileStats() {
    document.getElementById('stat-scans').textContent = scanStats.total;
    document.getElementById('stat-dry').textContent = scanStats.dry;
    document.getElementById('stat-wet').textContent = scanStats.wet;
}


// ============================
// DARK MODE
// ============================
function toggleDarkMode(el) {
    document.body.classList.toggle('dark-mode', el.checked);
    showToast(el.checked ? '🌙 Dark mode on' : '☀️ Light mode on');
}


// ============================
// TOAST
// ============================
function showToast(msg) {
    const phone = document.getElementById('phone');
    const toast = document.createElement('div');
    toast.className = 'toast-notif';
    toast.innerHTML = `<i class="fas fa-bell text-green-500 mr-2 flex-shrink-0"></i><span class="text-xs font-medium text-gray-700">${msg}</span>`;
    phone.appendChild(toast);
    requestAnimationFrame(() => { requestAnimationFrame(() => toast.classList.add('show')); });
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}


// ============================
// DAILY TIP ROTATION
// ============================
function rotateTip() {
    const el = document.getElementById('daily-tip-text');
    if (el) el.textContent = dailyTips[Math.floor(Math.random() * dailyTips.length)];
}
setInterval(rotateTip, 10000);


// ============================
// INIT
// ============================
window.addEventListener('DOMContentLoaded', () => {
    renderHistory();
    renderNotifs();
    updateProfileStats();
    rotateTip();
});
