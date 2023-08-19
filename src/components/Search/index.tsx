import React from 'react'
import debounce from 'lodash.debounce'
import style from './Search.module.scss'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/Slices/filter/slice'

export const Search: React.FC = () => {
	const dispatch = useDispatch()
	const [value, setValue] = React.useState('')
	const inputRef = React.useRef<HTMLInputElement>(null)

	const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
		console.log(event);		
		dispatch(setSearchValue(''))
		setValue('')
		inputRef.current?.focus()
	}

	const updateSearchValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 420),
		[]
	)
	
	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className={style.root}>
			<svg className={style.svgSearch} width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" clipRule="evenodd" d="M14.3764 12.4769C16.0464 10.1337 15.8302 6.85958 13.728 4.75736C11.3848 2.41421 7.58586 2.41421 5.24271 4.75736C2.89957 7.10051 2.89957 10.8995 5.24271 13.2426C7.34494 15.3449 10.619 15.561 12.9622 13.8911L18.6777 19.6066L20.092 18.1924L14.3764 12.4769ZM12.3138 6.17157C13.8759 7.73367 13.8759 10.2663 12.3138 11.8284C10.7517 13.3905 8.21902 13.3905 6.65692 11.8284C5.09483 10.2663 5.09483 7.73367 6.65692 6.17157C8.21902 4.60948 10.7517 4.60948 12.3138 6.17157Z" fill="black"/>
			</svg>
			<input
			 ref={inputRef}
			 value={value}
			 onChange={onChangeInput}
			 placeholder='Поиск...'
			 className={style.input} />
			{	value.length > 0 
				? <svg onClick={onClickClear} className={style.svgRemove} width="22px" height="22px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
						fill="#000000"
					/>
				</svg>
				: ''
			}
		</div>
	)
}
