const tg = window.Telegram.WebApp;

export function useTg() {
    const onClose = () => {
        tg.close()
    }

    const onMainButton = () => {
        tg.MainButton.show()
    }

return {
    tg,
    onClose,
    onMainButton
    }
}