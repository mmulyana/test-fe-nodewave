'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

import { useUserContext } from '@/shared/stores/use-context'
import FloatingInput from '@/shared/components/input-float'

import { useLoginRegister } from '../hooks/use-login-register'
import ShowPassword from '@/shared/components/show-password'

export default function FormLoginRegister({
	variant = 'login',
}: {
	variant: 'login' | 'register'
}) {
	const { login, register } = useLoginRegister()
	const { setUser } = useUserContext()
	const router = useRouter()

	const [showPassword, setShowPassword] = useState(true)
	const [showConfirmPassword, setShowConfirmPassword] = useState(true)

	const [form, setForm] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		phone: '',
		phoneCountryCode: '',
		country: '',
		confirmPassword: '',
		about: '',
	})

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (isLogin) {
			const res = await login({ email: form.email, password: form.password })
			if (res && typeof res === 'object' && 'user' in res) {
				const { email, fullName, role, id } = res.user

				setUser({
					email,
					fullName,
					role,
					id,
				})
				router.push('/todo')
			}
		} else {
			const res = await register({
				email: form.email + '@squareteam.com',
				fullName: `${form.firstName} ${form.lastName}`,
				password: form.password,
			})
			if (res) {
				router.push('/todo')
			}
		}
	}

	const isLogin = variant === 'login'
	const title = isLogin ? 'Sign In' : 'Register'
	const subtitle = isLogin
		? 'Just sign in if you have an account in here. Enjoy our Website'
		: 'Lets Sign up first for enter into Square Website. Uh She Up!'

	return (
		<div className='flex flex-col items-center justify-center w-full h-full p-5'>
			<div className='space-y-2.5 mb-10'>
				<h1 className='text-center text-[#44444F] text-lg md:text-2xl font-bold'>
					{title}
				</h1>
				<p className='text-center text-[#92929D]'>{subtitle}</p>
			</div>

			<div className='w-[560px] max-w-full p-[30px] bg-white rounded-[20px]'>
				<form onSubmit={onSubmit} className='flex flex-col gap-5'>
					{!isLogin && (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							<FloatingInput
								id='firstName'
								label='First Name'
								onChange={onChange}
								name='firstName'
								value={form.firstName}
							/>
							<FloatingInput
								id='lastName'
								label='Last Name'
								onChange={onChange}
								name='lastName'
								value={form.lastName}
							/>
						</div>
					)}
					{!isLogin && (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							<div className='flex gap-2.5'>
								<select className='h-full border w-14 rounded border-[#50B5FF]'>
									<option value='+62'>+62</option>
								</select>
								<FloatingInput
									id='phone'
									label='Phone Number'
									onChange={onChange}
									name='phone'
									value={form.phone}
									className='w-full'
								/>
							</div>
							<FloatingInput
								id='country'
								label='Your Country'
								onChange={onChange}
								name='country'
								value={form.country}
							/>
						</div>
					)}
					<FloatingInput
						id='email'
						label={isLogin ? 'Your Email / Username' : 'Mail Address'}
						onChange={onChange}
						name='email'
						value={form.email}
						suffix={!isLogin ? '@squareteam.com' : undefined}
					/>
					<div
						className={!isLogin ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : ''}
					>
						<FloatingInput
							id='password'
							label={isLogin ? 'Enter Password' : 'Password'}
							onChange={onChange}
							value={form.password}
							name='password'
							type={showPassword ? 'password' : 'text'}
							suffix={
								<ShowPassword
									open={showPassword}
									onClick={() => setShowPassword(!showPassword)}
								/>
							}
						/>
						{!isLogin && (
							<FloatingInput
								id='confirmPassword'
								label='Confirm Password'
								value={form.confirmPassword}
								onChange={onChange}
								name='confirmPassword'
								type={showConfirmPassword ? 'password' : 'text'}
								suffix={
									<ShowPassword
										open={showConfirmPassword}
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									/>
								}
							/>
						)}
					</div>
					{!isLogin && (
						<div className='flex flex-col gap-2.5'>
							<label>Tell us about yourself</label>
							<textarea
								placeholder='Tell us about yourself'
								className='w-full text-[#B5B5BE] rounded-md border border-[#E2E2EA] bg-transparent px-3 pt-3 pb-2.5 text-sm outline-none transition-all focus:border-[#50B5FF] placeholder-transparen invalid:focus:border-[#50B5FF] valid:[&:not(:placeholder-shown)]:border-[#50B5FF] valid:text-[#44444F]'
								name='about'
								onChange={(e) => setForm({ ...form, about: e.target.value })}
								value={form.about}
							></textarea>
						</div>
					)}
					{isLogin && (
						<div className='flex justify-between items-center'>
							<div className='flex gap-2.5 items-center'>
								<input type='checkbox' />
								<p>Remember Me</p>
							</div>
							<Link href='#' className='text-[#50B5FF]'>
								Forgot Password
							</Link>
						</div>
					)}

					<div
						className={['flex gap-5', isLogin ? 'mt-2.5' : 'mt-12'].join(' ')}
					>
						{!isLogin && (
							<Link
								href='/login'
								className='text-[#696974] py-[15px] rounded-[10px] bg-[#F1F1F5] font-semibold text-xs w-[150px] flex justify-center'
							>
								Login
							</Link>
						)}
						<button className='cursor-pointer w-full bg-[#0062FF] py-[15px] rounded-[10px] text-white font-semibold text-xs'>
							{isLogin ? 'Login' : 'Register'}
						</button>
					</div>
				</form>
			</div>
			<div>
				<p className='mt-8 text-[#92929D] text-center'>
					{isLogin ? 'Dont' : 'Already'} have an Square account?
					<Link
						href={isLogin ? '/register' : '/login'}
						className='pl-1 text-[#0062FF] font-medium'
					>
						{isLogin ? 'Register' : 'Login in'}
					</Link>
				</p>
			</div>
		</div>
	)
}
