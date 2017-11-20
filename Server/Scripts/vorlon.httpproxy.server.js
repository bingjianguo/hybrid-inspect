"use strict";
var express = require("express");
var http = require("http");
var https = require('https');
var url = require("url");
var zlib = require("zlib");
var color = require('colorful');
var cookieParser = require('cookie-parser');
var colors = require("colors");
var httpProxy = require("http-proxy");
var VORLON;
(function (VORLON) {
    var HttpProxy = (function () {
        function HttpProxy(context, startProxyOnly) {
            if (startProxyOnly === void 0) { startProxyOnly = false; }
            this._proxy = null;
            this._fetchproxy = null;
            this._server = null;
            this._proxyCookieName = "vorlonProxyTarget";
            this._proxySessionCookieName = "vorlonProxySession";
            this._vorlonScript = "vorlon.max.js";
            this._passport = require("passport");
            this._startProxyOnly = false;
            this._startProxyOnly = startProxyOnly;
            this.baseURLConfig = context.baseURLConfig;
            this.httpConfig = context.httpConfig;
            this._log = context.logger;
            this._proxy = httpProxy.createProxyServer({});
            this._fetchproxy = httpProxy.createProxyServer({});
        }
        HttpProxy.prototype.insertVorlonScript = function (str, uri, _script, vorlonsessionid) {
            var position = str.indexOf("<head");
            if (position > 0) {
                var closing = str.indexOf(">", position) + 1;
                this._log.debug("PROXY Injert vorlon script in website with SESSIONID " + vorlonsessionid);
                var beforehead = str.substr(0, closing);
                var afterhead = str.substr(closing);
                str = beforehead + " " + _script + afterhead;
            }
            return str;
        };
        HttpProxy.prototype.start = function () {
            if (this._startProxyOnly) {
                this.addRoutes(express(), this._passport);
            }
        };
        HttpProxy.prototype.addRoutes = function (app, passport) {
            if (!this._startProxyOnly) {
                app.get(this.baseURLConfig.baseURL + "/httpproxy/fetch", this.fetchFile());
                app.get(this.baseURLConfig.baseURL + "/browserspecificcontent", this.browserSpecificContent());
                if (!this.httpConfig.enableWebproxy) {
                    //the proxy is disabled, look at config.json to enable webproxy
                    return;
                }
                app.get(this.baseURLConfig.baseURL + "/httpproxy", this.home());
                app.get(this.baseURLConfig.baseURL + "/httpproxy/inject", this.inject());
            }
            this.startProxyServer();
        };
        HttpProxy.prototype.startProxyServer = function () {
            var _this = this;
            this._server = express();
            this._server.set('host', this.httpConfig.proxyHost);
            if (this.httpConfig.proxyEnvPort)
                this._server.set('port', process.env.PORT);
            else
                this._server.set('port', this.httpConfig.proxyPort);
            this._server.use(cookieParser());
            this._server.use(this.baseURLConfig.baseProxyURL + "/vorlonproxy/root.html", this.proxyForTarget());
            this._server.use(this.baseURLConfig.baseProxyURL + "/vorlonproxy/*", this.proxyForRelativePath());
            this._server.use(this.baseURLConfig.baseProxyURL + "/", this.proxyForRootDomain());
            // http.createServer(this._server).listen(this.httpConfig.proxyPort, () => {
            //     console.log("Vorlon.js proxy started on port " + this.httpConfig.proxyPort);
            // });            
            if (this.httpConfig.useSSL) {
                https.createServer(this.httpConfig.options, this._server).listen(this._server.get('port'), this._server.get('host'), undefined, function () {
                    _this._log.info('Vorlon.js PROXY with SSL listening at ' + _this._server.get('host') + ':' + _this._server.get('port'));
                });
            }
            else {
                http.createServer(this._server).listen(this._server.get('port'), this._server.get('host'), undefined, function () {
                    _this._log.info('Vorlon.js PROXY listening at ' + _this._server.get('host') + ':' + _this._server.get('port'));
                });
            }
            this._proxy.on("error", this.proxyError.bind(this));
            this._proxy.on("proxyRes", this.proxyResult.bind(this));
            this._proxy.on("proxyReq", this.proxyRequest.bind(this));
            this._fetchproxy.on("proxyReq", this.proxyFetchRequest.bind(this));
            this._fetchproxy.on("proxyRes", this.proxyFetchResult.bind(this));
        };
        HttpProxy.prototype.vorlonClientFileUrl = function () {
            var scriptUrl = "http://localhost:" + this.httpConfig.port + "/" + this._vorlonScript;
            console.log('---- ' + JSON.stringify(this.httpConfig));
            if (this.httpConfig.vorlonServerURL) {
                scriptUrl = this.httpConfig.vorlonServerURL + "/" + this._vorlonScript;
            }
            return scriptUrl;
        };
        HttpProxy.prototype.browserSpecificContent = function () {
            var _this = this;
            return function (req, res) {
                var userAgent = req.headers["user-agent"];
                var reply = function (browsername) {
                    res.write('<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><title>Vorlon.js - Test page</title><script src="' + _this.vorlonClientFileUrl() + '"></script></head><body><div>This is content for ' + browsername + '</div><div> ' + userAgent + '</div></body></html>');
                    res.end();
                };
                if (userAgent == "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36") {
                    reply("Google Chrome");
                }
                else if (userAgent == "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240") {
                    reply("Microsoft Edge");
                }
                else if (userAgent == "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko") {
                    reply("IE 11");
                }
                else {
                    reply("Others");
                }
            };
        };
        HttpProxy.prototype.fetchFile = function () {
            var _this = this;
            return function (req, res) {
                var targetProxyUrl = req.query.fetchurl;
                _this._log.debug("FETCH DOCUMENT " + targetProxyUrl);
                var opt = {
                    target: targetProxyUrl,
                    changeOrigin: true
                };
                res.setHeader("Content-Type", "text/plain");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');
                _this._fetchproxy.web(req, res, opt);
            };
        };
        HttpProxy.prototype.proxyFetchRequest = function (proxyReq, req, res, opt) {
            var e = proxyReq;
            proxyReq.path = req.query.fetchurl;
            if (req.query.fetchuseragent) {
                proxyReq._headers["user-agent"] = req.query.fetchuseragent;
                this._log.debug("FETCH ISSUING UA REQUEST TO " + proxyReq.path);
            }
            else {
                this._log.debug("FETCH ISSUING REQUEST TO " + proxyReq.path);
            }
        };
        HttpProxy.prototype.proxyFetchResult = function (proxyRes, req, res) {
            var writeHead = res.writeHead;
            var encoding = proxyRes.headers["content-encoding"] || "none";
            res.writeHead = function () {
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.header('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range, X-VorlonProxyEncoding');
                res.header('Expires', '-1');
                res.header('Pragma', 'no-cache');
                var encoding = proxyRes.headers["content-encoding"] || "none";
                res.header('X-VorlonProxyEncoding', encoding);
                writeHead.apply(res, arguments);
            };
        };
        //Routes
        HttpProxy.prototype.proxyForRelativePath = function () {
            var _this = this;
            return function (req, res) {
                //disable accept-encoding
                //req.headers["accept-encoding"] = "";
                res.setHeader("Content-Type", "text/plain");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');
                var cookieUrl = req.cookies[_this._proxyCookieName];
                var targetProxyUrl = req.baseUrl.substr("/vorlonproxy/".length);
                // var idx = targetProxyUrl.lastIndexOf('/');
                // if (idx > -1){
                //     targetProxyUrl = targetProxyUrl.substr(0, idx+1);
                // }else{
                //     targetProxyUrl = "";
                // }
                if (cookieUrl) {
                    var uri = url.parse(cookieUrl);
                    var target = uri.href;
                    if (targetProxyUrl) {
                        if (target[target.length - 1] != '/')
                            target = target + '/';
                        target = target + targetProxyUrl;
                    }
                    _this._log.debug("PROXY RELATIVE REQUEST from target " + target + " for " + req.baseUrl);
                    var opt = {
                        target: target,
                        changeOrigin: true
                    };
                    if (target.indexOf("https:") === 0) {
                        opt.secure = true;
                    }
                    _this._proxy.web(req, res, opt);
                }
                else {
                    _this._log.warn("PROXY RELATIVE REQUEST but no target for " + req.baseUrl);
                }
            };
        };
        HttpProxy.prototype.proxyForTarget = function () {
            var _this = this;
            return function (req, res) {
                //disable accept-encoding
                //req.headers["accept-encoding"] = "";
                res.setHeader("Content-Type", "text/plain");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');
                var targetProxyUrl = req.query.vorlonproxytarget;
                if (!targetProxyUrl) {
                    targetProxyUrl = req.cookies[_this._proxyCookieName];
                }
                if (targetProxyUrl) {
                    _this._log.info("PROXY REQUEST from target " + targetProxyUrl + " for " + req.baseUrl);
                    var opt = {
                        target: targetProxyUrl,
                        changeOrigin: true
                    };
                    if (targetProxyUrl.indexOf("https:") === 0) {
                        opt.secure = true;
                    }
                    _this._proxy.web(req, res, opt);
                }
                else {
                    _this._log.warn("PROXY REQUEST but no target" + " for " + req.baseUrl);
                }
            };
        };
        HttpProxy.prototype.proxyForRootDomain = function () {
            var _this = this;
            return function (req, res) {
                //disable accept-encoding
                //req.headers["accept-encoding"] = "";
                res.setHeader("Content-Type", "text/plain");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');
                var cookieUrl = req.cookies[_this._proxyCookieName];
                if (cookieUrl) {
                    var uri = url.parse(cookieUrl);
                    var target = uri.protocol + "//" + uri.hostname;
                    _this._log.debug("PROXY REQUEST for root http domain " + target);
                    var opt = {
                        target: target,
                        changeOrigin: true
                    };
                    if (target.indexOf("https:") === 0) {
                        opt.secure = true;
                    }
                    _this._proxy.web(req, res, opt);
                }
                else {
                    _this._log.warn("PROXY REQUEST from root but no cookie...");
                }
            };
        };
        HttpProxy.prototype.home = function () {
            var _this = this;
            return function (req, res) {
                res.render('httpproxy', { baseURL: _this.baseURLConfig.baseURL });
            };
        };
        HttpProxy.prototype.inject = function () {
            var _this = this;
            return function (req, res) {
                var uri = url.parse(req.query.url);
                //res.cookie(this._proxyCookieName, uri.protocol + "//" + uri.hostname);
                _this._log.debug("PROXY request for  " + uri.hostname + " to port " + _this.httpConfig.proxyPort);
                var rootUrl = "http://localhost:" + _this.httpConfig.proxyPort;
                if (_this.httpConfig.vorlonProxyURL) {
                    rootUrl = _this.httpConfig.vorlonProxyURL;
                }
                var sessionid = _this.vorlonSessionIdFor(uri.protocol + "//" + uri.hostname);
                res.end(JSON.stringify({ url: rootUrl + "/vorlonproxy/root.html?vorlonproxytarget=" + encodeURIComponent(req.query.url) + "&vorlonsessionid=" + sessionid, session: sessionid }));
            };
        };
        HttpProxy.prototype.vorlonSessionIdFor = function (targeturl, req) {
            if (req && req.query.vorlonsessionid) {
                return req.query.vorlonsessionid;
            }
            else if (req && req.cookies[this._proxySessionCookieName]) {
                return req.cookies[this._proxySessionCookieName];
            }
            var uri = url.parse(targeturl);
            var pat = /^(https?:\/\/)?(?:www\.)?([^\/]+)/;
            var match = uri.href.match(pat);
            var vorlonsessionid = match[2].replace(".", "");
            return vorlonsessionid;
        };
        //Events HttpProxy
        HttpProxy.prototype.proxyError = function (error, req, res) {
            var json;
            this._log.debug("proxy error", error);
            if (!res.headersSent) {
                res.writeHead(500, { "content-type": "application/json" });
            }
            json = { error: "proxy_error", reason: error.message };
            res.end(JSON.stringify(json));
        };
        HttpProxy.prototype.proxyRequest = function (proxyReq, req, res, opt) {
            var e = proxyReq;
            if (proxyReq.path[proxyReq.path.length - 1] == "/") {
                proxyReq.path = proxyReq.path.substr(0, proxyReq.path.length - 1);
            }
            this._log.debug("PROXY ISSUING REQUEST TO " + proxyReq.path);
        };
        HttpProxy.prototype.proxyResult = function (proxyRes, req, res) {
            var _proxy = this;
            var chunks, end = res.end, writeHead = res.writeHead, write = res.write;
            var targetProxyUrl = req.query.vorlonproxytarget;
            if (!targetProxyUrl) {
                targetProxyUrl = req.cookies[this._proxyCookieName];
            }
            var cspHeader = proxyRes.headers["content-security-policy"];
            //TODO : manage content-security-policy header for script, ...
            if (proxyRes.statusCode >= 300) {
                this._log.warn("PROXY received status " + proxyRes.statusCode + " " + proxyRes.statusMessage);
                this._log.warn(proxyRes.req._header);
            }
            if (req.query.vorlonproxytarget && proxyRes.statusCode >= 300 && proxyRes.statusCode < 400) {
                return this.proxyResultForRedirection(targetProxyUrl, proxyRes, req, res);
            }
            this._log.debug("PROXY content type " + proxyRes.headers["content-type"]);
            if (targetProxyUrl && proxyRes.headers && proxyRes.headers["content-type"] && proxyRes.headers["content-type"].match("text/html")) {
                return this.proxyResultForPageContent(targetProxyUrl, proxyRes, req, res);
            }
            else {
                var encoding = proxyRes.headers["content-encoding"];
                res.writeHead = function () {
                    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                    res.header('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');
                    res.header('Expires', '-1');
                    res.header('Pragma', 'no-cache');
                    res.header("content-security-policy", "");
                    res.header("content-security-policy", "");
                    res.header('X-VorlonProxyEncoding', encoding || "none");
                    writeHead.apply(res, arguments);
                };
            }
        };
        HttpProxy.prototype.proxyResultForRedirection = function (targetProxyUrl, proxyRes, req, res) {
            var _proxy = this;
            var chunks, end = res.end, writeHead = res.writeHead, write = res.write;
            res.writeHead = function () {
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.header('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');
                res.header('Expires', '-1');
                res.header('Pragma', 'no-cache');
                res.header("content-security-policy", "");
                var location = res._headers["location"];
                location = location.substr(0, location.indexOf("?vorlonproxytarget="));
                var vorlonsessionid = _proxy.vorlonSessionIdFor(targetProxyUrl, req);
                res.header("location", "?vorlonproxytarget=" + encodeURIComponent(location) + "&vorlonsessionid=" + encodeURIComponent(vorlonsessionid));
                writeHead.apply(res, arguments);
            };
            return;
        };
        HttpProxy.prototype.proxyResultForPageContent = function (targetProxyUrl, proxyRes, req, res) {
            var _proxy = this;
            var chunks, end = res.end, writeHead = res.writeHead, write = res.write;
            var encoding = proxyRes.headers["content-encoding"];
            var uri = url.parse(targetProxyUrl);
            var vorlonsessionid = _proxy.vorlonSessionIdFor(targetProxyUrl, req);
            //var scriptUrl = "http://localhost:" + this.httpConfig.port + "/" + this._vorlonScript + "/" + vorlonsessionid;
            var _script = "<script src=\"" + this.vorlonClientFileUrl() + "/" + vorlonsessionid + "/\"></script>";
            if (encoding == "gzip" || encoding == "deflate") {
                this._log.debug("PROXY content is encoded to " + encoding);
                var uncompress = zlib.Gunzip();
                if (encoding == "deflate")
                    uncompress = zlib.Inflate();
                res.writeHead = function () {
                    if (proxyRes.headers && proxyRes.headers["content-length"]) {
                        res.setHeader("content-length", parseInt(proxyRes.headers["content-length"], 10) + _script.length);
                    }
                    res.setHeader("transfer-encoding", "");
                    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                    res.header('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');
                    res.header('Expires', '-1');
                    res.header("content-security-policy", "");
                    res.header('Pragma', 'no-cache');
                    res.header('Content-Encoding', '');
                    //res.header('Content-Type', 'text/html; charset=utf-8');                    
                    res.removeHeader('Content-Encoding');
                    res.removeHeader('Content-Length');
                    res.header('X-VorlonProxyEncoding', encoding || "none");
                    //we must set cookie only if url was requested through Vorlon
                    if (req.query.vorlonproxytarget) {
                        _proxy._log.debug("set cookie " + req.query.vorlonproxytarget);
                        res.cookie(_proxy._proxyCookieName, req.query.vorlonproxytarget);
                        res.cookie(_proxy._proxySessionCookieName, vorlonsessionid);
                    }
                    writeHead.apply(res, arguments);
                };
                res.write = function (data) {
                    uncompress.write(data);
                };
                uncompress.on('data', function (data) {
                    if (chunks) {
                        chunks += data;
                    }
                    else {
                        chunks = data;
                    }
                    return chunks;
                });
                uncompress.on('end', function (data) {
                    if (chunks && chunks.toString) {
                        var contentstring = chunks.toString();
                        var tmp = _proxy.insertVorlonScript(contentstring, uri, _script, vorlonsessionid);
                        write.apply(res, [tmp]);
                    }
                    end.apply(res);
                });
                res.end = function () {
                    uncompress.end(arguments[0]);
                };
            }
            else {
                res.writeHead = function () {
                    if (proxyRes.headers && proxyRes.headers["content-length"]) {
                        res.setHeader("content-length", parseInt(proxyRes.headers["content-length"], 10) + _script.length);
                    }
                    res.setHeader("transfer-encoding", "");
                    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                    res.header('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range');
                    res.header('Expires', '-1');
                    res.header('Pragma', 'no-cache');
                    res.header("content-security-policy", "");
                    res.header('X-VorlonProxyEncoding', encoding || "none");
                    //we must set cookie only if url was requested through Vorlon
                    if (req.query.vorlonproxytarget) {
                        _proxy._log.debug("set cookie " + req.query.vorlonproxytarget);
                        res.cookie(_proxy._proxyCookieName, req.query.vorlonproxytarget);
                    }
                    writeHead.apply(res, arguments);
                };
                res.write = function (data) {
                    if (chunks) {
                        chunks += data;
                    }
                    else {
                        chunks = data;
                    }
                    return chunks;
                };
                res.end = function () {
                    if (chunks && chunks.toString) {
                        var tmp = _proxy.insertVorlonScript(chunks.toString(), uri, _script, vorlonsessionid);
                        write.apply(res, [tmp]);
                    }
                    end.apply(res, arguments);
                };
            }
        };
        return HttpProxy;
    }());
    VORLON.HttpProxy = HttpProxy;
})(VORLON = exports.VORLON || (exports.VORLON = {}));
