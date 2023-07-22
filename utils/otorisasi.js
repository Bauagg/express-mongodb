const { AbilityBuilder, Ability } = require("@casl/ability")

const policies = {
    guest(user, { can }) {
        can('read', 'product')
    },
    users(user, { can }) {
        can('view', 'Order')
        can('create', 'Order')
        can('read', 'Order', { user_id: user._id })
        can('update', 'User', { user_id: user._id })
        can('read', 'Cart', { user_id: user._id })
        can('update', 'Cart', { user_id: user._id })
        can('view', 'DeliveryAdress')
        can('create', 'DeliveryAdress', { user_id: user._id })
        can('update', 'DeliveryAdress', { user_id: user._id })
        can('delete', 'DeliveryAdress', { user_id: user._id })
        can('read', 'Invoice', { user_id: user._id })
    },
    admin(user, { can }) {
        can('manage', 'all')
    }
}

const policyFor = (user) => {
    const builder = new AbilityBuilder()

    if (user && typeof policies[user.role] === 'function') {
        policies[user.role](user, builder)
    } else {
        policies['guest'](user, builder)
    }

    return new Ability(builder.rules)
}

module.exports = { policyFor }
