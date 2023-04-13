import './styles.css';

// clusters:
// [3, 5, 10, 11]
// [55, 60, 62]
// add number to cluster: 17

class TreeNode {
    value;
    left;
    right;

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
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
}



class LinkedListElement {
    value = null;
    nextMember = null;
    previousMember = null;

    constructor(value, nextMember, previousMember) {
        this.value = value;
        this.nextMember = nextMember;
        this.previousMember = previousMember;
    }
}

class LinkedList {
    #head = null;
    #tail = null;

    getCount() {
        let currentMember = this.#head;
        let counter = 0;
        while (currentMember != null) {
            counter += 1;
            currentMember = currentMember.nextMember;
        }
        return counter;
    }

    addToTail(value) {
        let newMember = null;
        console.log('adding ' + value);
        if(this.#head === null) {
            this.#head = new LinkedListElement(value, null, null);
            this.#tail = this.#head;
        } else if(this.#head.nextMember === null) {
            newMember = new LinkedListElement(value, null, this.#head);
            this.#head.nextMember = newMember;
        } else {
            newMember = new LinkedListElement(value, null, this.#tail)
            this.#tail.nextMember = newMember;
        }
        this.#tail = newMember;
    }

    toArray() {
        let currentMember = this.#head
        const array = [];
        while(currentMember !== null) {
            array.push(currentMember);
            currentMember = currentMember.nextMember;
        }
        return array;
    }

    remove(positionInLine) {
        let currentMemeber = this.#head;
        let nextInLine = this.#head;
        let previousInLine = this.#head;
        let counter = 1;

        if (counter === positionInLine) {
            this.#head = this.#head.nextMember;
            this.#head.previousMember = null
            currentMemeber = null;
            return
        } else {
            while (counter !== positionInLine) {
                if (currentMemeber.nextMember.nextMember === null && positionInLine === counter + 1) {
                    currentMemeber = currentMemeber.nextMember;
                    previousInLine = currentMemeber.previousMember
                    currentMemeber = null;
                    previousInLine.nextMember = null;
                    return;
                } else if (counter + 1 === positionInLine) {
                    currentMemeber = currentMemeber.nextMember
                    nextInLine = currentMemeber.nextMember;
                    nextInLine.previousMember = currentMemeber.previousMember;
                    currentMemeber.previousMember.nextMember = nextInLine;
                    currentMemeber = null;
                    return;
                } else {
                    currentMemeber = currentMemeber.nextMember;
                    nextInLine = currentMemeber.nextMember;
                    counter += 1;
                }
            }
        }
    }

    reverse() {
        let currentMemeber = this.#head
        let nextInLine = null;
        let previousInLine = null;
        while (currentMemeber !== null) {
            nextInLine = currentMemeber.nextMember;
            currentMemeber.nextMember = previousInLine;
            if (currentMemeber.previousMember === null) {
                currentMemeber.previousMember = nextInLine;
                previousInLine = currentMemeber;
                currentMemeber = nextInLine;
            } else {
                currentMemeber.previousMember = nextInLine;
                previousInLine = currentMemeber;
                currentMemeber = nextInLine;
            }
        }
        this.#head = previousInLine;
        return
    }

    switchPositions(leftElement, rightElement) {
        let leftNextInLine = leftElement.nextMember;
        let leftPreviousInLine = leftElement.previousMember;

        let rightNextInLine = rightElement.nextMember;
        let rightPreviousInLine = rightElement.previousMember;

        if (leftElement === this.#head) {
            this.#head = rightElement;
        } else if (rightElement === this.#head) {
            this.#head = leftElement;
        }

        if (leftElement === this.#tail) {
            this.#tail = rightElement;
        } else if (rightElement === this.#tail) {
            this.#tail = leftElement;
        }

        if (leftElement.nextMember === rightElement) {
            if (leftPreviousInLine) {
                leftPreviousInLine.nextMember = rightElement;
            }
            if (rightNextInLine) {
                rightNextInLine.previousMember = leftElement;
            }
            leftElement.nextMember = rightNextInLine;
            leftElement.previousMember = rightElement;
            rightElement.nextMember = leftElement;
            rightElement.previousMember = leftPreviousInLine;

            return;
        }

        leftElement.nextMember = rightNextInLine;
        leftElement.previousMember = rightPreviousInLine;

        rightElement.nextMember = leftNextInLine;
        rightElement.previousMember = leftPreviousInLine;

        if (rightNextInLine) {
            rightNextInLine.previousMember = leftElement;
        }
        if (rightPreviousInLine) {
            rightPreviousInLine.nextMember = leftElement;
        }
        if (leftNextInLine) {
            leftNextInLine.previousMember = rightElement
        }
        if (leftPreviousInLine) {
            leftPreviousInLine.nextMember = rightElement;
        }

        return;
    }

    addBetween(previousElement, nextElement, value) {
        let newMember = null;

        if (previousElement.nextMember.value === nextElement.value && nextElement.previousMember.value === previousElement.value) {
            newMember = new LinkedListElement(value, nextElement, previousElement);
            previousElement.nextMember = newMember;
            nextElement.previousMember = newMember;
            return;
        } else {
            return console.log('elements are not next to each other')
        }
    }
}

// clusters:
// [3, 5, 10, 11]
// [55, 60, 62]
// add number to cluster: 17

const clusterOne = new LinkedList();
clusterOne.addToTail(3);
clusterOne.addToTail(5);
clusterOne.addToTail(10);
clusterOne.addToTail(11);


const clusterTwo = new LinkedList();
clusterTwo.addToTail(55);
clusterTwo.addToTail(60);
clusterTwo.addToTail(62);


const ClusterTree = new BinaryTree();

ClusterTree.insert(clusterOne.toArray());
ClusterTree.insert(clusterTwo.toArray());

console.log(ClusterTree);