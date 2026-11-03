export const validateIndianMobile = (mobile) => {
  const cleaned = String(mobile || '').replace(/\D/g, '');
  // 10 digits starting with 6, 7, 8, or 9
  return /^[6-9]\d{9}$/.test(cleaned);
};

export const validatePincode = (pincode) => {
  const cleaned = String(pincode || '').replace(/\D/g, '');
  return /^[1-9][0-9]{5}$/.test(cleaned);
};

export const validateEmail = (email) => {
  if (!email) return true; // email is optional for guest checkout
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateCheckoutForm = (form) => {
  const errors = {};

  if (!form.fullName || form.fullName.trim().length < 3) {
    errors.fullName = 'Full Name is required (minimum 3 characters)';
  }

  if (!form.mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!validateIndianMobile(form.mobile)) {
    errors.mobile = 'Enter a valid 10-digit Indian mobile number';
  }

  if (form.email && !validateEmail(form.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!form.address || form.address.trim().length < 8) {
    errors.address = 'Detailed address is required (house/flat no, street)';
  }

  if (!form.city || form.city.trim().length < 2) {
    errors.city = 'City is required';
  }

  if (!form.state || form.state.trim().length < 2) {
    errors.state = 'State is required';
  }

  if (!form.pincode) {
    errors.pincode = 'Pincode is required';
  } else if (!validatePincode(form.pincode)) {
    errors.pincode = 'Enter a valid 6-digit Indian PIN code';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

