# rollup-generate-entry
A Rollup plugin for component libary code splitting

## Install
Use **yarn** or **npm** to manage your package
```
npm install rollup-generate-entry --save-dev
#or
yarn add rollup-generate-entry --dev
```

## Why
When we try to create a component libary project and have the directory like this
```
src
|
|--componentA
|
|--componentB
|
|--index.tsx
...
```
This plugin can generate entry file in output directory by traversing folder in component directory,
we can complie product of the same structure in rollup, and need a entry file to export the splitted component for effect of tree shaking, but it always pack a file which include all componentent through the entry file that like **index.tsx**.

## Usage
 Import the plugin in `rollup.config.js`
 ```js
 import GenerateEntry from 'rollup-generate-entry';

 export default [{
   input: 'main-a.js',
   output: {
     file: 'dist/bundle-a.js',
     format: 'cjs'
   },
   plugins: [GenerateEntry()]
 }, {
   input: 'main-b.js',
   output: [
     {
       file: 'dist/bundle-b1.js',
       format: 'cjs'
     }
   ],
   plugins: [GenerateEntry()]
 }];
 ```
Perhaps, you can use [rollup-plugin-multi-entry](https://github.com/rollup/rollup-plugin-multi-entry) to support multiple input files

## Options
### `target`
Type: `String`  
Default: '/dist'  
### `root`
Type: `String`  
Default: '/src'  
### `exclude`
Type: `Array<string>`  
Default: \['componentA'\]   

Ignore some folder in component directory
