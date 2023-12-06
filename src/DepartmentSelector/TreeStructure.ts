export interface Department {
    id: string;
    title: string;
    color: string;
    parentId: string | null; //absent for root nodes
}


interface TreeItemData {
    id: string;
}

export class TreeNode<T extends TreeItemData> {
    data: T;
    selected: boolean = false;
    children: TreeNode<T>[];

    constructor(data: T, selected: boolean = false, children: TreeNode<T>[] = []) {
        this.data = data;
        this.children = children;
        if (children.length === 0) {
            this.selected = selected;
        }
    }

    isLeaf() {
        return this.children.length === 0;
    }

    descendantCount() {
        let count = 0;
        if (this.children) {
            this.children.forEach(node => {
                count += 1;
                count += node.descendantCount();
            })
        }
        return count;
    }

    selectedDescendantIds() {
        let ids: string[] = [];
        if (!this.isLeaf()) {
            this.children.forEach(node => {
                if (node.isLeaf()) {
                    if (node.selected) {
                        ids.push(node.data.id);
                    }
                }
                else {
                    ids = ids.concat(node.selectedDescendantIds());
                }
            });
        }
        return ids;
    }
}

//Revisit later
export const createTree = (departments: Department[], selectedDepartmentIds: string[] = []) => {
    const nodes: Map<string, TreeNode<Department>> = new Map();
    let roots: TreeNode<Department>[] = [];

    // create nodes for each department
    departments.forEach(dept => {
        console.log("Adding node: ", dept.id);
        const selected = selectedDepartmentIds.find(id => dept.id == id) !== undefined;
        nodes.set(dept.id, new TreeNode(dept, selected));
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
            console.log(`Found parent ${dept.parentId}, pushing ${node} to ${parentNode}`);
            if (parentNode && node) {
                parentNode.children.push(node);
            }
        }
    });

    return roots;
};