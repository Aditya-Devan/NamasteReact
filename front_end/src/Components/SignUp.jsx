import { useForm } from "react-hook-form";

const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

 const onSubmit = async (data) => {
   console.log(data);
  const response = await fetch("http://localhost:5000/api/auth/signup",{
    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body: JSON.stringify(data)
  });

  const result = await response.text();

  console.log(result);
};

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div
        className="card shadow-lg border-0 p-4 rounded-4"
        style={{ width: "420px" }}
      >

        <h2 className="text-center fw-bold mb-4">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Username */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Username
            </label>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum length is 3"
                },
                maxLength: {
                  value: 20,
                  message: "Maximum length is 20"
                },
                pattern: {
                  value: /^\S+$/,
                  message: "Spaces are not allowed"
                }
              })}
            />

            {errors.username && (
              <p className="text-danger mt-1 small">
                {errors.username.message}
              </p>
            )}

          </div>

          {/* Email */}

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Email
            </label>

            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email"
                }
              })}
            />

            {errors.email && (
              <p className="text-danger mt-1 small">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />

            {errors.password && (
              <p className="text-danger mt-1 small">
                {errors.password.message}
              </p>
            )}

          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2 fw-bold rounded-3"
          >
            Sign Up
          </button>

        </form>

      </div>

    </div>
  );
};

export default SignUp;