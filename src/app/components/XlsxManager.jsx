'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export function XlsxManager() {

    const dummyData = [
        {
            "Name": "Debarghya",
            "Role": "Frontend Developer",
            "Experience": "2 years",
            "Country": "India",
            "City": "Kolkata"
        },
        {
            "Name": "Priyanka",
            "Role": "Lead Developer",
            "Experience": "8 years",
            "Country": "Germany",
            "City": "Berlin"
        },
        {
            "Name": "Suranjan",
            "Role": "UI/UX Designer",
            "Experience": "2 years",
            "Country": "India",
            "City": "Mumbai"
        },
        {
            "Name": "Abhishek",
            "Role": "DevOps Engineer",
            "Experience": "12 years",
            "Country": "Germany",
            "City": "Munich"
        }
    ]

    const [jsonData, setJsonData] = useState(dummyData);

    // Import Excel → JSON
    const handleImportJson = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target.result);
                if (Array.isArray(json)) {
                    setJsonData(json); // Display as table
                } else {
                    alert('JSON file must be an array of objects');
                }
            } catch (err) {
                console.error('Invalid JSON file', err);
                alert('Error parsing JSON file');
            }
        };
        reader.readAsText(file);
    };


    // Export JSON → Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

        XLSX.writeFile(workbook, 'exported-data.xlsx');
    };

    const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

    return (
        <div className="p-4 border rounded-xl shadow-md bg-white space-y-4">
            <div>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleImportJson}
                    className="mb-4"
                />
            </div>

            {jsonData.length > 0 && (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse border border-gray-400 text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    {headers.map((key) => (
                                        <th key={key} className="border border-gray-300 px-3 py-2 text-left">
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {jsonData.map((row, i) => (
                                    <tr key={i}>
                                        {headers.map((key) => (
                                            <td key={key} className="border border-gray-200 px-3 py-1">
                                                {row[key] || ''}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        onClick={exportToExcel}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Export to Excel
                    </button>
                </>
            )}
        </div>
    );
}
