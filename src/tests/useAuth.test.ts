import { useAuth } from "../hooks/useAuth";
import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/AuthContext";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

const mockUseContext = useContext as jest.MockedFunction<typeof useContext>;

describe("useAuth Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when used within AuthProvider", () => {
    const mockUser = {
      id: "1",
      email: "eshanbhanu@gmail.com",
      name: "Eshan Bhanuka",
    };

    const mockAuthContext: AuthContextType = {
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
    };

    beforeEach(() => {
      mockUseContext.mockReturnValue(mockAuthContext);
    });

    it("should return the auth context when context is available", () => {
      const { result } = renderHook(() => useAuth());
      expect(result.current).toEqual(mockAuthContext);
      expect(mockUseContext).toHaveBeenCalledWith(AuthContext);
    });

    it("should return current user data", () => {
      const { result } = renderHook(() => useAuth());
      expect(result.current.user).toEqual(mockUser);
    });

    it("should return authenticated status", () => {
      const { result } = renderHook(() => useAuth());
      expect(result.current.isAuthenticated).toBe(true);
    });

    it("should return loading status", () => {
      const { result } = renderHook(() => useAuth());
      expect(result.current.isLoading).toBe(false);
    });

    it("should return login function", () => {
      const { result } = renderHook(() => useAuth());
      expect(result.current.login).toBeDefined();
      expect(typeof result.current.login).toBe("function");
      expect(result.current.login).toBe(mockAuthContext.login);
    });
    it("should return logout function", () => {
      const { result } = renderHook(() => useAuth());
      expect(result.current.logout).toBeDefined();
      expect(typeof result.current.logout).toBe("function");
      expect(result.current.logout).toBe(mockAuthContext.logout);
    });

    it("should handle unauthenticated state", () => {
      const unauthContext: AuthContextType = {
        ...mockAuthContext,
        isAuthenticated: false,
        user: null,
      };
      mockUseContext.mockReturnValue(unauthContext);
      const { result } = renderHook(() => useAuth());
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
    });
  });
});
