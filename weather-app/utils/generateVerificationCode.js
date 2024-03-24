function generateVerificationCode() {
  const timestamp = new Date().getTime();
  const hexCode = timestamp.toString(16);

  return hexCode;
}

module.exports = generateVerificationCode;
