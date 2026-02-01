export const validators = {
  name: (value: string): string | null => {
    if (value.length <= 2) {
      return "The name should contain at least 3 characters";
    }
    return null;
  },

  email: (value: string): string | null => {
  if (!value) {
    return "Enter your email";
  }
  
  const parts = value.split("@");
  
  if (parts.length !== 2) {
    return "Email must contain exactly one @ symbol";
  }
  
  const [localPart, domain] = parts;
  
  if (!localPart) {
    return "Email must have a username before @";
  }
  
  if (!domain || !domain.includes(".")) {
    return "Email must have a valid domain";
  }
  
  const domainParts = domain.split(".");
  if (domainParts.some(part => part.length === 0)) {
    return "Invalid domain format";
  }
  
  return null;
},

  password: (value: string): string | null => {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/;

    if (value.length <= 5) {
      return "The password should contain at least 5 characters";
    }
    if (!specialChars.test(value)) {
      return "The password should contain at least 1 special character";
    }
    return null;
  },
};
