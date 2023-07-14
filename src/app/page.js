"use client";

import { useState } from "react";

export default function Page() {
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

	function casesOfHexadecimal(num, typeInNumber) {
		
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
		let arrayValues = [];

		if (lista) {
			for (let i = 0; i <= number; i++) {
				arrayValues.push({ numero: i, binario: binario(i, type) });
			}
			setResult(arrayValues);
		} else {
			setResult([{ numero: number, binario: binario(number, type) }]);
		}
	}

  return (
    <div className="flex items-center justify-center h-screen">
      
      <div className="max-w-sm p-6 bg-white border border-slate-200 rounded-lg shadow dark:bg-slate-800 dark:border-slate-700">
      <p className="text-center text-2xl font-extrabold mt-10 text-transparent bg-clip-text bg-gradient-to-r to-sky-400 from-indigo-500">CONVERSÕES DE BASE DECIMAL</p>

		<form onSubmit={onSubmit} className='flex flex-col items-center mt-8'>
			<label htmlFor='number' className='block  text-sm font-medium text-slate-900 '>
				Insira um valor numérico:
			</label>
			<input
				type='number'
				id='number'
				value={numberAndType.number}
				name='number'
				onChange={onHandleChange}
				className='w-64 px-4 py-2 rounded border mb-4 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  '
				placeholder='Insira um valor numérico'
			/>

			<label htmlFor='type' className='block  text-sm font-medium text-slate-900 '>
				Selecione o tipo de conversão:
			</label>
			<select
				id='type'
				name='type'
				onChange={onHandleChange}
				className='w-64 px-4 py-2 rounded border mb-4 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 '
			>
				<option value='Binário'>Binário</option>
				<option value='Hexadecimal'>Hexadecimal</option>
				<option value='Octal'>Octal</option>
			</select>

			<label htmlFor='lista' className='block  text-sm font-medium text-slate-900 '>
				Tipo de exibição:
			</label>
			<select
				id='lista'
				className='w-64 px-4 py-2 rounded border mb-4 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 '
				onChange={e => setLista(e.target.value === "true")}
			>
				<option value={false}>Unitário</option>
				<option value={true}>Lista</option>
			</select>

			<button
				type='submit'
				className='text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center '
			>
				Enviar
			</button>

			{result[0] && (
				<div
					className='relative overflow-x-auto overflow-y-auto mt-10'
					style={{ maxHeight: "300px" }}
				>
					<table className='w-full text-sm text-left text-slate-500 '>
						<thead className='text-xs text-slate-700 uppercase bg-slate-50'>
							<tr>
								<th scope='col' className='px-6 py-3'>
									Numero
								</th>
								<th scope='col' className='px-6 py-3 '>
								{numberAndType.type}
								</th>
							</tr>
						</thead>
						<tbody>
							{result.map(({ numero, binario }) => (
								<tr key={numero} className='bg-white border-b '>
									<td className='px-6 py-4 font-medium text-slate-900 whitespace-nowrap '>
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
      <p className="text-center text-slate-800 text-sm font-medium mt-10">feito por <a className="text-blue-600"href="https://www.linkedin.com/in/walthercio-almeida/" target="_blank">Walthercio Almeida</a></p>
      </div>
      
      </div>
	);
}
