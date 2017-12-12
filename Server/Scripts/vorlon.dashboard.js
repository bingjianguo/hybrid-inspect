"use strict";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require("fs");
var packageJson = require("../../package.json");
var vauth = require("./vorlon.authentication");
var config = require("../config/vorlon.configprovider");
var VORLON;
(function (VORLON) {
    var Dashboard = (function () {
        function Dashboard(context) {
            this.baseURLConfig = context.baseURLConfig;
            this._log = context.logger;
        }
        Dashboard.prototype.addRoutes = function (app, passport) {
            var _this = this;
            app.route(this.baseURLConfig.baseURL + '/').get(vauth.VORLON.Authentication.ensureAuthenticated, this.defaultDashboard());
            app.route(this.baseURLConfig.baseURL + '/dashboard').get(vauth.VORLON.Authentication.ensureAuthenticated, this.defaultDashboard());
            app.route(this.baseURLConfig.baseURL + '/dashboard/').get(vauth.VORLON.Authentication.ensureAuthenticated, this.defaultDashboard());
            app.route(this.baseURLConfig.baseURL + '/dashboard/:sessionid').get(vauth.VORLON.Authentication.ensureAuthenticated, this.dashboard());
            app.route(this.baseURLConfig.baseURL + '/dashboard/:sessionid/reset').get(vauth.VORLON.Authentication.ensureAuthenticated, this.dashboardServerReset());
            app.route(this.baseURLConfig.baseURL + '/dashboard/:sessionid/:clientid').get(vauth.VORLON.Authentication.ensureAuthenticated, this.dashboardWithClient());
            app.route(this.baseURLConfig.baseURL + '/config').get(vauth.VORLON.Authentication.ensureAuthenticated, this.dashboardConfig());
            //login
            app.post(this.baseURLConfig.baseURL + '/login', passport.authenticate('local', { failureRedirect: '/login',
                successRedirect: '/',
                failureFlash: false }));
            app.route(this.baseURLConfig.baseURL + '/login').get(function (req, res) {
                res.render('login', { baseURL: _this.baseURLConfig.baseURL, message: 'Please login' });
            });
            app.get(this.baseURLConfig.baseURL + '/logout', this.logout);
        };
        Dashboard.prototype.start = function (httpServer) {
            //Not implemented
        };
        //Routes
        Dashboard.prototype.defaultDashboard = function () {
            var _this = this;
            return function (req, res) {
                res.redirect(_this.baseURLConfig.baseURL + '/dashboard/default');
            };
        };
        Dashboard.prototype.dashboard = function () {
            var _this = this;
            return function (req, res) {
                var authent = false;
                var configastext = fs.readFileSync(config.VORLON.ConfigProvider.getConfigPath());
                var catalog = JSON.parse(configastext.toString().replace(/^\uFEFF/, ''));
                if (catalog.activateAuth) {
                    authent = catalog.activateAuth;
                }
                _this._log.debug("authenticated " + authent);
                res.render('dashboard', { baseURL: _this.baseURLConfig.baseURL, title: 'Dashboard', sessionid: req.params.sessionid, clientid: "", authenticated: authent, version: packageJson.version });
            };
        };
        Dashboard.prototype.dashboardWithClient = function () {
            var _this = this;
            return function (req, res) {
                res.render('dashboard', { baseURL: _this.baseURLConfig.baseURL, title: 'Dashboard', sessionid: req.params.sessionid, clientid: req.params.clientid, version: packageJson.version });
            };
        };
        Dashboard.prototype.dashboardConfig = function () {
            var _this = this;
            return function (req, res) {
                res.render('config', { baseURL: _this.baseURLConfig.baseURL, title: 'Configuration', sessionid: "default", clientid: "", version: packageJson.version });
            };
        };
        Dashboard.prototype.getsession = function (req, res) {
            return function (req, res) {
                res.render('getsession', { title: 'Get Session' });
            };
        };
        Dashboard.prototype.logout = function (req, res) {
            req.logout();
            res.redirect('/');
        };
        Dashboard.prototype.dashboardServerReset = function () {
            var _this = this;
            return function (req, res) {
                var sessionid = req.params.sessionid;
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            res.send("Done.");
                        }
                    }
                };
                xhr.open("GET", "http://" + req.headers.host + _this.baseURLConfig.baseURL + "/api/reset/" + sessionid);
                xhr.send();
            };
        };
        return Dashboard;
    }());
    VORLON.Dashboard = Dashboard;
})(VORLON = exports.VORLON || (exports.VORLON = {}));
;
