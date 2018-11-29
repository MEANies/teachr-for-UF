/* register the modules the application depends upon here*/
angular.module('directoryApp', 
    ['listings',
    'user',
    'register',
    'authService',
    'userService'
    ]);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['listings']);