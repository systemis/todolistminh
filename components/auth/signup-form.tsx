import { FC } from "react";
import { RegisterDto } from "@/src/dto";
import { useForm } from "@/src/hooks/useForm";
import { useMain } from "@/src/hooks/useMain";
import { registerWithEmail } from "@/src/redux/actions";
import { toast } from "react-toastify";
import { CommonProps } from "./types";

const SignupForm: FC<CommonProps> = ({ setIsAnimated, isAnimated }) => {
  const { dispatch } = useMain();
  const {
    register,
    formState,
    onSubmit,
    errors,
  } = useForm<RegisterDto>({ identityClass: RegisterDto });

  /**
   * @dev The function to submit register
   * @param {RegisterDto} registerDto
   * @returns
   */
  const handleRegister = async (registerDto: RegisterDto) => {
    dispatch(registerWithEmail(registerDto, (registerResponse) => {
      if (!registerResponse) {
        return toast("Register account failed!");
      }
      toast("Register account successfully!");
      register("email", "");
      register("password", "");
      setIsAnimated(!isAnimated);
    }));
  }

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600">
                Create account
              </h1>

              <form
                className="mt-12"
                method="POST"
              >
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="john@doe.com"
                    value={formState?.email}
                    onChange={(e) => register("email", e.target.value)}
                  />
                  {errors?.email && <p className="text-gray-900 text-[10px]" style={{ color: "red" }}>{errors.email}</p>}
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email address
                  </label>
                </div>
                <div className="mt-10 relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="Password"
                    value={formState?.password}
                    onChange={(e) => register("password", e.target.value)}
                  />
                  {errors?.password && <p className="text-gray-900 text-[10px]" style={{ color: "red" }}>{errors.password}</p>}
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>

                <input
                  type="submit"
                  value="Sign up"
                  className="mt-20 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmit(handleRegister)
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
