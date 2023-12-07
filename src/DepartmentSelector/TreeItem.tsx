import React, { useState } from "react";
import { Department, TreeNode } from "./TreeStructure";

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
                    {collapsed ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>}
                </button>
                <span className="border-red-800 border-l-4 pl-1.5">{`${node.data.title} (${selectedLeafNodeCount}/${leafNodeCount})`}</span>
            </div>
            {node.children.length > 0 && (
                <ul className={`ml-12 ${collapsed && 'hidden'}`}>
                    {node.children.map(childNode => (
                        <TreeItem key={childNode.id} node={childNode} toggleNode={toggleNode} />
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
                <span className="border-red-800 border-l-4 pl-1.5 pr-4">{`${node.data.title}`}</span>
                <input type="checkbox" className="accent-pink-500 !ml-auto" onChange={() => toggleNode(node.id)} checked={node.selected} />
            </div>
        </li>
    );
};