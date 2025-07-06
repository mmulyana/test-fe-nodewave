import Check from '@/shared/components/check'
import { Todo } from '@/shared/types'

export default function ListTodo({
	todos,
	mark,
	remove,
}: {
	todos?: Todo[]
	mark: (id: string, payload: { action: string }) => void
	remove: (id: string) => void
}) {
	return (
		<ul>
			{todos?.map((todo) => (
				<li key={todo.id} className='flex items-center justify-between p-2'>
					<div className='space-x-2 flex items-center'>
						<button
							onClick={() =>
								mark(todo.id, { action: todo.isDone ? 'UNDONE' : 'DONE' })
							}
						>
							<Check isDone={todo.isDone} />
						</button>
						<span className='text-gray-800'>{todo.item}</span>
					</div>
					<button onClick={() => remove(todo.id)} className='text-red-500'>
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
							className='icon icon-tabler icons-tabler-outline icon-tabler-x'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<path d='M18 6l-12 12' />
							<path d='M6 6l12 12' />
						</svg>
					</button>
				</li>
			))}
		</ul>
	)
}
