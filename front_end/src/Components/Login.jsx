import { useForm } from "react-hook-form";

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {

    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    localStorage.setItem("token", result.token);
    console.log(localStorage.getItem("token"));

    console.log(result);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div
        className="card shadow-lg border-0 p-4 rounded-4"
        style={{ width: "420px" }}
      >

        <h2 className="text-center fw-bold mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Email
            </label>

            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required"
              })}
            />

            {errors.email && (
              <p className="text-danger mt-1 small">
                {errors.email.message}
              </p>
            )}

          </div>

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required"
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
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;