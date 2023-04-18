import './styles.css';

class TreeNode {
    value;
    left;
    right;
    first;
    last;

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.first = value[0];
        this.last = value[value.length - 1]
    }
}

class BinaryTree {
    root;

    constructor() {
        this.root = null;
    }

    insert(cluster) {
        let newNode = new TreeNode(cluster);

        if(this.root === null)
            this.root = newNode;
        else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if(newNode.value[0] < node.value[0]) {
            if(node.left === null)
                node.left = newNode;
            else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if(node.right === null)
                node.right = newNode;
            else {
                this.insertNode(node.right,newNode);
            }
        }
    }

    insertNumber(node, value) {
        if(node === null) {
            return null;
        }
        else if(value < node.first) {
            if(node.left) {
                return this.insertNumber(node.left, value);
            } else {
                this.insert([value]);
            }
        }
        else if(value > node.first && value <= node.last) {
            console.log(node)
            let foundNumber = node.value.find(member => member === value)
            if(foundNumber) {
                return foundNumber
            } else if (this.canJoinCluster(node, value)) {
                let index = node.value.findIndex(element => element > value)
                node.value.splice(index, 0, value);
                return;
            }
        }
        else if(value > node.first && value > node.last) {
            if (node.right === null) {
                if (this.canJoinCluster(node, value)) {
                    node.value.push(value);
                    node.last = value;
                    return;
                } else {
                    this.insert([value]);
                    return;
                }
            } else {
                return this.insertNumber(node.right, value);
            }
        }
        else {
            console.log(node)
            return node.first;
        }
    }

    canJoinCluster(node, value) {
        return node.value.find(member => Math.abs(member - value) <= 5)
    }
}

// clusters:
// [3, 5, 10, 11]
// [55, 60, 62]
// add number to cluster: 17

const ClusterTree = new BinaryTree();

ClusterTree.insert([3, 5, 10, 11]);
ClusterTree.insert([55, 60, 62]);
ClusterTree.insert([20, 23, 26]);
ClusterTree.insert([155, 160, 162]);

ClusterTree.insertNumber(ClusterTree.root, 1)
ClusterTree.insertNumber(ClusterTree.root, 2)
ClusterTree.insertNumber(ClusterTree.root, 33)
ClusterTree.insertNumber(ClusterTree.root, 34)

console.log(ClusterTree);