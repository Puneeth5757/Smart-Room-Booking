const jwt = require("jsonwebtoken");
const Ownerdb = require("../models/OwnerSchema"); // Assuming OwnerSchema exists in models folder
const keysecret = "Puneeth@101112131415161718192021"; // Replace with a strong secret

const authenticateOwner = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const verifytoken = jwt.verify(token, keysecret);

    const rootOwner = await Ownerdb.findOne({ _id: verifytoken._id });

    if (!rootOwner) {
      throw new Error("Owner not found");
    }

    req.token = token;
    req.rootOwner = rootOwner;
    req.ownerId = rootOwner._id;

    next();
  } catch (error) {
    res.status(401).json({ status: 401, message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticateOwner;