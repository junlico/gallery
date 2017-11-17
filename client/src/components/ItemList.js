import React from 'react';
import Item from './Item';
import LoadingGif from '../assets/Spinner.gif';

const ItemList = (props) => {
    if (props.loading) {
        return (
            <img src={LoadingGif} alt="LoadingGIF" />
        )
    } else if (props.data.length > 0) {
        return (
            <div className="row">
                { props.data.map((item, i) => {
                    return (
                        <Item
                            key={i}
                            view={props.view}
                            schema={props.schema}
                            data={item}
                            edit={props.edit}
                            delete={props.delete}
                        />
                    )
                })}
            </div>
        )
    } else {
        return (
            <h1>No data in database</h1>
        )
    }
};

export default ItemList;