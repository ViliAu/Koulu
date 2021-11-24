import { useState } from 'react';
import MyList from './MyList';

function MyContainer() {
    const [items, setItems] = useState([
        {id: "1", text: "This is an item"},
        {id: "2", text: "Also this"}
    ]);
    const header = "Really epic list component"
    function onButtonClick() {
        setItems( arr => [...arr, {id: (items.length+1).toString(), text: document.querySelector("textarea").value, clicked: false}]);
    }
    function updateItem(id) {
        let newArr = [...items];
        for (let i of newArr) {
            if (i.id === id) {
                i.clicked = !i.clicked;
            }
        }
        setItems(newArr)
    }
    return (
        <>
            <textarea></textarea>
            <button onClick={onButtonClick}>Button</button>
            <MyList
                updateItem={updateItem}
                header={header}
                items={items}
            />
        </>
    );
}

export default MyContainer;