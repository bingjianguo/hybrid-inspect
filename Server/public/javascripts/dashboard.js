jQuery(function ($) {
    // 根据url的参数处理sidebar的情况
    (function() {
        var getUrlParams = function(url) {
            var urlPart = url.split('?');
            var search = urlPart.length > 1 ? urlPart[1] : '';
            search = search.replace(/^\s*\?/, '') || '';
            var kvs = search.split('&') || [];
            var param = {};
            for (var i = 0; i < kvs.length; i += 1) {
                var kv = kvs[i].split('=') || [];
                var key = kv[0].replace(/(^\s*)|(\s*$)/, '');
                var val = ((kv[1] || '').replace(/(^\s*)|(\s*$)/, ''));
                param[key] = val;
            }
            return param;
        }

        var params = getUrlParams(location.href);
        if (params['nosidebar'] === 'true' ) {
            $('.sidebar').hide();
            $('.dashboard').addClass('no-sidebar');
        }

    })();

    //Resizable panes
    // $('.dashboard-plugins').split({
    //     orientation: 'horizontal',
    //     limit: 38
    // });

    // Replace default url with the current one (running vorlon)
    $('#scriptSrc').text('<script src="{{location}}{{baseURL}}/vorlon.js"></script>'.replace('{{location}}', location.origin).replace('{{baseURL}}', vorlonBaseURL));

    //Plugin tab navigation
    $('#pluginsPaneTop').on('click', '[data-plugin-target]', function (e) {
        var $this = $(this);
        var target = $this.data('plugin-target');

        $('#pluginsPaneTop [data-plugin-target]').removeClass('active');
        $this.addClass('active');
        $('#pluginsPaneTop [data-plugin]')
                    .hide()
                    .trigger("vorlon.plugins.inactive");

        var pluginTarget = $('#pluginsPaneTop [data-plugin~=' + target + ']');

        pluginTarget.show()
                    .trigger("vorlon.plugins.active");
        if (pluginTarget.find('.split').length && !pluginTarget.find('.vsplitter').length) {
            pluginTarget.find('.split').split({
                orientation: pluginTarget.find('.split').data('orientation'),
                limit: pluginTarget.find('.split').data('limit'),
                position: pluginTarget.find('.split').data('position'),
            });

        }
    });

    $('#pluginsPaneBottom').on('click', '[data-plugin-target]', function (e) {
        var target = $(this).data('plugin-target');

        $('#pluginsPaneBottom [data-plugin-target]').removeClass('active');
        $(this).addClass('active');
        $('#pluginsPaneBottom [data-plugin]')
                    .hide()
                    .trigger("vorlon.plugins.inactive");
                    
        var pluginTarget = $('#pluginsPaneBottom [data-plugin~=' + target + ']');   
                 
        pluginTarget.show()
                    .trigger("vorlon.plugins.active");
        if (pluginTarget.find('.split').length && !pluginTarget.find('.vsplitter').length) {
            pluginTarget.find('.split').split({
                orientation: pluginTarget.find('.split').data('orientation'),
                limit: pluginTarget.find('.split').data('limit'),
                position: pluginTarget.find('.split').data('position'),
            });

        }
    });
    
    $( "#pluginsListPaneBottom, #pluginsListPaneTop" ).sortable({
        axis: 'x',
        update: function( event, ui ) {
            var positions = [];
            $('#pluginsListPaneTop div, #pluginsListPaneBottom div').each(function() {
                if($(this).data('plugin-target')) {
                    positions.push($(this).data('plugin-target'));   
                }
            }); 
            
            $.post(VORLON.DashboardManager.vorlonBaseURL + '/setplugin/positions', {positions: JSON.stringify(positions)},function(data) {
                $('.plugins-list li').find('.calque').fadeOut();
            });
        },
        start: function() {
            $('#pluginsListPaneTop').css('width', '1000%');
        },
        stop: function() {
            $('#pluginsListPaneTop').css('width', '100%');
        }
    });
});
