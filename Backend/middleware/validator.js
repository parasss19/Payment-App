import {z} from 'zod';

//zod schema for different routes
const signupValidation = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  username: z.string().trim().email(),
  password: z.string().trim().min(6),
});

const signinValidation = z.object({
    username: z.string().trim().email(),
    password: z.string().trim().min(6),
});

const updateValidation = z.object({
  newFirstName: z.string().trim().optional(),
  newPassword: z.string().trim().optional(),
  newusername: z.string().trim().email("Invalid email").optional()
    .or(z.literal("")), //allow empty string for username(email) without failing
});


//general validator factory function which work with all three schema(we pass schema as parameter)
const createValidator = (schema) => (req, res, next) => {
    const createPayload = req.body;
    const parsePayload = schema.safeParse(createPayload);
  
    if(!parsePayload.success) {
      const errors = parsePayload.error.errors.map(err => ({
        field: err.path[0],
        message: err.message,
      }));

      return res.status(400).json({ 
        success: false,
        errors 
      });
    }

    //Pass validated data to next middleware or route
    req.validatedData = parsePayload.data;
    next();
}


// Export validators
export const validateRegister = createValidator(signupValidation);
export const validateLogin = createValidator(signinValidation);
export const validateUpdate = createValidator(updateValidation);
