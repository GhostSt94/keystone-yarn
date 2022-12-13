const access = {
    isAdmin: ({ authentication: { item: user } }) => !!user && !!user.isAdmin,

    isLoggedIn: ({ authentication: { item: user } }) => !!user,

    isOwner: ({ authentication: { item: user } }) => {
        if (!user) {
            return false
        }

        return { id: user.id }
    },

    isAdminOrOwner: ({ existingItem, authentication: { item } }) => {
        return item.isAdmin || existingItem.id === item.id;
    },

    // isAdminOrOwner: (auth) => {
    //     const isAdmin = access.isAdmin(auth)
    //     const isOwner = access.isOwner(auth)

    //     return isAdmin ? isAdmin : isOwner;
    // }
}

module.exports = access