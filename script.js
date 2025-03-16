// استبدال الـ Bot ID بتوكن البوت الخاص بك
const botId = '7782763042'; // Bot ID الخاص بك، قم بإدخال هذا هنا

// دالة تسجيل الدخول عبر Telegram
async function loginWithTelegram() {
    const botToken = '7782763042:AAHNKGl9Y65n4Q8JgVQbQvtlLvg_toT2MwA'; // توكن البوت
    const authUrl = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent(window.location.origin)}`;

    const authWindow = window.open(authUrl, 'tgAuth', 'width=500,height=600');

    window.addEventListener('message', (e) => {
        if (e.origin === 'https://oauth.telegram.org') {
            const userData = e.data;
            if (userData && userData.id) {
                user.address = `tg_${userData.id}`;
                user.username = userData.first_name || 'مستخدم';
                localStorage.setItem('user', JSON.stringify(user));
                showSection('mining');
                updateUI();
            } else {
                Swal.fire('خطأ!', 'فشل تسجيل الدخول عبر Telegram', 'error');
            }
        }
    });
}

// دالة الاتصال بالمحفظة
async function connectWallet() {
    try {
        if (window.ethereum) {
            // Ethereum (MetaMask)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            user.address = accounts[0];
        } else if (window.solana) {
            // Solana (Phantom)
            const provider = window.solana;
            await provider.connect();
            user.address = provider.publicKey.toString();
        } else if (window.tronWeb) {
            // Tron (TronLink)
            user.address = window.tronWeb.defaultAddress.base58;
        } else {
            Swal.fire('خطأ!', 'الرجاء تثبيت محفظة إلكترونية', 'error');
            return;
        }

        localStorage.setItem('user', JSON.stringify(user));
        showSection('mining');
        updateUI();
    } catch (error) {
        Swal.fire('خطأ!', error.message, 'error');
    }
}
