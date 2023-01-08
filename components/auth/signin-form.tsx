import { FC } from "react";
import { useRouter } from "next/router"
import { LoginDto } from "@/src/dto";
import { useForm } from "@/src/hooks/useForm";
import { useMain } from "@/src/hooks/useMain";
import { loginWithEmail } from "@/src/redux/actions";
import { toast } from "react-toastify";

const SigninForm: FC = () => {
  const router = useRouter();
  const { dispatch } = useMain();
  const {
    register,
    formState,
    onSubmit,
    errors,
  } = useForm<LoginDto>({ identityClass: LoginDto });

  /**
   * @dev The function to submit register
   * @param {RegisterDto} registerDto
   * @returns
   */
  const handleLogin = async (loginDto: LoginDto) => {
    dispatch(loginWithEmail(loginDto, (loginResponse) => {
      if (!loginResponse) {
        return toast("Login account failed!");
      }
      toast("Login account successfully!");
      register("email", "");
      register("password", "");
      router.push("/");
    }));
  }

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600 dark:text-white">
                Welcome back!
              </h1>

              <form className="mt-12" action="" method="POST">
                <div className="relative">
                  <input
                    id="signin-email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600  dark:bg-[transparent] dark:text-white"
                    placeholder="john@doe.com"
                    value={formState?.email}
                    onChange={(e) => register("email", e.target.value)}
                  />
                  {errors?.email && <p className="text-gray-900 text-[10px]" style={{ color: "red" }}>{errors.email}</p>}
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white"
                  >
                    Email address
                  </label>
                </div>
                <div className="mt-10 relative">
                  <input
                    id="signin-password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600  dark:bg-[transparent] dark:text-white"
                    placeholder="Password"
                    value={formState?.password}
                    onChange={(e) => register("password", e.target.value)}
                  />
                  {errors?.password && <p className="text-gray-900 text-[10px]" style={{ color: "red" }}>{errors.password}</p>}
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:text-white"
                  >
                    Password
                  </label>
                </div>

                <input
                  type="submit"
                  value="Sign in"
                  className="mt-20 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
                  onClick={e => {
                    e.preventDefault();
                    onSubmit(handleLogin);
                  }}
                />
              </form>
              <a
                href="#"
                className="mt-4 block text-sm text-center font-medium text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {' '}
                Forgot your password?{''}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninForm
