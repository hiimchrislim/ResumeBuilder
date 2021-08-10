import React from 'react';
import AdditionalCard from "./AdditionalCard/AdditionalCard";

let AdditionalGroup = (props) => {
    let cards = Object.keys(props.cards).map((name) => {
        return [...Array(props.cards[name])].map((_, index) => {
            return <AdditionalCard name={name} key={index}/>
        });
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    return (
        <div>
            {cards}
        </div>
    )
};

export default AdditionalGroup;
