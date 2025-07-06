'use client'

import { useEffect, useState } from 'react'
import { Todo } from '@/shared/types'
import http from '@/shared/lib/axios'

type CreateTodoPayload = {
	item: string
}

type MarkPayload = {
	action: string
}

export const useTodos = () => {
	const [todos, setTodos] = useState<Todo[]>([])
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [shouldRefetch, setShouldRefetch] = useState(false)

	const fetchTodos = async () => {
		setLoading(true)
		setError(null)

		try {
			const res = await http.get<{ content: { entries: Todo[] } }>('/todos')
			setTodos(res.data.content.entries)
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to fetch todos')
		} finally {
			setLoading(false)
			setShouldRefetch(false)
		}
	}

	useEffect(() => {
		fetchTodos()
	}, [shouldRefetch])

	const refetch = () => setShouldRefetch(true)

	const create = async (data: CreateTodoPayload) => {
		try {
			await http.post('/todos', data)
			refetch()
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to create todo')
		}
	}

	const mark = async (id: string, data: MarkPayload) => {
		try {
			await http.put(`/todos/${id}/mark`, data)
			refetch()
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to update todo')
		}
	}

	const remove = async (id: string) => {
		try {
			await http.delete(`/todos/${id}`)
			refetch()
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to delete todo')
		}
	}

	return {
		todos,
		create,
		mark,
		remove,
		refetch,
		loading,
		error,
	}
}
