import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { expect, test } from 'vitest'
import Main from '../src/main'

test('edita um contato', async () => {
	// Arrange - Renderizar a aplicação e navegar até o formulário
	render(<Main />)
	await userEvent.click(await screen.findByText('Lista vazia'))
	await userEvent.click(await screen.findByText('Novo'))
	
	// Act - Encontrar e interagir com os elementos
	const firstNameInput = await screen.findByTestId('firstname-field')
	const lastNameInput = await screen.findByTestId('lastname-field')
	const saveButton = await screen.findByText('Salvar')
	await userEvent.type(firstNameInput, 'Pessoa')
	await userEvent.type(lastNameInput, 'Sobrenome')
	await userEvent.click(saveButton)

	await userEvent.click(await screen.findByText('Editar'))

	await userEvent.type(await screen.findByPlaceholderText('email@exemplo.com.br'), 'email@email.com')
	await userEvent.click(await screen.findByText('Salvar'))

	// Assert - Verificar se o email, criado na edição, está em tela junto com o resto
	const nameDisplay = await screen.findByTestId('name-display')
	const emailDisplay = await screen.findByText('email@email.com')

	expect(nameDisplay).toBeInTheDocument()
	expect(emailDisplay).toBeInTheDocument()
})