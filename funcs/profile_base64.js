const sharp = require("sharp");

const profile_base64 = (req, res, next) => {
  if (req.user.pfp) {
    req.user.profile_pic = `data:${req.user.pfp_mime};base64,` + req.user.pfp;
  }
  next();
};

const resize_pfp = async (buffer) => {
  return await sharp(buffer).resize(200, 200, { fit: "cover" }).toBuffer();
};

module.exports = { profile_base64, resize_pfp };
