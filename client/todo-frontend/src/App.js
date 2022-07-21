import './App.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Moment from 'moment';
import Modal from './components/modal'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: []
    };
  } 

  parentHandler = () => {
    console.log("Parent handler called!");
}

  componentDidMount() {
    fetch("http://localhost:4000/todo")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.task
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
   }
  
  click = (id) => {
    let p = `http://localhost:4000/todo/` + id;
     fetch(p, {
      method: "DELETE"
     })
     window.location.reload();
  }
  render() {
    const {isLoaded, data} = this.state;
    if(isLoaded) { 

    return <ul className='list-group'>
    {data.map(todo => (            
            <li className="list-group-item h5"key={todo._id} >
            
              <button className='btn btn-secondary m-2' onClick={() => this.click(todo._id)}>Delete</button>{todo.name}
              <div className='mx-2'><Modal id={todo._id} parentFunction = {this.parentHandler} description ={todo.description} date = {Moment(todo.dateCreated).format('HH:mm - Do MMM - YY')} dataFromParent = {todo.name} /></div>
              <p1 className="m-2 h6">{todo.isComplete ? "Completed" : "Not completed"} </p1>
            </li>
           
      ))}
    </ul>
    } else {
        return <div>Loading...</div>
    }
  }
}


export default App;
