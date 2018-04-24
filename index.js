const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');
/**
 * Parse Arguments
 */
const minimist = require('minimist');
let args = minimist(process.argv.slice(2), {
  alias: {
    t: 'template_file',
    o: 'output_file',
    s: 'src',
    b: 'base_path'
  },
  default: {
    template_file: 'readme.template.md',
    output_file: 'readme.md',
    src: './src/',
    base_path: __dirname
  }
})

//set constants from arg
const SRC_PATH = args.s,
      TEMPLATE = args.t,
      OUTPUT = args.o,
      BASE_PATH = args.b;

const componentPath = path.join(BASE_PATH, SRC_PATH);
const renderer = new ReactDocGenMarkdownRenderer({
  componentsBasePath: BASE_PATH
});
//output path
const readmeFile = path.join(BASE_PATH, OUTPUT);

//empty file
fs.writeFileSync(readmeFile, '');

fs.appendFileSync(readmeFile, fs.readFileSync(path.join(BASE_PATH, TEMPLATE)))

//loop through all files in path
fs.readdirSync(componentPath).forEach(file => {
  //only do jsx files
  if(file.indexOf('.jsx') === -1) return;
  //console.log("file", file);
  const content = fs.readFileSync(path.join(componentPath, file));
  //read each file
  const doc = reactDocgen.parse(content);

  //append the results to the file
  fs.appendFileSync(readmeFile, renderer.render(
  /* The path to the component, used for linking to the file. */
  `${componentPath}${file}`,
  /* The actual react-docgen AST */
  doc,
  /* Array of component ASTs that this component composes*/
  []))
});