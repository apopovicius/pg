/*
BFS - Breadth First Search
DFS - Depth First Search


      3
     . .
    .   .
   9    20
  . .     .
 .   .     .
15    7     13

output bfs: 3,9,20,15,7,13
output dfs-pre-order: 3,9,15,7,20,13  - node, left,  right
output dfs-in-order: 15,9,7,3,20,13   - left, node,  right
output dfs-post-order: 15,7,9,13,20,3 - left, right, node
*/

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.left.left = new TreeNode(15);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(13);

const bfs = (root) => {
    let queue = [root]; // queue.push(root);

    while (queue.length > 0) {
        node = queue.shift(); // FIFO
        console.log(node.value);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
};

// DFS Pre-order Node → Left → Right
const dfsPreOrder = (root) => {
    let stack = [];
    stack.push(root);

    while (stack.length > 0) {
        node = stack.pop(); // LIFO
        console.log(node.value);

        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
};

//DFS Post-order Left → Right → Node
const dfsPostOrder = (root) => {
    if (!root) return;

    let stack1 = [root];
    let stack2 = [];

    while (stack1.length > 0) {
        const node = stack1.pop();
        stack2.push(node);

        if (node.left) stack1.push(node.left);
        if (node.right) stack1.push(node.right);
    }

    // Now reverse post-order in stack2
    while (stack2.length > 0) {
        const node = stack2.pop();
        console.log(node.value);
    }
};

//DFS In-order Left → Node → Right
const dfsInOrder = (root) => {
    let stack = [];
    let current = root;

    while (stack.length > 0 || current !== null) {
        if (current !== null) {
            stack.push(current);
            current = current.left;
        } else {
            current = stack.pop();
            console.log(current.value);
            current = current.right;
        }
    }
};

console.log('BFS');
bfs(root);

console.log('DFS pre order(node-left-right');
dfsPreOrder(root);

console.log('DFS in order(left-node-right');
dfsInOrder(root);

console.log('DFS post order(left-right-node');
dfsPostOrder(root);
