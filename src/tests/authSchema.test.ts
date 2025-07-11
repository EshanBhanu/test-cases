// src/__tests__/authSchema.test.ts
import {
  authSchema,
  signUpSchema,
  signInSchema,
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/authSchema";
import type { SignInFormData, SignUpFormData } from "../utils/authSchema";

describe("authSchema", () => {
  describe("authSchema validation", () => {
    it("should validate a complete valid auth object", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        password: "Password123!",
      };

      const result = authSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("should validate auth object without name (optional)", () => {
      const validData = {
        email: "john@example.com",
        password: "Password123!",
      };

      const result = authSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should fail validation with invalid email", () => {
      const invalidData = {
        email: "invalid-email",
        password: "Password123!",
      };

      const result = authSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Invalid email address");
      }
    });

    it("should fail validation with weak password", () => {
      const invalidData = {
        email: "john@example.com",
        password: "weak",
      };

      const result = authSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Password must be at least 8 characters"
        );
      }
    });
  });

  describe("signUpSchema validation", () => {
    it("should validate complete sign up data", () => {
      const validSignUpData = {
        name: "John Doe",
        email: "john@example.com",
        password: "Password123!",
      };

      const result = signUpSchema.safeParse(validSignUpData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validSignUpData);
      }
    });

    it("should fail validation when name is missing", () => {
      const invalidSignUpData = {
        email: "john@example.com",
        password: "Password123!",
      };

      const result = signUpSchema.safeParse(invalidSignUpData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Required");
      }
    });

    it("should fail validation when name is empty string", () => {
      const invalidSignUpData = {
        name: "",
        email: "john@example.com",
        password: "Password123!",
      };

      const result = signUpSchema.safeParse(invalidSignUpData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Name is required");
      }
    });
  });

  describe("signInSchema validation", () => {
    it("should validate sign in data without name", () => {
      const validSignInData = {
        email: "john@example.com",
        password: "Password123!",
      };

      const result = signInSchema.safeParse(validSignInData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validSignInData);
      }
    });

    it("should ignore name field if provided", () => {
      const signInDataWithName = {
        name: "John Doe",
        email: "john@example.com",
        password: "Password123!",
      };

      const result = signInSchema.safeParse(signInDataWithName);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({
          email: "john@example.com",
          password: "Password123!",
        });
        expect(result.data).not.toHaveProperty("name");
      }
    });
  });

  describe("TypeScript type inference", () => {
    it("should infer correct SignInFormData type", () => {
      const signInData: SignInFormData = {
        email: "test@example.com",
        password: "Password123!",
      };

      expect(signInData.email).toBeDefined();
      expect(signInData.password).toBeDefined();
      // @ts-expect-error - name should not exist on SignInFormData
      expect(signInData.name).toBeUndefined();
    });

    it("should infer correct SignUpFormData type", () => {
      const signUpData: SignUpFormData = {
        name: "John Doe",
        email: "test@example.com",
        password: "Password123!",
      };

      expect(signUpData.name).toBeDefined();
      expect(signUpData.email).toBeDefined();
      expect(signUpData.password).toBeDefined();
    });
  });
});

describe("Validation Functions", () => {
  describe("validateName", () => {
    it("should return undefined for valid name", () => {
      const result = validateName({ value: "John Doe" });
      expect(result).toBeUndefined();
    });

    it("should return error message for empty name", () => {
      const result = validateName({ value: "" });
      expect(result).toBe("Name is required");
    });
  });

  describe("validateEmail", () => {
    it("should return undefined for valid email", () => {
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "user+tag@example.org",
      ];

      validEmails.forEach((email) => {
        const result = validateEmail({ value: email });
        expect(result).toBeUndefined();
      });
    });

    it("should return error message for invalid email", () => {
      const invalidEmails = [
        "invalid-email",
        "@example.com",
        "test@",
        "test.example.com",
        "",
      ];

      invalidEmails.forEach((email) => {
        const result = validateEmail({ value: email });
        expect(result).toBe("Invalid email address");
      });
    });
  });

  describe("validatePassword", () => {
    it("should return undefined for valid password", () => {
      const validPasswords = [
        "Password123!",
        "MySecret1@",
        "Complex1#Password",
      ];

      validPasswords.forEach((password) => {
        const result = validatePassword({ value: password });
        expect(result).toBeUndefined();
      });
    });

    it("should return error message for password too short", () => {
      const result = validatePassword({ value: "Short1!" });
      expect(result).toBe("Password must be at least 8 characters");
    });

    it("should return error message for password without number", () => {
      const result = validatePassword({ value: "Password!" });
      expect(result).toBe(
        "Password must contain at least one number, one symbol, and one uppercase letter"
      );
    });

    it("should return error message for password without symbol", () => {
      const result = validatePassword({ value: "Password123" });
      expect(result).toBe(
        "Password must contain at least one number, one symbol, and one uppercase letter"
      );
    });

    it("should return error message for password without uppercase", () => {
      const result = validatePassword({ value: "password123!" });
      expect(result).toBe(
        "Password must contain at least one number, one symbol, and one uppercase letter"
      );
    });

    it("should return error message for password missing multiple requirements", () => {
      const result = validatePassword({ value: "password" });
      expect(result).toBe("Password must be at least 8 characters");
    });

    it("should return error message for empty password", () => {
      const result = validatePassword({ value: "" });
      expect(result).toBe("Password must be at least 8 characters");
    });
  });
});

describe("Edge Cases", () => {
  it("should handle whitespace in name validation", () => {
    const result = validateName({ value: "   " });
    expect(result).toBe("Name is required");
  });

  it("should handle special characters in email", () => {
    const result = validateEmail({ value: "test+tag@example-domain.com" });
    expect(result).toBeUndefined();
  });

  it("should validate password with various special characters", () => {
    const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*"];

    specialChars.forEach((char) => {
      const password = `Password123${char}`;
      const result = validatePassword({ value: password });
      expect(result).toBeUndefined();
    });
  });

  it("should handle unicode characters in name", () => {
    const result = validateName({ value: "José María" });
    expect(result).toBeUndefined();
  });
});
