$(function () {
    $('.nav-item > a.nav-link').each(function () {
        var location = window.location.href;        
        
        var link = this.href;
        if (location == link) {
            $(this).addClass('active');
        }        
    });
});


$(function () {
    document.cookie = 'developcookie=test1;expires=Sun, 10, Jul 2025 06:00:00 GMT';
});    