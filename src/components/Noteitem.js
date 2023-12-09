import React from 'react'

const Noteitem = (props) => {
    const { note } = props
    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        {/* HERE IN BELLOW I USED PROPS IN TWO WAYS  */}
                        <h5 className="card-title">{props.note.title}</h5><i className="fa-solid fa-trash-can mx-2" style={{ "cursor": 'pointer' }}></i>
                        <i className="fa-solid fa-file-pen" style={{ "cursor": 'pointer' }}></i></div>

                    <p className="card-text my-2">{note.description}</p>

                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    )
}

export default Noteitem