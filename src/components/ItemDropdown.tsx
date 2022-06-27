import React from 'react'

interface ItemDropdownProps{
    onChangeForm: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    items: string[]
}


export const ItemDropdown: React.FC<ItemDropdownProps> = ({ onChangeForm, items }: ItemDropdownProps) => {

    const options = items.map((item, index) => {
        return (
            <option key={index} id={item}>{item}</option>
        )
    })

    return (
        <select onChange={onChangeForm} className="form-control" name="category" id="category" placeholder="Category">
            {options}
        </select>
    )
}