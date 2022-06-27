import React from 'react'
import { CategoryGroupResponse, HighValueItemResponse } from '../models/HighValueItemTypes';
import { ItemDropdown } from './ItemDropdown';
import { ReactComponent as TrashCan } from "../assets/trashicon.svg";

interface ItemTableProps {
    onChangeForm: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    createHighValueItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    deleteHighValueItem: (item: HighValueItemResponse) => void,
    categories: string[],
    items: CategoryGroupResponse[]
};


export const ItemTable: React.FC<ItemTableProps> = ({ onChangeForm, createHighValueItem, deleteHighValueItem, categories, items }: ItemTableProps) => {
    const createItemRows = (group: CategoryGroupResponse) => {
        return group.items.map((item, index) =>
            (
                <tr key={index}>
                    <td></td>
                    <td>{item.name}</td>
                    <td id='itemvalue'>${item.value}</td>
                    <td>
                        <button className="btntrash" onClick={() => deleteHighValueItem(item)}>
                            <TrashCan className="icontrash"/>
                        </button>
                    </td>
                </tr>
            )
        );
    };
    
    const userTable = items.map((group, index) => {
        let items = createItemRows(group);
        return (
                <tbody id={group.name} key={index}>
                    <tr key={index} className="groupheader">
                        <td colSpan={2}>{group.name}</td>
                        <td>${group.totalValue}</td>
                    </tr>
                    {items}
                </tbody>
        );
    });

    let valueSum = items.reduce((i, j) => { return i + j.totalValue; }, 0);

    return (
        <div className="container">
            <h2>Your Items:</h2>
            <table className="table table-bordered">
                <thead>
                    <tr className="tableheader">
                        <th>Category</th>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                {userTable}
                <tbody>
                    <tr key={'sum'}>
                        <th colSpan={2}></th>
                        <th>Total: ${valueSum}</th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            {ItemDropdown({ onChangeForm, items: categories })}
                        </td>
                        <td>
                            <input type="text" onChange={onChangeForm} className="form-control" name="name" id="name" placeholder="Name" />
                        </td>
                        <td>
                            <input type="number" onChange={onChangeForm} className="form-control" name="value" id="value" placeholder="Value" />
                        </td>
                        <td>
                            <button type="button" onClick={createHighValueItem} className="btn btn-danger">Add</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}