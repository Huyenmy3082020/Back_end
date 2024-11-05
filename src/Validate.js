const validateInput = (email, password, confirmPassword) => {
  const reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,16}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.*[a-zA-Z\d]).{6,}$/;
  const isCheckpassword = passwordRegex.test(password);
  const isCheckEmail = reg.test(email);

  if (!email || !password || !confirmPassword) {
    return { status: 400, message: "Không được bỏ trống trường nào" };
  } else if (!isCheckEmail) {
    return { status: 400, message: "Vui lòng điền đúng định dạng email" };
  } else if (password !== confirmPassword) {
    return { status: 400, message: "Sai nhập lại mật khẩu" };
  } else if (!isCheckpassword) {
    return {
      status: 400,
      message: "Mật khẩu phải có viết hoa và kí tự đặc biệt",
    };
  }

  return null; // Không có lỗi
};
