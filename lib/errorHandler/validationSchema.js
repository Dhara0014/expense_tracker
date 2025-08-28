const { default: z } = require("zod");


const expenceSchema = z.object({
    type: z.string().nonempty("Please Select INCOME or EXPENCE"),
    price: z.number({invalid_type_error: "Price must be a number"}).positive("Price must be greater than 0"),
    category_id: z.number({
        invalid_type_error: "Please select a Category",
      })
      .int("Invalid Category")
      .positive("Invalid Category"),
    payment_method: z.string().nonempty("Please Select Payment Method").nullable().refine(value => value!= null, {
        message: "Please Select Payment Method"
    })
});

export default expenceSchema;

export const loginSchema = z.object({
    formData: z.object({
        name: z.string().nonempty("Name is Required"),
        password: z.string().nonempty("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must not exceed 20 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(
          /[@$!%*?&#]/,
          "Password must contain at least one special character (@, $, !, %, *, ?, & or #)"
        ),
    })
})