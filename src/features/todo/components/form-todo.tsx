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
				className='w-full p-2 border border-gray-300 rounded-lg'
				onChange={(e) => setItem(e.target.value)}
				placeholder='Add a new todo'
			/>
			<button type='submit' className='hover:bg-blue-50 w-10 h-10 hover:text-blue-500 flex justify-center items-center rounded-lg'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path stroke='none' d='M0 0h24v24H0z' fill='none' />
					<path d='M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z' />
					<path d='M6.5 12h14.5' />
				</svg>
			</button>
		</form>
	)
}
