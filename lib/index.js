const core = require('@actions/core');
const createModule = require('./updateVersion')
const uploadModule = require('./uploadFiles')

const setGithubInput = (name, value) =>
  process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = value;

async function run() {
  try {
    const response = await createModule.modules.updateVersionModuleApiCall()
    if (response.data) {
      core.setOutput("response", JSON.stringify(response.data));

      // upload files
      console.log(response.data.data.links.upload)

      uploadModule.modules.updateFileModuleApiCall(response.data.data.links.upload)
    }
  }
  catch (error) {
    if (error.response) { 
      core.setFailed({ status: error.response.status, data: error.response.data });
    }
  }
}

run()