import schema from '../helpers/diaryValidations';

class entryvalidation{
    static contentValidation(req, res, next){
        const validation = schema.validate({
        title: req.body.title,
      description: req.body.description,
    });
    if(!validation.error){
        next();
    }else {
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

export default entryvalidation;