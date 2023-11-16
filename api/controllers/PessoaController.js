const {PessoasServices} = require('../services');
const pessoasServices = new PessoasServices('Pessoas');

class PessoaController {
	static async pegarTodasPessoas(req, res){
		try {
			//scope "selectTodos" criado no modelo vai trazer ativo = true || false
			const todasPessoas = await pessoasServices.pegarTodosOsRegistros();
			return res.status(200).send(todasPessoas);
		} catch (error) {
			return res.status(500).send({message: error.message});
		}
	}

	static async pegarTodasPessoasAtivas(req, res){
		try {
			//defaultScope do modelo chama com "ativo = true"
			const todasPessoasAtivas = await pessoasServices.pegarTodosOsRegistrosAtivos();
			return res.status(200).send(todasPessoasAtivas);
		} catch (error) {
			return res.status(500).send({message: error.message});
		}
	}

	static async pegarPessoaPeloId(req, res){
		try {
			const { id } = req.params;
			//const pessoaRetorno = await database.Pessoas.findByPk(Number(id));
			//Posso usar tambem a opção findeOne({ where: { id: id } });
			//const pessoaRetorno = await database.PessoasfindeOne({ where: { id: id } })

			const pessoaRetorno = await pessoasServices.pegaUmRegistro({ id });
			return res.status(200).send(pessoaRetorno);

		} catch (error) {
			return res.status(500).send({Message: 'Erro interno do servidor: ' + error.message});
		}
	}

	static async cadastrarPessoa(req, res){
		try {
			const novaPessoa = req.body;
			const retornoPessoa = await pessoasServices.criaRegistro(novaPessoa);

			//Aqui poderia validar o retornoPessoa se existe
			res.status(201).send(retornoPessoa);
		} catch (error) {
			return res.status(500).send({Message: 'Erro interno do servidor: ' + error.message});
		}
	}

	static async atualizarPessoa(req, res){
		try {
			const pessoaAtualizar = req.body;
			const { id } = req.params;

			await pessoasServices.atualizaRegistro(pessoaAtualizar, Number(id));


			//Aqui poderia validar o retornoPessoa se existe
			res.status(200).send({Message: 'Atualizado com sucesso'});
		} catch (error) {
			return res.status(500).send({Message: 'Erro interno do servidor: ' + error.message});
		}
	}

	static async deletarPessoa(req, res){
		try {
			const { id } = req.params;
			await pessoasServices.apagaRegistro(Number(id));

			res.status(200).send({Message: 'Excluido com sucesso'});
		} catch (error) {
			return res.status(500).send({Message: 'Erro interno do servidor: ' + error.message});
		}
	}

	static async restauraPessoa(req, res){

		try {
			const {id} = req.params;
			const registroRestaurado = await pessoasServices.restauraRegistro(Number(id));
			return res.status(200).json({message: `id ${id} restaurado`, data: registroRestaurado});

		} catch (error) {
			return res.status(500).send({Message: 'Erro interno do servidor: ' + error.message});
            
		}
	}


	static async pegarMatriculas(req, res){
		try {
			const { estudanteId } = req.params;
			const matriculasRetorno = await pessoasServices.pegaMatriculasPorEstudante({ id: Number(estudanteId) });
			return res.status(200).send(matriculasRetorno);

		} catch (error) {
			return res.status(500).send({Message: 'Erro interno do servidor: ' + error.message});
		}
	}

	static async cancelaPessoa(req, res){
		try {
			const {estudanteId} = req.params;

			await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId));
			return res.status(200).send({message: `matrículas ref. estudante ${estudanteId} canceladas`});

		} catch (error) {
			return res.status(500).send({Message: 'Erro interno do servidor: ' + error.message});
		}
	}
}

module.exports = PessoaController;