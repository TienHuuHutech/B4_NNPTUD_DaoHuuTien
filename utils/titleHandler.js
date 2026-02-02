module.exports = {
    ConvertTitleToSlug: function (title) {
        return title
            .toString()
            .toLowerCase()
            .normalize('NFD')                 // tách dấu
            .replace(/[\u0300-\u036f]/g, '')  // bỏ dấu tiếng Việt
            .replace(/[^a-z0-9\s-]/g, '')     // bỏ ký tự đặc biệt
            .trim()
            .replace(/\s+/g, '-')             // space -> -
            .replace(/-+/g, '-');             // nhiều - -> 1 -
    }
};
