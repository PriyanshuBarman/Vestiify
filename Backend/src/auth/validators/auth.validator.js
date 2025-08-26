import { ApiError } from "../../shared/utils/apiError.utils.js";

export const signupValidator = (req, res, next) => {
  let { name, email, password } = req.body;

  name = name?.trim();
  email = email?.trim().toLowerCase();

  if (!name) throw new ApiError(400, "Name required");
  if (!email) throw new ApiError(400, "Email required");
  if (!password) throw new ApiError(400, "Password required");

  if (password.includes(" "))
    throw new ApiError(400, "Password should not contain spaces");

  req.body.name = name;
  req.body.email = email;
  req.body.password = password;

  next();
};

export const loginValidator = (req, res, next) => {
  let { email, password } = req.body;

  email = email?.trim();
  email = email?.trim().toLowerCase();

  if (!email) throw new ApiError(400, "Email required");
  if (!password) throw new ApiError(400, "Password required");
  if (password.includes(" "))
    throw new ApiError(400, "Password should not contain spaces");

  req.body.email = email;
  req.body.password = password;

  next();
};
