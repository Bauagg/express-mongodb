const { policyFor } = require('../utils/otorisasi')

const police_ceck = (action, subject) => {
    return (req, res, next) => {
        try {
            const policy = policyFor(req.user)

            if (!policy.can(action, subject)) {
                return res.status(400).json({
                    message: `You are no allowed to ${action} ${subject}`
                })
            }
            next()
        } catch (err) {
            next(err)
        }
    }
}

module.exports = { police_ceck }

