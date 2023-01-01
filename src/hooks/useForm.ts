import { useState } from "react";
import { validateSync } from "class-validator";
import { plainToInstance } from "class-transformer";
import "reflect-metadata";

interface UseFormContext<T> {
  /**
   * @dev Call this function when detect submit event.
   * @param {void} callback
   */
  onSubmit(callback: (data: T) => void): void;

  /**
   * @dev Update state item value.
   * @param {string} key
   * @param {string} value
   */
  register(key: keyof T, value: string): void;

  /**
   * @dev Contains all the errors of each field if having.
   * @var {Object}
   */
  errors: {[key in keyof T]: string};

  /**
   * @dev State of the form.
   * @var {T}
   */
  formState: T;
}

export const useForm = <IState>(props: {
  identityClass: any;
}): UseFormContext<IState> => {
  /**
   * @dev Define form inteface
   */
  const [formState, setFormState] = useState<IState>();

  /**
   * @dev Storage errors of the state
   */
  const [errors, setErros] = useState<{[key in keyof IState]: string}>();

  /**
   * @dev This varriable to check if form caught errors when submit
   * then to automatically deleted error message when user refill
   */
  const [submmited, setSubmmited] = useState(false);

  /**
   * @dev Validate if all data in form is valid with the default config
   * @param data (leastest states)
   */
  const ensureValidateForm = async (data: any) => {
    /**
     * @dev Transform data object into class interface.
     */
    const state = plainToInstance(props.identityClass, data);

    /**
     * @dev Validate state.
     */
    const validateErros = validateSync(state);

    setErros(() => {
      /**
       * @dev Define erros temp
       */
      const immutable: any = {};

      /**
       * @dev Loop in errors array which found before and get each error info with key
       */
      validateErros.forEach((item) => {
        const {property, constraints} = item;
        immutable[property] = Object.keys(constraints)
          .map((key) => constraints[key])
          .join(", ");
      });

      return immutable as {[key in keyof IState]: string};
    });

    return validateErros;
  };

  /**
   * @dev The function will update form state properties
   * @param key
   * @param value
   */
  const register = (key: keyof IState, value: string) => {
    setFormState((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      };

      /** @dev Revalidate all fileds after user submit and refill */
      submmited && ensureValidateForm(updated);

      /** @dev Update value in the form */
      return updated;
    });
  };

  /**
   * @dev The function will return data when submit form
   * @param callback
   */
  const onSubmit = async (callback: (data: IState) => void) => {
    try {
      /** @dev Update status */
      !submmited && setSubmmited(true);

      /** @dev Validate form */
      if ((await ensureValidateForm(formState)).length) {
        console.error("Validate form failed!");
        return;
      }

      /** @dev Produce callback function if validate successfully with no errors */
      callback(formState);
    } catch { }
  };

  return {
    register,
    onSubmit,
    formState,
    errors,
  };
};
