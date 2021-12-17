const yup = require("yup");

class Validation {

  async validateUserLogin(req, res, next) {
    try {
      const validationSchema = yup.object({
        body: yup.object({
          email: yup.string()
            .email("email is not valid")
            .required("email required"),
          password: yup.string()
            .required("password required")
        }),
      });
      await validationSchema.validate({
        body: req.body
      });
      next();
    } catch (e) {
      res.status(400).send({message: `${e}`});
    }
  }

  async validateUserRegister(req, res, next) {
    try {
      const validationSchema = yup.object({
        body: yup.object({
          userName: yup.string()
            .required("user name required"),
          email: yup.string()
            .email("not valid email")
            .required("email required"),
          password: yup.string()
            .required("password required")
            .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
              "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
          repeatPassword: yup.string()
            .required("repeat password required")
            .oneOf([yup.ref("password"), null], "passwords not match")
        }),
      });
      await validationSchema.validate({
        body: req.body
      });
      next();
    } catch (e) {
      res.status(400).send({message: `${e}`});
    }
  }

}

module.exports = new Validation();