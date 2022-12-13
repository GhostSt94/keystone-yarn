const { Text, Checkbox, Relationship, Integer, Select } = require('@keystonejs/fields')

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
        lien: {
            type: Text
        },
        /*sousMenu: {
            type: Checkbox,
            default: false,
            // adminDoc: "Sous-Menu"
        },*/
        level:{
            type:Select,
            options: [
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
            ],
            dataType: 'integer',
            defaultValue: 1,
            adminDoc: 'Si level > 1 veuillez saisir menu parent'
        },
        menuParent: {
            type: Relationship,
            ref: 'Menu',
            many: false,
            //adminDoc: "veuillez choisir un menu parent si c'étais un sous menu",
        },
        ordre: {
            type: Integer,
            defaultValue: 1
        }
    },
    adminDoc: "Liste des menus et sous-menu",
    labelField: 'labelFr'
}