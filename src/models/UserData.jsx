export class UserData {
    constructor(uid, userId, username, role, status, mobileNumber, token) {
      this.uid = uid; // Unique identifier for the user
      this.userId = userId; // User ID
      this.username = username; // Username
      this.role = role; // Role of the user
      this.status = status; // Status of the user (e.g., Active/Inactive)
      this.mobileNumber = mobileNumber; // Mobile number of the user
      this.token = token; // JWT token for authentication
    }
  
    // Method to create a UserData instance from a plain object
    static fromJSON(json) {
      return new UserData(
        json.uid,
        json.userId,
        json.username,
        json.role,
        json.status,
        json.mobileNumber,
        json.token
      );
    }
  
    // Method to convert a UserData instance to a plain object
    toJSON() {
      return {
        uid: this.uid,
        userId: this.userId,
        username: this.username,
        role: this.role,
        status: this.status,
        mobileNumber: this.mobileNumber,
        token: this.token,
      };
    }
  }