"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/preloader/preloader.tsx":
/*!************************************************!*\
  !*** ./src/components/preloader/preloader.tsx ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _preloader_preloader_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../preloader/preloader.module.scss */ \"(app-pages-browser)/./src/components/preloader/preloader.module.scss\");\n/* harmony import */ var _preloader_preloader_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_preloader_preloader_module_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n// import \"./Preloader.css\";\n\nclass Preloader extends react__WEBPACK_IMPORTED_MODULE_1__.Component {\n    preloader() {\n        let preload = document.querySelector((_preloader_preloader_module_scss__WEBPACK_IMPORTED_MODULE_2___default().preloader));\n        console.log(\"preloader: \", preload);\n        if (preload) {\n            setTimeout(()=>{\n                preload.style.opacity = \"0\";\n                setTimeout(()=>{\n                    preload.style.display = \"none\";\n                }, 1000);\n            }, 3000);\n        }\n    }\n    componentDidMount() {\n        this.preloader();\n    }\n    render() {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_preloader_preloader_module_scss__WEBPACK_IMPORTED_MODULE_2___default().preloader),\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_preloader_preloader_module_scss__WEBPACK_IMPORTED_MODULE_2___default().spinner_wrap),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_preloader_preloader_module_scss__WEBPACK_IMPORTED_MODULE_2___default().spinner)\n                }, void 0, false, {\n                    fileName: \"/Users/scottkehr/projects/four-loop/src/components/preloader/preloader.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/scottkehr/projects/four-loop/src/components/preloader/preloader.tsx\",\n                lineNumber: 30,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/scottkehr/projects/four-loop/src/components/preloader/preloader.tsx\",\n            lineNumber: 29,\n            columnNumber: 7\n        }, this);\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (Preloader);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3ByZWxvYWRlci9wcmVsb2FkZXIudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFeUM7QUFDekMsNEJBQTRCO0FBRTRCO0FBRXhELE1BQU1HLGtCQUFrQkYsNENBQVNBO0lBRS9CRyxZQUFZO1FBQ1YsSUFBSUMsVUFBVUMsU0FBU0MsYUFBYSxDQUFDTCxtRkFBZ0I7UUFDckRNLFFBQVFDLEdBQUcsQ0FBQyxlQUFlSjtRQUMzQixJQUFJQSxTQUFTO1lBQ1RLLFdBQVc7Z0JBQ1BMLFFBQVFNLEtBQUssQ0FBQ0MsT0FBTyxHQUFHO2dCQUN4QkYsV0FBVztvQkFDUEwsUUFBUU0sS0FBSyxDQUFDRSxPQUFPLEdBQUc7Z0JBQzVCLEdBQUc7WUFDUCxHQUFHO1FBQ1A7SUFDRjtJQUVBQyxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDVixTQUFTO0lBQ2hCO0lBRUFXLFNBQVM7UUFDUCxxQkFDRSw4REFBQ0M7WUFBSUMsV0FBV2YsbUZBQWdCO3NCQUM5Qiw0RUFBQ2M7Z0JBQUlDLFdBQVdmLHNGQUFtQjswQkFDakMsNEVBQUNjO29CQUFJQyxXQUFXZixpRkFBYzs7Ozs7Ozs7Ozs7Ozs7OztJQUl0QztBQUNGO0FBRUEsK0RBQWVDLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvcHJlbG9hZGVyL3ByZWxvYWRlci50c3g/YjRmZiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcblxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuLy8gaW1wb3J0IFwiLi9QcmVsb2FkZXIuY3NzXCI7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3ByZWxvYWRlci9wcmVsb2FkZXIubW9kdWxlLnNjc3NcIjtcblxuY2xhc3MgUHJlbG9hZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBcbiAgcHJlbG9hZGVyKCkge1xuICAgIGxldCBwcmVsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdHlsZXMucHJlbG9hZGVyKSBhcyBIVE1MRWxlbWVudDtcbiAgICBjb25zb2xlLmxvZyhcInByZWxvYWRlcjogXCIsIHByZWxvYWQpO1xuICAgIGlmIChwcmVsb2FkKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcHJlbG9hZC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBwcmVsb2FkLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9LCAzMDAwKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnByZWxvYWRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnByZWxvYWRlcn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc3Bpbm5lcl93cmFwfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNwaW5uZXJ9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmVsb2FkZXI7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJzdHlsZXMiLCJQcmVsb2FkZXIiLCJwcmVsb2FkZXIiLCJwcmVsb2FkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29uc29sZSIsImxvZyIsInNldFRpbWVvdXQiLCJzdHlsZSIsIm9wYWNpdHkiLCJkaXNwbGF5IiwiY29tcG9uZW50RGlkTW91bnQiLCJyZW5kZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJzcGlubmVyX3dyYXAiLCJzcGlubmVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/preloader/preloader.tsx\n"));

/***/ })

});