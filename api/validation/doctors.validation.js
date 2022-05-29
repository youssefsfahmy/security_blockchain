const joi = require("joi");

const validateNewPatient = async (req, res, next) => {
  const schema = joi.object({
    doctorid: joi.number().required(),
    newPatient: joi
      .object({
        nationalid: joi.number().required().min(10000000000000),
        name: joi.string().min(3).required(),
        age: joi.number().required(),
        gender: joi.string().valid("Male", "Female"),
        weight: joi.number().required(),
        height: joi.number().required(),
        pulse: joi.number().required(),
      })
      .required(),
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
    newVisit: joi
      .object({
        nationalid: joi.number().required(),
        bloodpressure: joi.number().required(),
        glucose: joi.number().required(),
        temprature: joi.number().required(),
        pulse: joi.number().required(),
        reason: joi
          .string()
          .valid("checkup", "hypertension", "diabetes", "complain", "lab test")
          .required(),
        diagnosis: joi.string().required(),
        perscription: joi
          .object({
            medication: joi.string(),
            referal: joi.string(),
            followup: joi.string(),
            labtests: joi.string(),
          })
          .required(),
      })
      .required(),
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

const validateGetPatientRequest = async (req, res, next) => {
  const schema = joi.object({
    doctorid: joi.number().required(),
    request: joi.object({
      doctorid: joi.number().required(),
      patientNationalid: joi.number().required(),
    }),
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

const validateDecryptRecievedData = async (req, res, next) => {
  const schema = joi.object({
    doctorid: joi.number().required(),
    visits: joi.array().items().required(),
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

module.exports = {
  validateNewPatient,
  validateNewVisit,
  validateGetPatientRequest,
  validateDecryptRecievedData,
};
