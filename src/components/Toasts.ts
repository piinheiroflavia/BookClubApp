export function toast(message: string, duration = 2000) {
    // Verifica se o DOM está pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createToast(message, duration);
        });
    } else {
        createToast(message, duration);
    }
}

function createToast(message: string, duration: number) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = duration;

    // Verifica se document.body não é nulo antes de adicionar o toast
    if (document.body) {
        document.body.appendChild(toast);
        toast.present();
    } else {
        console.error("document.body is null. Can't append toast.");
    }
}
