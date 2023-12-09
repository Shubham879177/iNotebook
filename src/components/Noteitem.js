import React from 'react'

const Noteitem = (props) => {
    const {note} = props
    return (
        <div className="col-md-3">
            <div class="card my-2">
                    <div class="card-body">
                        {/* HERE IN BELLOW I USED PROPS IN TWO WAYS  */}
                        <h5 class="card-title">{props.note.title}</h5>
                        <p class="card-text">{note.description}</p>
                        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                    </div>
            </div>
        </div>
    )
}

export default Noteitem