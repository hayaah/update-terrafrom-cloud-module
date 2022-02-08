const core = require('@actions/core');
const createVersion = require('./updateVersion')
const uploadModule = require('./uploadFiles')

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