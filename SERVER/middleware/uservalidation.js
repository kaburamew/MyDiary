import schema from '../helpers/validations';

class uservalidation {
  static signupValidation(req, res, next) {
    const validation = schema.validate({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    if (!validation.error) {
      next();
    } else {
      const wrongInput = validation.error.details[0].message
        .replace('"', ' ')
        .replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }
}

export default uservalidation;
