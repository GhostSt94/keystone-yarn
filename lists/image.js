const { File, Text, DateTimeUtc} = require('@keystonejs/fields')
const { fileAdapter } = require('../adapters')

module.exports = {
    fields: {
        titreFr:{
            type:Text,
        },
        titreAr:{
            type:Text,
        },
        titreEn:{
            type:Text,
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
        },
        createdAt: {
            adminDoc:'format du date MM/DD/YYYY (ex: 03/25/2022)',
            type: DateTimeUtc,
            format: 'dd/MM/yyyy'
        }
    },
    hooks: {
        afterDelete: async ({ existingItem }) => {
            if (existingItem.image) {
                await fileAdapter.delete(existingItem.image)
                    .catch(er=>console.log('file error', er));
            }
        }
    },
    labelField: 'titre',
    adminDoc: "Liste des images",
}