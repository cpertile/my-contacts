import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { expect, test } from 'vitest'
import Main from '../src/main'

test('cria um contato', async () => {
	// Arrange - Renderizar a aplicação e navegar até o formulário
	render(<Main />)
	await userEvent.click(await screen.findByText('Lista vazia'))
	await userEvent.click(await screen.findByText('Novo'))
	
	// Act - Encontrar e interagir com os elementos
	const firstNameInput = await screen.findByTestId('firstname-field')
	const lastNameInput = await screen.findByTestId('lastname-field')
	const emailInput = await screen.findByTestId('email-field')
	const phoneInput = await screen.findByTestId('phone-field')
	const saveButton = await screen.findByText('Salvar')
	await userEvent.type(firstNameInput, 'Pessoa')
	await userEvent.type(lastNameInput, 'Sobrenome')
	await userEvent.type(emailInput, 'email@email.com')
	await userEvent.type(phoneInput, '11222223333')
	await userEvent.click(saveButton)

	// Assert - Verificar se os elementos estão em tela
	const nameDisplay = await screen.findByTestId('name-display')
	const emailDisplay = await screen.findByText('email@email.com')
	const phoneDisplay = await screen.findByText('(11) 22222-3333')

	expect(nameDisplay).toBeInTheDocument()
	expect(emailDisplay).toBeInTheDocument()
	expect(phoneDisplay).toBeInTheDocument()
})

test('impede criar sem nome/sobrenome', async () => {
	// Arrange - Renderizar a aplicação e navegar até /novo
	render(<Main />)
	await userEvent.click(await screen.findByText('Lista vazia'))
	await userEvent.click(await screen.findByText('Novo'))
	
	// Act - Encontrar e interagir com os elementos
	const firstNameInput = await screen.findByPlaceholderText('Primeiro nome')
	const lastNameInput = await screen.findByPlaceholderText('Sobrenome')
	const saveButton = await screen.findByText('Salvar')
	await userEvent.click(saveButton)

	// Assert - Se os elementos ainda estiverem em tela, o form foi impedido com sucesso.
	expect(firstNameInput).toHaveProperty('required')
	expect(lastNameInput).toHaveProperty('required')
	expect(firstNameInput).toBeInTheDocument()
	expect(lastNameInput).toBeInTheDocument()
	expect(saveButton).toBeInTheDocument()
})