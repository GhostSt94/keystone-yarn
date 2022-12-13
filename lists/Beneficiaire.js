const { Text } = require('@keystonejs/fields')

module.exports = {
    fields: {
        labelFr: {
            type: Text,
            isRequired: true
        },
        labelAr: {
            type: Text,
            isRequired: true
        },
        labelEn: {
            type: Text,
            isRequired: true
        },
    },
    labelField: 'labelFr',
    adminDoc: "Liste des catégories de bénéficiaires"
}