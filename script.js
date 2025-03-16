let miningInterval;
let isMining = false;
let user = {
    miningActive: false,
    miningEndTime: 0,
    coins: 0,
    level: 1,
    speed: 1
};

// بدء التعدين
function startMining() {
    if (!isMining) {
        isMining = true;
        user.miningActive = true;
        user.miningEndTime = Date.now() + 4 * 60 * 60 * 1000; // 4 ساعات

        miningInterval = setInterval(() => {
            const timeLeft = user.miningEndTime - Date.now();
            if (timeLeft <= 0) {
                stopMining();
                Swal.fire('انتهى الوقت!', 'يمكنك إعادة التشغيل', 'info');
            } else {
                user.coins += user.speed;
                updateUI();
                saveUserData();
                updateTimer(timeLeft);
            }
        }, 1000);

        document.getElementById('startMiningBtn').textContent = '⛏️ جار التعدين...';
    } else {
        stopMining();
    }
}

// إيقاف التعدين
function stopMining() {
    clearInterval(miningInterval);
    isMining = false;
    user.miningActive = false;
    document.getElementById('startMiningBtn').textContent = '⚒️ بدء التعدين';
    document.getElementById('timer').textContent = '00:00:00';
}

// تحديث المؤقت
function updateTimer(timeLeft) {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('timer').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// تحديث الواجهة
function updateUI() {
    document.getElementById('coins').textContent = user.coins;
    document.getElementById('level').textContent = user.level;
    document.getElementById('speed').textContent = user.speed;
}

// حفظ بيانات المستخدم
function saveUserData() {
    localStorage.setItem('user', JSON.stringify(user));
}

// تحميل البيانات عند فتح الصفحة
window.addEventListener('load', () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        user = JSON.parse(savedUser);
        showSection('mining');
        updateUI();
    }
});
