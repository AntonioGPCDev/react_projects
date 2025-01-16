export interface Todo {
    id: string
    title: string
    completed: boolean
}

export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS] //usa uan key del TOODO_FILTERS all, active o completed