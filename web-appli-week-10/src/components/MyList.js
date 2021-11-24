function MyList(props) {
    const header = props.header;
    const items = props.items
    const listItems = items.map((item) =>
        <li key={item.id.toString()} onClick={() => props.updateItem(item.id)} style = {{textDecoration: item.clicked ? "line-through" : ""}} >
            {item.text}
        </li>);
    return (
        <div>
            <h2>{header}</h2>
            <ol>{listItems}</ol>
        </div>
    );
}

export default MyList;