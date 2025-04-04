const healthcheck = (req, res) => {
  const message = "eVeRyThInG iS fInE wItH tHe ApP";
  try {
    return res.status(200).json({ msg: message });
  } catch (error) {
    return res.status(400).json({ msg: "Server is down!" });
  }
};

export { healthcheck };
