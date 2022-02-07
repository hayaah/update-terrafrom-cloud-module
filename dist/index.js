/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 466:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

const axios = __nccwpck_require__(645);
const core = __nccwpck_require__(450);

const getParams = () => {
  const moduleName = core.getInput('module_name');
  const provider = core.getInput('provider');
  const registryName = core.getInput('registry_name');
  const organization = core.getInput('organization');
  const version = core.getInput('version');

  return {
    moduleName,
    provider,
    registryName,
    organization,
    version
  }
}

const getToken = () => {
  return core.getInput('token')
}

const updateVersionModuleApiCall = async () => {
  const params =  getParams()
  const { moduleName, provider, registryName, organization, version } = params
    const data = {
      "data": {
        "type": "registry-module-versions",
        "attributes": {
          "version": version
        }
      }
    }
    
  const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Authorization': `Bearer ${getToken()}`
  }
  
  const response = await axios.post(`https://app.terraform.io/api/v2/organizations/${organization}/registry-modules/${registryName}/wix-infragod/${moduleName}/${provider}/versions`, 
    data, {
    headers: headers
  })

  return response
}

exports.modules = {
  updateVersionModuleApiCall,
  getParams
}

/***/ }),

/***/ 450:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 645:
/***/ ((module) => {

module.exports = eval("require")("axios");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(450);
const createModule = __nccwpck_require__(466)

async function run() {
  try {
    const response = createModule.modules.createModuleApiCall()
    if (response.data) {
      core.setOutput("response", JSON.stringify(response.data));
    }
  }
  catch (error) {
    if (error.response) { 
      core.setFailed({ status: error.response.status, data: error.response.data });
    }
  }
}

run()
})();

module.exports = __webpack_exports__;
/******/ })()
;