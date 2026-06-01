import { useEffect, useState } from "react";

const Profile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      const response = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization:
              localStorage.getItem("token")
          }
        }
      );

      const data = await response.json();

      setUser(data);
    };

    fetchProfile();

  }, []);

  if (!user) {
    return (
      <div className="text-center mt-5">
        Loading...
      </div>
    );
  }

  return (

    <div className="container mt-5">

      <div
        className="card shadow-lg border-0 rounded-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >

        <div className="card-body p-4">

          <h2 className="text-center mb-4 fw-bold">
            My Profile
          </h2>

          <div className="mb-3">
            <label className="fw-bold">
              Username
            </label>

            <p className="form-control">
              {user.username}
            </p>
          </div>

          <div>
            <label className="fw-bold">
              Email
            </label>

            <p className="form-control">
              {user.email}
            </p>
          </div>

        </div>

      </div>

    </div>

  );
};

export default Profile;