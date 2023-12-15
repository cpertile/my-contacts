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

	await userEvent.click(await screen.findByText('Excluir'))

	// Assert - Se o texto 'Sem contatos' aparecer, a lista está vazia
	expect(await screen.findByText('Sem contatos')).toBeInTheDocument()
})