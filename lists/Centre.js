const { Text, Relationship, File} = require('@keystonejs/fields')
const {fileAdapter} = require("../adapters");

module.exports = {
    adminDoc: "Liste des centres",
    fields: {
        nomFr: {
            type: Text,
        },
        nomAr: {
            type: Text,
        },
        nomEn: {
            type: Text,
        },
        adresseFr: {
            type: Text,
            isMultiline: true
        },
        adresseAr: {
            type: Text,
            isMultiline: true
        },
        adresseEn: {
            type: Text,
            isMultiline: true
        },
        tel: {
            type: Text,
        },
        region: {
            type: Relationship,
            ref: 'Region',
            many: false
        },
        ImagePrincipal: {
            type: File,
            adapter: fileAdapter,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                    if (existingItem && existingItem.ImagePrincipal) {
                        await fileAdapter.delete(existingItem.ImagePrincipal)
                            .catch(er=>console.log('file error', er));
                    }
                },
            },
        },
        services: {
            type: Relationship,
            ref: 'Service',
            many: true
        },
        beneficiaire: {
            type: Relationship,
            ref: 'Beneficiaire',
            many: true
        },
        /*image: {
            type: Relationship,
            ref: 'Attachement',
            many: false
        }*/
    },
    hooks: {
        afterDelete: async ({ existingItem }) => {
            if (existingItem.ImagePrincipal) {
                await fileAdapter.delete(existingItem.ImagePrincipal)
                    .catch(er=>console.log('file error', er));
            }
        }
    },
    labelField: 'nomFr'
}