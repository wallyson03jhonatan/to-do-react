interface TodoItemInterface {
  item: {isCompleted: boolean, text: string}
  index: number
  setHandleComplete: (index: number) => void
  setHandleDelete: (index: number) => void
}

export default function TodoItem({ item, index, setHandleComplete, setHandleDelete }: TodoItemInterface) {

  return (
    <div className={item.isCompleted ? 'item item__complete' : 'item'}>
      <span
        onClick={() => {
          setHandleComplete(index)
        }}
      >
        {item.text}
      </span>
      <button
        className="lnr lnr-trash remove"
        onClick={() => {
          setHandleDelete(index)
        }}
        title="Remover tarefa"
      ></button>
    </div>
  )
}
