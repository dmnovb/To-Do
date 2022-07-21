
import React , {useState} from "react";                                                                     
import '../components/createTodo.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const CreateTodo = ()=> {
    const [task, setTask] = useState('')
    const [description, setDescription] = useState('')
    const handleSubmit = (event) => {
        
        if(task == ''){
           alert("Must enter task")
           return
        } 
 
    const taskObject = {
        name: task,
        description: description,
        isComplete: false
    }

    
    fetch('http://localhost:4000/todo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(taskObject)
    });
    }
    return (
        <div className="all-todos">
            <form onSubmit={handleSubmit}> 
                <textarea placeholder="Enter task..." id="form10" className="md-textarea form-control mb-3" rows="1" label="Task..." 
                    variant="outlined" 
                    type="text" 
                    value={task}
                    onChange={(e) => setTask(e.target.value)}>
                </textarea>
                <textarea value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description..." id="form10" className="md-textarea form-control mb-2" rows="3" label="Task..."></textarea>
                <div className="button-div">
                    <button className="btn btn-primary mb-3">Add task</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTodo;                                                                  