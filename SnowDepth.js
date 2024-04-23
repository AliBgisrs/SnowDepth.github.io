Map.centerObject(table);
Map.addLayer(table);

var snow_depth = ee.ImageCollection('NASA/FLDAS/NOAH01/C/GL/M/V001')
.filterBounds(table)
.filterDate('2000-01-01','2019-01-01')
.filter(ee.Filter.calendarRange(1,1,'month'))
.map(function(img){
  var band = img.select('SnowDepth_inst');
  var clip = band.clip(table);
  return clip})
.mean();

Map.addLayer(snow_depth);


var snow_depth = ee.ImageCollection('NASA/FLDAS/NOAH01/C/GL/M/V001')
.filterBounds(table)
.filterDate('2000-01-01','2019-01-01')
//.filter(ee.Filter.calendarRange(1,1,'month'))
.map(function(img){
  var band = img.select('SnowDepth_inst');
  var clip = band.clip(table);
  return clip
  .copyProperties(img,['system:time_start','system:time_end']);})
  
  print(ui.Chart.image.series(
  snow_depth, table, ee.Reducer.mean(), 10000, 'system:time_start'));
  
  
// snow water equivalent

var swe = ee.ImageCollection('NASA/FLDAS/NOAH01/C/GL/M/V001')
.filterBounds(table)
.filterDate('2000-01-01','2019-01-01')
//.filter(ee.Filter.calendarRange(1,1,'month'))
.map(function(img){
  var band = img.select('SWE_inst');
  var clip = band.clip(table);
  return clip
  .copyProperties(img,['system:time_start','system:time_end']);})
  
  print(ui.Chart.image.series(
  swe, table, ee.Reducer.mean(), 10000, 'system:time_start'));
  
  
// grace 

var grace =ee.ImageCollection('NASA/GRACE/MASS_GRIDS/MASCON_CRI')
.filterBounds(table)
.filterDate('2000-01-01','2020-01-01')
.map(function(img){
  var band = img.select('lwe_thickness');
  var clip = band.clip(table);
  return clip
  .copyProperties(img,['system:time_start','system:time_end']);});
  
 print(ui.Chart.image.series(
  grace, table, ee.Reducer.mean(), 10000, 'system:time_start'));