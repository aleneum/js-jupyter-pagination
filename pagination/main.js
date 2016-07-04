

define([
    'base/js/namespace', 'jquery', 'require'
], function(
    Jupyter
) {
    var container = Object;
        container.el = $("#notebook-container");

    container.settings = {
        currentPage: 1,
        elementsPerPage: 5,
        hashPage: 'page',
        effect: 'default',
        slideOffset: 200,
        firstButton: true,
        firstButtonText: '<<',
        lastButton: true,
        lastButtonText: '>>',        
        prevButton: true,
        prevButtonText: '<',        
        nextButton: true,
        nextButtonText: '>'
    }

    var load_css = function (name) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = require.toUrl(name);
        document.getElementsByTagName("head")[0].appendChild(link);
    };

    var getNbOfPages = function() {
        return Math.ceil(Jupyter.notebook.get_cell_elements().length / container.settings.elementsPerPage);         
    };

    var getNbOfElements = function() {
        return Jupyter.notebook.get_cell_elements().length;
    };

    var displayPage = function(pageNr) {
        var els = Jupyter.notebook.get_cell_elements();
        start = (pageNr-1) * container.settings.elementsPerPage
        end = pageNr * container.settings.elementsPerPage
        end = Math.min(end, getNbOfElements())
        console.log(start, end);
        for (var i = 0; i < getNbOfElements(); ++i) {
            els.eq(i).hide();
        }
        for (var i = start; i < end; ++i) {
            els.eq(i).show()
        }
    }

    var displayNav = function() {
        htmlNav = '<div class="easyPaginateNav">';
        
        if(container.settings.firstButton) {
            htmlNav += '<a href="#'+container.settings.hashPage+':1" title="First page" rel="1" class="first">'+container.settings.firstButtonText+'</a>';
        }
        
        if(container.settings.prevButton) {
            htmlNav += '<a href="" title="Previous" rel="" class="prev">'+container.settings.prevButtonText+'</a>';
        }
        
        for(i = 1;i <= getNbOfPages();i++) {
            htmlNav += '<a href="#'+container.settings.hashPage+':'+i+'" title="Page '+i+'" rel="'+i+'" class="page">'+i+'</a>';
        };
        
        if(container.settings.nextButton) {
            htmlNav += '<a href="" title="Next" rel="" class="next">'+container.settings.nextButtonText+'</a>';
        }
        
        if(container.settings.lastButton) {
            htmlNav += '<a href="#'+container.settings.hashPage+':'+getNbOfPages()+'" title="Last page" rel="'+getNbOfPages()+'" class="last">'+container.settings.lastButtonText+'</a>';
        }
        
        htmlNav += '</div>';
        container.nav = $(htmlNav);
        container.nav.css({
            'width': container.el.width()
        });
        container.el.before(container.nav);
        
        $('.easyPaginateNav a.page, .easyPaginateNav a.first, .easyPaginateNav a.last', container).on('click', function(e) {                
            e.preventDefault();
            displayPage($(this).attr('rel'));                
        });
        
        $('.easyPaginateNav a.prev', container).on('click', function(e) {                
            e.preventDefault();
            page = container.settings.currentPage > 1?parseInt(container.settings.currentPage) - 1:1;
            displayPage(page);
        });
        
        $('.easyPaginateNav a.next', container).on('click', function(e) {                
            e.preventDefault();
            page = container.settings.currentPage < getNbOfPages()?parseInt(container.settings.currentPage) + 1:getNbOfPages();
            console.log(page);
            displayPage(page);
        });
    };

    function load_ipython_extension() {
        load_css('/nbextensions/pagination/main.css');
        if (getNbOfPages() > 1) {
            displayNav();
            displayPage(1);
        }
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});

