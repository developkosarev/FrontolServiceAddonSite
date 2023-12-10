/*
var versionConfig = {
    value  : '%MDS%',
    append : {
        key: 'v',
        to : ['css', 'js'],
    }
};
*/


module.exports = {
    value  : '%MDS%',
    replaces : [
        '#{VERSION_REPlACE_MAIN_CSS}#',
        '#{VERSION_REPlACE_MAIN_JS}#',
    ]
};