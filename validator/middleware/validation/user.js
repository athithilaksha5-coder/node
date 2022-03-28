const {check,validationResult} = require('express-validator');
const res = require('express/lib/response');

exports.validateUserSignUp = [
    check('fullname')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is required!')
      .isString()
      .withMessage('Must be a valid name!')
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be within 3 to 20 character!'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email!'),
    check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password is empty!')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be 8 to 20 characters long!'), 
      check('confirmPassword')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Both password must be same!');
        }
        return true;
        }),

      check('phonenumber').trim()
      .not()
      .isEmpty().withMessage("phonenumber required!!")
      .isLength({min:10,max:10}).withMessage("Phonenumber must be 10 digit!"),
      check('address').trim()
      .not()
      .isEmpty().withMessage("Address field required!!")
      .isLength({min:5,max:10}).withMessage("Address field must have atlease 5 character!"),

  ];

  exports.userValidation = (req, res,next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();

    const error = result[0].msg;
    res.json({ success: false, message: error });

    };

    exports.validateUserSignIn = [
        check('email')
        .trim()
        .not()
        .isEmpty().withMessage('email is required!!')
        .normalizeEmail().isEmail().withMessage('Invalid email!'),
        check('password')       
          .trim()
          .not()
          .isEmpty()
          .withMessage('password is required!'),
      ];