"use strict";
var fs = require("fs");
var config = require("./vorlon.configprovider");
var VORLON;
(function (VORLON) {
    var PluginsConfig = (function () {
        function PluginsConfig() {
        }
        PluginsConfig.prototype.getPluginsFor = function (sessionid, callback) {
            var configurationFile = fs.readFileSync(config.VORLON.ConfigProvider.getConfigPath(), "utf8");
            var configurationString = configurationFile.toString().replace(/^\uFEFF/, '');
            var configuration = JSON.parse(configurationString);
            try {
                var sessionConfig = configuration.sessions[sessionid];
            }
            catch (e) {
                if (!sessionConfig || !sessionConfig.plugins || !sessionConfig.plugins.length) {
                    sessionConfig = {
                        includeSocketIO: (configuration.includeSocketIO != undefined) ? configuration.includeSocketIO : true,
                        plugins: configuration.plugins
                    };
                }
            }
            if (callback)
                callback(null, sessionConfig);
        };
        PluginsConfig.prototype.setPluginState = function (pluginid, callback) {
            var configurationFile = fs.readFileSync(config.VORLON.ConfigProvider.getConfigPath(), "utf8");
            var configurationString = configurationFile.toString().replace(/^\uFEFF/, '');
            var configuration = JSON.parse(configurationString);
            for (var i = 0; i < configuration.plugins.length; i++) {
                if (configuration.plugins[i].id == pluginid) {
                    configuration.plugins[i].enabled = !configuration.plugins[i].enabled;
                    fs.writeFileSync(config.VORLON.ConfigProvider.getConfigPath(), JSON.stringify(configuration, null, 4), "utf8");
                    return callback(null);
                }
            }
            return callback('PluginID unknown');
        };
        PluginsConfig.prototype.setPluginName = function (pluginid, name, callback) {
            var configurationFile = fs.readFileSync(config.VORLON.ConfigProvider.getConfigPath(), "utf8");
            var configurationString = configurationFile.toString().replace(/^\uFEFF/, '');
            var configuration = JSON.parse(configurationString);
            if (!name) {
                return callback(true);
            }
            for (var i = 0; i < configuration.plugins.length; i++) {
                if (configuration.plugins[i].id == pluginid) {
                    configuration.plugins[i].name = name;
                    fs.writeFileSync(config.VORLON.ConfigProvider.getConfigPath(), JSON.stringify(configuration, null, 4), "utf8");
                    return callback(null);
                }
            }
            return callback('PluginID unknown');
        };
        PluginsConfig.prototype.setPluginPanel = function (pluginid, panel, callback) {
            var configurationFile = fs.readFileSync(config.VORLON.ConfigProvider.getConfigPath(), "utf8");
            var configurationString = configurationFile.toString().replace(/^\uFEFF/, '');
            var configuration = JSON.parse(configurationString);
            var panelPosible = ['top', 'bottom'];
            if (!panel) {
                return callback('Panel must be defined');
            }
            if (panelPosible.indexOf(panel) == -1) {
                return callback('Panel wrong value');
            }
            for (var i = 0; i < configuration.plugins.length; i++) {
                if (configuration.plugins[i].id == pluginid) {
                    configuration.plugins[i].panel = panel;
                    fs.writeFileSync(config.VORLON.ConfigProvider.getConfigPath(), JSON.stringify(configuration, null, 4), "utf8");
                    return callback(null);
                }
            }
            return callback('PluginID unknown');
        };
        PluginsConfig.prototype.setPluginsPosition = function (positions, callback) {
            var configurationFile = fs.readFileSync(config.VORLON.ConfigProvider.getConfigPath(), "utf8");
            var configurationString = configurationFile.toString().replace(/^\uFEFF/, '');
            var configuration = JSON.parse(configurationString);
            if (!positions) {
                return callback('Positions must be defined');
            }
            positions = JSON.parse(positions);
            var lookup = {};
            var plugins_reorganised = [];
            for (var i = 0; i < configuration.plugins.length; i++) {
                lookup[configuration.plugins[i].id] = configuration.plugins[i];
            }
            for (var i = 0; i < positions.length; i++) {
                plugins_reorganised.push(lookup[positions[i]]);
            }
            configuration.plugins = plugins_reorganised;
            fs.writeFileSync(config.VORLON.ConfigProvider.getConfigPath(), JSON.stringify(configuration, null, 4), "utf8");
            return callback('PluginID unknown');
        };
        return PluginsConfig;
    }());
    VORLON.PluginsConfig = PluginsConfig;
})(VORLON = exports.VORLON || (exports.VORLON = {}));
