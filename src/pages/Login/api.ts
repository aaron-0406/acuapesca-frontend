import { IAdmin } from "../../shared/types";
import { post } from "../../shared/utils/api/client";
import { endpoints } from "../../shared/utils/api/endpoints";

interface LoginWithLinkRequest {
  email: string;
}

export const createMagicLink = async ({ email }: LoginWithLinkRequest) => {
  return post({ path: endpoints.auth.magiclink, data: { email } });
};

interface ValidateMagicLinkRequest {
  token: string;
}

export const validateMagicLink = async ({
  token,
}: ValidateMagicLinkRequest) => {
  return post({
    path: endpoints.auth.validateMagiclink,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export type TokenResponseType = {
  accessToken: string;
  refreshToken: string;
  isOnboardingCompleted: boolean;
  admin: IAdmin;
};

interface ConfirmationCodeRequest {
  code: string;
}

export const validateCode = async ({ code }: ConfirmationCodeRequest) => {
  return post({ path: endpoints.auth.validateCode, data: { code } });
};
