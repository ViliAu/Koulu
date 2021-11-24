function MyList(props) {
    const items = props.items
    let listItems = [];
    if (items) {
        listItems = items.map((item) =>
        <li key={item.id}>
            {item.title}
        </li>);
    }
    return (
        <div>
            <ol>{listItems}</ol>
        </div>
    );
}

export default MyList;