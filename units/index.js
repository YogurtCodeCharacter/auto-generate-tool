module.exports = {
     conversionData: (data) => {
        return data.join(',,,').replace(/,,,/g, '');
    }
};