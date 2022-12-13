const { Text, File, Relationship, Select, DateTimeUtc } = require('@keystonejs/fields')
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
            type: Text,// Wysiwyg text editor
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
        categorie: {
            type: Relationship,
            ref: 'Categorie',
            many: false
        },
        AttachementPrincipalType:{
          type: Select,
          options: [
              { value: 'image', label: "Image" },
              { value: 'video', label: "Video" },
              { value: 'slider', label: "Slider" },
          ],
            defaultValue:'image',
            adminDoc: "Définira où l'artical sera afficher dans la page d'acceuil et son attachement principal doit être compatible."
        },
        AttachementPrincipal: {
            type: File,
            adapter: fileAdapter,
            adminDoc: 'télécharger image(normal ou banniere) ou vidéo',
            hooks: {
                beforeChange: async ({ existingItem }) => {
                    if (existingItem && existingItem.AttachementPrincipal) {
                        await fileAdapter.delete(existingItem.AttachementPrincipal)
                            .catch(er=>console.log('file error', er));
                    }
                },
            },
        },
        thumbnail: {
            type: File,
            adapter: fileAdapter,
            adminDoc: 'si vous avez choisi type vidéo veuillez télécharger une image miniature',
            hooks: {
                beforeChange: async ({ existingItem }) => {
                    if (existingItem && existingItem.thumbnail) {
                        await fileAdapter.delete(existingItem.thumbnail)
                            .catch(er=>console.log('file error', er));
                    }
                },
            },
        },
        Images: {
            adminDoc:'additional images (optionnelle)',
            type: Relationship,
            ref: 'Attachement',
            many: true
        },
        createdAt: {
            adminDoc:'format du date MM/DD/YYYY (ex: 03/25/2022)',
            type: DateTimeUtc,
            format: 'dd/MM/yyyy',
            yearPickerType: 'auto',
            /*defaultValue:()=> {
                return new Date().toUTCString()
            },*/
        }
    },
    hooks: {
        afterDelete: async ({ existingItem }) => {
            if (existingItem.AttachementPrincipal) {
                await fileAdapter.delete(existingItem.AttachementPrincipal)
                    .catch(er=>console.log('file error', er));
            }
            if (existingItem.thumbnail) {
                await fileAdapter.delete(existingItem.thumbnail)
                    .catch(er=>console.log('file error', er));
            }
        }
    },
    adminDoc: "Liste des articles",
    labelField: 'titreFr'
}