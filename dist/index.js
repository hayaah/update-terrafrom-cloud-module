/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 140:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

const core = __nccwpck_require__(512);
const request = __nccwpck_require__(827);

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
const updateVersionModuleApiCall = (callback) => {
  const params = getParams()
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

  var options = {
    'method': 'POST',
    'url': `https://app.terraform.io/api/v2/organizations/${organization}/registry-modules/${registryName}/${organization}/${moduleName}/${provider}/versions`,
    'headers': headers,
    body: JSON.stringify(data)
  };
  request(options, (error, response) => {
    if (error) {
      return callback({ error: error.error });
    } 
    return callback(JSON.parse(response.body))
  });
}

exports.modules = {
  updateVersionModuleApiCall,
  getParams,
  getToken
}

/***/ }),

/***/ 571:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

const core = __nccwpck_require__(512);
const fs = __nccwpck_require__(147)
const request = __nccwpck_require__(827);

const updateFileModuleApiCall = (url) => {

  let filePath = core.getInput('file_path');
  const fileStream = fs.readFileSync(filePath);

  const options = {
    'method': 'PUT',
    url: `${url}`,
    body: fileStream,
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  };

  return request(options, (error, response, body) => {
    if (error) {
      return { error }
    }
  })
}

exports.modules = {
  updateFileModuleApiCall
}


/***/ }),

/***/ 512:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 827:
/***/ ((module) => {

module.exports = eval("require")("request");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

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
const core = __nccwpck_require__(512);
const createVersion = __nccwpck_require__(140)
const uploadModule = __nccwpck_require__(571)

async function run() {
  try {
    createVersion.modules.updateVersionModuleApiCall((createVersionResponse) => {
       if (createVersionResponse.data) { 
        const uploadModuleResponse = uploadModule.modules.updateFileModuleApiCall(createVersionResponse.data.links.upload)
        if (!uploadModuleResponse.error) {
          return core.setOutput("response", JSON.stringify(createVersionResponse.data));
        }
        return core.setFailed({ error: uploadModuleResponse.error });
      }
  
    })
  }
  catch (error) {
     return core.setFailed({ error});
  }
}

run()
})();

module.exports = __webpack_exports__;
/******/ })()
;