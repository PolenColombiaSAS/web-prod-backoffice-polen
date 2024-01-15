

import { useContext } from "react";
import { LoadingContext } from ".";

/**
 * @typedef {Object} LoadingContextType
 * @property {boolean} loading
 * @property {function} showLoading
 * @property {function} hideLoading
 */

/**@return {LoadingContextType} */

export const useLoadingContext = () => {
    return useContext(LoadingContext);
  };
  