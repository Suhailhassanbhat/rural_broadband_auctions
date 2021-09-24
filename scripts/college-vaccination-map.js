const pymChild = new pym.Child()
/// /MAP STARTS HERE////////////////////////////////
mapboxgl.accessToken =
  'pk.eyJ1Ijoic3VoYWlsLWJoYXQiLCJhIjoiY2tpbWxzbnZ1MGRqejJ4bncwNHl4anUzaiJ9.NsWEhUt8IvcwkFyDOh9h7g'
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/suhail-bhat/ckobr9n1p1dve17o4g75jkhb7',
  center: [-83.9071, 41],
  minZoom: 5,
  zoom: 6,
  trackResize: true,
  dragRotate: false,
  touchZoomRotate: true,
  scrollZoom: false
})

const bbox = [[-89.6, 36.5],[-77.7, 42]]
map.fitBounds(bbox)

map.boxZoom.enable()
map.addControl(
  new mapboxgl.NavigationControl({ showCompass: false }),
  'top-left'
)

  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
    layers: ['vaccinaton-in-ohio-valley-col-17zd9e'] // replace this with the name of the layer
    });
     
    if (!features.length) {
    return;
    }
    function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    var feature = features[0];
     
    var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
    '<h3>' +
    feature.properties.Name +
    '</h3><p>' +
    "Total Enrollment: " + formatNumber(feature.properties.total_enrollment_fall_2019) +
    '</p>'
    )
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);
    })