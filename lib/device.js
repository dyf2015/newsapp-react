"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ua = navigator.userAgent;
alert(ua);
var device = {
  isNewsapp: !!ua.match(/newsapp/i),
  isIos: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  isAndroid: !!ua.match(/android/i)
};
exports.default = device;