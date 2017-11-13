import React from 'react';
import MenuButton from './MenuButton';

const ButtonList = (props) => {
    return (
        <div>
            { props.buttonList.map((item, i) => {
                return (
                    <MenuButton
                        key={i}
                        button={item}
                        schema={props.schema}
                    />
                )
            })}
        </div>
    )
};

export default ButtonList;