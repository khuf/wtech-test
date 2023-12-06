import React, { useEffect, useState } from "react";
import { Department, TreeNode, createTree } from "./TreeStructure.ts";

interface Props {
    departments: Department[];
    selectedDepartmentIds?: string[];
}

export default function DepartmentSelector(props: Props) {

    const [tree, setTree] = useState<TreeNode<Department>[]>(createTree(props.departments, props.selectedDepartmentIds));
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState<string[]>(props.selectedDepartmentIds ? props.selectedDepartmentIds : []);

    useEffect(() => {
        const tree = createTree(props.departments);
        setTree(tree);
    }, [props.departments]);

    useEffect(() => {
        //Rebuild tree, perhaps not ideal as it forces a complete re-render of the tree...
        const tree = createTree(props.departments, selectedDepartmentIds);
        setTree(tree);
    }, [selectedDepartmentIds])

    const toggleSelection = (nodeId) => {
        if (selectedDepartmentIds.includes(nodeId)) {
            setSelectedDepartmentIds(selectedDepartmentIds.filter(d => d !== nodeId));
        }
        else {
            setSelectedDepartmentIds([...selectedDepartmentIds, nodeId]);
        }
    };

    return (
        <div className="min-w-fit">
            <ul className="text-start bg-gray-900 text-white">
                {tree.map(rootNode => {
                    if (rootNode.isLeaf()) {
                        return <LeafNode key={rootNode.data.id} node={rootNode} toggleNode={toggleSelection} />
                    }
                    return <BranchNode key={rootNode.data.id} node={rootNode} toggleNode={toggleSelection} />
                })}
            </ul>
            <button className="bg-violet-400 text-white rounded text-sm p-3" onClick={() => console.log(selectedDepartmentIds)}>Submit</button>
        </div>
    );
}


interface TreeNodeProps {
    node: TreeNode<Department>;
    toggleNode: (id: string) => void;
}

const BranchNode = ({ node, toggleNode }: TreeNodeProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <li className="py-1.5">
            <div className="flex space-x-2 px-3">
                <button onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>}
                </button>
                <span className="border-red-800 border-l-4 pl-1.5">{`${node.data.title} (${node.selectedDescendantIds().length}/${node.descendantCount()})`}</span>
            </div>
            {node.children.length > 0 && (
                <ul className={`ml-12 ${collapsed && 'hidden'}`}>
                    {node.children.map(childNode => (
                        childNode.isLeaf() ? <LeafNode key={childNode.data.id} node={childNode} toggleNode={toggleNode} /> : <BranchNode key={childNode.data.id} node={childNode} toggleNode={toggleNode} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const LeafNode = ({ node, toggleNode }: TreeNodeProps) => {

    return (
        <li className="py-1.5">
            <div className="flex space-x-2 px-3">
                <span className="border-red-800 border-l-4 pl-1.5">{`${node.data.title}`}</span>
                <input type="checkbox" className="accent-pink-500 !ml-auto" onChange={() => toggleNode(node.data.id)} checked={node.selected} />
            </div>
        </li>
    );
};