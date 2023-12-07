import React, { useState } from "react";
import { Department, TreeNode } from "./TreeStructure";
import ChevronUp from "../icons/ChevronUp.tsx";
import ChevronDown from "../icons/ChevronDown.tsx";

interface TreeNodeProps {
    node: TreeNode<Department>;
    toggleNode: (id: number) => void;
}

/**
 * Tree item in the hierarchical list. Renders either a selectable leaf node or a branch node that
 * encompasses one or more leaf and/or branch nodes.
 */
export default function TreeItem({ node, toggleNode }: TreeNodeProps) {
    return node.isLeaf() ? <LeafNode key={node.id} node={node} toggleNode={toggleNode} /> : <BranchNode key={node.id} node={node} toggleNode={toggleNode} />;
}

const BranchNode = ({ node, toggleNode }: TreeNodeProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const leafNodeCount = node.leafNodeCount();
    const selectedLeafNodeCount = node.selectedLeafNodesCount().length;

    return (
        <li className="py-1.5">
            <div className="flex space-x-2 px-3">
                <button onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <ChevronUp />
                        : <ChevronDown/>}
                </button>
                <span className="border-red-800 border-l-4 pl-1.5">{`${node.data.title} (${selectedLeafNodeCount}/${leafNodeCount})`}</span>
            </div>
            {!node.isLeaf() && (
                <ul className={`ml-12 ${collapsed && 'hidden'}`}>
                    {node.getChildren().map(childNode => (
                        <TreeItem key={childNode.id} node={childNode} toggleNode={toggleNode} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const LeafNode = ({ node, toggleNode }: TreeNodeProps) => {
    const departmentColor = node.data.color;

    return (
        <li className="py-1.5">
            <div className="flex space-x-2 px-3">
                <span style={{ borderColor: departmentColor }} className="border-l-4 pl-1.5 pr-4">{`${node.data.title}`}</span>
                <input type="checkbox" className="accent-pink-500 !ml-auto" onChange={() => toggleNode(node.id)} checked={node.selected} />
            </div>
        </li>
    );
};