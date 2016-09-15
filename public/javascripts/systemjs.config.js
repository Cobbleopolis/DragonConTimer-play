/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        baseUrl: '/javascripts',
        paths: {
            // paths serve as alias
            'npm:': 'assets/lib/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'assets/javascripts/app',
            // angular bundles
            '@angular/core': 'npm:angular__core/bundles/core.umd.js',
            '@angular/common': 'npm:angular__common/bundles/common.umd.js',
            '@angular/compiler': 'npm:angular__compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:angular__platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:angular__platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:angular__http/bundles/http.umd.js',
            '@angular/router': 'npm:angular__router/bundles/router.umd.js',
            '@angular/forms': 'npm:angular__forms/bundles/forms.umd.js',
            // other libraries
            'rxjs':                       'npm:rxjs',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api'
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