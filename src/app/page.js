"use client";

import { useState } from "react";

export default function Convert() {
	const [numberAndType, setNumberAndType] = useState({ number: 0, type: "Binário" });
	const [lista, setLista] = useState(false);
	const [result, setResult] = useState([]);
	function onHandleChange({ target }) {
		const { name, value } = target;
		setNumberAndType(prevState => ({
			...prevState,
			[name]: value,
		}));
	}

	function binario(number, type) {
		let typeInNumber = 2;
		if (!number) {
			return 0;
		}

		let num = number;
		let ar = [];
		switch (type) {
			case "Octal":
				typeInNumber = 8;
				break;
			case "Hexadecimal":
				typeInNumber = 16;
				break;
			case "Binário":
				typeInNumber = 2;
				break;
		}

		while (num > 0) {
			if (typeInNumber === 16) {
				switch (num % typeInNumber) {
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
						ar.unshift(num % typeInNumber);
				}
			} else {
				ar.unshift(num % typeInNumber);
			}
			num = Math.floor(num / typeInNumber);
		}

		return ar.join("");
	}

	function onSubmit(e) {
		e.preventDefault();
		const { number, type } = numberAndType;

		const arrayValues = lista
			? Array.from({ length: number + 1 }, (_, i) => ({
					numero: i,
					binario: binario(i, type),
			  }))
			: [{ numero: number, binario: binario(number, type) }];

		setResult(arrayValues);
	}

	return (
		<form onSubmit={onSubmit} className='flex flex-col items-center mt-8'>
			<label
				for='number'
				class='block  text-sm font-medium text-gray-900 dark:text-white'
			>
				Insira um valor numérico:
			</label>
			<input
				type='number'
				id='number'
				value={numberAndType.number}
				name='number'
				onChange={onHandleChange}
				className='w-64 px-4 py-2 rounded border mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  '
				placeholder='Insira um valor numérico'
			/>

			<label for='type' class='block  text-sm font-medium text-gray-900 dark:text-white'>
				Selecione o tipo de conversão:
			</label>
			<select
				id='type'
				name='type'
				onChange={onHandleChange}
				className='w-64 px-4 py-2 rounded border mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 '
			>
				<option value='Binário'>Binário</option>
				<option value='Hexadecimal'>Hexadecimal</option>
				<option value='Octal'>Octal</option>
			</select>

			<label for='lista' class='block  text-sm font-medium text-gray-900 dark:text-white'>
				Tipo de exibição:
			</label>
			<select
				id='lista'
				className='w-64 px-4 py-2 rounded border mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 '
				onChange={e => setLista(e.target.value === "true")}
			>
				<option value={false}>Unitário</option>
				<option value={true}>Lista</option>
			</select>

			<button
				type='submit'
				className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 '
			>
				Enviar
			</button>
			{result && (
			<div className='relative overflow-x-auto overflow-y-auto mt-10' style={{ maxHeight: '300px' }}>
      <h1>{numberAndType.type}</h1>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Numero
            </th>
            <th scope='col' className='px-6 py-3'>
              binario
            </th>
          </tr>
        </thead>
        <tbody>
          {result.map(({ numero, binario }) => (
            <tr key={numero} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                {numero}
              </td>
              <td className='px-6 py-4'>{binario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
			)}
		</form>
	);
}
