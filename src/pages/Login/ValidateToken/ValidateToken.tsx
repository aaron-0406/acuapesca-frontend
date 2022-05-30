import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useGeneralContext } from "../../../shared/contexts/StoreProvider";
import { requestState } from "../../../shared/hooks/useAsync";
import { useAsync } from "../../../shared/hooks/useAsync";
import { TokenResponseType, validateMagicLink } from "../api";
import paths from "../../../shared/routes/paths";
import { setAuthentication } from "../../../shared/utils/storage/auth";
import { ActionTypes } from "../actions";

export const ValidateToken = () => {
  const { search } = useLocation();
  const token = queryString.parse(search)?.t?.toString() || "";
  const navigate = useNavigate();
  const { dispatch } = useGeneralContext();
  const { execute, status, error } = useAsync(() =>
    validateMagicLink({
      token,
    })
  );

  const validateLinkToken = useCallback(async () => {
    const result: TokenResponseType = await execute();

    if (result) {
      const { accessToken, refreshToken, admin } = result;
      if (accessToken) {
        setAuthentication(accessToken, refreshToken);
        dispatch({ type: ActionTypes.Login, payload: { admin } });
        navigate(paths.documents.root, { replace: true });
      } else {
        navigate(paths.guest.loginError);
      }
    }
  }, [dispatch, execute, history]);

  useEffect(() => {
    if (error) {
      navigate(paths.guest.loginError);
    }
  }, [error, history]);

  useEffect(() => {
    if (!!token && status === requestState.IDLE) {
      validateLinkToken();
    }
  }, [status, token, validateLinkToken]);

  return (
    <div>
      <p>Loader</p>
    </div>
  );
};
