const { Text, File } = require('@keystonejs/fields')
const { fileAdapter } = require('../adapters')

module.exports = {
    fields: {
        titreFr: {
            type: Text,
        },
        titreAr: {
            type: Text,
        },
        titreEn: {
            type: Text,
        },
        bodyFr: {
            type: Text,
            isMultiline: true
        },
        bodyAr: {
            type: Text,
            isMultiline: true
        },
        bodyEn: {
            type: Text,
            isMultiline: true
        },
        image: {
            type: File,
            adapter: fileAdapter,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                    if (existingItem && existingItem.image) {
                        await fileAdapter.delete(existingItem.image)
                            .catch(er=>console.log('file error', er));
                    }
                },
            },
        }
    },
    hooks: {
        afterDelete: async ({ existingItem }) => {
            if (existingItem.image) {
                await fileAdapter.delete(existingItem.image)
                    .catch(er=>console.log('file error', er));
            }
        },
    },
    labelField: 'titreFr',
    adminDoc: "Liste des services"
}