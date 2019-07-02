module.exports = (app) => {
  const create = async (req, res) => {
    const result = await app.services.account.save(req.body);
    return res.status(201).json(result[0]);
  };

  const getAll = async (req, res) => {
    const result = await app.services.account.findAll()
    return res.status(200).json(result);
  }

  const get = async (req, res) => {
    const result = await app.services.account.find({id: req.params.id})
    return res.status(200).json(result);
  }

  return { create, getAll, get };
};