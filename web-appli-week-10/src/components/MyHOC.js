import React from "react";

const MyHOC = (Component, props) => {
    class WrappedHOC extends React.Component {
        render() {
            return(
                <div className="wrapper">
                    <Component {...props}/>
                </div>
            );
        }
    }
    return <WrappedHOC/>;
}

export default MyHOC;