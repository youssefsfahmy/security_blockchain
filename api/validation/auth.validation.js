const joi = require("joi");

const validateNewPatient = async (req, res, next) => {
  const schema = joi.object({
    doctorid: joi.number().required(),
    signature: joi.string().min(3).required(),
    encryptedKey: joi.string().min(3).required(),
    encryptedPatientData: joi.string().min(3).required(),
  });

  try {
    const value = await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    return res.send({
      statusCode: 444,
      error: err.details[0].message,
    });
  }
};

const validateNewVisit = async (req, res, next) => {
  const schema = joi.object({
    doctorid: joi.number().required(),
    signature: joi.string().min(3).required(),
    encryptedKey: joi.string().min(3).required(),
    encryptedVisitData: joi.string().min(3).required(),
  });
  try {
    const value = await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    return res.send({
      statusCode: 444,
      error: err.details[0].message,
    });
  }
};

const validateGetPatient = async (req, res, next) => {
  const schema = joi.object({
    doctorid: joi.number().required(),
    signature: joi.string().min(3).required(),
    encryptedKey: joi.string().min(3).required(),
    encryptedrequestData: joi.string().min(3).required(),
  });
  try {
    const value = await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    return res.send({
      statusCode: 444,
      error: err.details[0].message,
    });
  }
};

module.exports = { validateNewPatient, validateNewVisit, validateGetPatient };
