import Tree from "./balanced-bst.js";

let data = [];

for (let i = 0; i < 20; i++) {
    data.push(Math.floor(Math.random() * 100));
}

let tree = Tree(data);
tree.buildTree();
console.log(tree.isBalanced());
tree.levelOrderForEach(console.log);
tree.preOrderForEach(tree.getRoot(), console.log);
tree.postOrderForEach(tree.getRoot(), console.log);
tree.inOrderForEach(tree.getRoot(), console.log);

for (let i = 0; i < 10; i++) {
    tree.insert(Math.floor(Math.random() * 100));
}

console.log(tree.isBalanced());
tree.balance(tree.getRoot());
console.log(tree.isBalanced());
tree.levelOrderForEach(console.log);
tree.preOrderForEach(tree.getRoot(), console.log);
tree.postOrderForEach(tree.getRoot(), console.log);
tree.inOrderForEach(tree.getRoot(), console.log);

tree.prettyPrint(tree.getRoot());