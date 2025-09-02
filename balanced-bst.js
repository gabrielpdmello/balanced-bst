function Node(data) {
  let left = null;
  let right = null;
  return { data, left, right };
}

function Tree(data) {
  let root = null;

  function compareNumbers(a, b) {
    return a - b;
  }

  function removeDuplicates(array) {
    let uniques = {};
    return array.filter((item) => {
      return uniques.hasOwnProperty(item) ? false : (uniques[item] = true);
    });
  }

  function buildTreeRecur(arr, start, end) {
    if (start > end) return null;
    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);
    root.left = buildTreeRecur(arr, start, mid - 1);
    root.right = buildTreeRecur(arr, mid + 1, end);
    return root;
  }

  function buildTree(array = data) {
    let data = array.sort(compareNumbers);
    data = removeDuplicates(data);
    root = buildTreeRecur(data, 0, data.length - 1);
    return root;
  }

  function getRoot() {
    return root;
  }

  function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  function insert(value) {
    let currentNode = root;

    while (true) {
      if (currentNode.data === value) {
        return;
      }
      if (value < currentNode.data) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
        } else {
          currentNode.left = Node(value);
          return;
        }
      } else if (value > currentNode.data) {
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
        } else {
          currentNode.right = Node(value);
          return;
        }
      }
    }
  }

  function getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  function deleteItemRec(root, x) {
    if (root === null) {
      return root;
    }

    if (root.data > x) {
      root.left = deleteItemRec(root.left, x);
    } else if (root.data < x) {
      root.right = deleteItemRec(root.right, x);
    } else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;
      let succ = getSuccessor(root);
      root.data = succ.data;
      root.right = deleteItemRec(root.right, succ.data);
    }
    return root;
  }

  function deleteItem(value) {
    let newRoot = deleteItemRec(root, value);
    console.log(newRoot);
    if (newRoot) {
      root = newRoot;
    }
  }

  function find(value) {
    let currentNode = root;

    while (true) {
      if (currentNode.data === value) {
        return currentNode;
      }
      if (value < currentNode.data) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
        } else {
          return false;
        }
      } else if (value > currentNode.data) {
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
        } else {
          return false;
        }
      }
    }
  }

  function levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }
    let queue = [];
    queue.push(root);
    while (queue.length) {
      let currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  function inOrderForEach(root, callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }
    if (root === null) return;
    preOrderForEach(root.left, callback);
    callback(root);
    preOrderForEach(root.right, callback);
  }

  function preOrderForEach(root, callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }
    if (root === null) return;
    callback(root);
    preOrderForEach(root.left, callback);
    preOrderForEach(root.right, callback);
  }

  function postOrderForEach(root, callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }
    if (root === null) return;
    preOrderForEach(root.left, callback);
    preOrderForEach(root.right, callback);
    callback(root);
  }

  function height(value) {
    const root = find(value);

    function getHeight(root) {
      if (!root) {
        return -1;
      }
      let leftHeight = getHeight(root.left);
      let rightHeight = getHeight(root.right);

      return 1 + Math.max(leftHeight, rightHeight);
    }

    return getHeight(root);
  }

  function depth(value) {
    let currentNode = root;
    let depth = 0;

    while (true) {
      if (currentNode.data === value) {
        return depth;
      }
      if (value < currentNode.data) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
          depth++;
        } else {
          return false;
        }
      } else if (value > currentNode.data) {
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
          depth++;
        } else {
          return false;
        }
      }
    }
  }

  function isBalancedRec(root) {
    if (root === null) return 0;
    let lHeight = isBalancedRec(root.left);
    let rHeight = isBalancedRec(root.right);
    if (lHeight === -1 || rHeight === -1 || Math.abs(lHeight - rHeight) > 1)
      return -1;
    return Math.max(lHeight, rHeight) + 1;
  }

  function isBalanced() {
    return isBalancedRec(root) > 0;
  }

  function storeInorder(root, nodes) {
    if (root === null) return;
    storeInorder(root.left, nodes);
    nodes.push(root.data);
    storeInorder(root.right, nodes);
  }

  function balance(root) {
    let nodes = [];
    storeInorder(root, nodes);
    return buildTree(nodes);
  }

  return {
    buildTree,
    prettyPrint,
    getRoot,
    insert,
    deleteItem,
    find,
    levelOrderForEach,
    inOrderForEach,
    preOrderForEach,
    postOrderForEach,
    height,
    depth,
    isBalanced,
    balance,
  };
}

export default Tree;
