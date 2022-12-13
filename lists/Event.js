const { Text, Checkbox, File } = require('@keystonejs/fields')
const { fileAdapter } = require('../adapters')

module.exports = {
    fields: {
        titre:{
            type: Text,
            required: true
        },
        imageFr: {
            type: File,
            adapter: fileAdapter,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                    if (existingItem && existingItem.imageFr) {
                        await fileAdapter.delete(existingItem.imageFr)
                            .catch(er=>console.log('file error', er));
                    }
                },
            },
        },
        imageAr: {
            type: File,
            adapter: fileAdapter,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                    if (existingItem && existingItem.imageAr) {
                        await fileAdapter.delete(existingItem.imageAr)
                            .catch(er=>console.log('file error', er));
                    }
                },
            },
        },
        imageEn: {
            type: File,
            adapter: fileAdapter,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                    if (existingItem && existingItem.imageEn) {
                        await fileAdapter.delete(existingItem.imageEn)
                            .catch(er=>console.log('file error', er));
                    }
                },
            },
        },
        enCours:{
            type: Checkbox,
            default: true
        },
        lien:{
            type: Text
        }
    },
    hooks: {
        afterDelete: async ({ existingItem }) => {
            if (existingItem.imageFr) {
                await fileAdapter.delete(existingItem.imageFr)
                    .catch(er=>console.log('file error', er));
            }
            if (existingItem.imageAr) {
                await fileAdapter.delete(existingItem.imageAr)
                    .catch(er=>console.log('file error', er));
            }
            if (existingItem.imageEn) {
                await fileAdapter.delete(existingItem.imageEn)
                    .catch(er=>console.log('file error', er));
            }
        },
    },
    adminDoc: "Listes des événement actuels",
    labelField: 'titre'
}