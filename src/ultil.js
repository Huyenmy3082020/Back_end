const removeVietnameseTones = (str) => {
  const vietnameseTones = [
    { base: "a", diacritics: "àáảãạ" },
    { base: "ă", diacritics: "ằắẳẵặ" },
    { base: "â", diacritics: "ầấẩẫậ" },
    { base: "e", diacritics: "èéẻẽẹ" },
    { base: "ê", diacritics: "ềếểễệ" },
    { base: "i", diacritics: "ìíỉĩị" },
    { base: "o", diacritics: "òóỏõọ" },
    { base: "ô", diacritics: "ồốổỗộ" },
    { base: "ơ", diacritics: "ờớởỡợ" },
    { base: "u", diacritics: "ùúủũụ" },
    { base: "ư", diacritics: "ừứửữự" },
    { base: "y", diacritics: "ỳýỷỹỵ" },
  ];

  // Loại bỏ dấu
  for (const { base, diacritics } of vietnameseTones) {
    const regex = new RegExp(`[${diacritics}]`, "g");
    str = str.replace(regex, base);
  }

  return str;
};
