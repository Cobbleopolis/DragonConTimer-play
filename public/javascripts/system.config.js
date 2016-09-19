(function (global) {
    System.defaultJSExtensions = true;
    SystemJS.config({
        baseUrl: '/assets/javascripts',
        meta: {
            '/assets/javascripts/*': {
                format: 'cjs',
                defaultExtension: 'js'
            }
        }
    });

})(this);