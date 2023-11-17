import axios from "axios"
import { useLoaderData } from "react-router-dom"

const Profile = () => {

	const { user } = useLoaderData()

  return (
    <div>
			<h1>Profile</h1>
			<ul>
				<li>User ID: {user.userId}</li>
				<li>Username: {user.username}</li>
				<li>Name: {user.firstName} {user.lastName}</li>
			</ul>
			<img src={user.imgUrl} alt="" />
		</div>
  )
}

export const profileLoader = async({ params }) => {
	const { userId } = params

	const { data } = await axios.get(`/user/${userId}`)

	if (data.status !== 200) {
		throw Error("Error loading user profile!")
	}

	return data
}

export default Profile