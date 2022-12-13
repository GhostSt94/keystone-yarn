const { File, Text } = require('@keystonejs/fields')
const { fileAdapter } = require('../adapters')

module.exports = {
    fields: {
        nom:{
            type:Text,
        },
        fichier: {
            type: File,
            adapter: fileAdapter,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                    if (existingItem && existingItem.fichier) {
                        await fileAdapter.delete(existingItem.fichier)
                            .catch(er=>console.log('file error', er));
                    }
                },
            },
        }
    },
    hooks: {
        afterDelete: async ({ existingItem }) => {
            if (existingItem.fichier) {
                await fileAdapter.delete(existingItem.fichier)
                    .catch(er=>console.log('file error', er));
            }
        }
    },
    labelField: 'nom',
    adminDoc: "Liste des attachements image/video",
}