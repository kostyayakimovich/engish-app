const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const wordsController = require('../controllers/words-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post(
 '/registration',
 body('email').isEmail(),
 body('password').isLength({ min: 3, max: 32 }),
 userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.post('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

router.post('/add-words', wordsController.addWord);
router.post('/remove-words', wordsController.removeWord);
router.post('/edit-words', wordsController.editWord);
router.post('/get-words', wordsController.getWords);

module.exports = router;
