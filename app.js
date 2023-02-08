let message = "hello";
message = 123456;

let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;

let num1 = prompt('birinchi raqamni yozing');

let num2 = prompt('ikkinchi raqamni yozing');

alert(num1 - num2);


var x = prompt("Enter a Value", "0");
var y = prompt("Enter a Value", "0");


console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992







let name = "Ilya";

alert(`hello ${name}`);


let n = 123;
n = 12.345;



alert('Hello');
alert('World');

// window.open('https://javascript.info');


// button.onclick = () => {
//   window.open('https://javascript.info');
// };



try {

  alert('Start of try runs');

  alert('End of try runs');

} catch (err) {

  alert('Catch is ignored, because there are no errors');

}


alert(2 + 2 + '1');




let accessAllowed;
let age = prompt('How old are you?', '');

if (age > 18) {
  accessAllowed (age > 18) = true;
} else {
  accessAllowed = false;
}

alert(accessAllowed);







































const { ESLint } = require('eslint');

const cli = new ESLint();

// This lets us abort if we've already run a stage for all files
const completedStages = new Set();

// if a lot of files are changed, it's faster to run prettier/eslint on the
// whole project than to run them on each file separately
module.exports = {
  '*.(js|ts|tsx)': async files => {
    if (completedStages.has('js')) return [];

    const ignoredIds = await Promise.all(
      files.map(file => cli.isPathIgnored(file))
    );
    const lintableFiles = files.filter((_, i) => !ignoredIds[i]);
    if (files.length > 10) {
      completedStages.add('js');
      return ['eslint --max-warnings=0 --cache --fix .', 'prettier --write .'];
    } else {
      return [
        'eslint --max-warnings=0 --cache --fix ' + lintableFiles.join(' '),
        ...files.map(filename => `prettier --write '${filename}'`)
      ];
    }
  },
  '*.!(js|ts|tsx)': files => {
    if (completedStages.has('not-js')) return [];

    if (files.length > 10) {
      completedStages.add('not-js');
      return 'prettier --write .';
    } else {
      return files.map(
        filename => `prettier --write --ignore-unknown '${filename}'`
      );
    }
  },

  './curriculum/challenges/**/*.md': files => {
    if (completedStages.has('markdown')) return [];

    if (files.length > 10) {
      completedStages.add('markdown');
      return 'npm run lint:challenges';
    } else {
      return files.map(
        filename => `node ./tools/scripts/lint/index.js '${filename}'`
      );
    }
  }
};