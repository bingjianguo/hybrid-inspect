import '../libs/css';
import { Tools, FluentDOM } from '../Vorlon/vorlon.tools';
import { RuntimeSide, PluginType } from '../Vorlon/vorlon.enums';
import { Connection } from '../Vorlon/vorlon.connection';
import { BasePlugin } from '../Vorlon/vorlon.basePlugin';
import { ClientPlugin } from '../Vorlon/vorlon.clientPlugin';
import { DashboardPlugin } from '../Vorlon/vorlon.dashboardPlugin';
import { ClientMessenger } from '../Vorlon/vorlon.clientMessenger';

import { Core, _Core } from '../Vorlon/vorlon.core';

import '../Vorlon/vorlon.hook';

(<any>window).VORLON = {
    Tools,
    FluentDOM,
    PluginType,
    RuntimeSide,
    Connection,
    BasePlugin,
    ClientPlugin,
    DashboardPlugin,
    ClientMessenger,
    Core,
    _Core
};