import {
  authSchema,
  signUpSchema,
  type SignInFormData,
} from "../utils/authSchema";

describe("authSchema", () => {
  describe("authSchema validation", () => {
    it("should validate a complete valid auth object", () => {
      const validData = {
        name: "Eshan Bhanuka",
        email: "ebbhanuka@gmail.com",
        password: "Secure@123",
      };
      const result = authSchema.safeParse(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
    });

    it("should validate auth object without name (sign-in case)", () => {
      const validData = {
        email: "eshanbhanu@gmail.com",
        password: "Secure@123",
      };
      const result = authSchema.safeParse(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
    });

    it("should fail validation with invalid", () => {
      const invalidData = {
        email: "invalid-com",
        password: "Secure@123",
      };
      const result = authSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Invalid email address");
      }
    });

    it("should fail validation with weak password", () => {
      const invalidData = {
        email: "eshanbhanu@gmail.com",
        password: "weakpass",
      };
      const result = authSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Password must contain at least one number, one symbol, and one uppercase letter"
        );
      }
    });

    it("should fail validation with insufficient password lenght", () => {
      const invalidData = {
        email: "eshanbhanu@gmai.com",
        password: "small",
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
      const validData = {
        name: "Eshan Bhanuka",
        email: "eshanbhanu@gmail.com",
        password: "Secure@123",
      };
      const result = signUpSchema.safeParse(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
    });

    it("should fail validation when user name is missing", () => {
      const invalidData = {
        email: "eshanbhanu@gmail.com",
        password: "Secure@123",
      };
      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail name feild is empty", () => {
      const invalidData = {
        name: "",
        email: "ebbhanuka@gmail.com",
        password: "Secure@123",
      };
      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Name is required");
      }
    });
  });

  describe("signInSchema validation", () => {
    it("should validate data without name", () => {
      const validaData = {
        email: "eshanbhanu@gmail.com",
        password: "Secure@123",
      };
      const result = authSchema.safeParse(validaData);
      expect(result.success).toBe(true);
    });
  });

  describe("Typescript type inference", () => {
    it("should infer correct signInFormData type", () => {
      const signInData: SignInFormData = {
        email: "eshanbhanu@gmail.com",
        password: "Secure@123",
      };
      expect(signInData.email).toBeDefined();
      expect(signInData.password).toBeDefined();
    });

    it("should infer correct signUpFormData type", () => {
      const signUpData = {
        name: "Eshan Bhanuka",
        email: "ebbhanuka@gmail.com",
        password: "Secure@123",
      };
      expect(signUpData.name).toBeDefined();
      expect(signUpData.email).toBeDefined();
      expect(signUpData.password).toBeDefined();
    });
  });
});
