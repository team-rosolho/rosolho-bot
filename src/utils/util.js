module.exports = {
    randomHexColor: () => {
        return ('#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6));
    },
    randomString: function(length) {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVMXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += randomChars.charAt[Math.floor(Math.random() * randomChars.length)];
        }
        return result;
    }
}