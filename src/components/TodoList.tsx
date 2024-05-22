import React, { useState, useEffect } from "react";
import Icone from '../assets/todoImage.png'
import '../assets/TodoList.css';

interface TodoItem {
    text: string;
    isCompleted: boolean;
}

function TodoList() {
    const storageList = localStorage.getItem('list');
    const [newItem, setNewItem] = useState<string>('');
    const [list, setList] = useState<TodoItem[]>(storageList ? JSON.parse(storageList) : []);
    
    useEffect( () => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);

    function handleAdd(form: any) {        
        form.preventDefault();
            
        if (!newItem) return; 
        
        setList([...list, {text: newItem, isCompleted: false}]);
        setNewItem('');
        
        document.getElementById('input-field')?.focus();
    }

    function handleComplete(index:number) {
        const listAux = [...list];
        listAux[index].isCompleted = !listAux[index].isCompleted;
        
        return setList(listAux);
    }

    function handleDelete(index:number) {
        const listAux = [...list];
        listAux.splice(index,1);

        return setList(listAux);
    }

    function handleDeleteAll() {
        return setList([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>

            <form onSubmit={handleAdd}>
                <input 
                    id="input-field"
                    type="text" 
                    placeholder="Adicione uma tarefa" 
                    value={newItem}
                    onChange={(event) => {
                        setNewItem(event.target.value)
                    }}
                />
                <button type="submit" className="lnr lnr-plus-circle add" title="Adicionar tarefa"></button>    
            </form>

            <div className="todoList">
                <div>
                    {
                        list.length < 1 
                            ? 
                                <img className="img__icon" src={Icone} alt="Imagem sobre lista de tarefas" /> 
                            : 
                                list.map((item, index) => (
                                    <div
                                        key={index}
                                        className={item.isCompleted ? "item item__complete" : "item"}
                                    >
                                        <span onClick={() => {handleComplete(index)}}>{item.text}</span>
                                        <button className="lnr lnr-trash remove" onClick={() => {handleDelete(index)}} title="Remover tarefa"></button>
                                    </div>
                                ))         
                    }     
                    {
                        list.length > 0 &&
                        <button className="remove remove__all"  onClick={() => {handleDeleteAll()}} title="Remover todas as tarefas">Remover todos</button>
                    }

                </div>
            </div>
        </div>
    );
}

export default TodoList
