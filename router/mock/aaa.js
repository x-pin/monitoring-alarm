// export default {
//     fff: 'yxf'
// }

module.exports = {
  name: 'aaa'
}

module.exports.runTest = async function () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('ccccs')
    }, 3000)
  })
}