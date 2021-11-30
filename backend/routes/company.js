const express = require('express')
const router = express.Router();

const companyController = require('../controllers/companyController')

const { isAuthenticatedUser , authorizeRoles } = require('../middlewares/auth')

router.route('/company').get(companyController.getcompanys);
router.route('/admin/companys').get(companyController.getAdminCompanys);
router.route('/company/:id').get(companyController.getSinglecompany);

router.route('/admin/company/new').post(
    //isAuthenticatedUser, authorizeRoles('admin'),
     companyController.newCompany);

router.route('/admin/company/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), companyController.updatecompany)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), companyController.deletecompany);

module.exports = router;