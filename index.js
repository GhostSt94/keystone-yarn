require('dotenv').config()
const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const access = require('./access')
const accessCrud = {
  read: true,
  create: access.isLoggedIn,
  update: access.isLoggedIn,
  delete: access.isLoggedIn
}

//lists
const userSchema = require('./lists/User')

const menuSchema = require('./lists/Menu')
const statsSchema = require('./lists/Statistics')
const serviceSchema = require('./lists/Service')
const categorieSchema = require('./lists/Categorie')
const articleSchema = require('./lists/Article')
const centreSchema = require('./lists/Centre')
const regionSchema = require('./lists/Region')
const attachementSchema = require('./lists/Attachement')
const eventSchema = require('./lists/Event')
const beneficiareSchema = require('./lists/Beneficiaire')
const annonceSchema = require('./lists/Annonce')
const imagesSchema = require('./lists/image')

const keystone = new Keystone({
  adapter: new Adapter({ mongoUri: process.env.MONGO_URI }),
  cookieSecret: process.env.COOKIE_SECRET,
  cookie: {
    secure: process.env.SECURE_COOKIE === 'true' ? true : false,
    maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
    sameSite: false
  }
});

keystone.createList('User', {
  fields: userSchema.fields,
  access: {
    read: true,
    create: access.isAdmin,
    update: access.isAdmin,
    delete: access.isAdmin
  }
});

keystone.createList('Statistique', {
  ...statsSchema,
  access: accessCrud
});
keystone.createList('Menu', {
  ...menuSchema,
  access: accessCrud
});
keystone.createList('Service', {
  ...serviceSchema,
  access: accessCrud,
  labelField: "titreFr"
});
keystone.createList('Centre', {
  ...centreSchema,
  access: accessCrud,
});
keystone.createList('Article', {
  ...articleSchema,
  access: accessCrud
});
keystone.createList('Region', {
  ...regionSchema,
  access: accessCrud,
});
keystone.createList('Attachement', {
  ...attachementSchema,
  access: accessCrud,
});
keystone.createList('Event', {
  ...eventSchema,
  access: accessCrud,
});
keystone.createList('Categorie', {
  ...categorieSchema,
  access: accessCrud,
});
keystone.createList('Beneficiaire', {
  ...beneficiareSchema,
  access: accessCrud,
});
keystone.createList('Annonce', {
  ...annonceSchema,
  access: accessCrud,
});
keystone.createList('Image', {
  ...imagesSchema,
  access: accessCrud,
});


const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'email',
    secretField: 'Password'
  }
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    //new StaticApp({ path: '/', src: '../public/dist' }),
    new StaticApp({ path: '/attachements', src: './attachements' }),
    new AdminUIApp({
      name: process.env.PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
      isAccessAllowed: access.isLoggedIn,
      hooks: require.resolve('./admin-hooks/hooks.js'),
      enableDefaultRoute: false
    }),
    //new StaticApp({ path: '/*', src: './redirect',fallback:'index.html' }),
  ],
};
