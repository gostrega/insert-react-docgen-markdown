# insert-react-docgen-markdown
Command line wrapper for [react-docgen-markdown-renderer](https://github.com/OriR/react-docgen-markdown-renderer)

## Install
```
npm install --save-dev insert-react-docgen-markdown
```
Or, with yarn
```
yarn add -D insert-react-docgen-markdown
```

## Usage
Once installed you can run from the command line, 
```node node_modules/insert-react-docgen-markdown/index.js -b ./ -s ./src/```

Or, add to your package.json scripts
```javascript
{
  "docs": "node node_modules/insert-react-docgen-markdown/index.js -b ./ -s ./src/",
}
```
Then run as
```yarn docs```

## Arguments
|Arg            |Shortcut |Default           |Description|
|---------------|---------|------------------|----|
|--template_file|-t       |readme.template.md|Name of the readme template file|
|--output_file  |-o       |readme.md         |Name of the file to write to(will create if does not exist)| 
|--src          |-s       |./src/            |path to your component files|
|--base_path    |-b       |                  |relative or absolute path to work from|


## Examples

#### Template File - readme.template.md
```
My Components

Definitions:
<COMPONENT PROPS>

More text
```

#### Command
```node node node_modules/insert-react-docgen-markdown/index.js -b ./ -s ./src/```
Assumes the components are in the src/ directory
Sets the base path to current working directory
uses default file names

#### Output - readme.md
```
My Components

Definitions:
## component

From [`src/component.jsx`](src/component.jsx)

My Component description

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**text** | `String` |  | :white_check_mark: | my string prop

More text
```