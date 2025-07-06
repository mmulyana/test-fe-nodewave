import React from 'react'

type props = {
	id?: string
	label?: string
	name?: string
	type?: string
	className?: string
	suffix?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function FloatingInput({
	id,
	label,
	name,
	type = 'text',
	className = '',
	suffix,
	...props
}: props) {
	return (
		<div className={`group relative ${className}`}>
			{label !== '' && (
				<label
					htmlFor={id}
					className='absolute top-1/2 -translate-y-1/2 px-2 text-sm cursor-text transition-all block origin-start text-muted-foreground/70 group-focus-within:text-[#50B5FF] group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium group-focus-within:cursor-default has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-[#50B5FF]
          text-[#B5B5BE] bg-auto-clip bg-transparent
          '
				>
					<span className='inline-flex px-1 bg-white'>{label}</span>
				</label>
			)}
			<input
				id={id}
				name={name}
				type={type}
				placeholder=' '
				className='w-full text-[#B5B5BE] rounded-md border border-[#E2E2EA] bg-transparent px-3 pt-3 pb-2.5 text-sm outline-none transition-all focus:border-[#50B5FF] placeholder-transparen
        invalid:focus:border-[#50B5FF] valid:[&:not(:placeholder-shown)]:border-[#50B5FF]
        valid:text-[#44444F]
        '
				{...props}
			/>
			{suffix && (
				<p className='text-sm text-[#44444F] absolute top-1/2 -translate-y-1/2 right-3.5'>
					{suffix}
				</p>
			)}
		</div>
	)
}
