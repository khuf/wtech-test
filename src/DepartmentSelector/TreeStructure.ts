export interface Department {
    id: number;
    title: string;
    color: string;
    parentId: number | null; //absent for root nodes
}

export class TreeNode<T> {
    id: number;
    data: T;
    selected: boolean = false;
    children: TreeNode<T>[];

    constructor(id: number, data: T, selected: boolean = false, children: TreeNode<T>[] = []) {
        this.id = id;
        this.data = data;
        this.children = children;
        if (children.length === 0) {
            this.selected = selected;
        }
    }

    addChild(childNode: TreeNode<T>) {
        this.children.push(childNode);
    }

    isLeaf() {
        return this.children.length === 0;
    }

    leafNodeCount() {
        let count = 0;
        if (this.children) {
            this.children.forEach(node => {
                if (node.isLeaf()) {
                    count += 1;
                }
                count += node.leafNodeCount();
            })
        }
        return count;
    }

    selectedLeafNodesCount() {
        let ids: number[] = [];
        if (!this.isLeaf()) {
            this.children.forEach(node => {
                if (node.isLeaf()) {
                    if (node.selected) {
                        ids.push(node.id);
                    }
                }
                else {
                    ids = ids.concat(node.selectedLeafNodesCount());
                }
            });
        }
        return ids;
    }

      //Same as the two above, but does both counts in one traversal...
      leafNodeCounts() {
        let selectedCount = 0;
        let leafNodeCount = 0;
        if (!this.isLeaf()) {
            this.children.forEach(child => {
                if (child.isLeaf()) {
                    leafNodeCount += 1;
                    if (child.selected) {
                        selectedCount += 1;
                    }
                }
                else {
                    const [childSelectedCount, childLeafCount] = child.leafNodeCounts();
                    selectedCount += childSelectedCount;
                    leafNodeCount += childLeafCount;
                }
            })
        }
        return [selectedCount, leafNodeCount];
    }
}

//Revisit later
export const createDepartmentTree = (departments: Department[], selectedDepartmentIds: number[] = []) => {
    const nodes: Map<number, TreeNode<Department>> = new Map();
    let roots: TreeNode<Department>[] = [];

    // create nodes for each department
    departments.forEach(dept => {
        const selected = selectedDepartmentIds.find(id => dept.id == id) !== undefined;
        nodes.set(dept.id, new TreeNode(dept.id, dept, selected));
    });

    // build the tree
    departments.forEach(dept => {
        const node = nodes.get(dept.id);
        // it's a root node
        if (dept.parentId === null) {
            if (node) {
                roots.push(node);
            }
        } else {
            const parentNode = nodes.get(dept.parentId);
            console.debug(`Found parent ${dept.parentId}, pushing ${node} to ${parentNode}`);
            if (parentNode && node) {
                parentNode.addChild(node);
            }
        }
    });

    return roots;
};