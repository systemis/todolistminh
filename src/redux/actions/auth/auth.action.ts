import { LoginDto, RegisterDto } from "@/src/dto";
import { CallBackSaga } from "@/src/redux/entities";
import { REGISTER_EMAIL, LOGIN_EMAIL } from "@/src/redux/actions";

/**
 * @param emailLoginDto
 * @param callback
 * @returns
 * @description
 * Login with with new email payload
 */
export const loginWithEmail = (
  emailLoginDto: LoginDto,
  callback: CallBackSaga<unknown>
) => ({
  type: LOGIN_EMAIL,
  payload: emailLoginDto,
  callback,
});


/**
 * @param emailSignUpDto
 * @param callback
 * @returns
 * @description
 * Register a new user with new email payload
 */
export const registerWithEmail = (
  emailRegisterDto: RegisterDto,
  callback: CallBackSaga<unknown>
) => ({
  type: REGISTER_EMAIL,
  payload: emailRegisterDto,
  callback,
});
