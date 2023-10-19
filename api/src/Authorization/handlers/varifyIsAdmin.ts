
function verifyIsAdmin(req: any, res: any, next) {
    if (req.currentUserRole != "admin") {
        return res.status(403).send("Authentication error")
    }
    return next()
}

export default verifyIsAdmin
