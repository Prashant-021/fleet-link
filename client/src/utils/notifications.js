
let notificationApi = null;

export const initNotification = (api) => {
    notificationApi = api;
};

export const showNotification = (type, message, description, placement = "topRight") => {
    if (!notificationApi) {
        console.warn("Notification API not initialized. Did you forget to call initNotification?");
        return;
    }

    notificationApi[type]({
        message,
        description,
        placement,
    });
};
