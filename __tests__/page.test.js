import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Page from '../src/app/page';

describe('1. Page Component', () => {
  test('renders correctly', () => {
    render(<Page />);
  
    // Verifica se o componente é renderizado corretamente
    const inputElement = screen.getByPlaceholderText('Insira um valor numérico');
    const selectElement = screen.getByLabelText('Selecione o tipo de conversão:');
    const submitButton = screen.getByText('Enviar');
  
    expect(inputElement).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<Page />);
  
    // Simula a mudança de valor no campo de input
    const inputElement = screen.getByPlaceholderText('Insira um valor numérico');
    fireEvent.change(inputElement, { target: { value: '10' } });
  
    // Verifica se o estado é atualizado corretamente
    expect(inputElement.value).toBe('10');
  });

  test('updates state on select change', () => {
    render(<Page />);
  
    // Simula a mudança de valor no campo de select
    const selectElement = screen.getByLabelText('Selecione o tipo de conversão:');
    fireEvent.change(selectElement, { target: { value: 'Hexadecimal' } });
  
    // Verifica se o estado é atualizado corretamente
    expect(selectElement.value).toBe('Hexadecimal');
  });

  
});


describe('2. Submits Form and Displays Result in unit', () => {
  test('in Hexadecimal', () => {
    render(<Page />);
  
    // Simula a submissão do formulário
    const inputElement = screen.getByPlaceholderText('Insira um valor numérico');
    const selectElement = screen.getByLabelText('Selecione o tipo de conversão:');
    const submitButton = screen.getByText('Enviar');
    fireEvent.change(inputElement, { target: { value: '255' } });
    fireEvent.change(selectElement, { target: { value: 'Hexadecimal' } });
    fireEvent.click(submitButton);
  
    // Verifica se o resultado é exibido corretamente
    const resultElement = screen.getByText('FF');
    expect(resultElement).toBeInTheDocument();
  });

  test('in Binário', () => {
    render(<Page />);
  
    // Simula a submissão do formulário
    const inputElement = screen.getByPlaceholderText('Insira um valor numérico');
    const selectElement = screen.getByLabelText('Selecione o tipo de conversão:');
    const submitButton = screen.getByText('Enviar');
    fireEvent.change(inputElement, { target: { value: '124' } });
    fireEvent.change(selectElement, { target: { value: 'Binário' } });
    fireEvent.click(submitButton);
  
    // Verifica se o resultado é exibido corretamente
    const resultElement = screen.getByText('1111100');
    expect(resultElement).toBeInTheDocument();
  });

  test('in Octal', () => {
    render(<Page />);
  
    // Simula a submissão do formulário
    const inputElement = screen.getByPlaceholderText('Insira um valor numérico');
    const selectElement = screen.getByLabelText('Selecione o tipo de conversão:');
    const submitButton = screen.getByText('Enviar');
    fireEvent.change(inputElement, { target: { value: '231' } });
    fireEvent.change(selectElement, { target: { value: 'Octal' } });
    fireEvent.click(submitButton);
  
    // Verifica se o resultado é exibido corretamente
    const resultElement = screen.getByText('347');
    expect(resultElement).toBeInTheDocument();
  });

  
});
describe('3. Submits Form and Displays Result on list', () => {
  test('in Hexadecimal', () => {
    render(<Page />);

    // Seleciona os elementos do formulário
    const numberInput = screen.getByLabelText('Insira um valor numérico:');
    const typeSelect = screen.getByLabelText('Selecione o tipo de conversão:');
    const listSelect = screen.getByLabelText('Tipo de exibição:');
    const submitButton = screen.getByText('Enviar');

    // Insere os valores no formulário
    fireEvent.change(numberInput, { target: { value: '5' } });
    fireEvent.change(typeSelect, { target: { value: 'Hexadecimal' } });
    fireEvent.change(listSelect, { target: { value: 'true' } });
    fireEvent.click(submitButton);

    // Verifica se o resultado é exibido corretamente
    const resultElements = screen.getAllByRole('cell');
    expect(resultElements).toHaveLength(12); // O array deve conter 12 células (6 linhas x 2 colunas)
    expect(resultElements[0]).toHaveTextContent('0');
    expect(resultElements[1]).toHaveTextContent('0');
    expect(resultElements[2]).toHaveTextContent('1');
    expect(resultElements[3]).toHaveTextContent('1');
    expect(resultElements[4]).toHaveTextContent('2');
    expect(resultElements[5]).toHaveTextContent('2');
  });

  test('in Binário', () => {
    render(<Page />);

    // Seleciona os elementos do formulário
    const numberInput = screen.getByLabelText('Insira um valor numérico:');
    const typeSelect = screen.getByLabelText('Selecione o tipo de conversão:');
    const listSelect = screen.getByLabelText('Tipo de exibição:');
    const submitButton = screen.getByText('Enviar');

    // Insere os valores no formulário
    fireEvent.change(numberInput, { target: { value: '5' } });
    fireEvent.change(typeSelect, { target: { value: 'Binário' } });
    fireEvent.change(listSelect, { target: { value: 'true' } });
    fireEvent.click(submitButton);

    // Verifica se o resultado é exibido corretamente
    const resultElements = screen.getAllByRole('cell');
    expect(resultElements).toHaveLength(12); // O array deve conter 12 células (6 linhas x 2 colunas)
    expect(resultElements[0]).toHaveTextContent('0');
    expect(resultElements[1]).toHaveTextContent('0');
    expect(resultElements[2]).toHaveTextContent('1');
    expect(resultElements[3]).toHaveTextContent('1');
    expect(resultElements[4]).toHaveTextContent('2');
    expect(resultElements[5]).toHaveTextContent('10');
    expect(resultElements[6]).toHaveTextContent('3');
    expect(resultElements[7]).toHaveTextContent('11');
  });

  test('in Octal', () => {
    render(<Page />);

    // Seleciona os elementos do formulário
    const numberInput = screen.getByLabelText('Insira um valor numérico:');
    const typeSelect = screen.getByLabelText('Selecione o tipo de conversão:');
    const listSelect = screen.getByLabelText('Tipo de exibição:');
    const submitButton = screen.getByText('Enviar');

    // Insere os valores no formulário
    fireEvent.change(numberInput, { target: { value: '11' } });
    fireEvent.change(typeSelect, { target: { value: 'Octal' } });
    fireEvent.change(listSelect, { target: { value: 'true' } });
    fireEvent.click(submitButton);

    // Verifica se o resultado é exibido corretamente
    const resultElements = screen.getAllByRole('cell');
    expect(resultElements).toHaveLength(24);
    expect(resultElements[0]).toHaveTextContent('0');
    expect(resultElements[1]).toHaveTextContent('0');
    expect(resultElements[2]).toHaveTextContent('1');
    expect(resultElements[3]).toHaveTextContent('1');
    expect(resultElements[4]).toHaveTextContent('2');
    expect(resultElements[5]).toHaveTextContent('2');
    expect(resultElements[6]).toHaveTextContent('3');
    expect(resultElements[7]).toHaveTextContent('3');
    expect(resultElements[8]).toHaveTextContent('4');
    expect(resultElements[9]).toHaveTextContent('4');
    expect(resultElements[10]).toHaveTextContent('5');
    expect(resultElements[11]).toHaveTextContent('5');
    expect(resultElements[12]).toHaveTextContent('6');
    expect(resultElements[13]).toHaveTextContent('6');
    expect(resultElements[14]).toHaveTextContent('7');
    expect(resultElements[15]).toHaveTextContent('7');
    expect(resultElements[16]).toHaveTextContent('8');
    expect(resultElements[17]).toHaveTextContent('10');
    expect(resultElements[18]).toHaveTextContent('9');
    expect(resultElements[19]).toHaveTextContent('11')
    expect(resultElements[20]).toHaveTextContent('10');
    expect(resultElements[21]).toHaveTextContent('12');
  });
});