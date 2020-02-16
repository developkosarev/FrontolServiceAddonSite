$(document).ready(function () {
    $('.nav-item > a.nav-link').each(function () {
        var location = window.location.href;        
        
        var link = this.href;
        if (location == link) {
            $(this).addClass('active');
        }        
    });
});