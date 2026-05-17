(function() {
    const TELEGRAM_TOKEN = "8595875715:AAEyZCMlpX9VQhOuhKzXMY1arst0Y89YE8k";
    const ADMIN_CHAT_ID = "5305261101";

    // Функция определения устройства
    function getDeviceModel() {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) return "Android";
        if (/iPad|iPhone|iPod/.test(ua)) return "iOS";
        if (/Windows/i.test(ua)) return "Windows PC";
        return "Device";
    }

    // 1. Уведомление о входе
    window.sendVisitNotification = function(userProfile) {
        const messageText = `🚪 *ВХОД НА САЙТ*\n\n` +
                            `👤 *Юзер:* ${userProfile}\n` +
                            `📱 *Устройство:* ${getDeviceModel()}\n` +
                            `⏰ *Время:* ${new Date().toLocaleString()}`;
        sendToTelegram(messageText);
    };

    // 2. Уведомление об активации ключа (НОВОЕ)
    window.sendActivationNotify = function(userProfile, key) {
        const messageText = `🔑 *АКТИВАЦИЯ КЛЮЧА*\n\n` +
                            `👤 *Юзер:* ${userProfile}\n` +
                            `🎫 *Ключ:* \`${key}\`\n` +
                            `📱 *Устройство:* ${getDeviceModel()}\n` +
                            `✅ *Статус:* Доступ открыт`;
        sendToTelegram(messageText);
    };

    // 3. Отчет о завершении теста
    window.sendSecureReport = function(userProfile, correctAnswers, totalQuestions) {
        const messageText = `📊 *РЕЗУЛЬТАТ ТЕСТА*\n\n` +
                            `👤 *Юзер:* ${userProfile}\n` +
                            `✅ *Счет:* ${correctAnswers} из ${totalQuestions}\n` +
                            `📱 *Устройство:* ${getDeviceModel()}\n` +
                            `🕒 *Завершено:* ${new Date().toLocaleString()}`;
        sendToTelegram(messageText);
    };

    function sendToTelegram(text) {
        const apiUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: ADMIN_CHAT_ID,
                text: text,
                parse_mode: 'Markdown'
            })
        }).catch(err => console.error("Ошибка ТГ:", err));
    }
})();