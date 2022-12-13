const { Text, Password, Checkbox } = require('@keystonejs/fields')
const { isAdmin, isAdminOrOwner } = require('./../access')

module.exports = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        },
        email: {
            type: Text,
            isRequired: true,
            isUnique: true,
            access: isAdminOrOwner
        },
        Password: {
            type: Password,
            isRequired: true,
            access: isAdminOrOwner
        },
        isAdmin: {
            type: Checkbox,
            isRequired: true,
            access: isAdmin
        }
    }
}

//admin@gmail.com:secret123