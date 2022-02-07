const axios = require('axios');
const FormData = require('form-data');
const core = require('@actions/core');
const fs = require('fs')

const getToken = () => {
    return core.getInput('token')
  }

const updateFileModuleApiCall = async (uploadLink) => {

    const filePath = core.getInput('file_path');

 
    const fileStream = fs.createReadStream(filePath);
    const formData = new FormData();
 
 

    formData.append('largeFile', fileStream, 'module.zip');

    
    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${getToken()}`
      }
  
      
    const response = await axios.put(uploadLink, formData, { headers })

    console.log(response)
    console.log(response.data)

}

exports.modules = {
    updateFileModuleApiCall 
}