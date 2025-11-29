import jwt from "jsonwebtoken"
async function verifyjwt(req, res, next) {
const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
console.log(token);
if (!token) {
return res.status(401).json({ error: "Unauthorized" });
}
try {
const decoded = jwt.verify(token, "Sahibdeep");
req.user = decoded.id;
next();
} catch (error) {
return res.status(403).json({ error: "Invalid token" });
}
}
export default verifyjwt