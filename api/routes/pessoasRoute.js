const {Router} = require('express');
const PessoaController = require('../controllers/PessoaController');
const MatriculaController = require('../controllers/MatriculaController');

const router = Router();

router.get('/pessoas', PessoaController.pegarTodasPessoasAtivas);
router.get('/pessoas/todos', PessoaController.pegarTodasPessoas);
router.get('/pessoas/:id', PessoaController.pegarPessoaPeloId);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.pegarUmaMatricula);
router.get('/pessoas/:estudanteId/matriculas', PessoaController.pegarMatriculas);
router.get('/pessoas/turma/:turmaId/matriculas', MatriculaController.pegarMatriculasPorTurma);
router.get('/pessoas/turmas/lotadas', MatriculaController.pegarTurmasLotadas);
router.post('/pessoas', PessoaController.cadastrarPessoa);
router.post('/pessoas/:estudanteId/matricula', MatriculaController.cadastrarMatricula);
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa);
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', MatriculaController.restauraMatricula);
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.atualizarMatricula);
router.delete('/pessoas/:id', PessoaController.deletarPessoa);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.deletarMatricula);

module.exports = router;