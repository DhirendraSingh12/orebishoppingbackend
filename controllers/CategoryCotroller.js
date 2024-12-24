const PerksModel = require("../models/CategoryModel");
exports.createCategory = async (req, res) => {
  try {
    const { categoryName, parentId } = req.body;

    const category = new PerksModel({
      categoryName,
      parentId,
    });

    await category.save();
    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: error.message });
  }
};

// Fetch Categories Hierarchically
exports.getCategories = async (req, res) => {
  try {
    const categories = await PerksModel.find({});
    
    const buildTree = (parentId = null) => {
      return categories
        .filter(cat => cat.parentId === parentId)
        .map(cat => ({
          ...cat._doc,
          children: buildTree(cat.categoryId),
        }));
    };

    res.status(200).json(buildTree());
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
};















exports.categorDocumentEdite = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { categoryName} = req.body;
    const categorDocument = await PerksModel.findOneAndUpdate({ categoryId });
    categorDocument.categoryName = categoryName || categorDocument.categoryName;
   
    await categorDocument.save();
    res.status(200).json({
      message: "Document updated successfully",
      document: categorDocument,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

exports.getAllcategorDocument = async (req, res) => {
  try {
    const categorDocument = await PerksModel.find();
    res.status(200).json({
      message: "Documents fetched successfully",
      categorDocument, 
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

exports.deletePerkDocument = async (req, res) => {
    try {
      const { categoryId } = req.params;
      await PerksModel.findOneAndDelete({ categoryId });
      res.status(200).json({ message: 'Perks  deleted successfully' });
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  };

  exports.getcategorDocumentById = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const categorDocument = await PerksModel.findOne({categoryId});
      res.status(200).json({
        message: 'Document  fetched By Id successfully',
        document: categorDocument,
      });
    } catch (error) {
      console.error('Error fetching document:', error);
      res.status(500).json({ error: error.message || 'An unexpected error occurred' });
    }
  };