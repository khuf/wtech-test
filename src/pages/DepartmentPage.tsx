import React from "react";
import DepartmentSelector from "../DepartmentSelector/DepartmentSelector.tsx";
import { Department } from "../DepartmentSelector/TreeStructure.ts";


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

interface DepartmentEntity {
    OID: number;
    Title: string;
    Color: string;
    DepartmentParent_OID: number | null;
}
const data: DepartmentEntity[] = [{
    "OID": 1,
    "Title": "US News",
    "Color": "#F52612",
    "DepartmentParent_OID": null
}, {
    "OID": 2,
    "Title": "Crime + Justice",
    "Color": "#F52612",
    "DepartmentParent_OID": 1
}, {
    "OID": 3,
    "Title": "Energy + Environment",
    "Color": "#F52612",
    "DepartmentParent_OID": 1
}, {
    "OID": 4,
    "Title": "Extreme Weather",
    "Color": "#F52612",
    "DepartmentParent_OID": 1
}, {
    "OID": 5,
    "Title": "Space + Science",
    "Color": "#F52612",
    "DepartmentParent_OID": 1
}, {
    "OID": 6,
    "Title": "International News",
    "Color": "#EB5F25",
    "DepartmentParent_OID": null
}, {
    "OID": 7,
    "Title": "Africa",
    "Color": "#EB5F25",
    "DepartmentParent_OID": 6
}, {
    "OID": 8,
    "Title": "Americas",
    "Color": "#EB5F25",
    "DepartmentParent_OID": 6
}, {
    "OID": 9,
    "Title": "Asia",
    "Color": "#EB5F25",
    "DepartmentParent_OID": 6
}, {
    "OID": 10,
    "Title": "Europe",
    "Color": "#EB5F25",
    "DepartmentParent_OID": 6
}, {
    "OID": 11,
    "Title": "Middle East",

    "Color": "#EB5F25",
    "DepartmentParent_OID": 6
}, {
    "OID": 12,
    "Title": "Politics",
    "Color": "#0079FF",
    "DepartmentParent_OID": null
}, {
    "OID": 13,
    "Title": "National",
    "Color": "#0079FF",
    "DepartmentParent_OID": 12
}, {
    "OID": 41,
    "Title": "Opinion",
    "Color": "#32B32B",
    "DepartmentParent_OID": null
}, {
    "OID": 14,
    "Title": "World",
    "Color": "#0079FF",
    "DepartmentParent_OID": 12
}, {
    "OID": 15,
    "Title": "2016 Election",
    "Color": "#0079FF",
    "DepartmentParent_OID": 12
}, {
    "OID": 118,
    "Title": "Japan",
    "Color": "#EB5F25",
    "DepartmentParent_OID": 9
}, {
    "OID": 119,
    "Title": "France",

    "Color": "#EB5F25",
    "DepartmentParent_OID": 10
}];

export default DepartmentPage;