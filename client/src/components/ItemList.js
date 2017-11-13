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
                            data={item}
                            delete={props.delete}
                        />
                    )
                })}
            </div>
        )
    } else {
        return (
            <h2>No data in database</h2>
        )
    }
};

export default ItemList;