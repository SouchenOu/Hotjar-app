import Templates from '../Modules/Templates.js';

export const addTemplate = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (!name || !description || !image) {
      res.status(404).json({ message: 'one of the element not available' });
    }
    const template = new Templates({
      name,
      description,
      image,
    });

    const templateSave = await template.save();
    res.status(200).json(templateSave);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const getTemplates = async (req, res) => {
  try {
    const templates = await Templates.find();
    res.status(200).json(templates);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const searchTemplate = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Template name is required' });
    }

    const templates = await Templates.find({
      name: { $regex: name, $options: 'i' },
    });

    if (!templates || templates.length === 0) {
      return res
        .status(404)
        .json({ message: 'No templates found with the given name' });
    }
    res.status(200).json(templates);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const getTemplateId = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Templates.findById(id);
    if (!template) {
      return res.status(404).jon({ message: 'No template found' });
    }
    res.status(200).json(template);
  } catch (err) {
    err.status(500).json({ error: 'Server error', details: err.message });
  }
};
