const express = require("express");
const upload = require("../multerConfig");
const DocumentConttroller = require("../controllers/ProductController");
const BrandController = require("../controllers/BrandController");
const EmployeeController = require("../controllers/EmployeeController");
const LoginController = require("../controllers/LoginController");
const router = express.Router();
const  CategoryCotroller = require('../controllers/CategoryCotroller')
const ContactController = require('../controllers/ContactController')
// Employee Rotures Controller
router.post("/employee", EmployeeController.CreateEmployee);
router.get("/employee", EmployeeController.getAllEmployee);
router.get("/employee/:id", EmployeeController.getEmployeeUserById);
router.delete("/employee/:userId", EmployeeController.deleteEmployee);
router.put("/employee/:id", EmployeeController.updateEmployee);





// Documents Documents Routers
router.post(
  "/uploaddocument",
  upload.fields([
    { name: "productImage", maxCount: 1 },  // Product image
    { name: "partImages", maxCount: 10 },   // Multiple part images
  ]),
  DocumentConttroller.EmployeeDocument
);
router.put(
  "/uploaddocument/:productId",
  upload.single("image"),
  DocumentConttroller.EmployeeDocumentEdite
);
router.get("/uploaddocument", DocumentConttroller.getAllEmployeeDocuments);
router.get(
  "/uploaddocument/:productId",
  DocumentConttroller.getEmployeeDocumentById
);
router.get(
  "/uploaddocuments/:employeeId",
  DocumentConttroller.getEmployeedDocumentById
);
router.delete(
  "/uploaddocument/:productId",
  DocumentConttroller.EmployeeDocumentsDelete
);
router.put(
  "/uploaddocument/approved/:productId",
  DocumentConttroller.EmployeeDocApproveed
);
router.put(
  "/uploaddocument/reject/:productId",
  DocumentConttroller.EmployeeDocReject
);


// Perks  Employee category
router.post("/category", CategoryCotroller.createCategory);
router.get("/category", CategoryCotroller.getCategories);
// router.get("/category/:categoryId", CategoryCotroller.getcategorDocumentById);
router.put("/category/:categoryId", CategoryCotroller.categorDocumentEdite);
router.delete("/category/:categoryId", CategoryCotroller.deletePerkDocument);

// Perks  Employee Brand


router.post("/brand", BrandController.BrandDocument);
router.get("/brand", BrandController.getAllBrandDocument);
router.get("/brand/:brandId", BrandController.getBrandDocumentById);
router.put("/brand/:brandId", BrandController.BrandDocumentEdite);
router.delete("/brand/:brandId", BrandController.deleteBrandDocument);



// contact routers
router.post("/contact", ContactController.contactMessage);





router.post("/login", LoginController.loginUser);
router.post("/super", LoginController.SuperAdminLogin);
router.post("/admin", LoginController.AdminLogin);

module.exports = router;
