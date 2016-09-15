/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        baseUrl: '/javascripts',
        paths: {
            // paths serve as alias
            'assets:': 'assets/lib/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'assets/javascripts/app',
            // angular bundles
            '@angular/core': 'assets:angular__core/bundles/core.umd.js',
            '@angular/common': 'assets:angular__common/bundles/common.umd.js',
            '@angular/compiler': 'assets:angular__compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'assets:angular__platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'assets:angular__platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'assets:angular__http/bundles/http.umd.js',
            '@angular/router': 'assets:angular__router/bundles/router.umd.js',
            '@angular/forms': 'assets:angular__forms/bundles/forms.umd.js',
            // other libraries
            'rxjs':                       'assets:rxjs',
            'angular2-in-memory-web-api': 'assets:angular2-in-memory-web-api'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);