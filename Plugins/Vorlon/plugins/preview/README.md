# Preview plugin

该插件负责将客户端采集到的dom结构进行服务端重构
1. 以图片的方式展示
2. 以dom元素的方式展示

## Enabling the sample plugin

To enable the sample plugin:

1. Clone this github repo if you haven't already (`git clone git@github.com/MicrosoftDX/Vorlonjs`)
2. Modify `Server/config.json` to add the plugin, so it looks like this:

```json
{
    "includeSocketIO": true,
    "plugins": [
        { "id": "CONSOLE", "name": "Interactive Console", "panel": "bottom", "foldername" :  "interactiveConsole", "enabled": true},
        { "id": "DOM", "name": "Dom Explorer", "panel": "top", "foldername" : "domExplorer", "enabled": true },
        { "id": "MODERNIZR", "name": "Modernizr","panel": "bottom", "foldername" : "modernizrReport", "enabled": true },
        { "id": "OBJEXPLORER", "name" : "Obj. Explorer","panel": "top", "foldername" :  "objectExplorer", "enabled": true },
        { "id": "SAMPLE", "name" : "Sample","panel": "top", "foldername" : "sample", "enabled": true }
    ]
}
```

3. From the root directory of the repository, install dependencies with `npm install`, build vorlon with `npm run build` and start the server with `npm start` (make sure you kill any existing vorlon servers running on your machine. You can now navigate to the vorlon dashboard as normal, and you'll see an additional tab in the list.

## Modifying the plugin

The plugin is based on two files (one for the client and one for the dashboard) who respectively extend from VORLON.ClientPlugin and VORLON.DashboardPlugin, as defined in `Plugins/Vorlon/vorlon.clientPlugin.ts` and `Plugins/Vorlon/vorlon.dashboardPlugin.ts` so you can see what methods are available for your plugin from there. You may also wish to look at the other existing plugins in `Plugins/Vorlon/plugins` for ideas.

`control.html` will be inserted into the dashboard, as will `dashboard.css`.
