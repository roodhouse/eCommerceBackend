const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    include: [{ model: Product, through: Product, as: 'product'}];
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product, through: Product, as: 'product'}]
  });
  if (!categoryData) {
    res.status(404).json( { message: 'no category found with this id'});
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

// create a new category
router.post('/', async (req, res) => {
  try {
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
} catch(err) {
    res.status(400).json(err);
  };
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'no category to delete'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

module.exports = router;
