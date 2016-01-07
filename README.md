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

In addition, the config file needs to be configured according to the wdk configuration file specification. The spec has been preliminarily documented below.


## WDK Config File Documentation
The config file requires that you define two JavaScript objects:
1. **datasets**: a dictionary of the various API endpoints (and parameters) from which the data will be sourced
2. **pages**: a dictionary of each "page" in the website. Pages are really just HTML and/or JavaScript snippets that get injected into the page when a user executes on a particular event (i.e., usually an HTML bookmark, via an anchor tag).

### Dataset Dictionary Entry
Each dataset entry consists of a key -- an an arbitrary dataset name that you make up (e.g. "fdc_data") -- and three properties:

1. **api_endpoint** (string): a URL to the API endpoint to be used.
2. **page_size** (integer): The maximum number of entries you would like to return for each query.
3. **server_query** (string): The criteria by which you would like to filter your queries.

### Page Dictionary Entry
Each page entry consists of a key -- an arbitrary page name that you make up (e.g. "splash") -- and several properties:

1. **type** (string, optional, default value: "basic"):<br> 
   specifies the type of page to load. Valid values are:
  * **mapbox**: loads a mapbox map
  * **list**: loads in a list of data from an API endpoint
  * **detail**: loads a single data entry (from an API endpoint)
  * **basic**: Just loads a plain HTML template

2. **url** (string, optional): specifies that the snippet will only load if the url specified is called. If no url is specified, the page loads right away
3. **urls** (list, optional): if you want the same page to load for multiple urls.
4. **template_path** (string, required for "basic" and "detail" types): specifies the location of the HTML template, which is located in the "templates" directory
5. **region** (css selector string, required for all types except for "mapbox"): specifies where, in the main page (index.html), the template should be injected into. For instance, for the "splash" page (below), the "splash.html" template will be injected into the "#splash" selector (container where id="splash") on the index.html page.
6. **postRender** (function, optional): function that gets called after the page loads. All functions must be defined in the functions.js file.
7. **transition** (function, optional): function that gets called while the new page is loading; often an animation.

#### Type-Specific Configuration Options
There are also some additional configuration options that are type-specific:

1. **type: "mapbox"**
  * **accessToken**: Your mapbox access token.
  * **styleID**: Your mapbox style ID
  * **markerSymbol**: TBD...still being extended to accommodate custom symbols
  * **dataset**: the datasource for the markers.
  * **clickRoute**: when you click a marker, what url route to load.

2. **type: "list"**
  * **dataset**: the datasource for the list of data.
  * **collection_template_path**: the template that holds the entire list (see "place-list.html" for more details)
  * **item_template_path**: the template that holds each individual entry (see "place-item.html" for more details). Note the variable substitution notation, which corresponds to the dataset returned by the API endpoint

3. **type: "detail"**
  * **dataset**: the datasource for the list of data.
  * **url**: special convention: uses the :id parameter to specify which id, specifically, will be queried by the endpoint. See the "foodDetailPage" below
