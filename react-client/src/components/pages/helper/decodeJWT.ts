import decodeJWT from "jwt-decode"

const checkIsAdminJwt: any = function() {
    const token = localStorage.getItem("token")
    const JwtPayload: any = decodeJWT(token || "")
    if (JwtPayload?.role == "admin") {
        return true
    }
    return false
}
const getJwtPayloads: any = function() {
    const token = localStorage.getItem("token")
    if (token)
        return decodeJWT(token || "")
    return {}
}

export default { checkIsAdminJwt, getJwtPayloads }

