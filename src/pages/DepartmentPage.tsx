import React from "react";
import DepartmentSelector from "../DepartmentSelector/DepartmentSelector.tsx";
import { Department } from "../DepartmentSelector/TreeStructure.ts";
import { DepartmentEntity, data } from "../data/departments.ts";


const DepartmentMapper = {
    toDepartment: (department: DepartmentEntity): Department => (
        { id: String(department.OID), title: department.Title, color: department.Color, parentId: department.DepartmentParent_OID ? String(department.DepartmentParent_OID) : null }
    )
};

function DepartmentPage() {

    const departments = data.map(d => DepartmentMapper.toDepartment(d));
    return (
        <div>
            <h1 className="text-3xl">Departments</h1>
            <div className="w-fit">
                <DepartmentSelector departments={departments} />
            </div>
        </div>
    )
}

export default DepartmentPage;