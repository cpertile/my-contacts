import Button from '../../components/Button/Button'
import { Choices } from '../../types/enums'
import './WelcomePage.css'

const WelcomePage: React.FC<{ handleChoice: (arg: Choices) => void }> = ({ handleChoice }) => {
	return (
		<div id="welcome">
			<div className='card'>
				<h1>Gerenciador de Contatos</h1>
				Selecione uma opção para prosseguir:
				<span>
					<Button
						data-variant='primary'
						onClick={() => handleChoice(Choices.populated)}
					>
						Lista populada
					</Button>
					<i>Para visualizar uma lista de demonstração</i>
				</span>
				<span>
					<Button
						data-variant='secondary'
						onClick={() => handleChoice(Choices.empty)}
					>
						Lista vazia
					</Button>
					<i>Para utilizar a aplicação do zero</i>
				</span>
			</div>
		</div>
	)
}

export default WelcomePage