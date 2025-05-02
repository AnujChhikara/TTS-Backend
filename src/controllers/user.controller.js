import user from '../schema/user.js'

const getAllUsers = async (req, res) => {
  try {
    const users = await user.find()
    if (!users) {
      return res.status(204).send()
    }
    return res.status(200).json({ data: users })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const userData = await user.findById({ _id: id })
    if (!userData) {
      return res.status(404).json({ message: 'user does not exits' })
    }
    return res.status(200).json({ data: userData })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const result = await user.deleteOne({ _id: id })
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User does not exist' })
    }

    return res.status(204).send()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const updateUser = async (req, res) => {
  const { username, targetedRoles, linkedIn, github, bio, skills } = req.body
  const { id } = req.params
  if (!username && !targetedRoles && !linkedIn && !github && !bio && !skills) {
    return res.status(400).json({ message: 'No data to update' })
  }

  try {
    const userData = await user.findByIdAndUpdate(
      { _id: id },
      { username, targetedRoles, linkedIn, github, bio, skills },
      { new: true },
    )
    if (!userData) {
      return res.status(404).json({ message: 'User does not exist' })
    }
    return res.status(200).json({ data: userData })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export { getAllUsers, getUser, deleteUser, updateUser }
