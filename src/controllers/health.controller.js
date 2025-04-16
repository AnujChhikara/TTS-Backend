const healthCheck = (req, res) => {
  const message = 'everything is fine with the app'
  try {
    return res.status(200).json({ msg: message })
  } catch (err) {
    console.log(err)

    return res.status(500).json({ msg: 'Server is down!' })
  }
}

export { healthCheck }
