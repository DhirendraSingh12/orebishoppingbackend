module.exports = {
  port: process.env.PORT || 9090,
  dbUri:
    process.env.DB_URI ||
    "mongodb+srv://jaideeppatidar3421:V8H7udMiLXsWf7V3@orebishopping.b4zdv.mongodb.net/?retryWrites=true&w=majority&appName=orebishopping",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
};
