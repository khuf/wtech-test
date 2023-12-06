import React, { useEffect, useState } from "react";

export interface Department {
    id: string;
    title: string;
    color: string;
    parentId: string | null; //absent for root nodes
}

interface Props {
    departments: Department[];
    selectedDepartmentIds?: string[];
}

class TreeNode<T> {
    data: T;
    children: TreeNode<T>[];

    constructor(data: T, children: TreeNode<T>[] = []) {
        this.data = data;
        this.children = children;
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
}


export default function DepartmentSelector(props: Props) {

    const [tree, setTree] = useState<TreeNode<Department>[]>([]);
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState<string[]>(props.selectedDepartmentIds ? props.selectedDepartmentIds : []);

    useEffect(() => {
        if (props.departments) {
            const tree = createTree(props.departments);
            setTree(tree);
        }
    }, [props.departments]);

    const toggleDepartment = (id: string) => {
        if (selectedDepartmentIds.includes(id)) {
            console.log("Deselecting department ", id);
            setSelectedDepartmentIds(selectedDepartmentIds.filter(d => d !== id));
        }
        else {
            console.log("Selecting depart ", id);
            setSelectedDepartmentIds([...selectedDepartmentIds, id]);
        }
    }

    const createTree = (departments: Department[]) => {
        const nodes: Map<string, TreeNode<Department>> = new Map();
        let roots: TreeNode<Department>[] = [];

        // create nodes for each department
        departments.forEach(dept => {
            console.log("Adding node: ", dept.id);
            nodes.set(dept.id, new TreeNode(dept));
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

    return (
        <div className="min-w-fit">
            <ul className="text-start bg-gray-900 text-white">
                {tree.map(rootNode => (
                    <TreeNodeComponent key={rootNode.data.id} node={rootNode} toggleNode={toggleDepartment} selectedNodes={selectedDepartmentIds} />
                ))}
            </ul>
        </div>
    );
}

interface TreeNodeProps {
    node: TreeNode<Department>;
    toggleNode: (id: string) => void;
    selectedNodes: string[];
}

const TreeNodeComponent = ({ node, toggleNode, selectedNodes }: TreeNodeProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <li className="py-1.5">
            <TreeNodeItemHeader title={node.data.title} collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} childrenCount={node.descendantCount()} onToggle={() => toggleNode(node.data.id)} selected={selectedNodes.find(d => d === node.data.id) ? true : false} totalSelected={selectedNodes.length} />
            {node.children.length > 0 && (
                <ul className={`ml-12 ${collapsed && 'hidden'}`}>
                    {node.children.map(childNode => (
                        <TreeNodeComponent key={childNode.data.id} node={childNode} toggleNode={toggleNode} selectedNodes={selectedNodes} />
                    ))}
                </ul>
            )}
        </li>
    );
};

interface TreeNodeItemHeaderProps {
    title: string;
    collapsed: boolean;
    onCollapse: () => void;
    totalSelected: number;
    selected: boolean;
    onToggle: () => void;
    childrenCount: number;
}
const TreeNodeItemHeader = (props: TreeNodeItemHeaderProps) => {
    const { title, collapsed, onCollapse, childrenCount, onToggle: handleToggle, selected, totalSelected } = props;

    return (
        <div className="flex space-x-2 px-3">
            {childrenCount > 0 && <button onClick={onCollapse}>
                {collapsed ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>}
            </button>}
            <span className="border-red-800 border-l-4 pl-1.5">{`${title} (${totalSelected}/${childrenCount})`}</span>
            {childrenCount === 0 && <input type="checkbox" className="accent-pink-500 !ml-auto" onChange={handleToggle} checked={selected} />}
        </div>)
}