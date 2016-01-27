/*------------------------------------------------------------------
File:	    mapsk.in main javascript
URL:        http://mapsk.in/js/mapskin.js
Author:     Nicolas Bozon
Version:    1.0
-------------------------------------------------------------------*/

/* Navbar state */
$(window).scroll(function() {
    if ($(".navbar").offset().top > $("#map").height()) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});
/* Sidebar */
$('#sidebar').affix({
  offset: {
    top: 740  }
})
/* Scrollspy menu */
var $body   = $(document.body);
var navHeight = $('.navbar').outerHeight(true) + 10;
$body.scrollspy({
    target: '#left',
    offset: navHeight
});
/* Icons carousel */
$(document).ready(function() {   
  $('.carousel').carousel({
    interval: 1000,
});
/* Icons tools */
$('#fsubs li a').on('click', function(e){
    $('.sfs').html($(this).text());
    $('.ms-icons-list i').css("font-size", $(this).text() + "px");
    e.preventDefault();
});
/* Smooth scrolling */
$('a[href]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 80
        }, 1000);
        return false;
      }
    }
});
/* Currency carousel */
function doCur() {
    setTimeout(function(){$('#cur').removeClass('fa-usd').addClass('fa-eur');},500);
    setTimeout(function(){$('#cur').removeClass('fa-eur').addClass('fa-yen');}, 1000);
    setTimeout(function(){$('#cur').removeClass('fa-yen').addClass('fa-gbp');}, 1500);
    setTimeout(function(){$('#cur').removeClass('fa-gbp').addClass('fa-rub');}, 2000);
    setTimeout(function(){$('#cur').removeClass('fa-rub').addClass('fa-ils');}, 2500);
    setTimeout(function(){$('#cur').removeClass('fa-ils').addClass('fa-won');}, 3000);
    setTimeout(function(){$('#cur').removeClass('fa-won').addClass('fa-inr');}, 3500);
    setTimeout(function(){$('#cur').removeClass('fa-inr').addClass('fa-btc');}, 4000);
    setTimeout(function(){$('#cur').removeClass('fa-btc').addClass('fa-usd');}, 4500);
}
doCur();
setInterval(doCur,4500);   
});
/* Small mapskin animation */
$('.scrz').on('click', function() {
    $('.mslbhc').addClass('mspin');
    setTimeout(function() {
        $('.mslbgm').css("opacity", ".6");
        $('.mslbgm').addClass('mrotateFall');
        $('.mslbos i').addClass('wht');
        $('.mslbos').fadeIn();
        $('.mslbhc').fadeOut();
    }, 1200);
    setTimeout(function() {
        $('.mslbgm').fadeOut('slow')
    }, 1500);
    return false;
});
/* Maps */
var attrib1 = new ol.control.Attribution({
    collapsible: false,
    collapsed: false
});
var attrib2 = new ol.control.Attribution({
    collapsible: false,
    collapsed: false,
    className: 'ol-attribution-light'
});
var view1 = new ol.View({
    center: ol.proj.transform([73.8514, 18.5242], 'EPSG:4326',
        'EPSG:3857'),
    zoom: 13,
    maxZoom: 21
});
var view2 = new ol.View({
    center: ol.proj.transform([135.5571, 34.5860], 'EPSG:4326',
        'EPSG:3857'),
    zoom: 11
});
var view3 = new ol.View({
    center: ol.proj.transform([73.8514, 18.6242], 'EPSG:4326',
        'EPSG:3857'),
    zoom: 17
});
var view4 = new ol.View({
    center: ol.proj.transform([73.8514, 18.6242], 'EPSG:4326',
        'EPSG:3857'),
    zoom: 13
});
var cdbd = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'http://s.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
        attributions: [new ol.Attribution({
            html: [
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            ]
        })]
    })
});
var cdbl = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'http://s.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        attributions: [new ol.Attribution({
            html: [
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            ]
        })]
    }),
    opacity: .3
});
var mbx = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'http://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2FydG9nZW5pYyIsImEiOiI4ZGEyZWJiNmY2ZjY1YWQ1MjA4Y2Y5MWFmMDJlMTVhMCJ9.j0S-qDFH4JEIJ8LAxrFGdQ',
        attributions: [new ol.Attribution({
            html: [
                '<a href="https://www.mapbox.com/map-feedback/" class="brd mbx" target="_blank">Mapbox</a><span class="cdts"><a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</span>'
            ]
        })]
    }),
    opacity: .20
});
var osm = new ol.layer.Tile({
    source: new ol.source.OSM()
});
osm.on('postcompose', function(event) {
    var context = event.context;
    var canvas = context.canvas;
    var image = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = image.data;
    for (var i = 0, ii = data.length; i < ii; i += 4) {
        data[i] = data[i + 1] = data[i + 2] = (3 * data[i] + 4 * data[i +
            1] + data[i + 2]) / 8;
    }
    context.putImageData(image, 0, 0);
});
var map = new ol.Map({
    layers: [cdbd],
    controls: [],
    interactions:[],
    target: 'map',
    view: view1
});
map.addControl(attrib1);
var admap = new ol.Map({
    layers: [cdbl],
    controls: [],
    interactions: [],
    target: 'admap',
    view: view2
});
admap.addControl(attrib2);
var mapt = new ol.Map({
    layers: [cdbl],
    controls: [],
    interactions: [],
    target: 'mapt',
    view: view4
});
mapt.addControl(attrib2);
var gsmap0 = new ol.Map({
    layers: [mbx],
    controls: [],
    interactions:[],
    target: 'gsmap0',
    view: view3
});
admap.addControl(attrib2);
var mapb = new ol.Map({
    layers: [cdbd],
    controls: [],
    interactions:[],
    target: 'mapb',
    view: view2
});

/* Donwload Modal window */
var dlmap;
function loadMap() {
    dlmap = new ol.Map({
        layers: [cdbl],
        controls: [],
        interactions: ol.interaction.defaults({mouseWheelZoom: false}),
        target: 'dlmap',
        view: view2
    });
    return false;
}

$('#ms-modal').on('shown.bs.modal', function() {
    loadMap();
})
$('#ms-modal').on('hidden.bs.modal', function() {
    dlmap.setTarget(null);
})
if ($(window).width() < 768) {
    $('#ms-modal').on('show.bs.modal', function() {
        $('.modal-content').css('height', $(window).height() * 0.95);
	$('.modal-footer').css('position', 'absolute');
	$('.modal-footer').css('bottom', '0');
    });
}
/* Back to top */
$('.btt').on('click', function(){
    $('html,body').animate({scrollTop:0},'slow');
    return false;
});
/* Google analytics */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-72051928-1', 'auto');
  ga('send', 'pageview');


