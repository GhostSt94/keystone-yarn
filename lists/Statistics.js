const { Text, Integer, File } = require('@keystonejs/fields')
const { fileAdapter } = require('../adapters')

module.exports = {
    fields: {
        labelFr: {
            type: Text,
        },
        labelAr: {
            type: Text,
        },
        labelEn: {
            type: Text,
        },
        chiffre: {
            type: Integer,
            isRequired: true,
        },
        ordre:{
            type: Integer,
        },
        icon: {
            type: File,
            adapter: fileAdapter,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                    if (existingItem && existingItem.icon) {
                        await fileAdapter.delete(existingItem.icon)
                            .catch(er=>console.log('file error', er));
                    }
                },
            },
        }
    },
    hooks: {
        afterDelete: async ({ existingItem }) => {
            if (existingItem.icon) {
                await fileAdapter.delete(existingItem.icon)
                    .catch(er=>console.log('file error', er));
            }
        },
    },
    adminDoc: "L'institut en chiffres",
    labelField: 'labelFr'
}