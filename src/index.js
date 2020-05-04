"use strict";
const fs = require('fs')
const path = require('path')

export default function GenerateEntry() {

  return {
    name: 'rollup-generate-entry',
    generateBundle({
      target = '/dist', 
      root = '/src', 
      exclude = ['index.tsx']
    }) {

      const targetPath = path.join(__dirname, `/${target}`)
      const rootPath = path.join(__dirname, `/${root}`)

      if(!fs.existsSync(rootPath)) {
        throw `Directory ${target} not found`
      }

      const files = fs.readdirSync(rootPath).filter(val => exclude.indexOf(val) === -1)
      
      let entryScript = ''

      const toCamelCaseVar = variable => 
        variable.replace(/(\_|\-)+[a-zA-Z]/g,
          (str, index) => index ? str.substr(-1).toUpperCase() : str
        )

      for(const i of files) {
        const camelName = toCamelCaseVar(i)
        entryScript += '\r\n' + `export { default as ${camelName} } from './${i}'`
      }

      if(!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath)
      }
      
      fs.writeFileSync(targetPath + '/index.js', entryScript)
    }
  }

}
