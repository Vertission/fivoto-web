import { useState } from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import { useSnackbar } from 'notistack';

// import SignOut from '../../../utils/signOut';

import { Dialog, Modal } from '../../../components/ui';

import { useQueryMe } from '../../../apollo/query';
import schema from '../../../apollo/schema';

export function useSignOut() {
  async function signOut() {
    try {
      await Auth.signOut();
      SignOut();
      Sentry.configureScope((scope) => scope.setUser(null));
      await analytics().setUserId(null); // ANALYTIC
    } catch (error) {
      Sentry.withScope(function (scope) {
        scope.setTag('func', 'useSignOut:hook');
        scope.setLevel(Sentry.Severity.Error);
        Sentry.captureException(error);
      });
    }
  }

  return [signOut];
}

export function useChangePassword() {
  const [loading, setLoading] = useState(false);
  const [openDialog, closeDialog] = Dialog.useDialog();
  const { enqueueSnackbar } = useSnackbar();

  async function changePassword(oldPassword, newPassword) {
    setLoading(true);
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(currentUser, oldPassword, newPassword);
      setLoading(false);

      enqueueSnackbar('Password changed successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } catch (error) {
      setLoading(false);
      if (error.code === 'NotAuthorizedException') {
        return openDialog({
          children: (
            <Modal
              title='Incorrect Password'
              description='Your current password is incorrect, Please try again.'
              closeTitle='try again'
              handleClose={closeDialog}
            />
          ),
        });
      } else {
        const data = {
          oldLength: oldPassword?.length,
          newLength: newPassword?.length,
        };
        handleError({ openDialog, closeDialog }, error, 'changing your password', data);
      }
    }
  }

  return [changePassword, { loading }];
}

export function useChangeEmail(onCompleted, onError) {
  const [loading, setLoading] = useState(false);
  const [openDialog, closeDialog] = Dialog.useDialog();

  const [user, { client }] = useQueryMe();

  async function changeEmail(email) {
    email = email.toLowerCase();
    email = email.trim();

    setLoading(true);
    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      if (currentUser.attributes.email === email) return setLoading(false);

      await Auth.updateUserAttributes(currentUser, { email });

      const { me } = client.readQuery({ query: schema.query.ME });
      client.writeQuery({ query: schema.query.ME, data: { me: { ...me, email, email_verified: false } } });

      setLoading(false);
      if (onCompleted) onCompleted(email);
    } catch (error) {
      setLoading(false);
      if (error.code === 'AliasExistsException') {
        return openDialog({
          children: (
            <Modal
              title='Email already exist'
              description={`An account with email address ${email} already exists.`}
              closeTitle='ok'
              handleClose={closeDialog}
            />
          ),
        });
      } else {
        setLoading(false);
        if (onError) onError(error);

        const data = { email };
        handleError({ openDialog, closeDialog }, error, 'change your email address', data);
      }
    }
  }

  return [changeEmail, { loading }];
}

export function useResendEmailChangeConfirmationCode() {
  const [loading, setLoading] = useState(false);
  const [openDialog, closeDialog] = Dialog.useDialog();
  const { enqueueSnackbar } = useSnackbar();

  async function resendEmailChangeConfirmationCode() {
    try {
      setLoading(true);
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.verifyUserAttribute(currentUser, 'email');

      enqueueSnackbar('Confirmation code send to email', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);

      handleError({ openDialog, closeDialog }, error, 'resending confirmation code', {});
    }
  }

  return [resendEmailChangeConfirmationCode, { loading }];
}

export function useConfirmEmailChange() {
  const [loading, setLoading] = useState(false);
  const [openDialog, closeDialog] = Dialog.useDialog();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  async function confirmEmailChange(code) {
    email = email.toLowerCase();
    code = code.trim();

    setLoading(true);
    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', code);

      enqueueSnackbar('Email verified successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });

      router.push('/');

      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error.code === 'CodeMismatchException') {
        return openDialog({
          children: (
            <Modal
              title='Invalid code'
              description='Invalid confirmation code, Please double check your confirmation code and try again or resend the confirmation code.'
              closeTitle='try again'
              handleClose={closeDialog}
            />
          ),
        });
      } else if (error.code === 'ExpiredCodeException') {
        return openDialog({
          children: (
            <Modal
              title='Code expired'
              description='Oops! Your confirmation code has expired, Please resend code to get a new confirmation code.'
              closeTitle='ok'
              handleClose={closeDialog}
            />
          ),
        });
      } else {
        const data = { code };
        handleError({ openDialog, closeDialog }, error, 'verifying confirmation code', data);
      }
    }
  }

  return [confirmEmailChange, { loading }];
}

