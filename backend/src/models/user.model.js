import { connection } from "../database/index.js";
import { generateUniqueId } from "../utils/index.js";

const getAllUsers = async () => {
  try {
    const [results] = await connection.query(`
            SELECT u.id, u.fullname, u.username, u.email, u.profile, u.role_id, r.role_name, u.password, u.is_email_verified, u.refresh_token
            FROM users u
            INNER JOIN roles r
            ON r.id = u.role_id
        `);
    return results;
  } catch (error) {
    throw new Error("Failed to fetch all user details");
  }
};

const getUserById = async (id) => {
  try {
    const [result] = await connection.query(
      `
            SELECT u.id, u.fullname, u.username, u.email, u.profile, u.role_id, r.role_name, u.password, u.is_email_verified, u.refresh_token
            FROM users u
            INNER JOIN roles r
            ON r.id = u.role_id
            WHERE u.id = ?
        `,
      [id]
    );
    return result;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
};

const getUserByUsername = async (username) => {
  try {
    const [result] = await connection.query(
      `
            SELECT u.id, u.fullname, u.username, u.email, u.profile, u.role_id, r.role_name, u.password, u.is_email_verified, u.refresh_token
            FROM users u
            INNER JOIN roles r
            ON r.id = u.role_id
            WHERE u.username = ?
        `,
      [username]
    );
    return result;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
};

const getUserByEmail = async (email) => {
  try {
    const [result] = await connection.query(
      `
            SELECT u.id, u.fullname, u.username, u.email, u.profile, u.role_id, r.role_name, u.password, u.is_email_verified, u.refresh_token
            FROM users u
            INNER JOIN roles r
            ON r.id = u.role_id
            WHERE u.email = ?
        `,
      [email]
    );
    return result;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
};

const getUserByEmailVerificationToken = async (emailVerificationToken) => {
  try {
    const [result] = await connection.query(
      `
            SELECT u.id, u.fullname, u.username, u.email, u.profile, u.role_id, r.role_name, u.password, u.is_email_verified, u.refresh_token
            FROM users u
            INNER JOIN roles r
            ON r.id = u.role_id
            WHERE u.email_verification_token = ?
        `,
      [emailVerificationToken]
    );
    return result;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
};

const getUserByForgotPasswordToken = async (forgotPasswordToken) => {
  try {
    const [result] = await connection.query(
      `
            SELECT u.id, u.fullname, u.username, u.email, u.profile, u.role_id, r.role_name, u.password, u.is_email_verified, u.refresh_token
            FROM users u
            INNER JOIN roles r
            ON r.id = u.role_id
            WHERE u.forgot_password_token = ?
        `,
      [forgotPasswordToken]
    );
    return result;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
};

const createUser = async (
  fullname,
  username,
  email,
  profile,
  password,
  role_id,
  emailVerificationToken,
  emailVerificationExpiry
) => {
  const id = generateUniqueId();

  try {
    await connection.query(
      `
            INSERT INTO users (id, fullname, username, email, profile, password, role_id, email_verification_token, email_verification_expiry) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
      [
        id,
        fullname,
        username,
        email,
        profile,
        password,
        role_id,
        emailVerificationToken,
        emailVerificationExpiry,
      ]
    );
    return {
      id,
      fullname,
      username,
      email,
      profile,
      role_id,
      is_email_verified: false,
    };
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

const updateEmailVerificationStatus = async (id) => {
  try {
    await connection.query(
      `
            UPDATE users 
            SET is_email_verified = ? 
            WHERE id = ? 
        `,
      [true, id]
    );
    return {
      id,
      is_email_verified,
    };
  } catch (error) {
    throw new Error("Failed to update email verified status");
  }
};

const updateUser = async (id, fullname, username, roleId) => {
  try {
    await connection.query(
      `
            UPDATE users 
            SET fullname = ?, username = ?, role_id = ? 
            WHERE id = ?     
        `,
      [fullname, username, roleId, id]
    );
    return {
      id,
      fullname,
      username,
      roleId,
    };
  } catch (error) {
    throw new Error("Failed to updade user");
  }
};

const updateProfile = async (id, profile) => {
  try {
    await connection.query(
      `
            UPDATE users 
            SET profile = ? 
            WHERE id = ?     
        `,
      [profile, id]
    );
    return {
      id,
      profile,
    };
  } catch (error) {
    throw new Error("Failed to update profile");
  }
};

const updatePassword = async (id, password) => {
  try {
    await connection.query(
      `
            UPDATE users 
            SET password = ? 
            WHERE id = ?     
        `,
      [password, id]
    );
    return {
      id,
      message: "Password updated successfully",
    };
  } catch (error) {
    throw new Error("Failed to update password");
  }
};

const updateRefreshToken = async (id, refreshToken) => {
  try {
    await connection.query(
      `
            UPDATE users 
            SET refresh_token = ? 
            WHERE id = ?     
        `,
      [refreshToken]
    );
    return {
      id,
      refreshToken,
    };
  } catch (error) {
    throw new Error("Failed to update refresh token");
  }
};

const updateEmailVerificationTokenAndExpiry = async (id, token, expiry) => {
  try {
    await connection.query(
      `
            UPDATE users 
            SET email_verification_token = ?, email_verification_expiry = ? 
            WHERE id = ?     
        `,
      [token, expiry, id]
    );
    return {
      id,
      expiry,
    };
  } catch (error) {
    throw new Error("Failed to update email verification token and expiry");
  }
};

const updateForgotPasswordTokenAndExpiry = async (id, token, expiry) => {
  try {
    await connection.query(
      `
            UPDATE users 
            SET forgot_password_token = ?, forgot_password_expiry = ? 
            WHERE id = ?     
        `,
      [token, expiry, id]
    );
    return {
      id,
      expiry,
    };
  } catch (error) {
    throw new Error("Failed to update forgot password token and expiry");
  }
};

const deleteUser = async (id) => {
  try {
    await connection.query(
      `
            DELETE FROM users 
            WHERE id = ?     
        `,
      [id]
    );
    return {
      id,
      message: "User deleted successfully",
    };
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

const deleteAllClientUsers = async (roleId) => {
  try {
    await connection.query(
      `
            DELETE FROM users 
            WHERE role_id = ? 
        `,
      [roleId]
    );
  } catch (error) {
    throw new Error("Failed to delete all client users");
  }
};

export {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  getUserByEmailVerificationToken,
  getUserByForgotPasswordToken,
  createUser,
  updateEmailVerificationStatus,
  updateEmailVerificationTokenAndExpiry,
  updateForgotPasswordTokenAndExpiry,
  updatePassword,
  updateProfile,
  updateRefreshToken,
  updateUser,
  deleteUser,
  deleteAllClientUsers,
};
