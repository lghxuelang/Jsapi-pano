//定义一些常量
var piObj = {
  x_PI: (3.14159265358979324 * 3000.0) / 180.0,
  PIs: 3.1415926535897932384626,
  a: 6378245.0,
  ee: 0.00669342162296594323
};
/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function gcToDb(lng, lat) {
  var z =
    Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * piObj.x_PI);
  var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * piObj.x_PI);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return [bd_lng, bd_lat];
}

/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
function wgsToGc(lng, lat) {
  var dlat = this.transformlat(lng - 105.0, lat - 35.0);
  var dlng = this.transformlng(lng - 105.0, lat - 35.0);
  var radlat = (lat / 180.0) * piObj.PIs;
  var magic = Math.sin(radlat);
  magic = 1 - piObj.ee * magic * magic;
  var sqrtmagic = Math.sqrt(magic);
  dlat =
    (dlat * 180.0) /
    (((piObj.a * (1 - piObj.ee)) / (magic * sqrtmagic)) * piObj.PIs);
  dlng =
    (dlng * 180.0) / ((piObj.a / sqrtmagic) * Math.cos(radlat) * piObj.PIs);
  var mglat = lat + dlat;
  var mglng = lng + dlng;
  return [mglng, mglat];
}

function transformlat(lng, lat) {
  var ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * piObj.PIs) +
      20.0 * Math.sin(2.0 * lng * piObj.PIs)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lat * piObj.PIs) +
      40.0 * Math.sin((lat / 3.0) * piObj.PIs)) *
      2.0) /
    3.0;
  ret +=
    ((160.0 * Math.sin((lat / 12.0) * piObj.PIs) +
      320 * Math.sin((lat * piObj.PIs) / 30.0)) *
      2.0) /
    3.0;
  return ret;
}

function transformlng(lng, lat) {
  var ret =
    300.0 +
    lng +
    2.0 * lat +
    0.1 * lng * lng +
    0.1 * lng * lat +
    0.1 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * piObj.PIs) +
      20.0 * Math.sin(2.0 * lng * piObj.PIs)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lng * piObj.PIs) +
      40.0 * Math.sin((lng / 3.0) * piObj.PIs)) *
      2.0) /
    3.0;
  ret +=
    ((150.0 * Math.sin((lng / 12.0) * piObj.PIs) +
      300.0 * Math.sin((lng / 30.0) * piObj.PIs)) *
      2.0) /
    3.0;
  return ret;
}
