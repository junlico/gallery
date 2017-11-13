import React from 'react';
import Item from './Item';
import LoadingGif from '../assets/Spinner.gif';

const ItemList = (props) => {
    console.log(props)
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
                            data={item}
                        />
                    )
                })}
            </div>
        )
    } else {
        return (
            <h2>Currently No Gallery in database</h2>
        )
    }
};

export default ItemList;