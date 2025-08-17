/**
 * User roles within the Enterprise Work Management system.
 * Each role determines the level of access and permissions.
 */
export const ROLES = {
  Admin: 'Admin', // Full access to all features and user management
  Manager: 'Manager', // Can manage projects and view team tasks
  Employee: 'Employee', // Standard user, can view and update own tasks
}

/**
 * Example usage:
 * if (user.role === ROLES.Admin) {
 *   // show admin panel
 * }
 */
