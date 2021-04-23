class GeneralHelper {
    static randomString() {
        return Math.random().toString(20).substr(2, 20);
    }
}

module.exports = GeneralHelper;
