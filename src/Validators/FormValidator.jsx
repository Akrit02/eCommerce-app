import PasswordValidator from "password-validator";

var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have 1 uppercase letter
    .has().lowercase(1)                             // Must have 1 lowercase letter
    .has().digits(1)                                // Must have at least 1 digit
    .has().not().spaces()                          // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Admin123', 'Admin@123', 'Password123'])   // Blacklist these values

export default function FormValidator(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "username":
        case "color":
            if (value && value.length === 0)
                return name + "field is Mandatory."
            else if (value.length < 3 || value.length > 50)
                return name + "length must be 3-50 characters."
            else
                return ""

        case "subject":
            if (value && value.length === 0)
                return name + "field is Mandatory."
            else if (value.length < 10)
                return name + "length must have atleast 10 characters."
            else
                return ""

        case "email":
            if (value && value.length === 0)
                return name + "field is Mandatory."
            else if (value.length < 13 || value.length > 100)
                return name + "length must be 13-100 characters."
            else
                return ""

        case "password":
            if (value && value.length === 0)
                return name + "field is Mandatory."
            else if (!(schema.validate(value)))
                return "Invalid Password. It must contain 1 uppercase alphabet, 1 lowercase alphabet, digit and any special character."
            else
                return ""

        case "phone":
            if (value && value.length === 0)
                return name + "field is Mandatory"
            else if (value.length < 10 || value.length > 10)
                return name + "length must be 10 characters."
            else if (value.startsWith("9") || value.startsWith("8") || value.startsWith("7") || value.startsWith("6"))
                return ""
            else
                return "Invalid Phone Number"

        case "size":
            if (value && value.length === 0)
                return name + "field is Mandatory."
            else if (value.length > 10)
                return name + "length must be upto 10 characters."
            else
                return ""

        case "basePrice":
            if (value && value.length === 0)
                return " Base Price field is Mandatory."
            else if (value < 1)
                return "Base Price must be a positive value."
            else
                return ""

        case "stockQuantity":
            if (value && value.length === 0)
                return " Stock Quantity field is Mandatory."
            else if (value < 0)
                return "Stock Quantity must be a positive value or 0."
            else
                return ""

        case "discount":
            if (value && value.length === 0)
                return " Discount field is Mandatory."
            else if (value < 0 || value > 99)
                return "Discount must be 0-99%"
            else
                return ""

        case "message":
            if (value && value.length === 0)
                return name + "field is Mandatory."
            else if (value.length < 50)
                return name + "length must be 50 characters or more."
            else
                return ""
        default:
            return ""
    }
}
