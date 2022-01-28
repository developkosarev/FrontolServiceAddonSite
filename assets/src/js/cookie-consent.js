window.addEventListener('DOMContentLoaded', () => {        
    const cookieStorage = {
        getItem: (key) => {
            const cookies = document.cookie
                                .split(';')
                                .map(cookie => cookie.split('='))
                                .reduce((acc, [key, value]) => ({...acc, [key.trim()] : value}), {});

            return cookies[key];
        },
        setItem: (key, value) => {
            document.cookie = `${key}=${value};expires=Sun, 10 Jul 2030 06:23:41 GMT`;
        }
    };

    const storageType = cookieStorage;
    const consentPropertyType = 'site_consent';

    const hasConsented = () => storageType.getItem(consentPropertyType) === "true" ? true : false;
    const toggleStorage = (prop) => storageType.setItem(consentPropertyType, prop);

    const popup = document.querySelector('.cookie-consent'),
          btnConfirm = document.querySelector('[data-confirm]');
          //btnCancel = document.querySelector('[data-cancel]');

    if (hasConsented()) {
        console.log('Loading...');
    } else {
        popup.classList.add('popup_active');
    }

    btnConfirm.addEventListener('click', () => {
        toggleStorage(true);
        popup.classList.remove('popup_active');
        console.log('Loading...');

        gtag("consent", "update", {
        	ad_storage: "denied",
        	analytics_storage: "denied",
        	facebook: "denied",
        	wait_for_update: 2000 // milliseconds
        });
    });

    //btnCancel.addEventListener('click', () => {
    //    toggleStorage(false);
    //    popup.classList.remove('popup_active');
    //});    
});