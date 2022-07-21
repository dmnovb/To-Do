import React from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react";
import App from '../App'
import Moment from 'react-moment'

class ModalTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: "",
          show: false,
          isCompleted: false
         };
      }

    handleCompletion = (id) => {

        const isCompleted = {
            isComplete: true
        }

        let body = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(isCompleted)
        }
        console.log(body)

        let putRequest = `http://localhost:4000/todo/` + id;
        

        fetch(putRequest, body);

        let show = this.state.show;
        show = false;
        this.setState({show})
        this.props.parentFunction();
        window.location.reload();
    }

    handleShow = () => {
        var show = this.state.show;
        show = true;
        this.setState({show})


    }
     
    render() {
        
        let desc = "";
        if (this.props.description == "") {
            desc = "None"
        } else {
            desc = this.props.description;
        }
        return (
            <div>
                 <Button className="mr-2" 
                 variant="primary" 
                 onClick={this.handleShow}>
                    info
                </Button>
    
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.dataFromParent}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label>Name: {this.props.dataFromParent}</label>
                            <div>
                               <label>Date created: {this.props.date}</label>
                            </div>
                            <div>
                            <label>Description: {desc}</label>
                            </div>
                        </div>
                        <Button className="mt-1"  onClick={() => this.handleCompletion(this.props.id)}>Complete</Button>
                    </Modal.Body>
                </Modal>
            </div>

        )
    }
         
}
export default ModalTest;