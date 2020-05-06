"use strict";
const fs = require('fs')
const path = require('path')

export default function GenerateEntry({
  target = '/dist', 
  root = '/src', 
  exclude = ['index.tsx'],
  namingRule
}) {

  return {
    name: 'rollup-generate-entry',
    generateBundle() {

      const targetPath = path.join(__dirname, `/${target}`)
      const rootPath = path.join(__dirname, `/${root}`)

      if(!fs.existsSync(rootPath)) {
        throw `Directory ${target} not found`
      }

      const files = fs.readdirSync(rootPath).filter(val => {
        return exclude.indexOf(val) === -1 && fs.lstatSync(rootPath + '\\' + val).isDirectory()
      })
      
      let entryScript = ''

      const toCamelCaseVar = variable => {
        let word = variable.replace(/(\_|\-)+[a-zA-Z]/g,
          (str, index) => index >= 0 ? str.substr(-1).toUpperCase() : str
        )
        if(namingRule === 'upper') {
          word = word.replace(/^[a-zA-Z]/g, 
            (str, index) => index >= 0 ? str.toUpperCase() : str
          )
        }
        return word
      }

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
