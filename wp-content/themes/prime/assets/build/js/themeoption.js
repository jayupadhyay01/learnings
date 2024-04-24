/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/theme-option.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/theme-option.js":
/*!********************************!*\
  !*** ./src/js/theme-option.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_theme_option_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/theme-option.scss */ "./src/sass/theme-option.scss");
/* harmony import */ var _sass_theme_option_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_theme_option_scss__WEBPACK_IMPORTED_MODULE_0__);
// Styles

jQuery(document).ready(function ($) {
  //upload logo button
  $(document).on('click', '.md_prime_img_upload', function (e) {
    e.preventDefault();
    var currentParent = $(this);
    var customUploader = wp.media({
      title: 'Select Image',
      button: {
        text: 'Use This Image'
      },
      multiple: false // Set this to true to allow multiple files to be selected
    }).on('select', function () {
      var attachment = customUploader.state().get('selection').first().toJSON();
      currentParent.siblings('.md_prime_img').attr('src', attachment.url);
      currentParent.siblings('.md_prime_img').attr('width', '250');
      currentParent.siblings('.md_prime_img').attr('height', '140');
      currentParent.siblings('.md_prime_img_url').val(attachment.url);
    }).open();
  });

  //remove logo button
  $(document).on('click', '.md_prime_img_remove', function (e) {
    e.preventDefault();
    var currentParent = $(this);
    currentParent.siblings('.md_prime_img').removeAttr('src');
    currentParent.siblings('.md_prime_img').removeAttr('width');
    currentParent.siblings('.md_prime_img').removeAttr('height');
    currentParent.siblings('.md_prime_img_url').removeAttr('value');
  });

  //color picker custom js.
  $('[class="color-picker"]').wpColorPicker({
    hide: false
  });
});

/***/ }),

/***/ "./src/sass/theme-option.scss":
/*!************************************!*\
  !*** ./src/sass/theme-option.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=themeoption.js.map