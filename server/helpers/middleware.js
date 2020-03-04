import auth from './auth'

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.we_fly_token || req.headers.we_fly_token
    if (!token) {
        res.status(500).json({error: 'NO AUTHENTICATION TOKEN PRESENT ON THE REQUEST.', status: 500})
        return
    }
    try {
        const decoded = await auth.verify(token)
        res.locals.id = decoded.id
        next()
    } catch (err) {
        res.status(500).json({error: 'FAILED DECODING THE TOKEN', status: 500})
        res.cookie('we_fly_token', null)
    }
}