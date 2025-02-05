/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { type TodoId, type ListOfTodos, type Todo as TodoType } from "../types"
import { Todo } from "./Todo"

interface Props {
    todos: ListOfTodos
    onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onRemoveTodo: ({ id } : TodoId) => void
}

export const Todos: React.FC<Props> = ({ todos, onToggleCompleteTodo, onRemoveTodo }) => {
    return (
        <ul className="todo-list">
            {todos.map ( todo => (
                <li key={todo.id} className={`${todo.completed ? 'completed': ''}`}>
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onToggleCompleteTodo = {onToggleCompleteTodo}
                        onRemoveTodo = {onRemoveTodo}
                    />
                </li>
            ))}
        </ul>
    )
}