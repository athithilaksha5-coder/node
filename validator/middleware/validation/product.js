const {check,validationResult} = require('express-validator');
const res = require('express/lib/response');

exports.productDetails = [
    check('ProductId')
      .trim()
      .not()
      .isEmpty()
      .withMessage('ProductId is required!')
      .isNumeric()
      .withMessage('Must be a valid id!')
      .isLength({ min: 1, max: 10 })
      .withMessage('Name must be within 1 to 10 character!'),
    
    check('ProductName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('ProductName is empty!')
      .isLength({ min: 2, max: 20 })
      .withMessage('ProductName must be 2 to 20 characters long!'), 
      check('Quantity').trim()
      .not()
      .isEmpty().withMessage("Quantity required!!")
      .isNumeric().withMessage("Enter valid Quantity!!")
      .isLength({min:1,max:7}).withMessage("Quantity must be 1 to 7 digit"),
      check('Price').trim()
      .not()
      .isEmpty().withMessage("Price field required!!")
      .isNumeric().withMessage("Price must be number!!")
      .isLength({min:1,max:10}).withMessage("Address field must have atlease 1 Number!"),

  ];

  exports.productValidation = (req, res,next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();

    const error = result[0].msg;
    res.json({ success: false, message: error });

    };

    