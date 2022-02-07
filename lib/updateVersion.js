const axios = require('axios');
const core = require('@actions/core');

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
  
  const response = await axios.post(`https://app.terraform.io/api/v2/organizations/${organization}/registry-modules/${registryName}/${organization}/${moduleName}/${provider}/versions`, 
    data, {
    headers: headers
  })

  return response
}

exports.modules = {
  updateVersionModuleApiCall,
  getParams
}