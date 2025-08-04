const { default: z } = require("zod");


const expenceSchema = z.object({
    type: z.string().nonempty("Please Select INCOME or EXPENCE"),
    price: z.number({invalid_type_error: "Price must be a number"}).positive("Price must be greater than 0"),
    selectedCategory: z.object({
        name: z.string().nonempty("Category is required"),
        icon: z.any()
    }).nullable().
    refine(value => value !== null, {
        message: "Please select Category"
    }),
    paymentMethod: z.string().nonempty("Please Select Payment Method").nullable().refine(value => value!= null, {
        message: "Please Select Payment Method"
    })
});

export default expenceSchema;