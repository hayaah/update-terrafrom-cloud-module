// const axios = require('axios');
// const createModule = require('../lib/createModule');

// const mockedUrl = "https://app.terraform.io/api/v2/organizations/infragod-test/registry-modules"
// const mockedSuccessRes = {
//   "data":
//   {
//     "id": "mod-NeV9qPYFVpGLTJvZ",
//     "type": "registry-modules",
//     "attributes":
//     {
//       "name": "module-Name-100",
//       "namespace": "wix-infragod",
//       "provider": "aws",
//       "status": "pending",
//       "version-statuses": [],
//       "created-at": "2022-02-06T04:03:00.646Z",
//       "updated-at": "2022-02-06T04:03:00.646Z",
//       "registry-name": "private",
//       "permissions": { "can-delete": true, "can-resync": true, "can-retry": true }
//     },
//     "relationships": {
//       "organization":
//         { "data": { "id": "wix-infragod", "type": "organizations" } }
//     },
//     "links": {
//       "self": ""
//     }
//   }
// }

// const mockedFailerRes = {
//   "errors": [
//     "Not found"
//   ],
//   "success": false
// }

// jest.mock("axios");

// const mockCreateModuleApi = async () => {
//   await axios.post.mockImplementation((url) => {
//     if (url == mockedUrl) {
//       return Promise.resolve(mockedSuccessRes)
//     }
//     return Promise.resolve(mockedFailerRes)
//   });
// }

// const setGithubInput = (name, value) =>
//   process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = value;

// describe("test getting variables from the action workflow", () => {

//   test('check if module_name was set successfully / should succeed', (done) => {
//     setGithubInput("module_name", "module_name")
//     const params = createModule.modules.getParams()
//     expect(params.moduleName).toStrictEqual("module_name")
//     done()
//   })

//   test('check if provider was not set / should fail', (done) => {
//     const params = createModule.modules.getParams()
//     expect(params.provider).not.toBe("aws")
//     done()
//   })
// })

// describe("test gcalling create module api", () => {

//   test('check if the url is missing organazation / should fail', async (done) => {
//     await mockCreateModuleApi()
//     const res = await createModule.modules.createModuleApiCall()
//     expect(res).toEqual(mockedFailerRes)
//     done()
//   })

//   test('check if the url is set correctly', async (done) => {
//     setGithubInput("organization", "infragod-test")
//     await mockCreateModuleApi()
//     const res = await createModule.modules.createModuleApiCall()
//     expect(res).toEqual(mockedSuccessRes)
//     done()
//   })
// })
