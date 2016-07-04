

define([
    'base/js/namespace', 'jquery', 'require', './jquery.easyPaginate'
], function(
    Jupyter
) {
    var load_css = function (name) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = require.toUrl(name);
        document.getElementsByTagName("head")[0].appendChild(link);
    };

    function load_ipython_extension() {
        load_css('/nbextensions/pagination/main.css');
        $('#notebook-container').easyPaginate({
            paginateElement: '.cell',
            elementsPerPage: 5,
            effect: 'fade'
        });
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});