export function useResetPassword(setTab) {
  const [loading, setLoading] = useState(false);
  const [openDialog, closeDialog] = Dialog.useDialog();
  const { enqueueSnackbar } = useSnackbar();

  async function resetPassword(email, code, newPassword) {
    email = email.toLowerCase();
    email = email.trim();
    code = code.trim();

    try {
      setLoading(true);
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      setLoading(false);

      enqueueSnackbar('Password reset successfully', {
        variant: 'success',
      });
      setTab(2);
    } catch (error) {
      setLoading(false);
      if (error.code === 'CodeMismatchException') {
        return openDialog({
          children: (
            <Modal
              title='Invalid code'
              description='Invalid verification code, Please double check your reset password verification code and try again or resend the verification code.'
              closeTitle='try again'
              handleClose={closeDialog}
            />
          ),
        });
      } else {
        const data = { email, code, length: newPassword?.length };
        handleError({ openDialog, closeDialog }, error, 'resetting your password', data);
      }
    }
  }

  return [resetPassword, { loading }];
}

export function useForgotPassword(setTab) {
  const [loading, setLoading] = useState(false);
  const [openDialog, closeDialog] = Dialog.useDialog();
  const { enqueueSnackbar } = useSnackbar();

  const [sendConfirmationCode] = useSendConfirmationCode();

  async function forgotPassword(email) {
    email = email.toLowerCase();
    email = email.trim();

    setLoading(true);
    try {
      await Auth.forgotPassword(email);
      setLoading(false);

      setTab(0);
      enqueueSnackbar(`Verification code send to ${email}`, {
        variant: 'success',
      });
    } catch (error) {
      setLoading(false);

      if (error.code === 'UserNotFoundException') {
        return openDialog({
          children: (
            <Modal
              title='Account not exist'
              description='There is no account matching that email address, Please double check your email address and try again.'
              closeTitle='try again'
              handleClose={closeDialog}
            />
          ),
        });
      } else if (error.message.includes('no registered/verified email')) {
        return openDialog({
          children: (
            <Modal
              title='Email Address not confirmed'
              description={`Please confirm your email address ${email} to reset your password.`}
              closeTitle='close'
              actions={[
                {
                  title: 'confirm email',
                  onClick: () => {
                    sendConfirmationCode(email);
                    setTab(4);
                    closeDialog();
                  },
                },
              ]}
              handleClose={closeDialog}
            />
          ),
        });
      } else {
        const data = { email };
        handleError({ openDialog, closeDialog }, error, 'sending reset password verification code', data);
      }
    }
  }

  return [forgotPassword, { loading }];
}

/**
 * Resend confirmation code
 */
