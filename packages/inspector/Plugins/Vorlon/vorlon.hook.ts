import hooks from 'hooks';

// Add hooks' methods: `hook`, `pre`, and `post`
const doc = document;
const head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;

for (var k in hooks) {
  head[k] = hooks[k];
}

// document.pre('createElement', function (next) {
//   debugger;
//   console.log("hello");
//   return next();
// }).pre('createElement', function (next) {
//   console.log("world");
//   return next();
// });

(<any>head).pre('appendChild', function (next, node) {
  if ( node instanceof HTMLElement ) {
    if (node.tagName == 'LINK') {
      // node.type = 'text/css';
      // node.ref = 'stylesheet';
      // node.href = 'https://xxxx/index.css';
    } else if (node.tagName == 'SCRIPT') {
      // 需要判断是否为 jsonp
      console.log(node);
      // node.type = 'text/javascript';
      // node.src = 'https://xxxx/index.js';
    }
  }
  return next();
});