'use client'

import FormTodo from '@/features/todo/components/form-todo'
import ListTodo from '@/features/todo/components/list-todo'
import { useTodos } from '@/features/todo/hook/use-todos'
import { useState } from 'react'

export default function CardTodo() {
	const [isDone, setIsDone] = useState<undefined | boolean>(undefined)
	const [order, setOrder] = useState<'asc' | 'desc'>('desc')

	const { create, refetch, todos, mark, remove } = useTodos({
		isDone,
		orderRule: order,
	})

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		if (value === 'all') setIsDone(undefined)
		else setIsDone(value === 'true')
	}

	return (
		<div className='space-y-4 p-4 rounded-xl bg-white w-full max-w-xl mx-auto'>
			<div className='flex items-center justify-between gap-4'>
				<div className='flex items-center gap-2'>
					<label htmlFor='filter' className='text-sm font-medium'>
						Filter:
					</label>
					<select
						id='filter'
						value={String(isDone)}
						onChange={handleFilterChange}
						className='border px-2 py-1 rounded'
					>
						<option value='all'>All</option>
						<option value='false'>Undone</option>
						<option value='true'>Done</option>
					</select>
				</div>

				<button
					onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')}
					title={`Sort: ${order}`}
					className='p-2 hover:bg-gray-100 rounded bg-gray-50'
				>
					{order === 'desc' ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							className='fill-gray-400'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<path d='M16.852 5.011l.058 -.007l.09 -.004l.075 .003l.126 .017l.111 .03l.111 .044l.098 .052l.104 .074l.082 .073l3 3a1 1 0 1 1 -1.414 1.414l-1.293 -1.292v9.585a1 1 0 0 1 -2 0v-9.585l-1.293 1.292a1 1 0 0 1 -1.32 .083l-.094 -.083a1 1 0 0 1 0 -1.414l3 -3q .053 -.054 .112 -.097l.11 -.071l.114 -.054l.105 -.035z' />
							<path d='M9.5 4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1 -1.5 1.5h-4a1.5 1.5 0 0 1 -1.5 -1.5v-4a1.5 1.5 0 0 1 1.5 -1.5z' />
							<path d='M9.5 13a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1 -1.5 1.5h-4a1.5 1.5 0 0 1 -1.5 -1.5v-4a1.5 1.5 0 0 1 1.5 -1.5z' />
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							className='fill-gray-400'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<path d='M9.5 4a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1 -1.5 1.5h-4a1.5 1.5 0 0 1 -1.5 -1.5v-4a1.5 1.5 0 0 1 1.5 -1.5z' />
							<path d='M9.5 13a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1 -1.5 1.5h-4a1.5 1.5 0 0 1 -1.5 -1.5v-4a1.5 1.5 0 0 1 1.5 -1.5z' />
							<path d='M17 5a1 1 0 0 1 1 1v9.584l1.293 -1.291a1 1 0 0 1 1.32 -.083l.094 .083a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1 -.112 .097l-.11 .071l-.114 .054l-.105 .035l-.149 .03l-.117 .006l-.075 -.003l-.126 -.017l-.111 -.03l-.111 -.044l-.098 -.052l-.096 -.067l-.09 -.08l-3 -3a1 1 0 0 1 1.414 -1.414l1.293 1.293v-9.586a1 1 0 0 1 1 -1' />
						</svg>
					)}
				</button>
			</div>

			<FormTodo create={create} refetch={refetch} />
			<ListTodo todos={todos} mark={mark} remove={remove} />
		</div>
	)
}
