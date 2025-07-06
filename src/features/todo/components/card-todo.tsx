'use client'

import { useTodos } from '../hook/use-todos'
import FormTodo from './form-todo'
import ListTodo from './list-todo'

export default function CardTodo() {
	const { create, refetch, todos, mark, remove } = useTodos()
	return (
		<div>
			<FormTodo create={create} refetch={refetch} />
			<ListTodo todos={todos} mark={mark} remove={remove} />
		</div>
	)
}
