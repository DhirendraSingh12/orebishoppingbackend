const PerksModel = require("../models/CategoryModel");
exports.createCategory = async (req, res) => {
  try {
    const { categoryName, parentId = null } = req.body;  // Parent ID is optional

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
        .filter(cat => String(cat.parentId) === String(parentId))  // Filter by parentId
        .map(cat => ({
          ...cat._doc,
          children: buildTree(cat._id),
        }));
    };

    res.status(200).json(buildTree());
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update Category
exports.categorDocumentEdite = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { categoryName, parentId } = req.body;
    const categorDocument = await PerksModel.findOneAndUpdate(
      { _id: categoryId },
      { categoryName, parentId },
      { new: true }
    );

    res.status(200).json({
      message: "Document updated successfully",
      document: categorDocument,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete Category
exports.deletePerkDocument = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await PerksModel.findByIdAndDelete(categoryId);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: error.message });
  }
}