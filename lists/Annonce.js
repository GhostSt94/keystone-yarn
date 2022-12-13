const { Text, DateTimeUtc, File} = require('@keystonejs/fields')
const {fileAdapter} = require("../adapters");

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
        attachement: {
            type: File,
            adapter: fileAdapter,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                    if (existingItem && existingItem.attachement) {
                        await fileAdapter.delete(existingItem.attachement)
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
            if (existingItem.attachement) {
                await fileAdapter.delete(existingItem.attachement)
                    .catch(er=>console.log('file error', er));
            }
        }
    },
    labelField: 'titreFr',
    adminDoc: "Liste des annonces"
}