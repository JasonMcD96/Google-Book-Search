import React from "react"

function SaveBtn(props) {
    return(
        <button {...props} style={{ float: "right", marginBottom: 10, marginLeft:5 }} className="btn btn-success" role="button">Save</button>
    )
}

export default SaveBtn