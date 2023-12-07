import React from "react";
import DepartmentSelector from "../DepartmentSelector/DepartmentSelector.tsx";
import { Department } from "../DepartmentSelector/TreeStructure.ts";
import { DepartmentEntity, data } from "../data/departments.ts";


//Not needed, just wanted lowercase property names
const DepartmentMapper = {
    toDepartment: (department: DepartmentEntity): Department => (
        { id: department.OID, title: department.Title, color: department.Color, parentId: department.DepartmentParent_OID ? department.DepartmentParent_OID : null }
    )
};

function DepartmentPage() {

    const departments = data.map(d => DepartmentMapper.toDepartment(d));

    const selectedDepartmentIds = [];

    const handleSelect = (departments: number[]) => {
        console.log("Selected departments: ", departments);
    }
    return (
        <div>
            <h1 className="text-3xl">Departments</h1>
            <p className="text-1xl">Selected departments are printed to the console whenever a node is toggled</p>
            <div className="w-fit">
                <DepartmentSelector departments={departments} onSelect={handleSelect} selectedDepartmentIds={selectedDepartmentIds} />
            </div>
        </div>
    )
}

export default DepartmentPage;