import { FormEvent } from "react";

interface TodoFormInterface {
  setHandleAdd: (event: FormEvent) => void
  newItem: string
  setNewItem: (value: string) => void
}
export default function TodoForm({ setHandleAdd, newItem, setNewItem }: TodoFormInterface) {
  return (
    <form onSubmit={setHandleAdd}>
      <input
        id="input-field"
        type="text"
        placeholder="Adicione uma tarefa"
        value={newItem}
        onChange={(event) => {
          setNewItem(event.target.value);
        }}
      />
      <button
        type="submit"
        className="lnr lnr-plus-circle add"
        title="Adicionar tarefa"
      ></button>
    </form>
  );
}