export function useSendConfirmationCode() {
  const [loading, setLoading] = useState(false);
  const [openDialog, closeDialog] = Dialog.useDialog();
  const { enqueueSnackbar } = useSnackbar();

  async function sendConfirmationCode(email) {
    email = email.toLowerCase();
    email = email.trim();

    setLoading(true);
    try {
      await Auth.resendSignUp(email);
      enqueueSnackbar('Confirmation code send to your email', {
        variant: 'success',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);

      const data = { email };
      handleError({ openDialog, closeDialog }, error, 'sending confirmation code', data);
    }
  }

  return [sendConfirmationCode, { loading }];
}

/**
 * Registration email confirmation hook
 */
export function useConfirmSign(setTab) {
  const [loading, setLoading] = useState(false);
  const [openDialog, closeDialog] = Dialog.useDialog();
  const { enqueueSnackbar } = useSnackbar();

  async function confirmSign(username, code) {
    username = username.toLowerCase();
    username = username.trim();
    code = code.trim();

    setLoading(true);
    try {
      const isConfirm = await Auth.confirmSignUp(username, code);
      if (isConfirm === 'SUCCESS') {
        enqueueSnackbar('Email successfully confirmed', { variant: 'success' });
        setTab(2);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error.code === 'CodeMismatchException') {
        return openDialog({
          children: (
            <Modal
              title='Invalid code'
              description='Invalid confirmation code, Please double check your confirmation code and try again or resend the confirmation code.'
              closeTitle='try again'
              handleClose={closeDialog}
            />
          ),
        });
      } else if (error.code === 'ExpiredCodeException') {
        return openDialog({
          children: (
            <Modal
              title='Code expired'
              description='Sorry! Your confirmation code has expired, Please resend code to get a new confirmation code.'
              closeTitle='ok'
              handleClose={closeDialog}
            />
          ),
        });
      } else {
        const data = { username, code };
        handleError({ openDialog, closeDialog }, error, 'verifying confirmation code', data);
      }
    }
  }

  return [confirmSign, { loading }];
}

export function useSignIn(setTab) {
  const [sendConfirmationCode] = useSendConfirmationCode();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [openDialog, closeDialog] = Dialog.useDialog();

  // NEXT: show contact us if email address not found

  async function signIn(email, password) {
    email = email.toLowerCase();
    email = email.trim();

    setLoading(true);
    try {
      const { username, attributes } = await Auth.signIn(email, password);

      // Sentry.setUser({ id: username, email: attributes.email });
      // await analytics().logLogin({ method: 'email' }); // ANALYTIC
      // await analytics().setUserId(username); // ANALYTIC

      localStorage.setItem('@sign', true);

      setLoading(false);
      enqueueSnackbar('Login successfully', { variant: 'success' });
      router.push('/');
    } catch (error) {
      setLoading(false);

      if (error.code === 'UserNotFoundException') {
        return openDialog({
          children: (
            <Modal
              title='Account not exist'
              description='There is no account matching that email address, Please double check your email address and try again.'
              closeTitle='try again'
              handleClose={closeDialog}
            />
          ),
        });
      } else if (error.code === 'NotAuthorizedException') {
        return openDialog({
          children: (
            <Modal
              title='Incorrect password'
              description='The password you entered is incorrect, Please Try again or reset your password.'
              closeTitle='try again'
              actions={[
                {
                  title: 'reset password',
                  onClick: () => {
                    setTab(1);
                    closeDialog();
                  },
                },
              ]}
              handleClose={closeDialog}
            />
          ),
        });
      } else if (error.code === 'UserNotConfirmedException') {
        await sendConfirmationCode(email);
        setTab(4);
      } else {
        const data = { email, length: password?.length };
        handleError({ openDialog, closeDialog }, error, 'logging you in', data);
      }
    }
  }

  return [signIn, { loading }];
}

/**
 * Sign up hook
 */
export function useSignUp(setTab) {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, closeDialog] = Dialog.useDialog();

  async function signUp(email, password, name) {
    email = email.toLowerCase();
    email = email.trim();
    name = name.trim();

    setLoading(true);
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { name },
      });

      // await analytics().logSignUp({ method: 'email' }); // ANALYTIC
      setTab(4);
      setLoading(false);
      enqueueSnackbar('Account registered successfully', { variant: 'success' });
    } catch (error) {
      setLoading(false);
      if (error.code === 'UsernameExistsException') {
        return openDialog({
          children: (
            <Modal
              title='Email already exist'
              description={`An account with email address ${email} already exists.`}
              closeTitle='ok'
              handleClose={closeDialog}
            />
          ),
        });
      } else {
        const data = { email, length: password?.length };
        handleError({ openDialog, closeDialog }, error, 'registering an account', data);
      }
    }
  }
  return [signUp, { loading }];
}

/**
 *
 * @param {any} error error object
 * @param {string} action error about
 * @param {object} data user data
 */
function handleError({ openDialog, closeDialog }, error, action, data) {
  console.log('🚀 ~ file: index.js ~ line 490 ~ handleError ~ error', error);
  switch (error.code) {
    case 'TooManyRequestsException':
      return openDialog({
        children: (
          <Modal
            title='Too many attempts'
            description="Oops! You've exceeded the number of attempts, Please try again after sometimes."
            closeTitle='ok'
            handleClose={closeDialog}
          />
        ),
      });
    case 'LimitExceededException':
    case 'TooManyFailedAttemptsException':
      return openDialog({
        children: (
          <Modal
            title='Limit exceeded'
            description='Sorry! You have exceeded the limit for this operation, Please wait for few minutes before trying agin.'
            closeTitle='ok'
            handleClose={closeDialog}
          />
        ),
      });
    case 'NetworkError':
      return openDialog({
        children: (
          <Modal
            title='Connection Problem'
            description='Oops! Please check your internet connection and try again, If your internet connection is available then report this issue.'
            actions={[
              {
                title: 'Report issue',
                onPress: () => {},
              },
            ]}
            handleClose={closeDialog}
          />
        ),
      });
    case 'NotAuthorizedException':
    case 'UserNotConfirmedException':
    case 'UserNotFoundException':
    case 'PasswordResetRequiredException':
      return Auth.signOut();
    default: {
      return openDialog({
        children: (
          <Modal
            title='Server Error'
            description={`Oops! Something went wrong while ${action}, Please try again later or report this issue.`}
            actions={[
              {
                title: 'Report issue',
                onPress: () => {
                  console.log(error);
                },
              },
            ]}
            handleClose={closeDialog}
          />
        ),
      });
    }
  }
}
