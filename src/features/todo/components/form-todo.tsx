'use client'

import { useState } from 'react'

export default function FormTodo({
	create,
	refetch,
}: {
	create: (data: { item: string }) => Promise<void>
	refetch: () => void
}) {
	const [item, setItem] = useState('')

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await create({ item })
		refetch()
		setItem('')
	}

	return (
		<form className='flex gap-2 mb-4' onSubmit={onSubmit}>
			<input
				type='text'
				value={item}
				className='w-full p-2 border border-gray-300 rounded'
				onChange={(e) => setItem(e.target.value)}
				placeholder='Add a new todo'
			/>
			<button type='submit'>Add</button>
		</form>
	)
}
