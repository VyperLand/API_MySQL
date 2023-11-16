'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Pessoas extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			Pessoas.hasMany(models.Turmas,{
				foreignKey: 'docente_id'
			}); // Por padrão ele iria criar PessoaId como FK na outra tabela, se eu não especificar o nome que quero
			Pessoas.hasMany(models.Matriculas,{
				foreignKey: 'estudante_id',
				scope: { //Criando escopo nas associação dos modelos/tabelas
					status: 'confirmado'
				},
				as: 'aulasMatriculadas' //Nomeclatura da chamada dos metodos gerados automaticamente pelo sequelize (get/set), usado no controlador, Ex.: getAulasMatriculadas
			});
		}
	}
	Pessoas.init({
		nome: {
			type: DataTypes.STRING,
			validate: {
				validaNome: function(dado){
					if(dado.length < 3) throw new Error('o campo nome deve ter mais de 3 caracteres');
				}
			}
		},
		ativo: DataTypes.BOOLEAN,
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: {
					args: true,
					msg: 'email inválido'
				}
			}
		},
		role: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Pessoas',
		paranoid: true,
		defaultScope: {
			where: {
				ativo: true
			}
		},
		scopes: {
			selectTodos: {
				where: {}
			}
		}
	});
	return Pessoas;
};
