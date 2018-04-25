const path = require('path');
const fs = require('fs');
const readline = require('readline');
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

//set up reading template file
const rl = readline.createInterface({
  input: fs.createReadStream(path.join(BASE_PATH, TEMPLATE)),
  crlfDelay: Infinity
});


//clean ouptut file if exists already
fs.writeFileSync(readmeFile, '');

//read the template line by line, 
rl.on('line', line => {
  //check if line is our special write marker
  if(line === '<COMPONENT PROPS>') {
    writeProps();
  } else {
    //just write the line
    fs.appendFileSync(readmeFile, `${line}\n`);
  }
})

//writes the props
function writeProps() {
  //loop through all files in path
  fs.readdirSync(componentPath).forEach(file => {
    //only do jsx files
    if(file.indexOf('.jsx') === -1) return;
    //append the results to the file
    fs.appendFileSync(readmeFile, renderer.render(
      /* The path to the component, used for linking to the file. */
      `${componentPath}${file}`,
      /* The actual react-docgen AST */
      reactDocgen.parse(fs.readFileSync(path.join(componentPath, file))),
      /* Array of component ASTs that this component composes*/
      []
    ))
  });
}