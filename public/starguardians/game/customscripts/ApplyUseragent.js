// Applies provided useragent to game window

navigator.__defineGetter__ = function (userAgent, param2) {
    
}
if (jsvars !== undefined && jsvars.userAgent !== undefined) {
    navigator.__defineGetter__('userAgent', function(){
        return jsvars.userAgent // customized user agent
    });

    navigator.__defineGetter__('appVersion', function(){
        return jsvars.userAgent // customized user agent
    });
}