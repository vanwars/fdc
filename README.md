# YR Five Dollar Challenge

This code is being created for YRI, by Sarah & Ellen. This site was designed by Storm, Asha, Teresa, & Ellen. 

## Some Technical Documentation
This code is used in conjunction with the first version of the [Local Ground Web Development Toolkit](https://github.com/vanwars/lg-web-toolkit), hereafter wdk. The Five Dollar Challenge portion of the code consists of:

1. A base HTML file (index.html)
2. A configuration file (config.js), which defines the data sources, as well as what should get loaded where when different bookmarks are accessed
3. A functions file (function.js), which houses some custom functions that the config file accesses.
4. A templates directory of HTML templates
5. A css directory of styles
6. An assets directory of static images

In order for the Five Dollar Challenge website to work with the wdk, the following needs to be included at the bottom of index.html:

```HTML
<script src="http://code510.org/wdk/js/external/require.js"></script>
<script src="http://code510.org/wdk/js/require-config.js" type="text/javascript"></script>
<script src="functions.js" type="text/javascript"></script>
<script>
  require(["init", "../config"], function(App) {
    App.start({
      pages: pages,
      datasets: datasets
    });
  });
</script>
```

