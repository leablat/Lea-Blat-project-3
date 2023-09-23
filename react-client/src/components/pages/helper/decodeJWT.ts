import decodeJWT from "jwt-decode"

export default function checkIsAdminJwt(): boolean {
    const token = localStorage.getItem("token")
    const JwtPayload: any = decodeJWT(token || "")
    if (JwtPayload?.role =="admin") {
        return true
    }
    return false
}
//  function getJwtPaylodes(){
//     const token = localStorage.getItem("token")
//     return  decodeJWT(token || "")

// }
// 
// export default {checkIsAdminJwt ,getJwtPaylodes}