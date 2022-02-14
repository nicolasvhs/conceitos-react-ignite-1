import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { tsExternalModuleReference } from '@babel/types';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle){
      return;
    }

    let id = 0;
    do {
      id = Math.random();
    } while (tasks.find(e => e.id == id))

    const newTask:Task = {
      title: newTaskTitle,
      isComplete: false,
      id
    };

    setTasks(tasks => [...tasks, newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const updatedTasks = tasks.map(t => {
      return (t.id == id) 
        ? {...t, isComplete: !t.isComplete}
        : t;
    });

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const updatedTasks = tasks.filter(t => t.id != id);
    setTasks(updatedTasks);
  }

  function submitTask(e){
    setNewTaskTitle(e.target.value);
    handleCreateNewTask();
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyUp={(e) => e.key == 'Enter' ? submitTask(e) : null}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}