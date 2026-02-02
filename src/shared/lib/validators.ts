export const validators = {
  name: (value: string): string | null => {
    if (value.length <= 2) {
      return "The name should contain at least 3 characters.";
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "Name is required.";
    }

    const nameRegex = /^[a-zA-Zà-žÀ-Ž\s'-]+$/;
    if (!nameRegex.test(trimmedValue)) {
      return "The name contains invalid characters.";
    }

    return null;
  },

  email: (value: string): string | null => {
    if (!value) {
      return "Enter your email.";
    }

    const parts = value.split("@");

    if (parts.length !== 2) {
      return "Email must contain exactly one @ symbol.";
    }

    const [localPart, domain] = parts;

    if (!localPart) {
      return "Email must have a username before @.";
    }

    if (!domain || domain.length < 2) {
      return "Email must have a valid domain.";
    }

    if (localPart.includes("..") || domain.includes("..")) {
      return "Email cannot contain consecutive dots.";
    }

    const domainParts = domain.split(".");
    if (domainParts.some((part) => part.length === 0)) {
      return "Invalid domain format.";
    }

    return null;
  },

  password: (value: string): string | null => {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/;

    if (value.length <= 4) {
      return "The password must contain at least 5 characters.";
    }
    if (!specialChars.test(value)) {
      return "The password must contain at least 1 special character.";
    }
    return null;
  },
};
