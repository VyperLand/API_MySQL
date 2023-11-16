const Services = require('./Services');
const database = require('../models');

class PessoasServices extends Services{
	constructor(){
		super('Pessoas');
		this.matriculas = new Services('Matriculas');
	}
	//metodos especificos do controlador de pessoas

	async pegarTodosOsRegistrosAtivos(where = {}){
		try {
			return database[this.nomeDoModelo].findAll({ where: {...where}});
		} catch (error) {
			return {message: error.message};
		}
	}

	async pegarTodosOsRegistros(where = {}){
		try {
			return database[this.nomeDoModelo].scope('selectTodos').findAll({ where: {...where}});
		} catch (error) {
			return {message: error.message};
		}
	}

	async cancelaPessoaEMatriculas(estudanteId){
		return database.sequelize.transaction(async t =>{
			await super.atualizaRegistro({ativo: false}, estudanteId, {transaction: t});
			await this.matriculas.atualizaRegistros({status: 'cancelado'}, {estudante_id: Number(estudanteId)},{transaction: t});
		});

	}

	async pegaMatriculasPorEstudante(where = {}) {
		const matriculas = await database[this.nomeDoModelo]
			.findOne({ where: { ...where } });
		return matriculas.getAulasMatriculadas();
	}
}

module.exports = PessoasServices;