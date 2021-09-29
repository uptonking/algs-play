import { TreeNode } from './binary-tree.mjs';
import { BinaryTree, printTree, printTree2 } from './utils/tree-print.mjs';
// 用于测试的二叉树
//     3
//    /  \
//   9    20
//       /  \
//     15    7
const root0 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);
printTree2(new BinaryTree(root0));
console.log(';;manual-root0: ', root0);

/**
 * AVL树是指左右子树深度差不超过1的二叉树；
 * 思路： 自顶向下的比较每个节点的左右子树的最大高度差，如果二叉树中每个节点的左右子树最大高度差
 * 小于等于 1 ，即每个子树都平衡时，此时二叉树才是平衡二叉树
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/44
 */
export function isBalanced(root) {
  if (!root) {
    // 空树
    return true;
  }

  const getDepth = (node) => {
    if (!node) return -1;
    return Math.max(getDepth(node.left), getDepth(node.right)) + 1;
  };

  return (
    Math.abs(getDepth(root.left) - getDepth(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
}

/**
 * 给定一个二叉树，找出其最大深度。
 * 深度为根节点到最远叶子节点的最长路径上的节点数。
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/42
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
 */
export function maxDepth(root) {
  if (!root) {
    return 0;
  }

  return Math.max(maxDepth(root.left), maxDepth(root.right));
}

/**
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先
 * https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/43
 */
export function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (!left) return right;
  if (!right) return left;

  return root;
}

/**
 * 给定一个二叉树, 找到该树中两个指定节点间的最短距离。
 * 思路：a.找到最近公共祖先lca节点； b.分别求出两节点到lca的距离； c.
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/82
 */
export function shortestDistance(root, p, q) {
  const lowestCA = lowestCommonAncestor(root, p, q);

  const pDis = [];
  const qDis = [];

  getPath(lowestCA, p, pDis);
  getPath(lowestCA, q, qDis);

  return pDis.length + qDis.length;
}

/**
 * 计算根节点root到节点node的路径
 */
export function getPath(root, node, paths) {
  if (root === node) return true;
  paths.push(root);

  let hasFound = false;
  if (root.left !== null) {
    hasFound = getPath(root.left, node, paths);
  }
  if (root.right !== null) {
    hasFound = getPath(root.right, node, paths);
  }

  if (hasFound === false) {
    // 如果没找到，说明不在这里节点的子树
    paths.pop();
  }
  return hasFound;
}

/**
 * 给定一个二叉树，检查它是否是镜像对称的
 * https://leetcode-cn.com/problems/symmetric-tree/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/53
 * 比较二叉树的 前序遍历 和 对称前序遍历 来判断是不是对称的。
 */
export function isSymmetric(root) {
  const checkSymmetric = (r1, r2) => {
    if (r1 === null && r2 === null) return true;
    if (r1 === null || r2 === null) return false;
    if (r1.val !== r2.val) return false;

    return (
      checkSymmetric(r1.left, r2.right) && checkSymmetric(r1.right, r2.left)
    );
  };

  return checkSymmetric(root, root);
}

/**
 * 翻转二叉树。二叉树的左右子树交换
 * 从根节点开始依次遍历每个节点，然后交换左右子树既可
 * https://leetcode-cn.com/problems/invert-binary-tree/
 */
export function invertTree(root) {
  if (!root) return null;

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
}
// * 如果使用序列化的节点，输出的反转后的二叉树只有数据，却丢失了TreeNode类型信息
// const invertedTree = invertTree(JSON.parse(JSON.stringify(root0)));
const invertedTree = invertTree(root0);
console.log(';;invertedTree ');
printTree2(new BinaryTree(invertedTree));

/**
 * 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
 *
 * https://leetcode-cn.com/problems/path-sum/
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/45
 */
export function hasPathSum(root, targetSum) {
  if (!root) {
    return false;
  }

  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }

  targetSum = targetSum - root.val;

  return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
}

/**
 * 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
 * https://leetcode-cn.com/problems/path-sum-ii/
 * https://github.com/Chocolate1999/leetcode-javascript/issues/54
 * dfs，进行深度优先遍历，一直遍历到子节点为止，进行一次判断，如果当前 sum为 0 ，那么就是我们想要的结果，
 * 然后注意js语法中形参如果是数组，那么我们拿到的是引用值，可以拷贝一份。
 */
export function pathSum(root, targetSum) {
  if (!root) {
    return [];
  }

  const result = [];

  const dfs = (node, sum, path) => {
    if (!node) {
      return 0;
    }

    path = [...path, node.val];
    sum = sum - node.val;

    if (!node.left && !node.right && sum === 0) {
      result.push(path);
      return;
    }

    node.left && dfs(node.left, sum, path);
    node.right && dfs(node.right, sum, path);
  };

  dfs(root, targetSum, []);

  return result;
}