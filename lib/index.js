const core = require('@actions/core');
const createVersion = require('./updateVersion')
const uploadModule = require('./uploadFiles')

// const setGithubInput = (name, value) =>
//   process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = value;

async function run() {
  try {

    // setGithubInput("module_name", "test-haya-33")
    // setGithubInput("provider", "aws")
    // setGithubInput("registry_name", "private")
    // setGithubInput("organization", "wix-infragod")
    // setGithubInput("version", "5.5.1")
    // setGithubInput("file_path", "../module.tar.gz")
    // setGithubInput("token", "VyOw6GuKtEDbAg.atlasv1.ql07LNyomIHzOZuYPRuRuZea3ZZktKPNssHkvy2KLllsSnb789DxjyzvFMarlGQjCWw")




    createVersion.modules.updateVersionModuleApiCall((createVersionResponse) => {
      console.log( createVersionResponse.data.links.upload)
      if (createVersionResponse.data) { 
        const uploadModuleResponse = uploadModule.modules.updateFileModuleApiCall(createVersionResponse.data.links.upload)

        if (!uploadModuleResponse.error) {
          return core.setOutput("response", JSON.stringify(createVersionResponse.data));
        }
        return core.setFailed({ error: uploadModuleResponse.error });
      }
      
      
    })


    // if (createVersionResponse.data) {

    //   const uploadModuleResponse = uploadModule.modules.updateFileModuleApiCall(createVersionResponse.data.data.links.upload)
    //   if (!uploadModuleResponse.error) {
    //     return core.setOutput("response", JSON.stringify(createVersionResponse.data));
    //   }
    //   return core.setFailed({ error: uploadModuleResponse.error });

    // }
  }
  catch (error) {
    console.log(error)

    if (error.response) {
      return core.setFailed({ error: error.response.data });
    }
  }
}

run()