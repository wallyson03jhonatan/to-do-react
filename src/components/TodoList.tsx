import Icone from '../assets/todoImage.png'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { FormEvent, useEffect, useState } from 'react'

interface ItemListInterface {
  text: string
  isCompleted: boolean
}

export default function TodoList() {
  const storageList = localStorage.getItem('list')
  const [newItem, setNewItem] = useState<string>('')
  const [list, setList] = useState<ItemListInterface[]>(
    storageList ? JSON.parse(storageList) : []
  )

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  function handleAdd(event: FormEvent) {
    event.preventDefault()

    if (!newItem) return
    setList([...list, { text: newItem, isCompleted: false }])
    setNewItem('')

    document.getElementById('input-field')?.focus()
  }

  function handleComplete(index: number) {
    const listAux = [...list]
    listAux[index].isCompleted = !listAux[index].isCompleted

    return setList(listAux)
  }

  function handleDelete(index: number) {
    const listAux = [...list]
    listAux.splice(index, 1)

    return setList(listAux)
  }

  function handleDeleteAll() {
    return setList([])
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <TodoForm
        setHandleAdd={handleAdd}
        newItem={newItem}
        setNewItem={setNewItem}
      />

      <div className="js-control todoList">
        {list.length < 1 ? (
          <div>
            <img
              className="img__icon"
              src={Icone}
              alt="Imagem sobre lista de tarefas"
            />
          </div>
        ) : (
          <>
            {list.map((item, index) => (
              <TodoItem
                key={index}
                index={index}
                item={item}
                setHandleComplete={handleComplete}
                setHandleDelete={handleDelete}
              />
            ))}
            <button
              className="remove remove__all"
              onClick={handleDeleteAll}
              title="Remover todas as tarefas"
            >
              Remover todos
            </button>
          </>
        )}
      </div>
    </div>
  )
}
