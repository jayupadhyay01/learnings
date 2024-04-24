/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sass/theme-option.scss":
/*!************************************!*\
  !*** ./src/sass/theme-option.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./src/js/theme-option.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_theme_option_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/theme-option.scss */ "./src/sass/theme-option.scss");
// Styles

jQuery(document).ready(function ($) {
  //upload logo button
  $(document).on('click', '.ana_enterprise_img_upload', function (e) {
    e.preventDefault();
    const currentParent = $(this);
    const customUploader = wp.media({
      title: 'Select Image',
      button: {
        text: 'Use This Image'
      },
      multiple: false // Set this to true to allow multiple files to be selected
    }).on('select', function () {
      const attachment = customUploader.state().get('selection').first().toJSON();
      currentParent.siblings('.ana_enterprise_img').attr('src', attachment.url);
      currentParent.siblings('.ana_enterprise_img').attr('width', '250');
      currentParent.siblings('.ana_enterprise_img').attr('height', '140');
      currentParent.siblings('.ana_enterprise_img_url').val(attachment.url);
    }).open();
  });

  //remove logo button
  $(document).on('click', '.ana_enterprise_img_remove', function (e) {
    e.preventDefault();
    const currentParent = $(this);
    currentParent.siblings('.ana_enterprise_img').removeAttr('src');
    currentParent.siblings('.ana_enterprise_img').removeAttr('width');
    currentParent.siblings('.ana_enterprise_img').removeAttr('height');
    currentParent.siblings('.ana_enterprise_img_url').removeAttr('value');
  });

  //color picker custom js.
  $('[class="color-picker"]').wpColorPicker({
    hide: false
  });
});
})();

/******/ })()
;
//# sourceMappingURL=themeoption.js.map