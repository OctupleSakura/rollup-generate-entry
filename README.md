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
We can complie product of the same structure in rollup, we need a entry file to export the splitted component for effect of tree shaking, but it always pack a file which include all componentent through the entry file that like **index.tsx**
