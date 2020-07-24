const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize');
const authService = require('./auth.service');

// routes
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', authorize(), revokeToken);
router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/validate-reset-token', validateResetToken);
router.post('/reset-password', resetPassword);

module.exports = router;

function login(req, res, next) {
    const { email, password } = req.body;
    const ipAddress = req.ip; // TODO: do I need that?

    console.log({ email, password, ipAddress });

    authService.login({ email, password, ipAddress })
        .then(({ refreshToken, ...account }) => {
            // setTokenCookie(res, refreshToken); // TODO
            res.json(account);
        })
        .catch(next);
}

function refreshToken(req, res, next) {
    const token = req.body.token;
    const ipAddress = req.ip;
    authService.refreshToken({token, ipAddress})
        .then(({ refreshToken, ...account }) => {
            // setTokenCookie(res, refreshToken); // TODO
            res.json(account);
        })
        .catch(next);
}

function revokeToken(req, res, next) {
    const token = req.body.token;
    const ipAddress = req.ip;

    if (!token) return res.status(400).json({ message: 'Token is required' });

    // users can revoke their own tokens and admins can revoke any tokens
    // if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    authService.revokeToken({ token, ipAddress })
        .then(() => res.json({ message: 'Token revoked' }))
        .catch(next);
}

function register(req, res, next) {
    authService.register(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Registration successful, please check your email for verification instructions' }))
        .catch(next);
}

function verifyEmail(req, res, next) {
    authService.verifyEmail(req.body)
        .then(() => res.json({ message: 'Verification successful, you can now login' }))
        .catch(next);
}

function forgotPassword(req, res, next) {
    authService.forgotPassword(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Please check your email for password reset instructions' }))
        .catch(next);
}

function validateResetToken(req, res, next) {
    authService.validateResetToken(req.body)
        .then(() => res.json({ message: 'Token is valid' }))
        .catch(next);
}

function resetPassword(req, res, next) {
    authService.resetPassword(req.body)
        .then(() => res.json({ message: 'Password reset successful, you can now login' }))
        .catch(next);
}
