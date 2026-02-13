const crypto = require("crypto");

const generateHash = (certId, studentName, courseName, issueDate) => {
  const data = `${certId}${studentName}${courseName}${issueDate}`;
  return crypto.createHash("sha256").update(data).digest("hex");
};

module.exports = generateHash;

