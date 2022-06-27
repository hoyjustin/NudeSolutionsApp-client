import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createHighValueItem, deleteHighValueItem, getAllHighValueItemsPerCategory } from '../services/HighValueItemService';
import { CategoryGroupResponse, HighValueItemRequest, HighValueItemResponse, ItemCategory } from '../models/HighValueItemTypes';
import { ItemTable } from './ItemTable';

export class HighValueItemForm extends Component {

    state = {
        newHighValueItem: {} as HighValueItemRequest,
        categoryGroups: [] as CategoryGroupResponse[],
    }

    async componentDidMount() {
        getAllHighValueItemsPerCategory()
            .then(response => {
                this.setState({
                    newHighValueItem: this.state.newHighValueItem,
                    categoryGroups: Object.assign([] as CategoryGroupResponse[], response ),
                })
            })
            .catch(error => console.log(error));
    };

    createHighValueItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        createHighValueItem(this.state.newHighValueItem)
            .then(response => {
                console.log(response);
                this.setState({
                    categoryGroups: Object.assign([] as CategoryGroupResponse[], response ),
                })
            })
            .catch(error => console.log(error));
    }

    deleteHighValueItem = (item: HighValueItemResponse) => {
        deleteHighValueItem(item.id)
            .then(response => {
                console.log(response);
                this.setState({ categoryGroups: Object.assign([] as CategoryGroupResponse[], response ) })
            })
            .catch(error => console.log(error));
    }

    onChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let newHighValueItem = {...this.state.newHighValueItem};
        let targetName = e.target.name;
        if (targetName === 'name') {
            newHighValueItem.name = e.target.value;
        } else if (targetName === 'value') {
            let inputValue = parseFloat(e.target.value);
            newHighValueItem.value = (inputValue !== NaN ? inputValue : 0);
        } else if (targetName === 'category') {
            newHighValueItem.category = ItemCategory[e.target.value as keyof typeof ItemCategory];
        }
        this.setState({ newHighValueItem })
    }

    render() {
        return (
            <div className="ItemDataContainer">
                <div className="row mrgnbtm">
                    <ItemTable
                        onChangeForm={this.onChangeForm}
                        createHighValueItem={this.createHighValueItem}
                        deleteHighValueItem={this.deleteHighValueItem}
                        categories={Object.values(ItemCategory).map(key => key.toString())}
                        items={this.state.categoryGroups}
                    />
                </div>
            </div>
        );
    }
}