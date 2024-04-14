const vietmapApiKey = '9c486497752392adc6b3a4156cb889271e83b5e462f4a54f'
export default {
  maptiler: {
    // url: `https://maps.vietmap.vn/api/tm/{z}/{x}/{y}@2x.png?apikey=${vietmapApiKey}`,
    url: 'https://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    attribution:
      '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }
}
