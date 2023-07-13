"use client";

import { useState } from "react";

export default function Convert() {
	const [numberAndType, setNumberAndType] = useState({ number: 0, type: "8" });
  const [result, setResult] = useState('')
  function onHandleChange({ target }) {
    const { name, value } = target;
		setNumberAndType(prevState => ({
			...prevState,
			[name]: value,
		}));
	}

  function binario(e) {
    e.preventDefault()
    const { number, type } = numberAndType
    const typeValue = Number(type)
		if (!number) {
			return 0;
		}
		var num = number;
		var ar = [];

		while (num > 0) {
			if (typeValue === 16) {
				switch (num % typeValue) {
					case 10:
						ar.unshift("A");
						break;
					case 11:
						ar.unshift("B");
						break;
					case 12:
						ar.unshift("C");
						break;
					case 13:
						ar.unshift("D");
						break;
					case 14:
						ar.unshift("E");
						break;
					case 15:
						ar.unshift("F");
						break;
					default:
						ar.unshift(num % typeValue);
				}
			} else {
				ar.unshift(num % typeValue);
			}
			num = Math.floor(num / typeValue);
		}

    setResult(ar.join(""))
	}

	return (
		<form onSubmit={binario}>
			<input
				type='number'
				value={numberAndType.number}
				name='number'
				onChange={onHandleChange}
			/>
			<select name='type' id='country' onChange={onHandleChange}>
				<option value='2'>Binario</option>
				<option value='16'>Hexadecimal</option>
				<option value='8'>Octal</option>
      </select>
      <button type="submit" >oxi </button>
      <h1>{result }</h1>
      
		</form>
	);
}
