const bcrypt = require('bcrypt');
const db = require('../_helpers/db');

module.exports = {
    login,
    register,
    refreshToken,
    revokeToken,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
};

async function login({ email, password, ipAddress }) {
    // TODO
}

async function register(params, origin) {
    // TODO
}

async function refreshToken({ token, ipAddress }) {
    // TODO
}

async function revokeToken({ token, ipAddress }) {
    // TODO
}

async function verifyEmail({ token }) {
    // TODO
}

async function forgotPassword({ email }, origin) {
    // TODO
}

async function validateResetToken({ token }) {
    // TODO
}

async function resetPassword({ token, password }) {
    // TODO
}