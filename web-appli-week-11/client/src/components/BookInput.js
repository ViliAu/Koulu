import React , {useState} from "react";
 
function BookInput() {

    async function sendData() {
        let obj = {};
        obj.name = document.getElementById("name").value;
        obj.author = document.getElementById("author").value;
        obj.pages = document.getElementById("pages").value;
        try {
            const res = await fetch("/api/book", {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(obj)
            });
        }
        catch (e) {
            console.log(e);
        }
    }
 
    return (
        <div className="book-input">
            <h6>Name</h6>
            <input type="text" id="name"/>
            <h6>Author</h6>
            <input type="text" id="author"/>
            <h6>Page count</h6>
            <input type="number" id="pages"/>
            <h6>Submit</h6>
            <input type="submit" id="submit" onClick={sendData}/>
        </div>
    )
} 
 
export default BookInput;