import React, { useEffect, useState } from "react";
import { Department, TreeNode, createDepartmentTree } from "./TreeStructure.ts";
import TreeItem from "./TreeItem.tsx";

interface Props {
    departments: Department[];
    selectedDepartmentIds?: number[];
    onSelect: (departmentIds: number[]) => void;
}

export default function DepartmentSelector(props: Props) {
    const [tree, setTree] = useState<TreeNode<Department>[]>(createDepartmentTree(props.departments, props.selectedDepartmentIds));
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState<number[]>(props.selectedDepartmentIds ? props.selectedDepartmentIds : []);

    useEffect(() => {
        const tree = createDepartmentTree(props.departments);
        setTree(tree);
    }, [props.departments]);

    useEffect(() => {
        //Rebuild tree, perhaps not ideal as it forces a complete re-render of the tree...
        const tree = createDepartmentTree(props.departments, selectedDepartmentIds);
        setTree(tree);
    }, [selectedDepartmentIds])

    const toggleSelection = (nodeId: number) => {
        let newIds: number[] = [];
        if (selectedDepartmentIds.includes(nodeId)) {
            newIds = selectedDepartmentIds.filter(d => d !== nodeId);
        }
        else {
            newIds = [...selectedDepartmentIds, nodeId]
        }
        setSelectedDepartmentIds(newIds);
        props.onSelect(newIds)
    };

    return (
        <div className="min-w-fit">
            <ul className="text-start bg-gray-900 text-white">
                {tree.map(rootNode => (
                    <TreeItem key={rootNode.id} node={rootNode} toggleNode={toggleSelection} />))}
            </ul>
        </div>
    );
}