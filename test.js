var compress=require("./compress");
var util=require("util");
var fs=require("fs");

// Create gzip stream
var gzip=new compress.Gzip;
gzip.init();

// Pump data to be compressed
var gzdata1 = gzip.deflate("My data that needs ", "binary"); 
util.puts("Compressed size : "+gzdata1.length);

var gzdata2 = gzip.deflate("to be compressed. 01234567890.", "binary"); 
util.puts("Compressed size : "+gzdata2.length);

var gzdata3=gzip.end();
util.puts("Last bit : "+gzdata3.length);

// Take the output stream, and chop it up into two
var gzdata = gzdata1+gzdata2+gzdata3;
util.puts("Total compressed size : "+gzdata.length);
var d1 = gzdata.substr(0, 25);
var d2 = gzdata.substr(25);

// Create gunzip stream to decode these
var gunzip = new compress.Gunzip;
gunzip.init();
var data1 = gunzip.inflate(d1, "binary");
var data2 = gunzip.inflate(d2, "binary");
var data3 = gunzip.end();

util.puts(data1+data2+data3);






